
import { Dish } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';
import { 
  doc, 
  collection, 
  writeBatch, 
  getDocs,
  getCountFromServer
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DB } from '../utils/db';

let cachedDishes: Dish[] = [...DEFAULT_DISHES];

// تابع بسیار دقیق برای حذف مقادیر غیرمجاز از شیء قبل از ارسال به فایربیس
const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(item => cleanObject(item));
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      // فایربیس اجازه ذخیره undefined را نمی‌دهد
      if (val !== undefined && val !== null) {
        if (typeof val === 'object') {
          newObj[key] = cleanObject(val);
        } else {
          newObj[key] = val;
        }
      }
    });
    return newObj;
  }
  return obj;
};

export const RecipeService = {
  initialize: async (): Promise<void> => {
    try {
      const offlineDishes = await DB.getAll('dishes');
      const dishMap = new Map();
      DEFAULT_DISHES.forEach(d => dishMap.set(d.id, d));
      if (offlineDishes && offlineDishes.length > 0) {
        offlineDishes.forEach(d => dishMap.set(d.id, d));
      }
      cachedDishes = Array.from(dishMap.values());
      
      if (navigator.onLine) {
        RecipeService.syncFromCloud();
      }
    } catch (error) {
      console.error("Initialization Error:", error);
      cachedDishes = DEFAULT_DISHES;
    }
  },

  syncFromCloud: async () => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      if (!snapshot.empty) {
        const cloudDishes = snapshot.docs.map(d => d.data() as Dish);
        for (const dish of cloudDishes) {
          await DB.put('dishes', dish);
        }
        const dishMap = new Map();
        DEFAULT_DISHES.forEach(d => dishMap.set(d.id, d));
        cloudDishes.forEach(d => dishMap.set(d.id, d));
        cachedDishes = Array.from(dishMap.values());
        window.dispatchEvent(new CustomEvent('recipes-updated', { detail: cachedDishes }));
      }
    } catch (e) {
      console.warn("Cloud sync failed:", e);
    }
  },

  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();
    return cachedDishes
      .filter(d => d && d.id && !hiddenIds.includes(d.id))
      .map(dish => {
        if (renamedMap[dish.id]) {
          return { ...dish, name: renamedMap[dish.id] };
        }
        return dish;
      });
  },

  getLocalCount: () => DEFAULT_DISHES.length,
  
  getOfflineCacheCount: async () => {
    try {
      const items = await DB.getAll('dishes');
      return items.length;
    } catch {
      return 0;
    }
  },

  getRealCloudCount: async () => {
    try {
      const coll = collection(db, "dishes");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    } catch (e) {
      console.error("Count Error:", e);
      return 0;
    }
  },

  clearLocalCache: async () => {
    try {
      const dbInstance = await DB.init();
      return new Promise((resolve) => {
        const transaction = dbInstance.transaction('dishes', 'readwrite');
        const store = transaction.objectStore('dishes');
        const request = store.clear();
        request.onsuccess = () => {
          cachedDishes = [...DEFAULT_DISHES];
          window.dispatchEvent(new CustomEvent('recipes-updated', { detail: cachedDishes }));
          resolve(true);
        };
      });
    } catch {
      return false;
    }
  },

  syncAllToFirebase: async () => {
    if (!auth.currentUser) {
      return { success: false, message: "شما وارد حساب کاربری نشده‌اید." };
    }

    try {
      const dishMap = new Map();
      // اول کدهای پیش‌فرض را می‌گیرم
      DEFAULT_DISHES.forEach(d => {
        if (d && d.id) dishMap.set(d.id, d);
      });
      // بعد کش آفلاین را (اگر تغییراتی داشته)
      const offlineDishes = await DB.getAll('dishes');
      offlineDishes.forEach(d => {
        if (d && d.id) dishMap.set(d.id, d);
      });
      
      const allDishes = Array.from(dishMap.values());
      console.log(`Starting sync for ${allDishes.length} dishes...`);
      
      const chunkSize = 25; // دسته‌های کوچک‌تر برای اطمینان بیشتر از موفقیت
      let processedCount = 0;

      for (let i = 0; i < allDishes.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = allDishes.slice(i, i + chunkSize);
        
        chunk.forEach((dish) => {
          const cleaned = cleanObject(dish);
          const dishRef = doc(db, "dishes", dish.id);
          batch.set(dishRef, cleaned, { merge: true });
        });
        
        await batch.commit();
        processedCount += chunk.length;
        console.log(`Sync progress: ${processedCount}/${allDishes.length}`);
      }
      
      return { success: true, count: processedCount };
    } catch (error: any) {
      console.error("Firebase Sync Critical Error:", error);
      let customMsg = error.message;
      if (error.code === 'permission-denied') {
        customMsg = "دسترسی نوشتن در دیتابیس رد شد. مطمئن شوید ادمین هستید.";
      }
      return { success: false, message: customMsg };
    }
  }
};
