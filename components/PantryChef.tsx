
import React, { useState } from 'react';
import { ChefHat, CheckCircle2, ShoppingCart, UtensilsCrossed, Clock, PlusCircle } from 'lucide-react';
import { PANTRY_ITEMS } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { Dish, UserProfile, ShoppingItem } from '../types';
import { estimateCookTime } from '../utils/recipeHelpers';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface PantryChefProps {
  user: UserProfile;
}

const COMMON_STAPLES = [
  'نمک', 'فلفل', 'زردچوبه', 'روغن', 'آب', 'پیاز', 'رب گوجه', 'آبلیمو', 'آبغوره', 
  'سیب زمینی', 'گوجه فرنگی', 'شکر', 'زعفران', 'نان', 'سیر', 'ادویه', 'دارچین', 'زیره',
  'رب انار', 'کره'
];

const SPECIAL_INGREDIENTS = [
  'کنگر', 'ریواس', 'کرفس', 'بامیه', 'لوبیا سبز', 'بادمجان', 'کدو', 'اسفناج', 
  'هویج', 'چغندر', 'تره فرنگی', 'نخود', 'لوبیا', 'عدس', 'ماش', 'لپه', 
  'گردو', 'انار', 'آلو', 'قیصی', 'زرشک', 'کشمش', 'خرما', 'سبزی', 'شبت', 'گشنیز',
  'پاچه', 'سیرابی', 'جگر', 'ماهی', 'میگو'
];

const normalize = (str: string) => {
  return str
    .replace(/[آأإ]/g, 'ا')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
    .replace(/[\u200C\s]+/g, ' ')
    .trim()
    .toLowerCase();
};

