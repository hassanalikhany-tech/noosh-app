
import { Search, Database, RefreshCw, ChevronRight, ChevronLeft, LayoutList, MapPin } from 'lucide-react';
import React, { useState, useMemo, useEffect } from 'react';
import { Dish, DishCategory, CATEGORY_LABELS, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import MealCard from './MealCard';

interface RecipeSearchProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  externalSearchTerm?: string;
}

const ITEMS_PER_PAGE = 24;

const COUNTRY_FILTERS = [
  { id: 'sa', label: 'عربستان', iso: 'sa', matches: ['عربستان', 'Saudi'] },
  { id: 'ye', label: 'یمن', iso: 'ye', matches: ['یمن', 'Yemen'] },
  { id: 'eg', label: 'مصر', iso: 'eg', matches: ['مصر', 'Egypt'] },
  { id: 'lb', label: 'لبنان', iso: 'lb', matches: ['لبنان', 'Lebanon'] },
  { id: 'tr', label: 'ترکیه', iso: 'tr', matches: ['ترکیه', 'Turkey'] },
  { id: 'af', label: 'افغانستان', iso: 'af', matches: ['افغانستان', 'Afghanistan'] },
  { id: 'ma', label: 'مراکش', iso: 'ma', matches: ['مراکش', 'Morocco'] },
  { id: 'pe', label: 'پرو', iso: 'pe', matches: ['پرو', 'Peru'] },
  { id: 'br', label: 'برزیل', iso: 'br', matches: ['برزیل', 'Brazil'] },
  { id: 'ar', label: 'آرژانتین', iso: 'ar', matches: ['آرژانتین', 'Argentina'] },
  { id: 'mx', label: 'مکزیک', iso: 'mx', matches: ['مکزیک', 'Mexico'] },
  { id: 'id', label: 'اندونزی', iso: 'id', matches: ['اندونزی', 'Indonesia'] },
  { id: 'th', label: 'تایلند', iso: 'th', matches: ['تایلند', 'Thai'] },
  { id: 'vn', label: 'ویتنام', iso: 'vn', matches: ['ویتنام', 'Vietnam'] },
  { id: 'in', label: 'هند', iso: 'in', matches: ['هند', 'India'] },
  { id: 'cn', label: 'چین', iso: 'cn', matches: ['چین', 'China'] },
  { id: 'jp', label: 'ژاپن', iso: 'jp', matches: ['ژاپن', 'Japan'] },
  { id: 'gb', label: 'بریتانیا', iso: 'gb', matches: ['بریتانیا', 'Britain', 'UK', 'England', 'انگلستان'] },
  { id: 'hu', label: 'مجارستان', iso: 'hu', matches: ['مجارستان', 'Hungary'] },
  { id: 'it', label: 'ایتالیا', iso: 'it', matches: ['ایتالیا', 'Italy'] },
  { id: 'fr', label: 'فرانسه', iso: 'fr', matches: ['فرانسه', 'France'] },
  { id: 'ru', label: 'روسیه', iso: 'ru', matches: ['روسیه', 'Russia'] },
  { id: 'es', label: 'اسپانیا', iso: 'es', matches: ['اسپانیا', 'Spain'] },
];

