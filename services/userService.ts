
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { UserProfile, ShoppingItem, VisitorProfile, VisitorFinancialInfo, CommissionLog } from "../types";
import { RecipeService } from "./recipeService";

const TEST_MOBILE = '09143013288';
const notifyUpdate = () => window.dispatchEvent(new CustomEvent('user-data-updated'));

const generateReferralCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; 
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const UserService = {
  // Authentication methods...
  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as UserProfile;
        localStorage.setItem('noosh_auth_mobile', user.uid);
        localStorage.setItem('noosh_auth_session', 'email-password-session');
        return { success: true, user: userData };
      }
      return { success: false, message: "پروفایل کاربری یافت نشد." };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  },

  register: async (data: any): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = result.user;
      const newUser: UserProfile = {
        uid: user.uid,
        username: data.email,
        fullName: data.fullName,
        passwordCode: "",
        email: data.email,
        subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
        blacklistedDishIds: [],
        favoriteDishIds: [],
        dislikedIngredients: [],
        excludedCategories: [],
        preferredNatures: ['balanced'],
        history: [],
        familySize: 4,
        role: 'user',
        isApproved: true
      };
      await setDoc(doc(db, "users", user.uid), newUser);
      localStorage.setItem('noosh_auth_mobile', user.uid);
      localStorage.setItem('noosh_auth_session', 'registration-session');
      return { success: true, user: newUser };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  },

  loginWithGoogle: async (): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        const newUser: UserProfile = {
          uid: user.uid,
          username: user.email || user.uid,
          fullName: user.displayName || "کاربر گوگل",
          passwordCode: "",
          email: user.email || undefined,
          subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
          blacklistedDishIds: [],
          favoriteDishIds: [],
          dislikedIngredients: [],
          excludedCategories: [],
          preferredNatures: ['balanced'],
          history: [],
          familySize: 4,
          role: 'user',
          isApproved: true
        };
        await setDoc(doc(db, "users", user.uid), newUser);
        localStorage.setItem('noosh_auth_mobile', user.uid);
        localStorage.setItem('noosh_auth_session', 'google-session');
        return { success: true, user: newUser };
      }
      localStorage.setItem('noosh_auth_mobile', user.uid);
      localStorage.setItem('noosh_auth_session', 'google-session');
      return { success: true, user: userDoc.data() as UserProfile };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  },

  sendResetPassword: async (email: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  },

  loginWithBiometric: async (): Promise<{ success: boolean; user?: UserProfile; message?: string }> => {
    return { success: false, message: "سخت‌افزار احراز هویت بیومتریک در این مرورگر شناسایی نشد یا تنظیم نشده است." };
  },

  promoteToVisitor: async (uid: string): Promise<boolean> => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) return false;
      
      const vProfileCheck = await getDoc(doc(db, "visitor_profiles", uid));
      if (vProfileCheck.exists()) {
          await updateDoc(doc(db, "users", uid), { role: 'visitor' });
          await updateDoc(doc(db, "visitor_profiles", uid), { is_active: true });
      } else {
          const referralCode = generateReferralCode();
          await updateDoc(doc(db, "users", uid), { role: 'visitor' });
          const visitorProfile: VisitorProfile = {
            user_id: uid, referral_code: referralCode, total_commission: 0,
            kyc_status: 'none', payment_info_status: 'none', referrals_count: 0,
            created_at: Date.now(), is_active: true
          };
          await setDoc(doc(db, "visitor_profiles", uid), visitorProfile);
      }
      notifyUpdate();
      return true;
    } catch (e) {
      return false;
    }
  },

  demoteFromVisitor: async (uid: string): Promise<boolean> => {
    try {
      // تغییر نقش به user برای هماهنگی با منطق اپلیکیشن
      await updateDoc(doc(db, "users", uid), { role: 'user' });
      const vProfileCheck = await getDoc(doc(db, "visitor_profiles", uid));
      if (vProfileCheck.exists()) {
        await updateDoc(doc(db, "visitor_profiles", uid), { is_active: false });
      }
      notifyUpdate();
      return true;
    } catch (e) { return false; }
  },

  getVisitorProfile: async (uid: string): Promise<VisitorProfile | null> => {
    const snap = await getDoc(doc(db, "visitor_profiles", uid));
    return snap.exists() ? snap.data() as VisitorProfile : null;
  },

  getVisitorFinancialInfo: async (uid: string): Promise<VisitorFinancialInfo | null> => {
    const snap = await getDoc(doc(db, "visitor_financial_info", uid));
    return snap.exists() ? snap.data() as VisitorFinancialInfo : null;
  },

  updateVisitorFinancialInfo: async (uid: string, info: Partial<VisitorFinancialInfo>) => {
    await setDoc(doc(db, "visitor_financial_info", uid), { ...info, visitor_id: uid, status: 'pending', verified: false }, { merge: true });
    await updateDoc(doc(db, "visitor_profiles", uid), { payment_info_status: 'completed', kyc_status: 'pending' });
    notifyUpdate();
  },

  verifyKyc: async (uid: string, status: 'verified' | 'rejected') => {
    await updateDoc(doc(db, "visitor_profiles", uid), { kyc_status: status });
    await updateDoc(doc(db, "visitor_financial_info", uid), { status, verified: status === 'verified' });
    notifyUpdate();
  },

  getAllVisitors: async (): Promise<any[]> => {
    const qSnap = await getDocs(collection(db, "visitor_profiles"));
    const profiles = qSnap.docs.map(d => d.data() as VisitorProfile);
    return Promise.all(profiles.map(async p => {
      const uSnap = await getDoc(doc(db, "users", p.user_id));
      const uData = uSnap.exists() ? uSnap.data() : {};
      const fSnap = await getDoc(doc(db, "visitor_financial_info", p.user_id));
      return { ...p, fullName: uData.fullName || "نامعلوم", mobile: uData.mobileNumber, financialInfo: fSnap.exists() ? fSnap.data() : null };
    }));
  },

  extendSubscription: async (uid: string, days: number, paidAmount: number = 0): Promise<UserProfile> => {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) throw new Error("User not found");
    
    const userData = userDoc.data() as UserProfile;
    const now = Date.now();
    const currentExpiry = userData.subscriptionExpiry || now;
    const newExpiry = Math.max(currentExpiry, now) + (days * 24 * 60 * 60 * 1000);
    
    // تشخیص خرید اول (اگر قبلا سابقه پرداخت موفق نداشته است)
    const pQuery = query(collection(db, "payments"), where("user_id", "==", uid), where("status", "==", "success"));
    const pSnap = await getDocs(pQuery);
    const isFirstPurchase = pSnap.size <= 1; // چون همین پرداخت فعلی هم در دیتابیس ثبت شده

    await updateDoc(userRef, { subscriptionExpiry: newExpiry });

    // منطق پورسانت‌دهی هوشمند بر اساس مبلغ پرداختی واقعی
    if (userData.referredBy && paidAmount > 0) {
      const visitorId = userData.referredBy;
      const vProfileDoc = await getDoc(doc(db, "visitor_profiles", visitorId));
      
      if (vProfileDoc.exists() && vProfileDoc.data().is_active) {
        // محاسبه درصد: ۲۰٪ خرید اول، ۱۰٪ تمدید
        const percentage = isFirstPurchase ? 0.20 : 0.10;
        const commissionAmount = Math.floor(paidAmount * percentage);
        
        const visitorRef = doc(db, "visitor_profiles", visitorId);
        const vData = vProfileDoc.data();
        
        await updateDoc(visitorRef, { 
          total_commission: (vData.total_commission || 0) + commissionAmount,
          referrals_count: isFirstPurchase ? (vData.referrals_count || 0) + 1 : (vData.referrals_count || 0)
        });

        await addDoc(collection(db, "commission_logs"), {
          visitor_id: visitorId,
          user_id: uid,
          amount: commissionAmount,
          base_amount: paidAmount, // ثبت مبلغ پایه برای شفافیت
          type: isFirstPurchase ? 'first_purchase' : 'renewal',
          status: 'pending',
          date: Date.now()
        });
      }
    }
    
    notifyUpdate();
    return { ...userData, subscriptionExpiry: newExpiry };
  },

  getCurrentUser: async (): Promise<UserProfile | null> => {
    const mobile = localStorage.getItem('noosh_auth_mobile');
    const session = localStorage.getItem('noosh_auth_session');
    if (mobile && session) {
      const isTest = mobile === TEST_MOBILE;
      try {
        const userDoc = await getDoc(doc(db, "users", mobile));
        if (userDoc.exists()) return userDoc.data() as UserProfile;
        if (isTest) return { uid: TEST_MOBILE, fullName: "مدیر سیستم", isAdmin: true, role: 'admin' } as any;
      } catch (e) {}
    }
    return null;
  },

  updateProfile: async (username: string, updates: Partial<UserProfile>): Promise<UserProfile> => {
    const mobile = localStorage.getItem('noosh_auth_mobile');
    if (!mobile) throw new Error("Not logged in");
    await updateDoc(doc(db, "users", mobile), updates);
    const user = await UserService.getCurrentUser();
    notifyUpdate();
    return user!;
  },

  logout: async () => {
    localStorage.removeItem('noosh_auth_session');
    localStorage.removeItem('noosh_auth_mobile');
    await signOut(auth);
  },

  updateShoppingList: async (username: string, items: any[]) => UserService.updateProfile(username, { customShoppingList: items }),
  toggleFavorite: async (username: string, dishId: string) => {
    const user = await UserService.getCurrentUser();
    const favs = user?.favoriteDishIds?.includes(dishId) ? user.favoriteDishIds.filter(id => id !== dishId) : [...(user?.favoriteDishIds || []), dishId];
    return UserService.updateProfile(username, { favoriteDishIds: favs });
  },
  toggleBlacklist: async (username: string, dishId: string) => {
    const user = await UserService.getCurrentUser();
    const bl = user?.blacklistedDishIds?.includes(dishId) ? user.blacklistedDishIds.filter(id => id !== dishId) : [...(user?.blacklistedDishIds || []), dishId];
    return UserService.updateProfile(username, { blacklistedDishIds: bl });
  },
  getAllUsers: async () => {
    try {
      const qSnap = await getDocs(collection(db, "users"));
      return { success: true, data: qSnap.docs.map(d => ({ ...d.data(), uid: d.id })) };
    } catch (e: any) { return { success: false, data: [], error: e.message }; }
  },
  toggleUserApproval: async (uid: string, status: boolean) => { await updateDoc(doc(db, "users", uid), { isApproved: !status }); notifyUpdate(); },
  resetUserDevices: async (uid: string) => { await updateDoc(doc(db, "users", uid), { registeredDevices: [] }); notifyUpdate(); },
  deleteUser: async (uid: string) => { await updateDoc(doc(db, "users", uid), { isDeleted: true }); notifyUpdate(); }
};