const PantryChef: React.FC<PantryChefProps> = ({ user }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [fullyMatchDishes, setFullyMatchDishes] = useState<{ dish: Dish; available: string[]; missing: string[] }[]>([]);
  const [partialMatchDishes, setPartialMatchDishes] = useState<{ dish: Dish; available: string[]; missing: string[]; hasSpecialMatch: boolean; hasMissingProtein: boolean }[]>([]);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showQuickOnly, setShowQuickOnly] = useState(false);
  
  // Shopping Cart Interaction
  const addToCart = (missingItems: string[], dishName: string) => {
    const newItems: ShoppingItem[] = missingItems.map(item => ({
      id: Date.now() + Math.random().toString(),
      name: item,
      checked: false,
      fromRecipe: dishName
    }));
    const currentList = user.customShoppingList || [];
    const updatedUser = UserService.updateShoppingList(user.username, [...currentList, ...newItems]);
    alert(`${missingItems.length} قلم به لیست خرید اضافه شد.`);
  };

  const toggleItem = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item) 
        : [...prev, item]
    );
    // Reset search when items change
    setHasSearched(false);
  };

  const isIngredientAvailable = (recipeItem: string, userItems: string[]) => {
    const r = normalize(recipeItem);
    return userItems.some(pItem => {
      const p = normalize(pItem);
      if (r === p) return true;
      if (r.includes(p)) return true;
      if (p.includes(r)) {
         if (r.includes('ماهیچه') && !p.includes('ماهیچه') && p.includes('ماهی')) return false;
         if (p.includes('ماهیچه') && !r.includes('ماهیچه') && r.includes('ماهی')) return false;
         return true;
      }
      const rHasMeat = r.includes('گوشت');
      const pHasMeat = p.includes('گوشت');
      const rIsMinced = r.includes('چرخ');
      const pIsMinced = p.includes('چرخ');
      if (rHasMeat && pHasMeat && !rIsMinced && !pIsMinced) return true;
      if (rIsMinced && pIsMinced) return true;
      if (r.includes('مرغ') && !r.includes('تخم') && p.includes('مرغ') && !p.includes('تخم')) return true;
      return false;
    });
  };

  const findRecipes = () => {
    setHasSearched(true);
    if (selectedItems.length === 0) {
      setFullyMatchDishes([]);
      setPartialMatchDishes([]);
      return;
    }

    const PROTEIN_KEYWORDS = ['گوشت', 'مرغ', 'ماهی', 'میگو', 'ماکارونی', 'تن ماهی', 'ماهیچه', 'جگر', 'دل', 'قلوه', 'سوسیس', 'بوقلمون', 'اردک', 'تخم مرغ', 'کله پاچه', 'پاچه', 'زبان', 'مغز'];

    const allDishes = RecipeService.getAllDishes();
    
    // Filter dishes based on Quick Cook if enabled
    const validDishes = allDishes.filter(d => {
       if (!d.ingredients || d.ingredients.length === 0) return false;
       if (user.blacklistedDishIds.includes(d.id)) return false;
       if (user.excludedCategories.includes(d.category)) return false;
       
       if (showQuickOnly) {
         const time = estimateCookTime(d);
         if (time > 45) return false;
       }
       
       return true;
    });

    const results = validDishes.map(dish => {
      const analysis = dish.ingredients.map(ing => {
         const isPresent = isIngredientAvailable(ing.item, selectedItems);
         const normalizedItem = normalize(ing.item);
         const isProtein = PROTEIN_KEYWORDS.some(k => normalizedItem.includes(k));
         const isStaple = COMMON_STAPLES.some(k => normalizedItem.includes(normalize(k)));
         const isSpecial = SPECIAL_INGREDIENTS.some(k => normalizedItem.includes(normalize(k)));
         return { item: ing.item, isPresent, isProtein, isStaple, isSpecial };
      });

      const missingIngredients = analysis.filter(a => !a.isPresent).map(a => a.item);
      const missingProteins = analysis.filter(a => a.isProtein && !a.isPresent);
      const hasSpecialMatch = analysis.some(a => a.isPresent && a.isSpecial);
      const hasProteinMatch = analysis.some(a => a.isPresent && a.isProtein);
      const availableCount = analysis.filter(a => a.isPresent).length;

      return {
        dish,
        available: analysis.filter(a => a.isPresent).map(a => a.item),
        missing: missingIngredients,
        hasMissingProtein: missingProteins.length > 0,
        hasProteinMatch,
        hasSpecialMatch,
        matchPercentage: availableCount / dish.ingredients.length
      };
    });

    const full = results.filter(r => r.missing.length === 0);
    const partial = results.filter(r => {
      if (r.missing.length === 0) return false;
      if (r.hasSpecialMatch) return true;
      if (r.hasProteinMatch) return true;
      return r.matchPercentage >= 0.4;
    }).sort((a, b) => {
      if (a.hasSpecialMatch && !b.hasSpecialMatch) return -1;
      if (!a.hasSpecialMatch && b.hasSpecialMatch) return 1;
      return b.matchPercentage - a.matchPercentage;
    });

    setFullyMatchDishes(full);
    setPartialMatchDishes(partial);
    
    setTimeout(() => {
        document.getElementById('chef-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="pb-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ChefHat size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">آشپز هوشمند</h2>
            <p className="text-sm text-gray-500">
              مواد موجود را انتخاب کنید. سیستم به صورت هوشمند غذا پیشنهاد می‌دهد.
            </p>
          </div>
        </div>

        {/* Quick Cook Filter */}
        <div className="flex justify-end mb-4">
          <label className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all border ${showQuickOnly ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
            <input 
              type="checkbox" 
              checked={showQuickOnly} 
              onChange={e => setShowQuickOnly(e.target.checked)} 
              className="hidden"
            />
            <Clock size={18} />
            <span className="font-bold text-sm">فقط غذاهای سریع (زیر ۴۵ دقیقه)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {PANTRY_ITEMS.map((category) => (
            <div key={category.id} className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-teal-700 mb-3 text-lg border-b border-gray-200 pb-2">
                {category.title}
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pl-2">
                {category.items.map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1.5 rounded-lg transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-gray-300"
                      checked={selectedItems.includes(item)}
                      onChange={() => toggleItem(item)}
                    />
                    <span className={`text-sm ${selectedItems.includes(item) ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={findRecipes}
            disabled={selectedItems.length === 0}
            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <ChefHat size={20} />
            {selectedItems.length === 0 ? 'مواد را انتخاب کنید' : 'پیشنهاد غذا'}
          </button>
        </div>
      </div>

      <div id="chef-results" className="space-y-10">
        
        {fullyMatchDishes.length > 0 && (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-xl font-bold text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              <CheckCircle2 className="fill-emerald-500 text-white" />
              غذاهای آماده پخت ({fullyMatchDishes.length} مورد)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fullyMatchDishes.map(({ dish }) => (
                <div 
                  key={dish.id}
                  onClick={() => setSelectedDish(dish)} 
                  className="group bg-white rounded-xl shadow-sm border-2 border-emerald-100 overflow-hidden cursor-pointer hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col h-full"
                >
                  <div className="relative h-48">
                    <DishVisual category={dish.category} className="w-full h-full" dishId={dish.id} imageUrl={dish.imageUrl} />
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      ۱۰۰٪ مواد موجود
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-lg text-gray-800 mb-3 group-hover:text-emerald-700 transition-colors">{dish.name}</h4>
                    <button className="mt-auto w-full py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      مشاهده دستور پخت
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {partialMatchDishes.length > 0 && (
          <div className="space-y-4">
             <h3 className="flex items-center gap-2 text-xl font-bold text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-100">
              <ShoppingCart className="fill-amber-500 text-white" />
              پیشنهادهای خرید (با کسری مواد)
            </h3>
            <p className="text-sm text-gray-500 px-2">
              بر اساس مواد اصلی (پروتئین یا سبزیجات خاص) که انتخاب کردید:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partialMatchDishes.map(({ dish, missing, hasMissingProtein, hasSpecialMatch }) => (
                <div 
                  key={dish.id}
                  className={`group bg-white rounded-xl shadow-sm border overflow-hidden transition-all flex flex-col h-full ${hasSpecialMatch ? 'border-amber-400 ring-2 ring-amber-100' : 'border-gray-100'}`}
                >
                  <div className="relative h-48 cursor-pointer" onClick={() => setSelectedDish(dish)}>
                    <DishVisual category={dish.category} className="w-full h-full" dishId={dish.id} imageUrl={dish.imageUrl} />
                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm ${hasSpecialMatch ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-800'}`}>
                      {hasSpecialMatch ? 'غذای پیشنهادی' : `نیازمند خرید`}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-lg text-gray-800 mb-3 cursor-pointer" onClick={() => setSelectedDish(dish)}>{dish.name}</h4>
                    <div className="space-y-2 mb-4">
                      <div className={`text-xs p-2 rounded border ${hasMissingProtein ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
                        <span className={`font-bold block mb-1 ${hasMissingProtein ? 'text-red-600' : 'text-gray-600'}`}>🛒 کسری مواد:</span>
                        <span className="text-gray-700 leading-tight font-medium">{missing.join('، ')}</span>
                      </div>
                    </div>
                    <div className="mt-auto flex gap-2">
                        <button onClick={() => setSelectedDish(dish)} className="flex-1 py-2 bg-gray-50 text-gray-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-xs">
                          دستور پخت
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); addToCart(missing, dish.name); }}
                          className="flex-1 py-2 bg-amber-100 text-amber-700 font-bold rounded-lg hover:bg-amber-200 transition-colors text-xs flex items-center justify-center gap-1"
                        >
                          <PlusCircle size={14} />
                          افزودن کسری
                        </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {hasSearched && fullyMatchDishes.length === 0 && partialMatchDishes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="inline-block p-4 bg-gray-50 rounded-full mb-4">
              <UtensilsCrossed size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">پیشنهاد دقیقی یافت نشد</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              با توجه به مواد انتخابی (و فیلتر زمان)، غذای مناسبی پیدا نشد. سعی کنید مواد اصلی بیشتری انتخاب کنید.
            </p>
          </div>
        )}
      </div>

      {selectedDish && (
        <RecipeModal 
          dish={selectedDish} 
          isOpen={!!selectedDish} 
          onClose={() => setSelectedDish(null)} 
        />
      )}
    </div>
  );
};

export default PantryChef;
