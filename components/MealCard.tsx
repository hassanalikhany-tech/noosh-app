
import React, { useState } from 'react';
import { Utensils, ChevronLeft, BookX, Flame, Clock, Leaf, Sun, Snowflake, Scale } from 'lucide-react';
import { DayPlan } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';
import { estimateCalories, estimateCookTime, getDishNature } from '../utils/recipeHelpers';
import { UserService } from '../services/userService';

interface MealCardProps {
  plan: DayPlan;
}

const MealCard: React.FC<MealCardProps> = ({ plan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasRecipe = plan.dish.recipeSteps && plan.dish.recipeSteps.length > 0;
  
  const user = UserService.getCurrentUser();
  const calories = estimateCalories(plan.dish);
  const time = estimateCookTime(plan.dish);
  const nature = getDishNature(plan.dish);
  
  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const NatureIcon = () => {
    if (nature.type === 'hot') return <Sun size={14} className="text-orange-500" />;
    if (nature.type === 'cold') return <Snowflake size={14} className="text-blue-400" />;
    return <Scale size={14} className="text-emerald-500" />;
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer relative"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-52 overflow-hidden">
          <DishVisual 
            category={plan.dish.category} 
            className="w-full h-full transition-transform duration-700 group-hover:scale-105" 
            iconSize={64} 
            imageUrl={plan.dish.imageUrl}
            dishId={plan.dish.id}
          />
          
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent"></div>
          
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm z-10 border border-gray-100">
            {plan.dayName}
          </div>

          <div className="absolute top-3 left-3 flex gap-1 z-10">
            {user?.dietMode && calories < 500 && (
               <div className="bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                 <Leaf size={12} />
                 رژیمی
               </div>
            )}
            <div className={`px-2 py-1 rounded-lg text-[10px] font-black shadow-sm flex items-center gap-1 border ${
              nature.type === 'hot' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
              nature.type === 'cold' ? 'bg-blue-50 border-blue-200 text-blue-700' : 
              'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}>
              <NatureIcon />
              طبع {nature.label}
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors line-clamp-1">
              {plan.dish.name}
            </h3>
          </div>

          {/* Quick Stats Row */}
          <div className="flex gap-3 mb-3 text-xs text-gray-500 font-medium">
             <span className="flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1 rounded-md">
               <Flame size={12} />
               {toPersianDigits(calories)} کالری
             </span>
             <span className="flex items-center gap-1 bg-orange-50 text-orange-600 px-2 py-1 rounded-md">
               <Clock size={12} />
               {toPersianDigits(time)} دقیقه
             </span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-5 flex-grow leading-relaxed">
            {plan.dish.description}
          </p>
          
          <button 
            disabled={!hasRecipe}
            className={`w-full mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
              hasRecipe 
                ? 'bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white shadow-sm' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {hasRecipe ? (
              <>
                <Utensils size={18} />
                <span>مشاهده دستور پخت</span>
                <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <BookX size={18} />
                <span>دستور موجود نیست</span>
              </>
            )}
          </button>
        </div>
      </div>

      <RecipeModal 
        dish={plan.dish} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default MealCard;