const normalize = (text: string) => {
  if (!text) return '';
  return text.replace(/ی/g, 'ی').replace(/ک/g, 'ک').toLowerCase().trim();
};

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser, externalSearchTerm = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedCountryId, setSelectedCountryId] = useState<string | 'all'>('all');
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
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
      const name = normalize(dish.name || "");
      const desc = normalize(dish.description || "");
      const nationality = normalize(dish.nationality || "");
      const searchTerm = normalize(externalSearchTerm);
      
      const matchesSearch = name.includes(searchTerm) || desc.includes(searchTerm);
      if (!matchesSearch) return false;
      
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      
      if (selectedCategory === 'international' && selectedCountryId !== 'all') {
        const countryFilter = COUNTRY_FILTERS.find(c => c.id === selectedCountryId);
        if (countryFilter) {
          return countryFilter.matches.some(m => 
            nationality.includes(normalize(m)) || 
            name.includes(normalize(m)) ||
            desc.includes(normalize(m))
          );
        }
      }
      return true;
    });
  }, [externalSearchTerm, selectedCategory, selectedCountryId, allDishes]);

  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);
  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toPersian = (num: number) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-8 animate-enter">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 items-center justify-start overflow-x-auto no-scrollbar pb-2 flex-grow">
            <button 
              onClick={() => { setSelectedCategory('all'); setSelectedCountryId('all'); setCurrentPage(1); }} 
              className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm flex items-center gap-2 ${selectedCategory === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 hover:border-slate-200'}`}
            >
              <LayoutList size={16} /> همه غذاها
            </button>
            {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map((cat) => (
              <button 
                key={cat} 
                onClick={() => { setSelectedCategory(cat); setSelectedCountryId('all'); setCurrentPage(1); }} 
                className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border shadow-sm flex items-center gap-2 ${selectedCategory === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-500 hover:border-teal-200'}`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSyncDb} className={`p-3 bg-white border border-slate-100 rounded-xl text-teal-600 shadow-sm hover:bg-teal-50 transition-all ${isSyncing ? 'animate-spin' : ''}`}>
              <RefreshCw size={18} />
            </button>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-lg">
              <Database size={14} className="text-teal-400" />
              {toPersian(filteredDishes.length)} مورد
            </div>
          </div>
        </div>

        {selectedCategory === 'international' && (
          <div className="p-8 bg-slate-900/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-xl animate-enter relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-8 px-1">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg"><MapPin size={16} /></div>
              <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">فیلتر ملل و کشورهای جهان:</span>
            </div>

            <div className="flex flex-wrap gap-5 justify-start">
              <button 
                onClick={() => { setSelectedCountryId('all'); setCurrentPage(1); }} 
                className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${selectedCountryId === 'all' ? 'bg-indigo-600 border-indigo-600 shadow-lg scale-110' : 'bg-white/40 border-white/60 hover:border-indigo-300 hover:bg-white/60'}`}
              >
                <Globe size={24} className={selectedCountryId === 'all' ? 'text-white' : 'text-slate-400'} />
                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800 text-white text-[10px] font-black transition-all pointer-events-none z-[100] ${selectedCountryId === 'all' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  همه ملل
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -translate-y-1"></div>
                </div>
              </button>

              {COUNTRY_FILTERS.map((country) => (
                <button 
                  key={country.id} 
                  onClick={() => { setSelectedCountryId(country.id); setCurrentPage(1); }} 
                  className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${selectedCountryId === country.id ? 'border-indigo-600 ring-4 ring-indigo-50 shadow-xl scale-110' : 'border-white/60 bg-white/40 hover:border-indigo-300 hover:scale-105'}`}
                >
                  <img 
                    src={`https://flagcdn.com/w80/${country.iso}.png`} 
                    alt={country.label}
                    className={`w-10 h-7 object-cover rounded shadow-sm transition-all ${selectedCountryId === country.id ? 'brightness-110' : 'grayscale-[0.2] group-hover:grayscale-0'}`}
                  />
                  
                  {/* لیبل هوشمند در بالای پرچم */}
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-800 text-white text-[10px] font-black transition-all pointer-events-none shadow-xl z-[100] ${selectedCountryId === country.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                    {country.label}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -translate-y-1"></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedDishes.map((dish) => (
          <div key={dish.id} className="animate-enter">
            <MealCard plan={{ dayName: CATEGORY_LABELS[dish.category], dish: dish }} user={user} onUpdateUser={onUpdateUser} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-10">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30 shadow-sm"><ChevronRight size={20} /></button>
          <div className="flex items-center gap-1 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-black text-sm text-slate-800">{toPersian(currentPage)}</span>
            <span className="text-[10px] font-black text-slate-300 mx-1">از</span>
            <span className="font-black text-sm text-slate-400">{toPersian(totalPages)}</span>
          </div>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30 shadow-sm"><ChevronLeft size={20} /></button>
        </div>
      )}
    </div>
  );
};

const Globe = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

export default RecipeSearch;
