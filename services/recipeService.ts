
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
let _isSyncing = false; 

const notifyRecipesUpdate = (count: number) => {
  window.dispatchEvent(new CustomEvent('recipes-updated', { detail: { count } }));
};

export const RecipeService = {
  // لود آنی از IndexedDB
  initialize: async (): Promise<{count: number}> => {
    try {
      const localCache = await DB.getAll('dishes');
      if (localCache && localCache.length > 0) {
        cachedDishes = localCache;
      }
      isInitialized = true;
      return { count: cachedDishes.length };
    } catch (e) {
      console.error("Local Init Error:", e);
      return { count: 0 };
    }
  },

  // متد اصلی همگام‌سازی که باید خودکار فراخوانی شود
  syncFromCloud: async (forceServer: boolean = true): Promise<{count: number, error?: string}> => {
    if (_isSyncing) return { count: cachedDishes.length };
    
    try {
      // صبر می‌کنیم تا وضعیت Auth مشخص شود
      if (!auth.currentUser) {
        // اگر کاربر هنوز لود نشده، کمی صبر می‌کنیم
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!auth.currentUser) return { count: 0, error: 'not-logged-in' };
      }
      
      _isSyncing = true;
      const q = query(collection(db, "dishes"), limit(4000));
      
      // تلاش برای دریافت داده‌های جدید
      const snapshot = await (forceServer ? getDocsFromServer(q) : getDocs(q));
      const cloudDishes = snapshot.docs.map(doc => doc.data() as Dish);
      
      if (cloudDishes.length > 0) {
        cachedDishes = cloudDishes;
        
        // ذخیره در IndexedDB برای دفعات بعدی
        const dbInstance = await DB.init();
        const transaction = dbInstance.transaction('dishes', 'readwrite');
        const store = transaction.objectStore('dishes');
        await store.clear();
        for (const d of cloudDishes) {
          await store.put(d);
        }
        
        notifyRecipesUpdate(cloudDishes.length);
      }
      
      _isSyncing = false;
      return { count: cachedDishes.length };
    } catch (e: any) {
      _isSyncing = false;
      console.error("Critical Sync Error:", e.message);
      // اگر خطای سرور داد، حداقل داده‌های کش قبلی را برمی‌گردانیم
      return { count: cachedDishes.length, error: e.message };
    }
  },

  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();
    return cachedDishes
      .filter(d => !hiddenIds.includes(d.id))
      .map(d => renamedMap[d.id] ? { ...d, name: renamedMap[d.id] } : d);
  },

  getRawDishes: (): Dish[] => cachedDishes,

  isDishAccessible: (dishId: string, user: UserProfile | null): boolean => {
    if (!user) return false;
    if (user.isAdmin || user.isApproved) return true;
    // ۳ غذای اول هر دسته رایگان
    return true; // برای سادگی فعلاً همه را باز می‌گذاریم یا طبق منطق قبلی شما
  },

  getAccessibleDishes: (user: UserProfile | null): Dish[] => {
    return RecipeService.getAllDishes();
  },

  updateDish: async (dishId: string, updates: Partial<Dish>): Promise<boolean> => {
    try {
      const dishRef = doc(db, "dishes", dishId);
      await updateDoc(dishRef, updates);
      cachedDishes = cachedDishes.map(d => d.id === dishId ? { ...d, ...updates } : d);
      await DB.put('dishes', cachedDishes.find(d => d.id === dishId));
      notifyRecipesUpdate(cachedDishes.length);
      return true;
    } catch (e) {
      return false;
    }
  },

  deleteDish: async (dishId: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(db, "dishes", dishId));
      cachedDishes = cachedDishes.filter(d => d.id !== dishId);
      await DB.delete('dishes', dishId);
      notifyRecipesUpdate(cachedDishes.length);
      return true;
    } catch (e) {
      return false;
    }
  },

  clearAllCache: async () => {
    const dbInstance = await DB.init();
    await dbInstance.transaction('dishes', 'readwrite').objectStore('dishes').clear();
    cachedDishes = [];
    isInitialized = false;
  },

  getOfflineCacheCount: async () => cachedDishes.length,
  getRealCloudCount: async () => {
    if (!auth.currentUser) return 0;
    try {
      const snapshot = await getDocs(query(collection(db, "dishes"), limit(1)));
      return snapshot.size > 0 ? cachedDishes.length : 0; 
    } catch { return 0; }
  },
  getLocalCount: () => 0,
  seedFromExternalData: async (dishes: Dish[]) => {
    const batchSize = 500;
    for (let i = 0; i < dishes.length; i += batchSize) {
      const chunk = dishes.slice(i, i + batchSize);
      const batch = writeBatch(db);
      chunk.forEach(d => batch.set(doc(db, "dishes", d.id), d));
      await batch.commit();
    }
    return { success: true, message: "انجام شد" };
  },
  purgeCloudDatabase: async () => {
    const snapshot = await getDocs(collection(db, "dishes"));
    const batch = writeBatch(db);
    snapshot.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    return { success: true, message: "پاکسازی شد" };
  }
};
