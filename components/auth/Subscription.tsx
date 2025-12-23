
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
    const updatedUser = await UserService.extendSubscription(user.username, 30);
    onUpdateUser(updatedUser);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl border border-gray-100">
        <div className="bg-gradient-to-br from-rose-600 to-pink-700 p-8 text-white text-center">
          <ShieldAlert size={64} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-black mb-2">اشتراک شما به پایان رسیده</h1>
          <p className="opacity-90">برای ادامه استفاده از امکانات، اشتراک خود را تمدید کنید.</p>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8 text-gray-700 font-bold bg-gray-50 p-4 rounded-xl">
             <span>وضعیت حساب:</span>
             <span className="text-red-500 flex items-center gap-2">
               <Clock size={18} />
               منقضی شده
             </span>
          </div>

          <h3 className="font-bold text-xl mb-4 text-gray-800">مزایای اشتراک ویژه:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3 text-gray-600">
              <CheckCircle2 className="text-emerald-500" size={20} />
              دسترسی به ۱۰۰۰+ دستور پخت اصیل ایرانی
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <CheckCircle2 className="text-emerald-500" size={20} />
              برنامه‌ریز هوشمند هفتگی
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <CheckCircle2 className="text-emerald-500" size={20} />
              شخصی‌سازی کامل و لیست سیاه غذاها
            </li>
          </ul>

          <button 
            onClick={handlePay}
            disabled={loading}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              'در حال پردازش...'
            ) : (
              <>
                <CreditCard size={20} />
                پرداخت و تمدید ۱ ماهه (۵۰,۰۰۰ تومان)
              </>
            )}
          </button>
          
          <button 
            onClick={onLogout}
            className="w-full mt-4 py-3 text-gray-500 hover:bg-gray-50 font-bold rounded-xl transition-all"
          >
            خروج از حساب
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
