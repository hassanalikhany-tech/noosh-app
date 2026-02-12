
import { Dish, UserProfile } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { 
  collection, 
  getDocs,
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
  initialize: async (): Promise<{count: number}> => {
    try {
      const localCache = await DB.getAll('dishes');
      if (localCache && localCache.length > 0) {
        cachedDishes = localCache;
      }
      isInitialized = true;
      return { count: cachedDishes.length };
    } catch (e) {
      return { count: 0 };
    }
  },

  syncFromCloud: async (forceServer: boolean = true): Promise<{count: number, error?: string}> => {
    if (_isSyncing) return { count: cachedDishes.length };
    
    try {
      _isSyncing = true;
      
      // تلاش برای دریافت داده‌ها (حتی اگر Auth کامل نشده باشد، قوانین فایربیس اگر روی true باشد اجازه می‌دهد)
      const q = query(collection(db, "dishes"), limit(4000));
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
        
        notifyRecipesUpdate(cloudDishes.length);
      }
      
      _isSyncing = false;
      return { count: cachedDishes.length };
    } catch (e: any) {
      _isSyncing = false;
      console.error("Sync error:", e.message);
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
    return true; 
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
    try {
      const snapshot = await getDocs(query(collection(db, "dishes"), limit(1)));
      return snapshot.size > 0 ? cachedDishes.length : 0; 
    } catch { return 0; }
  },

  getLocalCount: () => 0,

  seedFromExternalData: async (dishes: Dish[]) => {
    const batchSize = 400;
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
