
import React, { useState } from 'react';
import { X, Send, MessageSquare, AlertCircle, CheckCircle, HelpCircle, User, Zap, Info, Loader2, Tag } from 'lucide-react';
import { FeedbackService } from '../services/feedbackService';
import { UserProfile, FeedbackCategory } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, user }) => {
  const [category, setCategory] = useState<FeedbackCategory>('suggestion');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isSending) return;
    
    setIsSending(true);
    try {
      // Direct call with explicit Fallbacks to prevent undefined
      const uid = user.uid || "anonymous";
      const name = user.fullName || "کاربر نوش";
      const mobile = user.phoneNumber || user.mobileNumber || user.uid || "بدون شماره";
      
      await FeedbackService.submitFeedback(
        uid,
        name,
        mobile,
        category,
        message.trim()
      );
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setMessage('');
      }, 2500);
    } catch (err) {
      console.error("Feedback error:", err);
      alert("متأسفانه خطایی در ارسال پیام رخ داد. لطفاً چند لحظه دیگر دوباره تلاش کنید.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1200] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-enter" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 sm:p-8 bg-slate-900 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500 text-white rounded-[1.25rem] shadow-lg"><MessageSquare size={20}/></div>
              <div><h3 className="text-lg font-black leading-none">ارسال بازخورد مستقیم</h3><p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Feedback & Support</p></div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20}/></button>
        </div>

        <div className="p-6 sm:p-8">
           {isSuccess ? (
              <div className="py-16 flex flex-col items-center text-center gap-5 animate-enter">
                 <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce"><CheckCircle size={40}/></div>
                 <div>
                    <h4 className="text-xl font-black text-slate-800">پیام شما دریافت شد</h4>
                    <p className="text-slate-500 font-bold mt-2 text-sm">از اینکه به بهبود نوش کمک می‌کنید سپاسگزاریم.</p>
                 </div>
              </div>
           ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-enter">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 pr-2 flex items-center gap-2 uppercase tracking-widest"><Tag size={12}/> موضوع پیام</label>
                    <div className="grid grid-cols-2 gap-2">
                       {[
                         { id: 'suggestion', label: 'پیشنهاد', icon: Zap, color: 'indigo' },
                         { id: 'issue', label: 'گزارش مشکل', icon: AlertCircle, color: 'rose' },
                         { id: 'criticism', label: 'انتقاد', icon: Info, color: 'amber' },
                         { id: 'feature_request', label: 'قابلیت جدید', icon: HelpCircle, color: 'teal' }
                       ].map(cat => (
                         <button 
                           key={cat.id} 
                           type="button"
                           onClick={() => setCategory(cat.id as FeedbackCategory)}
                           className={`px-3 py-2.5 rounded-xl border-2 font-black text-[10px] flex items-center gap-2 transition-all ${category === cat.id ? `bg-${cat.color}-500 border-${cat.color}-600 text-white shadow-md` : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200'}`}
                         >
                           <cat.icon size={14}/> {cat.label}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 pr-2 flex items-center gap-2 uppercase tracking-widest"><MessageSquare size={12}/> متن پیام شما</label>
                    <textarea 
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="پیام خود را اینجا بنویسید..."
                      className="w-full h-36 bg-slate-50 border-2 border-slate-100 rounded-[1.75rem] p-5 outline-none focus:border-indigo-500 font-bold text-sm text-slate-800 resize-none transition-all"
                    />
                 </div>

                 <button 
                   type="submit" 
                   disabled={isSending || !message.trim()}
                   className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-base flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all disabled:opacity-50"
                 >
                    {isSending ? <Loader2 size={20} className="animate-spin"/> : <Send size={20}/>}
                    ارسال برای مدیریت
                 </button>
              </form>
           )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
