
import { X, ChefHat, Users, Clock, Activity, Flame, PlusCircle, Check, Sun, Snowflake, Scale, ShieldCheck, Minus, Plus, Utensils, AlertCircle } from 'lucide-react';
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
  const [addedToCart, setAddedToCart] = useState(false);
  // مقدار اولیه تعداد نفرات از پروفایل کاربر خوانده می‌شود
  const [servingSize, setServingSize] = useState(user?.familySize || 4);

  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const calories = dish.calories || estimateCalories(dish);
  const time = dish.cookTime || estimateCookTime(dish);
  const difficulty = dish.difficulty || getDifficulty(dish);
  const natureInfo = dish.nature ? { type: dish.nature, label: dish.natureLabel, mosleh: dish.mosleh } : getDishNature(dish);

  // نسبت محاسبه: بر اساس پایه ۴ نفره که اکثر رسپی‌ها بر آن اساس هستند
  const scaleRatio = servingSize / 4;

  useEffect(() => {
    if (isOpen) {
      setAddedToCart(false);
      // هر بار که مدال باز می‌شود، تعداد نفرات را با آخرین مقدار پروفایل هماهنگ کن
      setServingSize(user?.familySize || 4);
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
    
    // رند کردن برای نمایش تمیزتر (حداکثر ۱ رقم اعشار)
    const val = typeof num === 'number' ? Math.round(num * 10) / 10 : num;
    return val.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const handleAddAllToCart = async () => {
    if (!user || !dish.ingredients) return;
    const currentList = user.customShoppingList || [];
    const newItems: ShoppingItem[] = dish.ingredients
      .filter(ing => !EXCLUDED_SHOPPING_ITEMS.includes(ing.item))
      .map(ing => ({
        id: Date.now() + Math.random().toString(),
        name: ing.item,
        // مقدار را با ضریب نفرات انتخاب شده در همین لحظه به سبد خرید بفرست
        amount: ing.amount > 0 ? ing.amount * scaleRatio : 0,
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
          <div className="flex flex-wrap gap-3 mb-6">
             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-xl text-xs font-black border border-orange-100"><Clock size={16} /> {toPersianDigits(time)} دقیقه</div>
             <div className="flex items-center gap-2 bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-xs font-black border border-rose-100"><Flame size={16} /> ~{toPersianDigits(calories)} کالری</div>
             <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black border border-blue-100"><Activity size={16} /> {difficulty}</div>
          </div>

          {/* نوار تنظیم نفرات اختصاصی این رسپی */}
          <div className="mb-8 p-5 bg-slate-900 text-white rounded-[2rem] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-teal-500 text-slate-950 rounded-2xl shadow-lg shadow-teal-500/20">
                   <Users size={24} />
                </div>
                <div>
                   <p className="text-xs font-black text-teal-400 mb-1">تعداد نفرات این دستور پخت:</p>
                   <p className="text-[10px] text-slate-400 font-bold">تغییر این عدد، مقادیر مواد لازم زیر را بازحسابی می‌کند.</p>
                </div>
             </div>
             <div className="flex items-center gap-5 bg-white/5 p-2 px-4 rounded-2xl border border-white/10 relative z-10">
                <button 
                  onClick={() => setServingSize(Math.max(1, servingSize - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl text-white hover:bg-rose-500 hover:text-white transition-all active:scale-90"
                >
                  <Minus size={20} />
                </button>
                <div className="flex flex-col items-center min-w-[40px]">
                   <span className="text-2xl font-black text-white leading-none">{toPersianDigits(servingSize)}</span>
                   <span className="text-[9px] font-black text-slate-500">نفر</span>
                </div>
                <button 
                  onClick={() => setServingSize(Math.min(25, servingSize + 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl text-white hover:bg-teal-500 hover:text-slate-950 transition-all active:scale-90"
                >
                  <Plus size={20} />
                </button>
             </div>
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
              <div className="animate-enter">
                <div className="flex items-center justify-between mb-5">
                   <div className="flex items-center gap-2 text-teal-700 font-black text-xl">
                      <Utensils size={22} />
                      <h3>مواد لازم</h3>
                   </div>
                   <span className="text-[10px] bg-teal-50 text-teal-700 px-3 py-1 rounded-full font-black">
                      {toPersianDigits(dish.ingredients.length)} قلم
                   </span>
                </div>
                <div className="space-y-3">
                  {dish.ingredients.map((ing, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-teal-200 transition-all">
                      <span className="font-bold text-slate-700 text-sm">{ing.item}</span>
                      <span className="font-black text-teal-600 text-xs bg-white px-2 py-1 rounded-lg shadow-sm border border-slate-50">
                        {/* محاسبه آنی مقدار بر اساس تعداد نفرات فعلی مدال */}
                        {ing.amount > 0 ? `${toPersianDigits(ing.amount * scaleRatio)} ${ing.unit}` : ing.unit}
                      </span>
                    </div>
                  ))}
                </div>
                
                {user && (
                  <button 
                    onClick={handleAddAllToCart}
                    className={`w-full mt-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${addedToCart ? 'bg-emerald-500 text-white' : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-100'}`}
                  >
                    {addedToCart ? <Check size={20} /> : <PlusCircle size={20} />}
                    {addedToCart ? 'به سبد خرید اضافه شد' : 'افزودن همه به سبد خرید'}
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
