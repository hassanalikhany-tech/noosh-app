
import React, { useState, useMemo } from 'react';
import { RecipeService } from '../../services/recipeService';
import { Copy, Check, Search, Image as ImageIcon, FileSpreadsheet, Filter } from 'lucide-react';
import DishVisual from '../DishVisual';
import { CATEGORY_LABELS } from '../../types';
import * as XLSX from 'xlsx';

const ImageGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showMissingOnly, setShowMissingOnly] = useState(false);

  const dishes = useMemo(() => {
    let all = RecipeService.getAllDishes();
    if (showMissingOnly) {
      all = all.filter(d => !d.imageUrl || d.imageUrl.trim() === "");
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
      'وضعیت تصویر': d.imageUrl ? 'دارد' : 'ندارد (آیکون)',
      'نام فایل PNG پیشنهادی': `${d.id}.png`
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dishes_Images_Status");
    XLSX.writeFile(wb, `Noosh_Images_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
              <ImageIcon size={24} className="text-blue-600" />
              راهنمای نام‌گذاری تصاویر
            </h2>
            <p className="text-sm text-slate-500">
              فایل‌های PNG را در پوشه <span className="mx-1 font-mono bg-gray-200 px-1 rounded text-red-600">public/images/dishes</span> قرار دهید.
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowMissingOnly(!showMissingOnly)} 
              className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all border-2 ${showMissingOnly ? 'bg-amber-600 text-white border-amber-500 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'}`}
            >
              <Filter size={16} />
              {showMissingOnly ? 'نمایش همه غذاها' : 'فقط غذاهای بدون عکس واقعی'}
            </button>
            <button 
              onClick={handleExportExcel}
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <FileSpreadsheet size={16} />
              خروجی اکسل از لیست فعلی
            </button>
          </div>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="جستجوی نام غذا..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-0">
        <table className="w-full text-right text-sm">
          <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="p-4 w-20 text-center">وضعیت فعلی</th>
              <th className="p-4">نام غذا</th>
              <th className="p-4">دسته‌بندی</th>
              <th className="p-4 ltr text-left">نام فایل مورد نیاز (PNG)</th>
              <th className="p-4 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dishes.map(dish => {
              const fileName = `${dish.id}.png`;
              return (
                <tr key={dish.id} className="hover:bg-blue-50 transition-colors group">
                  <td className="p-3 text-center">
                    <div className="w-12 h-12 rounded-lg overflow-hidden mx-auto shadow-sm border border-gray-200">
                       <DishVisual category={dish.category} dishId={dish.id} imageUrl={dish.imageUrl} iconSize={20} />
                    </div>
                  </td>
                  <td className="p-3 font-bold text-gray-800">
                    {dish.name}
                    {!dish.imageUrl && <span className="mr-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] rounded-md font-black">بدون عکس</span>}
                  </td>
                  <td className="p-3 text-gray-500">{CATEGORY_LABELS[dish.category]}</td>
                  <td className="p-3 text-left dir-ltr font-mono text-xs text-blue-700 select-all">
                    {fileName}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => handleCopy(fileName)}
                      className={`p-2 rounded-lg transition-all ${
                        copiedId === fileName 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white border border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-600'
                      }`}
                      title="کپی نام فایل"
                    >
                      {copiedId === fileName ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-50 border-t text-center text-xs text-gray-400 font-black">
        تعداد غذاهای لیست شده: {dishes.length} مورد
      </div>
    </div>
  );
};

export default ImageGuide;
