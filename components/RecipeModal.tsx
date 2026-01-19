
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, user?.familySize]);

  const toPersianDigits = (num: number | string) => {
    if (num === undefined || num === null) return '';
    if (typeof num === 'number' && num === 0) return '';
    const val = typeof num === 'number' ? Math.round(num * 10) / 10 : num;
    return val.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  // محاسبه مقدار scaled شده برای هر آیتم
  const getScaledAmount = (baseAmount: number) => {
    if (!baseAmount) return 0;
    const scaled = (baseAmount / 4) * servings;
    return Math.round(scaled * 10) / 10; // تا یک رقم اعشار
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

    if (onUpdateUser) {
      onUpdateUser({ ...user, customShoppingList: updatedFullList });
    }

    UserService.updateShoppingList(user.username, updatedFullList);
    
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2.5rem] flex flex-col animate-enter shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="relative h-48 sm:h-72">
          <DishVisual category={dish.category} className="w-full h-full" iconSize={80} imageUrl={dish.imageUrl} dishId={dish.id} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
            <h2 className="text-white text-3xl font-black p-8 drop-shadow-md">{dish.name}</h2>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white z-50 transition-all"><X size={24} /></button>
        </div>
        
        <div className="p-8 bg-white">
          <div className="flex flex-wrap gap-3 mb-6">
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-xs font-black border border-orange-100"><Clock size={16} /> {toPersianDigits(time)} دقیقه</div>
             <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-xs font-black border border-rose-100"><Flame size={16} /> ~{toPersianDigits(calories)} کالری</div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black border border-blue-100"><Activity size={16} /> {difficulty}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className={`flex-1 p-5 rounded-2xl border flex flex-col items-center justify-center gap-3 ${natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-100' : natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-xl ${natureInfo.type === 'hot' ? 'bg-orange-500' : natureInfo.type === 'cold' ? 'bg-blue-500' : 'bg-emerald-500'} text-white`}>{natureInfo.type === 'hot' ? <Sun size={20} /> : natureInfo.type === 'cold' ? <Snowflake size={20} /> : <Scale size={20} />}</div>
                   <h4 className="font-black text-slate-800 text-sm">طبع: {natureInfo.label}</h4>
                </div>
                <div className="bg-white/80 px-3 py-1 rounded-lg border text-[10px] font-bold text-slate-700">مصلح: {natureInfo.mosleh}</div>
            </div>

            <div className="flex-1 p-5 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-3">
                <div className="flex items-center gap-2 text-slate-500">
                    <Users size={18} />
                    <span className="text-xs font-black">تنظیم تعداد نفرات</span>
                </div>
                <div className="flex items-center gap-4 bg-white px-2 py-1 rounded-xl shadow-sm border border-slate-100">
                    <button onClick={() => setServings(Math.max(1, servings - 1))} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all active:scale-90"><Minus size={20} /></button>
                    <span className="text-xl font-black text-slate-800 min-w-[20px] text-center">{toPersianDigits(servings)}</span>
                    <button onClick={() => setServings(Math.min(20, servings + 1))} className="p-1.5 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all active:scale-90"><Plus size={20} /></button>
                </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {hasIngredients && (
              <div className="animate-enter">
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-2 text-teal-700 font-black text-xl">
                      <Utensils size={22} />
                      <h3>مواد لازم برای {toPersianDigits(servings)} نفر</h3>
                   </div>
                </div>
                <div className="space-y-3">
                  {dish.ingredients.map((ing, idx) => {
                    const scaled = getScaledAmount(ing.amount);
                    return (
                      <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-teal-200 transition-all">
                        <span className="font-bold text-slate-700 text-sm">{ing.item}</span>
                        <span className="font-black text-teal-600 text-xs bg-white px-2 py-1 rounded-lg shadow-sm border border-slate-50">
                          {scaled > 0 ? `${toPersianDigits(scaled)} ${ing.unit}` : ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {user && (
                  <button 
                    onClick={handleAddAllToCart}
                    className={`w-full mt-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${addedToCart ? 'bg-emerald-500 text-white scale-[0.98]' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-100'}`}
                  >
                    {addedToCart ? <Check size={20} /> : <PlusCircle size={20} />}
                    {addedToCart ? 'به سبد خرید اضافه شد' : 'افزودن همه به سبد'}
                  </button>
                )}
              </div>
            )}

            {hasRecipe && (
              <div className="animate-enter" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 text-orange-700 font-black text-xl mb-5">
                   <ChefHat size={22} />
                   <h3>دستور پخت</h3>
                </div>
                <div className="space-y-6">
                  {dish.recipeSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-black text-sm group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                        {toPersianDigits(idx + 1)}
                      </div>
                      <p className="text-slate-600 text-sm leading-7 font-bold pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!hasRecipe && !hasIngredients && (
            <div className="py-20 text-center flex flex-col items-center gap-4 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
               <AlertCircle size={48} className="text-slate-300" />
               <p className="text-slate-400 font-black">اطلاعات این دستور پخت هنوز کامل نشده است.</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RecipeModal;
