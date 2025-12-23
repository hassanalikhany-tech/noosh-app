
import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon, LayoutDashboard } from 'lucide-react';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';
import DatabaseManager from './DatabaseManager';
import DuplicateResolver from './DuplicateResolver';
import BackupManager from './BackupManager';
import ImageGuide from './ImageGuide';

interface AdminDashboardProps {
  onLogout: () => void;
  onSwitchToApp?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onSwitchToApp }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'database' | 'duplicates' | 'backup' | 'images'>('users');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleExtend = async (username: string) => {
    await UserService.extendSubscription(username, 30);
    const allUsers = await UserService.getAllUsers();
    setUsers(allUsers);
    alert('اشتراک کاربر ۳۰ روز تمدید شد.');
  };

  const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.fullName.includes(searchTerm));

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-slate-900 text-white p-6 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">NOOSH APP CONTROL CENTER</h1>
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">System Administrator Access</p>
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

      <div className="bg-white border-b border-slate-200 sticky top-[88px] md:top-[84px] z-40 shadow-sm overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-4 flex gap-1">
          {[
            {id: 'users', label: 'مدیریت کاربران', icon: Users},
            {id: 'images', label: 'راهنمای تصاویر', icon: ImageIcon},
            {id: 'duplicates', label: 'غذاهای تکراری', icon: GitMerge},
            {id: 'backup', label: 'پشتیبان‌گیری', icon: Save},
            {id: 'database', label: 'دیتابیس ابری', icon: FileJson},
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
                      <th className="p-5">نام و نام خانوادگی</th>
                      <th className="p-5">شناسه کاربری (ایمیل)</th>
                      <th className="p-5">وضعیت اشتراک</th>
                      <th className="p-5 text-center">عملیات مدیریت</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length > 0 ? filteredUsers.map(user => (
                      <tr key={user.username} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="p-5 font-black text-slate-800">{user.fullName}</td>
                        <td className="p-5 dir-ltr text-right text-slate-500 font-mono text-xs">{user.username}</td>
                        <td className="p-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            UserService.isSubscriptionValid(user) 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-rose-100 text-rose-700'
                          }`}>
                            {UserService.isSubscriptionValid(user) ? 'فعال' : 'منقضی شده'}
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
                        <td colSpan={4} className="p-20 text-center text-slate-400 font-bold italic">هیچ کاربری یافت نشد.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'images' && <ImageGuide />}
        {activeTab === 'duplicates' && <DuplicateResolver />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'backup' && <BackupManager />}
      </main>
      
      <footer className="p-6 text-center text-slate-400 text-[10px] font-bold">
        NOOSH APP ADMINISTRATION INTERFACE &copy; 2025
      </footer>
    </div>
  );
};

export default AdminDashboard;
