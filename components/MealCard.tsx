
import React, { useState } from 'react';
import { Utensils, ChevronLeft, Flame, Clock, Leaf, Heart, ThumbsDown } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';
import { estimateCalories, estimateCookTime, getDishNature } from '../utils/recipeHelpers';
import { UserService } from '../services/userService';

interface MealCardProps {
  plan: DayPlan;
  user: UserProfile;
}

const MealCard: React.FC<MealCardProps> = ({ plan, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const isFavorite = user?.favoriteDishIds?.includes(plan.dish.id);
  const isBlacklisted = user?.blacklistedDishIds?.includes(plan.dish.id);

  const calories = plan.dish.calories || estimateCalories(plan.dish);
  const time = plan.dish.cookTime || estimateCookTime(plan.dish);
  const natureInfo = plan.dish.nature ? { type: plan.dish.nature, label: plan.dish.natureLabel || '' } : getDishNature(plan.dish);
  
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
        UserService.toggleFavorite(user.username, plan.dish.id);
    }
  };

  const handleToggleBlacklist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
        UserService.toggleBlacklist(user.username, plan.dish.id);
    }
  };

  return (
    <>
      <div 
        className={`group bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full cursor-pointer relative ${isBlacklisted ? 'opacity-75' : ''}`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-52 overflow-hidden">
          <DishVisual category={plan.dish.category} className="w-full h-full transition-transform duration-700 group-hover:scale-105" iconSize={64} imageUrl={plan.dish.imageUrl} dishId={plan.dish.id} />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-black text-gray-800 shadow-sm z-10 border border-gray-100">{plan.dayName}</div>
          
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
             <div className="flex gap-2">
                <button 
                  onClick={handleToggleFavorite} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${
                    isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-rose-500'
                  }`}
                  title="علاقه‌مندی"
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button 
                  onClick={handleToggleBlacklist} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${
                    isBlacklisted ? 'bg-black text-white' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-black'
                  }`}
                  title="دیگر پیشنهاد نده"
                >
                  <ThumbsDown size={20} fill={isBlacklisted ? "currentColor" : "none"} />
                </button>
             </div>
             {user?.dietMode && calories < 500 && (
               <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-[10px] font-black shadow-sm flex items-center gap-1"><Leaf size={10} /> رژیمی</div>
             )}
          </div>

          <div className="absolute top-3 left-3 z-10">
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black shadow-sm border ${
              natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
              natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>طبع {natureInfo.label}</div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow text-right">
          <h3 className="text-xl font-black text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1 mb-2">{plan.dish.name}</h3>
          <div className="flex gap-3 mb-3 text-xs text-slate-500 font-black">
             <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md"><Flame size={12} /> {toPersianDigits(calories)} کالری</span>
             <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-md"><Clock size={12} /> {toPersianDigits(time)} دقیقه</span>
          </div>
          {isBlacklisted && (
            <div className="mb-2 bg-black/5 text-black text-[10px] font-black py-1 px-2 rounded-lg inline-block w-fit">در لیست سیاه شماست</div>
          )}
          <p className="text-slate-500 text-sm line-clamp-2 mb-5 flex-grow leading-relaxed font-bold">{plan.dish.description}</p>
          <button className="w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm transition-all bg-slate-50 text-slate-700 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-100">
             <Utensils size={18} /> <span>مشاهده دستور</span> <ChevronLeft size={16} />
          </button>
        </div>
      </div>
      <RecipeModal dish={plan.dish} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MealCard;
