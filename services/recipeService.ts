
import { Dish, UserProfile } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { 
  collection, 
  getDocs,
  writeBatch
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DB } from '../utils/db';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';

let cachedDishes: Dish[] = [];
let isInitialized = false;
const freeDishIds = new Set<string>();

export const RecipeService = {
  initialize: async (): Promise<void> => {
    if (isInitialized) return;
    cachedDishes = [...DEFAULT_DISHES];
    
    const categories: string[] = ['ash', 'polo', 'khorak', 'stew', 'soup', 'fastfood', 'kabab', 'international'];
    categories.forEach(cat => {
      const firstThree = DEFAULT_DISHES
        .filter(d => d.category === cat)
        .slice(0, 3);
      firstThree.forEach(d => freeDishIds.add(d.id));
    });

    try {
      const localDishes = await DB.getAll('dishes');
      if (localDishes && localDishes.length > 0) {
        const existingIds = new Set(cachedDishes.map(d => d.id));
        localDishes.forEach(d => {
          if (!existingIds.has(d.id)) {
            cachedDishes.push(d);
          }
        });
      }
    } catch (error) {
      console.error("Initialization Error:", error);
    }
    isInitialized = true;
  },

  syncFromCloud: async () => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      const cloudDishes = snapshot.docs.map(doc => doc.data() as Dish);
      if (cloudDishes.length > 0) {
        const existingIds = new Set(cachedDishes.map(d => d.id));
        cloudDishes.forEach(d => {
          if (!existingIds.has(d.id)) {
            cachedDishes.push(d);
          }
        });
        window.dispatchEvent(new CustomEvent('recipes-updated', { detail: { timestamp: Date.now() } }));
      }
    } catch (e) {
      console.error("Cloud Sync Error:", e);
    }
  },

  // این متد لیست تمیز و فیلتر شده را با نام‌های اصلاح شده برمی‌گرداند
  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();
    
    return cachedDishes
      .filter(d => !hiddenIds.includes(d.id))
      .map(d => renamedMap[d.id] ? { ...d, name: renamedMap[d.id] } : d);
  },

  // این متد لیست کامل (خام) را با اعمال نام‌های اصلاح شده برای مدیریت برمی‌گرداند
  getRawDishes: (): Dish[] => {
    const renamedMap = getRenamedDishes();
    return cachedDishes.map(d => renamedMap[d.id] ? { ...d, name: renamedMap[d.id] } : d);
  },

  isDishAccessible: (dishId: string, user: UserProfile | null): boolean => {
    if (!user) return false;
    if (user.isAdmin || user.isApproved) return true;
    return freeDishIds.has(dishId);
  },

  getAccessibleDishes: (user: UserProfile | null): Dish[] => {
    const all = RecipeService.getAllDishes();
    if (!user) return [];
    if (user.isAdmin || user.isApproved) return all;
    return all.filter(d => freeDishIds.has(d.id));
  },

  purgeCloudDatabase: async () => {
    if (!auth.currentUser) return { success: false, message: "دسترسی مدیریت ندارید." };
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      const batch = writeBatch(db);
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      cachedDishes = [...DEFAULT_DISHES];
      window.dispatchEvent(new CustomEvent('recipes-updated', { detail: { timestamp: Date.now() } }));
      return { success: true, message: "دیتابیس ابری پاکسازی شد." };
    } catch (e: any) {
      return { success: false, message: "خطا: " + e.message };
    }
  },

  getLocalCount: () => DEFAULT_DISHES.length,
  getOfflineCacheCount: async () => {
    const cached = await DB.getAll('dishes');
    return cached.length;
  },
  getRealCloudCount: async () => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      return snapshot.size;
    } catch (e) { return 0; }
  }
};
