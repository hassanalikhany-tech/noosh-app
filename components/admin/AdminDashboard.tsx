
import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon, CheckCircle, XCircle, FileSpreadsheet, Lock, Globe, ShieldAlert, Code, AlertTriangle, ShieldEllipsis, ShieldClose, SmartphoneNfc } from 'lucide-react';
import { UserService } from '../../services/userService';
import { RecipeService } from '../../services/recipeService';
import { UserProfile, CATEGORY_LABELS } from '../../types';
import DatabaseManager from './DatabaseManager';
import DuplicateResolver from './DuplicateResolver';
import BackupManager from './BackupManager';
import ImageGuide from './ImageGuide';
import CsvToJsonConverter from './CsvToJsonConverter';

interface AdminDashboardProps {
  onLogout: () => void;
  onSwitchToApp?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSwitchToApp }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'duplicates' | 'backup' | 'images' | 'csv-converter' | 'security'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const loadInitialData = async () => {
    setIsLoading(true);
    const user = await UserService.getCurrentUser();
    setCurrentUser(user);
    
    const result = await UserService.getAllUsers();
    if (result.success) {
      setUsers(result.data);
      setPermissionError(null);
    } else {
      setPermissionError(result.error || 'Unknown Error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, [activeTab]);

  const handleToggleApproval = async (uid: string, currentStatus: boolean) => {
    await UserService.toggleUserApproval(uid, currentStatus);
    loadInitialData();
  };

  const handleResetDevices = async (uid: string, fullName: string) => {
    if (confirm(`آیا لیست دستگاه‌های ثبت شده برای ${fullName} پاکسازی شود؟`)) {
      await UserService.resetUserDevices(uid);
      alert('دستگاه‌های کاربر ریست شد. اکنون می‌تواند با ۲ دستگاه جدید وارد شود.');
      loadInitialData();
    }
  };

  const handleExtend = async (username: string) => {
    await UserService.extendSubscription(username, 30);
    loadInitialData();
    alert('اشتراک کاربر ۳۰ روز تمدید شد.');
  };

  const handleDelete = async (uid: string, fullName: string) => {
    if (confirm(`آیا از حذف کامل کاربر «${fullName}» اطمینان دارید؟ این عمل غیرقابل بازگشت است.`)) {
      try {
        await UserService.deleteUser(uid);
        await loadInitialData();
        alert('کاربر با موفقیت حذف شد.');
      } catch (err) {
        alert('خطا در حذف کاربر. لطفاً اتصال خود را بررسی کنید.');
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u.fullName || "").includes(searchTerm)
  );

  const toPersian = (n: number) => n.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dir-rtl text-right font-sans">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">پنل مدیریت نوش</h1>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Version 15.0 | Multi-Device Guard</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onSwitchToApp && (
              <button onClick={onSwitchToApp} className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold flex items-center gap-2 transition-all">
                <ExternalLink size={18} />
                <span className="text-sm">مشاهده اپ</span>
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
            {id: 'database', label: 'دیتابیس ابری', icon: FileJson},
            {id: 'security', label: 'امنیت پروژه', icon: ShieldEllipsis},
            {id: 'duplicates', label: 'اصلاحات', icon: GitMerge},
            {id: 'images', label: 'تصاویر', icon: ImageIcon},
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-6 font-black text-sm flex items-center gap-2 transition-all relative whitespace-nowrap ${
                activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
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
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <h2 className="font-black text-slate-700">مدیریت کاربران ({users.length})</h2>
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="جستجو..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 font-bold"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-right text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-black text-[10px]">
                      <tr>
                        <th className="p-5">نام کاربر</th>
                        <th className="p-5">ایمیل</th>
                        <th className="p-5">دستگاه‌ها</th>
                        <th className="p-5">وضعیت</th>
                        <th className="p-5">عملیات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {isLoading ? (
                        <tr><td colSpan={5} className="p-20 text-center animate-pulse">در حال بارگذاری...</td></tr>
                      ) : filteredUsers.map(user => (
                        <tr key={user.uid} className="hover:bg-slate-50">
                          <td className="p-5 font-black">{user.fullName}</td>
                          <td className="p-5 text-slate-500">{user.email}</td>
                          <td className="p-5">
                            <div className="flex items-center gap-2">
                               <span className={`px-2 py-1 rounded-lg text-[10px] font-black ${user.registeredDevices?.length >= 2 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                 {toPersian(user.registeredDevices?.length || 0)} / ۲
                               </span>
                               <button onClick={() => handleResetDevices(user.uid, user.fullName)} className="p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm" title="ریست دستگاه‌ها">
                                 <SmartphoneNfc size={14}/>
                               </button>
                            </div>
                          </td>
                          <td className="p-5">
                            <button onClick={() => handleToggleApproval(user.uid, !!user.isApproved)} className={`px-3 py-1.5 rounded-xl font-black text-[10px] ${user.isApproved ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                              {user.isApproved ? 'تایید شده' : 'غیرفعال'}
                            </button>
                          </td>
                          <td className="p-5 flex gap-2">
                            <button onClick={() => handleExtend(user.username)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="تمدید ۳۰ روز"><CalendarPlus size={18}/></button>
                            <button onClick={() => handleDelete(user.uid, user.fullName)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg" title="حذف کامل کاربر"><Trash2 size={18}/></button>
                          </td>
                        </tr>
                      ))}
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
                <div>
                  <h2 className="text-2xl font-black">پروتکل امنیتی نهایی (V15)</h2>
                  <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Device Limit & Session Guard</p>
                </div>
              </div>
              <div className="p-5 bg-white/5 rounded-2xl border border-white/10 mb-6">
                 <h4 className="text-emerald-400 font-black text-sm mb-2 flex items-center gap-2"><SmartphoneNfc size={16}/> محدودیت ۲ دستگاه</h4>
                 <p className="text-[11px] text-slate-400 leading-relaxed font-bold">
                   سیستم اثرانگشت هر دستگاه را ثبت می‌کند. اگر کاربری رمز خود را به نفر سوم بدهد، نفر سوم با خطای "تکمیل ظرفیت دستگاه" مواجه می‌شود و نمی‌تواند وارد شود. ادمین می‌تواند در صورت تعویض گوشی کاربر، لیست را ریست کند.
                 </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
