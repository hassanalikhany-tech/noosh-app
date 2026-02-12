
import React, { useMemo, useState, useEffect } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, VisitorProfile, VisitorFinancialInfo, CommissionLog } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Heart, Plus, ThumbsDown, RotateCcw, ShieldCheck, Award, QrCode, Gift, Info, Layers, Minus, ScanFace, FilterX, CreditCard, ChevronDown, ChevronUp, Loader2, CheckCircle, AlertTriangle, Upload, FileText, Clock, ShieldAlert, X, Check, Wallet, ArrowUpRight } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import DishVisual from './DishVisual';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout }) => {
  const [visitorProfile, setVisitorProfile] = useState<VisitorProfile | null>(null);
  const [financialInfo, setFinancialInfo] = useState<VisitorFinancialInfo | null>(null);
  const [showFinForm, setShowFinForm] = useState(false);
  const [finData, setFinData] = useState({ fullName: '', iban: '', national_id: '', birth_date: '', id_card_image_url: '' });
  const [isFinLoading, setIsFinLoading] = useState(false);
  const [pendingCom, setPendingCom] = useState(0);

  useEffect(() => {
    if (user.role === 'visitor') {
      UserService.getVisitorProfile(user.uid).then(p => {
        setVisitorProfile(p);
        if (p?.payment_info_status === 'completed') {
           UserService.getVisitorFinancialInfo(user.uid).then(f => setFinancialInfo(f));
        }
      });
      
      const q = query(collection(db, "commission_logs"), where("visitor_id", "==", user.uid), where("status", "==", "pending"));
      getDocs(q).then(snap => {
          let total = 0;
          snap.forEach(d => total += d.data().amount);
          setPendingCom(total);
      });
    }
  }, [user.role, user.uid]);

  const toggleCategory = (cat: DishCategory) => {
    let newExcluded = [...(user.excludedCategories || [])];
    if (newExcluded.includes(cat)) newExcluded = newExcluded.filter(c => c !== cat);
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

  const handleFinancialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!finData.id_card_image_url) return alert("لطفاً تصویر کارت ملی را آپلود کنید.");
    setIsFinLoading(true);
    try {
      await UserService.updateVisitorFinancialInfo(user.uid, finData);
      setShowFinForm(false);
      alert("اطلاعات و مدارک با موفقیت ثبت شد و در صف تایید ادمین قرار گرفت.");
      const f = await UserService.getVisitorFinancialInfo(user.uid);
      setFinancialInfo(f);
    } finally { setIsFinLoading(false); }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setFinData({...finData, id_card_image_url: reader.result as string});
          reader.readAsDataURL(file);
      }
  };

  const toPersian = (num: number | string | undefined | null) => {
    if (num === undefined || num === null) return '۰';
    return num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  };

  const favoritesList = useMemo(() => RecipeService.getRawDishes().filter(d => (user.favoriteDishIds || []).includes(d.id)), [user.favoriteDishIds]);
  const blacklistedList = useMemo(() => RecipeService.getRawDishes().filter(d => (user.blacklistedDishIds || []).includes(d.id)), [user.blacklistedDishIds]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 px-4 text-right dir-rtl select-none">
      <div className="metallic-navy rounded-[3rem] p-10 shadow-2xl border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="relative">
                <div className="w-20 h-20 bg-teal-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl"><User size={40} /></div>
                {user.role === 'visitor' && (
                    <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 p-1.5 rounded-xl shadow-lg border-2 border-slate-900" title="ویزیتور">
                        <Award size={16} />
                    </div>
                )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-white">{user.fullName || "کاربر نوش"}</h2>
                  {user.role === 'visitor' && <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-tighter">Visitor</span>}
              </div>
              <p className="text-teal-400 text-xs font-bold mt-1 uppercase tracking-widest">{user.role === 'admin' ? 'System Administrator' : user.role === 'visitor' ? 'Affiliate Partner' : 'Premium Member'}</p>
            </div>
          </div>
          <button onClick={onLogout} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 transition-all active:scale-95"><LogOut size={20} /> خروج</button>
        </div>
      </div>

      {user.role === 'visitor' && visitorProfile && (
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/10 animate-enter">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3"><Award size={32} className="text-amber-400" /> <h3 className="text-xl font-black">میز کار ویزیتور</h3></div>
                <div className="bg-black/30 px-6 py-3 rounded-2xl border border-white/10 flex items-center justify-between gap-4 group">
                  <span className="text-xs font-black opacity-60">کد معرفی:</span>
                  <span className="text-2xl font-black text-amber-400 font-mono tracking-wider">{visitorProfile.referral_code}</span>
                  <button onClick={() => { navigator.clipboard.writeText(visitorProfile.referral_code); alert("کد معرف کپی شد"); }} className="p-2 hover:bg-white/10 rounded-lg transition-all active:scale-90"><Layers size={16}/></button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                <div className="bg-white/10 p-5 rounded-3xl text-center border border-white/5 backdrop-blur-sm"><Gift size={24} className="mx-auto text-emerald-400 mb-2"/><span className="text-2xl font-black block">{toPersian(visitorProfile.total_commission)}</span><span className="text-[10px] opacity-60 font-bold">کل پورسانت</span></div>
                <div className="bg-white/10 p-5 rounded-3xl text-center border border-white/5 backdrop-blur-sm"><CheckCircle size={24} className="mx-auto text-indigo-300 mb-2"/><span className="text-2xl font-black block">{toPersian(visitorProfile.referrals_count)}</span><span className="text-[10px] opacity-60 font-bold">معرفی موفق</span></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-lg"><Wallet size={24}/></div>
                    <div><p className="text-[10px] font-black opacity-40 uppercase">مبلغ قابل تسویه (فعلی)</p><h4 className="text-xl font-black text-amber-400">{toPersian(pendingCom.toLocaleString())} <span className="text-[10px]">ریال</span></h4></div>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                    <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-lg"><ArrowUpRight size={24}/></div>
                    <div><p className="text-[10px] font-black opacity-40 uppercase">کل دریافتی تا امروز</p><h4 className="text-xl font-black text-emerald-400">{toPersian((visitorProfile.total_paid || 0).toLocaleString())} <span className="text-[10px]">ریال</span></h4></div>
                </div>
            </div>

            {(visitorProfile.total_commission > 0 || visitorProfile.payment_info_status === 'completed') && (
              <div className="border-t border-white/10 pt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><CreditCard size={24}/> <span className="font-black">احراز هویت و حساب بانکی</span></div>
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black border flex items-center gap-2 ${
                    visitorProfile.kyc_status === 'verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20' :
                    visitorProfile.kyc_status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-500/20' : 
                    visitorProfile.kyc_status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-500/20' : 'bg-white/10 text-white/60 border-white/10'
                  }`}>
                    {visitorProfile.kyc_status === 'verified' ? <ShieldCheck size={14}/> : visitorProfile.kyc_status === 'pending' ? <Clock size={14}/> : <ShieldAlert size={14}/>}
                    {visitorProfile.kyc_status === 'verified' ? 'احراز هویت شده' : visitorProfile.kyc_status === 'pending' ? 'در انتظار بررسی' : visitorProfile.kyc_status === 'rejected' ? 'رد شده (اصلاح کنید)' : 'اطلاعات ناقص'}
                  </span>
                </div>

                {(!financialInfo || visitorProfile.kyc_status === 'rejected' || visitorProfile.kyc_status === 'none') && visitorProfile.kyc_status !== 'pending' && (
                  <button onClick={() => setShowFinForm(!showFinForm)} className="w-full py-4 bg-white/10 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/5">
                    {showFinForm ? <ChevronUp size={20}/> : <ChevronDown size={20}/>} {showFinForm ? 'انصراف' : 'تکمیل مدارک جهت تسویه خودکار'}
                  </button>
                )}

                {showFinForm && (
                  <form onSubmit={handleFinancialSubmit} className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/10 animate-enter">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5"><label className="text-[10px] font-black opacity-60 mr-2">نام صاحب حساب</label><input placeholder="نام واقعی مطابق کارت" value={finData.fullName} onChange={e => setFinData({...finData, fullName: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-sm text-center" required /></div>
                      <div className="space-y-1.5"><label className="text-[10px] font-black opacity-60 mr-2">کد ملی</label><input placeholder="۱۰ رقم کد ملی" maxLength={10} value={finData.national_id} onChange={e => setFinData({...finData, national_id: e.target.value.replace(/\D/g,'')})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-sm text-center" required /></div>
                      <div className="space-y-1.5 md:col-span-2"><label className="text-[10px] font-black opacity-60 mr-2">شماره شبا (IBAN)</label><input placeholder="IR000000000000000000000000" value={finData.iban} onChange={e => setFinData({...finData, iban: e.target.value.toUpperCase()})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-sm text-center ltr" required /></div>
                      <div className="space-y-1.5"><label className="text-[10px] font-black opacity-60 mr-2">تاریخ تولد</label><input placeholder="روز/ماه/سال" value={finData.birth_date} onChange={e => setFinData({...finData, birth_date: e.target.value})} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 font-bold text-sm text-center" required /></div>
                      <div className="space-y-1.5"><label className="text-[10px] font-black opacity-60 mr-2">تصویر کارت ملی</label><div className="relative"><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="id-card-upload" /><label htmlFor="id-card-upload" className={`w-full py-3 bg-white/10 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all ${finData.id_card_image_url ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 hover:border-emerald-400'}`}>{finData.id_card_image_url ? <CheckCircle size={18} className="text-emerald-400"/> : <Upload size={18} className="text-white/40"/>}<span className="text-[11px] font-black">{finData.id_card_image_url ? 'تصویر انتخاب شد' : 'انتخاب تصویر کارت'}</span></label></div></div>
                    </div>
                    <button disabled={isFinLoading} className="w-full py-4 bg-emerald-500 text-slate-900 rounded-xl font-black shadow-xl active:scale-95 flex items-center justify-center gap-2 transition-all">{isFinLoading ? <Loader2 className="animate-spin"/> : <ShieldCheck size={20}/>} ارسال مدارک جهت تایید</button>
                  </form>
                )}

                {financialInfo && (
                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-6 items-center justify-between">
                    <div className="space-y-2 text-center sm:text-right">
                      <p className="text-[10px] opacity-60 font-black">حساب تایید شده تسویه:</p>
                      <div className="flex flex-col"><span className="font-black text-emerald-300 text-lg">{financialInfo.fullName}</span><span className="font-mono text-xs opacity-70 ltr">{financialInfo.iban}</span></div>
                    </div>
                    {visitorProfile.last_settlement_at && (
                        <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[9px] font-black text-slate-300">آخرین تسویه: {toPersian(new Intl.DateTimeFormat('fa-IR').format(new Date(visitorProfile.last_settlement_at)))}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* بخش غذاهای محبوب */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3"><div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={24} fill="currentColor"/></div><div><h2 className="text-lg font-black text-slate-800">لیست محبوب‌های من</h2><p className="text-[10px] text-slate-400 font-bold">غذاهایی که لایک کرده‌اید در اولویت برنامه شما هستند</p></div></div>
        {favoritesList.length === 0 ? (
          <p className="text-xs text-slate-400 font-bold py-4 italic text-center">هنوز هیچ غذایی را به لیست محبوب‌ها اضافه نکرده‌اید.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {favoritesList.map(dish => (
              <div key={dish.id} className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-2 flex flex-col items-center text-center gap-2 hover:border-rose-200 transition-all">
                <DishVisual category={dish.category} className="w-full h-16 rounded-xl" iconSize={20} dishId={dish.id} />
                <span className="text-[10px] font-black text-slate-700 line-clamp-1">{dish.name}</span>
                <button onClick={() => UserService.toggleFavorite(user.username, dish.id).then(onUpdateUser)} className="absolute -top-1 -left-1 p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><X size={12}/></button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* بخش لیست سیاه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3"><div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><ThumbsDown size={24} /></div><div><h2 className="text-lg font-black text-slate-800">لیست حذف شده‌ها</h2><p className="text-[10px] text-slate-400 font-bold">این غذاها هرگز در برنامه‌های پیشنهادی شما ظاهر نمی‌شوند</p></div></div>
        {blacklistedList.length === 0 ? (
          <p className="text-xs text-slate-400 font-bold py-4 italic text-center">لیست سیاه شما خالی است.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {blacklistedList.map(dish => (
              <div key={dish.id} className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-2 flex flex-col items-center text-center gap-2 hover:border-slate-300 transition-all opacity-60">
                <DishVisual category={dish.category} className="w-full h-16 rounded-xl grayscale" iconSize={20} dishId={dish.id} />
                <span className="text-[10px] font-black text-slate-700 line-clamp-1">{dish.name}</span>
                <button onClick={() => UserService.toggleBlacklist(user.username, dish.id).then(onUpdateUser)} className="absolute -top-1 -left-1 p-1.5 bg-white border border-slate-200 text-slate-400 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><RotateCcw size={12}/></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
         <div className="flex items-center gap-3"><div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><ShieldCheck size={24}/></div><div><h2 className="text-lg font-black text-slate-800">فیلتر طبع غذاها</h2></div></div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[ { id: 'hot', label: 'طبع گرم', icon: Sun, color: 'orange' }, { id: 'cold', label: 'طبع سرد', icon: Snowflake, color: 'blue' }, { id: 'balanced', label: 'طبع معتدل', icon: Scale, color: 'emerald' } ].map(nature => (
               <button key={nature.id} onClick={() => toggleNature(nature.id as NatureType)} className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${user.preferredNatures?.includes(nature.id as NatureType) ? `bg-${nature.color}-500 text-white border-${nature.color}-500 shadow-xl` : 'bg-white border-slate-100 text-slate-400'}`}>
                  <div className="flex items-center gap-3"><nature.icon size={24} /><span className="font-black text-sm">{nature.label}</span></div>
                  {user.preferredNatures?.includes(nature.id as NatureType) ? <CheckCircle size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-200"></div>}
               </button>
            ))}
         </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4"><div className="p-4 bg-teal-50 text-teal-600 rounded-2xl"><Layers size={32} /></div><div><h2 className="text-xl font-black text-slate-800">تعداد نفرات خانواده</h2></div></div>
        <div className="flex items-center gap-6 bg-slate-50 p-3 rounded-3xl border border-slate-100">
          <button onClick={() => UserService.updateProfile(user.username, { familySize: Math.max(1, user.familySize - 1) }).then(onUpdateUser)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm active:scale-90"><Minus size={24} /></button>
          <div className="flex flex-col items-center min-w-[60px]"><span className="text-3xl font-black text-slate-800">{toPersian(user.familySize || 4)}</span><span className="text-[10px] font-black text-slate-400">نفر</span></div>
          <button onClick={() => UserService.updateProfile(user.username, { familySize: (user.familySize || 4) + 1 }).then(onUpdateUser)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm active:scale-90"><Plus size={24} /></button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8"><div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><FilterX size={24} /></div><div><h2 className="text-lg font-black text-slate-800">فیلتر هوشمند دسته‌ها</h2><p className="text-[10px] text-slate-400 font-bold">دسته‌هایی که انتخاب کنید از پیشنهادات حذف می‌شوند</p></div></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-4 py-4 rounded-2xl text-[11px] font-black transition-all border-2 flex flex-col items-center gap-2 ${user.excludedCategories?.includes(cat) ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white border-teal-500 text-teal-700 shadow-md'}`}>
                  {CATEGORY_LABELS[cat]}
                  {user.excludedCategories?.includes(cat) ? <X size={14}/> : <Check size={14}/>}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
