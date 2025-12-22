
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChefHat, Users, AlertCircle, Plus, Minus, Clock, Activity, Flame, PlusCircle, Check, Sun, Snowflake, Scale, ShieldCheck } from 'lucide-react';
import { Dish, ShoppingItem } from '../types';
import DishVisual from './DishVisual';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../utils/recipeHelpers';

interface RecipeModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
}

const EXCLUDED_SHOPPING_ITEMS = ['آب', 'آب جوش', 'نمک', 'فلفل', 'زردچوبه', 'روغن'];

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, isOpen, onClose }) => {
  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const user = UserService.getCurrentUser();
  const defaultServings = user?.familySize || 4;
  const [servings, setServings] = useState(4);
  const [addedToCart, setAddedToCart] = useState(false);

  // استفاده از دیتای غنی‌شده دیتابیس یا تخمین
  const calories = dish.calories || estimateCalories(dish);
  const time = dish.cookTime || estimateCookTime(dish);
  const difficulty = dish.difficulty || getDifficulty(dish);
  const natureInfo = dish.nature ? { type: dish.nature, label: dish.natureLabel, mosleh: dish.mosleh } : getDishNature(dish);

  useEffect(() => {
    if (isOpen) {
      setServings(defaultServings);
      setAddedToCart(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, defaultServings]);

  const toPersianDigits = (num: number | string) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleAddAllToCart = () => {
    if (!user || !dish.ingredients) return;
    const currentList = user.customShoppingList || [];
    const newItems: ShoppingItem[] = dish.ingredients
      .filter(ing => !EXCLUDED_SHOPPING_ITEMS.includes(ing.item))
      .map(ing => ({
        id: Date.now() + Math.random().toString(),
        name: ing.item,
        checked: false,
        fromRecipe: dish.name
      }));
    UserService.updateShoppingList(user.username, [...currentList, ...newItems]);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl flex flex-col animate-enter" onClick={e => e.stopPropagation()}>
        <div className="relative h-48 sm:h-64">
          <DishVisual category={dish.category} className="w-full h-full" iconSize={80} imageUrl={dish.imageUrl} dishId={dish.id} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 flex items-end"><h2 className="text-white text-3xl font-bold p-6">{dish.name}</h2></div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white z-50"><X size={24} /></button>
        </div>
        <div className="p-6 bg-white">
          <div className="flex flex-wrap gap-4 mb-6">
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-orange-100"><Clock size={16} /> {toPersianDigits(time)} دقیقه</div>
             <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-rose-100"><Flame size={16} /> ~{toPersianDigits(calories)} کالری</div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100"><Activity size={16} /> {difficulty}</div>
          </div>
          <div className={`p-4 rounded-xl border mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center ${natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-100' : natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${natureInfo.type === 'hot' ? 'bg-orange-500' : natureInfo.type === 'cold' ? 'bg-blue-500' : 'bg-emerald-500'} text-white shadow-sm`}>{natureInfo.type === 'hot' ? <Sun size={20} /> : natureInfo.type === 'cold' ? <Snowflake size={20} /> : <Scale size={20} />}</div>
                <div><h4 className="font-black text-gray-800 text-sm">طبع این غذا: {natureInfo.label}</h4></div>
             </div>
             <div className="sm:mr-auto flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border"><ShieldCheck size={16} className="text-teal-600" /><span className="text-xs text-gray-700 font-bold">مصلح پیشنهادی: <span className="text-teal-700">{natureInfo.mosleh}</span></span></div>
          </div>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed border-b pb-4">{dish.description}</p>
          <div className="grid md:grid-cols-2 gap-8">
            {hasIngredients && (
              <div>
                <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2 text-teal-700"><Users size={20} /><h3 className="text-xl font-bold">مواد لازم</h3></div></div>
                <ul className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                  {dish.ingredients.map((ing, idx) => (<li key={idx} className="flex justify-between border-b border-gray-200 last:border-0 pb-2"><span>{ing.item}</span><span className="text-teal-700 font-bold">{ing.amount}</span></li>))}
                </ul>
                <button onClick={handleAddAllToCart} disabled={addedToCart} className={`w-full py-3 border rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'}`}>{addedToCart ? <><Check size={18} /> اضافه شد</> : <><PlusCircle size={18} /> افزودن به سبد</>}</button>
              </div>
            )}
            {hasRecipe && (
              <div>
                <div className="flex items-center gap-2 mb-4 text-teal-700"><ChefHat size={20} /><h3 className="text-xl font-bold">دستور پخت</h3></div>
                <ol className="space-y-4">{dish.recipeSteps.map((step, idx) => (<li key={idx} className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">{toPersianDigits(idx + 1)}</span><p className="text-gray-700 leading-relaxed text-justify">{step}</p></li>))}</ol>
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
