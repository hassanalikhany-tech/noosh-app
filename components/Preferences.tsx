
import React, { useMemo, useState } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, Dish } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, Plus, ShieldAlert, Globe, FilterX, Check, Lock, ChevronDown, ChevronUp, Layers, AlertCircle, Utensils, Users, Minus, ScanFace, Fingerprint } from 'lucide-react';
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
    
    if (isCurrentlyExcluded) {
      newExcluded = newExcluded.filter(c => c !== cat);
    } else {
      newExcluded.push(cat);
    }

    const updatedUser = { ...user, excludedCategories: newExcluded };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { excludedCategories: newExcluded });
  };

  const updateFamilySize = (size: number) => {
    if (size < 1 || size > 20) return;
    const updatedUser = { ...user, familySize: size };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { familySize: size });
  };

  const toggleBiometric = async () => {
    const newVal = !user.isBiometricEnabled;
    setIsBiometricLoading(true);
    try {
      if (newVal) {
        // در اینجا منطق ثبت بیومتریک در مرورگر صدا زده می‌شود
        // برای سادگی در این مرحله فقط فیلد دیتابیس آپدیت می‌شود
        alert("قابلیت ورود با چهره برای این دستگاه آماده فعال‌سازی است. در ورود بعدی می‌توانید از آن استفاده کنید.");
      }
      const updatedUser = { ...user, isBiometricEnabled: newVal };
      onUpdateUser(updatedUser);
      await UserService.updateProfile(user.username, { isBiometricEnabled: newVal });
    } catch (e) {
      alert("خطا در تنظیم ورود بیومتریک");
    } finally {
      setIsBiometricLoading(false);
    }
  };

  const updateNationalityGroup = (countries: string[]) => {
    if (user.excludedCategories?.includes('international')) return;

    let newExNats = [...(user.excludedNationalities || [])];
    const isCurrentlyExcluded = countries.every(c => newExNats.includes(c));

    if (isCurrentlyExcluded) {
      newExNats = newExNats.filter(c => !countries.includes(c));
    } else {
      const toAdd = countries.filter(c => !newExNats.includes(c));
      newExNats = [...newExNats, ...toAdd];
    }

    const updatedUser = { ...user, excludedNationalities: newExNats };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { excludedNationalities: newExNats });
  };

  const setAllNations = (exclude: boolean) => {
    let newExNats: string[] = [];
    if (exclude) {
      const allPossible = REGIONS.flatMap(r => r.countries);
      newExNats = Array.from(new Set(allPossible));
    }
    const updatedUser = { ...user, excludedNationalities: newExNats };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { excludedNationalities: newExNats });
  };

  const toggleDietMode = () => {
    const newVal = !user.dietMode;
    onUpdateUser({ ...user, dietMode: newVal });
    UserService.updateProfile(user.username, { dietMode: newVal });
  };

  const addDislikedIng = () => {
    if (!ingInput.trim()) return;
    const current = user.dislikedIngredients || [];
    if (current.includes(ingInput.trim())) return;
    const newList = [...current, ingInput.trim()];
    onUpdateUser({ ...user, dislikedIngredients: newList });
    setIngInput('');
    UserService.updateProfile(user.username, { dislikedIngredients: newList });
  };

  const removeDislikedIng = (ing: string) => {
    const newList = (user.dislikedIngredients || []).filter(i => i !== ing);
    onUpdateUser({ ...user, dislikedIngredients: newList });
    UserService.updateProfile(user.username, { dislikedIngredients: newList });
  };

  const favoritesList = useMemo(() => {
    const all = RecipeService.getAllDishes();
    return all.filter(d => (user.favoriteDishIds || []).includes(d.id));
  }, [user.favoriteDishIds]);

  const blacklistedList = useMemo(() => {
    const all = RecipeService.getRawDishes();
    return all.filter(d => (user.blacklistedDishIds || []).includes(d.id));
  }, [user.blacklistedDishIds]);

  const handleRemoveFavorite = async (dishId: string) => {
    const updatedUser = await UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const handleRemoveBlacklist = async (dishId: string) => {
    const updatedUser = await UserService.toggleBlacklist(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const daysLeft = Math.ceil((user.subscriptionExpiry - Date.now()) / (1000 * 60 * 60 * 24));
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const isIntlExcluded = user.excludedCategories?.includes('international');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 px-2 sm:px-0 text-right dir-rtl select-none">
      
      {/* هدر پروفایل */}
      <div className="relative group overflow-hidden metallic-navy rounded-[3rem] p-10 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-teal-500/30 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <User size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white text-halo mb-1">{user.fullName || user.username}</h2>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Member ID: {user.username}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-6 py-3 bg-emerald-500/20 text-emerald-400 rounded-2xl text-sm font-black border border-emerald-500/30 backdrop-blur-md text-halo shadow-lg">
                {toPersianDigits(Math.max(0, daysLeft))} روز اعتبار
             </div>
             <button 
               onClick={onLogout} 
               className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl hover:bg-rose-500/40 transition-all border border-rose-500/30 backdrop-blur-md active:scale-90 shadow-lg"
               title="خروج از حساب"
             >
               <LogOut size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* بخش تعداد نفرات خانواده */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-teal-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl shadow-inner">
            <Users size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">تعداد نفرات خانواده</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recipe Scaling Basis</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 bg-slate-50 p-3 rounded-3xl border border-slate-100 relative z-10">
          <button 
            onClick={() => updateFamilySize((user.familySize || 4) - 1)}
            className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"
          >
            <Minus size={24} />
          </button>
          <div className="flex flex-col items-center min-w-[60px]">
            <span className="text-3xl font-black text-slate-800">{toPersianDigits(user.familySize || 4)}</span>
            <span className="text-[10px] font-black text-slate-400">نفر</span>
          </div>
          <button 
            onClick={() => updateFamilySize((user.familySize || 4) + 1)}
            className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-90"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* بخش امنیت و ورود سریع */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner">
            <ScanFace size={32} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">امنیت و ورود سریع</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Biometric Authentication</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-500">ورود با چهره یا اثرانگشت</span>
          <button 
            onClick={toggleBiometric}
            disabled={isBiometricLoading}
            className={`relative w-16 h-8 rounded-full transition-all duration-300 ${user.isBiometricEnabled ? 'bg-teal-500 shadow-lg shadow-teal-100' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${user.isBiometricEnabled ? 'right-9' : 'right-1'}`}></div>
          </button>
        </div>
      </div>

      {/* بخش محدودیت‌های دسته‌بندی */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm"><FilterX size={24} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">شخصی‌سازی لیست پخت</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Cooklist Restrictions</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => {
              const isExcluded = user.excludedCategories?.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-3 py-4 rounded-2xl text-xs font-black transition-all border-2 flex flex-col items-center justify-center gap-2 group active:scale-95 ${
                    isExcluded 
                    ? 'bg-slate-100 border-slate-300 text-slate-600' 
                    : 'bg-white border-teal-500 text-teal-700 shadow-md shadow-teal-50/50'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${isExcluded ? 'bg-slate-400' : 'bg-teal-500 animate-pulse'}`}></div>
                  {CATEGORY_LABELS[cat]}
                  {isExcluded && <span className="text-[8px] opacity-60">(غیرفعال)</span>}
                </button>
              );
            })}
          </div>

          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <button 
              onClick={() => !isIntlExcluded && setShowNations(!showNations)}
              className={`w-full flex items-center justify-between p-5 transition-all ${isIntlExcluded ? 'bg-slate-50 cursor-not-allowed opacity-60' : 'bg-white hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isIntlExcluded ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-600'}`}>
                  <Globe size={20} />
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-black text-slate-800">تفکیک ملل (غذاهای بین‌المللی)</h3>
                  <p className="text-[10px] text-slate-400 font-bold">انتخاب بر اساس مناطق جغرافیایی</p>
                </div>
              </div>
              {isIntlExcluded ? <Lock size={18} className="text-slate-400" /> : (showNations ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
            </button>

            {showNations && !isIntlExcluded && (
              <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4 animate-enter">
                <div className="flex gap-2 mb-2">
                  <button onClick={() => setAllNations(false)} className="flex-1 py-2 bg-teal-600 text-white text-[10px] font-black rounded-xl shadow-sm active:scale-95 transition-all">فعالسازی همه</button>
                  <button onClick={() => setAllNations(true)} className="flex-1 py-2 bg-rose-600 text-white text-[10px] font-black rounded-xl shadow-sm active:scale-95 transition-all">غیرفعالسازی همه</button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {REGIONS.map(reg => {
                    const isExcluded = reg.countries.every(c => user.excludedNationalities?.includes(c));
                    return (
                      <button
                        key={reg.id}
                        onClick={() => updateNationalityGroup(reg.countries)}
                        className={`px-4 py-3 rounded-xl text-[11px] font-black transition-all border-2 flex items-center justify-between active:scale-95 ${
                          isExcluded 
                          ? 'bg-white border-slate-200 text-slate-400' 
                          : 'bg-white border-indigo-500 text-indigo-700 shadow-sm'
                        }`}
                      >
                        <span>{reg.label}</span>
                        {isExcluded ? <X size={16} className="text-rose-400"/> : <Check size={16} className="text-teal-500"/>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* بخش غذاهای مورد علاقه */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={24} fill="currentColor" /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">غذاهای مورد علاقه</h2>
            <p className="text-slate-400 text-[10px] font-bold">لیست طعم‌هایی که همیشه دوست دارید.</p>
          </div>
        </div>
        
        {favoritesList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {favoritesList.map(dish => (
              <div key={dish.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group animate-enter">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <DishVisual category={dish.category} dishId={dish.id} imageUrl={dish.imageUrl} iconSize={20} className="w-full h-full" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-black text-slate-800 truncate">{dish.name}</h4>
                  <p className="text-[9px] text-slate-400 font-bold">{CATEGORY_LABELS[dish.category]}</p>
                </div>
                <button 
                  onClick={() => handleRemoveFavorite(dish.id)}
                  className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl transition-all"
                  title="حذف از علاقه‌مندی"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
             <Heart size={32} className="mx-auto mb-2 text-slate-200" />
             <p className="text-xs text-slate-400 font-bold">هنوز غذایی را به لیست علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
          </div>
        )}
      </div>

      {/* بخش غذاهای لیست سیاه */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg"><ThumbsDown size={24} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">غذاهایی که دوست ندارم</h2>
            <p className="text-slate-400 text-[10px] font-bold">این غذاها دیگر در برنامه‌ریزی به شما پیشنهاد نمی‌شوند.</p>
          </div>
        </div>
        
        {blacklistedList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {blacklistedList.map(dish => (
              <div key={dish.id} className="flex items-center gap-3 p-3 bg-slate-900 text-white rounded-2xl border border-white/5 group animate-enter">
                <div className="w-14 h-14 rounded-xl overflow-hidden opacity-50 grayscale flex-shrink-0">
                  <DishVisual category={dish.category} dishId={dish.id} imageUrl={dish.imageUrl} iconSize={20} className="w-full h-full" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-black truncate">{dish.name}</h4>
                  <p className="text-[9px] text-slate-500 font-bold">{CATEGORY_LABELS[dish.category]}</p>
                </div>
                <button 
                  onClick={() => handleRemoveBlacklist(dish.id)}
                  className="p-2 text-teal-400 hover:bg-white/10 rounded-xl transition-all"
                  title="بازگرداندن به لیست پخت"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
             <ThumbsDown size={32} className="mx-auto mb-2 text-slate-200" />
             <p className="text-xs text-slate-400 font-bold">لیست سیاه شما خالی است.</p>
          </div>
        )}
      </div>

      {/* بخش مواد ممنوعه و حساسیت‌زا */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden ring-1 ring-red-50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-100">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800">مواد ممنوعه و حساسیت‌زا</h2>
            <p className="text-slate-400 text-[10px] font-bold">این مواد در هیچ رسپی به شما پیشنهاد نمی‌شوند.</p>
          </div>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={ingInput}
            onChange={(e) => setIngInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDislikedIng()}
            placeholder="مثلاً: بادمجان، سیر، لبنیات..."
            className="flex-grow px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-rose-400 focus:bg-white rounded-2xl outline-none font-black transition-all text-slate-900 shadow-inner"
          />
          <button onClick={addDislikedIng} className="px-6 bg-rose-600 text-white rounded-2xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-100 flex items-center justify-center active:scale-95"><Plus size={24} /></button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(user.dislikedIngredients || []).map(ing => (
            <div key={ing} className="flex items-center gap-3 px-4 py-2.5 bg-white text-rose-700 rounded-xl font-black text-xs border-2 border-rose-100 shadow-sm animate-enter">
              <span>{ing}</span>
              <button onClick={() => removeDislikedIng(ing)} className="p-1 hover:bg-rose-50 rounded-lg text-rose-300 hover:text-rose-600 transition-colors"><X size={14}/></button>
            </div>
          ))}
        </div>
      </div>

      {/* حالت رژیمی */}
      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Leaf size={24} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">حالت رژیمی فعال</h2>
            <p className="text-slate-400 text-[10px] font-bold">فقط غذاهای سبک و زیر ۵۰۰ کالری</p>
          </div>
        </div>
        <button 
          onClick={toggleDietMode} 
          className={`w-full sm:w-40 py-4 rounded-2xl font-black text-sm transition-all shadow-lg active:scale-95 ${
            user.dietMode ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
          }`}
        >
          {user.dietMode ? 'فعال است' : 'غیرفعال'}
        </button>
      </div>
    </div>
  );
};

export default Preferences;
