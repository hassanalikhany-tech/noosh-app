
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, ImageIcon, CheckCircle, XCircle, FileSpreadsheet, Lock, ShieldAlert, SmartphoneNfc, UserPlus, UserCheck, UserX, Loader2, Award, Gift, QrCode, Ticket, TicketMinus, Info, Check, X, CreditCard, Eye, Fingerprint, Clock, Banknote, Shield, Settings2, Layers, Save, RefreshCw, BarChart3, PieChart, Activity, Bell, MessageSquare, Flame, Eraser, FlaskConical } from 'lucide-react';
import { UserService } from '../../services/userService';
import { PaymentService } from '../../services/paymentService';
import DatabaseManager from './DatabaseManager';
import DuplicateResolver from './DuplicateResolver';
import ImageGuide from './ImageGuide';
import CsvToJsonConverter from './CsvToJsonConverter';
import PaymentLogs from './PaymentLogs';
import SecurityReports from './SecurityReports';
import FinancialSettings from './FinancialSettings';
import BackupManager from './BackupManager';
import VisitorSettlements from './VisitorSettlements';
import FinancialReports from './FinancialReports';
import SystemAnalytics from './SystemAnalytics';
import SecurityAlerts from './SecurityAlerts';
import NotificationManager from './NotificationManager';
import FeedbackManager from './FeedbackManager';
import { db } from '../../services/firebase';
import { collection, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';

interface AdminDashboardProps {
  onLogout: () => void;
  onSwitchToApp?: () => void;
}

type AdminTab = 'users' | 'sandbox' | 'security-alerts' | 'analytics' | 'notifications' | 'feedback' | 'settlements' | 'financial-reports' | 'financial' | 'payments' | 'security-logs' | 'visitors' | 'images' | 'duplicates' | 'csv-converter' | 'database' | 'security-policy' | 'backup';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSwitchToApp }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sandboxEnabled, setSandboxEnabled] = useState(PaymentService.getSandboxMode());
  const [clearing, setClearing] = useState(false);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const uRes = await UserService.getAllUsers();
      if (uRes.success) setUsers(uRes.data);
      if (activeTab === 'visitors') {
        const vList = await UserService.getAllVisitors();
        setVisitors(vList);
      }
    } catch (err) {}
    finally { setIsLoading(false); }
  };

  useEffect(() => { loadInitialData(); }, [activeTab]);

  const toggleSandbox = () => {
    const newState = !sandboxEnabled;
    setSandboxEnabled(newState);
    PaymentService.setSandboxMode(newState);
    alert(`حالت تست ${newState ? 'فعال' : 'غیرفعال'} شد. در این حالت پرداخت‌ها واقعی نیستند.`);
  };

  const handleFullCleanup = async () => {
    if (!confirm("هشدار جدی: تمام داده‌های تستی شامل کاربران، ویزیتورها، تراکنش‌ها و پورسانت‌ها پاک خواهند شد. آیا مطمئن هستید؟")) return;
    setClearing(true);
    try {
      const collections = ['users', 'visitor_profiles', 'visitor_financial_info', 'payments', 'commission_logs', 'visitor_settlements', 'security_logs', 'alerts', 'user_devices', 'user_feedback'];
      for (const colName of collections) {
        const snap = await getDocs(collection(db, colName));
        const batch = writeBatch(db);
        snap.docs.forEach(d => {
          // جلوگیری از حذف ادمین اصلی
          if (colName === 'users' && d.id === '09143013288') return;
          batch.delete(d.ref);
        });
        await batch.commit();
      }
      alert("دیتابیس با موفقیت پاکسازی شد. اکنون اپلیکیشن آماده لانچ واقعی است.");
      window.location.reload();
    } catch (e) {
      alert("خطا در پاکسازی داده‌ها.");
    } finally {
      setClearing(false);
    }
  };

  const toPersian = (n: any) => n?.toString().replace(/\d/g, (d:any) => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dir-rtl text-right font-sans">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg"><ShieldCheck size={28} /></div>
            <h1 className="text-xl font-black uppercase tracking-tighter">پنل مدیریت اختصاصی نوش</h1>
          </div>
          <div className="flex gap-2">
            {onSwitchToApp && <button onClick={onSwitchToApp} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-all"><ExternalLink size={18} /> بازگشت به اپ</button>}
            <button onClick={onLogout} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all"><LogOut size={18} /> خروج</button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b sticky top-[84px] z-40 overflow-x-auto no-scrollbar">
        <div className="container mx-auto flex gap-1 px-4 min-w-max">
          {[
            {id: 'users', label: 'کاربران', icon: Users},
            {id: 'sandbox', label: 'تست و لانچ', icon: FlaskConical},
            {id: 'notifications', label: 'اعلان‌ها', icon: Bell},
            {id: 'feedback', label: 'بازخورد', icon: MessageSquare},
            {id: 'analytics', label: 'آنالیتیکس', icon: Activity},
            {id: 'settlements', label: 'تسویه', icon: Banknote},
            {id: 'financial', label: 'قیمت‌گذاری', icon: Settings2},
            {id: 'payments', label: 'تراکنش‌ها', icon: CreditCard},
            {id: 'visitors', label: 'ویزیتورها', icon: Award},
            {id: 'database', label: 'دیتابیس غذا', icon: FileJson},
            {id: 'backup', label: 'بک‌آپ', icon: Save},
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id as AdminTab)} 
              className={`py-4 px-6 font-black text-[11px] flex items-center gap-2 transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              <tab.icon size={16} /> {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'sandbox' && (
          <div className="space-y-8 animate-enter">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-200">
               <div className="flex items-center gap-4 mb-10">
                  <div className="p-4 bg-amber-500 text-white rounded-3xl shadow-xl shadow-amber-100"><FlaskConical size={36}/></div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800">محیط شبیه‌ساز و تست (Sandbox)</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Simulated Testing Environment</p>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2.5rem] border-4 border-dashed border-amber-200 bg-amber-50/30 space-y-6">
                     <div className="flex justify-between items-center">
                        <h3 className="text-lg font-black text-amber-800">وضعیت شبیه‌ساز پرداخت</h3>
                        <button 
                          onClick={toggleSandbox}
                          className={`w-16 h-8 rounded-full transition-all relative ${sandboxEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                           <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${sandboxEnabled ? 'right-9' : 'right-1'}`}></div>
                        </button>
                     </div>
                     <p className="text-xs font-bold text-amber-700 leading-relaxed">
                        با فعال کردن این گزینه، درگاه واقعی زرین‌پال غیرفعال شده و یک درگاه مجازی جایگزین می‌شود. شما می‌توانید بدون پرداخت پول، تمام فرآیند خرید، تمدید و واریز پورسانت ویزیتور را تست کنید.
                     </p>
                  </div>

                  <div className="p-8 rounded-[2.5rem] border-4 border-dashed border-rose-200 bg-rose-50/30 space-y-6">
                     <h3 className="text-lg font-black text-rose-800">پاکسازی داده‌های مرحله تست</h3>
                     <p className="text-xs font-bold text-rose-700 leading-relaxed">
                        این گزینه تمام ردپاهای مرحله تست را از دیتابیس پاک می‌کند. قبل از انتشار نهایی اپلیکیشن برای کاربران واقعی، حتماً از این ابزار استفاده کنید تا ویزیتورها و تراکنش‌های فیک حذف شوند.
                     </p>
                     <button 
                        onClick={handleFullCleanup}
                        disabled={clearing}
                        className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                     >
                        {clearing ? <Loader2 size={20} className="animate-spin"/> : <Eraser size={20}/>}
                        پاکسازی کامل برای لانچ واقعی (PROD)
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px]"></div>
               <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-3 text-teal-400"><Info/> راهنمای تست پورسانت ویزیتور</h3>
                  <div className="grid md:grid-cols-3 gap-6 pt-4">
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                        <span className="text-[10px] font-black text-teal-500 uppercase">مرحله ۱</span>
                        <p className="text-[11px] font-bold opacity-80">یک کاربر را در پنل ادمین به نقش «ویزیتور» ارتقا دهید و کد معرف او را کپی کنید.</p>
                     </div>
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                        <span className="text-[10px] font-black text-teal-500 uppercase">مرحله ۲</span>
                        <p className="text-[11px] font-bold opacity-80">خارج شوید و یک حساب جدید با شماره‌ای دیگر بسازید و کد معرف مرحله قبل را وارد کنید.</p>
                     </div>
                     <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                        <span className="text-[10px] font-black text-teal-500 uppercase">مرحله ۳</span>
                        <p className="text-[11px] font-bold opacity-80">در حالت Sandbox خرید انجام دهید. سپس به پنل ادمین برگردید و پورسانت ویزیتور را در تب «تسویه» چک کنید.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6 animate-enter">
            <div className="bg-white rounded-[2.5rem] shadow-sm border overflow-hidden border-slate-200">
               <div className="p-6 bg-slate-50 flex justify-between items-center border-b">
                  <div className="relative"><input placeholder="جستجو..." className="px-6 py-3 bg-white border rounded-2xl outline-none focus:border-indigo-500 font-bold text-sm w-72 pr-12" /><Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"/></div>
                  <div className="text-xs font-black text-slate-400">تعداد کل: {toPersian(users.length)}</div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50 font-black text-[10px] opacity-60"><tr><th className="p-5">کاربر</th><th className="p-5">نقش</th><th className="p-5">اشتراک</th><th className="p-5 text-left">عملیات</th></tr></thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map(user => (
                        <tr key={user.uid} className="hover:bg-slate-50">
                          <td className="p-5 font-black">{user.fullName} <span className="text-[9px] text-slate-400">{user.mobileNumber}</span></td>
                          <td className="p-5 text-[10px] font-bold">{user.role || 'user'}</td>
                          <td className="p-5 text-[10px] font-bold">{new Date(user.subscriptionExpiry) > new Date() ? 'فعال' : 'منقضی'}</td>
                          <td className="p-5 text-left">
                             <button onClick={() => UserService.toggleUserApproval(user.uid, !!user.isApproved).then(loadInitialData)} className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-all"><UserCheck size={18}/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && <NotificationManager />}
        {activeTab === 'feedback' && <FeedbackManager />}
        {activeTab === 'analytics' && <SystemAnalytics />}
        {activeTab === 'settlements' && <VisitorSettlements />}
        {activeTab === 'financial' && <FinancialSettings />}
        {activeTab === 'payments' && <PaymentLogs />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'backup' && <BackupManager />}
        {activeTab === 'visitors' && (
          <div className="space-y-6 animate-enter">
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
               <div className="p-8 bg-indigo-600 text-white flex flex-col sm:flex-row justify-between items-center">
                 <div className="flex items-center gap-4"><Award size={40}/><h2 className="text-2xl font-black">ویزیتورها و همکاران</h2></div>
                 <div className="font-black text-sm">{toPersian(visitors.length)} همکار</div>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-right text-sm">
                   <thead className="bg-slate-50 font-black text-[10px] opacity-60"><tr><th className="p-5">نام</th><th className="p-5">کد معرف</th><th className="p-5">پورسانت</th><th className="p-5">وضعیت KYC</th></tr></thead>
                   <tbody className="divide-y divide-slate-100">
                     {visitors.map((v, i) => (
                       <tr key={i}>
                         <td className="p-5 font-black">{v.fullName}</td>
                         <td className="p-5 font-mono text-indigo-600">{v.referral_code}</td>
                         <td className="p-5 font-black text-emerald-600">{toPersian(v.total_commission)}</td>
                         <td className="p-5"><span className={`px-3 py-1 rounded-lg text-[9px] font-black ${v.kyc_status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{v.kyc_status}</span></td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
