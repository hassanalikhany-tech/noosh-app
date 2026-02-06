
import React, { useState, useMemo } from 'react';
import { RecipeService } from '../../services/recipeService';
import { Copy, Check, Search, Image as ImageIcon, FileSpreadsheet, Filter, ZoomIn, X, AlertCircle } from 'lucide-react';
import DishVisual from '../DishVisual';
import { CATEGORY_LABELS } from '../../types';
import * as XLSX from 'xlsx';

const ImageGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMissingOnly, setShowMissingOnly] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<{url: string, name: string} | null>(null);

  const dishes = useMemo(() => {
    let all = RecipeService.getAllDishes();
    if (showMissingOnly) {
      // فیلتر هوشمند: غذاهایی که آدرس تصویر ابری ندارند (به عنوان ناقص شناسایی می‌شوند)
      all = all.filter(d => !d.imageUrl || d.imageUrl.trim() === "" || d.imageUrl === "none");
    }
    if (!searchTerm) return all;
    return all.filter(d => d.name.includes(searchTerm));
  }, [searchTerm, showMissingOnly]);

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
      'وضعیت تصویر در دیتابیس': d.imageUrl ? 'دارای آدرس ابری' : 'بدون آدرس (وابسته به فایل محلی)',
      'نام فایل PNG مورد انتظار': `${d.id}.png`
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Images_Audit_Report");
    XLSX.writeFile(wb, `Noosh_Images_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)] animate-enter relative">
      
      {/* مدال زوم تصویر (Full Zoom) */}
      {zoomedImage && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-12 animate-enter" onClick={() => setZoomedImage(null)}>
           <button className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20">
             <X size={32} />
           </button>
           <div className="max-w-5xl w-full flex flex-col items-center gap-8" onClick={e => e.stopPropagation()}>
              <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-slate-900 aspect-video w-full flex items-center justify-center">
                 <img src={zoomedImage.url} alt={zoomedImage.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="text-white text-4xl font-black mb-2">{zoomedImage.name}</h3>
                <p className="text-teal-400 font-bold">پیش‌نمایش نهایی با کیفیت اصلی</p>
              </div>
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
              <h2 className="text-2xl font-black text-slate-800">بررسی و مدیریت تصاویر (Audit)</h2>
              <p className="text-sm text-slate-500 font-bold mt-1">
                برای مشاهده تصویر در سایز بزرگ، روی عکس کلیک کنید.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowMissingOnly(!showMissingOnly)} 
              className={`px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all border-2 ${showMissingOnly ? 'bg-rose-600 text-white border-rose-600 shadow-xl' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}`}
            >
              <Filter size={18} />
              {showMissingOnly ? 'نمایش تمام پخت‌ها' : 'فقط نمایش بدون عکس‌ها'}
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-6 py-3.5 bg-emerald-600 text-white rounded-2xl text-xs font-black flex items-center gap-2 shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <FileSpreadsheet size={18} />
              خروجی اکسل
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="جستجوی نام پخت برای کنترل تصویر..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-12 py-4 rounded-[1.5rem] border-2 border-slate-100 focus:border-blue-500 outline-none font-bold bg-white shadow-sm transition-all"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-5 w-28 text-center">عکس واقعی</th>
              <th className="p-5">نام پخت</th>
              <th className="p-5">دسته</th>
              <th className="p-5 ltr text-left">فایل محلی (PNG)</th>
              <th className="p-5 text-center">وضعیت</th>
              <th className="p-5 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {dishes.map(dish => {
              const fileName = `${dish.id}.png`;
              // اولویت: ۱. آدرس ابری ۲. آدرس محلی در پوشه تصاویر
              const realImgUrl = (dish.imageUrl && dish.imageUrl !== 'none' && dish.imageUrl.trim() !== '') 
                ? dish.imageUrl 
                : `images/dishes/${dish.id}.png`;
              
              return (
                <tr key={dish.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="p-4 text-center">
                    <div 
                      className="w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-md border-2 border-white cursor-zoom-in group-hover:scale-110 transition-transform bg-slate-100 relative group/img"
                      onClick={() => setZoomedImage({url: realImgUrl, name: dish.name})}
                      title="کلیک برای بزرگنمایی"
                    >
                       <DishVisual category={dish.category} dishId={dish.id} imageUrl={dish.imageUrl} iconSize={24} />
                       <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 flex items-center justify-center transition-all opacity-0 group-hover/img:opacity-100">
                          <ZoomIn size={18} className="text-white drop-shadow-lg" />
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-black text-slate-800 text-sm">{dish.name}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-1 tracking-tighter uppercase">{dish.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg border border-slate-200">
                      {CATEGORY_LABELS[dish.category] || 'سایر'}
                    </span>
                  </td>
                  <td className="p-4 text-left dir-ltr font-mono text-[11px] text-blue-600 select-all group-hover:bg-white rounded-lg transition-all">
                    {fileName}
                  </td>
                  <td className="p-4 text-center">
                    {(!dish.imageUrl || dish.imageUrl === 'none' || dish.imageUrl.trim() === '') ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 text-[9px] font-black rounded-full border border-rose-100">
                        <AlertCircle size={12} />
                        فقط محلی
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-100">
                        <Check size={12} />
                        لینک ابری
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleCopy(fileName)}
                      className={`p-3 rounded-2xl transition-all active:scale-90 ${
                        copiedId === fileName 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                        : 'bg-white border border-slate-200 text-slate-400 hover:border-blue-400 hover:text-blue-600 shadow-sm'
                      }`}
                      title="کپی نام فایل برای ذخیره سازی"
                    >
                      {copiedId === fileName ? <Check size={18} /> : <Copy size={18} />}
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
           <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
           <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Visual Integrity Mode</span>
        </div>
        <div className="text-[11px] font-black">
          تعداد کل موارد تحلیل شده: <span className="text-blue-400 text-xl mx-2 font-mono">{dishes.length}</span> پخت
        </div>
      </div>
    </div>
  );
};

export default ImageGuide;
