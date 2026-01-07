
import { CloudLightning, Loader2, Database, RefreshCw, Trash2, Download, ShieldAlert, FileSpreadsheet, UploadCloud } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { RecipeService } from '../../services/recipeService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../../utils/recipeHelpers';

const DatabaseManager: React.FC = () => {
  const [stats, setStats] = useState({ local: 0, cache: 0, cloud: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
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
    const dishes = RecipeService.getRawDishes(); // خروجی کامل حتی حذفیات
    if (dishes.length === 0) {
      alert("دیتابیس در حال حاضر خالی است.");
      return;
    }
    
    const headers = [
      "ID", "Name", "Category", "Description", "Nature_Type", "Nature_Label", "Mosleh", "Calories", "CookTime", "Difficulty", "Nationality", "Ingredients_List", "Recipe_Steps"
    ];

    const rows = dishes.map(d => {
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
        (d.ingredients || []).map(ing => `${ing.item}:${ing.amount || 0}:${ing.unit || 'واحد'}`).join(' | '),
        (d.recipeSteps || []).map(step => step.replace(/"/g, '""').replace(/,/g, '،').replace(/\n/g, ' ')).join(' | ')
      ];
    });

    let csvContent = "\uFEFF"; 
    csvContent += headers.join(",") + "\n";
    
    rows.forEach(rowArray => {
      const row = rowArray.map(val => `"${val}"`).join(",");
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Noosh_Database_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSeedDatabase = async () => {
    const count = RecipeService.getLocalCount();
    if (!confirm(`آیا مطمئن هستید که می‌خواهید تمام ${count} غذای موجود در فایل‌های کد را به فایربیس منتقل کنید؟`)) return;
    
    setIsSeeding(true);
    const res = await RecipeService.seedCloudDatabase();
    setMessage({ type: res.success ? 'success' : 'error', text: res.message });
    await loadStats();
    setIsSeeding(false);
  };

  const handlePurgeCloud = async () => {
    if (!confirm("هشدار جدی: تمام اطلاعات موجود در فایربیس پاک خواهد شد. ادامه می‌دهید؟")) return;
    setIsPurging(true);
    const res = await RecipeService.purgeCloudDatabase();
    setMessage({ type: res.success ? 'warning' : 'error', text: res.message });
    await loadStats();
    setIsPurging(false);
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-6 animate-enter">
      {message && (
        <div className={`p-4 rounded-2xl text-sm font-black flex items-center gap-3 animate-bounce ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
          message.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-rose-50 text-rose-700 border border-rose-100'
        }`}>
          <ShieldAlert size={20} />
          {message.text}
          <button onClick={() => setMessage(null)} className="mr-auto opacity-50 hover:opacity-100">×</button>
        </div>
      )}

      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8 border-b border-slate-50 pb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-3xl shadow-inner"><Database size={36} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">وضعیت بانک اطلاعاتی</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Database Live Stats</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            <button 
              onClick={handleSeedDatabase} 
              disabled={isSeeding} 
              className="px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isSeeding ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />} 
              انتقال {toPersian(RecipeService.getLocalCount())} غذا به فایربیس
            </button>

            <button onClick={handleExportCSV} className="px-6 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 active:scale-95">
              <FileSpreadsheet size={20} /> استخراج فایل CSV
            </button>
            
            <button onClick={handlePurgeCloud} disabled={isPurging} className="px-4 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs border border-rose-100 hover:bg-rose-100 transition-all">
              {isPurging ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />} پاکسازی کامل ابر
            </button>
            
            <button onClick={loadStats} className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all">
               <RefreshCw size={24} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-slate-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-slate-400 font-black text-[10px] block mb-2 uppercase tracking-tighter">کل فایل‌های کد</span>
            <span className="text-5xl font-black text-slate-800 relative z-10">{toPersian(stats.local)}</span>
          </div>
          <div className="p-8 bg-amber-50 rounded-[2rem] border border-amber-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-amber-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-amber-500 font-black text-[10px] block mb-2 uppercase tracking-tighter">ذخیره شده در کش</span>
            <span className="text-5xl font-black text-amber-700 relative z-10">{toPersian(stats.cache)}</span>
          </div>
          <div className="p-8 bg-indigo-50 rounded-[2rem] border border-indigo-100 text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-indigo-200/50 group-hover:scale-110 transition-transform"><Database size={100} /></div>
            <span className="text-indigo-400 font-black text-[10px] block mb-2 uppercase tracking-tighter">دیتابیس آنلاین</span>
            <span className="text-5xl font-black text-indigo-700 relative z-10">{toPersian(stats.cloud)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
