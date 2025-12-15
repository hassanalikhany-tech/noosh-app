
import React, { useState, useMemo } from 'react';
import { RecipeService } from '../../services/recipeService';
import { Copy, Check, Search, Image as ImageIcon } from 'lucide-react';
import DishVisual from '../DishVisual';
import { CATEGORY_LABELS } from '../../types';

const ImageGuide: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const dishes = useMemo(() => {
    const all = RecipeService.getAllDishes();
    if (!searchTerm) return all;
    return all.filter(d => d.name.includes(searchTerm));
  }, [searchTerm]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-2">
          <ImageIcon size={24} className="text-blue-600" />
          راهنمای نام‌گذاری تصاویر
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          برای نمایش عکس هر غذا، فایل عکس (PNG) را با نام مشخص شده در پوشه 
          <span className="mx-1 font-mono bg-gray-200 px-1 rounded text-red-600">public/images/dishes</span>
          قرار دهید.
        </p>
        
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
                  <td className="p-3 font-bold text-gray-800">{dish.name}</td>
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
      <div className="p-4 bg-gray-50 border-t text-center text-xs text-gray-400">
        تعداد کل غذاها: {dishes.length}
      </div>
    </div>
  );
};

export default ImageGuide;
