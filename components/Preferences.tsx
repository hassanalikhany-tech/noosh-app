
import React, { useMemo } from 'react';
import { UserProfile, DishCategory, CATEGORY_LABELS } from '../types';
import { UserService } from '../services/userService';
import { Ban, Trash2, Calendar, LogOut, User, Undo2, Users } from 'lucide-react';
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
    
    const updatedUser = UserService.updatePreferences(user.username, {
      excludedCategories: newExcluded
    });
    onUpdateUser(updatedUser);
  };

  const removeFromBlacklist = (dishId: string) => {
    const updatedUser = UserService.removeFromBlacklist(user.username, dishId);
    onUpdateUser(updatedUser);
  };

  const changeFamilySize = (newSize: number) => {
    if (newSize < 1 || newSize > 20) return;
    const updatedUser = UserService.updatePreferences(user.username, {
      familySize: newSize
    });
    onUpdateUser(updatedUser);
  };

  const blockedDishes = useMemo(() => {
    const allDishes = RecipeService.getAllDishes();
    return allDishes.filter(d => user.blacklistedDishIds.includes(d.id));
  }, [user.blacklistedDishIds]);

  const daysLeft = Math.ceil((user.subscriptionExpiry - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Account Info */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-amber-400"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
               <User size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-800 mb-1">{user.fullName || user.username}</h2>
              <p className="text-gray-400 text-sm">@{user.username}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
             <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold flex items-center gap-2 border border-emerald-100">
                <Calendar size={18} />
                {daysLeft > 0 ? `${daysLeft} روز اعتبار` : 'اشتراک منقضی'}
             </div>
             <button onClick={onLogout} className="px-4 py-2 bg-white text-red-500 border border-red-200 hover:bg-red-50 rounded-xl font-bold flex items-center gap-2 transition-colors">
               <LogOut size={18} />
               خروج
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Family Size Setting */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
               <Users size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">تعداد نفرات خانواده</h2>
              <p className="text-gray-400 text-xs mt-1">مقادیر مواد اولیه بر این اساس محاسبه می‌شوند (پیش‌فرض ۴ نفر)</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
             <button 
               onClick={() => changeFamilySize((user.familySize || 4) - 1)}
               className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:bg-amber-100 hover:text-amber-700 transition-all font-bold text-xl border border-gray-200"
             >
               -
             </button>
             <div className="text-center w-32">
                <span className="text-4xl font-black text-gray-800">{user.familySize || 4}</span>
                <span className="text-sm text-gray-500 block">نفر</span>
             </div>
             <button 
               onClick={() => changeFamilySize((user.familySize || 4) + 1)}
               className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-600 hover:bg-amber-100 hover:text-amber-700 transition-all font-bold text-xl border border-gray-200"
             >
               +
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Excluded Categories */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
               <Ban size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">حذف کلی دسته‌بندی‌ها</h2>
              <p className="text-gray-400 text-xs mt-1">این دسته‌ها هرگز در برنامه نمی‌آیند</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => {
              const isExcluded = user.excludedCategories.includes(cat);
              return (
                <label 
                  key={cat} 
                  className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    isExcluded 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-bold">{CATEGORY_LABELS[cat]}</span>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-red-600"
                    checked={isExcluded}
                    onChange={() => toggleCategory(cat)}
                  />
                </label>
              )
            })}
          </div>
        </div>

        {/* Individual Disliked Foods */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-[500px]">
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            <div className="p-3 bg-gray-100 text-gray-600 rounded-2xl">
               <Trash2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">غذاهایی که دوست ندارم</h2>
              <p className="text-gray-400 text-xs mt-1">مدیریت لیست حذفیات ({blockedDishes.length} مورد)</p>
            </div>
          </div>

          {blockedDishes.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-grow text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
              <p>شما هیچ غذایی را حذف نکرده‌اید.</p>
              <p className="text-xs mt-2">از بخش جستجو می‌توانید غذاها را حذف کنید.</p>
            </div>
          ) : (
            <div className="overflow-y-auto custom-scrollbar flex-grow space-y-3 pr-2">
              {blockedDishes.map(dish => (
                <div key={dish.id} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl group hover:border-teal-200 transition-colors">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <DishVisual category={dish.category} className="w-full h-full" iconSize={20} dishId={dish.id} imageUrl={dish.imageUrl} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-bold text-gray-800 text-sm truncate">{dish.name}</h4>
                    <span className="text-xs text-gray-500">{CATEGORY_LABELS[dish.category]}</span>
                  </div>
                  <button 
                    onClick={() => removeFromBlacklist(dish.id)}
                    className="p-2 bg-white border border-gray-200 text-gray-400 hover:text-emerald-600 hover:border-emerald-300 rounded-lg transition-all"
                    title="برگرداندن به لیست غذاها"
                  >
                    <Undo2 size={18} />
                  </button>
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
