
import React, { useState, useEffect, useMemo } from 'react';
import { Dish } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { hideDishIds, unhideAllDishes, renameDish } from '../../utils/dishStorage';
import { Trash2, CheckSquare, AlertTriangle, RefreshCw, Search, Filter, ArchiveRestore, Eye, Edit2, Save, Download, Copy, Check, X, Info, FileCode } from 'lucide-react';
import RecipeModal from '../RecipeModal';

// Extend Dish type to ensure we have a unique handle for UI operations
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
    .replace(/[\u200C\s\u00A0_-]+/g, '') // Remove ALL spaces and separators
    .toLowerCase();
};

const DuplicateResolver: React.FC = () => {
  const [allDishes, setAllDishes] = useState<AdminDish[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // For viewing details
  const [viewingDish, setViewingDish] = useState<Dish | null>(null);
  
  // For renaming
  const [renamingDish, setRenamingDish] = useState<{ dish: AdminDish, newName: string } | null>(null);

  // For delete confirmation step inside the floating bar
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Export Modal
  const [showExport, setShowExport] = useState(false);
  const [exportData, setExportData] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    loadFromSource();
  }, []);

  const loadFromSource = () => {
    const dishes = RecipeService.getAllDishes();
    const safeDishes = dishes.map((d, idx) => ({
      ...d, 
      _internalId: `admin-${Date.now()}-${idx}-${Math.random().toString(36).substr(2, 9)}` // Ensure totally unique UI ID
    }));
    setAllDishes(safeDishes);
    setSelectedIds(new Set());
    setIsConfirmingDelete(false);
  };

  const groups = useMemo(() => {
    const map = new Map<string, AdminDish[]>();
    
    // 1. Grouping
    allDishes.forEach(dish => {
      const key = normalizeText(dish.name); 
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key)?.push(dish);
    });

    const duplicateGroups: DuplicateGroup[] = [];
    const normalizedSearch = normalizeText(searchTerm);

    map.forEach((groupDishes, key) => {
      const isDuplicate = groupDishes.length > 1;
      const matchesSearch = searchTerm && (key.includes(normalizedSearch) || groupDishes[0].name.includes(searchTerm));
      
      // Show group if it's a duplicate OR if "Show All" is on OR if user is searching
      if (isDuplicate || showAll || matchesSearch) {
        duplicateGroups.push({ 
          nameKey: key,
          originalName: groupDishes[0].name,
          dishes: groupDishes,
        });
      }
    });

    // Sort: Largest groups first
    return duplicateGroups.sort((a, b) => b.dishes.length - a.dishes.length);
  }, [allDishes, showAll, searchTerm]);

  // Toggle selection of a single item
  const toggleSelection = (internalId: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(internalId)) {
      newSet.delete(internalId);
    } else {
      newSet.add(internalId);
    }
    setSelectedIds(newSet);
    setIsConfirmingDelete(false); // Reset confirmation if selection changes
  };

  // Select/Deselect all items in a group
  const toggleGroupSelection = (groupDishes: AdminDish[]) => {
    const newSet = new Set(selectedIds);
    const allSelected = groupDishes.every(d => selectedIds.has(d._internalId));

    if (allSelected) {
      groupDishes.forEach(d => newSet.delete(d._internalId));
    } else {
      groupDishes.forEach(d => newSet.add(d._internalId));
    }
    setSelectedIds(newSet);
    setIsConfirmingDelete(false);
  };

  const executeDelete = () => {
    if (selectedIds.size === 0) return;

    // 1. Find the actual Dish IDs (not internal IDs) to hide
    const idsToHide: string[] = [];
    allDishes.forEach(d => {
      if (selectedIds.has(d._internalId)) {
        idsToHide.push(d.id);
      }
    });

    // 2. Persist to storage
    hideDishIds(idsToHide);

    // 3. Update local UI state immediately
    setAllDishes(prev => prev.filter(d => !selectedIds.has(d._internalId)));
    setSelectedIds(new Set());
    setIsConfirmingDelete(false);
  };

  const handleRestoreAll = () => {
    if (confirm('آیا مطمئن هستید؟ تمام غذاهای حذف شده دوباره برمی‌گردند.')) {
      unhideAllDishes();
      window.location.reload(); 
    }
  };

  const handleRenameSave = () => {
    if (!renamingDish || !renamingDish.newName.trim()) return;
    
    // Save to permanent storage
    renameDish(renamingDish.dish.id, renamingDish.newName.trim());
    
    // Update local state immediately so UI reflects change
    setAllDishes(prev => prev.map(d => 
      d.id === renamingDish.dish.id ? { ...d, name: renamingDish.newName.trim() } : d
    ));
    
    setRenamingDish(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const generatePermanentFile = () => {
    // 1. Get the current clean list (without internal IDs)
    const cleanDishes = allDishes.map(({ _internalId, hasRealData, ...rest }) => rest);
    
    // 2. Create the file content string
    const fileContent = `
import { Dish } from '../types';

export const DEFAULT_DISHES: Dish[] = ${JSON.stringify(cleanDishes, null, 2)};
`;

    // 3. Create a download link
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recipes.ts'; // The name of the file to replace
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('فایل recipes.ts دانلود شد. لطفا این فایل را جایگزین فایل موجود در پوشه data/recipes.ts کنید تا تغییرات دائمی شوند.');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden pb-32 relative min-h-[600px]">
      
      {/* Persistence Warning */}
      <div className="bg-blue-50 border-b border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={24} />
          <div className="text-sm text-blue-900">
            <strong>راهنمای ذخیره دائمی تغییرات:</strong>
            <br/>
            تغییراتی که اینجا می‌دهید موقتی است. برای اینکه زحماتتان هدر نرود:
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>ابتدا همه موارد تکراری را حذف و نام‌ها را اصلاح کنید.</li>
              <li>روی دکمه سبز رنگ <strong>«دانلود فایل نهایی (recipes.ts)»</strong> کلیک کنید.</li>
              <li>فایل دانلود شده را در پوشه پروژه خود جایگزین فایل <code>data/recipes.ts</code> کنید.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Header Controls */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3 w-full xl:w-auto">
            <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">مدیریت تکراری‌ها</h2>
              <p className="text-xs text-slate-500">
                {groups.length} گروه پیدا شد
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-end">
             <div className="relative flex-grow xl:flex-grow-0 min-w-[200px]">
                <input 
                  type="text" 
                  placeholder="جستجو..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-2 text-sm border border-slate-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
                />
                <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
             </div>

             <button 
               onClick={() => setShowAll(!showAll)}
               className={`px-3 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${
                 showAll 
                 ? 'bg-blue-600 text-white shadow-md' 
                 : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
               }`}
             >
               <Filter size={16} />
               {showAll ? 'نمایش همه' : 'فقط تکراری‌ها'}
             </button>

             <button 
               onClick={generatePermanentFile}
               className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-sm flex items-center gap-2 shadow-md active:scale-95 transition-all animate-pulse"
               title="دانلود کد نهایی برای ذخیره دائمی"
             >
               <FileCode size={18} />
               دانلود فایل نهایی (recipes.ts)
             </button>

             <button 
                onClick={loadFromSource}
                className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors"
                title="تازه سازی لیست"
              >
                <RefreshCw size={18} />
              </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 bg-slate-50/30 min-h-[400px]">
        {groups.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-bold">مورد تکراری یافت نشد.</p>
            <p className="text-sm">لیست شما تمیز است. برای مشاهده همه غذاها دکمه "نمایش همه" را بزنید.</p>
          </div>
        ) : (
          groups.map((group) => {
            const isAllSelected = group.dishes.every(d => selectedIds.has(d._internalId));
            const selectedCountInGroup = group.dishes.filter(d => selectedIds.has(d._internalId)).length;

            return (
              <div 
                key={group.nameKey} 
                className={`border rounded-xl overflow-hidden bg-white transition-all ${
                  selectedCountInGroup > 0 ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'
                }`}
              >
                {/* Group Header */}
                <div 
                  className="p-3 bg-gray-50 border-b flex justify-between items-center cursor-pointer hover:bg-gray-100 select-none"
                  onClick={() => toggleGroupSelection(group.dishes)}
                >
                  <div className="flex items-center gap-3">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAllSelected ? 'bg-red-500 border-red-500' : 'border-gray-400 bg-white'}`}>
                        {isAllSelected && <CheckSquare size={14} className="text-white" />}
                     </div>
                     <span className="font-bold text-slate-800">{group.originalName}</span>
                     <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full text-slate-600">{group.dishes.length} عدد</span>
                  </div>
                  {selectedCountInGroup > 0 && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                      {selectedCountInGroup} مورد انتخاب شده
                    </span>
                  )}
                </div>
                
                {/* Group Items */}
                <div className="divide-y divide-slate-100">
                  {group.dishes.map(dish => {
                    const isChecked = selectedIds.has(dish._internalId);
                    return (
                      <div 
                        key={dish._internalId} 
                        className={`flex items-center transition-colors hover:bg-gray-50 ${
                          isChecked ? 'bg-red-50 hover:bg-red-50' : 'bg-white'
                        }`}
                      >
                        {/* Checkbox Area (Click to toggle selection) */}
                        <div 
                          className="p-4 cursor-pointer flex items-center justify-center border-l border-slate-100 h-full flex-shrink-0"
                          onClick={(e) => { e.stopPropagation(); toggleSelection(dish._internalId); }}
                        >
                          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                            isChecked 
                              ? 'bg-red-500 border-red-500 scale-110 shadow-sm' 
                              : 'border-slate-300 bg-white hover:border-red-300'
                          }`}>
                            {isChecked && <CheckSquare size={16} className="text-white" />}
                          </div>
                        </div>

                        {/* Content Area (Click to View Details) */}
                        <div 
                          className="flex-grow p-3 cursor-pointer group"
                          onClick={() => setViewingDish(dish)}
                        >
                           <div className="flex justify-between items-center mb-1">
                              <span className={`font-medium group-hover:text-indigo-600 transition-colors ${isChecked ? 'text-red-900' : 'text-slate-700'}`}>
                                {dish.name}
                              </span>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRenamingDish({ dish, newName: dish.name });
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="تغییر نام"
                                >
                                  <Edit2 size={16} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setViewingDish(dish);
                                  }}
                                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                  title="مشاهده جزئیات"
                                >
                                  <Eye size={16} />
                                </button>
                              </div>
                           </div>
                           <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                              <span>دسته: {dish.category}</span>
                              <span className="text-slate-300">•</span>
                              <span>{dish.ingredients?.length || 0} قلم مواد</span>
                              <span className="text-slate-300">•</span>
                              <span className="truncate max-w-[200px]">{dish.description}</span>
                           </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-300">
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-700">
             
             {!isConfirmingDelete ? (
                // Step 1: Initial State
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-red-500 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse text-sm">
                        {selectedIds.size}
                      </div>
                      <span className="font-bold text-sm">مورد انتخاب شد</span>
                   </div>
                   
                   <div className="flex gap-2">
                     <button 
                       onClick={() => { setSelectedIds(new Set()); setIsConfirmingDelete(false); }}
                       className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold transition-colors"
                     >
                       لغو
                     </button>
                     <button 
                       onClick={() => setIsConfirmingDelete(true)}
                       className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                     >
                       <Trash2 size={18} />
                       حذف
                     </button>
                   </div>
                </div>
             ) : (
                // Step 2: Confirmation State
                <div className="flex items-center justify-between animate-in fade-in slide-in-from-right-4 duration-200">
                   <span className="font-bold text-sm text-red-200">آیا مطمئن هستید؟</span>
                   <div className="flex gap-2">
                     <button 
                       onClick={() => setIsConfirmingDelete(false)}
                       className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-xs font-bold transition-colors"
                     >
                       خیر، بازگشت
                     </button>
                     <button 
                       onClick={executeDelete}
                       className="px-6 py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                     >
                       <Check size={18} />
                       بله، حذف کن
                     </button>
                   </div>
                </div>
             )}

          </div>
        </div>
      )}

      {/* Footer Tools */}
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center text-xs text-slate-500">
         <span>تعداد کل غذاها: {allDishes.length}</span>
         <button onClick={handleRestoreAll} className="text-indigo-600 hover:underline flex items-center gap-1 font-bold">
            <ArchiveRestore size={14} /> بازگرداندن تمام غذاهای حذف شده
         </button>
      </div>

      {/* Detail Modal */}
      {viewingDish && (
        <RecipeModal 
          dish={viewingDish}
          isOpen={!!viewingDish}
          onClose={() => setViewingDish(null)}
        />
      )}

      {/* Rename Modal */}
      {renamingDish && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all scale-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Edit2 size={20} className="text-blue-600" />
              تغییر نام غذا
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">نام فعلی:</label>
                <div className="p-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-100">
                  {renamingDish.dish.name}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">نام جدید:</label>
                <input 
                  type="text" 
                  value={renamingDish.newName}
                  onChange={(e) => setRenamingDish({ ...renamingDish, newName: e.target.value })}
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-0 outline-none font-medium text-slate-800"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setRenamingDish(null)}
                className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                انصراف
              </button>
              <button 
                onClick={handleRenameSave}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                <Save size={18} />
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal (Deprecated, but kept for raw view if needed) */}
      {showExport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-0 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b bg-emerald-50 flex justify-between items-center">
               <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
                 <Download size={20} />
                 کد دیتابیس اصلاح شده
               </h3>
               <button onClick={() => setShowExport(false)} className="text-gray-500 hover:text-gray-800"><X /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow">
               <p className="text-sm text-gray-600 mb-4 bg-yellow-50 p-3 rounded-xl border border-yellow-100">
                 <strong>روش کار:</strong> این کد حاوی دیتابیس تمیز و بدون تکرار شماست. <br/>
                 ۱. کد زیر را کپی کنید. <br/>
                 ۲. آن را جایگزین محتویات فایل data/recipes.ts کنید.
               </p>
               <div className="relative">
                 <textarea 
                    readOnly
                    value={exportData}
                    className="w-full h-96 p-4 bg-slate-800 text-emerald-400 font-mono text-xs rounded-xl shadow-inner outline-none dir-ltr text-left"
                 />
               </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
               <button onClick={() => setShowExport(false)} className="px-6 py-2 rounded-xl text-gray-600 font-bold hover:bg-gray-200 transition-colors">بستن</button>
               <button 
                 onClick={copyToClipboard}
                 className={`px-6 py-2 rounded-xl text-white font-bold flex items-center gap-2 transition-all ${copySuccess ? 'bg-green-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
               >
                 {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                 {copySuccess ? 'کپی شد!' : 'کپی کد'}
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DuplicateResolver;
