
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Heart, ThumbsDown, ListFilter, Database, RefreshCw, Globe } from 'lucide-react';
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
  const [allDishes, setAllDishes] = useState<Dish[]>(RecipeService.getAllDishes());
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      setAllDishes(RecipeService.getAllDishes());
    };
    window.addEventListener('recipes-updated' as any, handleSync);
    return () => window.removeEventListener('recipes-updated' as any, handleSync);
  }, []);

  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const name = dish.name || "";
      const desc = dish.description || "";
      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
      if (!matchesSearch) return false;
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      return true;
    });
  }, [searchTerm, selectedCategory, allDishes]);

  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const handleToggleFavorite = async (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    const updated = await UserService.toggleFavorite(user.username, dishId);
    onUpdateUser(updated);
  };

  const handleToggleBlacklist = async (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    const updated = await UserService.toggleBlacklist(user.username, dishId);
    onUpdateUser(updated);
  };

  const toPersian = (num: number) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="pb-32 relative min-h-[50vh]">
      <div className="max-w-5xl mx-auto mb-6 space-y-6">
        
        <div className="flex flex-wrap items-center justify-between px-4 gap-4">
           <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                 <Database size={24} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">فهرست غذاهای نوش</span>
                 <div className="flex items-baseline gap-1">
                   <span className="text-xl font-black text-teal-700">{toPersian(filteredDishes.length)}</span>
                   <span className="text-xs text-slate-400 font-bold">غذا آماده است</span>
                 </div>
              </div>
           </div>

           <div className="flex gap-2">
             <button 
                onClick={async () => {
                  setIsSyncing(true);
                  await RecipeService.syncFromCloud();
                  setIsSyncing(false);
                }}
                className={`p-3 bg-white border border-slate-100 rounded-2xl text-teal-600 shadow-sm ${isSyncing ? 'animate-spin' : ''}`}
             >
                <RefreshCw size={20} />
             </button>
           </div>
        </div>

        <div className="relative mx-2">
          <input
            type="text"
            placeholder="جستجو در دیتابیس جدید..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full px-5 py-5 pr-12 rounded-[2.5rem] border-2 border-gray-100 bg-white focus:border-teal-500 outline-none text-base shadow-sm font-medium transition-all"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-teal-500" size={24} />
        </div>

        <div className="px-2">
          <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar pb-2">
             <button onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm whitespace-nowrap ${selectedCategory === 'all' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>همه دسته‌ها</button>
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>{CATEGORY_LABELS[cat]}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {paginatedDishes.length > 0 ? (
          paginatedDishes.map(dish => (
            <div key={dish.id} onClick={() => setSelectedDish(dish)} className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl border border-slate-100 transition-all flex flex-col h-full overflow-hidden cursor-pointer">
              <div className="relative h-44 w-full bg-gray-100">
                 <DishVisual category={dish.category} className="w-full h-full" imageUrl={dish.imageUrl} dishId={dish.id} />
              </div>
              <div className="p-5 flex flex-col flex-grow text-right">
                <h3 className="font-black text-sm mb-2 text-gray-800 group-hover:text-teal-700 transition-colors">{dish.name}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-2 font-bold">{dish.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <ListFilter size={48} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold italic">دیتابیس در حال حاضر خالی است. غذاهای جدید را وارد کنید.</p>
          </div>
        )}
      </div>

      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} />}
    </div>
  );
};

export default RecipeSearch;
