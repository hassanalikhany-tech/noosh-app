
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon, CheckCircle, XCircle, FileSpreadsheet, Lock, Globe, ShieldAlert, Code, AlertTriangle, ShieldEllipsis, ShieldClose, SmartphoneNfc, Clock, Filter, ArrowUpDown, UserPlus, UserCheck, UserX, Info, Loader2, RotateCcw, Briefcase, TrendingUp, Coins, History, CreditCard, Layers, Database, Download, Settings as SettingsIcon, Percent } from 'lucide-react';
import { UserService } from '../../services/userService';
import { RecipeService } from '../../services/recipeService';
import { UserProfile, CATEGORY_LABELS, AppConfig } from '../../types';
import DatabaseManager from './DatabaseManager';
import DuplicateResolver from './DuplicateResolver';
import BackupManager from './BackupManager';
import ImageGuide from './ImageGuide';
import CsvToJsonConverter from './CsvToJsonConverter';
import { auth } from '../../services/firebase';

interface AdminDashboardProps {
  onLogout: () => void;
  onSwitchToApp?: () => void;
}

type SortField = 'expiry-asc' | 'expiry-desc' | 'name' | 'referrals' | 'balance';
type FilterStatus = 'all' | 'unapproved' | 'expired' | 'active' | 'visitors';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSwitchToApp }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'duplicates' | 'backup' | 'images' | 'csv-converter' | 'security'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortField, setSortField] = useState<SortField>('expiry-asc');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [processingAction, setProcessingAction] = useState<{uid: string, action: string} | null>(null);
  const [appConfig, setAppConfig] = useState<AppConfig>({ subscriptionFee: 1500000, commissionRate: 20 });
  const [isSavingConfig, setIsSavingConfig] = useState(false);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const config = await UserService.getAppConfig();
      setAppConfig(config);
      
      const result = await UserService.getAllUsers();
      if (result.success) {
        setUsers(result.data);
        setPermissionError(null);
      } else {
        setPermissionError(result.error || 'خطا در بارگذاری اطلاعات.');
      }
    } catch (err: any) {
      setPermissionError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [activeTab]);

  const handleUpdateConfig = async () => {
    setIsSavingConfig(true);
    try {
      await UserService.updateAppConfig(appConfig);
      alert("تنظیمات مالی با موفقیت بروزرسانی شد.");
    } catch {
      alert("خطا در ذخیره تنظیمات.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleToggleApproval = async (uid: string, currentStatus: boolean) => {
    setProcessingAction({ uid, action: 'approve' });
    try {
      await UserService.toggleUserApproval(uid, currentStatus);
      const result = await UserService.getAllUsers();
      if (result.success) setUsers(result.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleSettleBalance = async (uid: string, fullName: string, amount: number) => {
    if (amount <= 0) return alert('موجودی این ویزیتور صفر است.');
    if (!confirm(`آیا تایید می‌کنید که مبلغ ${amount.toLocaleString()} ریال به حساب «${fullName}» واریز شده؟`)) return;
    
    setProcessingAction({ uid, action: 'settle' });
    try {
      await UserService.settleVisitorBalance(uid, amount);
      const result = await UserService.getAllUsers();
      if (result.success) setUsers(result.data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleToggleVisitor = async (uid: string, currentStatus: boolean) => {
    setProcessingAction({ uid, action: 'visitor' });
    try {
      await UserService.toggleVisitorStatus(uid, currentStatus);
      // بروزرسانی آنی لیست
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isVisitor: !currentStatus } : u));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleExtend = async (uid: string) => {
    setProcessingAction({ uid, action: 'extend' });
    try {
      const updatedUser = await UserService.extendSubscription(uid, 31);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, subscriptionExpiry: updatedUser.subscriptionExpiry } : u));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleResetDevices = async (uid: string, fullName: string) => {
    if (!confirm(`آیا لیست دستگاه‌های ${fullName} ریست شود؟`)) return;
    setProcessingAction({ uid, action: 'reset' });
    try {
      await UserService.resetUserDevices(uid);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, registeredDevices: [] } : u));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDelete = async (uid: string, fullName: string) => {
    if (auth.currentUser?.uid === uid) return alert('خودتان را نمی‌توانید حذف کنید!');
    if (!confirm(`آیا از حذف قطعی کاربر «${fullName}» از کل سیستم و دیتابیس فایربیس مطمئن هستید؟ این عمل غیرقابل بازگشت است.`)) return;
    
    setProcessingAction({ uid, action: 'delete' });
    try {
      await UserService.deleteUser(uid);
      // حذف آنی از لیست کاربران در استیت
      setUsers(prev => prev.filter(u => u.uid !== uid));
    } catch (err: any) {
      alert("خطا در حذف: " + err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const toPersian = (n: number | string) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);
  const getDaysLeft = (expiry: number) => {
    const diff = (expiry || 0) - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const processedUsers = useMemo(() => {
    let result = [...users];
    if (filterStatus === 'unapproved') result = result.filter(u => !u.isApproved);
    else if (filterStatus === 'expired') result = result.filter(u => getDaysLeft(u.subscriptionExpiry) <= 0);
    else if (filterStatus === 'active') result = result.filter(u => u.isApproved && getDaysLeft(u.subscriptionExpiry) > 0);
    else if (filterStatus === 'visitors') result = result.filter(u => u.isVisitor);

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(u => 
        (u.username || "").toLowerCase().includes(lowerSearch) || 
        (u.fullName || "").includes(searchTerm) ||
        (u.email || "").toLowerCase().includes(lowerSearch) ||
        (u.referralCode || "").includes(searchTerm)
      );
    }

    result.sort((a, b) => {
      if (sortField === 'expiry-asc') return getDaysLeft(a.subscriptionExpiry) - getDaysLeft(b.subscriptionExpiry);
      if (sortField === 'expiry-desc') return getDaysLeft(b.subscriptionExpiry) - getDaysLeft(a.subscriptionExpiry);
      if (sortField === 'name') return (a.fullName || "").localeCompare(b.fullName || "", 'fa');
      if (sortField === 'referrals') return (b.referralCount || 0) - (a.referralCount || 0);
      if (sortField === 'balance') return (b.referralBalance || 0) - (a.referralBalance || 0);
      return 0;
    });
    return result;
  }, [users, filterStatus, searchTerm, sortField]);

  const stats = useMemo(() => ({
    total: users.length,
    visitors: users.filter(u => u.isVisitor).length,
    unapproved: users.filter(u => !u.isApproved).length,
    totalBalance: users.reduce((acc, u) => acc + (u.referralBalance || 0), 0)
  }), [users]);

  if (permissionError) return <div className="p-20 text-center font-black">{permissionError}</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dir-rtl text-right font-sans">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg"><ShieldCheck size={28} /></div>
            <div>
              <h1 className="text-xl font-black">پنل مدیریت هوشمند نوش</h1>
              <p className="text-emerald-400 text-[10px] font-bold uppercase">Dynamic Pricing & Revenue Management</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onSwitchToApp} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold flex items-center gap-2 transition-all text-sm">
              <ExternalLink size={18} /> ورود به اپ
            </button>
            <button onClick={onLogout} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg text-sm">
              <LogOut size={18} /> خروج
            </button>
          </div>
        </div>
      </header>

      {/* بخش تب‌های مدیریت با قابلیت اسکرول افقی برای موبایل */}
      <div className="bg-white border-b border-slate-200 sticky top-[84px] z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex gap-1 min-w-max">
          {[
            {id: 'users', label: 'کاربران', icon: Users},
            {id: 'csv-converter', label: 'مبدل اکسل', icon: FileSpreadsheet},
            {id: 'database', label: 'دیتابیس', icon: Database},
            {id: 'duplicates', label: 'اصلاحات', icon: Layers},
            {id: 'images', label: 'تصاویر', icon: ImageIcon},
            {id: 'backup', label: 'پشتیبان', icon: Download},
            {id: 'security', label: 'تنظیمات مالی', icon: SettingsIcon},
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`py-4 px-6 font-black text-sm flex items-center gap-2 transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <tab.icon size={18} /> {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => setFilterStatus('all')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><Users size={24}/></div>
                <div><span className="text-[10px] font-black opacity-60 block">کل کاربران</span><span className="text-xl font-black">{toPersian(stats.total)}</span></div>
              </div>
              <div onClick={() => setFilterStatus('visitors')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'visitors' ? 'bg-indigo-600 text-white' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Briefcase size={24}/></div>
                <div><span className="text-[10px] font-black opacity-60 block">ویزیتورهای فعال</span><span className="text-xl font-black">{toPersian(stats.visitors)}</span></div>
              </div>
              <div className="p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Coins size={24}/></div>
                <div><span className="text-[10px] font-black opacity-60 block">کل بدهی پاداش (ریال)</span><span className="text-xl font-black text-emerald-600">{toPersian(stats.totalBalance.toLocaleString())}</span></div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row justify-between items-center gap-6">
                 <div className="relative flex-grow sm:w-64">
                    <input type="text" placeholder="جستجوی نام یا کد معرف..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-emerald-500 font-bold" />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <div className="flex gap-2">
                    <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)} className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-[11px] font-black outline-none focus:border-emerald-500 shadow-sm">
                       <option value="expiry-asc">انقضا (نزدیک)</option>
                       <option value="name">نام (الفبا)</option>
                       <option value="referrals">تعداد معرفی</option>
                       <option value="balance">بالاترین موجودی</option>
                     </select>
                  </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                      <tr>
                        <th className="p-5">کاربر و کد اختصاصی</th>
                        <th className="p-5 text-center">معرفی‌ها</th>
                        <th className="p-5 text-center">موجودی فعلی (ریال)</th>
                        <th className="p-5 text-center">تایید و پرداخت</th>
                        <th className="p-5 text-center">وضعیت</th>
                        <th className="p-5 text-left">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {processedUsers.map(user => {
                        const daysLeft = getDaysLeft(user.subscriptionExpiry);
                        const isExpired = daysLeft <= 0;
                        const isActionLoading = processingAction?.uid === user.uid;
                        const isDeleteLoading = isActionLoading && processingAction?.action === 'delete';

                        return (
                          <tr key={user.uid} className={`hover:bg-slate-50 transition-colors ${!user.isApproved ? 'bg-amber-50/30' : ''}`}>
                            <td className="p-5">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner ${user.isVisitor ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                  {user.fullName?.[0] || 'U'}
                                </div>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2">
                                     <span className="font-black text-slate-800 text-sm">{user.fullName}</span>
                                     {!user.isApproved && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg text-[8px] font-black">در انتظار تایید</span>}
                                  </div>
                                  <span className="text-[10px] text-indigo-500 font-mono font-bold tracking-widest mt-1">{user.referralCode}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-5 text-center">
                               <div className="flex flex-col items-center">
                                 <span className="text-sm font-black text-slate-700">{toPersian(user.referralCount || 0)}</span>
                                 <span className="text-[9px] text-slate-400 font-bold">زیرمجموعه</span>
                               </div>
                            </td>
                            <td className="p-5 text-center">
                               <div className="flex flex-col items-center">
                                 <span className={`px-3 py-1.5 rounded-xl font-black text-xs ${user.referralBalance > 0 ? 'bg-emerald-100 text-emerald-700' : 'text-slate-300'}`}>
                                   {toPersian(user.referralBalance?.toLocaleString() || '۰')}
                                 </span>
                                 {user.referralTotalEarned > 0 && <span className="text-[8px] text-slate-400 mt-1 font-bold">کل: {toPersian(user.referralTotalEarned?.toLocaleString() || '۰')}</span>}
                               </div>
                            </td>
                            <td className="p-5 text-center">
                               <div className="flex flex-col gap-2 mx-auto max-w-[140px]">
                                  {!user.isApproved ? (
                                    <button 
                                      onClick={() => handleToggleApproval(user.uid, false)}
                                      disabled={isActionLoading}
                                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-[10px] shadow-lg flex items-center justify-center gap-2"
                                    >
                                      {isActionLoading && processingAction?.action === 'approve' ? <Loader2 size={12} className="animate-spin" /> : <ShieldAlert size={12}/>}
                                      تایید اکانت
                                    </button>
                                  ) : (
                                    <div className="flex items-center justify-center gap-1 text-emerald-600 font-black text-[10px]">
                                      <CheckCircle size={14} /> تایید شده
                                    </div>
                                  )}
                                  
                                  {user.isVisitor && (user.referralBalance || 0) > 0 && (
                                    <button 
                                      onClick={() => handleSettleBalance(user.uid, user.fullName, user.referralBalance)}
                                      disabled={isActionLoading}
                                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-[10px] shadow-lg flex items-center justify-center gap-2"
                                    >
                                      {isActionLoading && processingAction?.action === 'settle' ? <Loader2 size={12} className="animate-spin" /> : <CreditCard size={12}/>}
                                      تسویه حساب
                                    </button>
                                  )}
                               </div>
                            </td>
                            <td className="p-5 text-center">
                               <div className={`inline-flex px-4 py-2 rounded-2xl border ${isExpired ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                 <span className="text-[11px] font-black">{isExpired ? 'منقضی' : toPersian(daysLeft) + ' روز'}</span>
                               </div>
                            </td>
                            <td className="p-5 text-left">
                               <div className="flex items-center justify-end gap-1">
                                 <button 
                                    onClick={() => handleToggleVisitor(user.uid, !!user.isVisitor)} 
                                    disabled={isActionLoading}
                                    className={`p-2.5 rounded-xl transition-all ${user.isVisitor ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-300 hover:text-indigo-600 hover:bg-white'}`} 
                                    title={user.isVisitor ? "لغو مقام سفیر" : "ارتقا به سفیر سلامت"}
                                 >
                                    {isActionLoading && processingAction?.action === 'visitor' ? <Loader2 size={20} className="animate-spin" /> : <Briefcase size={20}/>}
                                 </button>
                                 <button onClick={() => handleExtend(user.uid)} disabled={isActionLoading} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl" title="تمدید ۳۰ روزه">
                                    <CalendarPlus size={20}/>
                                 </button>
                                 <button onClick={() => handleResetDevices(user.uid, user.fullName)} disabled={isActionLoading} className="p-2.5 text-indigo-400 hover:bg-indigo-50 rounded-xl" title="ریست دستگاه">
                                    <SmartphoneNfc size={20}/>
                                 </button>
                                 <button onClick={() => handleDelete(user.uid, user.fullName)} disabled={isDeleteLoading} className="p-2.5 text-rose-400 hover:bg-rose-50 rounded-xl" title="حذف کاربر">
                                    {isDeleteLoading ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20}/>}
                                 </button>
                               </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                 </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-enter">
             <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-200">
                <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
                   <div className="p-4 bg-emerald-50 text-emerald-600 rounded-3xl"><SettingsIcon size={32} /></div>
                   <div>
                      <h2 className="text-2xl font-black text-slate-800">مرکز مدیریت مالی اپلیکیشن</h2>
                      <p className="text-slate-400 text-xs font-bold uppercase">Dynamic Business Configuration</p>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-sm font-black text-slate-600 flex items-center gap-2">
                            <Coins size={18} className="text-indigo-500" /> مبلغ حق اشتراک (ریال)
                         </label>
                         <input 
                            type="number" 
                            value={appConfig.subscriptionFee} 
                            onChange={e => setAppConfig({...appConfig, subscriptionFee: parseInt(e.target.value) || 0})}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none font-black text-lg transition-all"
                         />
                         <p className="text-[10px] text-slate-400 font-bold">مبنای محاسبه پاداش ویزیتور، این مبلغ خواهد بود.</p>
                      </div>

                      <div className="space-y-3">
                         <label className="text-sm font-black text-slate-600 flex items-center gap-2">
                            <Percent size={18} className="text-indigo-500" /> سهم ویزیتور (درصد)
                         </label>
                         <div className="relative">
                            <input 
                               type="number" 
                               value={appConfig.commissionRate} 
                               onChange={e => setAppConfig({...appConfig, commissionRate: parseInt(e.target.value) || 0})}
                               className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 outline-none font-black text-lg transition-all pl-12"
                            />
                            <Percent size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                         </div>
                         <p className="text-[10px] text-slate-400 font-bold">چند درصد از مبلغ کل به کیف پول معرف واریز شود؟</p>
                      </div>
                   </div>

                   <button 
                      onClick={handleUpdateConfig}
                      disabled={isSavingConfig}
                      className="w-full py-5 bg-slate-900 hover:bg-black text-white rounded-[2rem] font-black shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                   >
                      {isSavingConfig ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                      ذخیره و اعمال تنظیمات در کل سیستم
                   </button>
                </div>
             </div>
             
             <div className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-start gap-4">
                <Info className="text-amber-500 shrink-0" size={24} />
                <p className="text-xs text-amber-800 leading-relaxed font-bold">
                  تغییرات این بخش، روی کاربرانی که از این لحظه به بعد «تایید» می‌شوند اعمال خواهد شد. مبالغی که قبلاً در کیف پول ویزیتورها درج شده است، با این تغییر عوض نمی‌شوند تا اختلال مالی ایجاد نشود.
                </p>
             </div>
          </div>
        )}

        {activeTab === 'csv-converter' && <CsvToJsonConverter />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'duplicates' && <DuplicateResolver />}
        {activeTab === 'images' && <ImageGuide />}
        {activeTab === 'backup' && <BackupManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;
