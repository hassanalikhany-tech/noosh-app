import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, ShoppingItem } from "../types";

const notifyUpdate = () => {
  window.dispatchEvent(new Event('user-data-updated'));
};

const createDefaultProfile = (user: any, fullName: string, phoneNumber?: string): UserProfile => ({
  username: user.email ? user.email.split('@')[0] : user.uid.slice(0, 8),
  fullName: fullName || user.displayName || "کاربر نوش",
  passwordCode: "PROTECTED",
  email: user.email || "",
  phoneNumber: phoneNumber || "",
  subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000), // ۱ سال هدیه اولیه
  blacklistedDishIds: [],
  favoriteDishIds: [],
  dislikedIngredients: [],
  excludedCategories: [],
  preferredNatures: ['hot', 'cold', 'balanced'],
  history: [],
  familySize: 4,
  hasCompletedSetup: false,
  customShoppingList: [],
  isAdmin: false
});

export const UserService = {
  /**
   * ورود به سیستم - محدودیت تایید ایمیل برداشته شد تا مدیر بتواند وارد شود
   */
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // جستجوی پروفایل در دیتابیس
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      
      if (!userDoc.exists()) {
        const newProfile = createDefaultProfile(firebaseUser, "");
        await setDoc(doc(db, "users", firebaseUser.uid), newProfile);
        // Fix: satisfy inferred type for Login.tsx result.needsVerification
        return { success: true, user: newProfile, needsVerification: false };
      }

      const userData = userDoc.data() as UserProfile;
      
      // Fix: Check verification for non-admins and return needsVerification for Login.tsx logic
      if (!userData.isAdmin && !firebaseUser.emailVerified) {
        return { 
          success: false, 
          message: "لطفاً ابتدا ایمیل خود را تایید کنید.", 
          needsVerification: true 
        };
      }

      // Fix: satisfy inferred type for Login.tsx result.needsVerification
      return { success: true, user: userData, needsVerification: false };
    } catch (error: any) {
      console.error(error);
      // Fix: satisfy inferred type for Login.tsx result.needsVerification
      return { 
        success: false, 
        message: "ایمیل یا رمز عبور اشتباه است.", 
        needsVerification: false 
      };
    }
  },

  resendVerificationEmail: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      return { success: true, message: "لینک تایید مجدداً ارسال شد." };
    } catch (error: any) {
      return { success: false, message: "خطا در ارسال مجدد ایمیل." };
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const data = userDoc.data() as UserProfile;
        return { success: true, user: data };
      } else {
        const newUser = createDefaultProfile(user, user.displayName || "");
        await setDoc(userDocRef, newUser);
        return { success: true, user: newUser };
      }
    } catch (error: any) {
      return { success: false, message: "خطا در اتصال به حساب گوگل." };
    }
  },

  register: async (data: any) => {
    try {
      const { email, password, fullName, phoneNumber } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // ارسال ایمیل تایید به صورت اختیاری در پس‌زمینه
      sendEmailVerification(firebaseUser).catch(e => console.log("Verification email fail", e));
      
      const newUser = createDefaultProfile(firebaseUser, fullName, phoneNumber);
      await setDoc(doc(db, "users", firebaseUser.uid), newUser);

      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, message: "خطا در ثبت‌نام." };
    }
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            resolve(userDoc.data() as UserProfile);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  },

  /**
   * فعال‌سازی دسترسی مدیریت برای کاربر فعلی (شما)
   */
  seedAdmin: async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      const data = userDoc.data() as UserProfile;
      // اگر کاربر وارد شده ادمین نیست، او را ادمین کن
      if (!data.isAdmin) {
        await updateDoc(userDocRef, { isAdmin: true });
        notifyUpdate();
      }
    }
  },

  updateProfile: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", user.uid), updates);
    const updated = await getDoc(doc(db, "users", user.uid));
    const data = updated.data() as UserProfile;
    notifyUpdate();
    return data;
  },

  updatePreferences: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    return UserService.updateProfile(username, updates);
  },

  toggleFavorite: async (username: string, dishId: string): Promise<UserProfile> => {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error("User not found");
    const favorites = user.favoriteDishIds?.includes(dishId) 
      ? user.favoriteDishIds.filter(id => id !== dishId)
      : [...(user.favoriteDishIds || []), dishId];
    return UserService.updateProfile(username, { favoriteDishIds: favorites });
  },

  toggleBlacklist: async (username: string, dishId: string): Promise<UserProfile> => {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error("User not found");
    const blacklist = user.blacklistedDishIds?.includes(dishId)
      ? user.blacklistedDishIds.filter(id => id !== dishId)
      : [...(user.blacklistedDishIds || []), dishId];
    return UserService.updateProfile(username, { blacklistedDishIds: blacklist });
  },

  updateShoppingList: async (username: string, items: ShoppingItem[]): Promise<UserProfile> => {
    return UserService.updateProfile(username, { customShoppingList: items });
  },

  extendSubscription: async (username: string, days: number): Promise<UserProfile> => {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error("User not found");
    const currentExpiry = user.subscriptionExpiry || Date.now();
    const newExpiry = Math.max(currentExpiry, Date.now()) + (days * 24 * 60 * 60 * 1000);
    return UserService.updateProfile(username, { subscriptionExpiry: newExpiry });
  },

  getAllUsers: async (): Promise<UserProfile[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(d => d.data() as UserProfile);
  },

  deleteUser: async (username: string): Promise<void> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userDoc = querySnapshot.docs.find(d => (d.data() as UserProfile).username === username);
    if (userDoc) await deleteDoc(userDoc.ref);
  },

  logout: async () => {
    await signOut(auth);
  },

  isSubscriptionValid: (user: UserProfile): boolean => {
    return !!(user.isAdmin || user.subscriptionExpiry > Date.now());
  }
};
