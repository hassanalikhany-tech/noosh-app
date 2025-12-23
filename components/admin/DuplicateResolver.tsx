
import React, { useState, useEffect, useMemo } from 'react';
import { Dish } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { hideDishIds, unhideAllDishes, renameDish } from '../../utils/dishStorage';
import { Trash2, CheckSquare, AlertTriangle, RefreshCw, Search, Filter, ArchiveRestore, Eye, Edit2, Save, Download, Copy, Check, X, Info, FileCode } from 'lucide-react';
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
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    loadFromSource();
  }, []);

  const loadFromSource = () => {
    const dishes = RecipeService.getAllDishes();
    const safeDishes = dishes.map((d, idx) => ({
      ...d, 
      _internalId: `admin-${Date.now()}-${idx}`
    }));
    setAllDishes(safeDishes);
  };

  const groups = useMemo(() => {
    const map = new Map<string, AdminDish[]>();
    allDishes.forEach(dish => {
      const key = normalizeText(dish.name); 
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(dish);
    });

    const duplicateGroups: DuplicateGroup[] = [];
    const normalizedSearch = normalizeText(searchTerm);

    map.forEach((groupDishes, key) => {
      const isDuplicate = groupDishes.length > 1;
      const matchesSearch = searchTerm && (key.includes(normalizedSearch) || groupDishes[0].name.includes(searchTerm));
      if (isDuplicate || showAll || matchesSearch) {
        duplicateGroups.push({ nameKey: key, originalName: groupDishes[0].name, dishes: groupDishes });
      }
    });
    return duplicateGroups.sort((a, b) => b.dishes.length - a.dishes.length);
  }, [allDishes, showAll, searchTerm]);

  const toggleSelection = (internalId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(internalId)) newSet.delete(internalId); else newSet.add(internalId);
    setSelectedIds(newSet);
  };

  const toggleGroupSelection = (groupDishes: AdminDish[]) => {
    const newSet = new Set(selectedIds);
    const allSelected = groupDishes.every(d => selectedIds.has(d._internalId));
    if (allSelected) groupDishes.forEach(d => newSet.delete(d._internalId));
    else groupDishes.forEach(d => newSet.add(d._internalId));
    setSelectedIds(newSet);
  };

  const executeDelete = () => {
    const idsToHide = allDishes.filter(d => selectedIds.has(d._internalId)).map(d => d.id);
    hideDishIds(idsToHide);
    setAllDishes(prev => prev.filter(d => !selectedIds.has(d._internalId)));
    setSelectedIds(new Set());
    setIsConfirmingDelete(false);
  };

  const handleRenameSave = () => {
    if (!renamingDish) return;
    renameDish(renamingDish.dish.id, renamingDish.newName.trim());
    setAllDishes(prev => prev.map(d => d.id === renamingDish.dish.id ? { ...d, name: renamingDish.newName.trim() } : d));
    setRenamingDish(null);
  };

  const generatePermanentFile = () => {
    // غنی‌سازی اطلاعات قبل از خروجی گرفتن
    const enrichedDishes = allDishes.map(d => {
      const { _internalId, ...baseDish } = d;
      const natureInfo = getDishNature(baseDish);
      
      return {
        ...baseDish,
        calories: estimateCalories(baseDish),
        cookTime: estimateCookTime(baseDish),
        difficulty: getDifficulty(baseDish),
        nature: natureInfo.type,
        natureLabel: natureInfo.label,
        mosleh: natureInfo.mosleh
      };
    });

    const fileContent = `import { Dish } from '../types';

export const DEFAULT_DISHES: Dish[] = ${JSON.stringify(enrichedDishes, null, 2)};
`;

    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recipes.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('فایل غنی‌شده (Rich Data) آماده شد. این فایل را جایگزین data/recipes.ts کنید.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden pb-32 relative min-h-[600px]">
      <div className="bg-indigo-600 p-6 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileCode size={24} />
          خروجی نهایی دیتابیس (Rich Mode)
        </h2>
        <p className="text-indigo-100 text-xs mt-1">
          با کلیک روی دکمه سبز، تمام محاسبات هوشمند (طبع، کالری، زمان) به دیتابیس تزریق و دانلود می‌شود.
        </p>
      </div>

      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
           <div className="relative">
              <input type="text" placeholder="جستجو..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-8 pr-3 py-2 text-sm border rounded-lg focus:outline-none" />
              <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
           </div>
           <button onClick={() => setShowAll(!showAll)} className={`px-3 py-2 rounded-lg text-sm font-bold border ${showAll ? 'bg-blue-600 text-white' : 'bg-white'}`}>
             {showAll ? 'همه' : 'تکراری‌ها'}
           </button>
        </div>
        <button onClick={generatePermanentFile} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black shadow-lg flex items-center gap-2 animate-pulse">
           <Download size={20} />
           دانلود فایل نهایی غنی‌شده (Rich Database)
        </button>
      </div>

      <div className="p-4 space-y-4">
        {groups.map(group => (
          <div key={group.nameKey} className="border rounded-xl bg-white overflow-hidden shadow-sm">
            <div className="p-3 bg-gray-50 border-b flex justify-between items-center cursor-pointer" onClick={() => toggleGroupSelection(group.dishes)}>
               <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded border ${group.dishes.every(d => selectedIds.has(d._internalId)) ? 'bg-red-500 border-red-500' : 'bg-white'}`}></div>
                  <span className="font-bold text-gray-700">{group.originalName}</span>
                  <span className="text-xs text-gray-400">({group.dishes.length} مورد)</span>
               </div>
            </div>
            <div className="divide-y">
              {group.dishes.map(dish => (
                <div key={dish._internalId} className={`flex items-center p-3 hover:bg-gray-50 ${selectedIds.has(dish._internalId) ? 'bg-red-50' : ''}`}>
                   <input type="checkbox" checked={selectedIds.has(dish._internalId)} onChange={() => toggleSelection(dish._internalId)} className="w-5 h-5 ml-4 accent-red-600" />
                   <div className="flex-grow">
                      <div className="font-bold text-sm flex items-center gap-2">
                         {dish.name}
                         <button onClick={() => setRenamingDish({ dish, newName: dish.name })} className="text-blue-500 p-1"><Edit2 size={14}/></button>
                      </div>
                      <div className="text-[10px] text-gray-400">{dish.id} | {dish.category}</div>
                   </div>
                   <button onClick={() => setViewingDish(dish)} className="p-2 text-gray-400 hover:text-indigo-600"><Eye size={18}/></button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedIds.size > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 z-[100] border border-white/10">
           <span className="font-bold">{selectedIds.size} مورد انتخاب شد</span>
           <div className="flex gap-2">
             <button onClick={() => setSelectedIds(new Set())} className="px-4 py-2 bg-slate-700 rounded-xl text-xs font-bold">لغو</button>
             <button onClick={executeDelete} className="px-6 py-2 bg-red-600 rounded-xl font-bold flex items-center gap-2"><Trash2 size={16}/> حذف نهایی</button>
           </div>
        </div>
      )}

      {/* Fix: Pass missing 'user' prop as null to RecipeModal. */}
      {viewingDish && <RecipeModal dish={viewingDish} isOpen={!!viewingDish} onClose={() => setViewingDish(null)} user={null} />}
      
      {renamingDish && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-2xl">
              <h3 className="font-black mb-4">ویرایش نام غذا</h3>
              <input value={renamingDish.newName} onChange={e => setRenamingDish({...renamingDish, newName: e.target.value})} className="w-full p-4 border-2 rounded-2xl mb-4 outline-none focus:border-blue-500" />
              <div className="flex gap-2">
                 <button onClick={() => setRenamingDish(null)} className="flex-1 py-3 bg-gray-100 rounded-2xl font-bold">انصراف</button>
                 <button onClick={handleRenameSave} className="flex-1 py-3 bg-blue-600 text-white rounded-2xl font-bold">ذخیره</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DuplicateResolver;
