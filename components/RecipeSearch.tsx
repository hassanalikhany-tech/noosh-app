
import { Search, Database, RefreshCw, ChevronRight, ChevronLeft, LayoutList, MapPin, CloudDownload, Loader2, BarChart3 } from 'lucide-react';
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

const COUNTRY_DATA = [
  { id: 'sa', label: 'عربستان سعودی', matches: ['عربستان', 'Saudi'] },
  { id: 'ye', label: 'یمن', matches: ['یمن', 'Yemen'] },
  { id: 'eg', label: 'مصر', matches: ['مصر', 'Egypt'] },
  { id: 'lb', label: 'لبنان', matches: ['لبنان', 'Lebanon'] },
  { id: 'tr', label: 'ترکیه', matches: ['ترکیه', 'Turkey'] },
  { id: 'af', label: 'افغانستان', matches: ['افغانستان', 'Afghanistan'] },
  { id: 'ma', label: 'مراکش', matches: ['مراکش', 'Morocco'] },
  { id: 'pe', label: 'پرو', matches: ['پرو', 'Peru'] },
  { id: 'br', label: 'برزیل', matches: ['برزیل', 'Brazil'] },
  { id: 'ar', label: 'آرژانتین', matches: ['آرژانتین', 'Argentina'] },
  { id: 'mx', label: 'مکزیک', matches: ['مکزیک', 'Mexico'] },
  { id: 'id', label: 'اندونزی', matches: ['اندونزی', 'Indonesia'] },
  { id: 'th', label: 'تایلند', matches: ['تایلند', 'Thailand'] },
  { id: 'vn', label: 'ویتنام', matches: ['ویتنام', 'Vietnam'] },
  { id: 'in', label: 'هند', matches: ['هند', 'India'] },
  { id: 'cn', label: 'چین', matches: ['چین', 'China'] },
  { id: 'jp', label: 'ژاپن', matches: ['ژاپن', 'Japan'] },
  { id: 'gb', label: 'بریتانیا', matches: ['بریتانیا', 'UK'] },
  { id: 'hu', label: 'مجارستان', matches: ['مجارستان', 'Hungary'] },
  { id: 'it', label: 'ایتالیا', matches: ['ایتالیا', 'Italy'] },
  { id: 'fr', label: 'فرانسه', matches: ['فرانسه', 'France'] },
  { id: 'ru', label: 'روسیه', matches: ['روسیه', 'Russia'] },
  { id: 'es', label: 'اسپانیا', matches: ['اسپانیا', 'Spain'] },
  { id: 'us', label: 'آمریکا', matches: ['آمریکا', 'USA'] },
].sort((a, b) => a.label.localeCompare(b.label, 'fa'));

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser, externalSearchTerm = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedCountryId, setSelectedCountryId] = useState<string | 'all'>('all');
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const loadDishes = () => {
    setAllDishes(RecipeService.getAllDishes());
  };

  useEffect(() => {
    loadDishes();
    window.addEventListener('recipes-updated', loadDishes);
    return () => window.removeEventListener('recipes-updated', loadDishes);
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await RecipeService.syncFromCloud(true);
    setIsSyncing(false);
  };

  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      const name = dish.name || "";
      const desc = dish.description || "";
      const matchesSearch = name.includes(externalSearchTerm) || desc.includes(externalSearchTerm);
      if (!matchesSearch) return false;
      
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      
      if (selectedCategory === 'international' && selectedCountryId !== 'all') {
        const country = COUNTRY_DATA.find(c => c.id === selectedCountryId);
        return country?.matches.some(m => dish.nationality?.includes(m));
      }
      return true;
    });
  }, [externalSearchTerm, selectedCategory, selectedCountryId, allDishes]);

  const categoryCounts = filteredDishes.length;

  const paginatedDishes = filteredDishes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 animate-enter">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2 items-center">
          <button 
            onClick={() => { setSelectedCategory('all'); setSelectedCountryId('all'); setCurrentPage(1); }} 
            className={`px-6 py-3.5 rounded-2xl text-[14px] font-black border transition-all ${selectedCategory === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-600 hover:border-slate-300'}`}
          >
             همه
          </button>
          {(Object.keys(CATEGORY_LABELS) as DishCategory[]).map(cat => (
            <button 
              key={cat} 
              onClick={() => { setSelectedCategory(cat); setSelectedCountryId('all'); setCurrentPage(1); }} 
              className={`px-6 py-3.5 rounded-2xl text-[14px] font-black border transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:border-slate-300'}`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}

          {/* کادر آمار انگلیسی و دکمه همگام‌سازی */}
          <div className="mr-auto flex items-center gap-3">
             <div className="flex items-center gap-2.5 px-5 py-3.5 bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden" title="تعداد نتایج">
                <BarChart3 size={18} className="text-teal-400" />
                <span className="text-[16px] font-black text-white font-mono tracking-widest leading-none pt-0.5" style={{ direction: 'ltr' }}>
                   {categoryCounts.toString()}
                </span>
             </div>
             <button 
                onClick={handleManualSync}
                disabled={isSyncing}
                className="p-4 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-md active:scale-95"
                title="همگام‌سازی دیتابیس"
             >
                {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <CloudDownload size={22} />}
             </button>
          </div>
        </div>

        {selectedCategory === 'international' && (
          <div className="p-8 bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white shadow-sm animate-enter">
            <div className="flex flex-wrap gap-4">
              <button onClick={() => { setSelectedCountryId('all'); setCurrentPage(1); }} className={`px-8 py-4 rounded-[1.5rem] text-sm font-black border-2 ${selectedCountryId === 'all' ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'}`}>همه</button>
              {COUNTRY_DATA.map(c => (
                <div key={c.id} className="relative group">
                   {/* Tooltip مشکی هوشمند */}
                   {hoveredCountry === c.id && (
                     <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-black text-white text-[11px] font-black rounded-xl z-[100] whitespace-nowrap shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                       {c.label}
                       <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
                     </div>
                   )}
                   <button 
                     onMouseEnter={() => setHoveredCountry(c.id)} 
                     onMouseLeave={() => setHoveredCountry(null)} 
                     onClick={() => { setSelectedCountryId(c.id); setCurrentPage(1); }} 
                     className={`w-16 h-16 rounded-[1.25rem] border-2 transition-all overflow-hidden flex items-center justify-center p-0 ${selectedCountryId === c.id ? 'border-indigo-600 scale-110 shadow-xl z-10 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-slate-300 shadow-sm'}`}
                   >
                     <img 
                       src={`https://flagcdn.com/w160/${c.id}.png`} 
                       alt={c.label} 
                       className="w-full h-full object-cover" 
                     />
                   </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedDishes.map(dish => <MealCard key={dish.id} plan={{ dayName: CATEGORY_LABELS[dish.category] || 'پخت برتر', dish }} user={user} onUpdateUser={onUpdateUser} />)}
      </div>
      
      {filteredDishes.length === 0 && (
         <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-4 animate-enter">
            <Search size={48} className="text-slate-200" />
            <p className="text-slate-400 font-black">پخت مورد نظر شما در این بخش یافت نشد.</p>
         </div>
      )}
    </div>
  );
};

export default RecipeSearch;
