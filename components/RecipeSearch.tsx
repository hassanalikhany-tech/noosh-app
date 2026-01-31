
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

// لیست ساده و مستقیم کشورها برای فیلتر ملل
const COUNTRY_FILTERS = [
  { id: 'tr', label: 'ترکیه', matches: ['ترکیه', 'Turkey'] },
  { id: 'it', label: 'ایتالیا', matches: ['ایتالیا', 'Italy'] },
  { id: 'lb', label: 'لبنان و شام', matches: ['لبنان', 'Lebanon', 'شام', 'Syria', 'Jordan'] },
  { id: 'in', label: 'هند و پاکستان', matches: ['هند', 'India', 'پاکستان', 'Pakistan'] },
  { id: 'cn', label: 'چین و شرق آسیا', matches: ['چین', 'China', 'ژاپن', 'Japan', 'تایلند', 'Thailand'] },
  { id: 'mx', label: 'مکزیک و آمریکا', matches: ['مکزیک', 'Mexico', 'آمریکا', 'USA'] },
  { id: 'fr', label: 'فرانسه', matches: ['فرانسه', 'France'] },
  { id: 'ru', label: 'روسیه و قفقاز', matches: ['روسیه', 'Russia', 'آذربایجان', 'Azerbaijan', 'قفقاز'] },
  { id: 'af', label: 'افغانستان', matches: ['افغانستان', 'Afghanistan'] },
];

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
      const name = dish.name || "";
      const desc = dish.description || "";
      const nationality = dish.nationality || "";
      
      // ۱. فیلتر جستجوی متنی (از فوتر یا نوار جستجو)
      const matchesSearch = name.includes(externalSearchTerm) || desc.includes(externalSearchTerm);
      if (!matchesSearch) return false;
      
      // ۲. فیلتر دسته‌بندی اصلی (پلو، خورش، کباب و ...)
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;
      
      // ۳. فیلتر اختصاصی کشورها (فقط برای ملل)
      if (selectedCategory === 'international' && selectedCountryId !== 'all') {
        const countryFilter = COUNTRY_FILTERS.find(c => c.id === selectedCountryId);
        if (countryFilter && !countryFilter.matches.some(m => nationality.includes(m))) return false;
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
      {/* بخش انتخاب دسته‌بندی و ابزارهای دیتابیس */}
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
            <button onClick={handleSyncDb} className={`p-3 bg-white border border-slate-100 rounded-xl text-teal-600 shadow-sm hover:bg-teal-50 transition-all ${isSyncing ? 'animate-spin' : ''}`} title="به‌روزرسانی دیتابیس">
              <RefreshCw size={18} />
            </button>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 shadow-lg">
              <Database size={14} className="text-teal-400" />
              {toPersian(filteredDishes.length)} مورد یافت شد
            </div>
          </div>
        </div>

        {/* بخش انتخاب کشور (فقط زمانی که بین‌المللی انتخاب شده باشد) */}
        {selectedCategory === 'international' && (
          <div className="p-5 bg-white rounded-[2rem] border border-slate-100 shadow-sm animate-enter">
            <div className="flex items-center gap-2 mb-4 px-1">
              <MapPin size={14} className="text-teal-600" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">انتخاب مستقیم بر اساس نام کشور:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => { setSelectedCountryId('all'); setCurrentPage(1); }} 
                className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${selectedCountryId === 'all' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-teal-200'}`}
              >
                همه ملل
              </button>
              {COUNTRY_FILTERS.map((country) => (
                <button 
                  key={country.id} 
                  onClick={() => { setSelectedCountryId(country.id); setCurrentPage(1); }} 
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${selectedCountryId === country.id ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200'}`}
                >
                  {country.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* نمایش نتایج در قالب کارت‌های استاندارد MealCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {paginatedDishes.map((dish) => (
          <div key={dish.id} className="animate-enter">
            <MealCard 
              plan={{ dayName: CATEGORY_LABELS[dish.category], dish: dish }} 
              user={user} 
              onUpdateUser={onUpdateUser} 
            />
          </div>
        ))}
      </div>

      {/* وضعیت عدم وجود نتیجه */}
      {filteredDishes.length === 0 && (
        <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-4">
          <div className="p-6 bg-slate-50 rounded-full text-slate-200">
            <Search size={48} />
          </div>
          <p className="text-slate-400 font-black">غذایی با این مشخصات در دیتابیس یافت نشد.</p>
          <button onClick={() => { setSelectedCategory('all'); setSelectedCountryId('all'); }} className="text-teal-600 font-black text-xs underline">نمایش همه غذاها</button>
        </div>
      )}

      {/* صفحه‌بندی (Pagination) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 py-10">
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30 transition-all shadow-sm"><ChevronRight size={20} /></button>
          <div className="flex items-center gap-1 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-black text-sm text-slate-800">{toPersian(currentPage)}</span>
            <span className="text-[10px] font-black text-slate-300 mx-1">از</span>
            <span className="font-black text-sm text-slate-400">{toPersian(totalPages)}</span>
          </div>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-teal-600 disabled:opacity-30 transition-all shadow-sm"><ChevronLeft size={20} /></button>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
