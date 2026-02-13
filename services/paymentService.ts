
import { collection, addDoc, doc, getDoc, updateDoc, query, where, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserProfile, PaymentRecord, AppConfig } from "../types";
import { UserService } from "./userService";

const ZARINPAL_MERCHANT_ID = "YOUR_ZARINPAL_MERCHANT_ID"; 
const CALLBACK_URL = window.location.origin + window.location.pathname;

// Global flag for testing - can be toggled from Admin
let isSandboxMode = localStorage.getItem('noosh_sandbox_mode') === 'true';

export const PaymentService = {
  setSandboxMode: (enabled: boolean) => {
    isSandboxMode = enabled;
    localStorage.setItem('noosh_sandbox_mode', enabled ? 'true' : 'false');
  },
  
  getSandboxMode: () => isSandboxMode,

  getPricing: async (): Promise<AppConfig> => {
    try {
      const snap = await getDoc(doc(db, "app_settings", "pricing"));
      if (snap.exists()) return snap.data() as AppConfig;
      return { monthly_price: 250000, yearly_price: 2500000, last_updated: Date.now() };
    } catch (e) {
      return { monthly_price: 250000, yearly_price: 2500000, last_updated: Date.now() };
    }
  },

  updatePricing: async (monthly: number, yearly: number) => {
    await setDoc(doc(db, "app_settings", "pricing"), {
      monthly_price: monthly,
      yearly_price: yearly,
      last_updated: Date.now()
    });
  },

  requestPayment: async (user: UserProfile, plan: 'monthly' | 'yearly'): Promise<string | null> => {
    const config = await PaymentService.getPricing();
    const amount = plan === 'monthly' ? config.monthly_price : config.yearly_price;
    const description = `خرید اشتراک ${plan === 'monthly' ? 'ماهانه' : 'سالانه'} (تست)`;

    // --- Sandbox Simulation ---
    if (isSandboxMode) {
      const mockAuthority = "test_auth_" + Date.now();
      await addDoc(collection(db, "payments"), {
        user_id: user.uid,
        user_full_name: user.fullName,
        amount: amount,
        plan_type: plan,
        authority: mockAuthority,
        status: 'pending',
        created_at: Date.now(),
        ref_id: '',
        is_test: true
      });
      // Redirect to internal simulator instead of Zarinpal
      return `${window.location.origin}?Status=OK&Authority=${mockAuthority}&Sandbox=true`;
    }
    // --- End Simulation ---

    try {
      const response = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          amount: amount,
          callback_url: CALLBACK_URL,
          description: description,
          metadata: { mobile: user.uid, email: user.email || "no-email@noosh.ir" }
        })
      });

      const data = await response.json();
      if (data.data && data.data.authority) {
        const authority = data.data.authority;
        await addDoc(collection(db, "payments"), {
          user_id: user.uid,
          user_full_name: user.fullName,
          amount: amount,
          plan_type: plan,
          authority: authority,
          status: 'pending',
          created_at: Date.now(),
          ref_id: ''
        });
        return `https://www.zarinpal.com/pg/StartPay/${authority}`;
      }
    } catch (error) {
      console.error("Zarinpal Error:", error);
    }
    return null;
  },

  verifyPayment: async (authority: string): Promise<{ success: boolean; refId?: string; planType?: string }> => {
    try {
      const q = query(collection(db, "payments"), where("authority", "==", authority));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return { success: false };

      const paymentDoc = snapshot.docs[0];
      const paymentData = paymentDoc.data() as PaymentRecord;

      if (paymentData.status === 'success') {
        return { success: true, refId: paymentData.ref_id, planType: paymentData.plan_type };
      }

      // --- Sandbox Verification ---
      if (authority.startsWith('test_auth_')) {
        const mockRefId = "REF_TEST_" + Math.floor(Math.random() * 1000000);
        await updateDoc(doc(db, "payments", paymentDoc.id), {
          status: 'success',
          ref_id: mockRefId
        });
        const days = paymentData.plan_type === 'monthly' ? 30 : 365;
        await UserService.extendSubscription(paymentData.user_id, days, paymentData.amount);
        return { success: true, refId: mockRefId, planType: paymentData.plan_type };
      }
      // --- End Simulation ---

      const response = await fetch("https://api.zarinpal.com/pg/v4/payment/verify.json", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          merchant_id: ZARINPAL_MERCHANT_ID,
          amount: paymentData.amount,
          authority: authority
        })
      });

      const result = await response.json();
      if (result.data && (result.data.code === 100 || result.data.code === 101)) {
        const refId = result.data.ref_id.toString();
        await updateDoc(doc(db, "payments", paymentDoc.id), { status: 'success', ref_id: refId });
        const days = paymentData.plan_type === 'monthly' ? 30 : 365;
        await UserService.extendSubscription(paymentData.user_id, days, paymentData.amount);
        return { success: true, refId, planType: paymentData.plan_type };
      } else {
        await updateDoc(doc(db, "payments", paymentDoc.id), { status: 'failed' });
        return { success: false };
      }
    } catch (error) {
      console.error("Verification Error:", error);
    }
    return { success: false };
  },

  getAllPayments: async (): Promise<PaymentRecord[]> => {
    const snapshot = await getDocs(collection(db, "payments"));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as PaymentRecord))
      .sort((a, b) => b.created_at - a.created_at);
  }
};
