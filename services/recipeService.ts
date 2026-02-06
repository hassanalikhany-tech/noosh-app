
import { Dish, UserProfile } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { 
  collection, 
  getDocs,
  getDocsFromCache,
  getDocsFromServer,
  writeBatch,
  doc,
  query,
  limit,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DB } from '../utils/db';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';

let cachedDishes: Dish[] = [];
let isInitialized = false;
let _isSyncing = false; // قفل برای جلوگیری از اجرای همزمان
const freeDishIds = new Set<string>();

export const RecipeService = {
  // مقداردهی اولیه سریع: فقط از حافظه محلی لود می‌کند
  initialize: async (): Promise<{count: number}> => {
    try {
      const localCache = await DB.getAll('dishes');
      if (localCache && localCache.length > 0) {
        cachedDishes = localCache;
        RecipeService.rebuildFreeAccessMap();
      }
      isInitialized = true;
      return { count: cachedDishes.length };
    } catch (e) {
      console.error("Local Init Error:", e);
      return { count: 0 };
    }
  },

  rebuildFreeAccessMap: () => {
    freeDishIds.clear();
    const categories: string[] = ['ash', 'polo', 'khorak', 'stew', 'soup', 'fastfood', 'kabab', 'international', 'dessert'];
    categories.forEach(cat => {
      const dishesInCategory = cachedDishes.filter(d => d.category === cat);
      dishesInCategory.slice(0, 3).forEach(d => freeDishIds.add(d.id));
    });
  },

  // همگام‌سازی هوشمند و خودکار با ابر
  syncFromCloud: async (forceServer: boolean = true): Promise<{count: number, error?: string}> => {
    if (_isSyncing) return { count: cachedDishes.length }; // اگر در حال همسان‌سازی است، مجدد اجرا نشود
    
    try {
      if (!auth.currentUser) return { count: 0, error: 'not-logged-in' };
      
      _isSyncing = true;
      const q = query(collection(db, "dishes"), limit(4000));
      const snapshot = await (forceServer ? getDocsFromServer(q) : getDocs(q));
      const cloudDishes = snapshot.docs.map(doc => doc.data() as Dish);
      
      if (cloudDishes.length > 0) {
        cachedDishes = cloudDishes;
        const dbInstance = await DB.init();
        const transaction = dbInstance.transaction('dishes', 'readwrite');
        const store = transaction.objectStore('dishes');
        await store.clear();
        
        // ذخیره دسته‌ای در IndexedDB برای پرفورمنس
        for (const d of cloudDishes) {
          await store.put(d);
        }
        
        RecipeService.rebuildFreeAccessMap();
        // اطلاع‌رسانی به کل اپلیکیشن برای آپدیت رابط کاربری
        window.dispatchEvent(new CustomEvent('recipes-updated', { detail: { count: cloudDishes.length } }));
        _isSyncing = false;
        return { count: cloudDishes.length };
      }
      
      _isSyncing = false;
      return { count: cachedDishes.length };
    } catch (e: any) {
      _isSyncing = false;
      console.error("Auto Sync Error:", e.message);
      return { count: 0, error: e.code || 'unknown' };
    }
  },

  updateDish: async (dishId: string, updates: Partial<Dish>): Promise<boolean> => {
    try {
      if (!auth.currentUser) return false;
      const dishRef = doc(db, "dishes", dishId);
      await updateDoc(dishRef, updates);
      
      cachedDishes = cachedDishes.map(d => d.id === dishId ? { ...d, ...updates } : d);
      await DB.put('dishes', cachedDishes.find(d => d.id === dishId));
      
      window.dispatchEvent(new CustomEvent('recipes-updated'));
      return true;
    } catch (e) {
      console.error("Error updating dish:", e);
      return false;
    }
  },

  deleteDish: async (dishId: string): Promise<boolean> => {
    try {
      const dishRef = doc(db, "dishes", dishId);
      await deleteDoc(dishRef);
      
      cachedDishes = cachedDishes.filter(d => d.id !== dishId);
      await DB.delete('dishes', dishId);
      
      window.dispatchEvent(new CustomEvent('recipes-updated'));
      return true;
    } catch (e: any) {
      console.error("Firebase Delete Doc Error:", e);
      throw e;
    }
  },

  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();
    return cachedDishes
      .filter(d => !hiddenIds.includes(d.id))
      .map(d => renamedMap[d.id] ? { ...d, name: renamedMap[d.id] } : d);
  },

  isDishAccessible: (dishId: string, user: UserProfile | null): boolean => {
    if (!user) return false;
    if (user.isAdmin || user.isApproved) return true;
    return freeDishIds.has(dishId);
  },

  getAccessibleDishes: (user: UserProfile | null): Dish[] => {
    const all = RecipeService.getAllDishes();
    if (!user || user.isAdmin || user.isApproved) return all;
    return all.filter(d => freeDishIds.has(d.id));
  },

  getRawDishes: (): Dish[] => cachedDishes,

  clearAllCache: async () => {
    try {
      const dbInstance = await DB.init();
      const transaction = dbInstance.transaction('dishes', 'readwrite');
      transaction.objectStore('dishes').clear();
    } catch (e) {}
    cachedDishes = [];
    isInitialized = false;
  },

  getOfflineCacheCount: async () => cachedDishes.length,

  getRealCloudCount: async () => {
    if (!auth.currentUser) return 0;
    try {
      const snapshot = await getDocsFromCache(collection(db, "dishes"));
      return snapshot.size;
    } catch { return 0; }
  },

  getLocalCount: (): number => 0,

  seedFromExternalData: async (dishes: Dish[]): Promise<{ success: boolean; message: string }> => {
    try {
      const batchSize = 500;
      for (let i = 0; i < dishes.length; i += batchSize) {
        const chunk = dishes.slice(i, i + batchSize);
        const batch = writeBatch(db);
        chunk.forEach((dish) => {
          const docRef = doc(db, "dishes", dish.id);
          batch.set(docRef, dish);
        });
        await batch.commit();
      }
      return { success: true, message: `${dishes.length} غذا در دیتابیس ابری ثبت شد.` };
    } catch (e: any) {
      return { success: false, message: "خطا در ثبت: " + e.message };
    }
  },

  purgeCloudDatabase: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      const batch = writeBatch(db);
      snapshot.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
      
      cachedDishes = [];
      const dbInstance = await DB.init();
      await dbInstance.transaction('dishes', 'readwrite').objectStore('dishes').clear();
      
      return { success: true, message: "دیتابیس ابری و کش محلی کاملاً پاکسازی شد." };
    } catch (e: any) {
      return { success: false, message: "خطا در پاکسازی: " + e.message };
    }
  }
};
