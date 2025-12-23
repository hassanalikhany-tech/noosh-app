
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
  subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000), 
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
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      let userData: UserProfile;

      if (!userDoc.exists()) {
        userData = createDefaultProfile(firebaseUser, "");
        await setDoc(userDocRef, userData);
      } else {
        userData = userDoc.data() as UserProfile;
      }
      
      // Force admin if it's your email
      if (firebaseUser.email === 'm.fatahi2010@gmail.com' && !userData.isAdmin) {
        userData.isAdmin = true;
        await updateDoc(userDocRef, { isAdmin: true });
      }

      // تایید ایمیل موقتاً غیرفعال شد
      return { success: true, user: userData, needsVerification: false };

    } catch (error: any) {
      console.error("Login Error:", error.code);
      let msg = "ایمیل یا رمز عبور اشتباه است.";
      if (error.code === 'auth/invalid-credential') msg = "اطلاعات ورود نامعتبر است. دوباره تلاش کنید.";
      
      return { 
        success: false, 
        message: msg, 
        needsVerification: false 
      };
    }
  },

  resendVerificationEmail: async (email: string, password: string) => {
    // این متد فعلاً بلااستفاده است
    return { success: true, message: "سیستم تایید ایمیل فعلاً غیرفعال است." };
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      let data: UserProfile;
      if (userDoc.exists()) {
        data = userDoc.data() as UserProfile;
      } else {
        data = createDefaultProfile(user, user.displayName || "");
        await setDoc(userDocRef, data);
      }

      if (user.email === 'm.fatahi2010@gmail.com' && !data.isAdmin) {
        data.isAdmin = true;
        await updateDoc(userDocRef, { isAdmin: true });
      }

      return { success: true, user: data };
    } catch (error: any) {
      return { success: false, message: "خطا در اتصال به حساب گوگل." };
    }
  },

  register: async (data: any) => {
    try {
      const { email, password, fullName, phoneNumber } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // ارسال ایمیل تایید غیرفعال شد
      
      const newUser = createDefaultProfile(firebaseUser, fullName, phoneNumber);
      await setDoc(doc(db, "users", firebaseUser.uid), newUser);

      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, message: "خطا در ثبت‌نام: " + error.message };
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
            const data = userDoc.data() as UserProfile;
            if (user.email === 'm.fatahi2010@gmail.com' && !data.isAdmin) {
               await updateDoc(userDocRef, { isAdmin: true });
               data.isAdmin = true;
            }
            resolve(data);
          } else {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  },

  seedAdmin: async () => {
    const user = auth.currentUser;
    if (!user || user.email !== 'm.fatahi2010@gmail.com') return;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { isAdmin: true });
    notifyUpdate();
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
