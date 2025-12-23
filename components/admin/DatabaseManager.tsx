
import { CloudLightning, Loader2, CheckCircle2, AlertTriangle, Database, RefreshCw, XCircle, Signal, Download, FileCode } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { RecipeService } from '../../services/recipeService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../../utils/recipeHelpers';

const DatabaseManager: React.FC = () => {
  const [stats, setStats] = useState({ local: 0, cache: 0, cloud: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [connStatus, setConnStatus] = useState<'idle' | 'testing' | 'ok' | 'fail'>('idle');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

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

  const handleTestConnection = async () => {
    setConnStatus('testing');
    const res = await RecipeService.testConnection();
    if (res.success) {
      setConnStatus('ok');
      setMessage({ type: 'success', text: res.message });
    } else {
      setConnStatus('fail');
      setMessage({ type: 'error', text: res.message });
    }
  };

  const handleFullSync = async () => {
    if (!confirm(`آیا مطمئن هستید؟ ${stats.local} غذا یکی‌یکی به فایربیس ارسال خواهد شد.`)) return;
    setIsSyncing(true);
    setProgress(0);
    const result = await RecipeService.syncAllToFirebase((p) => setProgress(p));
    if (result.success) {
      setMessage({ type: 'success', text: result.message || '' });
      await loadStats();
    }
    setIsSyncing(false);
  };

  const handleDownloadEnriched = () => {
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
    link.download = 'recipes_full_backup.ts';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage({ type: 'info', text: 'فایل حاوی ۵۳۵ غذا دانلود شد. محتوای آن را در data/recipes.ts جایگزین کنید تا کد و دیتابیس یکی شوند.' });
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl"><Database size={32} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">مدیریت دیتابیس (foods)</h2>
              <button onClick={handleTestConnection} className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-500 mt-1">بررسی وضعیت اتصال</button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button onClick={handleDownloadEnriched} className="px-4 py-3 bg-blue-600 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95">
              <Download size={20} /> خروجی کامل کد (۵۳۵ مورد)
            </button>
            <button onClick={handleFullSync} disabled={isSyncing} className="px-4 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:bg-emerald-700 transition-all disabled:opacity-50">
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <CloudLightning size={20} />} ارسال به ابر
            </button>
          </div>
        </div>

        {isSyncing && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs font-black text-slate-500"><span>در حال آپلود...</span><span className="dir-ltr">{progress}%</span></div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
          </div>
        )}

        {message && (
          <div className={`mb-6 p-5 rounded-2xl flex items-start gap-3 font-bold border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
            <CheckCircle2 size={24} className="flex-shrink-0" />
            <span className="leading-relaxed text-sm">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <span className="text-slate-400 font-black text-[10px] uppercase mb-2 block">موجود در فایل‌های کد</span>
            <span className="text-4xl font-black text-slate-700">{toPersian(stats.local)}</span>
          </div>
          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center">
            <span className="text-amber-500 font-black text-[10px] uppercase mb-2 block">کش مرورگر (نهایی)</span>
            <span className="text-4xl font-black text-amber-700">{toPersian(stats.cache)}</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center relative overflow-hidden">
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
