
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
};

export const UserService = {
  login: (identifier: string, code: string): { success: boolean; user?: UserProfile; message?: string } => {
    const db = getUsersDB();
    
    // Admin backdoor
    if (identifier === 'admin' && code === 'admin') {
      const adminUser: UserProfile = {
        username: 'admin',
        fullName: 'مدیر سیستم',
        passwordCode: 'admin',
        subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
        blacklistedDishIds: [],
        excludedCategories: [],
        history: [],
        familySize: 4,
        isAdmin: true,
        customShoppingList: []
      };
      db['admin'] = adminUser;
      saveUsersDB(db);
      localStorage.setItem(CURRENT_USER_KEY, 'admin');
      return { success: true, user: adminUser };
    }

    // Search by username OR email
    const user = Object.values(db).find(u => u.username === identifier || u.email === identifier);

    if (!user) return { success: false, message: 'حساب کاربری با این مشخصات یافت نشد.' };

    if (user.passwordCode === code) {
      if (!user.familySize) user.familySize = 4;
      if (!user.customShoppingList) user.customShoppingList = [];
      
      // Ensure DB is updated if we added default fields
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
    
    // Check for duplicate username
    if (db[data.username] || data.username === 'admin') {
      return { success: false, message: 'این نام کاربری قبلاً گرفته شده است.' };
    }

    // Check for duplicate email if provided
    if (data.email) {
      const emailExists = Object.values(db).some(u => u.email === data.email);
      if (emailExists) {
        return { success: false, message: 'این ایمیل قبلاً ثبت شده است.' };
      }
    }

    const newUser: UserProfile = {
      username: data.username,
      fullName: data.fullName,
      passwordCode: data.code,
      email: data.email,
      phoneNumber: data.phoneNumber,
      avatar: data.avatar,
      subscriptionExpiry: Date.now() + (24 * 60 * 60 * 1000), // 24 hours trial
      blacklistedDishIds: [],
      excludedCategories: [],
      history: [],
      familySize: 4,
      customShoppingList: []
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
    
    // Robust check: Ensure all array/object properties exist to prevent crashes
    if (user) {
        if (!user.customShoppingList) user.customShoppingList = [];
        if (!user.blacklistedDishIds) user.blacklistedDishIds = [];
        if (!user.excludedCategories) user.excludedCategories = [];
        if (!user.history) user.history = [];
        if (!user.familySize) user.familySize = 4;
    }
    
    return user || null;
  },

  isSubscriptionValid: (user: UserProfile): boolean => {
    if (user.isAdmin) return true;
    return user.subscriptionExpiry > Date.now();
  },

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

  addToBlacklist: (username: string, dishIds: string[]): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      // Ensure array exists
      if (!user.blacklistedDishIds) user.blacklistedDishIds = [];
      const set = new Set([...user.blacklistedDishIds, ...dishIds]);
      user.blacklistedDishIds = Array.from(set);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },

  removeFromBlacklist: (username: string, dishId: string): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      if (!user.blacklistedDishIds) user.blacklistedDishIds = [];
      user.blacklistedDishIds = user.blacklistedDishIds.filter(id => id !== dishId);
      saveUsersDB(db);
      return user;
    }
    throw new Error('User not found');
  },
  
  addToHistory: (username: string, dishIds: string[]): UserProfile => {
    const db = getUsersDB();
    const user = db[username];
    if (user) {
      if (!user.history) user.history = [];
      user.history = [...user.history, ...dishIds];
      if (user.history.length > 100) user.history = user.history.slice(user.history.length - 100);
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
  },

  getAllUsers: (): UserProfile[] => Object.values(getUsersDB()),
  deleteUser: (username: string) => {
    const db = getUsersDB();
    delete db[username];
    saveUsersDB(db);
  }
};
