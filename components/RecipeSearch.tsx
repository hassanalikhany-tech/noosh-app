
import { Search, Heart, ThumbsDown, Database, RefreshCw, Globe, ChevronRight, ChevronLeft, LayoutList, Lock, CloudDownload, AlertCircle } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Dish, DishCategory, CATEGORY_LABELS, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface RecipeSearchProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  externalSearchTerm?: string;
}

const ITEMS_PER_PAGE = 24;

const REGIONS = [
  { id: 'mediterranean', label: 'مدیترانه و ملل عرب', countries: ['لبنان', 'مدیترانه', 'یونان', 'اردن', 'شام', 'ترکیه', 'اسپانیا'] },
  { id: 'europe', label: 'اروپای کلاسیک', countries: ['ایتالیا', 'فرانسه', 'روسیه', 'آلمان', 'انگلستان', 'Europe'] },
  { id: 'central_asia', label: 'آسیای مرکزی و همسایگان', countries: ['افغانستان', 'ازبکستان', 'پاکستان', 'تاجیکستان', 'آذربایجان'] },
  { id: 'far_east', label: 'خاور دور', countries: ['چین', 'ژاپن', 'تایلند', 'ویتنام'] },
  { id: 'americas', label: 'قاره آمریکا', countries: ['برزیل', 'مکزیک', 'آمریکا', 'USA'] },
];

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser, externalSearchTerm = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string | 'all'>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const refreshList = () => {
    const dishes = RecipeService.getAllDishes();
    setAllDishes(dishes);
  };

  useEffect(() => {
    refreshList();
    const handleSync = () => refreshList();
    window.addEventListener('recipes-updated', handleSync);
    return () => window.removeEventListener('recipes-updated', handleSync);
  }, []);

  const handleSyncDb = async () => {
    setIsSyncing(true);
    await RecipeService.syncFromCloud();
    setIsSyncing(false);
    refreshList();
  };

  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const name = dish.name || "";
      const desc = dish.description || "";
      const nationality = dish.nationality || "";
      const matchesSearch = name.includes(externalSearchTerm) || desc.includes(externalSearchTerm);
      if (!matchesSearch) return false;
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      if (selectedCategory === 'international' && selectedRegion !== 'all') {
        const region = REGIONS.find(r => r.id === selectedRegion);
        if (region && !region.countries.includes(nationality)) return false;
      }
      return true;
    });
  }, [externalSearchTerm, selectedCategory, selectedRegion, allDishes]);

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);
  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDishClick = (dish: Dish) => {
    const isAccessible = RecipeService.isDishAccessible(dish.id, user);
    if (!isAccessible) {
      alert("با پرداخت حق اشتراک و تایید نهایی حساب توسط مدیریت، می‌توانید از تمام امکانات و دستور پخت‌های این اپلیکیشن استفاده کامل را بنمایید.");
      return;
    }
    setSelectedDish(dish);
  };

  const toPersian = (num: number) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-8 animate-enter">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar pb-2 flex-grow">
          <button onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm flex items-center gap-2 ${selectedCategory === 'all' ? 'bg-teal-600 text-white' : 'bg-white text-slate-500'}`}>
            <LayoutList size={16} /> همه
          </button>
          {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
            <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm flex items-center gap-2 ${selectedCategory === cat ? 'bg-teal-600 text-white' : 'bg-white text-slate-500'}`}>
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={handleSyncDb} className={`p-3 bg-white border border-slate-100 rounded-xl text-teal-600 shadow-sm ${isSyncing ? 'animate-spin' : ''}`}>
            <RefreshCw size={18} />
          </button>
          <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2">
            <Database size={14} className="text-teal-400" />
            {toPersian(filteredDishes.length)} مورد
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedDishes.map((dish) => {
          const isAccessible = RecipeService.isDishAccessible(dish.id, user);
          return (
            <div 
              key={dish.id} 
              className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all cursor-pointer ${!isAccessible ? 'grayscale opacity-70' : ''}`} 
              onClick={() => handleDishClick(dish)}
            >
               <div className="h-48 relative overflow-hidden">
                  <DishVisual category={dish.category} imageUrl={dish.imageUrl} dishId={dish.id} className="w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  {!isAccessible && (
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-center justify-center z-20">
                      <div className="bg-white/90 p-2.5 rounded-2xl shadow-lg border border-slate-200">
                        <Lock size={20} className="text-slate-800" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-slate-800 shadow-sm">{CATEGORY_LABELS[dish.category]}</span>
                  </div>
               </div>
               <div className="p-6">
                  <h4 className="font-black text-lg text-slate-800 mb-2 group-hover:text-teal-600 transition-colors flex items-center justify-between">
                    {dish.name}
                    {!isAccessible && <Lock size={14} className="text-slate-400" />}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 h-8 font-bold leading-relaxed">{dish.description}</p>
               </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-10">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30"><ChevronRight size={20} /></button>
          <span className="font-black text-sm text-slate-600">{toPersian(currentPage)} از {toPersian(totalPages)}</span>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30"><ChevronLeft size={20} /></button>
        </div>
      )}

      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default RecipeSearch;
