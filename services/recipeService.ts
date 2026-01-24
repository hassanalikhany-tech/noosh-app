
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
const freeDishIds = new Set<string>();

export const RecipeService = {
  // مقداردهی اولیه هوشمند با اولویت دریافت از ابر
  initialize: async (onProgress?: (p: number, status: string) => void): Promise<{count: number, error?: string, source: string}> => {
    try {
      onProgress?.(10, 'در حال بررسی حافظه موقت...');
      const localCache = await DB.getAll('dishes');
      
      if (localCache && localCache.length > 0) {
        cachedDishes = localCache;
        RecipeService.rebuildFreeAccessMap();
        onProgress?.(30, 'داده‌های محلی بارگذاری شد. در حال همگام‌سازی با سرور...');
      }

      // تلاش برای همگام‌سازی خودکار با سرور
      // از آنجا که این متد در ابتدای اپ فراخوانی می‌شود، 
      // اگر کاربر لاگین باشد، داده‌های جدید را جایگزین می‌کند.
      const syncResult = await RecipeService.syncFromCloud(true); 

      if (syncResult.count > 0) {
        onProgress?.(100, 'دیتابیس ابری با موفقیت همگام شد.');
        isInitialized = true;
        return { count: syncResult.count, source: 'cloud' };
      }

      onProgress?.(100, 'آماده اجرا.');
      isInitialized = true;
      return { 
        count: cachedDishes.length, 
        source: cachedDishes.length > 0 ? 'cache' : 'none'
      };

    } catch (e: any) {
      console.error("Critical Init Error:", e);
      return { count: cachedDishes.length || 0, source: 'error', error: e.message };
    }
  },

  rebuildFreeAccessMap: () => {
    freeDishIds.clear();
    const categories: string[] = ['ash', 'polo', 'khorak', 'stew', 'soup', 'fastfood', 'kabab', 'international'];
    categories.forEach(cat => {
      const dishesInCategory = cachedDishes.filter(d => d.category === cat);
      dishesInCategory.slice(0, 3).forEach(d => freeDishIds.add(d.id));
    });
  },

  // همگام‌سازی با سرور - پارامتر پیش‌فرض به true تغییر یافت
  syncFromCloud: async (forceServer: boolean = true): Promise<{count: number, error?: string}> => {
    try {
      // اگر هنوز کاربر لاگین نکرده باشد، نمی‌توانیم همگام‌سازی کنیم
      if (!auth.currentUser) return { count: 0, error: 'not-logged-in' };

      const q = query(collection(db, "dishes"), limit(3000));
      // اجبار به خواندن از سرور برای اطمینان از دریافت آخرین تغییرات
      const snapshot = await (forceServer ? getDocsFromServer(q) : getDocs(q));
      const cloudDishes = snapshot.docs.map(doc => doc.data() as Dish);
      
      if (cloudDishes.length > 0) {
        cachedDishes = cloudDishes;
        const dbInstance = await DB.init();
        const transaction = dbInstance.transaction('dishes', 'readwrite');
        const store = transaction.objectStore('dishes');
        await store.clear();
        
        for (const d of cloudDishes) {
          await store.put(d);
        }
        
        RecipeService.rebuildFreeAccessMap();
        window.dispatchEvent(new CustomEvent('recipes-updated', { detail: { count: cloudDishes.length } }));
        return { count: cloudDishes.length };
      }
      
      return { count: cachedDishes.length };
    } catch (e: any) {
      console.error("Sync Error:", e.code || e.message);
      return { count: 0, error: e.code || 'unknown' };
    }
  },

  applyBulkChanges: async (deletions: string[], renames: Map<string, string>): Promise<boolean> => {
    try {
      if (!auth.currentUser) throw new Error("لطفاً ابتدا وارد حساب کاربری خود شوید.");
      
      const allTasks: {type: 'delete' | 'update', id: string, data?: any}[] = [];
      deletions.forEach(id => allTasks.push({ type: 'delete', id }));
      renames.forEach((name, id) => allTasks.push({ type: 'update', id, data: { name } }));

      if (allTasks.length === 0) return true;

      const CHUNK_SIZE = 400;
      for (let i = 0; i < allTasks.length; i += CHUNK_SIZE) {
        const chunk = allTasks.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);
        
        chunk.forEach(task => {
          const ref = doc(db, "dishes", task.id);
          if (task.type === 'delete') batch.delete(ref);
          else batch.update(ref, task.data);
        });

        await batch.commit();
      }

      await RecipeService.syncFromCloud(true);
      return true;
    } catch (e: any) {
      console.error("Bulk Change Error:", e);
      throw e; 
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
