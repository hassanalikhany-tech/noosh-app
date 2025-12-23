
import { CloudLightning, Loader2, CheckCircle2, AlertTriangle, Database, RefreshCw, Trash2, Download, ShieldAlert } from 'lucide-react';
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

  const handlePurgeCloud = async () => {
    if (!confirm("⚠️ هشدار جدی: تمام غذاهای موجود در فایربیس پاک خواهند شد! این کار برای حذف موارد تکراری و ناهماهنگ ضروری است. ادامه می‌دهید؟")) return;
    setIsPurging(true);
    const res = await RecipeService.purgeCloudDatabase();
    if (res.success) {
      setMessage({ type: 'warning', text: "ابر پاکسازی شد. حالا 'ارسال به ابر' را بزنید تا ۵۰۹ غذای تمیز جایگزین شوند." });
      await loadStats();
    } else {
      setMessage({ type: 'error', text: res.message || 'خطا در پاکسازی' });
    }
    setIsPurging(false);
  };

  const handleFullSync = async () => {
    setIsSyncing(true);
    setProgress(0);
    const result = await RecipeService.syncAllToFirebase((p) => setProgress(p));
    if (result.success) {
      setMessage({ type: 'success', text: result.message || '' });
      await loadStats();
    }
    setIsSyncing(false);
  };

  const handleDownloadRichCode = () => {
    const allDishes = RecipeService.getAllDishes();
    const enrichedDishes = allDishes.map(dish => {
      const natureInfo = getDishNature(dish);
      return {
        ...dish,
        calories: dish.calories || estimateCalories(dish),
        cookTime: dish.cookTime || estimateCookTime(dish),
        difficulty: dish.difficulty || getDifficulty(dish),
        nature: dish.nature || natureInfo.type,
        natureLabel: dish.natureLabel || natureInfo.label,
        mosleh: dish.mosleh || natureInfo.mosleh
      };
    });

    const fileContent = `import { Dish } from '../types';\n\nexport const DEFAULT_DISHES: Dish[] = ${JSON.stringify(enrichedDishes, null, 2)};\n`;
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recipes.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage({ type: 'info', text: 'فایل تمیز recipes.ts دانلود شد. آن را در پوشه data جایگزین کنید.' });
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Database size={32} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">وضعیت دیتابیس مرکزی</h2>
              <p className="text-slate-400 text-xs font-bold">مدیریت هماهنگی بین کد، مرورگر و سرور</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={handleDownloadRichCode} className="px-4 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95">
              <Download size={18} /> دریافت کد تمیز (۵۰۹ مورد)
            </button>
            <button onClick={handlePurgeCloud} disabled={isPurging || isSyncing} className="px-4 py-3 bg-rose-100 text-rose-700 rounded-2xl font-black text-xs border border-rose-200 flex items-center gap-2 hover:bg-rose-200 transition-all">
              {isPurging ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />} پاکسازی کامل ابر
            </button>
            <button onClick={handleFullSync} disabled={isSyncing || isPurging} className="px-4 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs shadow-lg flex items-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50">
              {isSyncing ? <Loader2 className="animate-spin" size={18} /> : <CloudLightning size={18} />} ارسال به ابر
            </button>
          </div>
        </div>

        {isSyncing && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-[10px] font-black text-slate-500"><span>در حال آپلود...</span><span className="dir-ltr">{progress}%</span></div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
          </div>
        )}

        {message && (
          <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 border font-bold ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            message.type === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
            'bg-blue-50 text-blue-700 border-blue-100'
          }`}>
            <ShieldAlert size={20} className="flex-shrink-0" />
            <span className="text-xs leading-relaxed">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center group hover:border-teal-300 transition-all">
            <span className="text-slate-400 font-black text-[10px] uppercase mb-2 block">موجود در فایل‌های کد</span>
            <span className="text-4xl font-black text-slate-700">{toPersian(stats.local)}</span>
          </div>
          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center group hover:border-amber-300 transition-all">
            <span className="text-amber-500 font-black text-[10px] uppercase mb-2 block">کش مرورگر (نهایی)</span>
            <span className="text-4xl font-black text-amber-700">{toPersian(stats.cache)}</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center relative overflow-hidden group hover:border-indigo-300 transition-all">
             {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>}
            <span className="text-indigo-400 font-black text-[10px] uppercase mb-2 block">ذخیره در فایربیس</span>
            <span className="text-4xl font-black text-indigo-700">{toPersian(stats.cloud)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
