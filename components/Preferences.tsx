
import React, { useMemo, useState } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, Dish } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, Plus, ShieldAlert, Globe, FilterX, Check, Lock, ChevronDown, ChevronUp, Layers, AlertCircle, Utensils, Users, Minus, ScanFace, Fingerprint, ShieldCheck } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import DishVisual from './DishVisual';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const REGIONS = [
  { id: 'turkish', label: 'ترکیه', countries: ['ترکیه', 'Turkey'] },
  { id: 'arab', label: 'عربی و مدیترانه', countries: ['لبنان', 'مدیترانه', 'یونان', 'اردن', 'شام', 'کشورهای عربی', 'Lebanon', 'Mediterranean', 'Greece', 'Jordan', 'Syria'] },
  { id: 'europe', label: 'اروپا', countries: ['ایتالیا', 'فرانسه', 'روسیه', 'آلمان', 'انگلستان', 'Italy', 'France', 'Russia', 'Germany', 'UK', 'England', 'Spain', 'اسپانیا'] },
  { id: 'central_asia', label: 'آسیای مرکزی', countries: ['افغانستان', 'ازبکستان', 'پاکستان', 'تاجیکستان', 'آذربایجان', 'Afghanistan', 'Uzbekistan', 'Pakistan', 'Tajikistan', 'Azerbaijan', 'Uzbek', 'Pakistani'] },
  { id: 'far_east', label: 'خاور دور', countries: ['چین', 'ژاپن', 'تایلند', 'ویتنام', 'China', 'Japan', 'Thailand', 'Vietnam'] },
  { id: 'americas', label: 'آمریکا', countries: ['برزیل', 'مکزیک', 'آمریکا', 'Brazil', 'Mexico', 'USA', 'United States'] },
];

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout }) => {
  const [ingInput, setIngInput] = useState('');
  const [showNations, setShowNations] = useState(false);
  const [isBiometricLoading, setIsBiometricLoading] = useState(false);

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

  const toggleBiometric = async () => {
    const newVal = !user.isBiometricEnabled;
    setIsBiometricLoading(true);
    const updatedUser = { ...user, isBiometricEnabled: newVal };
    onUpdateUser(updatedUser);
    await UserService.updateProfile(user.username, { isBiometricEnabled: newVal });
    setIsBiometricLoading(false);
  };

  const handleRemoveFavorite = async (dishId: string) => {
    const updatedUser = await UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const handleRemoveBlacklist = async (dishId: string) => {
    const updatedUser = await UserService.toggleBlacklist(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const toPersianDigits = (num: number | string) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const favoritesList = useMemo(() => {
    return RecipeService.getAllDishes().filter(d => (user.favoriteDishIds || []).includes(d.id));
  }, [user.favoriteDishIds]);

  const blacklistedList = useMemo(() => {
    return RecipeService.getRawDishes().filter(d => (user.blacklistedDishIds || []).includes(d.id));
  }, [user.blacklistedDishIds]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 px-4 text-right dir-rtl select-none">
      
      {/* هدر پروفایل */}
      <div className="relative group overflow-hidden metallic-navy rounded-[3rem] p-10 shadow-2xl border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-teal-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
               <User size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white text-halo">{user.fullName || user.username}</h2>
              <p className="text-teal-400 text-xs font-bold mt-1">عضویت ویژه طلایی</p>
            </div>
          </div>
          <button onClick={onLogout} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-black shadow-lg active:scale-95 flex items-center gap-2 transition-all">
             <LogOut size={20} /> خروج از حساب
          </button>
        </div>
      </div>

      {/* بخش فیلتر بر اساس طبع */}
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

      {/* بخش تعداد نفرات خانواده */}
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
          onClick={toggleBiometric}
          className={`px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${user.isBiometricEnabled ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}
        >
          {user.isBiometricEnabled ? 'فعال است' : 'فعال‌سازی ورود سریع'}
        </button>
      </div>

      {/* محدودیت‌های دسته‌بندی */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><FilterX size={24} /></div>
          <div><h2 className="text-lg font-black text-slate-800">فیلتر هوشمند دسته‌ها</h2><p className="text-[10px] text-slate-400 font-bold uppercase">Cooklist Restrictions</p></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-4 py-4 rounded-2xl text-[11px] font-black transition-all border-2 flex flex-col items-center gap-2 ${user.excludedCategories?.includes(cat) ? 'bg-slate-100 border-slate-200 text-slate-400' : 'bg-white border-teal-500 text-teal-700 shadow-md'}`}>
                 {CATEGORY_LABELS[cat]}
              </button>
            ))}
        </div>
      </div>

      {/* بخش غذاهای محبوب */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={24} fill="currentColor" /></div>
            <div>
              <h2 className="text-lg font-black text-slate-800">غذاهای محبوب من</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Favorite Dishes List</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-rose-100 text-rose-700 rounded-xl text-xs font-black">
            {toPersianDigits(favoritesList.length)} مورد
          </div>
        </div>
        
        {favoritesList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoritesList.map(dish => (
              <div key={dish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <DishVisual category={dish.category} imageUrl={dish.imageUrl} dishId={dish.id} iconSize={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{dish.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{CATEGORY_LABELS[dish.category]}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveFavorite(dish.id)}
                  className="p-3 text-slate-300 hover:text-indigo-600 hover:bg-indigo-100 rounded-xl transition-all"
                  title="تجدیدنظر و بازگشت به لیست عادی"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-300 font-bold">
            <Heart size={48} className="mx-auto mb-4 opacity-10" />
            <p>هنوز غذایی را به محبوب‌ها اضافه نکرده‌اید.</p>
          </div>
        )}
      </div>

      {/* بخش لیست سیاه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-900 text-white rounded-2xl"><ThumbsDown size={24} /></div>
            <div>
              <h2 className="text-lg font-black text-slate-800">لیست سیاه (حذف شده‌ها)</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Excluded from Suggestions</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-xs font-black">
            {toPersianDigits(blacklistedList.length)} مورد
          </div>
        </div>

        {blacklistedList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blacklistedList.map(dish => (
              <div key={dish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 grayscale">
                    <DishVisual category={dish.category} imageUrl={dish.imageUrl} dishId={dish.id} iconSize={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-sm">{dish.name}</h4>
                    <span className="text-[10px] text-slate-400 font-bold">{CATEGORY_LABELS[dish.category]}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveBlacklist(dish.id)}
                  className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all"
                  title="بازگرداندن به چرخه پیشنهادات"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-slate-300 font-bold">
            <ThumbsDown size={48} className="mx-auto mb-4 opacity-10" />
            <p>لیست سیاه شما خالی است.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preferences;
