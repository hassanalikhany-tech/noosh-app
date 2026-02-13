
import React, { useState, useEffect } from 'react';
import { Bell, X, Info, CheckCircle, Clock, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-enter" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col h-[70vh]" onClick={e => e.stopPropagation()}>
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-[1.5rem] shadow-lg"><Bell size={24}/></div>
              <div><h3 className="text-xl font-black">مرکز پیام‌ها</h3><p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mt-1">Inbox & News</p></div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24}/></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
           {loading ? (
             <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300">
                <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <span className="font-black text-sm">در حال دریافت خبرها...</span>
             </div>
           ) : notifications.length === 0 ? (
             <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-300 text-center px-10">
                <Sparkles size={64} className="opacity-10 mb-4"/>
                <p className="font-black text-slate-400">پیام جدیدی برای شما وجود ندارد. نوش لحظات خوشی را برایتان آرزومند است.</p>
             </div>
           ) : (
             notifications.map(n => (
                <div key={n.id} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-indigo-200 transition-all animate-enter">
                   <div className="flex gap-4">
                      <div className="p-3 bg-white text-indigo-600 rounded-2xl shadow-sm h-fit"><MessageSquare size={20}/></div>
                      <div>
                         <h4 className="font-black text-slate-800 text-base">{n.title}</h4>
                         <p className="text-[11px] text-slate-500 font-bold mt-2 leading-relaxed">{n.message}</p>
                         <div className="flex items-center gap-2 mt-4 text-[9px] font-black text-slate-300">
                            <Clock size={12}/> {new Intl.DateTimeFormat('fa-IR', {timeStyle: 'short', dateStyle: 'medium'}).format(new Date(n.send_time))}
                         </div>
                      </div>
                   </div>
                </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
