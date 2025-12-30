
import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon, CheckCircle, XCircle, FileSpreadsheet, Lock, Globe } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'duplicates' | 'backup' | 'images' | 'csv-converter'>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const allDishes = RecipeService.getAllDishes();

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await UserService.getAllUsers();
      setUsers(allUsers);
    };
    loadUsers();
  }, [activeTab]);

  const handleDelete = async (username: string) => {
    if (confirm(`حذف کاربر ${username}؟`)) {
      await UserService.deleteUser(username);
      const allUsers = await UserService.getAllUsers();
      setUsers(allUsers);
    }
  };

  const handleToggleApproval = async (uid: string, currentStatus: boolean) => {
    await UserService.toggleUserApproval(uid, currentStatus);
    const allUsers = await UserService.getAllUsers();
    setUsers(allUsers);
  };

  const handleExtend = async (username: string) => {
    await UserService.extendSubscription(username, 30);
    const allUsers = await UserService.getAllUsers();
    setUsers(allUsers);
    alert('اشتراک کاربر ۳۰ روز تمدید شد.');
  };

  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.fullName.includes(searchTerm));

  const ashCount = allDishes.filter(d => d.category === 'ash').length;
  const poloCount = allDishes.filter(d => d.category === 'polo').length;
  const khorakCount = allDishes.filter(d => d.category === 'khorak').length;
  const stewCount = allDishes.filter(d => d.category === 'stew').length;
  const soupCount = allDishes.filter(d => d.category === 'soup').length;
  const fastfoodCount = allDishes.filter(d => d.category === 'fastfood').length;
  const kababCount = allDishes.filter(d => d.category === 'kabab').length;
  const internationalCount = allDishes.filter(d => d.category === 'international').length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col dir-rtl text-right">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">پنل کنترل نوش</h1>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">دسترسی مدیر سیستم</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onSwitchToApp && (
              <button 
                onClick={onSwitchToApp}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95"
              >
                <ExternalLink size={18} />
                <span className="text-sm">مشاهده اپلیکیشن</span>
              </button>
            )}
            <button 
              onClick={onLogout}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-rose-900/20 active:scale-95"
            >
              <LogOut size={18} />
              <span className="text-sm">خروج</span>
            </button>
          </div>
        </div>
      </header>

      <div className="bg-teal-900 text-white py-3 border-b border-teal-800">
         <div className="container mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>آش: <span className="text-teal-300">{ashCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>پلو: <span className="text-teal-300">{poloCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>خوراک: <span className="text-teal-300">{khorakCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>خورش: <span className="text-teal-300">{stewCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>سوپ: <span className="text-teal-300">{soupCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>فست‌فود: <span className="text-teal-300">{fastfoodCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black">
                  <Lock size={12} className="text-teal-400" />
                  <span>کباب: <span className="text-teal-300">{kababCount}</span></span>
               </div>
               <div className="flex items-center gap-1.5 text-[10px] font-black bg-white/10 px-2 py-0.5 rounded-md">
                  <Lock size={12} className="text-teal-400" />
                  <span className="flex items-center gap-1">بین‌المللی: <span className="text-teal-300">{internationalCount}</span> <Globe size={10} className="text-teal-500" /></span>
               </div>
            </div>
            <div className="text-[10px] font-bold bg-teal-800/50 px-3 py-1 rounded-full animate-pulse text-teal-200">
               وضعیت دیتابیس: ایمن و قفل شده ✅
            </div>
         </div>
      </div>

      <div className="bg-white border-b border-slate-200 sticky top-[88px] md:top-[84px] z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex gap-1">
          {[
            {id: 'users', label: 'مدیریت کاربران', icon: Users},
            {id: 'csv-converter', label: 'مبدل اکسل به JSON', icon: FileSpreadsheet},
            {id: 'database', label: 'وضعیت دیتابیس', icon: FileJson},
            {id: 'duplicates', label: 'اصلاحات و تکراری‌ها', icon: GitMerge},
            {id: 'images', label: 'راهنمای تصاویر', icon: ImageIcon},
            {id: 'backup', label: 'پشتیبان‌گیری کلی', icon: Save},
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-6 font-black text-sm flex items-center gap-2 transition-all relative whitespace-nowrap ${
                activeTab === tab.id 
                ? 'text-emerald-600' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {activeTab === 'users' && (
          <div className="space-y-6 animate-enter">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-500">
                    <Users size={20} />
                  </div>
                  <h2 className="font-black text-slate-700">لیست کاربران فعال سیستم ({users.length})</h2>
                </div>
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="جستجو با نام یا ایمیل..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 transition-all font-bold"
                  />
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="p-5">نام کاربر</th>
                      <th className="p-5">شناسه (ایمیل)</th>
                      <th className="p-5">تایید مدیریت</th>
                      <th className="p-5">وضعیت اشتراک</th>
                      <th className="p-5 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                      <tr key={user.uid} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-5 font-black text-slate-800">{user.fullName}</td>
                        <td className="p-5 dir-ltr text-right text-slate-500 font-mono text-xs">{user.email}</td>
                        <td className="p-5">
                          <button 
                            onClick={() => handleToggleApproval(user.uid, !!user.isApproved)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-black text-[10px] transition-all ${
                              user.isApproved 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                              : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}
                          >
                            {user.isApproved ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                            {user.isApproved ? 'تایید شده' : 'در انتظار تایید'}
                          </button>
                        </td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            UserService.isSubscriptionValid(user) 
                            ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                            : 'bg-slate-100 text-slate-500'
                          }`}>
                            {UserService.isSubscriptionValid(user) ? 'دارای اشتراک' : 'بدون اشتراک'}
                          </span>
                        </td>
                        <td className="p-5 flex justify-center gap-2">
                          <button 
                            onClick={() => handleExtend(user.username)} 
                            className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="تمدید اشتراک"
                          >
                            <CalendarPlus size={20}/>
                          </button>
                          <button 
                            onClick={() => handleDelete(user.username)} 
                            className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="حذف کاربر"
                          >
                            <Trash2 size={20}/>
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="p-20 text-center text-slate-400 font-bold italic">هیچ کاربری یافت نشد.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'csv-converter' && <CsvToJsonConverter />}
        {activeTab === 'images' && <ImageGuide />}
        {activeTab === 'duplicates' && <DuplicateResolver />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'backup' && <BackupManager />}
      </main>
    </div>
  );
};

export default AdminDashboard;
