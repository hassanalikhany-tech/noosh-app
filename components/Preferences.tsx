
import React, { useMemo, useState, useEffect } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, VisitorProfile } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Heart, Plus, ThumbsDown, RotateCcw, ShieldCheck, Award, Info, Layers, Minus, FilterX, X, Check, CheckCircle, AlertTriangle, UserX, Search, MessageSquare } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import { PANTRY_ITEMS } from '../data/pantry';
import DishVisual from './DishVisual';
import FeedbackModal from './FeedbackModal';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (update: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  onLogout: () => void;
  onNotify?: (title: string, message: string, icon: any, color: string) => void;
}

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout, onNotify }) => {
  const [ingredientSearch, setIngredientSearch] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const toggleCategory = (cat: DishCategory) => {
    onUpdateUser(prev => {
      const currentExcluded = prev.excludedCategories || [];
      let newExcluded: DishCategory[];
      
      if (currentExcluded.includes(cat)) {
        newExcluded = currentExcluded.filter(c => c !== cat);
      } else {
        newExcluded = [...currentExcluded, cat];
      }
      
      UserService.updateProfile(prev.username, { excludedCategories: newExcluded });
      
      return { ...prev, excludedCategories: newExcluded };
    });
  };

  const toggleNature = (nature: NatureType) => {
    onUpdateUser(prev => {
      const currentNatures = prev.preferredNatures || ['balanced'];
      const isActive = currentNatures.includes(nature);
      let newNatures: NatureType[];

      if (isActive) {
        if (currentNatures.length <= 1) {
          if (onNotify) onNotify('خطای تنظیمات', 'حداقل یک طبع باید فعال بماند.', AlertTriangle, 'rose');
          return prev;
        }
        newNatures = currentNatures.filter(n => n !== nature);
      } else {
        newNatures = [...currentNatures, nature];
      }

      UserService.updateProfile(prev.username, { preferredNatures: newNatures });
      return { ...prev, preferredNatures: newNatures };
    });
  };

  const toggleIngredient = (ing: string) => {
    onUpdateUser(prev => {
      let current = [...(prev.dislikedIngredients || [])];
      if (current.includes(ing)) {
        current = current.filter(i => i !== ing);
      } else {
        current = [...current, ing];
      }
      
      UserService.updateProfile(prev.username, { dislikedIngredients: current });
      return { ...prev, dislikedIngredients: current };
    });
  };

  const toPersian = (num: number | string | undefined | null) => {
    if (num === undefined || num === null) return '۰';
    return num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  };

  const favoritesList = useMemo(() => RecipeService.getRawDishes().filter(d => (user.favoriteDishIds || []).includes(d.id)), [user.favoriteDishIds]);
  const blacklistedList = useMemo(() => RecipeService.getRawDishes().filter(d => (user.blacklistedDishIds || []).includes(d.id)), [user.blacklistedDishIds]);
  
  const commonIngredients = useMemo(() => {
    const all = PANTRY_ITEMS.flatMap(c => c.items);
    if (!ingredientSearch) return all.slice(0, 15);
    return all.filter(i => i.includes(ingredientSearch)).slice(0, 20);
  }, [ingredientSearch]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32 px-4 text-right dir-rtl select-none animate-enter">
      {/* هدر پروفایل */}
      <div className="metallic-navy rounded-[3rem] p-10 shadow-2xl border border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-teal-500 text-white rounded-[2rem] flex items-center justify-center shadow-2xl"><User size={40} /></div>
            <div>
              <h2 className="text-2xl font-black text-white">{user.fullName || "کاربر نوش"}</h2>
              <p className="text-teal-400 text-xs font-bold mt-1 uppercase tracking-widest">{user.role === 'admin' ? 'مدیر ارشد' : 'عضو ویژه نـوش'}</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={() => setIsFeedbackOpen(true)} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black border border-white/20 flex items-center gap-2 transition-all active:scale-95"><MessageSquare size={20} /> ارسال نظر و پیشنهاد</button>
             <button onClick={onLogout} className="px-6 py-3 bg-rose-500 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 transition-all active:scale-95"><LogOut size={20} /> خروج</button>
          </div>
        </div>
      </div>

      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} user={user} />

      {/* بخش طبع غذاها */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
         <div className="flex items-center gap-3"><div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><ShieldCheck size={24}/></div><div><h2 className="text-lg font-black text-slate-800">فیلتر طبع غذاها</h2><p className="text-[10px] text-slate-400 font-bold">انتخاب مزاج برای پیشنهادات دقیق‌تر</p></div></div>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button onClick={() => toggleNature('hot')} className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${(user.preferredNatures || []).includes('hot') ? 'bg-orange-500 border-orange-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-orange-200'}`}>
               <div className="flex items-center gap-3"><Sun size={24} /><span className="font-black text-sm">طبع گرم</span></div>
               {(user.preferredNatures || []).includes('hot') ? <CheckCircle size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-100"></div>}
            </button>
            <button onClick={() => toggleNature('cold')} className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${(user.preferredNatures || []).includes('cold') ? 'bg-blue-600 border-blue-700 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-blue-200'}`}>
               <div className="flex items-center gap-3"><Snowflake size={24} /><span className="font-black text-sm">طبع سرد</span></div>
               {(user.preferredNatures || []).includes('cold') ? <CheckCircle size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-100"></div>}
            </button>
            <button onClick={() => toggleNature('balanced')} className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${(user.preferredNatures || []).includes('balanced') ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200'}`}>
               <div className="flex items-center gap-3"><Scale size={24} /><span className="font-black text-sm">طبع معتدل</span></div>
               {(user.preferredNatures || []).includes('balanced') ? <CheckCircle size={20}/> : <div className="w-5 h-5 rounded-full border-2 border-slate-100"></div>}
            </button>
         </div>
      </div>

      {/* بخش مواد غذایی ممنوعه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3"><div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><UserX size={24}/></div><div><h2 className="text-lg font-black text-slate-800">مواد غذایی ممنوعه (حساسیت)</h2><p className="text-[10px] text-slate-400 font-bold">غذاهای حاوی این مواد هرگز پیشنهاد نمی‌شوند</p></div></div>
        <div className="relative">
          <input type="text" placeholder="جستجو و حذف ماده (سیر، پیاز و...)" value={ingredientSearch} onChange={e => setIngredientSearch(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-rose-400 font-bold text-sm" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        </div>
        <div className="flex flex-wrap gap-2">
          {(user.dislikedIngredients || []).map(ing => (
            <button key={ing} onClick={() => toggleIngredient(ing)} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-md">
              {ing} <X size={14}/>
            </button>
          ))}
        </div>
        <div className="pt-4 border-t border-slate-50">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
            {commonIngredients.filter(i => !(user.dislikedIngredients || []).includes(i)).map(ing => (
              <button key={ing} onClick={() => toggleIngredient(ing)} className="px-3 py-2 bg-slate-50 text-slate-500 rounded-xl text-[11px] font-bold border border-transparent hover:border-rose-200 hover:text-rose-600 transition-all">
                + {ing}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* محبوب‌ها و لیست سیاه */}
      <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-3"><div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={20} fill="currentColor"/></div><h2 className="text-sm font-black text-slate-800">محبوب‌های من ({toPersian(favoritesList.length)})</h2></div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar">
                {favoritesList.map(dish => (
                    <div key={dish.id} className="relative group rounded-xl overflow-hidden h-14 bg-slate-50 border">
                        <DishVisual category={dish.category} className="w-full h-full opacity-40" dishId={dish.id} />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black p-1 text-center text-slate-700">{dish.name}</span>
                        <button onClick={() => UserService.toggleFavorite(user.username, dish.id).then((u) => onUpdateUser(u))} className="absolute top-1 left-1 bg-white p-1 rounded-md text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                    </div>
                ))}
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-3"><div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><ThumbsDown size={20}/></div><h2 className="text-sm font-black text-slate-800">لیست سیاه ({toPersian(blacklistedList.length)})</h2></div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar">
                {blacklistedList.map(dish => (
                    <div key={dish.id} className="relative group rounded-xl overflow-hidden h-14 bg-slate-50 border">
                        <DishVisual category={dish.category} className="w-full h-full opacity-40" dishId={dish.id} />
                        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black p-1 text-center text-slate-700">{dish.name}</span>
                        <button onClick={() => UserService.toggleBlacklist(user.username, dish.id).then((u) => onUpdateUser(u))} className="absolute top-1 left-1 bg-white p-1 rounded-md text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"><RotateCcw size={10}/></button>
                    </div>
                ))}
            </div>
          </div>
      </div>

      {/* فیلتر هوشمند دسته‌ها */}
      <div id="smart-filters-section" className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 scroll-mt-32">
        <div className="flex items-center gap-3 mb-8"><div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><FilterX size={24} /></div><div><h2 className="text-lg font-black text-slate-800">فیلتر هوشمند دسته‌ها</h2><p className="text-[10px] text-slate-400 font-bold">دسته‌های انتخابی از برنامه حذف می‌شوند</p></div></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
              <button 
                key={cat} 
                onClick={() => toggleCategory(cat)} 
                className={`px-4 py-4 rounded-2xl text-[11px] font-black transition-all border-2 flex flex-col items-center gap-2 ${
                  user.excludedCategories?.includes(cat) 
                    ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-60' 
                    : 'bg-white border-teal-500 text-teal-700 shadow-md ring-2 ring-teal-50'
                }`}
              >
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
