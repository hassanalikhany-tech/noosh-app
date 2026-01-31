
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChefHat, Sparkles, Search, CheckCircle2, AlertCircle, ShoppingCart, X, Drumstick, Wheat, Carrot, UtensilsCrossed, ArrowLeft, Layers, Trophy, Weight, ShieldCheck, Heart, Leaf, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { PANTRY_ITEMS, SPICES_AND_ADDITIVES } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { UserService } from '../services/userService';
import { Dish, UserProfile, ShoppingItem } from '../types';
import RecipeModal from './RecipeModal';
import DishVisual from './DishVisual';

interface PantryChefProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

const PROTEIN_ITEMS = PANTRY_ITEMS.find(c => c.id === 'proteins')?.items || [];
const MEAT_KEYWORDS = ['گوشت', 'مرغ', 'ماهی', 'میگو', 'فیله', 'ماهیچه', 'گردن', 'سردست', 'راسته', 'کباب', 'بوقلمون', 'بلدرچین'];

// کامپوننت داخلی برای مدیریت اسکرول و نمایش فلش‌ها در هر دسته
const CategoryItemsList: React.FC<{
  items: string[];
  selectedItems: string[];
  dislikedIngredients: string[];
  toggleItem: (item: string) => void;
}> = ({ items, selectedItems, dislikedIngredients, toggleItem }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      const hasMoreBottom = el.scrollHeight > el.clientHeight + el.scrollTop + 5;
      const hasMoreTop = el.scrollTop > 10;
      setShowBottomArrow(hasMoreBottom);
      setShowTopArrow(hasMoreTop);
    }
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    return () => clearTimeout(timer);
  }, [items]);

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ 
        top: scrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="relative flex flex-col h-full group/list">
      {/* فلش بالا */}
      {showTopArrow && (
        <button 
          onClick={scrollToTop}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 p-1.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-teal-600 animate-bounce hover:bg-teal-50 transition-all"
        >
          <ChevronUp size={14} strokeWidth={3} />
        </button>
      )}

      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex flex-wrap gap-2 overflow-y-auto h-64 no-scrollbar pr-0.5 pb-6"
      >
        {items.map((item) => {
          const isSel = selectedItems.includes(item);
          const isForbidden = dislikedIngredients?.includes(item);
          return (
            <button 
              key={item} 
              onClick={() => toggleItem(item)} 
              className={`flex-grow px-3 py-4 rounded-xl text-xs sm:text-2xl font-black transition-all border-2 text-center leading-tight ${
                isSel ? 'bg-teal-500 border-teal-500 text-navy-950 shadow-md scale-95' : 
                isForbidden ? 'bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed' : 
                'bg-slate-50 border-transparent text-slate-500 hover:border-teal-200'
              }`}
            >
              {item} {isForbidden && <AlertCircle size={12} className="inline mr-1"/>}
            </button>
          )
        })}
      </div>

      {/* فلش پایین */}
      {showBottomArrow && (
        <button 
          onClick={scrollToBottom}
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-30 p-1.5 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-teal-600 animate-bounce hover:bg-teal-50 transition-all"
        >
          <ChevronDown size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

const PantryChef: React.FC<PantryChefProps> = ({ user, onUpdateUser }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [pantrySearchTerm, setPantrySearchTerm] = useState('');
  const [results, setResults] = useState<{ dish: Dish, available: string[], missing: { name: string, isAdditive: boolean }[], matchCount: number, isProteinBoost?: boolean, proteinDensity?: number }[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [challengeWarning, setChallengeWarning] = useState<string | null>(null);

  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const toggleItem = (item: string) => {
    if (user.dislikedIngredients?.includes(item)) {
       setChallengeWarning(`شما این مورد (${item}) را در لیست ممنوعه‌های خود قرار داده‌اید. اگر قصد استفاده دارید ابتدا آن را از تنظیمات حذف کنید.`);
       setTimeout(() => setChallengeWarning(null), 5000);
       return;
    }

    if (user.activeChallengeId === 'vegan-week' && !selectedItems.includes(item)) {
       const isProtein = PROTEIN_ITEMS.includes(item);
       const isEgg = item.includes('تخم مرغ');
       if (isProtein && !isEgg) {
          setChallengeWarning("شما با شرکت در چالش هفته گیاهخواری مجاز به استفاده از مواد پروتیینی نمی باشید . اگر اصراری بر تهیه غذا های حاوی مواد پروتیینی دارید لطفا چالش هفته گیاهخواری را غیر فعال فرمایید");
          setTimeout(() => setChallengeWarning(null), 8000);
          return;
       }
    }
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setResults(null);
  };

  const handleDishClick = (dish: Dish) => {
    const isAccessible = RecipeService.isDishAccessible(dish.id, user);
    if (!isAccessible) {
      alert("مشترک گرامی، دسترسی به این دستور پخت محدود به اعضای ویژه می‌باشد. با پرداخت حق اشتراک و تایید نهایی حساب توسط مدیریت، می‌توانید از تمام امکانات و محتوای این اپلیکیشن استفاده کامل را بنمایید.");
      return;
    }
    setSelectedDish(dish);
  };

  const findRecipes = () => {
    if (selectedItems.length === 0) return;
    setIsSearching(true);
    
    window.dispatchEvent(new CustomEvent('trigger-trust-banner'));
    
    setTimeout(() => {
      let allDishes = RecipeService.getAllDishes();
      
      allDishes = allDishes.filter(d => !user.blacklistedDishIds?.includes(d.id));
      if (user.excludedCategories?.length) {
        allDishes = allDishes.filter(d => !user.excludedCategories.includes(d.category));
      }

      if (user.dislikedIngredients?.length) {
        allDishes = allDishes.filter(dish => {
          const inName = user.dislikedIngredients.some(f => dish.name.includes(f));
          const inIngs = dish.ingredients.some(ing => user.dislikedIngredients.some(f => ing.item.includes(f)));
          return !inName && !inIngs;
        });
      }

      if (user.dietMode) allDishes = allDishes.filter(d => (d.calories || 400) < 500);
      if (user.preferredNatures?.length) allDishes = allDishes.filter(d => user.preferredNatures.includes(d.nature || 'balanced'));

      if (user.activeChallengeId === 'vegan-week') {
          allDishes = allDishes.filter(dish => {
              const nameMatch = MEAT_KEYWORDS.some(kw => dish.name.includes(kw));
              const ingredientMatch = dish.ingredients.some(ing => MEAT_KEYWORDS.some(kw => ing.item.includes(kw)));
              return !nameMatch && !ingredientMatch;
          });
      }

      const normSelected = selectedItems.map(i => i.toLowerCase().trim());
      const processedResults = allDishes.map(dish => {
        let matchCount = 0;
        const available: string[] = [];
        const missing: { name: string, isAdditive: boolean }[] = [];
        dish.ingredients.forEach(ing => {
          const itemName = ing.item.toLowerCase().trim();
          const isSelected = normSelected.some(s => itemName.includes(s));
          const isAdditive = SPICES_AND_ADDITIVES.some(s => itemName.includes(s.toLowerCase()));
          if (isSelected) { available.push(ing.item); matchCount++; } 
          else { missing.push({ name: ing.item, isAdditive }); }
        });
        const proteinDensity = dish.ingredients.filter(ing => MEAT_KEYWORDS.some(kw => ing.item.includes(kw))).length;
        const isProteinBoost = user.activeChallengeId === 'protein-power' && (dish.category === 'kabab' || proteinDensity >= 2);
        return { dish, available, missing, matchCount, isProteinBoost, proteinDensity };
      }).filter(res => res.matchCount > 0);

      const sortedResults = processedResults.sort((a, b) => {
        if (user.activeChallengeId === 'protein-power') {
           if (a.dish.category === 'kabab' && b.dish.category !== 'kabab') return -1;
           if (a.dish.category !== 'kabab' && b.dish.category === 'kabab') return 1;
           if (b.proteinDensity !== a.proteinDensity) return (b.proteinDensity || 0) - (a.proteinDensity || 0);
        }
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
        const aCoreMissing = a.missing.filter(m => !m.isAdditive).length;
        const bCoreMissing = b.missing.filter(m => !m.isAdditive).length;
        return aCoreMissing - bCoreMissing;
      });
      setResults(sortedResults);
      setIsSearching(false);
      setTimeout(() => document.getElementById('pantry-results')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }, 500);
  };

  const handleAddMissingToCart = (e: React.MouseEvent, missingItems: { name: string }[], dishName: string) => {
    e.stopPropagation();
    if (!user) return;
    
    setAddingToCartId(dishName);
    const newItems: ShoppingItem[] = missingItems.map(item => ({
      id: `missing-${Date.now()}-${Math.random()}`,
      name: item.name,
      checked: false,
      fromRecipe: dishName
    }));

    const updatedList = [...(user.customShoppingList || []), ...newItems];
    onUpdateUser({ ...user, customShoppingList: updatedList });
    UserService.updateShoppingList(user.username, updatedList);
    
    setTimeout(() => setAddingToCartId(null), 1500);
  };

  const filteredCategories = useMemo(() => {
    if (!pantrySearchTerm) return PANTRY_ITEMS;
    return PANTRY_ITEMS.map(cat => ({
      ...cat,
      items: cat.items.filter(i => i.includes(pantrySearchTerm))
    })).filter(cat => cat.items.length > 0);
  }, [pantrySearchTerm]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-32 px-2 sm:px-4 dir-rtl text-right">
      {challengeWarning && (
        <div className="fixed inset-x-4 top-24 z-50 animate-bounce">
          <div className="max-w-md mx-auto bg-rose-600 text-white p-6 rounded-3xl shadow-2xl flex items-start gap-4 border-2 border-white/20">
             <AlertCircle size={32} className="flex-shrink-0" />
             <p className="text-xs font-black leading-relaxed">{challengeWarning}</p>
             <button onClick={() => setChallengeWarning(null)} className="p-1 hover:bg-white/10 rounded-lg"><X size={18}/></button>
          </div>
        </div>
      )}

      <div className="relative group overflow-hidden metallic-navy rounded-[2.5rem] p-6 sm:p-10 shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 relative z-10">
          <div className="flex items-center gap-6 sm:gap-8 text-center lg:text-right flex-col lg:flex-row">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-400 to-teal-600 text-white rounded-2xl sm:rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-teal-500/40 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <ChefHat size={32} strokeWidth={1.5} className="sm:hidden" />
              <ChefHat size={56} strokeWidth={1.5} className="hidden sm:block" />
            </div>
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight mb-0 text-halo">آشپز برتر بر اساس مواد موجود و فیلترهای شخصی شما پیشنهاد می‌دهد</h2>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group/search flex-grow sm:w-80">
              <input type="text" placeholder="جستجوی نام ماده غذایی..." value={pantrySearchTerm} onChange={(e) => setPantrySearchTerm(e.target.value)} className="w-full pr-14 pl-6 py-4 sm:py-5 bg-white/5 border-2 border-white/10 focus:border-teal-500 rounded-[1.5rem] sm:rounded-[2rem] outline-none font-black text-white placeholder:text-slate-500" />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/search:text-teal-400" size={24} />
            </div>
            <button onClick={findRecipes} disabled={selectedItems.length === 0 || isSearching} className="px-10 py-4 sm:py-5 bg-teal-500 hover:bg-teal-400 text-navy-950 rounded-[1.5rem] sm:rounded-[2rem] font-black shadow-lg transition-all flex items-center justify-center gap-3">
              {isSearching ? <div className="w-6 h-6 border-4 border-navy-950/30 border-t-navy-950 rounded-full animate-spin"></div> : <Sparkles size={24} />}
              <span className="text-base sm:text-lg tracking-tight">چی میشه پخت؟</span>
            </button>
          </div>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-enter px-2">
          <button onClick={() => setSelectedItems([])} className="px-4 py-2.5 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black flex items-center gap-1.5 transition-all">
            <X size={14} /> پاکسازی قفسه
          </button>
          {selectedItems.map(item => (
            <div key={item} className="px-4 py-2.5 bg-teal-500/10 text-teal-400 rounded-xl text-[10px] font-black flex items-center gap-1.5 border border-teal-500/20 shadow-sm animate-enter">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-glow"></span>
              {item}
              <button onClick={() => toggleItem(item)} className="mr-1 text-slate-500 hover:text-rose-500 transition-colors"><X size={14}/></button>
            </div>
          ))}
        </div>
      )}

      {/* چیدمان ۴ ستونه دسته‌بندی‌ها */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 shadow-sm border border-slate-100 flex flex-col h-[520px] hover:shadow-xl transition-all overflow-hidden">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-50 pb-6 shrink-0">
              <div className="p-3 sm:p-6 bg-slate-950 rounded-2xl sm:rounded-3xl text-white shadow-lg">
                {category.id === 'proteins' ? <Drumstick size={28}/> : category.id === 'grains' ? <Wheat size={28}/> : category.id === 'vegetables' ? <Carrot size={28}/> : <UtensilsCrossed size={28}/>}
              </div>
              <h3 className="font-black text-slate-800 text-base sm:text-4xl leading-tight">{category.title}</h3>
            </div>
            
            <div className="flex-grow overflow-hidden relative">
              <CategoryItemsList 
                items={category.items}
                selectedItems={selectedItems}
                dislikedIngredients={user.dislikedIngredients || []}
                toggleItem={toggleItem}
              />
            </div>
          </div>
        ))}
      </div>
      {/* ... مابقی کامپوننت بدون تغییر */}
      {results && (
        <div id="pantry-results" className="space-y-10 animate-enter pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map(({ dish, available, missing, matchCount, isProteinBoost, proteinDensity }) => {
              const isAccessible = RecipeService.isDishAccessible(dish.id, user);
              return (
                <div key={dish.id} className={`bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] hover:scale-[1.08] hover:z-50 transition-all duration-500 border ${isProteinBoost ? 'border-rose-400 ring-4 ring-rose-50' : 'border-slate-50'} flex flex-col group ${!isAccessible ? 'grayscale opacity-75' : ''}`}>
                  <div className="h-64 relative cursor-pointer overflow-hidden" onClick={() => handleDishClick(dish)}>
                    <DishVisual category={dish.category} className="w-full h-full transition-transform duration-1000 group-hover:scale-125 group-hover:brightness-110" imageUrl={dish.imageUrl} dishId={dish.id} />
                    {!isAccessible && (
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-20">
                        <div className="bg-white/95 p-5 rounded-[2rem] shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Lock size={32} className="text-rose-600" />
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
                      {isProteinBoost && <div className="bg-rose-600 text-white px-5 py-2 rounded-full text-[10px] font-black shadow-xl flex items-center gap-2 animate-pulse"><Trophy size={14} /> پیشنهاد ویژه</div>}
                      <div className="bg-white/90 backdrop-blur-sm text-indigo-700 px-4 py-1.5 rounded-full text-[10px] font-black shadow-xl flex items-center gap-1.5"><ShieldCheck size={12}/> بررسی شده</div>
                    </div>
                    <div className="absolute bottom-8 right-8 text-white">
                      <h4 className="text-2xl font-black mb-1 drop-shadow-lg flex items-center gap-2">
                        {dish.name}
                        {!isAccessible && <Lock size={18} className="text-white/60" />}
                      </h4>
                      <div className="flex items-center gap-2 opacity-90 font-bold text-xs"><UtensilsCrossed size={14} className="text-teal-400" /><span>{toPersianDigits(dish.cookTime || 60)} دقیقه</span></div>
                    </div>
                  </div>
                  <div className="p-10 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50/30">
                    <div className="space-y-6 mb-10">
                      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                         <span className="text-[10px] font-black text-teal-600 block mb-3 flex items-center gap-2"><CheckCircle2 size={12}/> موجود در خانه ({toPersianDigits(available.length)}):</span>
                         <div className="flex flex-wrap gap-2">{available.map(i => <span key={i} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-xl text-[10px] font-black border border-teal-100">{i}</span>)}</div>
                      </div>
                      {missing.length > 0 && (
                        <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                          <span className="text-[10px] font-black text-rose-500 block mb-3 flex items-center gap-2"><AlertCircle size={12}/> باید بخرید:</span>
                          <div className="flex flex-wrap gap-2">{missing.map(m => <span key={m.name} className={`px-3 py-1.5 rounded-xl text-[10px] font-black border ${m.isAdditive ? 'bg-slate-50 text-slate-400' : 'bg-rose-50 text-rose-700'}`}>{m.name}</span>)}</div>
                        </div>
                      )}
                      
                      <div className="relative overflow-hidden pt-4 border-t border-slate-100">
                         <p className={`text-slate-500 text-xs font-bold leading-relaxed transition-all duration-700 ${!isAccessible ? 'line-clamp-2' : 'line-clamp-2 group-hover:line-clamp-none'}`}>
                            {dish.description}
                         </p>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-4">
                      {missing.length > 0 && <button onClick={(e) => handleAddMissingToCart(e, missing, dish.name)} className={`w-full py-5 rounded-[2rem] text-sm font-black flex items-center justify-center gap-3 transition-all ${addingToCartId === dish.name ? 'bg-emerald-500 text-white shadow-lg scale-[0.98]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{addingToCartId === dish.name ? <CheckCircle2 size={20} /> : <ShoppingCart size={20}/>} خرید مواد کسری</button>}
                      <button onClick={() => handleDishClick(dish)} className={`w-full py-5 rounded-[2rem] font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${isAccessible ? 'bg-slate-950 text-white hover:bg-teal-600' : 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'}`}>
                        {isAccessible ? 'مشاهده دستور پخت' : 'ارتقای حساب کاربری (اعضای ویژه)'} 
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Fix: Replaced undefined setCurrentUser with the onUpdateUser prop */}
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default PantryChef;
