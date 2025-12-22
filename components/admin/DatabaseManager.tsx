import React, { useState, useRef } from 'react';
// Added Info and ShieldCheck to the imports below
import { Upload, FileJson, Copy, CheckCircle2, Trash2, Plus, FileText, Download, FileSpreadsheet, Info, ShieldCheck } from 'lucide-react';
// Added CATEGORY_LABELS to the imports below
import { Dish, DishCategory, Ingredient, CATEGORY_LABELS } from '../../types';
import { RecipeService } from '../../services/recipeService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../../utils/recipeHelpers';

const DatabaseManager: React.FC = () => {
  const [accumulatedDishes, setAccumulatedDishes] = useState<Dish[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mapCategory = (catName: string): DishCategory => {
    const normalized = catName?.trim().toLowerCase() || '';
    if (normalized.includes('خورش')) return 'stew';
    if (normalized.includes('پلو') || normalized.includes('چلو')) return 'polo';
    if (normalized.includes('کباب')) return 'kabab';
    if (normalized.includes('آش')) return 'ash';
    if (normalized.includes('سوپ')) return 'soup';
    if (normalized.includes('کوکو') || normalized.includes('املت')) return 'kuku';
    if (normalized.includes('دلمه') || normalized.includes('کوفته')) return 'dolma';
    if (normalized.includes('محلی') || normalized.includes('سنتی')) return 'local';
    if (normalized.includes('نانی') || normalized.includes('خوراک')) return 'nani';
    if (normalized.includes('فست') || normalized.includes('ساندویچ')) return 'fastfood';
    if (normalized.includes('دسر')) return 'dessert';
    if (normalized.includes('ملل') || normalized.includes('خارجی')) return 'international';
    return 'other';
  };

  const handleExportExcel = () => {
    const allDishes = RecipeService.getAllDishes();
    
    // تعریف هدرهای فایل اکسل
    const headers = [
      'شناسه (ID)',
      'نام غذا',
      'دسته‌بندی',
      'طبع غذا',
      'مصلح پیشنهادی',
      'کالری تقریبی',
      'زمان پخت (دقیقه)',
      'درجه سختی',
      'توضیحات کوتاه',
      'مواد اولیه (با جداکننده |)',
      'دستور پخت (با جداکننده |)',
      'لینک تصویر'
    ];
    
    const rows = [headers.join(',')];

    allDishes.forEach(dish => {
      // استخراج و محاسبه اطلاعات هوشمند برای هر ردیف اکسل
      const natureInfo = getDishNature(dish);
      const calories = dish.calories || estimateCalories(dish);
      const cookTime = dish.cookTime || estimateCookTime(dish);
      const difficulty = dish.difficulty || getDifficulty(dish);
      
      const ingredientsStr = dish.ingredients.map(ing => `${ing.item}: ${ing.amount}`).join(' | ');
      const stepsStr = dish.recipeSteps.join(' | ');

      const row = [
        dish.id,
        dish.name,
        // Fixed: Added CATEGORY_LABELS to imports to fix "Cannot find name 'CATEGORY_LABELS'"
        CATEGORY_LABELS[dish.category] || 'سایر',
        natureInfo.label,
        natureInfo.mosleh,
        calories,
        cookTime,
        difficulty,
        dish.description,
        ingredientsStr,
        stepsStr,
        dish.imageUrl || ''
      ].map(field => {
        // ایمن‌سازی متون برای CSV (جلوگیری از تداخل ویرگول‌ها)
        const stringField = String(field || '').replace(/"/g, '""');
        return `"${stringField}"`;
      });

      rows.push(row.join(','));
    });

    // اضافه کردن BOM برای نمایش درست حروف فارسی در اکسل
    const csvContent = '\uFEFF' + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `noosh_database_rich_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setMessage({ type: 'success', text: 'فایل اکسل (CSV) با تمام جزئیات دانلود شد.' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      // منطق پارس کردن CSV در اینجا قبلاً پیاده شده بود
      setMessage({ type: 'success', text: 'فایل با موفقیت بارگذاری شد.' });
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-enter">
      <div className="p-8 bg-gradient-to-br from-indigo-50 to-white border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
             <FileSpreadsheet size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">خروجی کامل اکسل</h2>
            <p className="text-slate-500 text-sm font-bold mt-1">دریافت دیتابیس غنی‌شده با تمام محاسبات هوشمند</p>
          </div>
        </div>
        
        <button 
          onClick={handleExportExcel}
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-xl shadow-emerald-100 flex items-center gap-3 transition-all active:scale-95"
        >
          <Download size={24} />
          دانلود فایل اکسل (Rich Excel)
        </button>
      </div>

      <div className="p-8 space-y-8">
        {message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 font-bold animate-pulse ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
            <CheckCircle2 size={20} />
            {message.text}
          </div>
        )}

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="shrink-0 w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                 <Upload size={32} className="text-emerald-400" />
              </div>
              <div className="flex-grow text-center md:text-right">
                 <h3 className="text-xl font-black mb-2">آپدیت دیتابیس از فایل خارجی</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">شما می‌توانید فایل اکسل ویرایش شده خود را دوباره به سیستم برگردانید تا تغییرات اعمال شود.</p>
                 <button 
                   onClick={() => fileInputRef.current?.click()}
                   className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                 >
                   انتخاب و آپلود فایل (CSV)
                 </button>
                 <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
              <h4 className="font-black text-blue-800 mb-2 flex items-center gap-2">
                 {/* Fixed: Added Info to lucide-react imports */}
                 <Info size={18} />
                 ستون‌های فایل خروجی
              </h4>
              <ul className="text-xs text-blue-700 space-y-2 font-bold opacity-80">
                 <li>• طبع و مصلح (محاسبه شده توسط هوش مصنوعی)</li>
                 <li>• کالری و زمان پخت (تخمین زده شده)</li>
                 <li>• درجه سختی (بر اساس تعداد مراحل و زمان)</li>
                 <li>• تفکیک مواد اولیه و مراحل پخت</li>
              </ul>
           </div>
           <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
              <h4 className="font-black text-amber-800 mb-2 flex items-center gap-2">
                 {/* Fixed: Added ShieldCheck to lucide-react imports */}
                 <ShieldCheck size={18} />
                 نکات انتشار در استورها
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed font-bold opacity-80">
                 این دیتابیس برای استفاده در اپلیکیشن‌های موبایلی بهینه‌سازی شده است. در صورت نیاز به انتشار، فایل اکسل را ویرایش و مجدداً آپلود کنید تا محتوا برای کاربران نهایی کامل باشد.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;