
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
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

// لطفاً ایمیل دقیق خود را که با آن وارد می‌شوید اینجا جایگزین کنید تا سیستم شما را به عنوان مدیر بشناسد
const ADMIN_EMAIL = 'YOUR_ACTUAL_EMAIL@GMAIL.COM'.toLowerCase();

const notifyUpdate = () => {
  window.dispatchEvent(new Event('user-data-updated'));
};

const createDefaultProfile = (user: any, fullName: string, phoneNumber?: string): UserProfile => {
  const userEmail = (user.email || "").toLowerCase();
  const isOwner = userEmail === ADMIN_EMAIL;
  
  return {
    username: user.email ? user.email.split('@')[0] : user.uid.slice(0, 8),
    fullName: fullName || user.displayName || "کاربر نوش",
    passwordCode: "PROTECTED",
    email: userEmail,
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
  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const userEmail = (firebaseUser.email || "").toLowerCase();

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      let userData: UserProfile;

      if (!userDoc.exists()) {
        userData = createDefaultProfile(firebaseUser, "");
        await setDoc(userDocRef, userData);
      } else {
        userData = userDoc.data() as UserProfile;
        // بازنشانی خودکار دسترسی ادمین اگر ایمیل مطابقت داشت
        if (userEmail === ADMIN_EMAIL && (!userData.isAdmin || !userData.isApproved)) {
          await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
          userData.isAdmin = true;
          userData.isApproved = true;
        }
      }
      return { success: true, user: userData };
    } catch (error: any) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است." };
    }
  },

  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = (user.email || "").toLowerCase();
      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      let data: UserProfile;
      if (userDoc.exists()) {
        data = userDoc.data() as UserProfile;
        if (userEmail === ADMIN_EMAIL && (!data.isAdmin || !data.isApproved)) {
          await updateDoc(userDocRef, { isAdmin: true, isApproved: true });
          data.isAdmin = true;
          data.isApproved = true;
        }
      } else {
        data = createDefaultProfile(user, user.displayName || "");
        await setDoc(userDocRef, data);
      }
      return { success: true, user: data };
    } catch (error: any) {
      return { success: false, message: "خطا در ورود با گوگل." };
    }
  },

  register: async (data: any): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const { email, password, fullName, phoneNumber } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = createDefaultProfile(userCredential.user, fullName, phoneNumber);
      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
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
          const userEmail = (user.email || "").toLowerCase();
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            if (userEmail === ADMIN_EMAIL && (!data.isAdmin || !data.isApproved)) {
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
    if (user && (user.email || "").toLowerCase() === ADMIN_EMAIL) {
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
    const userEmail = (user.email || "").toLowerCase();
    return !!(userEmail === ADMIN_EMAIL || user.isAdmin || user.subscriptionExpiry > Date.now());
  }
};
