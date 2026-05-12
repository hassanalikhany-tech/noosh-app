
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "./firebase";
import { AuthUser } from "../types";
import { DB } from "../utils/db";

const TEST_MOBILE = '09143013288';
const TEST_OTP = '11111';

const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const normalizeMobile = (mobile: string) => {
  let clean = mobile.trim().replace(/\s/g, '');
  if (clean.startsWith('+98')) clean = '0' + clean.slice(3);
  if (clean.length === 10 && clean.startsWith('9')) clean = '0' + clean;
  return clean;
};

export const AuthService = {
  checkUserExists: async (mobile: string): Promise<{ exists: boolean; firstName?: string; lastName?: string }> => {
    const cleanMobile = normalizeMobile(mobile);
    if (cleanMobile === TEST_MOBILE) return { exists: true, firstName: "مدیر", lastName: "سیستم" };
    
    try {
      const userRef = doc(db, "users", cleanMobile);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        return { exists: true, firstName: data.firstName, lastName: data.lastName };
      }
    } catch (e) {
      console.warn("Database check failed.");
    }
    return { exists: false };
  },

  sendOtp: async (mobile: string): Promise<{ success: boolean; message: string }> => {
    const cleanMobile = normalizeMobile(mobile);
    const isTest = cleanMobile === TEST_MOBILE;
    try {
      let otp = Math.floor(10000 + Math.random() * 90000).toString();
      if (isTest) otp = TEST_OTP;
      sessionStorage.setItem(`otp_${cleanMobile}`, otp);
      return { success: true, message: isTest ? "کد تایید تست فعال شد (۱۱۱۱۱)" : "کد تایید صادر شد." };
    } catch (e) {
      return { success: false, message: "خطا در ارتباط با سرور." };
    }
  },

  verifyOtp: async (mobile: string, code: string, registerData?: { firstName: string; lastName: string, referralCode?: string }): Promise<{ success: boolean; user?: AuthUser; message?: string; needsRegistration?: boolean }> => {
    const cleanMobile = normalizeMobile(mobile);
    const savedCode = sessionStorage.getItem(`otp_${cleanMobile}`);
    const isTest = cleanMobile === TEST_MOBILE;
    
    if (code !== savedCode && !(isTest && code === TEST_OTP)) {
      return { success: false, message: "کد وارد شده صحیح نیست." };
    }

    const newSessionId = generateSessionId();
    const deviceId = navigator.userAgent;
    const now = Date.now();

    if (isTest) {
      const testUser: AuthUser = {
        uid: TEST_MOBILE, mobileNumber: TEST_MOBILE, firstName: "مدیر", lastName: "سیستم",
        createdAt: now, lastLogin: now, sessionId: newSessionId, deviceId: deviceId,
        isActive: true, isBlocked: false, role: 'admin'
      };
      try {
        if (!auth.currentUser) await signInAnonymously(auth);
        await setDoc(doc(db, "users", TEST_MOBILE), { ...testUser, fullName: "مدیر سیستم", isAdmin: true }, { merge: true });
      } catch (e) {}
      localStorage.setItem('noosh_auth_session', newSessionId);
      localStorage.setItem('noosh_auth_mobile', TEST_MOBILE);
      return { success: true, user: testUser };
    }

    try {
      if (!auth.currentUser) await signInAnonymously(auth);
      const userRef = doc(db, "users", cleanMobile);
      const userSnap = await getDoc(userRef);
      let userData: AuthUser;

      if (!userSnap.exists()) {
        if (!registerData) return { success: true, needsRegistration: true };

        let referredBy = "";
        if (registerData.referralCode) {
          const vQuery = query(collection(db, "visitor_profiles"), where("referral_code", "==", registerData.referralCode.toUpperCase()));
          const vSnap = await getDocs(vQuery);
          if (!vSnap.empty) {
            const foundVisitorId = vSnap.docs[0].data().user_id;
            // جلوگیری از معرفی خود
            if (foundVisitorId !== cleanMobile) {
                referredBy = foundVisitorId;
            }
          }
        }

        userData = {
          uid: cleanMobile, mobileNumber: cleanMobile, firstName: registerData.firstName, lastName: registerData.lastName,
          createdAt: now, lastLogin: now, sessionId: newSessionId, deviceId: deviceId,
          isActive: true, isBlocked: false, role: 'user', referredBy
        };
        await setDoc(userRef, {
          ...userData, fullName: `${registerData.firstName} ${registerData.lastName}`, username: cleanMobile,
          subscriptionExpiry: Date.now() + (365 * 24 * 60 * 60 * 1000), isApproved: true, familySize: 4
        });
      } else {
        const data = userSnap.data();
        if (data.isBlocked) return { success: false, message: "حساب کاربری شما مسدود شده است." };
        userData = { ...data, sessionId: newSessionId, lastLogin: now, deviceId: deviceId } as AuthUser;
        await updateDoc(userRef, { sessionId: newSessionId, lastLogin: now, deviceId: deviceId });
      }

      localStorage.setItem('noosh_auth_session', newSessionId);
      localStorage.setItem('noosh_auth_mobile', cleanMobile);
      return { success: true, user: userData };
    } catch (e: any) {
      return { success: false, message: "خطا در تایید دیتابیس." };
    }
  },

  checkSession: async (): Promise<{ isValid: boolean; user?: AuthUser }> => {
    const mobile = localStorage.getItem('noosh_auth_mobile');
    const localSession = localStorage.getItem('noosh_auth_session');
    if (!mobile || !localSession) return { isValid: false };
    
    try {
      // تست سریع و لود آنی سشن از لوکال دیتابیس بوسیله IndexedDB
      const localUser = await DB.get('users', mobile).catch(() => null);
      if (localUser && localUser.sessionId === localSession) {
        // اگر سشن لوکال درست بود، بلافاصله وارد شو تا کاربر معطل نشود
        return { isValid: true, user: localUser };
      }

      if (!auth.currentUser) await signInAnonymously(auth);
      
      const docRef = doc(db, "users", mobile);
      const serverPromise = getDoc(docRef);
      const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000));
      
      const userSnap = await Promise.race([serverPromise, timeoutPromise]);
      
      if (userSnap && 'exists' in userSnap && userSnap.exists()) {
        const userData = userSnap.data() as AuthUser;
        await DB.put('users', userData).catch(() => {});
        return { isValid: userData.sessionId === localSession, user: userData.sessionId === localSession ? userData : undefined };
      }

      // در صورت بروز تاخیر، به سشن معتبر لوکال قبلی اعتماد کن
      if (localUser) {
        return { isValid: localUser.sessionId === localSession, user: localUser.sessionId === localSession ? localUser : undefined };
      }
      
      if (mobile === TEST_MOBILE) return { isValid: true, user: { uid: TEST_MOBILE, role: 'admin', isActive: true } as any };
      return { isValid: false };
    } catch {
      // تلاش مجدد با لود از لوکال در صورت قطع ارتباط با کلود فایربیس
      const localUser = await DB.get('users', mobile).catch(() => null);
      if (localUser && localUser.sessionId === localSession) {
        return { isValid: true, user: localUser };
      }
      if (mobile === TEST_MOBILE) return { isValid: true, user: { uid: TEST_MOBILE, role: 'admin', isActive: true } as any };
      return { isValid: false };
    }
  },

  logout: async () => {
    localStorage.removeItem('noosh_auth_session');
    localStorage.removeItem('noosh_auth_mobile');
    await auth.signOut();
  }
};
