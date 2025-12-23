
import { FileSpreadsheet, Download, CloudLightning, Loader2, CheckCircle2, AlertTriangle, Database, RefreshCw, Trash2, XCircle, HardDrive } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { RecipeService } from '../../services/recipeService';

const DatabaseManager: React.FC = () => {
  const [stats, setStats] = useState({ local: 0, cache: 0, cloud: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
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

  const handleFullSync = async () => {
    if (!confirm(`آیا مطمئن هستید که می‌خواهید ${stats.local} غذای موجود در کد را به فایربیس ارسال کنید؟`)) return;
    setIsSyncing(true);
    setMessage({ type: 'info', text: 'در حال ارسال داده‌ها به فایربیس...' });
    const result = await RecipeService.syncAllToFirebase();
    if (result.success) {
      setMessage({ type: 'success', text: `عملیات موفق! ${result.count} مورد به ابر منتقل شد.` });
      await loadStats();
    } else {
      setMessage({ type: 'error', text: 'خطا: ' + result.message });
    }
    setIsSyncing(false);
  };

  const handleClearCache = async () => {
    if (confirm('با این کار کش مرورگر پاک شده و اپلیکیشن فقط از کدهای داخلی استفاده می‌کند. ادامه می‌دهید؟')) {
      await RecipeService.clearLocalCache();
      await loadStats();
      setMessage({ type: 'success', text: 'حافظه کش مرورگر با موفقیت پاکسازی شد.' });
    }
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Database size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800">وضعیت بانک اطلاعاتی</h2>
              <p className="text-slate-500 font-bold text-sm">مدیریت هماهنگی بین کد، کش و ابر</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleFullSync}
              disabled={isSyncing}
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <CloudLightning size={20} />}
              بروزرسانی کامل ابر
            </button>
            <button 
              onClick={handleClearCache}
              className="px-4 py-4 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-2xl font-black flex items-center gap-2 transition-all"
              title="پاکسازی کش مرورگر"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-6 p-5 rounded-2xl flex items-start gap-3 font-bold border ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            message.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
          }`}>
            <CheckCircle2 size={24} />
            <span className="leading-relaxed">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <span className="text-slate-400 font-black text-[10px] uppercase mb-2 block">دیتابیس در کد (فایل‌ها)</span>
            <span className="text-4xl font-black text-slate-700">{toPersian(stats.local)}</span>
          </div>

          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center">
            <span className="text-amber-500 font-black text-[10px] uppercase mb-2 block">حافظه موقت (کش مرورگر)</span>
            <span className="text-4xl font-black text-amber-700">{toPersian(stats.cache)}</span>
          </div>

          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center relative overflow-hidden">
             {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>}
            <span className="text-indigo-400 font-black text-[10px] uppercase mb-2 block">دیتابیس ابری (فایربیس)</span>
            <span className="text-4xl font-black text-indigo-700">{toPersian(stats.cloud)}</span>
          </div>
        </div>

        {stats.local !== stats.cloud && !isLoading && (
          <div className="mt-8 p-6 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
            <AlertTriangle className="text-rose-600 flex-shrink-0" size={28} />
            <div>
              <h4 className="font-black text-rose-800 text-lg">ناهماهنگی شناسایی شد!</h4>
              <p className="text-sm text-rose-700 font-bold leading-relaxed mt-1">
                تعداد غذاهای شما در کد با دیتابیس ابری همخوانی ندارد. 
                برای اینکه کاربران دیتابیس ابری خالی را نبینند، حتماً <b>«بروزرسانی کامل ابر»</b> را بزنید.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseManager;
