
import React, { useState, useEffect } from 'react';
import { Utensils, ChevronLeft, Flame, Clock, Leaf, Heart, ThumbsDown, Lock } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';
import { estimateCalories, estimateCookTime, getDishNature } from '../utils/recipeHelpers';
import { UserService } from '../services/userService';
import { RecipeService } from '../services/recipeService';

interface MealCardProps {
  plan: DayPlan;
  user: UserProfile;
  onUpdateUser?: (user: UserProfile) => void;
}

const MealCard: React.FC<MealCardProps> = ({ plan, user, onUpdateUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // استفاده از وضعیت محلی برای پاسخگویی آنی (Optimistic UI)
  const [localFavorite, setLocalFavorite] = useState(user?.favoriteDishIds?.includes(plan.dish.id));
  const [localBlacklisted, setLocalBlacklisted] = useState(user?.blacklistedDishIds?.includes(plan.dish.id));
  
  // همگام‌سازی وضعیت محلی در صورت تغییر پروفایل کاربر از بیرون
  useEffect(() => {
    setLocalFavorite(user?.favoriteDishIds?.includes(plan.dish.id));
    setLocalBlacklisted(user?.blacklistedDishIds?.includes(plan.dish.id));
  }, [user?.favoriteDishIds, user?.blacklistedDishIds, plan.dish.id]);

  const isAccessible = RecipeService.isDishAccessible(plan.dish.id, user);
  const isLocked = !isAccessible;

  const calories = plan.dish.calories || estimateCalories(plan.dish);
  const time = plan.dish.cookTime || estimateCookTime(plan.dish);
  const natureInfo = plan.dish.nature ? { type: plan.dish.nature, label: plan.dish.natureLabel || '' } : getDishNature(plan.dish);
  
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) return;
    
    const nextFavorite = !localFavorite;
    
    // ۱. به‌روزرسانی آنی در ظاهر
    setLocalFavorite(nextFavorite);
    if (nextFavorite) setLocalBlacklisted(false); // انحصار متقابل
    
    // ۲. ارسال به سرور و اطلاع‌رسانی به والد
    try {
      const updatedUser = await UserService.toggleFavorite(user.username, plan.dish.id);
      if (onUpdateUser) onUpdateUser(updatedUser);
    } catch (err) {
      // بازگشت به حالت قبل در صورت خطا
      setLocalFavorite(!nextFavorite);
    }
  };

  const handleToggleBlacklist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) return;
    
    const nextBlacklisted = !localBlacklisted;

    // ۱. به‌روزرسانی آنی در ظاهر
    setLocalBlacklisted(nextBlacklisted);
    if (nextBlacklisted) setLocalFavorite(false); // انحصار متقابل
    
    // ۲. ارسال به سرور و اطلاع‌رسانی به والد
    try {
      const updatedUser = await UserService.toggleBlacklist(user.username, plan.dish.id);
      if (onUpdateUser) onUpdateUser(updatedUser);
    } catch (err) {
      // بازگشت به حالت قبل در صورت خطا
      setLocalBlacklisted(!nextBlacklisted);
    }
  };

  const handleCardClick = () => {
    if (isLocked) {
      alert("با پرداخت حق اشتراک و تایید نهایی حساب توسط مدیریت، می‌توانید از تمام امکانات و دستور پخت‌های این اپلیکیشن استفاده کامل را بنمایید.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className={`group bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:scale-[1.03] hover:z-20 transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer relative ${localBlacklisted ? 'opacity-75 grayscale-[0.3]' : ''} ${isLocked ? 'grayscale opacity-60' : ''}`}
        onClick={handleCardClick}
      >
        <div className="relative h-52 overflow-hidden">
          <DishVisual category={plan.dish.category} className={`w-full h-full transition-all duration-700 ${isLocked ? '' : 'group-hover:scale-110 group-hover:brightness-110'}`} iconSize={64} imageUrl={plan.dish.imageUrl} dishId={plan.dish.id} />
          
          {isLocked && (
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-20">
               <div className="bg-white/90 p-3 rounded-2xl shadow-2xl flex flex-col items-center gap-1">
                  <Lock size={24} className="text-slate-800" />
                  <span className="text-[10px] font-black text-slate-800">نیاز به تایید مدیر</span>
               </div>
            </div>
          )}

          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-black text-gray-800 shadow-sm z-10 border border-gray-100">{plan.dayName}</div>
          
          {!isLocked && (
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
               <div className="flex gap-2">
                  <button 
                    onClick={handleToggleFavorite} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 active:scale-90 ${
                      localFavorite ? 'bg-rose-500 text-white shadow-rose-200 scale-110' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-rose-500'
                    }`}
                    title="علاقه‌مندی"
                  >
                    <Heart size={20} fill={localFavorite ? "currentColor" : "none"} className={localFavorite ? "animate-pulse" : ""} />
                  </button>
                  <button 
                    onClick={handleToggleBlacklist} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 active:scale-90 ${
                      localBlacklisted ? 'bg-slate-900 text-white scale-110' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-black'
                    }`}
                    title="دیگر پیشنهاد نده"
                  >
                    <ThumbsDown size={20} fill={localBlacklisted ? "currentColor" : "none"} className={localBlacklisted ? "animate-pulse" : ""} />
                  </button>
               </div>
               {user?.dietMode && calories < 500 && (
                 <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-sm flex items-center gap-1"><Leaf size={10} /> رژیمی</div>
               )}
            </div>
          )}

          <div className="absolute top-3 left-3 z-10">
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black shadow-sm border ${
              natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
              natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>طبع {natureInfo.label}</div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow text-right bg-gradient-to-b from-white to-slate-50/20">
          <h3 className={`text-xl font-black transition-colors line-clamp-1 mb-2 ${isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-teal-600'}`}>{plan.dish.name}</h3>
          <div className="flex gap-3 mb-3 text-xs text-slate-500 font-black">
             <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md"><Flame size={12} /> {toPersianDigits(calories)} کالری</span>
             <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-md"><Clock size={12} /> {toPersianDigits(time)} دقیقه</span>
          </div>
          {localBlacklisted && (
            <div className="mb-2 bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded-lg inline-block w-fit">در لیست سیاه شماست</div>
          )}
          <p className={`text-slate-500 text-sm mb-4 flex-grow leading-relaxed font-bold transition-all duration-500 ${isLocked ? '' : 'line-clamp-2 group-hover:line-clamp-none'}`}>
            {plan.dish.description}
          </p>
          
          <button className={`w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all ${isLocked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50 text-slate-700 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-lg'}`}>
             {isLocked ? <Lock size={16} /> : <Utensils size={18} />} <span>{isLocked ? 'غیرفعال (تایید نشده)' : 'مشاهده دستور'}</span> {!isLocked && <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
      <RecipeModal dish={plan.dish} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUpdateUser={onUpdateUser} />
    </>
  );
};

export default MealCard;
