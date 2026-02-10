
import React, { useState } from 'react';
import { CreditCard, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';

interface SubscriptionProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ user, onUpdateUser, onLogout }) => {
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const updatedUser = await UserService.extendSubscription(user.uid, 30);
    onUpdateUser(updatedUser);
    setLoading(false);
  };

  const toPersianDigits = (num: string) => num.replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg overflow-hidden rounded-[3rem] shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-br from-rose-600 to-pink-700 p-10 text-white text-center">
          <ShieldAlert size={64} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-black mb-2">اشتراک شما منقضی شده</h1>
          <p className="opacity-90 font-bold">برای استفاده از تمامی امکانات هوشمند نوش، اشتراک خود را فعال کنید.</p>
        </div>

        <div className="p-10">
          <div className="flex items-center justify-between mb-8 text-gray-700 font-black bg-gray-50 p-5 rounded-2xl border border-gray-100">
             <span>وضعیت فعلی حساب:</span>
             <span className="text-red-500 flex items-center gap-2">
               <Clock size={18} />
               منقضی شده
             </span>
          </div>

          <h3 className="font-black text-xl mb-6 text-gray-800">امکانات اشتراک ویژه:</h3>
          <ul className="space-y-4 mb-10">
            {[
               'دسترسی به بیش از ۵۰۰۰ دستور پخت حرفه‌ای',
               'برنامه‌ریز هوشمند هفتگی و ماهانه',
               'سیستم آنالیز طبع و مصلح غذاها',
               'سبد خرید هوشمند با قابلیت اشتراک‌گذاری',
               'پشتیبانی VIP و بدون تبلیغات'
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                  <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  {item}
               </li>
            ))}
          </ul>

          <button 
            onClick={handlePay}
            disabled={loading}
            className="w-full py-5 bg-slate-900 hover:bg-black disabled:bg-gray-400 text-white font-black rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <span className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <CreditCard size={24} className="group-hover:rotate-12 transition-transform" />
                تمدید ۳۰ روزه ({toPersianDigits('۵۰۰,۰۰۰')} ریال)
              </>
            )}
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full mt-6 py-4 text-slate-400 hover:text-rose-500 font-black rounded-xl transition-all text-sm"
          >
            خروج و بازگشت به صفحه ورود
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
