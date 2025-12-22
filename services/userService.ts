
import { UserProfile, ShoppingItem } from '../types';

const USERS_STORAGE_KEY = 'pmp_users_db_v2'; 
const CURRENT_USER_KEY = 'pmp_current_username_v2';

const getUsersDB = (): Record<string, UserProfile> => {
  try {
    const data = localStorage.getItem(USERS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveUsersDB = (db: Record<string, UserProfile>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(db));
  window.dispatchEvent(new CustomEvent('user-data-updated'));
};

export const UserService = {
  login: (identifier: string, code: string): { success: boolean; user?: UserProfile; message?: string } => {
    const db = getUsersDB();
    
    if (identifier === 'admin' && code === 'admin') {
      const adminUser: UserProfile = {
        username: 'admin',
        fullName: 'مدیر سیستم',
        passwordCode: 'admin',
        subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
        blacklistedDishIds: [],
        favoriteDishIds: [],
        // Fix: Added missing required property dislikedIngredients
        dislikedIngredients: [],
        excludedCategories: [],
        preferredNatures: ['hot', 'cold', 'balanced'],
        history: [],
        familySize: 4,
        isAdmin: true,
        customShoppingList: [],
        hasCompletedSetup: true
      };
      db['admin'] = adminUser;
      saveUsersDB(db);
      localStorage.setItem(CURRENT_USER_KEY, 'admin');
      return { success: true, user: adminUser };
    }

    const user = Object.values(db).find(u => u.username === identifier || u.email === identifier);

    if (!user) return { success: false, message: 'حساب کاربری با این مشخصات یافت نشد.' };

    if (user.passwordCode === code) {
      if (!user.favoriteDishIds) user.favoriteDishIds = [];
      if (!user.blacklistedDishIds) user.blacklistedDishIds = [];
      db[user.username] = user; 
      saveUsersDB(db);
      localStorage.setItem(CURRENT_USER_KEY, user.username);
      return { success: true, user };
    } else {
      return { success: false, message: 'رمز عبور اشتباه است.' };
    }
  },

  register: (data: { username: string; code: string; fullName: string; email?: string; phoneNumber?: string; avatar?: string }): { success: boolean; user?: UserProfile; message?: string } => {
    const db = getUsersDB();
    if (db[data.username] || data.username === 'admin') return { success: false, message: 'این نام کاربری قبلاً گرفته شده است.' };

    const newUser: UserProfile = {
      username: data.username,
      fullName: data.fullName,
      passwordCode: data.code,
      email: data.email,
      phoneNumber: data.phoneNumber,
      avatar: data.avatar,
      subscriptionExpiry: Date.now() + (30 * 24 * 60 * 60 * 1000), 
      blacklistedDishIds: [],
      favoriteDishIds: [],
      // Fix: Added missing required property dislikedIngredients
      dislikedIngredients: [],
      excludedCategories: [],
      preferredNatures: ['hot', 'cold', 'balanced'],
      history: [],
      familySize: 4,
      customShoppingList: [],
      hasCompletedSetup: false
    };

    db[data.username] = newUser;
    saveUsersDB(db);
    localStorage.setItem(CURRENT_USER_KEY, data.username);
    return { success: true, user: newUser };
  },

  logout: () => localStorage.removeItem(CURRENT_USER_KEY),

  getCurrentUser: (): UserProfile | null => {
    const username = localStorage.getItem(CURRENT_USER_KEY);
    if (!username) return null;
    const db = getUsersDB();
    const user = db[username];
    if (user) {
        if (!user.favoriteDishIds) user.favoriteDishIds = [];
        if (!user.blacklistedDishIds) user.blacklistedDishIds = [];
    }
    return user || null;
  },

  toggleFavorite: (username: string, dishId: string): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      const favorites = user.favoriteDishIds || [];
      if (favorites.includes(dishId)) {
        user.favoriteDishIds = favorites.filter(id => id !== dishId);
      } else {
        user.favoriteDishIds = [...favorites, dishId];
        // اگر لایک شد، از دیس‌لایک خارج شود
        user.blacklistedDishIds = (user.blacklistedDishIds || []).filter(id => id !== dishId);
      }
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  toggleBlacklist: (username: string, dishId: string): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      const blacklist = user.blacklistedDishIds || [];
      if (blacklist.includes(dishId)) {
        user.blacklistedDishIds = blacklist.filter(id => id !== dishId);
      } else {
        user.blacklistedDishIds = [...blacklist, dishId];
        // اگر دیس‌لایک شد، از لایک‌ها خارج شود
        user.favoriteDishIds = (user.favoriteDishIds || []).filter(id => id !== dishId);
      }
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  addToBlacklist: (username: string, dishIds: string[]): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      const currentBlacklist = user.blacklistedDishIds || [];
      const newBlacklistSet = new Set([...currentBlacklist, ...dishIds]);
      user.blacklistedDishIds = Array.from(newBlacklistSet);
      user.favoriteDishIds = (user.favoriteDishIds || []).filter(id => !dishIds.includes(id));
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  removeFromBlacklist: (username: string, dishId: string): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      user.blacklistedDishIds = (user.blacklistedDishIds || []).filter(id => id !== dishId);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  updatePreferences: (username: string, updates: Partial<UserProfile>): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      Object.assign(user, updates);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  isSubscriptionValid: (user: UserProfile): boolean => user.isAdmin || user.subscriptionExpiry > Date.now(),
  getAllUsers: (): UserProfile[] => Object.values(getUsersDB()),
  extendSubscription: (username: string, days: number): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      const now = Date.now();
      const baseTime = user.subscriptionExpiry > now ? user.subscriptionExpiry : now;
      user.subscriptionExpiry = baseTime + (days * 24 * 60 * 60 * 1000);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  deleteUser: (username: string) => {
    const db = getUsersDB();
    delete db[username];
    saveUsersDB(db);
  },

  addToHistory: (username: string, dishIds: string[]): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      const currentHistory = user.history || [];
      user.history = [...currentHistory, ...dishIds].slice(-100);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  updateShoppingList: (username: string, items: ShoppingItem[]): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      user.customShoppingList = items;
      saveUsersDB(db);
      window.dispatchEvent(new Event('cart-updated'));
      return user;
    }
    throw new Error('User not found');
  }
};