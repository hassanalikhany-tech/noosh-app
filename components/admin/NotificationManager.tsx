
import React, { useState, useEffect } from 'react';
import { Bell, Send, Users, Clock, History, Loader2, CheckCircle, Info, ShieldAlert, MessageSquare } from 'lucide-react';
import { NotificationService } from '../../services/notificationService';
import { Notification } from '../../types';

const NotificationManager: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '', target: 'all' as 'all' | 'active' | 'visitors' });

  const loadNotifications = async () => {
    setLoading(true);
    const data = await NotificationService.getAllNotifications();
    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => { loadNotifications(); }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) return;
    setSending(true);
    try {
      await NotificationService.createNotification(formData.title, formData.message, formData.target, "ADMIN");
      setFormData({ title: '', message: '', target: 'all' });
      await loadNotifications();
      alert("اعلان با موفقیت ارسال شد.");
    } finally {
      setSending(true);
    }
  };

  const toPersian = (num: number | string) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="space-y-8 animate-enter">
      <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-10 border-b pb-8">
           <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-100"><Bell size={32}/></div>
           <div>
              <h2 className="text-2xl font-black text-slate-800">مرکز اعلان‌های هوشمند</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Smart Notification Hub</p>
           </div>
        </div>

        <form onSubmit={handleSend} className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-xs font-black text-slate-500 pr-2">عنوان اعلان</label>
                 <input 
                    placeholder="مثلاً: خبرهای جدید در نوش..." 
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-sm"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-slate-500 pr-2">گروه هدف</label>
                 <select 
                    value={formData.target}
                    onChange={e => setFormData({...formData, target: e.target.value as any})}
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-black text-sm"
                 >
                    <option value="all">همه کاربران</option>
                    <option value="active">فقط کاربران فعال (دارای اشتراک)</option>
                    <option value="visitors">فقط ویزیتورها</option>
                 </select>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 pr-2">متن پیام</label>
              <textarea 
                placeholder="متن کامل پیام را اینجا بنویسید..."
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                className="w-full h-32 px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-3xl outline-none focus:border-indigo-500 font-bold text-sm resize-none"
              />
           </div>
           <button 
             type="submit" 
             disabled={sending}
             className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
           >
             {sending ? <Loader2 size={24} className="animate-spin"/> : <Send size={24}/>}
             ارسال نهایی اعلان
           </button>
        </form>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-200">
         <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3"><History className="text-indigo-600"/> تاریخچه ارسال‌ها</h3>
         <div className="space-y-4">
            {notifications.map(n => (
                <div key={n.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                   <div className="flex gap-4">
                      <div className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm h-fit"><MessageSquare size={20}/></div>
                      <div>
                         <h4 className="font-black text-slate-800">{n.title}</h4>
                         <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                         <div className="flex gap-2 mt-3">
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-indigo-600">{n.target_group === 'all' ? 'همه' : n.target_group === 'active' ? 'فعال' : 'ویزیتور'}</span>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black text-slate-400">{new Intl.DateTimeFormat('fa-IR', {timeStyle: 'short', dateStyle: 'medium'}).format(new Date(n.send_time))}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"><CheckCircle size={14}/> ارسال شده</div>
                </div>
            ))}
            {notifications.length === 0 && !loading && (
                <div className="py-12 text-center text-slate-300 font-black italic">هنوز هیچ اعلانی ارسال نشده است.</div>
            )}
         </div>
      </div>
    </div>
  );
};

export default NotificationManager;
