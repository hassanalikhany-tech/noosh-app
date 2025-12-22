
import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, Trash2, CalendarPlus, Users, Search, FileJson, ExternalLink, GitMerge, Save, Image as ImageIcon } from 'lucide-react';
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
    setUsers(UserService.getAllUsers());
  }, []);

  const handleDelete = (username: string) => {
    if (confirm(`حذف کاربر ${username}؟`)) {
      UserService.deleteUser(username);
      setUsers(UserService.getAllUsers());
    }
  };

  const handleExtend = (username: string) => {
    UserService.extendSubscription(username, 30);
    setUsers(UserService.getAllUsers());
    alert('تمدید شد.');
  };

  const filteredUsers = users.filter(u => u.username.includes(searchTerm) || u.fullName.includes(searchTerm));

  return (
    <div className="min-h-screen bg-slate-100 pb-20">
      <header className="bg-slate-900 text-white p-6 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg text-white">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-black">Noosh-app | پنل مدیریت</h1>
              <p className="text-slate-400 text-sm">سیستم جامع پایش و مدیریت محتوا</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onSwitchToApp && (
              <button 
                onClick={onSwitchToApp}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                <ExternalLink size={18} />
                ورود به محیط برنامه
              </button>
            )}
            <button 
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-bold flex items-center gap-2 transition-colors"
            >
              <LogOut size={18} />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 mt-6">
        <div className="flex gap-4 border-b border-slate-300 overflow-x-auto pb-1 no-scrollbar">
          <button 
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-4 font-bold border-b-4 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'users' ? 'border-emerald-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Users size={18} /> کاربران
          </button>
          <button 
            onClick={() => setActiveTab('images')}
            className={`pb-3 px-4 font-bold border-b-4 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'images' ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <ImageIcon size={18} /> راهنمای تصاویر
          </button>
          <button 
            onClick={() => setActiveTab('duplicates')}
            className={`pb-3 px-4 font-bold border-b-4 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'duplicates' ? 'border-amber-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <GitMerge size={18} /> مدیریت تکراری‌ها
          </button>
           <button 
            onClick={() => setActiveTab('backup')}
            className={`pb-3 px-4 font-bold border-b-4 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'backup' ? 'border-blue-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Save size={18} /> پشتیبان‌گیری
          </button>
          <button 
            onClick={() => setActiveTab('database')}
            className={`pb-3 px-4 font-bold border-b-4 transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'database' ? 'border-purple-500 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <FileJson size={18} /> ابزار تبدیل اکسل
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'images' && <ImageGuide />}

        {activeTab === 'duplicates' && <DuplicateResolver />}
        
        {activeTab === 'database' && <DatabaseManager />}

        {activeTab === 'backup' && <BackupManager />}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-enter">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center gap-4">
              <h2 className="font-bold text-slate-700">لیست کاربران ({users.length})</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="جستجو..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                />
                <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="p-4">نام</th>
                    <th className="p-4">کاربری</th>
                    <th className="p-4">وضعیت</th>
                    <th className="p-4 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map(user => (
                    <tr key={user.username} className="hover:bg-slate-50">
                      <td className="p-4 font-bold">{user.fullName}</td>
                      <td className="p-4 dir-ltr text-right text-slate-600">{user.username}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${UserService.isSubscriptionValid(user) ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {UserService.isSubscriptionValid(user) ? 'فعال' : 'منقضی'}
                        </span>
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        <button onClick={() => handleExtend(user.username)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><CalendarPlus size={18}/></button>
                        <button onClick={() => handleDelete(user.username)} className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
