
import React, { useMemo, useState } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType, Dish } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Sun, Snowflake, Scale, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, Plus, ShieldAlert, Globe, FilterX, Check, Lock, ChevronDown, ChevronUp, Layers, AlertCircle, Utensils, Users, Minus, ScanFace, Fingerprint, Activity } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import DishVisual from './DishVisual';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

// لیست کشورها جهت شخصی‌سازی در تنظیمات
const COUNTRY_EXCLUSIONS = [
  // آسیا
  { id: 'tr', label: 'ترکیه', matches: ['ترکیه', 'Turkey'] },
  { id: 'lb', label: 'لبنان', matches: ['لبنان', 'Lebanon'] },
  { id: 'af', label: 'افغانستان', matches: ['افغانستان', 'Afghanistan'] },
  { id: 'in', label: 'هند', matches: ['هند', 'India'] },
  { id: 'pk', label: 'پاکستان', matches: ['پاکستان', 'Pakistan'] },
  { id: 'id', label: 'اندونزی', matches: ['اندونزی', 'Indonesia'] },
  { id: 'cn', label: 'چین', matches: ['چین', 'China'] },
  { id: 'jp', label: 'ژاپن', matches: ['ژاپن', 'Japan'] },
  
  // اروپا
  { id: 'it', label: 'ایتالیا', matches: ['ایتالیا', 'Italy'] },
  { id: 'fr', label: 'فرانسه', matches: ['فرانسه', 'France'] },
  { id: 'uk', label: 'انگلستان', matches: ['انگلستان', 'UK', 'England'] },
  { id: 'ru', label: 'روسیه', matches: ['روسیه', 'Russia'] },
  
  // آمریکا
  { id: 'mx', label: 'مکزیک', matches: ['مکزیک', 'Mexico'] },
  { id: 'us', label: 'ایالات متحده', matches: ['آمریکا', 'USA', 'United States'] },
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

  const toggleNature = (nature: NatureType) => {
    let newNatures = [...(user.preferredNatures || [])];
    if (newNatures.includes(nature)) {
      if (newNatures.length > 1) {
        newNatures = newNatures.filter(n => n !== nature);
      }
    } else {
      newNatures.push(nature);
    }

    const updatedUser = { ...user, preferredNatures: newNatures };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { preferredNatures: newNatures });
  };

  const updateFamilySize = (size: number) => {
    if (size < 1 || size > 20) return;
    const updatedUser = { ...user, familySize: size };
    onUpdateUser(updatedUser);
    UserService.updateProfile(user.username, { familySize: size });
  };

  const updateNationalityGroup = (countries: string[]) => {
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
      const allPossible = COUNTRY_EXCLUSIONS.flatMap(r => r.matches);
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

  const handleRemoveFavorite = async (dishId: string) => {
    const updatedUser = await UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const daysLeft = Math.ceil((user.subscriptionExpiry - Date.now()) / (1000 * 60 * 60 * 24));
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 px-2 sm:px-0 text-right dir-rtl select-none">
      {/* پروفایل هدر */}
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
             <button onClick={onLogout} className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl hover:bg-rose-500/40 transition-all border border-rose-500/30 backdrop-blur-md active:scale-90 shadow-lg">
               <LogOut size={24} />
             </button>
          </div>
        </div>
      </div>

      {/* تعداد نفرات خانواده */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl shadow-inner"><Users size={32} /></div>
          <div><h2 className="text-xl font-black text-slate-800">تعداد نفرات خانواده</h2><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Recipe Scaling Basis</p></div>
        </div>
        <div className="flex items-center gap-6 bg-slate-50 p-3 rounded-3xl border border-slate-100 relative z-10">
          <button onClick={() => updateFamilySize((user.familySize || 4) - 1)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"><Minus size={24} /></button>
          <div className="flex flex-col items-center min-w-[60px]"><span className="text-3xl font-black text-slate-800">{toPersianDigits(user.familySize || 4)}</span><span className="text-[10px] font-black text-slate-400">نفر</span></div>
          <button onClick={() => updateFamilySize((user.familySize || 4) + 1)} className="w-12 h-12 bg-white text-slate-600 rounded-2xl flex items-center justify-center shadow-sm hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-90"><Plus size={24} /></button>
        </div>
      </div>

      {/* بخش طبع (مزاج) دلخواه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10 shrink-0">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl shadow-inner"><Activity size={32} /></div>
          <div>
            <h2 className="text-xl font-black text-slate-800">مزاج و طبع غذاها</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Nature Preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
          {[
            { id: 'hot', label: 'طبع گرم', icon: Sun, color: 'orange' },
            { id: 'cold', label: 'طبع سرد', icon: Snowflake, color: 'blue' },
            { id: 'balanced', label: 'طبع معتدل', icon: Scale, color: 'emerald' }
          ].map((nature) => {
            const isActive = user.preferredNatures?.includes(nature.id as NatureType);
            const Icon = nature.icon;
            return (
              <button 
                key={nature.id}
                onClick={() => toggleNature(nature.id as NatureType)}
                className={`
                  flex flex-col items-center justify-center gap-2 p-4 rounded-3xl border-2 transition-all active:scale-95
                  ${isActive 
                    ? `bg-${nature.color}-500 border-${nature.color}-500 text-white shadow-lg` 
                    : `bg-white border-slate-100 text-slate-400 hover:border-${nature.color}-200`
                  }
                `}
              >
                <Icon size={24} strokeWidth={2.5} />
                <span className="text-[11px] font-black">{nature.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* شخصی‌سازی لیست پخت */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm"><FilterX size={24} /></div>
          <div><h2 className="text-lg font-black text-slate-800">شخصی‌سازی لیست پخت</h2><p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Cooklist Restrictions</p></div>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-3 py-4 rounded-2xl text-xs font-black transition-all border-2 flex flex-col items-center justify-center gap-2 active:scale-95 ${user.excludedCategories?.includes(cat) ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-white border-teal-500 text-teal-700 shadow-md shadow-teal-50/50'}`}>
                <div className={`w-2 h-2 rounded-full ${user.excludedCategories?.includes(cat) ? 'bg-slate-400' : 'bg-teal-500 animate-pulse'}`}></div>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          
          <div className="border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
            <button onClick={() => setShowNations(!showNations)} className="w-full flex items-center justify-between p-5 transition-all bg-white hover:bg-slate-50">
              <div className="flex items-center gap-3"><div className="p-2 rounded-xl bg-indigo-50 text-indigo-600"><Globe size={20} /></div><div className="text-right"><h3 className="text-sm font-black text-slate-800">تفکیک ملل و کشورها</h3><p className="text-[10px] text-slate-400 font-bold">انتخاب بر اساس کشورهای مجزا</p></div></div>
              {showNations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showNations && (
              <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4 animate-enter">
                <div className="flex gap-2 mb-2"><button onClick={() => setAllNations(false)} className="flex-1 py-2 bg-teal-600 text-white text-[10px] font-black rounded-xl">فعالسازی همه</button><button onClick={() => setAllNations(true)} className="flex-1 py-2 bg-rose-600 text-white text-[10px] font-black rounded-xl">غیرفعالسازی همه</button></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {COUNTRY_EXCLUSIONS.map(reg => (
                    <button key={reg.id} onClick={() => updateNationalityGroup(reg.matches)} className={`px-4 py-3 rounded-xl text-[10px] font-black transition-all border-2 flex items-center justify-between active:scale-95 ${reg.matches.every(c => user.excludedNationalities?.includes(c)) ? 'bg-white border-slate-200 text-slate-400' : 'bg-white border-indigo-500 text-indigo-700 shadow-sm'}`}>
                      <span>{reg.label}</span>
                      {reg.matches.every(c => user.excludedNationalities?.includes(c)) ? <X size={14} className="text-rose-400"/> : <Check size={14} className="text-teal-500"/>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* غذاهای مورد علاقه */}
      <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><Heart size={24} fill="currentColor" /></div><div><h2 className="text-lg font-black text-slate-800">غذاهای مورد علاقه</h2><p className="text-slate-400 text-[10px] font-bold">لیست طعم‌هایی که همیشه دوست دارید.</p></div></div>
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
                <button onClick={() => handleRemoveFavorite(dish.id)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-xl transition-all">
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

      {/* مواد ممنوعه */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl"><AlertCircle size={24} /></div>
          <div><h2 className="text-lg font-black text-slate-800">مواد غذایی ممنوعه</h2><p className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">Blacklisted Ingredients</p></div>
        </div>
        
        <div className="flex gap-2">
           <input 
            type="text" 
            value={ingInput} 
            onChange={(e) => setIngInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && addDislikedIng()}
            placeholder="مثلاً: بادمجان، کلم..." 
            className="flex-grow px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:border-rose-500" 
           />
           <button onClick={addDislikedIng} className="px-6 bg-slate-900 text-white rounded-2xl font-black text-sm active:scale-95 shadow-lg">افزودن</button>
        </div>

        <div className="flex flex-wrap gap-2">
           {(user.dislikedIngredients || []).map(ing => (
             <div key={ing} className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-black flex items-center gap-2 group">
               {ing}
               <button onClick={() => removeDislikedIng(ing)} className="p-1 hover:bg-rose-200 rounded-lg transition-all"><X size={14}/></button>
             </div>
           ))}
           {(user.dislikedIngredients || []).length === 0 && <p className="text-[10px] text-slate-400 font-bold">لیست مواد ممنوعه شما خالی است.</p>}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
