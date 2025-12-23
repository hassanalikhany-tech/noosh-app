
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
import { db } from "./firebase";
import { DB } from '../utils/db';

let cachedDishes: Dish[] = [...DEFAULT_DISHES];

const sanitizeForFirebase = (obj: any): any => {
  if (obj === null || obj === undefined) return "";
  if (Array.isArray(obj)) return obj.map(sanitizeForFirebase);
  if (typeof obj === 'object') {
    const cleanObj: any = {};
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      cleanObj[key] = (value !== undefined && value !== null) ? sanitizeForFirebase(value) : "";
    });
    return cleanObj;
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
    const items = await DB.getAll('dishes');
    return items.length;
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
  },

  syncAllToFirebase: async () => {
    try {
      const allDishes = DEFAULT_DISHES.filter(d => d && d.id);
      const chunkSize = 50; 
      for (let i = 0; i < allDishes.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = allDishes.slice(i, i + chunkSize);
        chunk.forEach((dish) => {
          const cleanDish = sanitizeForFirebase(dish);
          const dishRef = doc(db, "dishes", dish.id);
          batch.set(dishRef, cleanDish, { merge: true });
        });
        await batch.commit();
      }
      return { success: true, count: allDishes.length };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  },

  clearCloudDatabase: async () => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      const batchSize = 400;
      for (let i = 0; i < snapshot.docs.length; i += batchSize) {
        const batch = writeBatch(db);
        snapshot.docs.slice(i, i + batchSize).forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
      return true;
    } catch (e) {
      return false;
    }
  }
};
