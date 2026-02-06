
import React, { useState, useMemo } from 'react';
import { RecipeService } from '../../services/recipeService';
import { Copy, Check, Search, Image as ImageIcon, FileSpreadsheet, Filter, ZoomIn, X, AlertCircle, RefreshCw } from 'lucide-react';
import DishVisual from '../DishVisual';
import { CATEGORY_LABELS } from '../../types';
import * as XLSX from 'xlsx';

const ImageGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{url: string, name: string} | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const dishes = useMemo(() => {
    let all = RecipeService.getAllDishes();
    if (showMissingOnly) {
      all = all.filter(d => !d.imageUrl || d.imageUrl.trim() === "" || d.imageUrl === "none");
    }
    if (!searchTerm) return all;
    return all.filter(d => d.name.includes(searchTerm));
  }, [searchTerm, showMissingOnly, refreshKey]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportExcel = () => {
    const exportData = dishes.map(d => ({
      'ID': d.id,
      'نام غذا': d.name,
      'دسته‌بندی': CATEGORY_LABELS[d.category] || d.category,
      'مسیر تصویر محلی': `/images/dishes/${d.id}.png`,
      'نام فایل نهایی': `${d.id}.png`
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Images_Audit");
    XLSX.writeFile(wb, `Noosh_Images_List_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)] animate-enter relative">
      
      {/* مدال زوم تصویر */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-8 animate-enter" onClick={() => setZoomedImage(null)}>
           <button className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full">
             <X size={32} />
           </button>
           <div className="max-w-4xl w-full flex flex-col items-center gap-6" onClick={e => e.stopPropagation()}>
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl bg-slate-900 aspect-square w-[500px] flex items-center justify-center">
                 <img 
                    src={zoomedImage.url} 
                    alt={zoomedImage.name} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/500x500/0f172a/teal?text=Image+Not+Found'; }}
                 />
              </div>
              <h3 className="text-white text-3xl font-black">{zoomedImage.name}</h3>
              <p className="text-teal-400 font-mono text-sm">PATH: {zoomedImage.url}</p>
           </div>
        </div>
      )}

      <div className="p-8 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl shadow-inner">
               <ImageIcon size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">بررسی تصاویر در پوشه محلی</h2>
              <p className="text-sm text-slate-500 font-bold mt-1 tracking-tighter">
                آدرس فایل‌ها: <span className="text-blue-600 font-mono">/public/images/dishes/[ID].png</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
               onClick={() => setRefreshKey(prev => prev + 1)}
               className="p-3.5 bg-white border border-slate-200 text-slate-500 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all"
               title="بروزرسانی لیست"
            >
               <RefreshCw size={20} />
            </button>
            <button 
              onClick={() => setShowMissingOnly(!showMissingOnly)} 
              className={`px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all border-2 ${showMissingOnly ? 'bg-rose-600 text-white border-rose-600 shadow-xl' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}
            >
              <Filter size={18} />
              {showMissingOnly ? 'نمایش تمام پخت‌ها' : 'فقط بدون تصاویر ابری'}
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg"
            >
              <FileSpreadsheet size={18} />
              گزارش نهایی
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="جستجوی نام غذا برای کنترل تصویر..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-blue-500 outline-none font-bold bg-white"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-5 w-32 text-center">فایل محلی</th>
              <th className="p-5">نام پخت</th>
              <th className="p-5">دسته</th>
              <th className="p-5 ltr text-left">آدرس دقیق در پروژه</th>
              <th className="p-5 text-center">وضعیت دیتابیس</th>
              <th className="p-5 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dishes.map(dish => {
              const localUrl = `/images/dishes/${dish.id}.png`;
              
              return (
                <tr key={dish.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="p-4 text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-md border-2 border-white cursor-zoom-in relative group/img bg-slate-100"
                      onClick={() => setZoomedImage({url: localUrl, name: dish.name})}
                    >
                       <img 
                          src={localUrl} 
                          alt={dish.name} 
                          className="w-full h-full object-cover transition-transform group-hover/img:scale-110" 
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/f1f5f9/94a3b8?text=?'; }}
                       />
                       <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all">
                          <ZoomIn size={20} className="text-white shadow-lg" />
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-black text-slate-800 text-sm">{dish.name}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">ID: {dish.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-white border border-slate-200 text-slate-500 text-[9px] font-black rounded-lg">
                      {CATEGORY_LABELS[dish.category] || 'نامشخص'}
                    </span>
                  </td>
                  <td className="p-4 text-left dir-ltr font-mono text-[10px] text-blue-600 select-all group-hover:text-blue-800 transition-colors">
                    {localUrl}
                  </td>
                  <td className="p-4 text-center">
                    {(!dish.imageUrl || dish.imageUrl === 'none' || dish.imageUrl.trim() === '') ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded-full border border-rose-100">
                        <AlertCircle size={10} />
                        فقط محلی
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-100">
                        <Check size={10} />
                        لینک ابری فعال
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleCopy(`${dish.id}.png`)}
                      className={`p-3 rounded-2xl transition-all active:scale-90 ${
                        copiedId === `${dish.id}.png` 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-white border border-slate-200 text-slate-400 hover:text-blue-600 shadow-sm'
                      }`}
                    >
                      {copiedId === `${dish.id}.png` ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0 border-t border-white/5">
        <div className="flex items-center gap-3">
           <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Internal Asset Management</span>
        </div>
        <div className="text-[11px] font-black">
          تعداد کل غذاها در لیست ممیزی: <span className="text-teal-400 text-xl mx-2 font-mono">{dishes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageGuide;
