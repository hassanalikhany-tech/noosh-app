
import { X, ChefHat, Users, Clock, Activity, Flame, PlusCircle, Check, Sun, Snowflake, Scale, ShieldCheck } from 'lucide-react';
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
}

const EXCLUDED_SHOPPING_ITEMS = ['آب', 'آب جوش', 'نمک', 'فلفل', 'زردچوبه', 'روغن'];

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, isOpen, onClose, user }) => {
  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const [addedToCart, setAddedToCart] = useState(false);

  const calories = dish.calories || estimateCalories(dish);
  const time = dish.cookTime || estimateCookTime(dish);
  const difficulty = dish.difficulty || getDifficulty(dish);
  const natureInfo = dish.nature ? { type: dish.nature, label: dish.natureLabel, mosleh: dish.mosleh } : getDishNature(dish);

  useEffect(() => {
    if (isOpen) {
      setAddedToCart(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toPersianDigits = (num: number | string) => {
    if (typeof num === 'number' && num === 0) return '';
    return num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const handleAddAllToCart = async () => {
    if (!user || !dish.ingredients) return;
    const currentList = user.customShoppingList || [];
    const newItems: ShoppingItem[] = dish.ingredients
      .filter(ing => !EXCLUDED_SHOPPING_ITEMS.includes(ing.item))
      .map(ing => ({
        id: Date.now() + Math.random().toString(),
        name: ing.item,
        amount: ing.amount,
        unit: ing.unit,
        checked: false,
        fromRecipe: dish.name
      }));
    await UserService.updateShoppingList(user.username, [...currentList, ...newItems]);
    setAddedToCart(true);
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
          <div className="flex flex-wrap gap-3 mb-8">
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-xs font-black border border-orange-100"><Clock size={16} /> {toPersianDigits(time)} دقیقه</div>
             <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-xs font-black border border-rose-100"><Flame size={16} /> ~{toPersianDigits(calories)} کالری</div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black border border-blue-100"><Activity size={16} /> {difficulty}</div>
          </div>
          <div className={`p-5 rounded-2xl border mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center ${natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-100' : natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
             <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${natureInfo.type === 'hot' ? 'bg-orange-500' : natureInfo.type === 'cold' ? 'bg-blue-500' : 'bg-emerald-500'} text-white shadow-lg`}>{natureInfo.type === 'hot' ? <Sun size={24} /> : natureInfo.type === 'cold' ? <Snowflake size={24} /> : <Scale size={24} />}</div>
                <div><h4 className="font-black text-slate-800 text-sm">طبع این غذا: {natureInfo.label}</h4></div>
             </div>
             <div className="sm:mr-auto flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl border shadow-sm"><ShieldCheck size={18} className="text-teal-600" /><span className="text-xs text-slate-700 font-bold">مصلح: <span className="text-teal-700 font-black">{natureInfo.mosleh}</span></span></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {hasIngredients && (
              <div>
                <div className="flex items-center gap-2 mb-5 text-teal-700"><Users size={22} /><h3 className="text-xl font-black">مواد لازم</h3></div>
                <ul className="space-y-3 bg-slate-50 p-5 rounded-3xl border border-slate-100 mb-6">
                  {dish.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex justify-between items-center border-b border-slate-200 last:border-0 pb-3">
                      <span className="text-slate-800 font-bold text-sm">{ing.item}</span>
                      <span className="text-teal-700 font-black text-xs bg-white px-2 py-1 rounded-lg border border-teal-50">
                        {ing.amount > 0 && <span>{toPersianDigits(ing.amount)} </span>}
                        {ing.unit}
                      </span>
                    </li>
                  ))}
                </ul>
                <button onClick={handleAddAllToCart} disabled={addedToCart} className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200'}`}>{addedToCart ? <><Check size={20} /> به سبد خرید اضافه شد</> : <><PlusCircle size={20} /> افزودن همه به لیست خرید</>}</button>
              </div>
            )}
            {hasRecipe && (
              <div>
                <div className="flex items-center gap-2 mb-5 text-teal-700"><ChefHat size={22} /><h3 className="text-xl font-black">دستور پخت</h3></div>
                <ol className="space-y-6">
                  {dish.recipeSteps.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-teal-600 text-white rounded-xl flex items-center justify-center text-sm font-black shadow-md mt-1">{toPersianDigits(idx + 1)}</span>
                      <p className="text-slate-700 leading-relaxed text-sm font-medium text-justify">{step}</p>
                    </li>
                  ))}
                </ol>
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
