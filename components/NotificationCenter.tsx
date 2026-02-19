
import React, { useState, useEffect } from 'react';
import { Bell, X, Info, CheckCircle, Clock, ShieldAlert, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { NotificationService } from '../services/notificationService';
import { Notification, UserProfile } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose, user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState<string[]>([]);
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('noosh_read_notifs');
    if (stored) setReadIds(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (isOpen) {
      const fetchNotifs = async () => {
        setLoading(true);
        const data = await NotificationService.getUserNotifications(user.uid, user.role || 'user', user.subscriptionExpiry > Date.now());
        setNotifications(data);
        setLoading(false);
      };
      fetchNotifs();
    }
  }, [isOpen, user]);

  const markAsRead = (id: string) => {
    if (!readIds.includes(id)) {
      const next = [...readIds, id];
      setReadIds(next);
      localStorage.setItem('noosh_read_notifs', JSON.stringify(next));
    }
  };

  const handleNotifClick = (n: Notification) => {
    markAsRead(n.id);
    setSelectedNotif(n);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-enter" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col h-[75vh]" onClick={e => e.stopPropagation()}>
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-[1.5rem] shadow-lg"><Bell size={24}/></div>
              <div><h3 className="text-xl font-black">مرکز پیام‌ها</h3><p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mt-1">Inbox & News</p></div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24}/></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar relative">
           {loading ? (
             <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <span className="font-black text-sm">در حال دریافت خبرها...</span>
             </div>
           ) : notifications.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300 text-center px-10">
                <Sparkles size={64} className="opacity-10 mb-4"/>
                <p className="font-black text-slate-400 text-sm leading-relaxed">پیام جدیدی برای شما وجود ندارد. نوش لحظات خوشی را برایتان آرزومند است.</p>
             </div>
           ) : (
             notifications.map(n => {
                const isUnread = !readIds.includes(n.id);
                return (
                    <div 
                        key={n.id} 
                        onClick={() => handleNotifClick(n)}
                        className={`p-6 rounded-[2rem] border-2 transition-all animate-enter cursor-pointer relative group ${
                            isUnread ? 'bg-white border-indigo-500 shadow-xl shadow-indigo-50 ring-4 ring-indigo-50/50' : 'bg-slate-50 border-slate-100'
                        }`}
                    >
                       {isUnread && <div className="absolute top-4 left-4 w-3 h-3 bg-rose-500 rounded-full animate-pulse shadow-lg shadow-rose-200"></div>}
                       <div className="flex gap-4">
                          <div className={`p-3 rounded-2xl shadow-sm h-fit ${isUnread ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                             <MessageSquare size={20}/>
                          </div>
                          <div className="flex-grow">
                             <h4 className={`text-base transition-all ${isUnread ? 'font-black text-slate-900' : 'font-bold text-slate-500'}`}>{n.title}</h4>
                             <p className={`text-[11px] mt-2 leading-relaxed line-clamp-2 ${isUnread ? 'font-black text-slate-700' : 'font-bold text-slate-400'}`}>{n.message}</p>
                             <div className="flex items-center gap-2 mt-4 text-[9px] font-black text-slate-300">
                                <Clock size={12}/> {new Intl.DateTimeFormat('fa-IR', {timeStyle: 'short', dateStyle: 'medium'}).format(new Date(n.send_time))}
                             </div>
                          </div>
                       </div>
                    </div>
                );
             })
           )}

           {/* نمای بزرگ جزئیات پیام */}
           {selectedNotif && (
             <div className="absolute inset-0 z-50 bg-white p-8 flex flex-col animate-enter overflow-y-auto">
                <button onClick={() => setSelectedNotif(null)} className="self-start p-3 bg-slate-100 rounded-2xl text-slate-500 mb-8 hover:bg-slate-200 transition-all flex items-center gap-2 font-black text-xs">
                   <ArrowRight size={18}/> بازگشت به لیست
                </button>
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-5 bg-indigo-600 text-white rounded-[2rem] shadow-xl"><Bell size={32}/></div>
                   <div>
                      <h2 className="text-2xl font-black text-slate-900 leading-tight">{selectedNotif.title}</h2>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">{new Intl.DateTimeFormat('fa-IR', {dateStyle: 'full', timeStyle: 'short'}).format(new Date(selectedNotif.send_time))}</p>
                   </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                   <p className="text-slate-700 text-lg font-bold leading-[2.2rem] text-justify whitespace-pre-wrap">
                      {selectedNotif.message}
                   </p>
                </div>
                <div className="mt-auto pt-10 text-center opacity-20">
                   <img src="https://i.ibb.co/gMDKtj4p/3.png" className="w-20 h-20 mx-auto grayscale" alt="Noosh Logo" />
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
