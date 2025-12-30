
import { Dish } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { 
  collection, 
  getDocs,
  writeBatch
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { DB } from '../utils/db';

let cachedDishes: Dish[] = [];
let isInitialized = false;

export const RecipeService = {
  initialize: async (): Promise<void> => {
    if (isInitialized) return;
    
    // بارگذاری داده‌های استاتیک (آش‌های جدید)
    cachedDishes = [...DEFAULT_DISHES];
    
    try {
      // بررسی دیتابیس لوکال برای داده‌های ذخیره شده قبلی
      const localDishes = await DB.getAll('dishes');
      if (localDishes && localDishes.length > 0) {
        const existingIds = new Set(cachedDishes.map(d => d.id));
        localDishes.forEach(d => {
          if (!existingIds.has(d.id)) {
            cachedDishes.push(d);
          }
        });
      }
      console.log(`Database initialized with ${cachedDishes.length} dishes.`);
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
        window.dispatchEvent(new CustomEvent('recipes-updated'));
      }
    } catch (e) {
      console.error("Cloud Sync Error:", e);
    }
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
      window.dispatchEvent(new CustomEvent('recipes-updated'));
      return { success: true, message: "دیتابیس ابری پاکسازی و با داده‌های پیش‌فرض جایگزین شد." };
    } catch (e: any) {
      return { success: false, message: "خطا: " + e.message };
    }
  },

  getAllDishes: (): Dish[] => {
    return cachedDishes;
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
    } catch (e) {
      return 0;
    }
  },

  syncAllToFirebase: async (onProgress?: (p: number) => void) => {
    // منطق آپلود به فایربیس در صورت نیاز ادمین
    return { success: true, count: cachedDishes.length, message: `دیتابیس آماده همگام‌سازی است.` };
  }
};
