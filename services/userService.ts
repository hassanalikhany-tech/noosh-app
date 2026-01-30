
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  arrayUnion
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, ShoppingItem } from "../types";
import { RecipeService } from "./recipeService";

const ADMIN_EMAIL = 'YOUR_ACTUAL_EMAIL@GMAIL.COM'.toLowerCase();

const notifyUpdate = () => {
  window.dispatchEvent(new CustomEvent('user-data-updated'));
};

const getDeviceFingerprint = () => {
  let deviceId = localStorage.getItem('noosh_device_fingerprint');
  if (!deviceId) {
    deviceId = 'dev-' + crypto.randomUUID();
    localStorage.setItem('noosh_device_fingerprint', deviceId);
  }
  return deviceId;
};

const createDefaultProfile = (user: any, fullName: string, phoneNumber?: string): UserProfile => {
  const userEmail = (user.email || "").toLowerCase();
  const isOwner = userEmail === ADMIN_EMAIL;
  const deviceId = getDeviceFingerprint();
  
  return {
    uid: user.uid,
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
    isApproved: isOwner,
    isDeleted: false,
    registeredDevices: [deviceId],
    isBiometricEnabled: false
  };
};

export const UserService = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string; code?: string }> => {
    try {
      await RecipeService.clearAllCache();
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const deviceId = getDeviceFingerprint();

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const userData = createDefaultProfile(firebaseUser, "");
        await setDoc(userDocRef, userData);
        return { success: true, user: userData };
      }

      let userData = userDoc.data() as UserProfile;
      userData.uid = firebaseUser.uid;

      if (userData.isDeleted) {
        await signOut(auth);
        return { success: false, message: "این حساب کاربری غیرفعال یا حذف شده است." };
      }

      const userEmail = (firebaseUser.email || "").toLowerCase();
      const isOwner = userEmail === ADMIN_EMAIL || userData.isAdmin;

      if (!isOwner) {
        const registeredDevices = userData.registeredDevices || [];
        const isDeviceKnown = registeredDevices.includes(deviceId);
        
        if (!isDeviceKnown) {
          if (registeredDevices.length >= 2) {
            await signOut(auth);
            return { 
              success: false, 
              message: "تعداد دستگاه‌های مجاز این اکانت (۲ دستگاه) تکمیل شده است.",
              code: 'auth/device-limit-reached' 
            };
          } else {
            await updateDoc(userDocRef, { 
              registeredDevices: arrayUnion(deviceId) 
            });
            userData.registeredDevices = [...registeredDevices, deviceId];
          }
        }
      }

      const newSessionId = crypto.randomUUID();
      localStorage.setItem('noosh_active_session', newSessionId);
      
      if (!isOwner) {
        await updateDoc(userDocRef, { currentSessionId: newSessionId });
      } else {
        await updateDoc(userDocRef, { currentSessionId: 'ADMIN_SESSION' });
        localStorage.setItem('noosh_active_session', 'ADMIN_SESSION');
      }
      
      return { success: true, user: { ...userData, currentSessionId: localStorage.getItem('noosh_active_session') || '' } };
      
    } catch (error: any) {
      let msg = "ایمیل یا رمز عبور اشتباه است.";
      if (error.code === 'auth/user-not-found') msg = "کاربری با این ایمیل یافت نشد.";
      return { success: false, message: msg, code: error.code };
    }
  },

  loginWithBiometric: async (): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      if (!window.PublicKeyCredential) return { success: false, message: "مرورگر شما پشتیبانی نمی‌کند." };
      
      const savedEmail = localStorage.getItem('noosh_saved_email');
      const savedPassword = localStorage.getItem('noosh_saved_password');
      
      if (!savedEmail || !savedPassword) return { success: false, message: "اعتبارنامه یافت نشد." };

      // ایجاد چالش برای باز کردن پنجره تشخیص چهره سیستم‌عامل
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: challenge,
          userVerification: "required",
          timeout: 60000
        }
      });

      if (credential) {
        // اگر تایید شد، با استفاده از اطلاعات ذخیره شده ورود واقعی انجام شود
        return UserService.login(savedEmail, savedPassword);
      }
      return { success: false, message: "لغو شد." };
    } catch (e) {
      console.error("Biometric Scan Error:", e);
      return { success: false, message: "خطا در سنسور بیومتریک" };
    }
  },

  enableBiometric: async (uid: string, enabled: boolean): Promise<boolean> => {
    try {
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, { isBiometricEnabled: enabled });
      if (enabled) {
        localStorage.setItem('noosh_biometric_active', 'true');
        localStorage.removeItem('noosh_biometric_declined');
      } else {
        localStorage.removeItem('noosh_biometric_active');
      }
      notifyUpdate();
      return true;
    } catch (e) {
      console.error("Enable Biometric DB Error:", e);
      return false;
    }
  },

  resetUserDevices: async (uid: string): Promise<void> => {
    try {
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, { registeredDevices: [] });
      notifyUpdate();
    } catch (error: any) {
      throw error;
    }
  },

  sendResetPassword: async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: "لینک بازنشانی رمز عبور به ایمیل شما ارسال شد." };
    } catch {
      return { success: false, message: "خطا در ارسال ایمیل بازیابی." };
    }
  },

  loginWithGoogle: async (): Promise<{ success: boolean; user?: UserProfile; message?: string; code?: string }> => {
    try {
      await RecipeService.clearAllCache();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); 
      const user = result.user;
      const deviceId = getDeviceFingerprint();

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const data = createDefaultProfile(user, user.displayName || "");
        await setDoc(userDocRef, data);
        return { success: true, user: data };
      }

      let data = userDoc.data() as UserProfile;
      data.uid = user.uid;

      if (data.isDeleted) {
        await signOut(auth);
        return { success: false, message: "حساب حذف شده است." };
      }

      const newSessionId = data.isAdmin ? 'ADMIN_SESSION' : crypto.randomUUID();
      localStorage.setItem('noosh_active_session', newSessionId);
      await updateDoc(userDocRef, { currentSessionId: newSessionId });
      
      return { success: true, user: { ...data, currentSessionId: newSessionId } };
    } catch (error: any) {
      return { success: false, message: "خطا در ورود با گوگل", code: error.code };
    }
  },

  validateSession: async (): Promise<boolean> => {
    const user = auth.currentUser;
    if (!user) return true;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().isAdmin) return true;
    const localSession = localStorage.getItem('noosh_active_session');
    if (!localSession) return true;
    try {
      if (userDoc.exists()) {
        return localSession === userDoc.data().currentSessionId;
      }
      return true;
    } catch { return true; }
  },

  register: async (data: any): Promise<{ success: boolean; user?: UserProfile; message?: string; code?: string }> => {
    try {
      await RecipeService.clearAllCache();
      const { email, password, fullName, phoneNumber } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = createDefaultProfile(userCredential.user, fullName, phoneNumber);
      
      const newSessionId = newUser.isAdmin ? 'ADMIN_SESSION' : crypto.randomUUID();
      localStorage.setItem('noosh_active_session', newSessionId);
      newUser.currentSessionId = newSessionId;
      
      await setDoc(doc(db, "users", userCredential.user.uid), newUser);
      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, message: "خطا در ثبت‌نام.", code: error.code };
    }
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const data = userDoc.data() as UserProfile;
              data.uid = user.uid;
              if (data.isDeleted) resolve(null);
              else resolve(data);
            } else { resolve(null); }
          } catch { resolve(null); }
        } else { resolve(null); }
      });
    });
  },

  updateProfile: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", user.uid), updates);
    const updated = await getDoc(doc(db, "users", user.uid));
    notifyUpdate();
    return updated.data() as UserProfile;
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
    const isAdding = !user.favoriteDishIds?.includes(dishId);
    let favorites = [...(user.favoriteDishIds || [])];
    let blacklist = [...(user.blacklistedDishIds || [])];
    if (isAdding) { favorites.push(dishId); blacklist = blacklist.filter(id => id !== dishId); }
    else { favorites = favorites.filter(id => id !== dishId); }
    return UserService.updateProfile(username, { favoriteDishIds: favorites, blacklistedDishIds: blacklist });
  },

  toggleBlacklist: async (username: string, dishId: string): Promise<UserProfile> => {
    const user = await UserService.getCurrentUser();
    if (!user) throw new Error("User not found");
    const isAdding = !user.blacklistedDishIds?.includes(dishId);
    let blacklist = [...(user.blacklistedDishIds || [])];
    let favorites = [...(user.favoriteDishIds || [])];
    if (isAdding) { blacklist.push(dishId); favorites = favorites.filter(id => id !== dishId); }
    else { blacklist = blacklist.filter(id => id !== dishId); }
    return UserService.updateProfile(username, { blacklistedDishIds: blacklist, favoriteDishIds: favorites });
  },

  extendSubscription: async (uid: string, days: number): Promise<UserProfile> => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) throw new Error("کاربر یافت نشد");
    const userData = userDoc.data() as UserProfile;
    const now = Date.now();
    const currentExpiry = userData.subscriptionExpiry || now;
    const baseTime = currentExpiry > now ? currentExpiry : now;
    const extensionMs = 31 * 24 * 60 * 60 * 1000;
    const newExpiry = baseTime + extensionMs;
    await updateDoc(userDocRef, { subscriptionExpiry: newExpiry });
    notifyUpdate();
    return { ...userData, subscriptionExpiry: newExpiry };
  },

  getAllUsers: async (): Promise<{ success: boolean; data: any[]; error?: string }> => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const allUsers = querySnapshot.docs.map(d => ({ ...d.data(), uid: d.id })) as any[];
      return { success: true, data: allUsers.filter(u => !u.isDeleted) };
    } catch (e: any) { return { success: false, data: [], error: e.code }; }
  },

  deleteUser: async (uid: string): Promise<void> => {
    await updateDoc(doc(db, "users", uid), { 
      isDeleted: true,
      registeredDevices: [] 
    });
    notifyUpdate();
  },

  logout: async () => {
    localStorage.removeItem('noosh_active_session');
    await RecipeService.clearAllCache();
    await signOut(auth);
  },

  isSubscriptionValid: (user: UserProfile): boolean => {
    const userEmail = (user.email || "").toLowerCase();
    return !!(userEmail === ADMIN_EMAIL || user.isAdmin || user.subscriptionExpiry > Date.now());
  }
};
