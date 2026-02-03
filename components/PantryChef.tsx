
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChefHat, Sparkles, Search, CheckCircle2, AlertCircle, ShoppingCart, X, Drumstick, Wheat, Carrot, UtensilsCrossed, ArrowLeft, Layers, Trophy, Weight, ShieldCheck, Heart, Leaf, Lock, ChevronDown, ChevronUp, BarChart3, ListChecks } from 'lucide-react';
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
const GRAIN_ITEMS = PANTRY_ITEMS.find(c => c.id === 'grains')?.items || [];
const VEG_ITEMS = PANTRY_ITEMS.find(c => c.id === 'vegetables')?.items || [];

const cleanText = (text: string) => {
  if (!text) return "";
  return text
    .replace(/ی/g, 'ی')
    .replace(/ک/g, 'ک')
    .replace(/‌/g, ' ')
    .toLowerCase()
    .trim();
};

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
  const [results, setResults] = useState<{ dish: Dish, available: string[], missing: { name: string, isAdditive: boolean }[], score: number, coreMissingCount: number }[] | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const [challengeWarning, setChallengeWarning] = useState<string | null>(null);

  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const toggleItem = (item: string) => {
    if (user.dislikedIngredients?.includes(item)) {
       setChallengeWarning(`شما این مورد (${item}) را در لیست ممنوعه‌های خود قرار داده‌اید.`);
       setTimeout(() => setChallengeWarning(null), 5000);
       return;
    }
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setResults(null);
  };

  const handleDishClick = (dish: Dish) => {
    const isAccessible = RecipeService.isDishAccessible(dish.id, user);
    if (!isAccessible) {
      alert("مشترک گرامی، دسترسی به این دستور پخت محدود به اعضای ویژه می‌باشد.");
      return;
    }
    setSelectedDish(dish);
  };

  const findRecipes = () => {
    if (selectedItems.length === 0) return;
    setIsSearching(true);
    
    setTimeout(() => {
      let allDishes = RecipeService.getAllDishes();
      
      allDishes = allDishes.filter(d => !user.blacklistedDishIds?.includes(d.id));
      if (user.excludedCategories?.length) {
        allDishes = allDishes.filter(d => !user.excludedCategories.includes(d.category));
      }

      const processedResults = allDishes.map(dish => {
        let score = 0;
        const available: string[] = [];
        const missing: { name: string, isAdditive: boolean }[] = [];
        
        dish.ingredients.forEach(ing => {
          const ingredientName = cleanText(ing.item);
          let isMatch = false;
          let matchedSelection = "";

          for (const selected of selectedItems) {
            const sel = cleanText(selected);
            
            // ۱. منطق هوشمند گوشت گوساله و گاو (شامل تمام قطعات)
            if (sel === "گوشت گوساله") {
              if (ingredientName.includes("گوساله") || ingredientName.includes("گاو") || ingredientName.includes("استیک") || ingredientName.includes("راسته") || ingredientName.includes("فیله")) {
                isMatch = true;
                matchedSelection = selected;
                break;
              }
            } 
            // ۲. منطق هوشمند گوشت گوسفندی (شامل ماهیچه، گردن و بره)
            else if (sel === "گوشت گوسفندی") {
              if (ingredientName.includes("گوسفند") || ingredientName.includes("بره") || ingredientName.includes("ماهیچه") || ingredientName.includes("گردن") || ingredientName.includes("سردست")) {
                isMatch = true;
                matchedSelection = selected;
                break;
              }
            }
            // ۳. منطق هوشمند مرغ (جلوگیری از تداخل با تخم مرغ و مرغوب)
            else if (sel === "مرغ") {
              const hasMorghoob = ingredientName.includes("مرغوب");
              const hasTokhmeMorgh = ingredientName.includes("تخم مرغ") || ingredientName.includes("تخم مرغ");
              if (!hasMorghoob && !hasTokhmeMorgh && (ingredientName.includes("مرغ") || ingredientName.includes("سینه") || ingredientName.includes("ران") || ingredientName.includes("کتف") || ingredientName.includes("بال"))) {
                isMatch = true;
                matchedSelection = selected;
                break;
              }
            }
            // ۴. فیلتر ویژه ماهی (جلوگیری از اشتباه با ماهیچه)
            else if (sel === "ماهی") {
              if (ingredientName.includes("ماهی") && !ingredientName.includes("ماهیچه")) {
                isMatch = true;
                matchedSelection = selected;
                break;
              }
            }
            // ۵. منطق هوشمند گوشت چرخ‌کرده
            else if (sel === "گوشت چرخ‌کرده") {
              if (ingredientName.includes("چرخ کرده") || ingredientName.includes("چرخ‌کرده")) {
                isMatch = true;
                matchedSelection = selected;
                break;
              }
            }
            // ۶. تطبیق عمومی سایر موارد
            else if (ingredientName.includes(sel)) {
              isMatch = true;
              matchedSelection = selected;
              break;
            }
          }

          if (isMatch) {
            available.push(ing.item);
            if (PROTEIN_ITEMS.includes(matchedSelection)) score += 1000000;
            else if (GRAIN_ITEMS.includes(matchedSelection)) score += 10000;
            else if (VEG_ITEMS.includes(matchedSelection)) score += 100;
            else score += 1;
          } else {
            const isAdditive = SPICES_AND_ADDITIVES.some(s => ingredientName.includes(cleanText(s)));
            missing.push({ name: ing.item, isAdditive });
          }
        });

        const coreMissingCount = missing.filter(m => !m.isAdditive).length;
        return { dish, available, missing, score, coreMissingCount };
      }).filter(res => res.available.length > 0);

      const sortedResults = processedResults.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.coreMissingCount - b.coreMissingCount;
      });

      setResults(sortedResults);
      setIsSearching(false);
      setTimeout(() => {
        const resultsEl = document.getElementById('pantry-results');
        if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 600);
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

  const priorityCount = results?.filter(r => r.score >= 1000000).length || 0;

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
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight mb-0 text-halo">آشپز برتر: اولویت با پروتئین انتخابی شما و کمترین نیاز به تهیه مواد است</h2>
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

      {results && (
        <div id="pantry-results" className="space-y-10 animate-enter pt-12">
          
          {/* پنل هوشمند نمایش تعداد نتایج یافت شده */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 animate-enter">
            <div className="flex items-center gap-6 text-center sm:text-right">
              <div className="p-4 bg-teal-500 text-navy-950 rounded-3xl shadow-lg shadow-teal-500/20">
                <BarChart3 size={32} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 leading-none">نتایج آنالیز قفسه شما</h3>
                <p className="text-[11px] text-slate-500 font-bold mt-2 uppercase tracking-widest">Recipe Match Analysis</p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-8 items-center bg-white/80 p-2 rounded-[2rem] border border-slate-100 shadow-inner">
               <div className="px-6 py-4 flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900 leading-none mb-1">{toPersianDigits(results.length)}</span>
                  <span className="text-[10px] font-black text-slate-400">کل پیشنهادات</span>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="px-6 py-4 flex flex-col items-center">
                  <span className="text-3xl font-black text-rose-600 leading-none mb-1">{toPersianDigits(priorityCount)}</span>
                  <span className="text-[10px] font-black text-rose-400">اولویت اصلی</span>
               </div>
               <div className="w-px h-12 bg-slate-200"></div>
               <div className="px-6 py-4 flex flex-col items-center">
                  <span className="text-3xl font-black text-teal-600 leading-none mb-1">{toPersianDigits(results.length - priorityCount)}</span>
                  <span className="text-[10px] font-black text-teal-400">سایر موارد</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {results.map(({ dish, available, missing, score, coreMissingCount }) => {
              const isAccessible = RecipeService.isDishAccessible(dish.id, user);
              const hasHighPriority = score >= 1000000;

              return (
                <div key={dish.id} className={`bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] hover:scale-[1.05] hover:z-50 transition-all duration-500 border border-slate-50 flex flex-col group ${!isAccessible ? 'grayscale opacity-75' : ''}`}>
                  <div className="h-64 relative cursor-pointer overflow-hidden" onClick={() => handleDishClick(dish)}>
                    <DishVisual category={dish.category} className="w-full h-full transition-transform duration-1000 group-hover:scale-125 group-hover:brightness-110" imageUrl={dish.imageUrl} dishId={dish.id} />
                    
                    {hasHighPriority && (
                      <div className="absolute top-6 left-6 flex flex-col gap-2 items-start z-30">
                        <div className="bg-rose-600 text-white px-5 py-2 rounded-full text-[10px] font-black shadow-xl flex items-center gap-2 animate-pulse">
                          <Trophy size={14} /> پیشنهاد ویژه (پروتئین انتخابی)
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-8 right-8 text-white z-30">
                      <h4 className="text-2xl font-black mb-1 drop-shadow-lg flex items-center gap-2">
                        {dish.name}
                        {!isAccessible && <Lock size={18} className="text-white/60" />}
                      </h4>
                      <div className="flex items-center gap-2 opacity-90 font-bold text-xs"><UtensilsCrossed size={14} className="text-teal-400" /><span>{toPersianDigits(dish.cookTime || 60)} دقیقه</span></div>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow bg-gradient-to-b from-white to-slate-50/30">
                    <div className="space-y-6 mb-10">
                      <div className="bg-white p-5 rounded-3xl border border-teal-100 shadow-sm">
                         <span className="text-[10px] font-black text-teal-600 block mb-3 flex items-center gap-2">
                           <CheckCircle2 size={12}/> مواد موجود شما در این غذا:
                         </span>
                         <div className="flex flex-wrap gap-2">
                           {available.map(i => (
                             <span key={i} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-xl text-[10px] font-black border border-teal-200">
                               {i}
                             </span>
                           ))}
                         </div>
                      </div>

                      {missing.length > 0 && (
                        <div className="bg-white p-5 rounded-3xl border border-rose-100 shadow-sm">
                          <span className="text-[10px] font-black text-rose-500 block mb-3 flex items-center gap-2">
                            <AlertCircle size={12}/> باید تهیه کنید ({toPersianDigits(coreMissingCount)} قلم اصلی):
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {missing.map(m => (
                              <span key={m.name} className={`px-3 py-1.5 rounded-xl text-[10px] font-black border ${m.isAdditive ? 'bg-slate-50 text-slate-400 border-slate-100' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                                {m.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                      {missing.length > 0 && (
                        <button onClick={(e) => handleAddMissingToCart(e, missing, dish.name)} className={`w-full py-5 rounded-[2rem] text-sm font-black flex items-center justify-center gap-3 transition-all ${addingToCartId === dish.name ? 'bg-emerald-500 text-white shadow-lg scale-[0.98]' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                          {addingToCartId === dish.name ? <CheckCircle2 size={20} /> : <ShoppingCart size={20}/>} 
                          خرید {toPersianDigits(coreMissingCount)} مورد کسری
                        </button>
                      )}
                      <button onClick={() => handleDishClick(dish)} className={`w-full py-5 rounded-[2rem] font-black text-sm transition-all shadow-xl flex items-center justify-center gap-2 ${isAccessible ? 'bg-slate-950 text-white hover:bg-teal-600' : 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse'}`}>
                        {isAccessible ? 'مشاهده دستور پخت' : 'ارتقای حساب (اعضای ویژه)'} 
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
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default PantryChef;
