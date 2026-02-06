
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChefHat, Sparkles, Search, CheckCircle2, AlertCircle, ShoppingCart, X, Drumstick, Wheat, Carrot, UtensilsCrossed, ArrowLeft, Lock, ChevronDown, ChevronUp, RefreshCw, Trash2 } from 'lucide-react';
import { PANTRY_ITEMS, SPICES_AND_ADDITIVES } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { Dish, UserProfile, ShoppingItem } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';
import MealCard from './MealCard';

interface PantryChefProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const CategoryItemsList: React.FC<{
  items: string[];
  selectedItems: string[];
  dislikedIngredients: string[];
  toggleItem: (item: string) => void;
}> = ({ items, selectedItems, dislikedIngredients, toggleItem }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div className="relative flex flex-col h-full group/list">
      <div ref={scrollRef} className="flex flex-wrap gap-2 overflow-y-auto h-72 no-scrollbar pr-0.5 pb-8">
        {items.map((item) => {
          const isSel = selectedItems.includes(item);
          const isForbidden = dislikedIngredients?.includes(item);
          return (
            <button 
              key={item} 
              onClick={() => toggleItem(item)} 
              className={`flex-grow px-3 py-2.5 rounded-xl text-[13px] font-black transition-all border-2 text-center leading-tight shadow-sm ${
                isSel ? 'bg-teal-500 border-teal-500 text-white transform scale-[0.98]' : 
                isForbidden ? 'bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-50' : 
                'bg-slate-50 border-transparent text-slate-600 hover:border-teal-300 hover:bg-teal-50/50'
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  );
};

const PantryChef: React.FC<PantryChefProps> = ({ user, onUpdateUser }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [pantrySearchTerm, setPantrySearchTerm] = useState('');
  const [results, setResults] = useState<{ dish: Dish, available: string[], matchCount: number }[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const toggleItem = (item: string) => {
    if (user.dislikedIngredients?.includes(item)) return;
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setResults(null);
  };

  const findRecipes = () => {
    if (selectedItems.length === 0) return;
    setIsSearching(true);
    setTimeout(() => {
      const all = RecipeService.getAllDishes();
      const processed = all.map(dish => {
        const available = dish.ingredients.filter(ing => selectedItems.some(s => ing.item.includes(s))).map(i => i.item);
        return { dish, available, matchCount: available.length };
      }).filter(res => res.matchCount > 0).sort((a, b) => b.matchCount - a.matchCount);
      setResults(processed);
      setIsSearching(false);
    }, 800);
  };

  const filteredCategories = useMemo(() => {
    if (!pantrySearchTerm) return PANTRY_ITEMS;
    return PANTRY_ITEMS.map(cat => ({ ...cat, items: cat.items.filter(i => i.includes(pantrySearchTerm)) }))
      .filter(cat => cat.items.length > 0);
  }, [pantrySearchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 px-4 dir-rtl text-right">
      <div className="relative overflow-hidden metallic-navy rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-white/5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-teal-500 rounded-[1.5rem] flex items-center justify-center text-navy-950 shadow-lg">
              <ChefHat size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">دستیار آشپز برتر</h2>
              <p className="text-teal-400 text-xs font-bold mt-1 opacity-80">بر اساس موجودی فعلی خانه، بهترین پخت‌ها را پیشنهاد می‌دهیم</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-grow">
               <input type="text" placeholder="جستجوی مواد در قفسه‌ها..." value={pantrySearchTerm} onChange={(e) => setPantrySearchTerm(e.target.value)} className="w-full sm:w-80 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-black outline-none focus:border-teal-500 transition-all placeholder:text-slate-500" />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            </div>
            <button onClick={findRecipes} className="px-10 py-4 bg-teal-500 hover:bg-teal-400 text-navy-950 rounded-2xl font-black shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50" disabled={selectedItems.length === 0 || isSearching}>
              {isSearching ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
              <span>چی میشه پخت؟</span>
            </button>
          </div>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-enter px-2">
          {selectedItems.map(item => (
            <div key={item} className="px-4 py-2 bg-teal-500/10 text-teal-600 rounded-xl text-[11px] font-black border border-teal-500/20 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
              {item}
              <button onClick={() => toggleItem(item)} className="hover:text-rose-500 transition-colors"><X size={14}/></button>
            </div>
          ))}
          <button onClick={() => setSelectedItems([])} className="px-4 py-2 bg-rose-50 text-rose-500 rounded-xl text-[11px] font-black border border-rose-100 flex items-center gap-1 hover:bg-rose-100 transition-all"><Trash2 size={14}/> پاکسازی کل قفسه</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-[520px] transition-all hover:shadow-xl group">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-50 pb-6 shrink-0">
               <div className="p-3 bg-slate-950 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform">
                  {category.id === 'proteins' ? <Drumstick size={24}/> : category.id === 'grains' ? <Wheat size={24}/> : category.id === 'vegetables' ? <Carrot size={24}/> : <UtensilsCrossed size={24}/>}
               </div>
               <h3 className="font-black text-slate-800 text-lg leading-none">{category.title}</h3>
            </div>
            <div className="flex-grow overflow-hidden">
               <CategoryItemsList items={category.items} selectedItems={selectedItems} dislikedIngredients={user.dislikedIngredients || []} toggleItem={toggleItem} />
            </div>
          </div>
        ))}
      </div>

      {results && (
        <div className="space-y-12 animate-enter pt-12">
          <div className="flex items-center justify-between px-2">
             <h2 className="text-xl font-black text-slate-800 flex items-center gap-3"><ChefHat className="text-teal-600" /> لیست پیشنهادات هوشمند:</h2>
             <span className="text-xs font-bold text-slate-400">({results.length} پخت ممکن)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {results.map(({ dish, available }) => (
              <MealCard key={dish.id} plan={{ dayName: `${available.length} مورد موجود در خانه`, dish }} user={user} onUpdateUser={onUpdateUser} />
            ))}
          </div>
        </div>
      )}
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default PantryChef;
