
import React, { useState, useEffect, useMemo } from 'react';
import { Dish } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { getHiddenDishIds } from '../../utils/dishStorage';
import { Trash2, Search, Eye, Edit2, FileCode, Loader2, Check, ShieldAlert, Wifi, WifiOff, X, RefreshCw, AlertCircle } from 'lucide-react';
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
    const map = new Map<string, AdminDish[]>();
    allDishes.forEach(dish => {
      const key = normalizeText(dish.name); 
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(dish);
    });

    const resultGroups: DuplicateGroup[] = [];
    const normalizedSearch = normalizeText(searchTerm);

    map.forEach((groupDishes, key) => {
      const isDuplicate = groupDishes.length > 1;
      const matchesSearch = searchTerm && (key.includes(normalizedSearch) || groupDishes[0].name.includes(searchTerm));
      
      if (isDuplicate || showAll || matchesSearch) {
        resultGroups.push({ nameKey: key, originalName: groupDishes[0].name, dishes: groupDishes });
      }
    });
    return resultGroups.sort((a, b) => b.dishes.length - a.dishes.length);
  }, [allDishes, showAll, searchTerm]);

  const executeDelete = async (dishId: string) => {
    if (!isOnline) {
      alert("شما آفلاین هستید! برای حذف دائمی باید به اینترنت متصل باشید.");
      return;
    }

    setProcessingId(dishId);
    setSyncError(null);
    setConfirmDeleteId(null);

    const previousDishes = [...allDishes];
    setAllDishes(prev => prev.filter(d => d.id !== dishId));

    try {
      const success = await RecipeService.deleteDish(dishId);
      if (!success) throw new Error("Firebase rejected the operation.");
    } catch (e: any) {
      console.error("Delete Execution Failed:", e);
      setAllDishes(previousDishes);
      setSyncError(`خطای سیستمی: ${e.message || 'عدم دسترسی به فایربیس'}`);
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
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-xl font-black flex items-center gap-2">
             <FileCode size={24} />
             مدیریت آنی دیتابیس (بدون وقفه)
           </h2>
           <p className="text-[10px] opacity-80 mt-1 font-bold">حذف و ویرایش مستقیم در فایربیس | تاییدیه داخلی فعال است</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={handleForceSync}
                disabled={isRefreshing}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                title="به‌روزرسانی اجباری از سرور"
            >
                <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
            </button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black ${isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300 animate-pulse'}`}>
                {isOnline ? <Wifi size={14}/> : <WifiOff size={14}/>}
                {isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
        </div>
      </div>

      {syncError && (
        <div className="m-4 p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-start gap-4 animate-enter shadow-lg shadow-rose-100">
           <ShieldAlert className="text-rose-600 flex-shrink-0" size={24} />
           <div className="flex-grow">
              <h4 className="font-black text-rose-800 text-sm mb-1">خطای ارتباط با سرور</h4>
              <p className="text-[11px] text-rose-600 font-bold leading-relaxed">
                درخواست حذف در شبکه مسدود شد. لطفاً اتصال اینترنت را بررسی کنید.
              </p>
           </div>
           <button onClick={() => setSyncError(null)} className="p-1 hover:bg-rose-100 rounded-lg text-rose-400"><X size={18}/></button>
        </div>
      )}

      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
           <div className="relative flex-grow sm:w-64">
              <input type="text" placeholder="جستجوی نام غذا..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-8 pr-4 py-3 text-sm border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-500 font-bold" />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
           <button onClick={() => setShowAll(!showAll)} className={`px-6 py-3 rounded-2xl text-xs font-black border-2 transition-all ${showAll ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>
             {showAll ? 'کل لیست' : 'فقط تکراری‌ها'}
           </button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-h-[700px] overflow-y-auto no-scrollbar">
        {groups.length === 0 ? (
           <div className="py-20 text-center text-slate-400 font-bold italic">موردی یافت نشد.</div>
        ) : groups.map(group => (
          <div key={group.nameKey} className="border border-slate-200 rounded-[2rem] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-slate-50/50 border-b flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-black text-sm">{group.dishes.length}</div>
                  <span className="font-black text-slate-800">{group.originalName}</span>
               </div>
            </div>
            <div className="divide-y divide-slate-100">
              {group.dishes.map(dish => (
                  <div key={dish._internalId} className="flex items-center p-4 hover:bg-slate-50 group">
                    <div className="flex-grow">
                        <div className="font-black text-sm text-slate-700">
                          {dish.name}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 font-mono mt-1 tracking-widest">{dish.id}</div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {confirmDeleteId === dish.id ? (
                          <div className="flex items-center gap-1 animate-enter bg-rose-50 p-1 rounded-xl border border-rose-100">
                             <button onClick={() => executeDelete(dish.id)} className="px-3 py-1.5 bg-rose-600 text-white text-[10px] font-black rounded-lg shadow-sm">تایید حذف</button>
                             <button onClick={() => setConfirmDeleteId(null)} className="p-1.5 text-slate-400 hover:bg-white rounded-lg"><X size={16}/></button>
                          </div>
                        ) : (
                          <>
                            <button onClick={() => setViewingDish(dish)} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors" title="مشاهده"><Eye size={20}/></button>
                            <button onClick={() => setEditingDish(dish)} className="p-2 text-slate-300 hover:text-blue-600 transition-colors" title="ویرایش کامل اطلاعات"><Edit2 size={20}/></button>
                            <button 
                                disabled={processingId === dish.id}
                                onClick={() => setConfirmDeleteId(dish.id)} 
                                className={`p-3 rounded-2xl transition-all ${processingId === dish.id ? 'bg-slate-100 text-slate-400 animate-pulse' : 'text-slate-300 hover:text-rose-600 hover:bg-rose-50'}`}
                            >
                                {processingId === dish.id ? <Loader2 className="animate-spin" size={20}/> : <Trash2 size={20}/>}
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
      
      {editingDish && (
        <DishEditor 
          dish={editingDish} 
          onClose={() => setEditingDish(null)} 
          onSave={() => loadFromSource()} 
        />
      )}
    </div>
  );
};

export default DuplicateResolver;
