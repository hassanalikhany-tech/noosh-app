
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2, Loader2, ScanFace, Printer, Share2, MessageCircle, Smartphone } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/auth/Login';
import Subscription from './components/auth/Subscription';
import Challenges from './components/Challenges';
import MealCard from './components/MealCard';
import PantryChef from './components/PantryChef';
import Preferences from './components/Preferences';
import RecipeSearch from './components/RecipeSearch';
import ShoppingList from './components/ShoppingList';
import { RecipeService } from './services/recipeService';
import { UserService } from './services/userService';
import { DayPlan, UserProfile, CATEGORY_LABELS } from './types';
import { generateDailyPlan, generateWeeklyPlan, generateMonthlyPlan } from './utils/planner';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

interface StatusAlert {
  show: boolean;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [displayPlan, setDisplayPlan] = useState<DayPlan[]>([]);
  const [loadingType, setLoadingType] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  const [footerSearchTerm, setFooterSearchTerm] = useState('');
  const [statusAlert, setStatusAlert] = useState<StatusAlert>({ show: false, title: '', description: '', icon: Info, color: 'emerald' });
  const planResultsRef = useRef<HTMLDivElement>(null);

  // لود اولیه دیتابیس و وضعیت کاربر
  useEffect(() => {
    const initApp = async () => {
      await RecipeService.initialize();
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
      }
      setIsInitializing(false);
    };
    initApp();
  }, []);

  // همگام‌سازی خودکار در پس‌زمینه
  useEffect(() => {
    if (currentUser && !isAutoSyncing) {
      const sync = async () => {
        setIsAutoSyncing(true);
        try {
          await RecipeService.syncFromCloud(true);
        } catch (e) {
          console.error("Auto-sync background failed.");
        } finally {
          setIsAutoSyncing(false);
        }
      };
      sync();
    }
  }, [currentUser?.uid]);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
  };

  // تابع نمایش اطلاع‌رسانی شیشه‌ای در مرکز صفحه (طبق درخواست شما)
  const triggerStatusAlert = (title: string, description: string, icon: any, color: string) => {
    setStatusAlert({ show: true, title, description, icon, color });
    // پیام به مدت 15 ثانیه باقی می‌ماند
    setTimeout(() => {
      setStatusAlert(prev => ({ ...prev, show: false }));
    }, 15000);
  };

  // مدیریت فیلترهای فوتر
  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    const optimisticUser = { ...currentUser, [filter]: newVal };
    setCurrentUser(optimisticUser);
    
    const meta = {
      onlyFavoritesMode: { title: 'فهرست محبوب‌ها', desc: newVal ? 'برنامه شما محدود به غذاهای لایک شده شد.' : 'فیلتر محبوب‌ها غیرفعال شد.', icon: Heart, color: 'rose' },
      quickMealsMode: { title: 'پخت سریع', desc: newVal ? 'فقط غذاهای زیر ۴۵ دقیقه پیشنهاد می‌شود.' : 'فیلتر پخت سریع غیرفعال شد.', icon: Clock, color: 'amber' },
      meatlessMode: { title: 'رژیم گیاهی', desc: newVal ? 'تمامی پخت‌های گوشتی حذف شدند.' : 'رژیم گیاهی غیرفعال شد.', icon: Leaf, color: 'emerald' }
    };
    
    triggerStatusAlert(meta[filter].title, meta[filter].desc, meta[filter].icon, meta[filter].color);

    try {
      await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    } catch (err) {
      setCurrentUser(currentUser);
    }
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white dir-rtl no-print">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
        <p className="text-sm font-black animate-pulse">در حال فراخوانی دستیار هوشمند نوش...</p>
      </div>
    );
  }

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.isAdmin && isAdminMode) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const AlertIcon = statusAlert.icon;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      
      {/* نشانگر همگام‌سازی نامحسوس */}
      {isAutoSyncing && (
        <div className="fixed top-28 left-6 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-teal-100 shadow-xl flex items-center gap-3 animate-enter">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
          <span className="text-[10px] font-black text-teal-800">بروزرسانی دیتابیس...</span>
        </div>
      )}

      {/* پنجره اطلاع‌رسانی شیشه‌ای متحرک (از بالا به مرکز) */}
      <div className={`fixed inset-0 z-[2000] flex items-center justify-center p-6 pointer-events-none transition-all duration-1000 ease-out ${statusAlert.show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
         <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.15)] max-w-lg w-full flex flex-col items-center text-center gap-6 relative overflow-hidden pointer-events-auto">
            <div className={`absolute top-0 inset-x-0 h-2 bg-${statusAlert.color}-500`}></div>
            <div className={`p-6 bg-${statusAlert.color}-500 text-white rounded-[2rem] shadow-2xl`}>
               <AlertIcon size={48} />
            </div>
            <div>
               <h3 className={`text-3xl font-black text-${statusAlert.color}-900 mb-4`}>{statusAlert.title}</h3>
               <p className="text-slate-800 text-lg font-bold leading-relaxed">{statusAlert.description}</p>
            </div>
            <button onClick={() => setStatusAlert(prev => ({ ...prev, show: false }))} className="mt-4 px-8 py-3 bg-white/50 hover:bg-white rounded-2xl text-slate-600 font-black text-sm transition-all">متوجه شدم</button>
         </div>
      </div>

      {/* هدر */}
      <div className="fixed top-4 left-4 right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[2.5rem] shadow-sm p-4 sm:px-8 h-[110px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-16 h-16 object-contain" />
            <div className="flex flex-col" style={{ direction: 'ltr' }}>
              <span className="text-4xl font-black italic text-slate-900 leading-none">NOOSH</span>
              <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Premium v19.2</span>
            </div>
          </div>
          
          <nav className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 backdrop-blur-3xl p-1 rounded-full border border-white/20 mx-6">
            {[
              { id: 'plan', label: 'برنامه‌ریزی', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`px-10 py-5 rounded-full flex items-center gap-2 transition-all ${viewMode === nav.id ? 'bg-emerald-900 text-amber-400 shadow-xl' : 'text-slate-600 hover:bg-white/30'}`}>
                <nav.icon size={24} />
                <span className="text-2xl font-black">{nav.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
             <button onClick={() => setIsShoppingListOpen(true)} className="relative p-5 bg-emerald-600 text-white rounded-[2rem] shadow-md hover:scale-105 transition-all">
              <ShoppingCart size={32} />
              {currentUser.customShoppingList?.filter(i => !i.checked).length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] w-7 h-7 flex items-center justify-center rounded-full font-black ring-2 ring-white">
                  {currentUser.customShoppingList.filter(i => !i.checked).length}
                </span>
              )}
            </button>
            {currentUser.isAdmin && (
              <button onClick={() => setIsAdminMode(true)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase">Admin</button>
            )}
          </div>
        </header>
      </div>

      <main className="pt-48 pb-48 px-4 container mx-auto no-print">
        {viewMode === 'plan' && (
          <div className="space-y-12 animate-enter">
            <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[3rem] p-4 shadow-2xl flex items-center gap-4">
               <div className="flex-grow grid grid-cols-3 gap-3">
                  <button onClick={() => generateDailyPlan(currentUser).then(r => { setDisplayPlan(r.plan); setCurrentUser(r.updatedUser); })} className="flex items-center justify-center gap-3 py-5 bg-white text-slate-800 rounded-[2rem] font-black text-sm hover:bg-emerald-50 transition-all shadow-sm">
                     <Utensils size={24} /> پیشنهاد امروز
                  </button>
                  <button onClick={() => generateWeeklyPlan(currentUser).then(r => { setDisplayPlan(r.plan); setCurrentUser(r.updatedUser); })} className="flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm shadow-xl">
                     <Calendar size={24} /> برنامه هفتگی
                  </button>
                  <button onClick={() => generateMonthlyPlan(currentUser).then(r => { setDisplayPlan(r.plan); setCurrentUser(r.updatedUser); })} className="flex items-center justify-center gap-3 py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-sm shadow-xl">
                     <CalendarDays size={24} /> برنامه ماهانه
                  </button>
               </div>
               <button onClick={() => window.print()} className="p-5 bg-white text-slate-600 rounded-[2rem] shadow-sm border border-white/50"><Printer size={32} /></button>
            </div>
            
            {displayPlan.length > 0 ? (
              <div ref={planResultsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayPlan.map((plan, idx) => (
                  <MealCard key={idx} plan={plan} user={currentUser} onUpdateUser={setCurrentUser} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                 <ChefHat size={64} className="mx-auto text-slate-200 mb-6" />
                 <p className="text-slate-400 font-black text-xl italic">آماده‌ام تا برایت بهترین برنامه غذایی را بچینم...</p>
              </div>
            )}
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} externalSearchTerm={footerSearchTerm} />}
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={triggerStatusAlert} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      {/* فوتر با فیلترهای درخواستی شما */}
      <div className="fixed bottom-6 left-6 right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[2.5rem] h-[105px] px-10 flex items-center justify-between">
            <div className="flex items-center gap-12">
               {viewMode === 'plan' ? (
                 <>
                   <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-3 transition-all ${currentUser.onlyFavoritesMode ? 'text-rose-600 scale-125 drop-shadow-md' : 'text-slate-400 opacity-60'}`}>
                     <Heart size={32} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                     <span className="text-2xl font-black">محبوب</span>
                   </button>
                   <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-3 transition-all ${currentUser.meatlessMode ? 'text-emerald-600 scale-125 drop-shadow-md' : 'text-slate-400 opacity-60'}`}>
                     <Leaf size={32} />
                     <span className="text-2xl font-black">گیاهی</span>
                   </button>
                   <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-3 transition-all ${currentUser.quickMealsMode ? 'text-amber-600 scale-125 drop-shadow-md' : 'text-slate-400 opacity-60'}`}>
                     <Clock size={32} />
                     <span className="text-2xl font-black">سریع</span>
                   </button>
                 </>
               ) : viewMode === 'search' ? (
                 <div className="relative w-96">
                   <input type="text" placeholder="جستجوی سریع..." value={footerSearchTerm} onChange={(e) => setFooterSearchTerm(e.target.value)} className="w-full pr-12 pl-4 py-3 bg-white/80 rounded-2xl border-none outline-none font-black text-sm shadow-inner" />
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 </div>
               ) : (
                 <div className="flex items-center gap-4 text-slate-400 font-black italic">
                    <Sparkles size={24} className="text-amber-400 animate-pulse" />
                    <span className="text-xl">دستیار هوشمند نوش در خدمت شماست</span>
                 </div>
               )}
            </div>
            <button onClick={() => setViewMode('settings')} className={`flex items-center gap-4 px-12 py-5 rounded-[1.75rem] transition-all ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white/40 border border-white/20 text-slate-700'}`}>
              <span className="text-2xl font-black">تنظیمات پروفایل</span>
              <Settings size={32} />
            </button>
        </footer>
      </div>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-slate-100 rounded-full text-slate-500 z-[210]"><X size={18} /></button>
              <div className="flex-grow overflow-y-auto">
                <ShoppingList user={currentUser} weeklyPlan={displayPlan} onUpdateUser={setCurrentUser} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
