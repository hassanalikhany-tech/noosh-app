
import { CloudLightning, Loader2, CheckCircle2, AlertTriangle, Database, RefreshCw, XCircle, Signal, SignalLow } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { RecipeService } from '../../services/recipeService';

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
      setMessage({ type: 'error', text: res.message + " (احتمالاً باید قوانین Firebase Rules را تنظیم کنید)" });
    }
  };

  const handleFullSync = async () => {
    if (!confirm(`آیا مطمئن هستید؟ ${stats.local} غذا یکی‌یکی به فایربیس ارسال خواهد شد.`)) return;
    
    setIsSyncing(true);
    setProgress(0);
    setMessage({ type: 'info', text: 'در حال ارسال تکی اطلاعات به ابر... لطفاً تب را نبندید.' });
    
    const result = await RecipeService.syncAllToFirebase((p) => setProgress(p));
    
    if (result.success) {
      setMessage({ type: result.errors ? 'error' : 'success', text: result.message || '' });
      await loadStats();
    } else {
      setMessage({ type: 'error', text: 'خطا در همگام‌سازی: ' + result.message });
    }
    setIsSyncing(false);
  };

  const handleClearCache = async () => {
    if (confirm('پاکسازی کش مرورگر؟')) {
      await RecipeService.clearLocalCache();
      await loadStats();
      setMessage({ type: 'success', text: 'کش پاک شد.' });
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
              <h2 className="text-2xl font-black text-slate-800">مدیریت دیتابیس ابری</h2>
              <div className="flex items-center gap-2 mt-1">
                <button 
                  onClick={handleTestConnection}
                  disabled={connStatus === 'testing'}
                  className={`text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 transition-colors ${
                    connStatus === 'ok' ? 'bg-emerald-100 text-emerald-700' : 
                    connStatus === 'fail' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {connStatus === 'testing' ? <RefreshCw size={10} className="animate-spin" /> : <Signal size={10} />}
                  بررسی وضعیت اتصال
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleFullSync}
              disabled={isSyncing}
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <CloudLightning size={20} />}
              ارسال قطعی به فایربیس
            </button>
            <button 
              onClick={handleClearCache}
              className="px-4 py-4 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-2xl font-black transition-all"
              title="پاکسازی کش"
            >
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {isSyncing && (
          <div className="mb-8 space-y-2">
            <div className="flex justify-between text-xs font-black text-slate-500">
              <span>در حال آپلود...</span>
              <span className="dir-ltr">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {message && (
          <div className={`mb-6 p-5 rounded-2xl flex items-start gap-3 font-bold border ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
            message.type === 'error' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'
          }`}>
            {message.type === 'error' ? <XCircle size={24} className="flex-shrink-0" /> : <CheckCircle2 size={24} className="flex-shrink-0" />}
            <span className="leading-relaxed">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <span className="text-slate-400 font-black text-[10px] uppercase mb-2 block">غذاهای موجود در کد</span>
            <span className="text-4xl font-black text-slate-700">{toPersian(stats.local)}</span>
          </div>
          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 text-center">
            <span className="text-amber-500 font-black text-[10px] uppercase mb-2 block">کش مرورگر شما</span>
            <span className="text-4xl font-black text-amber-700">{toPersian(stats.cache)}</span>
          </div>
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 text-center relative overflow-hidden">
             {isLoading && <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>}
            <span className="text-indigo-400 font-black text-[10px] uppercase mb-2 block">موجود در فایربیس</span>
            <span className="text-4xl font-black text-indigo-700">{toPersian(stats.cloud)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManager;
