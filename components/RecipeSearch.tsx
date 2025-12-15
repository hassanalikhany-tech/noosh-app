
import React, { useState, useMemo, useEffect } from 'react';
import { Search, BookOpen, Filter, BookX, Trash2, CheckSquare, XSquare, CheckCircle2, ChevronLeft, ChevronRight, Utensils, Globe2, X, Ban, ShieldAlert } from 'lucide-react';
import { Dish, DishCategory, CATEGORY_LABELS, UserProfile } from '../types';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { hideDishIds } from '../utils/dishStorage';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface RecipeSearchProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const ITEMS_PER_PAGE = 24;

// Define selection modes
type SelectionMode = 'none' | 'user_blacklist' | 'admin_delete';

const RecipeSearch: React.FC<RecipeSearchProps> = ({ user, onUpdateUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [selectedNationality, setSelectedNationality] = useState<string | null>(null);
  
  // New state for Dessert Sub-tab
  const [dessertTab, setDessertTab] = useState<'iranian' | 'international'>('iranian');

  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Selection State
  const [selectionMode, setSelectionMode] = useState<SelectionMode>('none');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [actionMessage, setActionMessage] = useState<{text: string, type: 'success' | 'warning'} | null>(null);
  
  // Force refresh data trigger
  const [dataVersion, setDataVersion] = useState(0);

  // Memoize allDishes - depends on dataVersion to allow refreshing after admin delete
  const allDishes = useMemo(() => RecipeService.getAllDishes(), [dataVersion]);

  // Filter Logic
  const filteredDishes = useMemo(() => {
    return allDishes.filter(dish => {
      // 1. Check blacklist
      if (user.blacklistedDishIds.includes(dish.id)) return false;
      
      // 2. Check search text
      const matchesSearch = dish.name.includes(searchTerm) || dish.description.includes(searchTerm);
      if (!matchesSearch) return false;

      // 3. Check Category
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) return false;

      // 4. Check Nationality (only if international category is selected)
      if (selectedCategory === 'international' && selectedNationality) {
         if (dish.nationality !== selectedNationality) return false;
      }

      // 5. Check Dessert Sub-type
      if (selectedCategory === 'dessert') {
         // Determine if dish is international based on nationality field being present and NOT 'ir'
         // Iranian dishes either have no nationality or 'ir'
         const isInternational = !!dish.nationality && dish.nationality !== 'ir';
         
         if (dessertTab === 'iranian' && isInternational) return false;
         if (dessertTab === 'international' && !isInternational) return false;
      }
      
      return true;
    });
  }, [searchTerm, selectedCategory, selectedNationality, dessertTab, user.blacklistedDishIds, allDishes]);

  // Scroll to top and reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    
    const resultsAnchor = document.getElementById('results-anchor');
    if (resultsAnchor) {
      const yOffset = -120;
      const y = resultsAnchor.getBoundingClientRect().top + window.pageYOffset + yOffset;
      if (window.scrollY > 200) {
         window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
  }, [searchTerm, selectedCategory, selectedNationality, dessertTab]);

  useEffect(() => {
    if (selectedCategory !== 'international') {
      setSelectedNationality(null);
    }
    // Reset dessert tab when switching away from dessert category (optional, but good UX)
    if (selectedCategory !== 'dessert') {
      setDessertTab('iranian'); 
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => setActionMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [actionMessage]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE);
  const paginatedDishes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDishes.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredDishes]);

  const toggleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    const count = checkedItems.size;
    if (count === 0) return;

    const idsToProcess = Array.from(checkedItems) as string[];

    if (selectionMode === 'user_blacklist') {
        // User Logic: Add to personal blacklist
        const updatedUser = UserService.addToBlacklist(user.username, idsToProcess);
        onUpdateUser(updatedUser);
        setActionMessage({ text: `${count} غذا به لیست "دوست ندارم" اضافه شد و دیگر پیشنهاد نمی‌شود.`, type: 'success' });
    } else if (selectionMode === 'admin_delete') {
        // Admin Logic: Hide globally
        hideDishIds(idsToProcess);
        setDataVersion(prev => prev + 1); // Trigger data reload
        setActionMessage({ text: `${count} غذا به صورت دائمی از سیستم حذف شد.`, type: 'warning' });
    }
    
    setSelectionMode('none');
    setCheckedItems(new Set());
  };

  const toggleSelectionMode = (mode: SelectionMode) => {
    if (selectionMode === mode) {
        setSelectionMode('none');
    } else {
        setSelectionMode(mode);
    }
    setCheckedItems(new Set());
    setActionMessage(null);
  };

  const countries = [
    { code: 'tr', label: 'ترکیه', flag: '🇹🇷' },
    { code: 'ar', label: 'عربی', flag: '🇸🇦' },
    { code: 'it', label: 'ایتالیا', flag: '🇮🇹' },
    { code: 'in', label: 'هند', flag: '🇮🇳' },
    { code: 'mx', label: 'مکزیک', flag: '🇲🇽' },
    { code: 'jp', label: 'ژاپن', flag: '🇯🇵' },
    { code: 'fr', label: 'فرانسه', flag: '🇫🇷' },
    { code: 'uk', label: 'انگلیس', flag: '🇬🇧' },
    { code: 'pk', label: 'پاکستان', flag: '🇵🇰' },
    { code: 'ru', label: 'روسیه', flag: '🇷🇺' },
    { code: 'uz', label: 'ازبکستان', flag: '🇺🇿' },
    { code: 'us', label: 'آمریکا', flag: '🇺🇸' },
    { code: 'es', label: 'اسپانیا', flag: '🇪🇸' },
    { code: 'de', label: 'آلمان', flag: '🇩🇪' },
    { code: 'gr', label: 'یونان', flag: '🇬🇷' },
    { code: 'au', label: 'استرالیا', flag: '🇦🇺' },
    { code: 'at', label: 'اتریش', flag: '🇦🇹' },
  ];

  return (
    <div className="pb-32 relative min-h-[50vh]">
      <div className="max-w-5xl mx-auto mb-6 space-y-6">
        
        {/* Search Bar */}
        <div className="relative group mx-2">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-300 to-emerald-300 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
          <input
            type="text"
            placeholder="نام غذا یا مواد اولیه را جستجو کنید..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="relative w-full px-5 py-4 pr-12 rounded-2xl border border-gray-100 bg-white focus:border-teal-500 focus:ring-0 outline-none text-base shadow-sm text-gray-700 placeholder:text-gray-400 font-medium transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-500" size={22} />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Main Category Filters */}
        <div className="px-2">
          <div className="flex flex-wrap gap-2 items-center justify-start">
             <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border shadow-sm flex-grow sm:flex-grow-0 text-center ${
                  selectedCategory === 'all'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-teal-200 transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                همه غذاها
              </button>
            {([
              'stew', 'polo', 'kabab', 'ash', 'soup', 'kuku', 'dolma', 
              'local', 'nani', 'fastfood', 'international', 'dessert'
            ] as DishCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border shadow-sm flex-grow sm:flex-grow-0 text-center ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white border-teal-600 shadow-teal-200 transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Dessert Sub-Filters */}
        {selectedCategory === 'dessert' && (
          <div className="mx-2 bg-pink-50/70 p-4 rounded-2xl border border-pink-100 animate-enter flex justify-center">
             <div className="flex gap-4">
                <button 
                  onClick={() => setDessertTab('iranian')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    dessertTab === 'iranian' 
                    ? 'bg-pink-500 text-white shadow-pink-200 scale-105' 
                    : 'bg-white text-pink-500 border border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  دسرهای ایرانی
                </button>
                <button 
                  onClick={() => setDessertTab('international')}
                  className={`px-6 py-2 rounded-xl font-bold transition-all shadow-sm ${
                    dessertTab === 'international' 
                    ? 'bg-pink-500 text-white shadow-pink-200 scale-105' 
                    : 'bg-white text-pink-500 border border-pink-200 hover:bg-pink-50'
                  }`}
                >
                  دسرهای بین‌المللی
                </button>
             </div>
          </div>
        )}
        
        {/* Sub-Filters (International) */}
        {selectedCategory === 'international' && (
          <div className="mx-2 bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 animate-enter">
            <div className="flex items-center gap-2 mb-3 text-indigo-800">
              <Globe2 size={18} />
              <span className="font-bold text-sm">کشور مورد نظر را انتخاب کنید:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedNationality(null)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  !selectedNationality 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                  : 'bg-white text-indigo-600 border-indigo-200 hover:border-indigo-300'
                }`}
              >
                همه ملل
              </button>
              
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedNationality(c.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
                    selectedNationality === c.code 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                    : 'bg-white text-indigo-600 border-indigo-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Invisible anchor for scrolling */}
      <div id="results-anchor" className="h-1"></div>

      {/* Results Header Toolbar */}
      <div className="sticky top-0 bg-gray-50/95 backdrop-blur-md z-20 px-4 py-3 mb-6 shadow-sm border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all">
        <div className="flex items-center gap-2 text-gray-600">
          <Filter size={18} className="text-teal-600" />
          <span className="font-bold text-sm">
            {filteredDishes.length} نتیجه
          </span>
          {(searchTerm || selectedCategory !== 'all' || selectedNationality) && (
             <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-gray-500">فیلتر شده</span>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
          {/* User: Dislike Button */}
          <button
            type="button"
            onClick={() => toggleSelectionMode('user_blacklist')}
            disabled={selectionMode === 'admin_delete'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex-shrink-0 ${
              selectionMode === 'user_blacklist'
                ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-inner'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40'
            }`}
          >
            {selectionMode === 'user_blacklist' ? <XSquare size={16} /> : <Ban size={16} />}
            {selectionMode === 'user_blacklist' ? 'لغو انتخاب' : 'غذاهایی که دوست ندارم'}
          </button>

          {/* Admin Only: Global Delete */}
          {user.isAdmin && (
            <button
              type="button"
              onClick={() => toggleSelectionMode('admin_delete')}
              disabled={selectionMode === 'user_blacklist'}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex-shrink-0 ${
                selectionMode === 'admin_delete'
                  ? 'bg-red-100 text-red-800 border-red-300 shadow-inner'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-40'
              }`}
            >
              {selectionMode === 'admin_delete' ? <XSquare size={16} /> : <Trash2 size={16} />}
              {selectionMode === 'admin_delete' ? 'لغو مدیریت' : 'مدیریت (حذف دائمی)'}
            </button>
          )}
        </div>
      </div>

      {/* Info Banner for Modes */}
      {selectionMode !== 'none' && (
         <div className={`mx-4 mb-4 text-center px-4 py-2 rounded-xl border animate-pulse ${
           selectionMode === 'admin_delete' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'
         }`}>
            <span className="text-sm font-bold flex items-center justify-center gap-2">
              {selectionMode === 'admin_delete' 
                ? <><ShieldAlert size={18} /> حالت مدیریت: غذاهای انتخاب شده به طور کامل از اپلیکیشن حذف خواهند شد.</> 
                : <><Ban size={18} /> حالت شخصی: غذاهای انتخاب شده دیگر به شما پیشنهاد نخواهند شد.</>}
            </span>
         </div>
      )}

      {actionMessage && (
        <div className={`mx-4 mb-8 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 shadow-lg ${
          actionMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-emerald-50' : 'bg-red-50 border-red-200 text-red-700 shadow-red-50'
        }`}>
          <CheckCircle2 size={24} className="flex-shrink-0" />
          <span className="font-bold text-lg">{actionMessage.text}</span>
        </div>
      )}

      {/* Grid of Dishes */}
      <div 
        key={`${selectedCategory}-${selectedNationality}-${searchTerm}-${currentPage}-${dataVersion}-${dessertTab}`} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      >
        {paginatedDishes.map(dish => {
           const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
           const isChecked = checkedItems.has(dish.id);
           const isSelectMode = selectionMode !== 'none';
           
           return (
            <div 
              key={dish.id}
              onClick={() => {
                if (isSelectMode) {
                  toggleCheck(dish.id);
                } else {
                  setSelectedDish(dish);
                }
              }}
              className={`
                group relative bg-white rounded-3xl p-0 shadow-sm hover:shadow-xl border transition-all duration-300 flex flex-col h-full overflow-hidden
                ${isSelectMode ? 'cursor-pointer' : 'cursor-pointer hover:-translate-y-1'}
                ${isChecked 
                  ? (selectionMode === 'admin_delete' ? 'border-red-500 ring-4 ring-red-50 shadow-red-200' : 'border-amber-500 ring-4 ring-amber-50 shadow-amber-200') 
                  : 'border-gray-100'}
              `}
            >
              {isSelectMode && (
                <div className={`absolute top-3 left-3 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-20 shadow-md ${
                  isChecked 
                  ? (selectionMode === 'admin_delete' ? 'bg-red-500 border-red-500 scale-110' : 'bg-amber-500 border-amber-500 scale-110')
                  : 'border-white bg-white/80 backdrop-blur-sm text-gray-300'
                }`}>
                  {isChecked 
                    ? <CheckSquare size={18} className="text-white" /> 
                    : <div className="w-4 h-4 rounded-sm border border-gray-300"></div>}
                </div>
              )}

              {/* Image Section */}
              <div className="relative h-44 w-full bg-gray-100">
                 <DishVisual 
                   category={dish.category} 
                   className="w-full h-full transition-transform duration-700 group-hover:scale-105" 
                   iconSize={56} 
                   imageUrl={dish.imageUrl} 
                   dishId={dish.id}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                 
                 <div className="absolute bottom-3 right-3 text-white flex gap-1 flex-wrap pr-1">
                    {dish.nationality === 'tr' && <span className="bg-red-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">ترکیه</span>}
                    {dish.nationality === 'ar' && <span className="bg-green-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">عربی</span>}
                    {dish.nationality === 'it' && <span className="bg-emerald-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">ایتالیا</span>}
                    {dish.nationality === 'in' && <span className="bg-orange-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">هند</span>}
                    {dish.nationality === 'mx' && <span className="bg-green-700/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">مکزیک</span>}
                    {dish.nationality === 'jp' && <span className="bg-rose-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">ژاپن</span>}
                    {dish.nationality === 'fr' && <span className="bg-blue-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">فرانسه</span>}
                    {dish.nationality === 'uk' && <span className="bg-blue-800/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">انگلیس</span>}
                    {dish.nationality === 'pk' && <span className="bg-green-800/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">پاکستان</span>}
                    {dish.nationality === 'ru' && <span className="bg-blue-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">روسیه</span>}
                    {dish.nationality === 'uz' && <span className="bg-blue-400/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">ازبکستان</span>}
                    {dish.nationality === 'us' && <span className="bg-blue-600/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">آمریکا</span>}
                    {dish.nationality === 'es' && <span className="bg-yellow-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">اسپانیا</span>}
                    {dish.nationality === 'de' && <span className="bg-black/80 text-white border border-white/20 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">آلمان</span>}
                    {dish.nationality === 'gr' && <span className="bg-blue-400/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">یونان</span>}
                    {dish.nationality === 'au' && <span className="bg-blue-900/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">استرالیا</span>}
                    {dish.nationality === 'at' && <span className="bg-red-500/90 text-white px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">اتریش</span>}
                    
                    <span className="bg-black/30 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded-md text-[10px] font-bold shadow-sm">
                      {CATEGORY_LABELS[dish.category]}
                    </span>
                 </div>
              </div>

              {/* Content Section */}
              <div className="p-4 flex flex-col flex-grow bg-white relative z-10">
                <h3 className={`font-bold text-base mb-1.5 transition-colors line-clamp-1 ${
                  isChecked 
                  ? (selectionMode === 'admin_delete' ? 'text-red-700' : 'text-amber-700') 
                  : 'text-gray-800 group-hover:text-teal-700'
                }`}>
                  {dish.name}
                </h3>
                
                <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed h-8">
                   {dish.description}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                   {!isSelectMode && (
                    <div className={`text-[10px] font-bold flex items-center gap-1 ${hasRecipe ? 'text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md' : 'text-gray-400 bg-gray-50 px-2 py-1 rounded-md'}`}>
                      {hasRecipe ? (
                        <>
                           <BookOpen size={12} />
                           دستور کامل
                        </>
                      ) : (
                        <>
                           <BookX size={12} />
                           بدون دستور
                        </>
                      )}
                    </div>
                  )}
                  
                  {!isSelectMode && (
                     <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                        <Utensils size={14} />
                     </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8 py-6">
          <button 
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              document.getElementById('results-anchor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
          
          <span className="font-bold text-gray-600 text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
            صفحه {currentPage} از {totalPages}
          </span>

          <button 
            onClick={() => {
               setCurrentPage(p => Math.min(totalPages, p + 1));
               document.getElementById('results-anchor')?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200 hover:bg-teal-50 hover:text-teal-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredDishes.length === 0 && (
        <div className="col-span-full text-center py-16 text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-200 mx-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
             <Search size={32} className="opacity-40" />
          </div>
          <p className="text-lg font-bold text-gray-600">غذایی یافت نشد</p>
          <p className="text-xs mt-1 opacity-60">لطفا عبارت جستجو یا فیلترها را تغییر دهید.</p>
        </div>
      )}

      {/* Bulk Action Button (Floating) */}
      {selectionMode !== 'none' && checkedItems.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in zoom-in duration-300 w-full max-w-sm px-4">
          <button
            type="button"
            onClick={handleAction}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-white rounded-2xl shadow-xl active:scale-95 transition-all font-bold text-base border-2 border-white/10 ${
              selectionMode === 'admin_delete' 
              ? 'bg-red-600 shadow-red-900/20 hover:bg-red-700' 
              : 'bg-amber-600 shadow-amber-900/20 hover:bg-amber-700'
            }`}
          >
            {selectionMode === 'admin_delete' ? <Trash2 size={20} /> : <Ban size={20} />}
            {selectionMode === 'admin_delete' ? `حذف دائمی ${checkedItems.size} غذا` : `افزودن ${checkedItems.size} غذا به لیست سیاه من`}
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDish && (
        <RecipeModal 
          dish={selectedDish} 
          isOpen={!!selectedDish} 
          onClose={() => setSelectedDish(null)} 
        />
      )}
    </div>
  );
};

export default RecipeSearch;
