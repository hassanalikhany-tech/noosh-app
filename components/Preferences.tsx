
import React, { useMemo } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS, NatureType } from '../types';
import { UserService } from '../services/userService';
// Added missing imports: X, Utensils
import { Ban, Trash2, Calendar, LogOut, User, Undo2, Users, Sun, Snowflake, Scale, Settings2, HeartPulse, Sparkles, CheckCircle2, X, Utensils } from 'lucide-react';
import { RecipeService } from '../services/recipeService';
import DishVisual from './DishVisual';

interface PreferencesProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onLogout: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ user, onUpdateUser, onLogout }) => {
  
  const toggleCategory = (cat: DishCategory) => {
    let newExcluded = [...user.excludedCategories];
    if (newExcluded.includes(cat)) {
      newExcluded = newExcluded.filter(c => c !== cat);
    } else {
      newExcluded.push(cat);
    }
    const updatedUser = UserService.updatePreferences(user.username, { excludedCategories: newExcluded });
    onUpdateUser(updatedUser);
  };

  const toggleNature = (nature: NatureType) => {
    let newNatures = [...(user.preferredNatures || [])];
    if (newNatures.includes(nature)) {
      if (newNatures.length > 1) { // At least one must be selected
        newNatures = newNatures.filter(n => n !== nature);
      }
    } else {
      newNatures.push(nature);
    }
    const updatedUser = UserService.updatePreferences(user.username, { preferredNatures: newNatures });
    onUpdateUser(updatedUser);
  };

  const removeFromBlacklist = (dishId: string) => {
    const updatedUser = UserService.removeFromBlacklist(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const changeFamilySize = (newSize: number) => {
    if (newSize < 1 || newSize > 20) return;
    const updatedUser = UserService.updatePreferences(user.username, { familySize: newSize });
    onUpdateUser(updatedUser);
  };

  const blockedDishes = useMemo(() => {
    const allDishes = RecipeService.getAllDishes();
    return allDishes.filter(d => user.blacklistedDishIds.includes(d.id));
  }, [user.blacklistedDishIds]);

  const daysLeft = Math.ceil((user.subscriptionExpiry - Date.now()) / (1000 * 60 * 60 * 24));

  const NatureBtn = ({ type, label, icon: Icon, colorClass, activeColor }: { type: NatureType, label: string, icon: any, colorClass: string, activeColor: string }) => {
    const isActive = user.preferredNatures?.includes(type);
    return (
      <button 
        onClick={() => toggleNature(type)}
        className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300 ${
          isActive ? `${activeColor} border-current transform scale-105 shadow-md` : 'bg-white border-gray-100 text-gray-400 grayscale'
        }`}
      >
        <Icon size={28} />
        <span className="font-bold text-sm">{label}</span>
        {isActive && <CheckCircle2 size={14} className="absolute top-2 left-2" />}
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-2 sm:px-0">
      
      {/* SECTION: Profile & Subscription */}
      <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 via-purple-500 to-amber-400"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner">
               <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-1">{user.fullName || user.username}</h2>
              <p className="text-gray-400 text-sm font-medium">عضو خانواده بزرگ نوش</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
             <div className="flex-grow md:flex-grow-0 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold flex items-center justify-center gap-2 border border-emerald-100">
                <Calendar size={18} />
                {daysLeft > 0 ? `${daysLeft} روز اعتبار` : 'اشتراک منقضی'}
             </div>
             <button onClick={onLogout} className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
               <LogOut size={18} />
               خروج
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* SECTION: Nature & Temperament */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
               <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">مزاج و طبع غذا</h2>
              <p className="text-gray-400 text-xs mt-1">غذاها بر اساس طبع انتخابی شما پیشنهاد می‌شوند</p>
            </div>
          </div>

          <div className="flex gap-3">
             <NatureBtn type="hot" label="گرمی" icon={Sun} colorClass="text-orange-500" activeColor="bg-orange-50 text-orange-600 border-orange-200" />
             <NatureBtn type="cold" label="سردی" icon={Snowflake} colorClass="text-blue-500" activeColor="bg-blue-50 text-blue-600 border-blue-200" />
             <NatureBtn type="balanced" label="معتدل" icon={Scale} colorClass="text-emerald-500" activeColor="bg-emerald-50 text-emerald-600 border-emerald-200" />
          </div>
          <p className="text-[10px] text-gray-400 mt-4 text-center">پیشنهاد می‌شود برای تعادل بدن، حداقل دو گزینه را فعال نگه دارید.</p>
        </div>

        {/* SECTION: Family Size */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
               <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">ابعاد خانواده</h2>
              <p className="text-gray-400 text-xs mt-1">محاسبه دقیق مقادیر مواد اولیه برای پخت</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100">
             <button onClick={() => changeFamilySize((user.familySize || 4) - 1)} className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-400 hover:text-rose-600 hover:border-rose-200 border border-gray-200 text-2xl font-bold transition-all">-</button>
             <div className="text-center w-24">
                <span className="text-4xl font-black text-gray-800">{user.familySize || 4}</span>
                <span className="text-sm text-gray-400 block font-bold">نفر</span>
             </div>
             <button onClick={() => changeFamilySize((user.familySize || 4) + 1)} className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-400 hover:text-emerald-600 hover:border-emerald-200 border border-gray-200 text-2xl font-bold transition-all">+</button>
          </div>
        </div>

        {/* SECTION: Excluded Categories */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
               <Settings2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">فیلتر دسته‌بندی‌ها</h2>
              <p className="text-gray-400 text-xs mt-1">تیک دسته‌هایی که تمایلی به مصرف آنها ندارید را بردارید</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => {
              const isExcluded = user.excludedCategories.includes(cat);
              return (
                <button 
                  key={cat} 
                  onClick={() => toggleCategory(cat)}
                  className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    isExcluded 
                    ? 'border-gray-100 bg-gray-50 text-gray-400' 
                    : 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm'
                  }`}
                >
                  {isExcluded ? <X size={14} /> : <CheckCircle2 size={14} />}
                  {CATEGORY_LABELS[cat]}
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION: Blacklist */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
               <Trash2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">لیست "دوست ندارم"</h2>
              <p className="text-gray-400 text-xs mt-1">غذاهای خاصی که از پیشنهادات حذف کرده‌اید ({blockedDishes.length} مورد)</p>
            </div>
          </div>
          {blockedDishes.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow text-gray-300 border-2 border-dashed border-gray-100 rounded-[1.5rem]">
              <Utensils size={48} className="opacity-20 mb-2" />
              <p className="font-bold">لیست سیاه شما خالی است</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {blockedDishes.map(dish => (
                <div key={dish.id} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-2xl group hover:border-indigo-200 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                    <DishVisual category={dish.category} className="w-full h-full" iconSize={20} dishId={dish.id} imageUrl={dish.imageUrl} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{dish.name}</h4>
                    <span className="text-[10px] text-gray-500 font-bold bg-white px-2 py-0.5 rounded-full border">{CATEGORY_LABELS[dish.category]}</span>
                  </div>
                  <button onClick={() => removeFromBlacklist(dish.id)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-white rounded-xl transition-all shadow-sm"><Undo2 size={18} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preferences;