
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
  
  const [localFavorite, setLocalFavorite] = useState(user?.favoriteDishIds?.includes(plan.dish.id));
  const [localBlacklisted, setLocalBlacklisted] = useState(user?.blacklistedDishIds?.includes(plan.dish.id));
  
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
    setLocalFavorite(nextFavorite);
    if (nextFavorite) setLocalBlacklisted(false);
    try {
      const updatedUser = await UserService.toggleFavorite(user.username, plan.dish.id);
      if (onUpdateUser) onUpdateUser(updatedUser);
    } catch (err) {
      setLocalFavorite(!nextFavorite);
    }
  };

  const handleToggleBlacklist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLocked) return;
    const nextBlacklisted = !localBlacklisted;
    setLocalBlacklisted(nextBlacklisted);
    if (nextBlacklisted) setLocalFavorite(false);
    try {
      const updatedUser = await UserService.toggleBlacklist(user.username, plan.dish.id);
      if (onUpdateUser) onUpdateUser(updatedUser);
    } catch (err) {
      setLocalBlacklisted(!nextBlacklisted);
    }
  };

  const handleCardClick = () => {
    if (isLocked) {
      alert("مشترک گرامی، دسترسی به این محتوا نیازمند تایید حساب توسط مدیریت می‌باشد.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className={`group bg-white rounded-[2.5rem] shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] hover:scale-[1.1] hover:z-[60] transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer relative ${localBlacklisted ? 'opacity-75 grayscale-[0.3]' : ''} ${isLocked ? 'grayscale opacity-60' : ''}`}
        onClick={handleCardClick}
      >
        <div className="relative h-60 overflow-hidden">
          <DishVisual category={plan.dish.category} className={`w-full h-full transition-all duration-700 ${isLocked ? '' : 'group-hover:scale-125 group-hover:brightness-110'}`} iconSize={64} imageUrl={plan.dish.imageUrl} dishId={plan.dish.id} />
          
          {isLocked && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20">
               <div className="bg-white/95 p-4 rounded-[1.5rem] shadow-2xl flex flex-col items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Lock size={32} className="text-rose-600" />
                  <span className="text-[10px] font-black text-slate-800">نیاز به تایید مدیر</span>
               </div>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-gray-800 shadow-md z-10 border border-gray-100">{plan.dayName}</div>
          
          {!isLocked && (
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="flex gap-2">
                  <button onClick={handleToggleFavorite} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ring-2 ring-white active:scale-90 ${localFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:text-rose-500'}`}>
                    <Heart size={22} fill={localFavorite ? "currentColor" : "none"} />
                  </button>
                  <button onClick={handleToggleBlacklist} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-xl ring-2 ring-white active:scale-90 ${localBlacklisted ? 'bg-slate-900 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:text-black'}`}>
                    <ThumbsDown size={22} fill={localBlacklisted ? "currentColor" : "none"} />
                  </button>
               </div>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10">
            <div className={`px-3 py-1 rounded-xl text-[10px] font-black shadow-md border ${
              natureInfo.type === 'hot' ? 'bg-orange-500 text-white border-orange-400' : 
              natureInfo.type === 'cold' ? 'bg-blue-500 text-white border-blue-400' : 'bg-emerald-500 text-white border-emerald-400'
            }`}>طبع {natureInfo.label}</div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow text-right bg-gradient-to-b from-white to-slate-50/10">
          <h3 className={`text-2xl font-black transition-colors mb-3 ${isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-teal-600'}`}>{plan.dish.name}</h3>
          
          <div className="flex gap-3 mb-4 text-[10px] text-slate-500 font-black">
             <span className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-xl border border-rose-100"><Flame size={14} /> {toPersianDigits(calories)} کالری</span>
             <span className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-xl border border-orange-100"><Clock size={14} /> {toPersianDigits(time)} دقیقه</span>
          </div>

          <div className="relative flex-grow overflow-hidden">
             <p className={`text-slate-500 text-sm leading-relaxed font-bold transition-all duration-700 ${isLocked ? 'line-clamp-2' : 'line-clamp-2 group-hover:line-clamp-none'}`}>
               {plan.dish.description}
             </p>
          </div>
          
          <button className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] font-black text-sm transition-all ${isLocked ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : 'bg-slate-900 text-white group-hover:bg-teal-600 shadow-xl shadow-slate-200'}`}>
             {isLocked ? <Lock size={18} /> : <Utensils size={18} />} 
             <span>{isLocked ? 'غیرفعال (نیاز به تایید)' : 'مشاهده کامل دستور'}</span> 
             {!isLocked && <ChevronLeft size={18} className="group-hover:-translate-x-2 transition-transform" />}
          </button>
        </div>
      </div>
      <RecipeModal dish={plan.dish} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} user={user} onUpdateUser={onUpdateUser} />
    </>
  );
};

export default MealCard;
