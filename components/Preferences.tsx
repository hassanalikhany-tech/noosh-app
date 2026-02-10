
import React, { useMemo, useState } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, Dish } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, Plus, ShieldAlert, Globe, FilterX, Check, Lock, ChevronDown, ChevronUp, Layers, AlertCircle, Utensils, Users, Minus, ScanFace, Fingerprint, ShieldCheck, Share2, Copy, QrCode, TrendingUp, MessageCircle, Smartphone, UserCheck, Briefcase, History, Coins, CreditCard } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import DishVisual from './DishVisual';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .33z"/>
  </svg>
);

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout }) => {
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const toggleCategory = (cat: DishCategory) => {
    let newExcluded = [...(user.excludedCategories || [])];
    const isCurrentlyExcluded = newExcluded.includes(cat);
    if (isCurrentlyExcluded) newExcluded = newExcluded.filter(c => c !== cat);
    else newExcluded.push(cat);
    onUpdateUser({ ...user, excludedCategories: newExcluded });
    UserService.updateProfile(user.username, { excludedCategories: newExcluded });
  };

  const toggleNature = (nature: NatureType) => {
     let newNatures = [...(user.preferredNatures || [])];
     if (newNatures.includes(nature)) newNatures = newNatures.filter(n => n !== nature);
     else newNatures.push(nature);
     if (newNatures.length === 0) return; 
     onUpdateUser({ ...user, preferredNatures: newNatures });
     UserService.updateProfile(user.username, { preferredNatures: newNatures });
  };

  const updateFamilySize = (size: number) => {
    if (size < 1 || size > 20) return;
    onUpdateUser({ ...user, familySize: size });
    UserService.updateProfile(user.username, { familySize: size });
  };

  const referralCode = user.referralCode || "NONE";
  const shareLink = `https://nooshapp.ir/register?ref=${encodeURIComponent(referralCode)}`;
  const shareText = `سلام! من از اپلیکیشن هوشمند «نوش» برای رژیم غذایی و آشپزی استفاده می‌کنم. عالیه! با کد معرف من ثبت‌نام کن:\n\n🔑 کد معرف: ${referralCode}\n📥 لینک ثبت‌نام: ${shareLink}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'whatsapp' | 'telegram' | 'sms') => {
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'telegram') {
      window.open(`https://t.me/share/url?url=https://nooshapp.ir&text=${encodeURIComponent(shareText)}`, '_blank');
    } else if (platform === 'sms') {
      window.location.href = `sms:?body=${encodeURIComponent(shareText)}`;
    }
  };

  const toPersianDigits = (num: number | string | undefined) => {
    if (num === undefined || num === null) return '۰';
    return num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const favoritesList = useMemo(() => {
    return RecipeService.getAllDishes().filter(d => (user.favoriteDishIds || []).includes(d.id));
  }, [user.favoriteDishIds]);

  const blacklistedList = useMemo(() => {
    return RecipeService.getRawDishes().filter(d => (user.blacklistedDishIds || []).includes(d.id));
  }, [user.blacklistedDishIds]);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareLink)}&bgcolor=ffffff&color=0f172a&margin=1`;

  const totalPaid = useMemo(() => {
    return (user.paymentHistory || []).reduce((acc, curr) => acc + curr.amount, 0);
  }, [user.paymentHistory]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 px-4 text-right dir-rtl select-none">
      
      {/* هدر پروفایل */}
      <div className="relative group overflow-hidden metallic-navy rounded-[3.5rem] p-10 shadow-2xl border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-teal-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
               <User size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white text-halo">{user.fullName || user.username}</h2>
              <p className="text-teal-400 text-sm font-bold mt-1">مشترک ویژه طلایی</p>
            </div>
          </div>
          <button onClick={onLogout} className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black shadow-lg active:scale-95 flex items-center gap-2 transition-all">
             <LogOut size={22} /> خروج از حساب
          </button>
        </div>
      </div>

      {/* فیلتر طبع */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><ShieldCheck size={24}/></div>
            <div>
               <h2 className="text-lg font-black text-slate-800">فیلتر طبع غذاها</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase">Nature-Based Suggestions</p>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
               { id: 'hot', label: 'طبع گرم', icon: Sun, color: 'orange' },
               { id: 'cold', label: 'طبع سرد', icon: Snowflake, color: 'blue' },
               { id: 'balanced', label: 'طبع معتدل', icon: Scale, color: 'emerald' }
            ].map(nature => (
               <button 
                  key={nature.id} 
                  onClick={() => toggleNature(nature.id as NatureType)}
                  className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${user.preferredNatures?.includes(nature.id as NatureType) ? `bg-${nature.color}-500 text-white border-${nature.color}-500 shadow-xl` : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
               >
                  <div className="flex items-center gap-3">
                     <nature.icon size={24} />
                     <span className="font-black text-sm">{nature.label}</span>
                  </div>
                  {user.preferredNatures?.includes(nature.id as NatureType) ? <CheckCircle2 size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>}
               </button>
            ))}
         </div>
      </div>

      {/* فیلتر دسته‌بندی‌ها */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><FilterX size={24}/></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">حذف دسته‌های غذایی</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Excluded Categories</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
            <button 
              key={cat} 
              onClick={() => toggleCategory(cat)}
              className={`p-4 rounded-2xl border-2 font-black text-xs transition-all flex items-center justify-center gap-2 ${user.excludedCategories?.includes(cat) ? 'bg-slate-900 border-slate-900 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200'}`}
            >
              {user.excludedCategories?.includes(cat) ? <X size={14}/> : <Check size={14} className="opacity-30" />}
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* تعداد نفرات خانواده */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Users size={32} /></div>
          <div><h2 className="text-xl font-black text-slate-800">تعداد نفرات خانواده</h2><p className="text-[10px] text-slate-400 font-bold uppercase">Recipe Scaling</p></div>
        </div>
        <div className="flex items-center gap-6 bg-slate-50 p-3 rounded-3xl border border-slate-100">
          <button onClick={() => updateFamilySize((user.familySize || 4) - 1)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:text-rose-600 active:scale-90"><Minus size={24} /></button>
          <div className="flex flex-col items-center min-w-[60px]"><span className="text-3xl font-black text-slate-800">{toPersianDigits(user.familySize || 4)}</span><span className="text-[10px] font-black text-slate-400">نفر</span></div>
          <button onClick={() => updateFamilySize((user.familySize || 4) + 1)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:text-emerald-600 active:scale-90"><Plus size={24} /></button>
        </div>
      </div>

      {/* امنیت بیومتریک */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><ScanFace size={32} /></div>
          <div><h2 className="text-xl font-black text-slate-800">امنیت و ورود سریع</h2><p className="text-[10px] text-slate-400 font-bold uppercase">Biometric FaceID</p></div>
        </div>
        <button 
          onClick={() => UserService.updateProfile(user.username, { isBiometricEnabled: !user.isBiometricEnabled }).then(onUpdateUser)}
          className={`px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${user.isBiometricEnabled ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
        >
          {user.isBiometricEnabled ? 'فعال است' : 'فعال‌سازی ورود سریع'}
        </button>
      </div>

      {/* لیست محبوب‌ها */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={24}/></div>
            <div>
              <h2 className="text-lg font-black text-slate-800">غذاهای محبوب شما</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Your Favorites ({toPersianDigits(favoritesList.length)})</p>
            </div>
          </div>
        </div>
        {favoritesList.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {favoritesList.map(dish => (
              <div key={dish.id} className="min-w-[140px] flex flex-col items-center gap-2 group animate-enter">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg relative border-2 border-white">
                  <DishVisual category={dish.category} className="w-full h-full" iconSize={32} imageUrl={dish.imageUrl} dishId={dish.id} />
                  <button 
                    onClick={() => UserService.toggleFavorite(user.username, dish.id).then(onUpdateUser)}
                    className="absolute inset-0 bg-rose-500/80 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
                <span className="text-[11px] font-black text-slate-700 text-center line-clamp-1">{dish.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-300 italic font-black text-sm bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
             هنوز غذایی را لایک نکرده‌اید
          </div>
        )}
      </div>

      {/* لیست سیاه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><ThumbsDown size={24}/></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">لیست سیاه (حذف شده‌ها)</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Hidden Dishes ({toPersianDigits(blacklistedList.length)})</p>
          </div>
        </div>
        {blacklistedList.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {blacklistedList.map(dish => (
              <div key={dish.id} className="min-w-[140px] flex flex-col items-center gap-2 group animate-enter">
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg relative border-2 border-white grayscale">
                  <DishVisual category={dish.category} className="w-full h-full" iconSize={32} imageUrl={dish.imageUrl} dishId={dish.id} />
                  <button 
                    onClick={() => UserService.toggleBlacklist(user.username, dish.id).then(onUpdateUser)}
                    className="absolute inset-0 bg-indigo-500/80 text-white opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center backdrop-blur-sm"
                  >
                    <RotateCcw size={24} />
                  </button>
                </div>
                <span className="text-[11px] font-black text-slate-700 text-center line-clamp-1">{dish.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-300 italic font-black text-sm bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
             لیست سیاه شما خالی است
          </div>
        )}
      </div>

      {/* بخش مالی ویزیتورها - V15.79 */}
      {user.isVisitor && (
        <div className="bg-slate-950 rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-white/10 relative overflow-hidden group animate-enter">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]"></div>
          
          <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
              <div className="flex flex-col items-center justify-center gap-3 shrink-0">
                <div className="bg-white p-4 rounded-[2.5rem] shadow-xl border-[6px] border-slate-900 hover:scale-105 transition-transform cursor-pointer">
                    <img src={qrCodeUrl} alt="Referral QR Code" className="w-32 h-32 object-contain rounded-2xl" />
                </div>
                <div className="px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Referral Pass</span>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-between space-y-6">
                <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl shadow-lg"><Briefcase size={24}/></div>
                        <div>
                            <h2 className="text-2xl font-black text-white leading-none">پنل ویزیتوری اختصاصی</h2>
                            <p className="text-emerald-400 text-[11px] font-bold mt-1.5">کسب درآمد (۲۰٪ سهم فروش)</p>
                        </div>
                      </div>
                      <button onClick={() => setShowHistory(!showHistory)} className="p-3 text-white/40 hover:text-white transition-colors">
                        <History size={24} />
                      </button>
                    </div>
                </div>

                {showHistory ? (
                   <div className="bg-slate-900/80 rounded-3xl p-6 space-y-4 border border-white/5 animate-enter">
                      <div className="flex items-center justify-between text-white/60 text-[10px] font-black uppercase tracking-widest px-2 border-b border-white/5 pb-2">
                         <span>تاریخ واریز بانکی</span>
                         <span>مبلغ (ریال)</span>
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-2 no-scrollbar">
                         {user.paymentHistory && user.paymentHistory.length > 0 ? (
                           user.paymentHistory.map((pay, i) => (
                             <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                <span className="text-xs font-bold text-white/80">{new Intl.DateTimeFormat('fa-IR').format(pay.date)}</span>
                                <span className="text-sm font-black text-emerald-400">{toPersianDigits(pay.amount.toLocaleString())}</span>
                             </div>
                           ))
                         ) : (
                           <div className="py-8 text-center text-white/20 text-xs font-bold">هنوز واریز بانکی ثبت نشده است.</div>
                         )}
                      </div>
                      <button onClick={() => setShowHistory(false)} className="w-full py-2 text-[10px] font-black text-slate-500 hover:text-white transition-colors">بازگشت به پنل</button>
                   </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <span className="text-[10px] font-black text-slate-500 uppercase pr-2 tracking-widest">کد معرف اختصاصی شما</span>
                      <div className="bg-slate-900 border border-white/10 p-5 rounded-3xl flex items-center justify-between gap-4 relative overflow-hidden">
                        <span className="text-3xl font-black text-white tracking-widest font-mono select-all truncate">
                          {referralCode}
                        </span>
                        <button onClick={handleCopyCode} className={`shrink-0 px-6 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-lg active:scale-90 border ${copied ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white border-slate-200 text-slate-950 hover:bg-emerald-50'}`}>
                          {copied ? <Check size={18}/> : <Copy size={18}/>}
                          <span className="text-xs font-black">{copied ? 'کپی شد' : 'کپی کد'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-wider">موجود آماده تسویه</span>
                            <span className="text-2xl font-black text-emerald-400">
                                {toPersianDigits((user.referralBalance || 0).toLocaleString())}
                            </span>
                          </div>
                          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl"><Coins size={20} /></div>
                        </div>
                        <div className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
                           <div className="flex flex-col">
                              <span className="text-[9px] font-black text-slate-500 uppercase mb-1 tracking-wider">کل واریزی‌های بانکی</span>
                              <span className="text-2xl font-black text-indigo-400">
                                 {toPersianDigits(totalPaid.toLocaleString())}
                              </span>
                           </div>
                           <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl"><CreditCard size={20} /></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <button onClick={() => handleShare('whatsapp')} className="flex items-center justify-center gap-2 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/20 transition-all active:scale-95 font-black text-[11px]">
                          <MessageCircle size={18} /> واتس‌اپ
                      </button>
                      <button onClick={() => handleShare('telegram')} className="flex items-center justify-center gap-2 py-3.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 rounded-2xl border border-sky-500/20 transition-all active:scale-95 font-black text-[11px]">
                          <TelegramIcon /> تلگرام
                      </button>
                      <button onClick={() => handleShare('sms')} className="flex items-center justify-center gap-2 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all active:scale-95 font-black text-[11px]">
                          <Smartphone size={18} /> پیامک
                      </button>
                    </div>
                  </>
                )}
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
