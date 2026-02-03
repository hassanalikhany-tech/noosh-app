
import React, { useState, useEffect, useMemo } from 'react';
import { Dish, DishCategory, CATEGORY_LABELS } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { getHiddenDishIds } from '../../utils/dishStorage';
import { Trash2, Search, Eye, Edit2, FileCode, Loader2, Check, ShieldAlert, Wifi, WifiOff, X, RefreshCw, AlertCircle, Filter, LayoutGrid, Hash } from 'lucide-react';
import RecipeModal from '../RecipeModal';
import DishEditor from './DishEditor';

type AdminDish = Dish & { _internalId: string, isHidden: boolean };

interface DuplicateGroup {
  nameKey: string;
  originalName: string; 
  dishes: AdminDish[];
}

const normalizeText = (text: string) => {
  if (!text) return '';
  return text
    .trim()
    .replace(/[يى]/g, 'ی')
    .replace(/[ك]/g, 'ک')
    .replace(/[آأإ]/g, 'ا')
    .replace(/[\u200C\s\u00A0_-]+/g, '')
    .toLowerCase();
};

const DuplicateResolver: React.FC = () => {
  const [allDishes, setAllDishes] = useState<AdminDish[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingDish, setViewingDish] = useState<Dish | null>(null);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const loadFromSource = () => {
    const dishes = RecipeService.getRawDishes(); 
    const hiddenIds = getHiddenDishIds();
    const safeDishes = dishes.map((d, idx) => ({
      ...d, 
      _internalId: `admin-${d.id}-${idx}`,
      isHidden: hiddenIds.includes(d.id)
    }));
    setAllDishes(safeDishes);
  };

  useEffect(() => {
    loadFromSource();
    const handleRefresh = () => loadFromSource();
    window.addEventListener('recipes-updated', handleRefresh);
    return () => window.removeEventListener('recipes-updated', handleRefresh);
  }, []);

  const groups = useMemo(() => {
    let filtered = allDishes;
    
    // فیلتر دسته‌بندی هوشمند (پشتیبانی از فارسی و انگلیسی در دیتابیس)
    if (selectedCategory !== 'all') {
      const targetLabel = CATEGORY_LABELS[selectedCategory];
      filtered = filtered.filter(d => 
        d.category === selectedCategory || 
        d.category === (targetLabel as any)
      );
    }

    if (searchTerm) {
      const normalizedSearch = normalizeText(searchTerm);
      filtered = filtered.filter(d => 
        normalizeText(d.name).includes(normalizedSearch) || 
        d.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const map = new Map<string, AdminDish[]>();
    filtered.forEach(dish => {
      const key = normalizeText(dish.name); 
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(dish);
    });

    const resultGroups: DuplicateGroup[] = [];
    map.forEach((groupDishes, key) => {
      const isDuplicate = groupDishes.length > 1;
      const shouldForceShow = selectedCategory !== 'all' || searchTerm !== '' || showAll;

      if (isDuplicate || shouldForceShow) {
        resultGroups.push({ nameKey: key, originalName: groupDishes[0].name, dishes: groupDishes });
      }
    });

    if (selectedCategory !== 'all' || searchTerm !== '') {
      return resultGroups.sort((a, b) => a.originalName.localeCompare(b.originalName, 'fa'));
    }
    
    return resultGroups.sort((a, b) => b.dishes.length - a.dishes.length);
  }, [allDishes, showAll, searchTerm, selectedCategory]);

  const totalCount = useMemo(() => {
    return groups.reduce((acc, g) => acc + g.dishes.length, 0);
  }, [groups]);

  const executeDelete = async (dishId: string) => {
    if (!isOnline) {
      alert("شما آفلاین هستید!");
      return;
    }
    setProcessingId(dishId);
    setSyncError(null);
    setConfirmDeleteId(null);
    try {
      const success = await RecipeService.deleteDish(dishId);
      if (success) {
        setAllDishes(prev => prev.filter(d => d.id !== dishId));
      }
    } catch (e: any) {
      setSyncError(`خطا: ${e.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleForceSync = async () => {
    setIsRefreshing(true);
    await RecipeService.syncFromCloud(true);
    setIsRefreshing(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden pb-10 relative min-h-[600px]">
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-xl font-black flex items-center gap-2">
             <FileCode size={24} className="text-emerald-400" />
             اصلاحات و مدیریت جامع
           </h2>
           <p className="text-[10px] opacity-80 mt-1 font-bold">نمایش {totalCount} غذا در دسته‌بندی یا جستجوی فعلی</p>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={handleForceSync} disabled={isRefreshing} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black ${isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {isOnline ? <Wifi size={14}/> : <WifiOff size={14}/>}
                {isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 flex flex-wrap items-center gap-4 shadow-sm">
        <div className="relative flex-grow min-w-[200px]">
           <input type="text" placeholder="جستجوی نام یا کد..." value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setShowAll(false); }} className="w-full pl-10 pr-4 py-3 text-sm border-2 border-slate-200 rounded-2xl focus:border-indigo-500 outline-none font-black shadow-inner bg-white" />
           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="relative">
           <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value as any); setShowAll(false); }} className="pl-10 pr-10 py-3 text-xs font-black bg-white border-2 border-slate-200 rounded-2xl focus:border-indigo-500 outline-none cursor-pointer appearance-none min-w-[160px] shadow-sm">
              <option value="all">همه دسته‌ها</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
           </select>
           <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        <button onClick={() => { setShowAll(!showAll); setSelectedCategory('all'); setSearchTerm(''); }} className={`px-6 py-3 rounded-2xl text-xs font-black border-2 transition-all flex items-center gap-2 ${showAll ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200'}`}>
          <LayoutGrid size={16} />
          {showAll ? 'فقط تکراری‌ها' : 'نمایش همه'}
        </button>
        
        <div className="px-4 py-3 bg-indigo-50 border-2 border-indigo-100 rounded-2xl flex items-center gap-2">
           <Hash size={14} className="text-indigo-600" />
           <span className="text-xs font-black text-indigo-800">{totalCount} مورد</span>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[700px] overflow-y-auto no-scrollbar">
        {groups.length === 0 ? (
           <div className="py-20 text-center flex flex-col items-center gap-4">
              <Search size={48} className="text-slate-200" />
              <p className="text-slate-400 font-bold italic">موردی در این دسته‌بندی یافت نشد.</p>
           </div>
        ) : groups.map(group => (
          <div key={group.nameKey} className="border border-slate-200 rounded-[2rem] bg-white overflow-hidden shadow-sm hover:border-indigo-200 transition-all">
            <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${group.dishes.length > 1 ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-800 text-white'}`}>
                    {group.dishes.length}
                  </div>
                  <span className="font-black text-slate-800 text-sm">{group.originalName}</span>
               </div>
            </div>
            <div className="divide-y divide-slate-100">
              {group.dishes.map(dish => (
                  <div key={dish._internalId} className="flex items-center p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex-grow">
                        <div className="font-black text-xs text-slate-700 flex items-center gap-2">
                          {dish.name}
                          <span className="text-[9px] px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded font-bold">
                            {CATEGORY_LABELS[dish.category] || dish.category}
                          </span>
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 font-mono mt-1">{dish.id}</div>
                    </div>
                    <div className="flex items-center gap-1">
                        {confirmDeleteId === dish.id ? (
                          <div className="flex items-center gap-1 animate-enter bg-rose-50 p-1 rounded-xl">
                             <button onClick={() => executeDelete(dish.id)} className="px-3 py-1.5 bg-rose-600 text-white text-[10px] font-black rounded-lg">حذف قطعی</button>
                             <button onClick={() => setConfirmDeleteId(null)} className="p-1.5 text-slate-400"><X size={14}/></button>
                          </div>
                        ) : (
                          <>
                            <button onClick={() => setViewingDish(dish)} className="p-2 text-slate-300 hover:text-indigo-600"><Eye size={18}/></button>
                            <button onClick={() => setEditingDish(dish)} className="p-2 text-slate-300 hover:text-blue-600"><Edit2 size={18}/></button>
                            <button disabled={processingId === dish.id} onClick={() => setConfirmDeleteId(dish.id)} className="p-2 text-slate-300 hover:text-rose-600">
                                {processingId === dish.id ? <Loader2 className="animate-spin" size={18}/> : <Trash2 size={18}/>}
                            </button>
                          </>
                        )}
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {viewingDish && <RecipeModal dish={viewingDish} isOpen={!!viewingDish} onClose={() => setViewingDish(null)} user={null} />}
      {editingDish && <DishEditor dish={editingDish} onClose={() => setEditingDish(null)} onSave={() => loadFromSource()} />}
    </div>
  );
};

export default DuplicateResolver;
