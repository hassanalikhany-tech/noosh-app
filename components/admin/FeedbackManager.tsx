
import React, { useState, useEffect } from 'react';
// Added RefreshCw to imports
import { MessageCircle, Search, Filter, CheckCircle, Clock, User, Phone, Tag, Trash2, ShieldCheck, Loader2, Info, RefreshCw } from 'lucide-react';
import { FeedbackService } from '../../services/feedbackService';
import { UserFeedback } from '../../types';

const FeedbackManager: React.FC = () => {
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await FeedbackService.getAllFeedback();
    setFeedback(data);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleReview = async (id: string) => {
    setProcessingId(id);
    try {
      await FeedbackService.markAsReviewed(id);
      await loadData();
    } finally {
      setProcessingId(null);
    }
  };

  const toPersian = (num: number | string) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const filtered = feedback.filter(f => 
    (f.user_name || "").includes(searchTerm) || 
    (f.message || "").includes(searchTerm) ||
    (f.user_mobile || "").includes(searchTerm)
  );

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'suggestion': return 'پیشنهاد';
      case 'issue': return 'گزارش مشکل';
      case 'criticism': return 'انتقاد';
      case 'feature_request': return 'قابلیت جدید';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 bg-emerald-600 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-[1.5rem] shadow-xl"><MessageCircle size={32}/></div>
              <div>
                 <h2 className="text-2xl font-black leading-none">صدای کاربران (بازخورد)</h2>
                 <p className="text-[10px] opacity-70 font-bold mt-2 uppercase tracking-widest">User Feedback & Voice Hub</p>
              </div>
           </div>
           <button onClick={loadData} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
             <RefreshCw size={24} className={loading ? 'animate-spin' : ''} />
           </button>
        </div>

        <div className="p-6 bg-slate-50 border-b flex items-center gap-4">
           <div className="relative flex-grow max-w-md">
              <input 
                placeholder="جستجو در پیام‌ها یا نام کاربر..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 font-black text-sm"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
           </div>
           <div className="mr-auto px-4 py-2 bg-white rounded-xl border font-black text-[10px] text-slate-400">کل بازخوردها: {toPersian(feedback.length)}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-slate-100 text-[10px] font-black uppercase text-slate-400">
              <tr>
                <th className="p-5">فرستنده</th>
                <th className="p-5">موضوع / دسته‌بندی</th>
                <th className="p-5">متن بازخورد</th>
                <th className="p-5 text-center">وضعیت</th>
                <th className="p-5 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => (
                <tr key={f.id} className={`transition-all ${f.status === 'new' ? 'bg-emerald-50/20' : 'hover:bg-slate-50'}`}>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800">{f.user_name}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{f.user_mobile}</span>
                    </div>
                  </td>
                  <td className="p-5">
                     <span className={`px-3 py-1 rounded-lg text-[9px] font-black border ${
                        f.category === 'issue' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        f.category === 'suggestion' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-500'
                     }`}>
                        {getCategoryLabel(f.category)}
                     </span>
                  </td>
                  <td className="p-5">
                     <p className="max-w-xs text-xs font-bold text-slate-600 leading-relaxed truncate group-hover:whitespace-normal" title={f.message}>{f.message}</p>
                     <span className="text-[9px] text-slate-300 font-bold block mt-1">{new Intl.DateTimeFormat('fa-IR', {dateStyle: 'medium'}).format(new Date(f.created_at))}</span>
                  </td>
                  <td className="p-5 text-center">
                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black inline-flex items-center gap-2 ${
                        f.status === 'reviewed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 animate-pulse'
                     }`}>
                        {f.status === 'reviewed' ? <ShieldCheck size={14}/> : <Clock size={14}/>}
                        {f.status === 'reviewed' ? 'بررسی شده' : 'جدید'}
                     </span>
                  </td>
                  <td className="p-5 text-left">
                     {f.status === 'new' && (
                        <button 
                            disabled={processingId === f.id}
                            onClick={() => handleReview(f.id)}
                            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-black text-[10px] shadow-lg flex items-center gap-2 active:scale-95 transition-all"
                        >
                           {processingId === f.id ? <Loader2 size={12} className="animate-spin"/> : <CheckCircle size={14}/>}
                           تایید بررسی
                        </button>
                     )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && !loading && (
            <div className="py-20 text-center text-slate-300 font-black italic">هیچ بازخوردی یافت نشد.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackManager;
