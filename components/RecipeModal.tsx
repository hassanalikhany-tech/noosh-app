
import { X, ChefHat, Clock, Activity, Flame, PlusCircle, Check, Sun, Snowflake, Scale, ShieldCheck, Utensils, AlertCircle, Users, Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Dish, ShoppingItem, UserProfile } from '../types';
import DishVisual from './DishVisual';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../utils/recipeHelpers';

interface RecipeModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUpdateUser?: (user: UserProfile) => void;
}

const EXCLUDED_SHOPPING_ITEMS = ['آب', 'آب جوش', 'نمک', 'فلفل', 'زردچوبه', 'روغن'];

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, isOpen, onClose, user, onUpdateUser }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [servings, setServings] = useState(user?.familySize || 4);

  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const calories = dish.calories || estimateCalories(dish);
  const time = dish.cookTime || estimateCookTime(dish);
  const difficulty = dish.difficulty || getDifficulty(dish);
  const natureInfo = dish.nature ? { type: dish.nature, label: dish.natureLabel, mosleh: dish.mosleh } : getDishNature(dish);

  useEffect(() => {
    if (isOpen) {
      setAddedToCart(false);
      setServings(user?.familySize || 4);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, user?.familySize]);

  const toPersianDigits = (num: number | string) => {
    if (num === undefined || num === null) return '';
    const val = typeof num === 'number' ? Math.round(num * 10) / 10 : num;
    return val.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const getScaledAmount = (baseAmount: number) => {
    if (!baseAmount) return 0;
    return Math.round((baseAmount / 4) * servings * 10) / 10;
  };

  const handleAddAllToCart = () => {
    if (!user || !dish.ingredients) return;
    setAddedToCart(true);
    const currentList = user.customShoppingList || [];
    const newItems: ShoppingItem[] = dish.ingredients
      .filter(ing => !EXCLUDED_SHOPPING_ITEMS.includes(ing.item))
      .map(ing => ({
        id: `ing-${Date.now()}-${Math.random()}`,
        name: ing.item,
        amount: getScaledAmount(ing.amount),
        unit: ing.unit,
        checked: false,
        fromRecipe: `${dish.name} (${toPersianDigits(servings)} نفر)`
      }));
    const updatedFullList = [...currentList, ...newItems];
    if (onUpdateUser) onUpdateUser({ ...user, customShoppingList: updatedFullList });
    UserService.updateShoppingList(user.username, updatedFullList);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm overflow-hidden" onClick={onClose}>
      <div className="relative w-full max-w-3xl h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] flex flex-col animate-enter shadow-2xl" onClick={e => e.stopPropagation()}>
        
        {/* Fixed Header in Mobile */}
        <div className="sticky top-0 z-50 sm:relative">
          <div className="relative h-48 sm:h-72">
            <DishVisual category={dish.category} className="w-full h-full" iconSize={80} imageUrl={dish.imageUrl} dishId={dish.id} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
              <h2 className="text-white text-2xl sm:text-3xl font-black p-6 sm:p-8 drop-shadow-lg">{dish.name}</h2>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }} 
              className="absolute top-4 right-4 z-[60] p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all shadow-lg active:scale-90"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
             <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black border border-orange-100"><Clock size={14} /> {toPersianDigits(time)} دقیقه</div>
             <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black border border-rose-100"><Flame size={14} /> ~{toPersianDigits(calories)} کالری</div>
             <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black border border-blue-100"><Activity size={14} /> {difficulty}</div>
          </div>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-8">
            <div className={`flex-1 p-4 sm:p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 ${natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-100' : natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-3">
                   <div className={`p-1.5 rounded-lg ${natureInfo.type === 'hot' ? 'bg-orange-500' : natureInfo.type === 'cold' ? 'bg-blue-500' : 'bg-emerald-500'} text-white`}>{natureInfo.type === 'hot' ? <Sun size={18} /> : natureInfo.type === 'cold' ? <Snowflake size={18} /> : <Scale size={18} />}</div>
                   <h4 className="font-black text-slate-800 text-[11px] sm:text-sm">طبع: {natureInfo.label}</h4>
                </div>
                <div className="bg-white/80 px-2 py-0.5 rounded-lg border text-[9px] font-bold text-slate-600">مصلح: {natureInfo.mosleh}</div>
            </div>

            <div className="flex-1 p-4 sm:p-5 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2">
                <span className="text-[10px] font-black text-slate-400">تعداد نفرات</span>
                <div className="flex items-center gap-4 bg-white px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
                    <button onClick={() => setServings(Math.max(1, servings - 1))} className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all"><Minus size={18} /></button>
                    <span className="text-lg font-black text-slate-800 min-w-[20px] text-center">{toPersianDigits(servings)}</span>
                    <button onClick={() => setServings(Math.min(20, servings + 1))} className="p-1 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all"><Plus size={18} /></button>
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {hasIngredients && (
              <div className="animate-enter">
                <div className="flex items-center gap-2 text-teal-700 font-black text-lg sm:text-xl mb-4">
                  <Utensils size={20} />
                  <h3>مواد لازم ({toPersianDigits(servings)} نفر)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
                  {dish.ingredients.map((ing, idx) => {
                    const scaled = getScaledAmount(ing.amount);
                    return (
                      <div key={idx} className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-700 text-xs sm:text-sm">{ing.item}</span>
                        <span className="font-black text-teal-600 text-[10px] sm:text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-100">
                          {scaled > 0 ? `${toPersianDigits(scaled)} ${ing.unit}` : ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {user && (
                  <button onClick={handleAddAllToCart} className={`w-full mt-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                    {addedToCart ? <Check size={20} /> : <PlusCircle size={20} />}
                    {addedToCart ? 'در سبد خرید ذخیره شد' : 'افزودن همه به سبد خرید'}
                  </button>
                )}
              </div>
            )}

            {hasRecipe && (
              <div className="animate-enter" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 text-orange-700 font-black text-lg sm:text-xl mb-4">
                   <ChefHat size={20} />
                   <h3>دستور پخت گام‌به‌گام</h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  {dish.recipeSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 sm:gap-4 p-1">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-black text-xs sm:text-sm shadow-sm">
                        {toPersianDigits(idx + 1)}
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm leading-6 sm:leading-7 font-bold pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RecipeModal;
