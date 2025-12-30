
import React, { useMemo, useState } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType } from '../types';
import { UserService } from '../services/userService';
// Add AlertCircle to the imports from lucide-react
import { LogOut, User, Sun, Snowflake, Scale, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, Plus, ShieldAlert, Globe, FilterX, Check, Lock, ChevronDown, ChevronUp, Layers, AlertCircle } from 'lucide-react';
import { RecipeService } from '../services/recipeService';

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

  // بهبود سرعت: تغییر آنی وضعیت در UI (Optimistic Update)
  const toggleCategory = (cat: DishCategory) => {
    let newExcluded = [...(user.excludedCategories || [])];
    const isCurrentlyExcluded = newExcluded.includes(cat);
    
    if (isCurrentlyExcluded) {
      newExcluded = newExcluded.filter(c => c !== cat);
    } else {
      newExcluded.push(cat);
    }

    // آپدیت آنی
    const updatedUser = { ...user, excludedCategories: newExcluded };
    onUpdateUser(updatedUser);
    
    // ذخیره در دیتابیس در پس‌زمینه
    UserService.updatePreferences(user.username, { excludedCategories: newExcluded });
  };

  const toggleNationalityGroup = (countries: string[]) => {
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
    UserService.updatePreferences(user.username, { excludedNationalities: newExNats });
  };

  const setAllNations = (exclude: boolean) => {
    let newExNats: string[] = [];
    if (exclude) {
      const allPossible = REGIONS.flatMap(r => r.countries);
      newExNats = Array.from(new Set(allPossible));
    }
    const updatedUser = { ...user, excludedNationalities: newExNats };
    onUpdateUser(updatedUser);
    UserService.updatePreferences(user.username, { excludedNationalities: newExNats });
  };

  const toggleDietMode = () => {
    const newVal = !user.dietMode;
    onUpdateUser({ ...user, dietMode: newVal });
    UserService.updatePreferences(user.username, { dietMode: newVal });
  };

  const addDislikedIng = () => {
    if (!ingInput.trim()) return;
    const current = user.dislikedIngredients || [];
    if (current.includes(ingInput.trim())) return;
    const newList = [...current, ingInput.trim()];
    onUpdateUser({ ...user, dislikedIngredients: newList });
    setIngInput('');
    UserService.updatePreferences(user.username, { dislikedIngredients: newList });
  };

  const removeDislikedIng = (ing: string) => {
    const newList = (user.dislikedIngredients || []).filter(i => i !== ing);
    onUpdateUser({ ...user, dislikedIngredients: newList });
    UserService.updatePreferences(user.username, { dislikedIngredients: newList });
  };

  const favoritesList = useMemo(() => {
    const all = RecipeService.getAllDishes();
    return all.filter(d => (user.favoriteDishIds || []).includes(d.id));
  }, [user.favoriteDishIds]);

  const blacklistedList = useMemo(() => {
    const all = RecipeService.getAllDishes();
    return all.filter(d => (user.blacklistedDishIds || []).includes(d.id));
  }, [user.blacklistedDishIds]);

  const daysLeft = Math.ceil((user.subscriptionExpiry - Date.now()) / (1000 * 60 * 60 * 24));
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const isIntlExcluded = user.excludedCategories?.includes('international');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 px-2 sm:px-0 text-right dir-rtl select-none">
      
      {/* هدر پروفایل */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-500 via-indigo-500 to-rose-400"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100 shadow-inner">
               <User size={28} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800">{user.fullName || user.username}</h2>
              <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">Member ID: {user.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-black border border-emerald-100">
                {toPersianDigits(Math.max(0, daysLeft))} روز اعتبار
             </div>
             <button onClick={onLogout} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors border border-rose-100">
               <LogOut size={20} />
             </button>
          </div>
        </div>
      </div>

      {/* بخش محدودیت‌های اصلی */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm"><FilterX size={24} /></div>
          <div>
            <h2 className="text-lg font-black text-slate-800">شخصی‌سازی لیست پخت</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Cooklist Restrictions</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* دسته‌بندی‌های کلی */}
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

          {/* تفکیک ملل (مشابه صفحه جستجو) */}
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
                        onClick={() => toggleNationalityGroup(reg.countries)}
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

            {isIntlExcluded && (
              <div className="px-5 py-3 bg-slate-100 text-[10px] font-bold text-slate-500 flex items-center gap-2">
                <AlertCircle size={14} />
                <span>دسته «بین‌المللی» در بالا غیرفعال است؛ لذا تمام زیرمجموعه‌ها نیز غیرفعال شدند.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* بقیه بخش‌ها (رژیمی، مواد ممنوعه و ...) */}
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

      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden ring-1 ring-red-50">
        <div className="flex items-center gap-4 mb-6">
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
    </div>
  );
};

export default Preferences;
