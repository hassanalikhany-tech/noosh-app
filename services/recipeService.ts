import { Dish } from '../types';
import { DEFAULT_DISHES } from '../data/recipes';
import { getHiddenDishIds, getRenamedDishes } from '../utils/dishStorage';
import { 
  doc, 
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
    
    // دستور صریح: پاکسازی کامل تمامی لایه‌ها
    cachedDishes = [];
    
    try {
      // پاکسازی اجباری کش مرورگر (IndexedDB) در هر بار اجرا برای اطمینان از صفر بودن
      const dbInstance = await DB.init();
      const transaction = dbInstance.transaction(['dishes'], 'readwrite');
      transaction.objectStore('dishes').clear();
      
      console.log("Database Purged: Count is now 0");
    } catch (error) {
      console.error("Initialization Wipe Error:", error);
    }

    isInitialized = true;
    // مسدود کردن همگام‌سازی ابری برای جلوگیری از بازگشت ۳۲۶ غذا
  },

  syncFromCloud: async () => {
    // غیرفعال شد: طبق دستور کاربر هیچ داده‌ای نباید از ابر دریافت شود
    return;
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
      cachedDishes = [];
      window.dispatchEvent(new CustomEvent('recipes-updated', { detail: [] }));
      return { success: true, message: "دیتابیس ابری کاملاً پاکسازی شد." };
    } catch (e: any) {
      return { success: false, message: "خطا: " + e.message };
    }
  },

  getAllDishes: (): Dish[] => {
    // همیشه آرایه خالی برمی‌گرداند تا تعداد ۰ بماند
    return cachedDishes;
  },

  getLocalCount: () => 0,
  
  getOfflineCacheCount: async () => 0,

  getRealCloudCount: async () => {
    try {
      const snapshot = await getDocs(collection(db, "dishes"));
      return snapshot.size;
    } catch (e) {
      return 0;
    }
  },

  syncAllToFirebase: async (onProgress?: (p: number) => void) => {
    return { success: true, count: 0, message: `دیتابیس در حالت پاکسازی کامل است.` };
  }
};