
import React, { useState, useEffect, useMemo } from 'react';
import { Dish } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { hideDishIds, unhideAllDishes, renameDish } from '../../utils/dishStorage';
import { Trash2, Search, Eye, Edit2, Download, FileCode, CheckCircle2, RotateCcw } from 'lucide-react';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../../utils/recipeHelpers';
import RecipeModal from '../RecipeModal';

type AdminDish = Dish & { _internalId: string };

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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingDish, setViewingDish] = useState<Dish | null>(null);
  const [renamingDish, setRenamingDish] = useState<{ dish: AdminDish, newName: string } | null>(null);

  const loadFromSource = () => {
    const dishes = RecipeService.getAllDishes();
    const safeDishes = dishes.map((d, idx) => ({
      ...d, 
      _internalId: `admin-${d.id}-${idx}`
    }));
    setAllDishes(safeDishes);
  };

  useEffect(() => {
    loadFromSource();
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

  const toggleSelection = (internalId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(internalId)) newSet.delete(internalId); else newSet.add(internalId);
    setSelectedIds(newSet);
  };

  const executeDelete = () => {
    const selectedAdminDishes = allDishes.filter(d => selectedIds.has(d._internalId));
    const idsToHide = selectedAdminDishes.map(d => d.id);
    
    hideDishIds(idsToHide);
    
    // رفرش لیست بعد از حذف
    loadFromSource();
    setSelectedIds(new Set());
    alert(`${idsToHide.length} غذا از لیست پیشنهادات حذف شد.`);
  };

  const handleResetStorage = () => {
    if(confirm("آیا می‌خواهید تمام غذاهای حذف شده دوباره برگردند؟")) {
      unhideAllDishes();
      loadFromSource();
    }
  };

  const handleRenameSave = () => {
    if (!renamingDish) return;
    renameDish(renamingDish.dish.id, renamingDish.newName.trim());
    setAllDishes(prev => prev.map(d => d.id === renamingDish.dish.id ? { ...d, name: renamingDish.newName.trim() } : d));
    setRenamingDish(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden pb-32 relative min-h-[600px]">
      <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
        <div>
           <h2 className="text-xl font-black flex items-center gap-2">
             <FileCode size={24} />
             مدیریت تکراری‌ها و اصلاحات
           </h2>
        </div>
        <button onClick={handleResetStorage} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black flex items-center gap-1 transition-all border border-white/10">
           <RotateCcw size={14} /> بازیابی همه حذفیات
        </button>
      </div>

      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="relative">
              <input type="text" placeholder="جستجوی نام..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8 pr-4 py-2 text-sm border rounded-xl focus:outline-none focus:border-indigo-500 font-bold" />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
           <button onClick={() => setShowAll(!showAll)} className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${showAll ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}>
             {showAll ? 'نمایش همه' : 'فقط تکراری‌ها'}
           </button>
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-slate-100">تعداد غذاهای در حال نمایش: {allDishes.length}</div>
      </div>

      <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
        {groups.length === 0 ? (
           <div className="py-20 text-center text-slate-400 font-bold italic">موردی برای نمایش یافت نشد.</div>
        ) : groups.map(group => (
          <div key={group.nameKey} className="border border-slate-100 rounded-2xl bg-white overflow-hidden shadow-sm">
            <div className="p-3 bg-slate-50/50 border-b flex justify-between items-center">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 border border-slate-200 font-black text-xs">{group.dishes.length}</div>
                  <span className="font-black text-slate-700">{group.originalName}</span>
               </div>
            </div>
            <div className="divide-y divide-slate-50">
              {group.dishes.map(dish => (
                <div key={dish._internalId} className={`flex items-center p-3 hover:bg-slate-50 transition-colors ${selectedIds.has(dish._internalId) ? 'bg-rose-50' : ''}`}>
                   <input type="checkbox" checked={selectedIds.has(dish._internalId)} onChange={() => toggleSelection(dish._internalId)} className="w-5 h-5 ml-4 accent-rose-600 cursor-pointer" />
                   <div className="flex-grow">
                      <div className="font-black text-sm text-slate-800 flex items-center gap-2">
                         {dish.name}
                         <button onClick={() => setRenamingDish({ dish, newName: dish.name })} className="text-blue-400 hover:text-blue-600 p-1"><Edit2 size={14}/></button>
                      </div>
                      <div className="text-[9px] font-bold text-slate-400 font-mono tracking-tighter">{dish.id} | {dish.category}</div>
                   </div>
                   <button onClick={() => setViewingDish(dish)} className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><Eye size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] shadow-2xl flex items-center gap-8 z-[100] border border-white/10 animate-enter">
           <div className="flex flex-col">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">مواد انتخاب شده</span>
              <span className="text-lg font-black text-teal-400">{selectedIds.size} غذا برای حذف</span>
           </div>
           <div className="flex gap-2">
             <button onClick={() => setSelectedIds(new Set())} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black transition-all">لغو</button>
             <button onClick={executeDelete} className="px-8 py-3 bg-rose-600 hover:bg-rose-700 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg shadow-rose-900/40 transition-all active:scale-95"><Trash2 size={16}/> حذف از لیست پخت</button>
           </div>
        </div>
      )}

      {viewingDish && <RecipeModal dish={viewingDish} isOpen={!!viewingDish} onClose={() => setViewingDish(null)} user={null} />}
      
      {renamingDish && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white p-8 rounded-[2rem] w-full max-w-sm shadow-2xl animate-enter">
              <h3 className="font-black text-xl mb-6 text-slate-800">ویرایش نام غذا</h3>
              <input value={renamingDish.newName} onChange={e => setRenamingDish({...renamingDish, newName: e.target.value})} className="w-full p-4 border-2 border-slate-100 rounded-2xl mb-6 outline-none focus:border-indigo-500 font-black text-slate-800" />
              <div className="flex gap-3">
                 <button onClick={() => setRenamingDish(null)} className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black transition-all">انصراف</button>
                 <button onClick={handleRenameSave} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all active:scale-95">ذخیره نام</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DuplicateResolver;
