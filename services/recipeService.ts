
import { Dish, UserProfile } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { 
  collection, 
  getDocs,
  writeBatch,
  doc,
  setDoc
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
    
    // همیشه با لیست خام استاتیک شروع کن (تضمین عدم تکرار در شروع)
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
          // فقط اگر آی‌دی در دیتابیس فعلی نبود اضافه کن
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

  clearAllCache: async () => {
    try {
      // پاکسازی کامل دیتابیس IndexedDB برای جلوگیری از جمع شدن اطلاعات کش قدیمی با دیتابیس جدید
      const dishes = await DB.getAll('dishes');
      for (const dish of dishes) {
        await DB.delete('dishes', dish.id);
      }
      // بازنشانی متغیر لوکال
      cachedDishes = [...DEFAULT_DISHES];
      isInitialized = false;
      console.log("Database cache purged successfully to prevent duplication.");
    } catch (e) {
      console.error("Failed to clear cache", e);
    }
  },

  seedCloudDatabase: async () => {
    if (!auth.currentUser) return { success: false, message: "دسترسی مدیریت ندارید." };
    try {
      const batch = writeBatch(db);
      // انتقال تمام ۴۸۱ غذا از کدهای استاتیک به فایربیس
      DEFAULT_DISHES.forEach((dish) => {
        const docRef = doc(db, "dishes", dish.id);
        batch.set(docRef, dish);
      });
      await batch.commit();
      return { success: true, message: `تعداد ${DEFAULT_DISHES.length} غذا با موفقیت و بدون تغییر به فایربیس منتقل شدند.` };
    } catch (e: any) {
      console.error("Seeding Error:", e);
      return { success: false, message: "خطا در انتقال داده‌ها: " + e.message };
    }
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

  getAllDishes: (): Dish[] => {
    const hiddenIds = getHiddenDishIds();
    const renamedMap = getRenamedDishes();
    
    return cachedDishes
      .filter(d => !hiddenIds.includes(d.id))
      .map(d => renamedMap[d.id] ? { ...d, name: renamedMap[d.id] } : d);
  },

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
