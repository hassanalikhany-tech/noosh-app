
import React, { useState } from 'react';
import { ChefHat, Heart, ThumbsDown } from 'lucide-react';
import { PANTRY_ITEMS } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { Dish, UserProfile } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface PantryChefProps {
  user: UserProfile;
}

const PantryChef: React.FC<PantryChefProps> = ({ user }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [results, setResults] = useState<{ dish: Dish, missing: string[] }[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const toggleItem = (item: string) => {
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setResults(null);
  };

  const findRecipes = () => {
    setIsSearching(true);
    setTimeout(() => {
      const allDishes = RecipeService.getAllDishes();
      const normSelected = selectedItems.map(i => i.trim().toLowerCase());
      const finalResults = allDishes.filter(dish => {
        const normDishIngs = dish.ingredients.map(ing => ing.item.toLowerCase());
        return normSelected.some(u => normDishIngs.some(d => d.includes(u)));
      }).map(dish => {
         const missing = dish.ingredients.filter(ing => !normSelected.some(u => ing.item.toLowerCase().includes(u))).map(i => i.item);
         return { dish, missing };
      });
      setResults(finalResults.sort((a, b) => a.missing.length - b.missing.length));
      setIsSearching(false);
    }, 400);
  };

  const handleToggleFavorite = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    UserService.toggleFavorite(user.username, dishId);
  };

  const handleToggleBlacklist = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    UserService.toggleBlacklist(user.username, dishId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-32 px-4 dir-rtl text-right">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><ChefHat size={36} /></div>
          <div><h2 className="text-2xl font-black text-gray-800">آشپز هوشمند</h2><p className="text-gray-500 font-bold text-sm">چه موادی در خانه دارید؟</p></div>
        </div>
        <button onClick={findRecipes} disabled={selectedItems.length === 0 || isSearching} className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-lg flex items-center gap-3 active:scale-95 transition-all disabled:opacity-50">
          {isSearching ? 'در حال جستجو...' : 'پیشنهاد بده'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PANTRY_ITEMS.map((category) => (
          <div key={category.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-black text-gray-700 mb-4 border-b border-gray-50 pb-2">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <button key={item} onClick={() => toggleItem(item)} className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${selectedItems.includes(item) ? 'bg-teal-600 border-teal-600 text-white shadow-md' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}>{item}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-enter">
          {results.map(({ dish, missing }) => {
            const isFavorite = user.favoriteDishIds?.includes(dish.id);
            const isBlacklisted = user.blacklistedDishIds?.includes(dish.id);
            return (
            <div key={dish.id} className={`bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl transition-all ${isBlacklisted ? 'opacity-75' : ''}`}>
              <div className="h-44 relative cursor-pointer" onClick={() => setSelectedDish(dish)}>
                 <DishVisual category={dish.category} className="w-full h-full transition-transform duration-700 group-hover:scale-105" imageUrl={dish.imageUrl} dishId={dish.id} />
                 <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <button 
                      onClick={(e) => handleToggleFavorite(e, dish.id)} 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-rose-500'}`}
                      title="علاقه‌مندی"
                    >
                      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={(e) => handleToggleBlacklist(e, dish.id)} 
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${isBlacklisted ? 'bg-black text-white' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-black'}`}
                      title="دیگر پیشنهاد نده"
                    >
                      <ThumbsDown size={18} fill={isBlacklisted ? "currentColor" : "none"} />
                    </button>
                 </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-lg font-black text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{dish.name}</h4>
                {isBlacklisted && (
                  <div className="mb-2 bg-black/5 text-black text-[9px] font-black py-1 px-2 rounded-lg inline-block w-fit">در لیست سیاه شماست</div>
                )}
                <div className="text-xs text-gray-500 font-bold mb-4 flex-grow">{missing.length > 0 ? `کمبود: ${missing.join('، ')}` : 'همه مواد موجوده! ✨'}</div>
                <button onClick={() => setSelectedDish(dish)} className="w-full py-3 bg-gray-100 hover:bg-teal-600 hover:text-white text-gray-700 rounded-2xl font-black text-xs transition-all shadow-sm">مشاهده دستور</button>
              </div>
            </div>
          )})}
        </div>
      )}
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} />}
    </div>
  );
};

export default PantryChef;
