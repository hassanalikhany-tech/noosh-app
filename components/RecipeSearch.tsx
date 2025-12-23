
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

const COUNTRIES = [
  { id: 'tr', name: 'ترکیه', flag: '🇹🇷' },
  { id: 'az', name: 'آذربایجان', flag: '🇦🇿' },
  { id: 'af', name: 'افغانستان', flag: '🇦🇫' },
  { id: 'tj', name: 'تاجیکستان', flag: '🇹🇯' },
  { id: 'uz', name: 'ازبکستان', flag: '🇺🇿' },
  { id: 'mn', name: 'مغولستان', flag: '🇲🇳' },
  { id: 'ru', name: 'روسیه', flag: '🇷🇺' },
  { id: 'ua', name: 'اوکراین', flag: '🇺🇦' },
  { id: 'ar', name: 'عربی', flag: '🇸🇦' },
  { id: 'in', name: 'هندی', flag: '🇮🇳' },
  { id: 'uk', name: 'انگلستان', flag: '🇬🇧' },
  { id: 'fr', name: 'فرانسه', flag: '🇫🇷' },
  { id: 'mx', name: 'مکزیک', flag: '🇲🇽' },
  { id: 'jp', name: 'ژاپن', flag: '🇯🇵' },
  { id: 'th', name: 'تایلندی', flag: '🇹🇭' },
  { id: 'it', name: 'ایتالیا', flag: '🇮🇹' }
];

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedNationality, setSelectedNationality] = useState<string | 'all'>('all');
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
      if (selectedCategory === 'international' && selectedNationality !== 'all' && dish.nationality !== selectedNationality) return false;
      return true;
    });
  }, [searchTerm, selectedCategory, selectedNationality, allDishes]);

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
           <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] shadow-sm border border-slate-100 group hover:border-teal-200 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 text-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                 <Database size={24} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">مجموعه دستور پخت نوش</span>
                 <div className="flex items-baseline gap-1">
                   <span className="text-xl font-black text-teal-700">{toPersian(filteredDishes.length)}</span>
                   <span className="text-xs text-slate-400 font-bold">از</span>
                   <span className="text-sm font-black text-slate-500">{toPersian(allDishes.length)}</span>
                   <span className="text-[10px] text-slate-400 mr-1 font-bold">غذا</span>
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
                className={`p-3 bg-white border border-slate-100 rounded-2xl text-teal-600 shadow-sm hover:bg-teal-50 transition-all ${isSyncing ? 'animate-spin' : ''}`}
                title="بروزرسانی از ابر"
             >
                <RefreshCw size={20} />
             </button>
             {(searchTerm || selectedCategory !== 'all') && (
               <button 
                onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedNationality('all'); }}
                className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-xs font-black border border-rose-100 flex items-center gap-2 hover:bg-rose-100 transition-colors"
               >
                  پاکسازی فیلترها
               </button>
             )}
           </div>
        </div>

        <div className="relative group mx-2">
          <input
            type="text"
            placeholder="جستجوی در میان صدها غذای لذیذ..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full px-5 py-5 pr-12 rounded-[2.5rem] border-2 border-gray-100 bg-white focus:border-teal-500 outline-none text-base shadow-sm font-medium transition-all text-slate-900"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-teal-500" size={24} />
        </div>

        <div className="px-2">
          <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar pb-2">
             <button onClick={() => { setSelectedCategory('all'); setSelectedNationality('all'); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm whitespace-nowrap ${selectedCategory === 'all' ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>همه غذاها</button>
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setSelectedNationality('all'); setCurrentPage(1); }} className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border shadow-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-gray-600 border-gray-200'}`}>{CATEGORY_LABELS[cat]}</button>
            ))}
          </div>
        </div>

        {/* بخش انتخاب کشورها (فقط برای غذاهای ملل) */}
        {selectedCategory === 'international' && (
          <div className="px-4 animate-enter">
            <div className="bg-slate-50 p-4 rounded-[2rem] border border-slate-200">
               <div className="flex items-center gap-2 mb-3 px-2 text-slate-500">
                  <Globe size={16} />
                  <span className="text-[10px] font-black uppercase">انتخاب بر اساس کشور (ملل)</span>
               </div>
               <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => { setSelectedNationality('all'); setCurrentPage(1); }}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${selectedNationality === 'all' ? 'bg-white border-teal-500 text-teal-700 shadow-sm' : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-100'}`}
                  >
                    🌍 همه کشورها
                  </button>
                  {COUNTRIES.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => { setSelectedNationality(c.id); setCurrentPage(1); }}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border flex items-center gap-1.5 ${selectedNationality === c.id ? 'bg-white border-teal-500 text-teal-700 shadow-sm' : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-100'}`}
                    >
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {paginatedDishes.length > 0 ? (
          paginatedDishes.map(dish => {
             const isFavorite = user.favoriteDishIds?.includes(dish.id);
             const isBlacklisted = user.blacklistedDishIds?.includes(dish.id);
             return (
              <div key={dish.id} onClick={() => setSelectedDish(dish)} className={`group bg-white rounded-[2rem] shadow-sm hover:shadow-xl border border-slate-100 transition-all flex flex-col h-full overflow-hidden cursor-pointer ${isBlacklisted ? 'opacity-75' : ''}`}>
                <div className="relative h-44 w-full bg-gray-100">
                   <DishVisual category={dish.category} className="w-full h-full transition-transform duration-700 group-hover:scale-105" imageUrl={dish.imageUrl} dishId={dish.id} />
                   <div className="absolute top-3 left-3 z-10 flex gap-2">
                      <button 
                        onClick={(e) => handleToggleFavorite(e, dish.id)} 
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${isFavorite ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-rose-500'}`}
                      >
                        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                      <button 
                        onClick={(e) => handleToggleBlacklist(e, dish.id)} 
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ring-1 ring-black/5 ${isBlacklisted ? 'bg-black text-white' : 'bg-white/80 backdrop-blur-md text-slate-500 hover:text-black'}`}
                      >
                        <ThumbsDown size={18} fill={isBlacklisted ? "currentColor" : "none"} />
                      </button>
                   </div>
                   {dish.nationality && (
                     <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg text-xs shadow-sm font-bold">
                       {COUNTRIES.find(c => c.id === dish.nationality)?.flag}
                     </div>
                   )}
                </div>
                <div className="p-5 flex flex-col flex-grow text-right">
                  <h3 className="font-black text-sm mb-2 text-gray-800 group-hover:text-teal-700 transition-colors leading-tight">{dish.name}</h3>
                  <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed font-bold">{dish.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
             <ListFilter size={48} className="mx-auto text-slate-200 mb-4" />
             <p className="text-slate-400 font-bold italic">متاسفانه غذایی با این مشخصات پیدا نشد...</p>
          </div>
        )}
      </div>

      {filteredDishes.length > ITEMS_PER_PAGE && (
        <div className="mt-12 flex justify-center gap-2">
           {Array.from({ length: Math.ceil(filteredDishes.length / ITEMS_PER_PAGE) }).map((_, i) => (
             <button 
              key={i} 
              onClick={() => { setCurrentPage(i + 1); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`w-11 h-11 rounded-2xl font-black transition-all ${currentPage === i + 1 ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
             >
               {toPersian(i + 1)}
             </button>
           )).slice(0, 10)}
        </div>
      )}

      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} />}
    </div>
  );
};

export default RecipeSearch;
