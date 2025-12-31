
import { Search, Heart, ThumbsDown, Database, RefreshCw, Globe, ChevronRight, ChevronLeft, MapPin, LayoutList, Lock } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
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

const REGIONS = [
  { id: 'mediterranean', label: 'مدیترانه و ملل عرب', countries: ['لبنان', 'مدیترانه', 'یونان', 'اردن', 'شام', 'ترکیه', 'اسپانیا'] },
  { id: 'europe', label: 'اروپای کلاسیک', countries: ['ایتالیا', 'فرانسه', 'روسیه', 'آلمان', 'انگلستان', 'Europe'] },
  { id: 'central_asia', label: 'آسیای مرکزی و همسایگان', countries: ['افغانستان', 'ازبکستان', 'پاکستان', 'تاجیکستان', 'آذربایجان'] },
  { id: 'far_east', label: 'خاور دور', countries: ['چین', 'ژاپن', 'تایلند', 'ویتنام'] },
  { id: 'americas', label: 'قاره آمریکا', countries: ['برزیل', 'مکزیک', 'آمریکا', 'USA'] },
];

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string | 'all'>('all');
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
      const nationality = dish.nationality || "";
      
      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
      if (!matchesSearch) return false;
      
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      
      if (selectedCategory === 'international' && selectedRegion !== 'all') {
        const region = REGIONS.find(r => r.id === selectedRegion);
        if (region && !region.countries.includes(nationality)) return false;
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory, selectedRegion, allDishes]);

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);

  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('search-results-top')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryChange = (cat: DishCategory | 'all') => {
    setSelectedCategory(cat);
    setSelectedRegion('all');
    setCurrentPage(1);
  };

  const handleToggleFavorite = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    if (!RecipeService.isDishAccessible(dishId, user)) return;
    let newFavorites = [...(user.favoriteDishIds || [])];
    let newBlacklist = [...(user.blacklistedDishIds || [])];
    const isFavorite = newFavorites.includes(dishId);

    if (isFavorite) {
      newFavorites = newFavorites.filter(id => id !== dishId);
    } else {
      newFavorites.push(dishId);
      newBlacklist = newBlacklist.filter(id => id !== dishId);
    }
    onUpdateUser({ ...user, favoriteDishIds: newFavorites, blacklistedDishIds: newBlacklist });
    UserService.updateProfile(user.username, { favoriteDishIds: newFavorites, blacklistedDishIds: newBlacklist }).catch(console.error);
  };

  const handleToggleBlacklist = (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    if (!RecipeService.isDishAccessible(dishId, user)) return;
    let newBlacklist = [...(user.blacklistedDishIds || [])];
    let newFavorites = [...(user.favoriteDishIds || [])];
    const isBlacklisted = newBlacklist.includes(dishId);

    if (isBlacklisted) {
      newBlacklist = newBlacklist.filter(id => id !== dishId);
    } else {
      newBlacklist.push(dishId);
      newFavorites = newFavorites.filter(id => id !== dishId);
    }
    onUpdateUser({ ...user, blacklistedDishIds: newBlacklist, favoriteDishIds: newFavorites });
    UserService.updateProfile(user.username, { blacklistedDishIds: newBlacklist, favoriteDishIds: newFavorites }).catch(console.error);
  };

  const handleDishClick = (dish: Dish) => {
    if (!RecipeService.isDishAccessible(dish.id, user)) {
      alert("حساب شما در انتظار تایید مدیر است. برای مشاهده جزئیات تمامی دستور پخت‌ها، لطفاً منتظر تایید نهایی بمانید.");
      return;
    }
    setSelectedDish(dish);
  };

  const toPersian = (num: number) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const handleSyncDb = async () => {
    setIsSyncing(true);
    await RecipeService.syncFromCloud();
    setIsSyncing(false);
  };

  return (
    <div className="pb-40 relative min-h-[70vh]">
      <div id="search-results-top" className="max-w-6xl mx-auto mb-8 space-y-8 px-4">
        <div className="relative group animate-enter">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-[2.5rem] blur-xl opacity-50 group-focus-within:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="نام غذا یا مواد اولیه را جستجو کنید..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full px-8 py-6 pr-14 rounded-[2.5rem] border-0 bg-white shadow-2xl focus:ring-2 focus:ring-teal-500 outline-none text-lg font-bold transition-all text-slate-800 placeholder:text-slate-400"
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-teal-500" size={28} />
            </div>
            <button 
              onClick={handleSyncDb}
              title="بروزرسانی دیتابیس"
              className={`p-5 bg-white rounded-[2rem] text-teal-600 shadow-xl border border-slate-50 transition-all hover:bg-teal-50 active:scale-90 ${isSyncing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={24} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 animate-enter" style={{ animationDelay: '0.1s' }}>
          <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar pb-2 flex-grow max-w-full lg:max-w-4xl">
             <button 
              onClick={() => handleCategoryChange('all')} 
              className={`px-6 py-3 rounded-2xl text-sm font-black transition-all border shadow-md whitespace-nowrap flex items-center gap-2 ${selectedCategory === 'all' ? 'bg-teal-600 text-white border-teal-600 ring-4 ring-teal-100' : 'bg-white text-slate-500 border-slate-100 hover:border-teal-200'}`}
             >
               <LayoutList size={18} />
               همه دسته‌ها
             </button>
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
              <button 
                key={cat} 
                onClick={() => handleCategoryChange(cat)} 
                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all border shadow-md whitespace-nowrap flex items-center gap-2 ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600 ring-4 ring-teal-100' : 'bg-white text-slate-500 border-slate-100 hover:border-teal-200'}`}
              >
                {cat === 'international' && <Globe size={18} />}
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="flex-shrink-0 flex items-center gap-4 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-white/10 group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Database size={20} className="text-teal-400 relative z-10" />
            <div className="flex flex-col relative z-10">
               <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter leading-none mb-1">نتایج یافت شده</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-lg font-black text-teal-400 leading-none">{toPersian(filteredDishes.length)}</span>
                 <span className="text-[10px] text-slate-500 font-bold">مورد</span>
               </div>
            </div>
          </div>
        </div>

        {selectedCategory === 'international' && (
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm animate-enter">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><MapPin size={18} /></div>
              <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">تفکیک ملل</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setSelectedRegion('all'); setCurrentPage(1); }} className={`px-5 py-2 rounded-xl text-xs font-black transition-all border ${selectedRegion === 'all' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white'}`}>همه ملل</button>
              {REGIONS.map(reg => (
                <button key={reg.id} onClick={() => { setSelectedRegion(reg.id); setCurrentPage(1); }} className={`px-5 py-2 rounded-xl text-xs font-black transition-all border ${selectedRegion === reg.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-white'}`}>{reg.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {filteredDishes.length === 0 ? (
          <div className="py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-slate-50 shadow-inner">
             <Database size={48} className="mx-auto mb-6 text-slate-200" />
             <p className="text-slate-400 font-black text-xl">غذایی یافت نشد!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-enter">
              {paginatedDishes.map((dish, idx) => {
                const isAccessible = RecipeService.isDishAccessible(dish.id, user);
                const isFavorite = user.favoriteDishIds?.includes(dish.id);
                const isBlacklisted = user.blacklistedDishIds?.includes(dish.id);
                const isLocked = !isAccessible;

                return (
                  <div key={dish.id} className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 ${isBlacklisted ? 'opacity-60 grayscale-[0.5]' : ''} ${isLocked ? 'grayscale opacity-60' : ''}`} style={{ animationDelay: `${idx * 0.02}s` }}>
                    <div className="h-52 relative cursor-pointer overflow-hidden" onClick={() => handleDishClick(dish)}>
                      <DishVisual category={dish.category} className="w-full h-full transition-transform duration-1000 group-hover:scale-110" imageUrl={dish.imageUrl} dishId={dish.id} />
                      
                      {isLocked && (
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-30">
                           <div className="bg-white/90 p-3 rounded-2xl shadow-xl flex flex-col items-center gap-1">
                              <Lock size={20} className="text-slate-800" />
                              <span className="text-[8px] font-black text-slate-800">قفل پیش‌نمایش</span>
                           </div>
                        </div>
                      )}

                      {!isLocked && (
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <button 
                            onClick={(e) => handleToggleFavorite(e, dish.id)} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xl ring-2 ring-white/20 ${isFavorite ? 'bg-rose-500 text-white' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-rose-500'}`}
                          >
                            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                          </button>
                          <button 
                            onClick={(e) => handleToggleBlacklist(e, dish.id)} 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xl ring-2 ring-white/20 ${isBlacklisted ? 'bg-black text-white' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-black'}`}
                          >
                            <ThumbsDown size={20} fill={isBlacklisted ? "currentColor" : "none"} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className={`font-black text-lg transition-colors mb-2 line-clamp-1 ${isLocked ? 'text-slate-400' : 'text-slate-800 group-hover:text-teal-600'}`}>{dish.name}</h4>
                      <div className="text-xs text-slate-400 font-bold mb-6 line-clamp-2 leading-relaxed h-10">{dish.description}</div>
                      <button onClick={() => handleDishClick(dish)} className={`w-full mt-auto py-3 rounded-2xl font-black text-xs transition-all shadow-sm ${isLocked ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 hover:bg-teal-600 hover:text-white text-slate-700'}`}>
                        {isLocked ? 'در انتظار تایید' : 'مشاهده جزئیات'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-3">
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-teal-600 disabled:opacity-30"><ChevronRight size={24} /></button>
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = currentPage <= 3 ? i + 1 : (currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i);
                    return pageNum > 0 && pageNum <= totalPages ? (
                      <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-12 h-12 rounded-2xl font-black text-sm transition-all ${currentPage === pageNum ? 'bg-teal-600 text-white shadow-xl scale-110' : 'bg-white border border-slate-100 text-slate-400 hover:bg-slate-50'}`}>{toPersian(pageNum)}</button>
                    ) : null;
                  })}
                </div>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-teal-600 disabled:opacity-30"><ChevronLeft size={24} /></button>
              </div>
            )}
          </>
        )}
      </div>
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default RecipeSearch;
