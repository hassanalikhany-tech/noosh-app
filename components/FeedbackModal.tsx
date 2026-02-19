
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
    if (!message.trim()) return;
    setIsSending(true);
    try {
      // Ensure we pass mobile and full name from user profile
      const userMobile = user.phoneNumber || user.uid || user.username || "نامشخص";
      const userName = user.fullName || user.firstName + " " + user.lastName || "کاربر ناشناس";
      
      await FeedbackService.submitFeedback(
        user.uid, 
        userName, 
        userMobile, 
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
      console.error("Feedback Error Details:", err);
      alert("متأسفانه خطایی در ارسال بازخورد رخ داد. لطفاً اتصال اینترنت خود را بررسی کرده و مجدداً تلاش کنید.");
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-enter" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-8 bg-slate-900 text-white flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-500 text-white rounded-[1.5rem] shadow-lg"><MessageSquare size={24}/></div>
              <div><h3 className="text-xl font-black">صدای شما</h3><p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-1">Feedback & Support</p></div>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={24}/></button>
        </div>

        <div className="p-8">
           {isSuccess ? (
              <div className="py-20 flex flex-col items-center text-center gap-6 animate-enter">
                 <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-bounce"><CheckCircle size={48}/></div>
                 <div>
                    <h4 className="text-2xl font-black text-slate-800">پیام شما دریافت شد</h4>
                    <p className="text-slate-500 font-bold mt-2">از اینکه به بهبود «نوش» کمک می‌کنید سپاسگزاریم.</p>
                 </div>
              </div>
           ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-enter">
                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 pr-2 flex items-center gap-2"><Tag size={14}/> نوع بازخورد</label>
                    <div className="grid grid-cols-2 gap-3">
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
                           className={`px-4 py-3 rounded-2xl border-2 font-black text-[11px] flex items-center gap-2 transition-all ${category === cat.id ? `bg-${cat.color}-500 border-${cat.color}-600 text-white shadow-lg` : 'bg-slate-50 border-transparent text-slate-500 hover:border-slate-200'}`}
                         >
                           <cat.icon size={16}/> {cat.label}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <label className="text-xs font-black text-slate-400 pr-2 flex items-center gap-2"><MessageSquare size={14}/> پیام شما</label>
                    <textarea 
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="نظر، پیشنهاد یا گزارش خود را اینجا بنویسید..."
                      className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-3xl p-6 outline-none focus:border-indigo-500 font-bold text-sm text-slate-800 resize-none transition-all shadow-inner"
                    />
                 </div>

                 <button 
                   type="submit" 
                   disabled={isSending || !message.trim()}
                   className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all disabled:opacity-50"
                 >
                    {isSending ? <Loader2 size={24} className="animate-spin"/> : <Send size={24}/>}
                    ارسال بازخورد
                 </button>
              </form>
           )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
