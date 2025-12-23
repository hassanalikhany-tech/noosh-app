
import { Dish } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';
import { 
  doc, 
  collection, 
  setDoc, 
  getDocs,
  getCountFromServer,
  query,
  limit
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DB } from '../utils/db';

let cachedDishes: Dish[] = [...DEFAULT_DISHES];

const cleanObject = (obj: any): any => {
  if (Array.isArray(obj)) return obj.map(item => cleanObject(item));
  if (obj !== null && typeof obj === 'object') {
    const newObj: any = {};
    Object.keys(obj).forEach(key => {
      const val = obj[key];
      if (val !== undefined && val !== null) {
        newObj[key] = cleanObject(val);
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
      
      // ابتدا لیست پیش‌فرض را بارگذاری می‌کنیم
      DEFAULT_DISHES.forEach(d => dishMap.set(d.id, d));
      
      // سپس لیست آفلاین را اضافه می‌کنیم (اگر دیتای آفلاین مراحل پخت بیشتری داشت، اولویت دارد)
      if (offlineDishes && offlineDishes.length > 0) {
        offlineDishes.forEach(d => {
          const existing = dishMap.get(d.id);
          if (!existing || (d.recipeSteps && d.recipeSteps.length >= existing.recipeSteps.length)) {
            dishMap.set(d.id, d);
          }
        });
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
        
        // اولویت با داده‌های ابری است اگر رسپی کامل‌تری داشته باشند
        cloudDishes.forEach(d => {
           const existing = dishMap.get(d.id);
           if (!existing || (d.recipeSteps && d.recipeSteps.length >= existing.recipeSteps.length)) {
             dishMap.set(d.id, d);
           }
        });

        cachedDishes = Array.from(dishMap.values());
        window.dispatchEvent(new CustomEvent('recipes-updated', { detail: cachedDishes }));
      }
    } catch (e) {
      console.warn("Cloud sync failed:", e);
    }
  },

  testConnection: async () => {
    try {
      const q = query(collection(db, "dishes"), limit(1));
      await getDocs(q);
      return { success: true, message: "اتصال با دیتابیس برقرار است." };
    } catch (error: any) {
      return { success: false, message: `خطای اتصال: ${error.message}` };
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

  syncAllToFirebase: async (onProgress?: (p: number) => void) => {
    if (!auth.currentUser) return { success: false, message: "شما لاگین نکرده‌اید." };

    try {
      const allDishes = RecipeService.getAllDishes();
      let successCount = 0;
      let errorCount = 0;

      for (let i = 0; i < allDishes.length; i++) {
        const dish = allDishes[i];
        // فقط اگر دیتای غنی داشته باشد آپلود کن
        if (dish.recipeSteps && dish.recipeSteps.length > 2) {
          try {
            const cleaned = cleanObject(dish);
            const dishRef = doc(db, "dishes", dish.id);
            await setDoc(dishRef, cleaned, { merge: true });
            successCount++;
          } catch (e) {
            errorCount++;
          }
        }
        
        if (onProgress) onProgress(Math.round(((i + 1) / allDishes.length) * 100));
        if (i % 10 === 0) await new Promise(r => setTimeout(r, 50));
      }
      
      return { 
        success: true, 
        count: successCount, 
        message: "همگام‌سازی داده‌های غنی با موفقیت انجام شد."
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }
};
