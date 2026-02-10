
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
  query,
  where,
  limit,
  arrayUnion,
  deleteDoc
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, ShoppingItem, PaymentRecord, AppConfig } from "../types";
import { RecipeService } from "./recipeService";

const ADMIN_EMAIL = 'YOUR_ACTUAL_EMAIL@GMAIL.COM'.toLowerCase();

const notifyUpdate = () => {
  window.dispatchEvent(new CustomEvent('user-data-updated'));
};

const generateUniqueReferralCode = async (): Promise<string> => {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnopqrstuvwxyz';
  const digits = '23456789';
  const symbols = '!@#$%^&*';
  const all = upper + lower + digits + symbols;
  
  let isUnique = false;
  let finalCode = '';

  while (!isUnique) {
    let code = '';
    for(let i=0; i<2; i++) {
      code += upper.charAt(Math.floor(Math.random() * upper.length));
      code += lower.charAt(Math.floor(Math.random() * lower.length));
      code += digits.charAt(Math.floor(Math.random() * digits.length));
      code += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    finalCode = code.split('').sort(() => 0.5 - Math.random()).join('');
    const q = query(collection(db, "users"), where("referralCode", "==", finalCode), limit(1));
    const snapshot = await getDocs(q);
    if (snapshot.empty) isUnique = true;
  }
  return finalCode;
};

export const UserService = {
  getAppConfig: async (): Promise<AppConfig> => {
    try {
      const docRef = doc(db, "settings", "app_config");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data() as AppConfig;
      }
      return { subscriptionFee: 1500000, commissionRate: 20 };
    } catch {
      return { subscriptionFee: 1500000, commissionRate: 20 };
    }
  },

  updateAppConfig: async (config: AppConfig) => {
    const docRef = doc(db, "settings", "app_config");
    await setDoc(docRef, config);
  },

  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      await RecipeService.clearAllCache();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        const uniqueCode = await generateUniqueReferralCode();
        const userData: UserProfile = {
          uid: firebaseUser.uid,
          username: firebaseUser.email?.split('@')[0] || firebaseUser.uid.slice(0, 8),
          fullName: "کاربر جدید",
          passwordCode: "PROTECTED",
          email: firebaseUser.email || "",
          subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
          blacklistedDishIds: [],
          favoriteDishIds: [],
          dislikedIngredients: [],
          excludedCategories: [],
          preferredNatures: ['hot', 'cold', 'balanced'],
          history: [],
          familySize: 4,
          isAdmin: (firebaseUser.email || "").toLowerCase() === ADMIN_EMAIL,
          isApproved: (firebaseUser.email || "").toLowerCase() === ADMIN_EMAIL,
          referralCode: uniqueCode,
          referralBalance: 0,
          referralTotalEarned: 0,
          referralCount: 0,
          paymentHistory: []
        };
        await setDoc(userDocRef, userData);
        return { success: true, user: userData };
      }

      let userData = userDoc.data() as UserProfile;
      userData.uid = firebaseUser.uid;
      return { success: true, user: userData };
    } catch (error: any) {
      return { success: false, message: "خطا در ورود." };
    }
  },

  register: async (data: any): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const { email, password, fullName, phoneNumber, referralCode } = data;
      let referredByUid = "";
      if (referralCode && referralCode.trim() !== "") {
        const q = query(collection(db, "users"), where("referralCode", "==", referralCode.trim()), limit(1));
        const snap = await getDocs(q);
        if (!snap.empty) referredByUid = snap.docs[0].id;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uniqueCode = await generateUniqueReferralCode();
      const newUser: UserProfile = {
        uid: userCredential.user.uid,
        username: email.split('@')[0],
        fullName: fullName || "کاربر نوش",
        passwordCode: "PROTECTED",
        email: email.toLowerCase(),
        phoneNumber: phoneNumber || "",
        subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
        blacklistedDishIds: [],
        favoriteDishIds: [],
        dislikedIngredients: [],
        excludedCategories: [],
        preferredNatures: ['hot', 'cold', 'balanced'],
        history: [],
        familySize: 4,
        isAdmin: email.toLowerCase() === ADMIN_EMAIL,
        isApproved: email.toLowerCase() === ADMIN_EMAIL,
        referralCode: uniqueCode,
        referredBy: referredByUid,
        referralBalance: 0,
        referralTotalEarned: 0,
        referralCount: 0,
        paymentHistory: []
      };
      await setDoc(doc(db, "users", newUser.uid), newUser);
      return { success: true, user: newUser };
    } catch (error: any) {
      return { success: false, message: "خطا در ثبت‌نام." };
    }
  },

  sendResetPassword: async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch { return { success: false, message: "خطا در ارسال ایمیل." }; }
  },

  toggleUserApproval: async (uid: string, currentStatus: boolean) => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) return;
    const userData = userDoc.data() as UserProfile;
    const newStatus = !currentStatus;
    
    await updateDoc(userRef, { isApproved: newStatus });

    if (newStatus && userData.referredBy) {
      const config = await UserService.getAppConfig();
      const referrerRef = doc(db, "users", userData.referredBy);
      const referrerDoc = await getDoc(referrerRef);
      if (referrerDoc.exists()) {
        const rData = referrerDoc.data();
        const commission = config.subscriptionFee * (config.commissionRate / 100);
        await updateDoc(referrerRef, {
          referralCount: (rData.referralCount || 0) + 1,
          referralBalance: (rData.referralBalance || 0) + commission,
          referralTotalEarned: (rData.referralTotalEarned || 0) + commission
        });
      }
    }
    notifyUpdate();
  },

  settleVisitorBalance: async (uid: string, amount: number) => {
    const visitorRef = doc(db, "users", uid);
    const newRecord: PaymentRecord = {
      date: Date.now(),
      amount: amount,
      referenceId: `PAY-${Date.now().toString().slice(-6)}`
    };
    await updateDoc(visitorRef, {
      referralBalance: 0,
      paymentHistory: arrayUnion(newRecord)
    });
    notifyUpdate();
  },

  updateProfile: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", user.uid), updates);
    const updated = await getDoc(doc(db, "users", user.uid));
    notifyUpdate();
    return updated.data() as UserProfile;
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const data = userDoc.data() as UserProfile;
              data.uid = user.uid;
              resolve(data);
            } else resolve(null);
          } catch { resolve(null); }
        } else resolve(null);
      });
    });
  },

  logout: async () => {
    await signOut(auth);
  },

  isSubscriptionValid: (user: UserProfile): boolean => {
    return !!(user.isAdmin || user.subscriptionExpiry > Date.now());
  },

  loginWithBiometric: async (): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    return { success: false };
  },

  loginWithGoogle: async (): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider); 
      return UserService.login(result.user.email || "", "GOOGLE_AUTH");
    } catch { return { success: false, message: "خطا در گوگل" }; }
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

  extendSubscription: async (uid: string, days: number): Promise<UserProfile> => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data() as UserProfile;
    const newExpiry = Math.max(userData.subscriptionExpiry || Date.now(), Date.now()) + (days * 24 * 60 * 60 * 1000);
    await updateDoc(userDocRef, { subscriptionExpiry: newExpiry });
    notifyUpdate();
    return { ...userData, subscriptionExpiry: newExpiry };
  },

  toggleVisitorStatus: async (uid: string, currentStatus: boolean): Promise<void> => {
    await updateDoc(doc(db, "users", uid), { isVisitor: !currentStatus });
    notifyUpdate();
  },

  getAllUsers: async (): Promise<{ success: boolean; data: any[]; error?: string }> => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      // فیلتر کردن کاربران برای اطمینان از نمایش ندادن رکوردهای خراب
      const users = querySnapshot.docs.map(d => ({ ...d.data(), uid: d.id }));
      return { success: true, data: users };
    } catch (e: any) { return { success: false, data: [], error: e.message }; }
  },

  resetUserDevices: async (uid: string): Promise<void> => {
    await updateDoc(doc(db, "users", uid), { registeredDevices: [] });
    notifyUpdate();
  },

  deleteUser: async (uid: string): Promise<void> => {
    // حذف قطعی از دیتابیس (Hard Delete) برای رفع مشکل عدم حذف در پنل مدیریت
    await deleteDoc(doc(db, "users", uid));
    notifyUpdate();
  }
};
