
import React, { useState, useMemo, useRef } from 'react';
import { ChefHat, Sparkles, Search, X, Drumstick, Wheat, Carrot, UtensilsCrossed, RefreshCw, Trash2, CheckCircle2, AlertCircle, Clock, Heart, Filter, Package, ListTodo, AlertTriangle, Plus, Minus, Save, ShoppingCart } from 'lucide-react';
import { PANTRY_ITEMS, getIngredientCategoryId } from '../data/pantry';
import { RecipeService } from '../services/recipeService';
import { Dish, UserProfile, InventoryItem } from '../types';
import { isIngredientMatch } from '../utils/recipeHelpers';
import { UserService } from '../services/userService';
import RecipeModal from './RecipeModal';
import MealCard from './MealCard';

interface PantryChefProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

type ResultFilter = 'all' | 'perfect' | 'near' | 'quick' | 'favorites';

interface ProcessedResult {
  dish: Dish;
  matchedItems: string[];
  missingItems: string[];
  isPerfect: boolean;
  missingCount: number;
  priorityScore: number;
  proteinMatchScore: number;
}

const CategoryItemsList: React.FC<{
  items: string[];
  selectedItems: string[];
  dislikedIngredients: string[];
  toggleItem: (item: string) => void;
}> = ({ items, selectedItems, dislikedIngredients, toggleItem }) => {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-y-auto h-full no-scrollbar pb-6">
      {items.map((item) => {
        const isSel = selectedItems.includes(item);
        const isForbidden = dislikedIngredients?.includes(item);
        return (
          <button 
            key={item} 
            onClick={() => toggleItem(item)} 
            className={`flex-grow px-3 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-[13px] font-black transition-all border-2 text-center shadow-sm ${
              isSel ? 'bg-teal-500 border-teal-500 text-white' : 
              isForbidden ? 'bg-rose-50 border-rose-100 text-rose-300 cursor-not-allowed opacity-50' : 
              'bg-slate-50 border-transparent text-slate-600 hover:border-teal-200'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  );
};

const PantryChef: React.FC<PantryChefProps> = ({ user, onUpdateUser }) => {
  const [activeTab, setActiveTab] = useState<'selection' | 'inventory'>('selection');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [pantrySearchTerm, setPantrySearchTerm] = useState('');
  const [rawResults, setRawResults] = useState<ProcessedResult[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<ResultFilter>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const resultsAreaRef = useRef<HTMLDivElement>(null);

  const inventory = useMemo(() => user.inventory || [], [user.inventory]);

  const lowStockItems = useMemo(() => {
    return inventory.filter(item => item.amount <= item.minThreshold);
  }, [inventory]);

  const toggleItem = (item: string) => {
    if (user?.dislikedIngredients?.includes(item)) return;
    setSelectedItems(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
    setRawResults(null);
  };

  const findRecipes = (itemsToUse?: string[]) => {
    const items = itemsToUse || selectedItems;
    if (items.length === 0) return;
    setIsSearching(true);
    setTimeout(() => {
      const all = RecipeService.getAllDishes();
      const processed: ProcessedResult[] = all.map(dish => {
        const matched = dish.ingredients.filter(ing => 
          items.some(s => isIngredientMatch(s, ing.item))
        ).map(i => i.item);
        
        const missing = dish.ingredients.filter(ing => !matched.includes(ing.item)).map(i => i.item);
        
        // Filter out additives from missing count as per user request
        const essentialMissing = missing.filter(item => {
          const catId = getIngredientCategoryId(item);
          return catId !== 'additives';
        });

        // Calculate priority score based on matched categories
        // Proteins (1) > Grains (2) > Vegetables (3)
        let priorityScore = 0;
        matched.forEach(item => {
          const catId = getIngredientCategoryId(item);
          if (catId === 'proteins') priorityScore += 100;
          else if (catId === 'grains') priorityScore += 10;
          else if (catId === 'vegetables') priorityScore += 1;
        });

        // Protein specific logic for prioritization
        const recipeProteins = dish.ingredients.filter(ing => getIngredientCategoryId(ing.item) === 'proteins').map(i => i.item);
        const selectedProteins = items.filter(item => getIngredientCategoryId(item) === 'proteins');
        
        const matchedProteins = recipeProteins.filter(rp => 
          selectedProteins.some(sp => isIngredientMatch(sp, rp))
        );
        const unmatchedProteins = recipeProteins.filter(rp => 
          !matchedProteins.includes(rp)
        );

        // Calculate protein match score
        // +1000 for each matched protein
        // -5000 for each unmatched protein (penalty for expensive unselected proteins)
        let proteinMatchScore = (matchedProteins.length * 1000) - (unmatchedProteins.length * 5000);

        return { 
          dish, 
          matchedItems: matched, 
          missingItems: missing, 
          isPerfect: essentialMissing.length === 0, 
          missingCount: essentialMissing.length,
          priorityScore, // Higher is better
          proteinMatchScore
        };
      })
      .filter(res => res.matchedItems.length > 0)
      .sort((a, b) => {
        // First priority: least essential missing items
        if (a.missingCount !== b.missingCount) {
          return a.missingCount - b.missingCount;
        }
        // Second priority: Protein Match Quality (Exact matches first, no unselected proteins)
        if (a.proteinMatchScore !== b.proteinMatchScore) {
          return b.proteinMatchScore - a.proteinMatchScore;
        }
        // Third priority: category score (Proteins > Grains > Vegetables)
        return b.priorityScore - a.priorityScore;
      });

      setRawResults(processed);
      setIsSearching(false);
      setActiveTab('selection');
      
      setTimeout(() => {
        resultsAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 600);
  };

  const updateInventoryItem = (itemId: string, updates: Partial<InventoryItem>) => {
    const newInventory = inventory.map(item => item.id === itemId ? { ...item, ...updates, lastUpdated: Date.now() } : item);
    // Optimistic update for immediate UI feedback
    onUpdateUser({ ...user, inventory: newInventory });
    // Sync with backend in background
    UserService.updateInventory(user.username, newInventory).catch(err => {
      console.error("Failed to sync inventory update:", err);
      // Optional: Rollback if sync fails significantly, but usually Firestore handles offline/sync
    });
  };

  const addToInventory = (itemName: string) => {
    if (inventory.some(i => i.name === itemName)) return;
    
    // Guess base unit based on common usage or category
    let defaultUnit = 'عدد';
    let defaultAmount = 1;
    let defaultThreshold = 0.5;

    const category = PANTRY_ITEMS.find(c => c.items.includes(itemName));
    if (category && (category.id === 'proteins' || category.id === 'grains' || category.id === 'vegetables')) {
      // Most of these are weight-based in recipes
      defaultUnit = 'کیلوگرم';
      defaultAmount = 1; // 1kg
      defaultThreshold = 0.2; // 200g
    }
    
    // Special cases
    if (itemName === 'تخم مرغ') {
      defaultUnit = 'عدد';
      defaultAmount = 6;
      defaultThreshold = 2;
    }

    const newItem: InventoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: itemName,
      amount: defaultAmount,
      unit: defaultUnit,
      minThreshold: defaultThreshold,
      lastUpdated: Date.now()
    };
    const newInventory = [...inventory, newItem];
    
    // Optimistic update
    onUpdateUser({ ...user, inventory: newInventory });
    // Sync in background
    UserService.updateInventory(user.username, newInventory).catch(err => {
      console.error("Failed to sync inventory add:", err);
    });
  };

  const removeFromInventory = (itemId: string) => {
    const newInventory = inventory.filter(item => item.id !== itemId);
    // Optimistic update
    onUpdateUser({ ...user, inventory: newInventory });
    // Sync in background
    UserService.updateInventory(user.username, newInventory).catch(err => {
      console.error("Failed to sync inventory remove:", err);
    });
  };

  const suggestFromInventory = () => {
    const availableItems = inventory.filter(i => i.amount > 0).map(i => i.name);
    findRecipes(availableItems);
  };

  const filteredResults = useMemo(() => {
    if (!rawResults) return null;
    switch (activeFilter) {
      case 'perfect': return rawResults.filter(r => r.isPerfect);
      case 'near': return rawResults.filter(r => r.missingCount > 0 && r.missingCount <= 2);
      case 'quick': return rawResults.filter(r => (r.dish.cookTime || 60) <= 45);
      case 'favorites': return rawResults.filter(r => user.favoriteDishIds?.includes(r.dish.id));
      default: return rawResults;
    }
  }, [rawResults, activeFilter, user.favoriteDishIds]);

  const filteredCategories = useMemo(() => {
    if (!pantrySearchTerm) return PANTRY_ITEMS;
    return PANTRY_ITEMS.map(cat => ({ ...cat, items: cat.items.filter(i => i.includes(pantrySearchTerm)) }))
      .filter(cat => cat.items.length > 0);
  }, [pantrySearchTerm]);

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const getResultCount = (filter: ResultFilter) => {
    if (!rawResults) return 0;
    switch (filter) {
      case 'perfect': return rawResults.filter(r => r.isPerfect).length;
      case 'near': return rawResults.filter(r => r.missingCount > 0 && r.missingCount <= 2).length;
      case 'quick': return rawResults.filter(r => (r.dish.cookTime || 60) <= 45).length;
      case 'favorites': return rawResults.filter(r => user.favoriteDishIds?.includes(r.dish.id)).length;
      default: return rawResults.length;
    }
  };

  return (
    <div className="flex flex-col h-full [@media(orientation:landscape)_and_(max-height:500px)]:h-auto animate-enter">
      {/* هدر شیشه‌ای دقیق با فونت استاندارد */}
      <div className="sticky top-0 [@media(orientation:landscape)_and_(max-height:500px)]:relative z-[900] bg-white/40 backdrop-blur-2xl px-4 py-3 sm:py-6 sm:px-10">
          <div className="backdrop-blur-3xl bg-white/50 border border-white/60 rounded-[1.75rem] sm:rounded-[3.5rem] p-4 sm:p-8 shadow-xl shadow-slate-200/50 relative overflow-hidden max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 text-right flex-row w-full lg:w-auto">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg"><ChefHat size={22} className="sm:w-8 sm:h-8" /></div>
                <div className="flex bg-slate-100 p-1 rounded-xl sm:rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setActiveTab('selection')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeTab === 'selection' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <ListTodo size={16} />
                    انتخاب سریع
                  </button>
                  <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${activeTab === 'inventory' ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    <Package size={16} />
                    سیستم انبارداری
                    {lowStockItems.length > 0 && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                <div className="relative flex-grow">
                   <input type="text" placeholder="جستجوی مواد غذایی..." value={pantrySearchTerm} onChange={(e) => setPantrySearchTerm(e.target.value)} className="w-full sm:w-64 px-10 sm:px-12 py-2.5 sm:py-4 bg-white border-2 border-slate-300 rounded-xl sm:rounded-2xl text-slate-800 font-black outline-none focus:border-teal-500 transition-all shadow-md placeholder:text-slate-400 text-xs sm:text-sm" />
                   <Search className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} sm:size={20} />
                </div>
                <button 
                  onClick={() => activeTab === 'selection' ? findRecipes() : suggestFromInventory()} 
                  className="w-full sm:w-auto px-6 py-2.5 sm:px-10 sm:py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-xl sm:rounded-2xl font-black shadow-lg flex items-center justify-center gap-2 sm:gap-3 transition-all active:scale-95 disabled:opacity-40 text-xs sm:text-sm" 
                  disabled={(activeTab === 'selection' ? selectedItems.length === 0 : inventory.length === 0) || isSearching}
                >
                  {isSearching ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  <span>{activeTab === 'selection' ? 'پیشنهاد غذا' : 'پیشنهاد از موجودی'}</span>
                </button>
              </div>
            </div>
          </div>
      </div>

      <div className="flex-grow overflow-y-auto [@media(orientation:landscape)_and_(max-height:500px)]:overflow-visible px-4 sm:px-10 pb-20 no-scrollbar">
          <div className="max-w-7xl mx-auto py-4 sm:py-6 space-y-6 sm:space-y-10">
              {activeTab === 'selection' ? (
                <>
                  {selectedItems.length > 0 && (
                    <div className="flex flex-wrap gap-2 animate-enter">
                      {selectedItems.map(item => (
                        <div key={item} className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-[9px] sm:text-xs font-black border border-teal-100 flex items-center gap-2 shadow-sm">
                          {item}
                          <button onClick={() => toggleItem(item)} className="hover:text-rose-500"><X size={12}/></button>
                        </div>
                      ))}
                      <button onClick={() => {setSelectedItems([]); setRawResults(null);}} className="px-3 py-1.5 bg-rose-50 text-rose-500 rounded-lg text-[9px] sm:text-xs font-black flex items-center gap-1 border border-rose-100 transition-all hover:bg-rose-100">
                        <Trash2 size={12}/> پاکسازی کل مواد
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredCategories.map(category => (
                      <div key={category.id} className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col h-[300px] sm:h-[400px]">
                        <div className="flex items-center gap-3 mb-4 border-b border-slate-50 pb-3">
                           <div className="p-2 bg-slate-100 text-slate-700 rounded-xl">
                              {category.id === 'proteins' ? <Drumstick size={18}/> : category.id === 'grains' ? <Wheat size={18}/> : category.id === 'vegetables' ? <Carrot size={18}/> : <UtensilsCrossed size={18}/>}
                           </div>
                           <h3 className="font-black text-slate-800 text-sm sm:text-base">{category.title}</h3>
                        </div>
                        <div className="flex-grow overflow-hidden">
                           <CategoryItemsList items={category.items} selectedItems={selectedItems} dislikedIngredients={user?.dislikedIngredients || []} toggleItem={toggleItem} />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-enter">
                  {/* بخش هشدار موجودی کم */}
                  {lowStockItems.length > 0 && (
                    <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                      <AlertTriangle className="text-rose-500 shrink-0 mt-1" size={20} />
                      <div className="flex-grow">
                        <h4 className="text-rose-800 font-black text-xs sm:text-sm">هشدار موجودی رو به اتمام!</h4>
                        <p className="text-rose-600 text-[10px] sm:text-xs mt-1">مواد زیر در آستانه تمام شدن هستند، پیشنهاد می‌شود به لیست خرید اضافه کنید:</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {lowStockItems.map(item => (
                            <div key={item.id} className="px-2 py-1 bg-white border border-rose-200 text-rose-700 rounded-lg text-[10px] font-black flex items-center gap-2">
                              {item.name} ({toPersian(item.amount)} {item.unit})
                              <button onClick={() => {
                                const currentList = user.customShoppingList || [];
                                if (!currentList.some(i => i.name === item.name)) {
                                  UserService.updateShoppingList(user.username, [...currentList, { id: Math.random().toString(), name: item.name, checked: false, amount: item.minThreshold * 2, unit: item.unit }]);
                                }
                              }} className="text-teal-600 hover:text-teal-700"><ShoppingCart size={14} /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* لیست موجودی فعلی */}
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-slate-800 font-black text-sm sm:text-base flex items-center gap-2">
                          <Package className="text-teal-500" size={20} />
                          موجودی انبار شما
                        </h3>
                        <span className="text-[10px] text-slate-400 font-black">آخرین بروزرسانی: {toPersian(inventory.length)} قلم کالا</span>
                      </div>
                      
                      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                        {inventory.length > 0 ? (
                          <div className="divide-y divide-slate-50">
                            {inventory.map(item => (
                              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.amount <= item.minThreshold ? 'bg-rose-100 text-rose-500' : 'bg-teal-50 text-teal-500'}`}>
                                    <UtensilsCrossed size={18} />
                                  </div>
                                  <div>
                                    <h4 className="text-slate-800 font-black text-xs sm:text-sm">{item.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[10px] text-slate-400">آستانه هشدار: {toPersian(item.minThreshold)} {item.unit}</span>
                                    </div>
                                  </div>
                                </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end gap-1">
                                      <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                        <button onClick={() => updateInventoryItem(item.id, { amount: Math.max(0, item.amount - (item.unit === 'کیلوگرم' ? 0.1 : 1)) })} className="p-1 hover:bg-white rounded-md text-slate-500 transition-all"><Minus size={14} /></button>
                                        <div className="px-3 min-w-[80px] text-center">
                                          <span className={`text-xs font-black ${item.amount <= item.minThreshold ? 'text-rose-600' : 'text-slate-700'}`}>{toPersian(Number(item.amount.toFixed(2)))}</span>
                                          <select 
                                            value={item.unit} 
                                            onChange={(e) => updateInventoryItem(item.id, { unit: e.target.value })}
                                            className="text-[9px] text-slate-400 mr-1 bg-transparent outline-none cursor-pointer hover:text-teal-500"
                                          >
                                            <option value="کیلوگرم">کیلوگرم</option>
                                            <option value="عدد">عدد</option>
                                            <option value="بسته">بسته</option>
                                            <option value="لیتر">لیتر</option>
                                          </select>
                                        </div>
                                        <button onClick={() => updateInventoryItem(item.id, { amount: item.amount + (item.unit === 'کیلوگرم' ? 0.1 : 1) })} className="p-1 hover:bg-white rounded-md text-slate-500 transition-all"><Plus size={14} /></button>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[8px] text-slate-400">آستانه هشدار:</span>
                                        <input 
                                          type="number" 
                                          value={item.minThreshold} 
                                          onChange={(e) => updateInventoryItem(item.id, { minThreshold: parseFloat(e.target.value) || 0 })}
                                          className="w-10 bg-transparent text-[8px] font-black text-slate-500 border-b border-slate-200 outline-none focus:border-teal-400 text-center"
                                        />
                                      </div>
                                    </div>
                                    <button onClick={() => removeFromInventory(item.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors"><Trash2 size={16} /></button>
                                  </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-20 text-center flex flex-col items-center gap-3">
                            <Package size={48} className="text-slate-100" />
                            <p className="text-slate-400 font-black text-xs">انبار شما خالی است. از لیست سمت راست کالاها را اضافه کنید.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* افزودن به انبار */}
                    <div className="space-y-4">
                      <h3 className="text-slate-800 font-black text-sm sm:text-base flex items-center gap-2">
                        <Plus className="text-teal-500" size={20} />
                        افزودن کالا به انبار
                      </h3>
                      <div className="bg-white border border-slate-100 rounded-[2rem] p-4 shadow-sm h-[500px] flex flex-col">
                        <div className="relative mb-4">
                          <input 
                            type="text" 
                            placeholder="جستجوی سریع..." 
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black outline-none focus:border-teal-500"
                            onChange={(e) => setPantrySearchTerm(e.target.value)}
                          />
                        </div>
                        <div className="flex-grow overflow-y-auto no-scrollbar space-y-4">
                          {filteredCategories.map(cat => (
                            <div key={cat.id}>
                              <h5 className="text-[10px] text-slate-400 font-black mb-2 px-2">{cat.title}</h5>
                              <div className="flex flex-wrap gap-1.5">
                                {cat.items.map(item => {
                                  const isInInv = inventory.some(i => i.name === item);
                                  return (
                                    <button 
                                      key={item}
                                      onClick={() => isInInv ? null : addToInventory(item)}
                                      className={`px-3 py-2 rounded-lg text-[10px] font-black border transition-all ${isInInv ? 'bg-teal-50 border-teal-100 text-teal-600 cursor-default' : 'bg-slate-50 border-transparent text-slate-600 hover:border-teal-200'}`}
                                    >
                                      {item}
                                      {isInInv && <CheckCircle2 size={10} className="inline-block mr-1" />}
                                    </button>
                                  )
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {rawResults && (
                <div ref={resultsAreaRef} className="space-y-6 sm:space-y-10 animate-enter pt-6 sm:pt-10 border-t border-slate-100 scroll-mt-24">
                  <div className="bg-white border border-slate-200 p-2 sm:p-4 rounded-2xl sm:rounded-[2.5rem] flex flex-wrap items-center gap-2 sm:gap-3 shadow-lg max-w-4xl mx-auto">
                     {[
                       { id: 'all', label: 'همه پیشنهادات', icon: Sparkles },
                       { id: 'perfect', label: 'آماده طبخ', icon: CheckCircle2 },
                       { id: 'near', label: 'کمبود جزئی', icon: AlertCircle },
                       { id: 'favorites', label: 'محبوب‌ها', icon: Heart },
                     ].map(filter => {
                       const count = getResultCount(filter.id as ResultFilter);
                       return (
                         <button 
                          key={filter.id}
                          onClick={() => setActiveFilter(filter.id as ResultFilter)}
                          className={`flex-grow px-3 py-2.5 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl text-[9px] sm:text-xs font-black flex items-center justify-center gap-1.5 sm:gap-2 transition-all border-2 ${activeFilter === filter.id ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-transparent text-slate-500 hover:border-slate-200'}`}
                         >
                           <filter.icon size={12} sm:size={16} />
                           {filter.label}
                           <span className={`px-1.5 py-0.5 rounded-md text-[8px] sm:text-[10px] ${activeFilter === filter.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                             ({toPersian(count)})
                           </span>
                         </button>
                       )
                     })}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 pb-10">
                    {filteredResults && filteredResults.length > 0 ? filteredResults.map(({ dish, missingCount, isPerfect }) => (
                      <div key={dish.id} className="relative animate-enter">
                        {isPerfect && <div className="absolute -top-2 -right-2 z-20 bg-emerald-500 text-white px-3 py-1 rounded-lg shadow-xl border-2 border-white font-black text-[8px] sm:text-[10px]">آماده طبخ</div>}
                        <MealCard plan={{ dayName: isPerfect ? 'کامل' : `${toPersian(missingCount)} کسری`, dish }} user={user} onUpdateUser={onUpdateUser} />
                      </div>
                    )) : (
                      <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center gap-3">
                          <ChefHat size={40} className="text-slate-100" />
                          <p className="text-slate-400 font-black text-sm italic">غذایی با مواد انتخابی یافت نشد.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
      </div>
      {selectedDish && <RecipeModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} user={user} onUpdateUser={onUpdateUser} />}
    </div>
  );
};

export default PantryChef;
