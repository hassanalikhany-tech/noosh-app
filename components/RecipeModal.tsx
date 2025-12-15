
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChefHat, Users, AlertCircle, Plus, Minus, Clock, Activity, Flame, PlusCircle, Check } from 'lucide-react';
import { Dish, ShoppingItem } from '../types';
import DishVisual from './DishVisual';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDifficulty } from '../utils/recipeHelpers';

interface RecipeModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
}

// اقلامی که نباید به سبد خرید اضافه شوند
const EXCLUDED_SHOPPING_ITEMS = [
  'آب', 'آب جوش', 'آب ولرم', 'آب سرد', 'آب گرم', 'یخ', 
  'آب خنک', 'نمک', 'فلفل', 'فلفل سیاه', 'زردچوبه', 'روغن', 
  'روغن مایع', 'آب لیمو', 'آبلیمو'
];

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, isOpen, onClose }) => {
  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const user = UserService.getCurrentUser();
  const defaultServings = user?.familySize || 4;
  const [servings, setServings] = useState(4);
  const [addedToCart, setAddedToCart] = useState(false);

  // Estimates
  const calories = estimateCalories(dish);
  const time = estimateCookTime(dish);
  const difficulty = getDifficulty(dish);

  useEffect(() => {
    if (isOpen) {
      setServings(defaultServings);
      setAddedToCart(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultServings]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const toEnglishDigits = (str: string) => str.replace(/[۰-۹]/g, d => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
  const toPersianDigits = (num: number | string) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const scaleAmount = (amountStr: string, current: number, base: number = 4): string => {
    if (current === base) return amountStr;
    const factor = current / base;
    const regex = /([0-9۰-۹]+(?:[\.\/][0-9۰-۹]+)?)/g;
    return amountStr.replace(regex, (match) => {
      const englishMatch = toEnglishDigits(match);
      let value: number;
      if (englishMatch.includes('/')) {
        const [num, den] = englishMatch.split('/');
        if (parseFloat(den) === 0) return match;
        value = parseFloat(num) / parseFloat(den);
      } else {
        value = parseFloat(englishMatch);
      }
      if (isNaN(value)) return match;
      const newValue = value * factor;
      let formatted: string;
      if (Number.isInteger(newValue)) {
        formatted = newValue.toString();
      } else {
        const rounded = Math.round(newValue);
        if (Math.abs(newValue - rounded) < 0.1) formatted = rounded.toString();
        else formatted = parseFloat(newValue.toFixed(1)).toString();
      }
      return toPersianDigits(formatted);
    });
  };

  const handleAddAllToCart = () => {
    if (!user || !dish.ingredients) return;
    
    const currentList = user.customShoppingList || [];
    const existingNames = new Set(currentList.map(i => i.name.trim().toLowerCase()));

    const newItems: ShoppingItem[] = [];

    dish.ingredients.forEach(ing => {
      const cleanName = ing.item.trim();
      const normalizedName = cleanName.toLowerCase();

      // ۱. چک کردن لیست سیاه
      const isExcluded = EXCLUDED_SHOPPING_ITEMS.some(ex => normalizedName === ex || normalizedName.startsWith(ex + ' '));
      
      // ۲. چک کردن تکراری نبودن
      const alreadyInBatch = newItems.some(i => i.name.trim().toLowerCase() === normalizedName);

      if (!isExcluded && !existingNames.has(normalizedName) && !alreadyInBatch) {
        newItems.push({
          id: Date.now() + Math.random().toString(),
          name: cleanName,
          amount: '', 
          checked: false,
          fromRecipe: dish.name
        });
      }
    });

    if (newItems.length > 0) {
      UserService.updateShoppingList(user.username, [...currentList, ...newItems]);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      alert('این اقلام قبلاً در سبد خرید موجود هستند یا جزو اقلام عمومی (مثل آب و نمک) می‌باشند.');
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 transition-opacity" onClick={onClose}>
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl flex flex-col no-scrollbar animate-enter"
        onClick={e => e.stopPropagation()}
      >
        
        <div className="relative h-48 sm:h-64 flex-shrink-0">
          <DishVisual 
            category={dish.category} 
            className="w-full h-full" 
            iconSize={80} 
            imageUrl={dish.imageUrl}
            dishId={dish.id} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
            <h2 className="text-white text-3xl font-bold p-6 w-full drop-shadow-md tracking-wide">{dish.name}</h2>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors border border-white/30 z-50">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto bg-white">
          <div className="flex flex-wrap gap-4 mb-6">
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-orange-100">
               <Clock size={16} />
               {toPersianDigits(time)} دقیقه
             </div>
             <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-rose-100">
               <Flame size={16} />
               ~{toPersianDigits(calories)} کالری
             </div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold border border-blue-100">
               <Activity size={16} />
               {difficulty}
             </div>
          </div>

          <p className="text-gray-600 mb-6 text-lg leading-relaxed border-b pb-4">
            {dish.description}
          </p>

          {!hasRecipe && !hasIngredients ? (
            <div className="flex flex-col items-center justify-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
              <AlertCircle size={48} className="mb-2 opacity-50" />
              <p className="text-lg font-medium">دستور پخت این غذا هنوز ثبت نشده است.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {hasIngredients && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-teal-700">
                      <Users size={20} />
                      <h3 className="text-xl font-bold">مواد لازم</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-teal-50 rounded-lg px-2 py-1 border border-teal-100">
                      <button onClick={() => setServings(Math.max(1, servings - 1))} className="p-1 hover:bg-white rounded-md text-teal-600 transition-colors"><Minus size={14} /></button>
                      <span className="text-sm font-bold text-gray-700 w-12 text-center">{toPersianDigits(servings)} نفر</span>
                      <button onClick={() => setServings(Math.min(50, servings + 1))} className="p-1 hover:bg-white rounded-md text-teal-600 transition-colors"><Plus size={14} /></button>
                    </div>
                  </div>
                  <ul className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                    {dish.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex justify-between items-center text-gray-700 border-b border-gray-200 last:border-0 pb-2 last:pb-0">
                        <span className="font-medium">{ing.item}</span>
                        <span className="text-teal-700 font-bold">{scaleAmount(ing.amount, servings)}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={handleAddAllToCart}
                    disabled={addedToCart}
                    className={`w-full py-3 border rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm transform active:scale-95 ${
                      addedToCart 
                      ? 'bg-emerald-500 text-white border-emerald-500' 
                      : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={18} />
                        اضافه شد
                      </>
                    ) : (
                      <>
                        <PlusCircle size={18} />
                        افزودن مواد لازم به سبد
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-gray-400 mt-2 text-center">اقلام تکراری و عمومی (مثل آب و نمک) به صورت خودکار حذف می‌شوند.</p>
                </div>
              )}

              {hasRecipe && (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-teal-700">
                    <ChefHat size={20} />
                    <h3 className="text-xl font-bold">دستور پخت</h3>
                  </div>
                  <ol className="space-y-4">
                    {dish.recipeSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">{toPersianDigits(idx + 1)}</span>
                        <p className="text-gray-700 leading-relaxed text-justify">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="p-4 border-t bg-gray-50 flex justify-end sticky bottom-0">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium">بستن</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RecipeModal;
