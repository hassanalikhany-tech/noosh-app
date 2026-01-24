
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon, CheckCircle, XCircle, FileSpreadsheet, Lock, Globe, ShieldAlert, Code, AlertTriangle, ShieldEllipsis, ShieldClose, SmartphoneNfc, Clock, Filter, ArrowUpDown, UserPlus, UserCheck, UserX, Info, Loader2, RotateCcw } from 'lucide-react';
import { UserService } from '../../services/userService';
import { RecipeService } from '../../services/recipeService';
import { UserProfile, CATEGORY_LABELS } from '../../types';
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

type SortField = 'expiry-asc' | 'expiry-desc' | 'name' | 'registered';
type FilterStatus = 'all' | 'unapproved' | 'expired' | 'active';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSwitchToApp }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'duplicates' | 'backup' | 'images' | 'csv-converter' | 'security'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortField, setSortField] = useState<SortField>('expiry-asc');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [processingAction, setProcessingAction] = useState<{uid: string, action: string} | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      const user = await UserService.getCurrentUser();
      setCurrentUser(user);
      
      const result = await UserService.getAllUsers();
      if (result.success) {
        setUsers(result.data);
        setPermissionError(null);
      } else {
        if (result.error === 'permission-denied' || result.error?.includes('permissions')) {
          setPermissionError('سطح دسترسی شما کافی نیست. ادمین باید دسترسی isAdmin را برای شما فعال کند.');
        } else {
          setPermissionError(result.error || 'خطا در بارگذاری اطلاعات.');
        }
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

  const handleToggleApproval = async (uid: string, currentStatus: boolean) => {
    setProcessingAction({ uid, action: 'approve' });
    try {
      await UserService.toggleUserApproval(uid, currentStatus);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, isApproved: !currentStatus } : u));
    } catch (err: any) {
      alert("خطای دسترسی یا شبکه: " + (err.message || "امکان تغییر وضعیت وجود ندارد"));
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
      alert("خطا: " + err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleExtend = async (uid: string) => {
    setProcessingAction({ uid, action: 'extend' });
    try {
      // استفاده از UID کاربر هدف برای تمدید دقیق
      const updatedUser = await UserService.extendSubscription(uid, 31);
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, subscriptionExpiry: updatedUser.subscriptionExpiry } : u));
    } catch (err: any) {
      alert("خطا در تمدید: " + err.message);
    } finally {
      setProcessingAction(null);
    }
  };

  const handleDelete = async (uid: string, fullName: string) => {
    if (auth.currentUser?.uid === uid) return alert('خودتان را نمی‌توانید حذف کنید!');
    if (!confirm(`آیا از حذف «${fullName}» مطمئن هستید؟`)) return;
    
    setProcessingAction({ uid, action: 'delete' });
    try {
      await UserService.deleteUser(uid);
      setUsers(prev => prev.filter(u => u.uid !== uid));
    } catch (err: any) {
      alert(`خطا: ${err.message}`);
    } finally {
      setProcessingAction(null);
    }
  };

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const getDaysLeft = (expiry: number) => {
    const diff = (expiry || 0) - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (filterStatus === 'unapproved') {
      result = result.filter(u => !u.isApproved);
    } else if (filterStatus === 'expired') {
      result = result.filter(u => getDaysLeft(u.subscriptionExpiry) <= 0);
    } else if (filterStatus === 'active') {
      result = result.filter(u => u.isApproved && getDaysLeft(u.subscriptionExpiry) > 0);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(u => 
        (u.username || "").toLowerCase().includes(lowerSearch) || 
        (u.fullName || "").includes(searchTerm) ||
        (u.email || "").toLowerCase().includes(lowerSearch) ||
        (u.phoneNumber || "").includes(searchTerm)
      );
    }

    result.sort((a, b) => {
      const daysA = getDaysLeft(a.subscriptionExpiry);
      const daysB = getDaysLeft(b.subscriptionExpiry);
      if (sortField === 'expiry-asc') return daysA - daysB;
      if (sortField === 'expiry-desc') return daysB - daysA;
      if (sortField === 'name') return (a.fullName || "").localeCompare(b.fullName || "", 'fa');
      return 0;
    });

    return result;
  }, [users, filterStatus, searchTerm, sortField]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      unapproved: users.filter(u => !u.isApproved).length,
      expired: users.filter(u => getDaysLeft(u.subscriptionExpiry) <= 0).length,
      active: users.filter(u => u.isApproved && getDaysLeft(u.subscriptionExpiry) > 0).length
    };
  }, [users]);

  if (permissionError) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 p-6 dir-rtl text-right">
        <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border border-rose-100 flex flex-col items-center gap-6">
          <div className="p-5 bg-rose-50 text-rose-600 rounded-full">
            <ShieldAlert size={48} />
          </div>
          <h2 className="text-xl font-black text-slate-800">خطای دسترسی مدیریتی</h2>
          <p className="text-sm text-slate-500 font-bold leading-relaxed text-center">{permissionError}</p>
          <div className="flex gap-3 w-full">
             <button onClick={() => window.location.reload()} className="flex-1 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm">تلاش مجدد</button>
             <button onClick={onLogout} className="flex-1 py-3 bg-rose-600 text-white rounded-2xl font-black text-sm">خروج</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dir-rtl text-right font-sans">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">پنل مدیریت هوشمند نوش</h1>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Advanced User Monitoring</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onSwitchToApp && (
              <button onClick={onSwitchToApp} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold flex items-center gap-2 transition-all">
                <ExternalLink size={18} />
                <span className="text-sm">ورود به اپلیکیشن</span>
              </button>
            )}
            <button onClick={onLogout} className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg">
              <LogOut size={18} />
              <span className="text-sm">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-slate-200 sticky top-[84px] z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex gap-1">
          {[
            {id: 'users', label: 'کاربران', icon: Users},
            {id: 'csv-converter', label: 'مبدل اکسل', icon: FileSpreadsheet},
            {id: 'database', label: 'دیتابیس', icon: FileJson},
            {id: 'security', label: 'امنیت', icon: ShieldEllipsis},
            {id: 'duplicates', label: 'اصلاحات', icon: GitMerge},
            {id: 'images', label: 'تصاویر', icon: ImageIcon},
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`py-4 px-6 font-black text-sm flex items-center gap-2 transition-all relative whitespace-nowrap ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}>
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeTab === 'users' && (
          <div className="space-y-6 animate-enter">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div onClick={() => setFilterStatus('all')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'all' ? 'bg-slate-900 text-white' : 'bg-white border-slate-200'}`}>
                <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><Users size={24}/></div>
                <div><span className="text-[10px] font-black opacity-60 block">کل کاربران</span><span className="text-xl font-black">{toPersian(stats.total)}</span></div>
              </div>
              <div onClick={() => setFilterStatus('unapproved')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'unapproved' ? 'bg-amber-500 text-white' : 'bg-white border-slate-200'}`}>
                <div className={`p-3 rounded-2xl ${filterStatus === 'unapproved' ? 'bg-white/20' : 'bg-amber-50 text-amber-600'}`}><UserPlus size={24}/></div>
                <div><span className="text-[10px] font-black opacity-80 block">تایید نشده</span><span className="text-xl font-black">{toPersian(stats.unapproved)} نفر</span></div>
              </div>
              <div onClick={() => setFilterStatus('expired')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'expired' ? 'bg-rose-500 text-white' : 'bg-white border-slate-200'}`}>
                <div className={`p-3 rounded-2xl ${filterStatus === 'expired' ? 'bg-white/20' : 'bg-rose-50 text-rose-600'}`}><UserX size={24}/></div>
                <div><span className="text-[10px] font-black opacity-80 block">اشتراک منقضی</span><span className="text-xl font-black">{toPersian(stats.expired)} نفر</span></div>
              </div>
              <div onClick={() => setFilterStatus('active')} className={`cursor-pointer p-6 rounded-[2rem] shadow-sm border transition-all flex items-center gap-4 ${filterStatus === 'active' ? 'bg-emerald-600 text-white' : 'bg-white border-slate-200'}`}>
                <div className={`p-3 rounded-2xl ${filterStatus === 'active' ? 'bg-white/20' : 'bg-emerald-50 text-emerald-600'}`}><UserCheck size={24}/></div>
                <div><span className="text-[10px] font-black opacity-80 block">فعال و تایید شده</span><span className="text-xl font-black">{toPersian(stats.active)} نفر</span></div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                   <div className="relative flex-grow sm:w-64">
                    <input type="text" placeholder="جستجوی مشخصات..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-emerald-500 font-bold shadow-sm" />
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                  <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
                    {[{id: 'all', label: 'همه', icon: Filter}, {id: 'unapproved', label: 'تایید نشده', icon: UserPlus}].map(f => (
                      <button key={f.id} onClick={() => setFilterStatus(f.id as FilterStatus)} className={`px-4 py-2 rounded-xl text-[10px] font-black flex items-center gap-2 transition-all ${filterStatus === f.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}>
                        <f.icon size={14} />{f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto">
                   <span className="text-[10px] font-black text-slate-400 whitespace-nowrap">ترتیب:</span>
                   <select value={sortField} onChange={(e) => setSortField(e.target.value as SortField)} className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-[11px] font-black outline-none focus:border-emerald-500 shadow-sm">
                     <option value="expiry-asc">انقضا (نزدیک‌ترین)</option>
                     <option value="expiry-desc">انقضا (دورترین)</option>
                     <option value="name">نام (الفبا)</option>
                   </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest">
                      <tr>
                        <th className="p-5">کاربر</th>
                        <th className="p-5 text-center">اعتبار</th>
                        <th className="p-5 text-center">دستگاه‌ها</th>
                        <th className="p-5 text-center">وضعیت</th>
                        <th className="p-5 text-left">مدیریت</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoading ? (
                        <tr><td colSpan={5} className="p-20 text-center animate-pulse font-black text-slate-400">در حال دریافت لیست...</td></tr>
                      ) : processedUsers.length === 0 ? (
                        <tr><td colSpan={5} className="p-20 text-center font-black text-slate-300 flex flex-col items-center gap-4"><UserX size={48} className="opacity-20"/>یافت نشد.</td></tr>
                      ) : processedUsers.map(user => {
                        const daysLeft = getDaysLeft(user.subscriptionExpiry);
                        const isExpired = daysLeft <= 0;
                        const isExpiringSoon = daysLeft > 0 && daysLeft <= 7;
                        
                        const isApproving = processingAction?.uid === user.uid && processingAction?.action === 'approve';
                        const isResetting = processingAction?.uid === user.uid && processingAction?.action === 'reset';
                        const isExtending = processingAction?.uid === user.uid && processingAction?.action === 'extend';
                        const isDeleting = processingAction?.uid === user.uid && processingAction?.action === 'delete';

                        return (
                          <tr key={user.uid} className={`hover:bg-slate-50 transition-colors ${!user.isApproved ? 'bg-amber-50/20' : ''}`}>
                            <td className="p-5">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner ${isExpired ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'}`}>
                                  {user.fullName?.[0] || 'U'}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-black text-slate-800 text-sm">{user.fullName}</span>
                                  <span className="text-[10px] text-slate-400 font-bold">{user.email}</span>
                                  {user.phoneNumber && <span className="text-[9px] text-slate-400 font-mono tracking-tighter">{user.phoneNumber}</span>}
                                </div>
                              </div>
                            </td>
                            <td className="p-5 text-center">
                               <div className={`inline-flex flex-col items-center px-4 py-2 rounded-2xl border ${isExpired ? 'bg-rose-50 border-rose-100 text-rose-600' : isExpiringSoon ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                                 <span className="text-sm font-black">{isExpired ? 'منقضی' : toPersian(daysLeft) + ' روز'}</span>
                                 <span className="text-[8px] font-black uppercase opacity-60">اشتراک</span>
                               </div>
                            </td>
                            <td className="p-5 text-center">
                              <div className="flex flex-col items-center gap-1.5">
                                 <div className={`px-3 py-1 rounded-xl text-[10px] font-black border ${user.registeredDevices?.length >= 2 ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                                   {toPersian(user.registeredDevices?.length || 0)} / ۲
                                 </div>
                                 <button 
                                   disabled={isResetting}
                                   onClick={() => handleResetDevices(user.uid, user.fullName)} 
                                   className={`text-[9px] font-black flex items-center gap-1 transition-all ${isResetting ? 'text-slate-300' : 'text-indigo-600 hover:underline'}`}
                                 >
                                   {isResetting ? <Loader2 size={10} className="animate-spin" /> : <SmartphoneNfc size={10}/>}
                                   {isResetting ? 'در حال ریست...' : 'ریست دستگاه'}
                                 </button>
                              </div>
                            </td>
                            <td className="p-5 text-center">
                              <button 
                                disabled={isApproving}
                                onClick={() => handleToggleApproval(user.uid, !!user.isApproved)} 
                                className={`min-w-[100px] px-4 py-2 rounded-2xl font-black text-[10px] border transition-all active:scale-95 flex items-center justify-center gap-2 ${
                                  user.isApproved ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white text-amber-600 border-amber-400 hover:bg-amber-50 shadow-md'
                                } ${isApproving ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                {isApproving ? <Loader2 size={14} className="animate-spin" /> : (user.isApproved ? 'تایید شده' : 'تایید کاربر')}
                              </button>
                            </td>
                            <td className="p-5 text-left">
                              <div className="flex items-center justify-end gap-1">
                                <button 
                                  disabled={isExtending}
                                  onClick={() => handleExtend(user.uid)} 
                                  className={`p-2.5 rounded-xl transition-all border border-transparent ${isExtending ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-50 hover:border-blue-100'}`} 
                                  title="تمدید ۳۱ روز (یک ماه کامل)"
                                >
                                  {isExtending ? <Loader2 size={20} className="animate-spin" /> : <CalendarPlus size={20}/>}
                                </button>
                                {auth.currentUser?.uid !== user.uid && (
                                  <button 
                                    disabled={isDeleting}
                                    onClick={() => handleDelete(user.uid, user.fullName)} 
                                    className={`p-2.5 rounded-xl transition-all border border-transparent ${isDeleting ? 'text-slate-300' : 'text-rose-400 hover:bg-rose-50 hover:border-rose-100'}`} 
                                    title="حذف"
                                  >
                                    {isDeleting ? <Loader2 size={20} className="animate-spin" /> : <Trash2 size={20}/>}
                                  </button>
                                )}
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
        {activeTab === 'csv-converter' && <CsvToJsonConverter />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'duplicates' && <DuplicateResolver />}
        {activeTab === 'images' && <ImageGuide />}
        {activeTab === 'security' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-enter">
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-emerald-500 text-slate-950 rounded-3xl"><Lock size={32} /></div>
                <div><h2 className="text-2xl font-black">پروتکل امنیتی نهایی</h2><p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Security Guard System</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                   <h4 className="text-emerald-400 font-black text-sm mb-2 flex items-center gap-2"><SmartphoneNfc size={16}/> محدودیت ۲ دستگاه</h4>
                   <p className="text-[11px] text-slate-400 leading-relaxed font-bold">هر اکانت فقط روی ۲ دستگاه مجزا قابل استفاده است. در صورت نیاز به تعویض، ادمین باید ریست کند.</p>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10">
                   <h4 className="text-amber-400 font-black text-sm mb-2 flex items-center gap-2"><UserPlus size={16}/> تایید دستی</h4>
                   <p className="text-[11px] text-slate-400 leading-relaxed font-bold">کاربران تازه ثبت‌نام شده تا زمانی که توسط مدیر تایید نشوند، دسترسی محدود خواهند داشت.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
