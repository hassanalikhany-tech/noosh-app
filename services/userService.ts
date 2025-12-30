
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
    isApproved: isOwner 
  };
};

export const UserService = {
  // Update login to check for email verification and include needsVerification in return object
  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string; needsVerification?: boolean }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Check if email is verified (skip for admin)
      if (!firebaseUser.emailVerified && firebaseUser.email !== ADMIN_EMAIL) {
        return { success: false, message: "ایمیل شما هنوز تایید نشده است. لطفاً صندوق ورودی خود را چک کنید.", needsVerification: true };
      }

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      let userData: UserProfile;
      if (!userDoc.exists()) {
        userData = createDefaultProfile(firebaseUser, "");
        await setDoc(userDocRef, userData);
      } else {
        userData = userDoc.data() as UserProfile;
      }
      return { success: true, user: userData };
    } catch (error: any) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است.", needsVerification: false };
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
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
      return { success: true, user: data };
    } catch (error: any) {
      if (error.code === 'auth/unauthorized-domain') {
        return { 
          success: false, 
          message: "خطای امنیتی: این دامنه در لیست سفید فایربیس نیست. لطفاً آدرس سایت خود را در کنسول فایربیس (بخش Authentication -> Settings -> Authorized Domains) اضافه کنید." 
        };
      }
      return { success: false, message: "خطا در ورود با گوگل. لطفاً دوباره تلاش کنید." };
    }
  },

  // Update register to send initial verification email
  register: async (data: any): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const { email, password, fullName, phoneNumber } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email on registration
      await sendEmailVerification(userCredential.user);
      const newUser = createDefaultProfile(userCredential.user, fullName, phoneNumber);
      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, message: "خطا در ثبت‌نام: " + error.message };
    }
  },

  // Added missing resendVerificationEmail method
  resendVerificationEmail: async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user);
        return { success: true, message: "لینک تایید جدید به ایمیل شما ارسال شد." };
      }
      return { success: false, message: "کاربر یافت نشد." };
    } catch (error: any) {
      return { success: false, message: "خطا در ارسال ایمیل: " + error.message };
    }
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          resolve(userDoc.exists() ? (userDoc.data() as UserProfile) : null);
        } else {
          resolve(null);
        }
      });
    });
  },

  seedAdmin: async () => {
    const user = auth.currentUser;
    if (user && user.email === ADMIN_EMAIL) {
      await updateDoc(doc(db, "users", user.uid), { isAdmin: true, isApproved: true });
    }
  },

  updateProfile: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", user.uid), updates);
    const updated = await getDoc(doc(db, "users", user.uid));
    notifyUpdate();
    return updated.data() as UserProfile;
  },

  updatePreferences: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    return UserService.updateProfile(username, updates);
  },

  toggleUserApproval: async (uid: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "users", uid), { isApproved: !currentStatus });
    notifyUpdate();
  },

  updateShoppingList: async (username: string, items: ShoppingItem[]): Promise<UserProfile> => {
    return UserService.updateProfile(username, { customShoppingList: items });
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
