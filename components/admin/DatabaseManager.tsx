
import { CloudLightning, Loader2, Database, RefreshCw, Trash2, Download, ShieldAlert, FileSpreadsheet } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { RecipeService } from '../../services/recipeService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../../utils/recipeHelpers';

const DatabaseManager: React.FC = () => {
  const [stats, setStats] = useState({ local: 0, cache: 0, cloud: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info' | 'warning'; text: string } | null>(null);

  const loadStats = async () => {
    setIsLoading(true);
    const local = RecipeService.getLocalCount();
    const cache = await RecipeService.getOfflineCacheCount();
    const cloud = await RecipeService.getRealCloudCount();
    setStats({ local, cache, cloud });
    setIsLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleExportCSV = () => {
    const dishes = RecipeService.getAllDishes();
    
    // هدر استاندارد برای ویرایش حرفه‌ای در اکسل
    const headers = [
      "ID", 
      "Name", 
      "Category", 
      "Description", 
      "Nature_Type", 
      "Nature_Label", 
      "Mosleh", 
      "Calories", 
      "CookTime", 
      "Difficulty", 
      "Nationality", 
      "Ingredients_List", 
      "Recipe_Steps"
    ];

    const rows = dishes.map(d => {
      // استفاده از مقادیر موجود یا محاسبه مقادیر پیش‌فرض برای تکمیل اکسل
      const natureInfo = d.nature ? { type: d.nature, label: d.natureLabel, mosleh: d.mosleh } : getDishNature(d);
      const calories = d.calories || estimateCalories(d);
      const cookTime = d.cookTime || estimateCookTime(d);
      const difficulty = d.difficulty || getDifficulty(d);

      return [
        d.id,
        d.name,
        d.category,
        (d.description || "").replace(/"/g, '""').replace(/,/g, '،').replace(/\n/g, ' '),
        natureInfo.type || "balanced",
        natureInfo.label || "معتدل",
        (natureInfo.mosleh || "نیاز ندارد").replace(/"/g, '""').replace(/,/g, '،'),
        calories,
        cookTime,
        difficulty,
        d.nationality || "ir",
        // فرمت مواد لازم: آیتم:مقدار:واحد (جدا شده با |)
        (d.ingredients || []).map(ing => `${ing.item}:${ing.amount || 0}:${ing.unit || 'واحد'}`).join(' | '),
        // فرمت مراحل پخت: مرحله ۱ | مرحله ۲ (جدا شده با |)
        (d.recipeSteps || []).map(step => step.replace(/"/g, '""').replace(/,/g, '،').replace(/\n/g, ' ')).join(' | ')
      ];
    });

    // افزودن BOM برای پشتیبانی از فارسی در Excel
    let csvContent = "\uFEFF"; 
    csvContent += headers.join(",") + "\n";
    
    rows.forEach(rowArray => {
      // محصور کردن مقادیر در " " برای جلوگیری از خطا در اکسل
      const row = rowArray.map(val => `"${val}"`).join(",");
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Noosh_Data_Ready_To_Clean_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePurgeCloud = async () => {
    if (!confirm("هشدار جدی: تمام اطلاعات موجود در فایربیس پاک خواهد شد. این کار برای جایگزینی با داده‌های جدید شماست. ادامه می‌دهید؟")) return;
    setIsPurging(true);
    const res = await RecipeService.purgeCloudDatabase();
    setMessage({ type: res.success ? 'warning' : 'error', text: res.message });
    await loadStats();
    setIsPurging(false);
  };

  const handleFullSync = async () => {
    setIsSyncing(true);
    const result = await RecipeService.syncAllToFirebase(setProgress);
    setMessage({ type: result.success ? 'success' : 'error', text: result.message });
    await loadStats();
    setIsSyncing(false);
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 border-b border-slate-50 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner"><Database size={36} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">بانک اطلاعاتی ۵۰۹ غذا</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Database Preparation Tool</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={handleExportCSV} className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
              <FileSpreadsheet size={20} /> استخراج فایل اکسل برای پاکسازی
            </button>
            <button onClick={handlePurgeCloud} disabled={isPurging || isSyncing} className="px-4 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs border border-rose-100 hover:bg-rose-100 transition-all">
              {isPurging ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />} پاکسازی فایربیس
            </button>
            <button onClick={loadStats} className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all">
               <RefreshCw size={24} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {isSyncing && (
          <div className="mb-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-black text-slate-600 mb-2"><span>در حال پردازش داده‌ها و انتقال به ابر...</span><span>{progress}%</span></div>
            <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-slate-100"><div className="h-full bg-emerald-500 transition-all shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${progress}%` }}></div></div>
          </div>
        )}

        {message && (
          <div className={`mb-6 p-5 rounded-2xl border text-sm font-bold flex items-center gap-3 animate-enter ${message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            <ShieldAlert size={20} /> {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-slate-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-slate-400 font-black text-[10px] block mb-2 uppercase tracking-tighter">Local Files (Code)</span>
            <span className="text-5xl font-black text-slate-800 relative z-10">{toPersian(stats.local)}</span>
          </div>
          <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-amber-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-amber-500 font-black text-[10px] block mb-2 uppercase tracking-tighter">Browser Cache (IndexedDB)</span>
            <span className="text-5xl font-black text-amber-700 relative z-10">{toPersian(stats.cache)}</span>
          </div>
          <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-indigo-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-indigo-400 font-black text-[10px] block mb-2 uppercase tracking-tighter">Firebase Cloud (Live)</span>
            <span className="text-5xl font-black text-indigo-700 relative z-10">{toPersian(stats.cloud)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
