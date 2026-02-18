
import React, { useState, useMemo, useRef } from 'react';
import { ChefHat, Sparkles, Search, X, Drumstick, Wheat, Carrot, UtensilsCrossed, RefreshCw, Trash2, CheckCircle2, AlertCircle, Clock, Heart, Filter } from 'lucide-react';
import { PANTRY_ITEMS } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { Dish, UserProfile } from '../types';
import RecipeModal from './RecipeModal';
import MealCard from './MealCard';

interface PantryChefProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

type ResultFilter = 'all' | 'perfect' | 'near' | 'quick' | 'favorites';

interface ProcessedResult {
  dish: Dish;
  matchedItems: string[];
  missingItems: string[];
  isPerfect: boolean;
  missingCount: number;
}

const CategoryItemsList: React.FC<{
  items: string[];
  selectedItems: string[];
  dislikedIngredients: string[];
  toggleItem: (item: string) => void;
}> = ({ items, selectedItems, dislikedIngredients, toggleItem }) => {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-y-auto h-full no-scrollbar pb-6">
      {items.map((item) => {
        const isSel = selectedItems.includes(item);
        const isForbidden = dislikedIngredients?.includes(item);
        return (
          <button 
            key={item} 
            onClick={() => toggleItem(item)} 
            className={`flex-grow px-3 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-[13px] font-black transition-all border-2 text-center shadow-sm ${
              isSel ? 'bg-teal-500 border-teal-500 text-white' : 
              isForbidden ? 'bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-50' : 
              'bg-slate-50 border-transparent text-slate-600 hover:border-teal-200'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  );
};

const PantryChef: React.FC<PantryChefProps> = ({ user, onUpdateUser }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [pantrySearchTerm, setPantrySearchTerm] = useState('');
  const [rawResults, setRawResults] = useState<ProcessedResult[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<ResultFilter>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const resultsAreaRef = useRef<HTMLDivElement>(null);

  const toggleItem = (item: string) => {
    if (user?.dislikedIngredients?.includes(item)) return;
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setRawResults(null);
  };

  const findRecipes = () => {
    if (selectedItems.length === 0) return;
    setIsSearching(true);
    setTimeout(() => {
      const all = RecipeService.getAllDishes();
      const processed: ProcessedResult[] = all.map(dish => {
        const matched = dish.ingredients.filter(ing => 
          selectedItems.some(s => ing.item.includes(s) || s.includes(ing.item))
        ).map(i => i.item);
        const missing = dish.ingredients.filter(ing => !matched.includes(ing.item)).map(i => i.item);
        return { dish, matchedItems: matched, missingItems: missing, isPerfect: missing.length === 0, missingCount: missing.length };
      })
      .filter(res => res.matchedItems.length > 0)
      .sort((a, b) => a.missingCount - b.missingCount);
      setRawResults(processed);
      setIsSearching(false);
      
      setTimeout(() => {
        resultsAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 600);
  };

  const filteredResults = useMemo(() => {
    if (!rawResults) return null;
    switch (activeFilter) {
      case 'perfect': return rawResults.filter(r => r.isPerfect);
      case 'near': return rawResults.filter(r => r.missingCount > 0 && r.missingCount <= 2);
      case 'quick': return rawResults.filter(r => (r.dish.cookTime || 60) <= 45);
      case 'favorites': return rawResults.filter(r => user.favoriteDishIds?.includes(r.dish.id));
      default: return rawResults;
    }
  }, [rawResults, activeFilter, user.favoriteDishIds]);

  const filteredCategories = useMemo(() => {
    if (!pantrySearchTerm) return PANTRY_ITEMS;
    return PANTRY_ITEMS.map(cat => ({ ...cat, items: cat.items.filter(i => i.includes(pantrySearchTerm)) }))
      .filter(cat => cat.items.length > 0);
  }, [pantrySearchTerm]);

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const getResultCount = (filter: ResultFilter) => {
    if (!rawResults) return 0;
    switch (filter) {
      case 'perfect': return rawResults.filter(r => r.isPerfect).length;
      case 'near': return rawResults.filter(r => r.missingCount > 0 && r.missingCount <= 2).length;
      case 'quick': return rawResults.filter(r => (r.dish.cookTime || 60) <= 45).length;
      case 'favorites': return rawResults.filter(r => user.favoriteDishIds?.includes(r.dish.id)).length;
      default: return rawResults.length;
    }
  };

  return (
    <div className="flex flex-col h-full animate-enter">
      {/* هدر شیشه‌ای دقیق با فونت استاندارد */}
      <div className="sticky top-0 z-[900] bg-white/40 backdrop-blur-2xl px-4 py-3 sm:py-6 sm:px-10">
          <div className="backdrop-blur-3xl bg-white/50 border border-white/60 rounded-[1.75rem] sm:rounded-[3.5rem] p-4 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 text-right flex-row w-full lg:w-auto">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg"><ChefHat size={22} className="sm:w-8 sm:h-8" /></div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-black text-slate-800 leading-none">دستیار آشپز برتر</h2>
                  <p className="text-teal-600 text-[8px] sm:text-xs font-black mt-1 uppercase tracking-widest">Smart Pantry Discovery</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                <div className="relative flex-grow">
                   <input type="text" placeholder="جستجوی مواد غذایی..." value={pantrySearchTerm} onChange={(e) => setPantrySearchTerm(e.target.value)} className="w-full sm:w-80 px-10 sm:px-12 py-2.5 sm:py-4 bg-white border-2 border-slate-300 rounded-xl sm:rounded-2xl text-slate-800 font-black outline-none focus:border-teal-500 transition-all shadow-md placeholder:text-slate-400 text-xs sm:text-sm" />
                   <Search className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} sm:size={20} />
                </div>
                <button onClick={findRecipes} className="w-full sm:w-auto px-6 py-2.5 sm:px-10 sm:py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-xl sm:rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95 disabled:opacity-40 text-xs sm:text-sm" disabled={selectedItems.length === 0 || isSearching}>
                  {isSearching ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  <span>پیشنهاد غذا</span>
                </button>
              </div>
            </div>
          </div>
      </div>

      <div className="flex-grow overflow-y-auto px-4 sm:px-10 pb-20 no-scrollbar">
          <div className="h-10 sm:h-12 w-full"></div>
          <div className="max-w-7xl mx-auto py-4 sm:py-6 space-y-6 sm:space-y-10">
              {selectedItems.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-enter">
                  {selectedItems.map(item => (
                    <div key={item} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-[9px] sm:text-xs font-black border border-teal-100 flex items-center gap-2 shadow-sm">
                      {item}
                      <button onClick={() => toggleItem(item)} className="hover:text-rose-500"><X size={12}/></button>
                    </div>
                  ))}
                  <button onClick={() => {setSelectedItems([]); setRawResults(null);}} className="px-3 py-1.5 bg-rose-50 text-rose-500 rounded-lg text-[9px] sm:text-xs font-black flex items-center gap-1 border border-rose-100 transition-all hover:bg-rose-100">
                    <Trash2 size={12}/> پاکسازی کل مواد
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredCategories.map(category => (
                  <div key={category.id} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col h-[300px] sm:h-[400px]">
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-50 pb-3">
                       <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                          {category.id === 'proteins' ? <Drumstick size={18}/> : category.id === 'grains' ? <Wheat size={18}/> : category.id === 'vegetables' ? <Carrot size={18}/> : <UtensilsCrossed size={18}/>}
                       </div>
                       <h3 className="font-black text-slate-800 text-sm sm:text-base">{category.title}</h3>
                    </div>
                    <div className="flex-grow overflow-hidden">
                       <CategoryItemsList items={category.items} selectedItems={selectedItems} dislikedIngredients={user?.dislikedIngredients || []} toggleItem={toggleItem} />
                    </div>
                  </div>
                ))}
              </div>

              {rawResults && (
                <div ref={resultsAreaRef} className="space-y-6 sm:space-y-10 animate-enter pt-6 sm:pt-10 border-t border-slate-100 scroll-mt-24">
                  <div className="bg-white border border-slate-200 p-2 sm:p-4 rounded-2xl sm:rounded-[2.5rem] flex flex-wrap items-center gap-2 sm:gap-3 shadow-lg max-w-4xl mx-auto">
                     {[
                       { id: 'all', label: 'همه پیشنهادات', icon: Sparkles },
                       { id: 'perfect', label: 'آماده طبخ', icon: CheckCircle2 },
                       { id: 'near', label: 'کمبود جزئی', icon: AlertCircle },
                       { id: 'favorites', label: 'محبوب‌ها', icon: Heart },
                     ].map(filter => {
                       const count = getResultCount(filter.id as ResultFilter);
                       return (
                         <button 
                          key={filter.id}
                          onClick={() => setActiveFilter(filter.id as ResultFilter)}
                          className={`flex-grow px-3 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-xs font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all border-2 ${activeFilter === filter.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-transparent text-slate-500 hover:border-slate-200'}`}
                         >
                           <filter.icon size={12} sm:size={16} />
                           {filter.label}
                           <span className={`px-1.5 py-0.5 rounded-md text-[8px] sm:text-[10px] ${activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                             ({toPersian(count)})
                           </span>
                         </button>
                       )
                     })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pb-10">
                    {filteredResults && filteredResults.length > 0 ? filteredResults.map(({ dish, missingCount, isPerfect }) => (
                      <div key={dish.id} className="relative animate-enter">
                        {isPerfect && <div className="absolute -top-2 -right-2 z-20 bg-emerald-500 text-white px-3 py-1 rounded-lg shadow-xl border-2 border-white font-black text-[8px] sm:text-[10px]">آماده طبخ</div>}
                        <MealCard plan={{ dayName: isPerfect ? 'کامل' : `${toPersian(missingCount)} کسری`, dish }} user={user} onUpdateUser={onUpdateUser} />
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-3">
                          <ChefHat size={40} className="text-slate-100" />
                          <p className="text-slate-400 font-black text-sm italic">غذایی با مواد انتخابی یافت نشد.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
      </div>
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default PantryChef;
