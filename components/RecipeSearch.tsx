
import React, { useState, useMemo } from 'react';
import { Search, Heart, ThumbsDown } from 'lucide-react';
import { Dish, DishCategory, CATEGORY_LABELS, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface RecipeSearchProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const ITEMS_PER_PAGE = 24;

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allDishes = useMemo(() => RecipeService.getAllDishes(), []);

  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const matchesSearch = dish.name.includes(searchTerm) || dish.description.includes(searchTerm);
      if (!matchesSearch) return false;
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      return true;
    });
  }, [searchTerm, selectedCategory, allDishes]);

  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const handleToggleFavorite = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    const updated = UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updated);
  };

  const handleToggleBlacklist = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    const updated = UserService.toggleBlacklist(user.username, dishId);
    onUpdateUser(updated);
  };

  return (
    <div className="pb-32 relative min-h-[50vh]">
      <div className="max-w-5xl mx-auto mb-6 space-y-6">
        <div className="relative group mx-2">
          <input
            type="text"
            placeholder="جستجوی نام غذا یا مواد اولیه..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-4 pr-12 rounded-2xl border border-gray-100 bg-white focus:border-teal-500 outline-none text-base shadow-sm font-medium transition-all text-slate-900"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500" size={22} />
        </div>

        <div className="px-2">
          <div className="flex flex-wrap gap-2 items-center justify-start">
             <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${selectedCategory === 'all' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>همه غذاها</button>
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border shadow-sm ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>{CATEGORY_LABELS[cat]}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {paginatedDishes.map(dish => {
           const isFavorite = user.favoriteDishIds?.includes(dish.id);
           const isBlacklisted = user.blacklistedDishIds?.includes(dish.id);
           return (
            <div key={dish.id} onClick={() => setSelectedDish(dish)} className={`group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 transition-all flex flex-col h-full overflow-hidden cursor-pointer ${isBlacklisted ? 'opacity-75' : ''}`}>
              <div className="relative h-44 w-full bg-gray-100">
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
              <div className="p-4 flex flex-col flex-grow text-right">
                <h3 className="font-bold text-base mb-1 text-gray-800 group-hover:text-teal-700 transition-colors">{dish.name}</h3>
                {isBlacklisted && (
                  <div className="mb-2 bg-black/5 text-black text-[9px] font-black py-1 px-2 rounded-lg inline-block w-fit">در لیست سیاه شماست</div>
                )}
                <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed font-bold">{dish.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} />}
    </div>
  );
};

export default RecipeSearch;
