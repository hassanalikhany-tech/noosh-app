
import { Dish } from '../types';

const DB_NAME = 'PersianMealPlannerDB';
const DB_VERSION = 1;
const STORE_NAME = 'dishes';

export const DB = {
  open: (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      // Check if IndexedDB is supported
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is not supported"));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        resolve((event.target as IDBOpenDBRequest).result);
      };

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  },

  getAllDishes: async (): Promise<Dish[]> => {
    try {
      const db = await DB.open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (e) {
      console.error("DB Read Error", e);
      return [];
    }
  },

  addDishes: async (dishes: Dish[], append: boolean): Promise<void> => {
    const db = await DB.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      transaction.oncomplete = () => resolve();
      transaction.onerror = (e) => reject(transaction.error || e);
      transaction.onabort = (e) => reject(transaction.error || e);

      if (!append) {
        store.clear();
      }

      dishes.forEach(dish => {
        if (dish && dish.id && dish.name) {
            store.put(dish);
        }
      });
    });
  },

  clearDatabase: async (): Promise<void> => {
    const db = await DB.open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();
      
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};
