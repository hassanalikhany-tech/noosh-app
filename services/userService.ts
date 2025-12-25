
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateDoc as firestoreUpdateDoc,
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

const ADMIN_EMAIL = 'm.fatahi2010@gmail.com';

const notifyUpdate = () => {
  window.dispatchEvent(new Event('user-data-updated'));
};

const createDefaultProfile = (user: any, fullName: string, phoneNumber?: string): UserProfile => {
  const isOwner = user.email === ADMIN_EMAIL;
  return {
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
    isAdmin: isOwner,
    isApproved: isOwner // شما به صورت خودکار تایید شده هستید
  };
};

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
        // بروزرسانی وضعیت ادمین در صورتی که ایمیل مدیر باشد
        if (firebaseUser.email === ADMIN_EMAIL && (!userData.isAdmin || !userData.isApproved)) {
          userData.isAdmin = true;
          userData.isApproved = true;
          await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
        }
      }

      return { success: true, user: userData, needsVerification: false };

    } catch (error: any) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است.", needsVerification: false };
    }
  },

  resendVerificationEmail: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        return { success: true, message: "لینک تایید مجدداً به ایمیل شما ارسال شد." };
      }
      return { success: false, message: "کاربر یافت نشد." };
    } catch (error: any) {
      return { success: false, message: "خطا در ارسال ایمیل تایید: " + error.message };
    }
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
        if (user.email === ADMIN_EMAIL && (!data.isAdmin || !data.isApproved)) {
          data.isAdmin = true;
          data.isApproved = true;
          await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
        }
      } else {
        data = createDefaultProfile(user, user.displayName || "");
        await setDoc(userDocRef, data);
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
            if (user.email === ADMIN_EMAIL && (!data.isAdmin || !data.isApproved)) {
               await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
               data.isAdmin = true;
               data.isApproved = true;
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
    if (!user || user.email !== ADMIN_EMAIL) return;
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
    notifyUpdate();
  },

  toggleUserApproval: async (uid: string, currentStatus: boolean) => {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, { isApproved: !currentStatus });
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

  getAllUsers: async (): Promise<any[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(d => ({ ...d.data(), uid: d.id }));
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
