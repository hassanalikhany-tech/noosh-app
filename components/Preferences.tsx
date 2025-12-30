
import React, { useMemo, useState, useEffect } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType } from '../types';
import { UserService } from '../services/userService';
import { LogOut, User, Users, Sun, Snowflake, Scale, Settings2, Sparkles, CheckCircle2, X, Leaf, Heart, Trash2, ThumbsDown, RotateCcw, AlertTriangle, Plus, ShieldAlert } from 'lucide-react';
import { RecipeService } from '../services/recipeService';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout }) => {
  const [ingInput, setIngInput] = useState('');
  const [localFamilySize, setLocalFamilySize] = useState(user.familySize || 4);
  
  // همگام‌سازی با تغییرات خارجی پروفایل
  useEffect(() => {
    setLocalFamilySize(user.familySize || 4);
  }, [user.familySize]);

  const toggleCategory = async (cat: DishCategory) => {
    let newExcluded = [...user.excludedCategories];
    if (newExcluded.includes(cat)) {
      newExcluded = newExcluded.filter(c => c !== cat);
    } else {
      newExcluded.push(cat);
    }
    const updatedUser = await UserService.updatePreferences(user.username, { excludedCategories: newExcluded });
    onUpdateUser(updatedUser);
  };

  const toggleDietMode = async () => {
    const updatedUser = await UserService.updatePreferences(user.username, { dietMode: !user.dietMode });
    onUpdateUser(updatedUser);
  };

  const toggleNature = async (nature: NatureType) => {
    let newNatures = [...(user.preferredNatures || [])];
    if (newNatures.includes(nature)) {
      if (newNatures.length > 1) newNatures = newNatures.filter(n => n !== nature);
    } else {
      newNatures.push(nature);
    }
    const updatedUser = await UserService.updatePreferences(user.username, { preferredNatures: newNatures });
    onUpdateUser(updatedUser);
  };

  const addDislikedIng = async () => {
    if (!ingInput.trim()) return;
    const current = user.dislikedIngredients || [];
    if (current.includes(ingInput.trim())) return;
    const updatedUser = await UserService.updatePreferences(user.username, { dislikedIngredients: [...current, ingInput.trim()] });
    onUpdateUser(updatedUser);
    setIngInput('');
  };

  const removeDislikedIng = async (ing: string) => {
    const current = user.dislikedIngredients || [];
    const updatedUser = await UserService.updatePreferences(user.username, { dislikedIngredients: current.filter(i => i !== ing) });
    onUpdateUser(updatedUser);
  };

  const toggleFavorite = async (dishId: string) => {
    const updatedUser = await UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const handleRemoveFromBlacklist = async (dishId: string) => {
    const updatedUser = await UserService.toggleBlacklist(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const changeFamilySize = (newSize: number) => {
    if (newSize < 1 || newSize > 20) return;
    // تغییر آنی برای سرعت بالا
    setLocalFamilySize(newSize);
    // ذخیره در دیتابیس در پس‌زمینه
    UserService.updatePreferences(user.username, { familySize: newSize }).then(updatedUser => {
       onUpdateUser(updatedUser);
    });
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

  const NatureBtn = ({ type, label, icon: Icon, activeColor }: { type: NatureType, label: string, icon: any, activeColor: string }) => {
    const isActive = user.preferredNatures?.includes(type);
    return (
      <button 
        onClick={() => toggleNature(type)}
        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 relative ${
          isActive ? `${activeColor} border-current transform scale-105 shadow-md` : 'bg-white border-slate-100 text-slate-400 grayscale'
        }`}
      >
        <Icon size={28} />
        <span className="font-black text-sm">{label}</span>
        {isActive && <CheckCircle2 size={14} className="absolute top-2 left-2" />}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-2 sm:px-0 text-right dir-rtl">
      
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-purple-500 to-amber-400"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 shadow-inner">
               <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">{user.fullName || user.username}</h2>
              <p className="text-slate-400 text-xs font-black tracking-wider uppercase ltr">Noosh App Member</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
             <div className="flex-grow md:flex-grow-0 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-black flex items-center justify-center gap-2 border border-emerald-100 shadow-sm">
                <span>{daysLeft > 0 ? `${daysLeft} روز اعتبار` : 'اشتراک منقضی'}</span>
             </div>
             <button onClick={onLogout} className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl font-black flex items-center justify-center gap-2 transition-colors shadow-sm">
               <LogOut size={18} />
               خروج
             </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden ring-1 ring-red-50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-200">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">مواد ممنوعه، حساسیت‌زا و ناخواسته</h2>
            <p className="text-slate-500 text-xs mt-1 font-bold leading-relaxed">
              نام موادی که به آن‌ها <span className="text-red-600">حساسیت</span> دارید، در <span className="text-red-600">پرهیز</span> هستید یا <span className="text-red-600">دوست ندارید</span> را یکی‌یکی وارد کنید تا هیچ غذایی شامل این موارد به شما پیشنهاد نشود.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={ingInput}
            onChange={(e) => setIngInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDislikedIng()}
            placeholder="مثلاً: سیر، بادمجان، لبنیات، فلفل..."
            className="flex-grow px-5 py-4 bg-slate-50 border-2 border-slate-100 focus:border-red-400 focus:bg-white rounded-2xl outline-none font-black transition-all text-slate-900 shadow-inner"
          />
          <button 
            onClick={addDislikedIng} 
            className="px-6 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-100 flex items-center justify-center group"
          >
            <Plus size={28} className="group-active:scale-90 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(user.dislikedIngredients || []).length === 0 ? (
            <div className="w-full text-center py-6 text-slate-400 text-sm font-bold bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100">
              لیست ممنوعه‌های شما خالی است.
            </div>
          ) : (
            (user.dislikedIngredients || []).map(ing => (
              <div key={ing} className="flex items-center gap-3 px-4 py-2.5 bg-white text-red-700 rounded-xl font-black text-sm border-2 border-red-100 shadow-sm hover:border-red-300 transition-colors animate-enter">
                <span>{ing}</span>
                <button 
                  onClick={() => removeDislikedIng(ing)} 
                  className="p-1 hover:bg-red-50 rounded-lg transition-colors text-red-300 hover:text-red-600"
                  title="حذف از لیست"
                >
                  <X size={16}/>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 lg:col-span-2">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Leaf size={24} /></div>
                <div>
                  <h2 className="text-xl font-black text-slate-800">حالت رژیمی</h2>
                  <p className="text-slate-400 text-xs mt-1 font-black">فقط غذاهای زیر ۵۰۰ کالری پیشنهاد می‌شوند.</p>
                </div>
              </div>
              <button onClick={toggleDietMode} className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md ${user.dietMode ? 'bg-emerald-600 text-white' : 'bg-slate-50 text-slate-500 border'}`}>
                {user.dietMode ? 'فعال' : 'غیرفعال'}
              </button>
           </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm"><Sparkles size={24} /></div>
            <h2 className="text-xl font-black text-slate-800">طبع دلخواه</h2>
          </div>
          <div className="flex gap-3">
             <NatureBtn type="hot" label="گرمی" icon={Sun} activeColor="bg-orange-50 text-orange-600 border-orange-200" />
             <NatureBtn type="cold" label="سردی" icon={Snowflake} activeColor="bg-blue-50 text-blue-600 border-blue-200" />
             <NatureBtn type="balanced" label="معتدل" icon={Scale} activeColor="bg-emerald-50 text-emerald-600 border-emerald-200" />
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl shadow-sm"><Users size={24} /></div>
            <h2 className="text-xl font-black text-slate-800">تعداد نفرات خانواده</h2>
          </div>
          <div className="flex items-center justify-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
             <button onClick={() => changeFamilySize(localFamilySize - 1)} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm text-slate-400 border border-slate-200 text-2xl font-black hover:bg-slate-100 active:scale-90 transition-transform">-</button>
             <div className="text-center w-24">
                <span className="text-4xl font-black text-slate-800">{localFamilySize}</span>
                <span className="text-sm text-slate-400 block font-black">نفر</span>
             </div>
             <button onClick={() => changeFamilySize(localFamilySize + 1)} className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm text-slate-400 border border-slate-200 text-2xl font-black hover:bg-slate-100 active:scale-90 transition-transform">+</button>
          </div>
          <p className="text-[9px] text-center text-slate-400 mt-4 font-bold">تمام مقادیر مواد اولیه در رسپی‌ها بر اساس این تعداد محاسبه خواهند شد.</p>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
           <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 text-rose-600"><Heart size={20} fill="currentColor" /> غذاهای محبوب من</h3>
                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-1 rounded-lg font-black">{favoritesList.length} مورد</span>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                 {favoritesList.length === 0 ? <div className="text-center py-10 bg-slate-50 rounded-2xl text-xs text-slate-400 font-black">لیست محبوب‌های شما خالی است.</div> : 
                  favoritesList.map(dish => (
                    <div key={dish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 group">
                       <span className="text-sm font-black text-slate-700">{dish.name}</span>
                       <button onClick={() => toggleFavorite(dish.id)} className="text-rose-300 hover:text-rose-600 transition-colors p-1" title="حذف از محبوب‌ها"><Trash2 size={16}/></button>
                    </div>
                  ))}
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
           <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 text-black"><ThumbsDown size={20} fill="currentColor" /> لیست سیاه (بلاک شده)</h3>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-black">{blacklistedList.length} مورد</span>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                 {blacklistedList.length === 0 ? <div className="text-center py-10 bg-slate-50 rounded-2xl text-xs text-slate-400 font-black">لیست سیاه شما خالی است.</div> : 
                  blacklistedList.map(dish => (
                    <div key={dish.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100 group">
                       <span className="text-sm font-black text-slate-700">{dish.name}</span>
                       <button onClick={() => handleRemoveFromBlacklist(dish.id)} className="text-slate-400 hover:text-emerald-600 transition-colors p-1" title="بازگرداندن به پیشنهادات"><RotateCcw size={16}/></button>
                    </div>
                  ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-4 font-bold">* غذاهای این لیست دیگر در پیشنهادات شما ظاهر نخواهند شد.</p>
           </div>
        </div>

        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-sm"><Settings2 size={24} /></div>
            <div>
              <h2 className="text-xl font-black text-slate-800">دسته‌بندی‌های غیرمجاز</h2>
              <p className="text-slate-500 text-xs mt-1 font-bold leading-relaxed">
                با انتخاب هر یک از دسته‌های زیر، غذاهای آن گروه <span className="text-rose-600">هرگز</span> در پیشنهادهای روزانه و برنامه هفتگی شما نمایش داده نخواهند شد.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => {
              const isExcluded = user.excludedCategories.includes(cat);
              return (
                <button 
                  key={cat} onClick={() => toggleCategory(cat)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-2xl border-2 font-black text-xs transition-all ${isExcluded ? 'border-slate-100 bg-slate-50 text-slate-300' : 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'}`}
                >
                  {isExcluded ? <X size={14} /> : <CheckCircle2 size={14} />}
                  {CATEGORY_LABELS[cat]}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
