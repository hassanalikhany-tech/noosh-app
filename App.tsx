
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, Wifi, WifiOff, Database, ShieldAlert, AlertTriangle, ArrowRight, CloudDownload, Rocket, UserX } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
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
import { DayPlan, UserProfile } from './types';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [displayPlan, setDisplayPlan] = useState<DayPlan[]>([]);
  const [loadingType, setLoadingType] = useState<'daily' | 'weekly' | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [initProgress, setInitProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('در حال آماده‌سازی...');
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'connecting' | 'fetching' | 'done' | 'offline'>('connecting');
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMainSyncing, setIsMainSyncing] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(true);
  const planResultsRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
    setIsSessionValid(true);
  };

  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    const updated = await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    setCurrentUser(updated);
  };

  const handleGenerateDaily = async () => {
    if (!currentUser) return;
    setLoadingType('daily');
    try {
      const { plan, updatedUser } = await generateDailyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingType(null);
    }
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser) return;
    setLoadingType('weekly');
    try {
      const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingType(null);
    }
  };

  const handleMainSync = async () => {
    setIsMainSyncing(true);
    await RecipeService.syncFromCloud();
    setIsMainSyncing(false);
    setRefreshKey(prev => prev + 1);
  };

  const startAppSequence = async () => {
    setIsInitializing(true);
    setInitProgress(5);
    setLoadingStatus('در حال بررسی نشست کاربر...');
    
    const skipTimer = setTimeout(() => setShowSkipButton(true), 5000);

    try {
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        // چک کردن نشست در هنگام شروع
        const isValid = await UserService.validateSession();
        if (!isValid) {
          setIsSessionValid(false);
          setIsInitializing(false);
          return;
        }
      }
      setInitProgress(30);

      const result = await RecipeService.initialize((p, status) => {
        setInitProgress(prev => Math.max(prev, p));
        setLoadingStatus(status);
      });

      if (result.source === 'offline-cache' || result.error) {
        setSyncStatus('offline');
      } else {
        setSyncStatus('done');
      }

      if (user && user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
      
      setInitProgress(100);
      clearTimeout(skipTimer);
      setTimeout(() => setIsInitializing(false), 800);

    } catch (err) {
      console.error("Init Error:", err);
      setSyncStatus('offline');
      setInitProgress(100);
      setTimeout(() => setIsInitializing(false), 1000);
    }
  };

  useEffect(() => {
    startAppSequence();

    // ناظر دوره‌ای برای چک کردن امنیت اکانت (هر ۶۰ ثانیه)
    const sessionInterval = setInterval(async () => {
      if (currentUser && !currentUser.isAdmin) {
        const isValid = await UserService.validateSession();
        if (!isValid) setIsSessionValid(false);
      }
    }, 60000);

    const handleUserUpdate = async () => {
      const updated = await UserService.getCurrentUser();
      if (updated) {
        setCurrentUser({ ...updated });
        if (updated.weeklyPlan) setDisplayPlan(updated.weeklyPlan);
      }
    };

    window.addEventListener('user-data-updated', handleUserUpdate);
    window.addEventListener('recipes-updated', () => setRefreshKey(prev => prev + 1));
    
    return () => {
      window.removeEventListener('user-data-updated', handleUserUpdate);
      clearInterval(sessionInterval);
    };
  }, []);

  const handleSkipLoading = () => {
    setIsInitializing(false);
  };

  const toPersian = (n: number) => Math.round(n).toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  // نمایش پیام مسدودسازی نشست
  if (!isSessionValid) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] p-8 text-center">
      <div className="bg-rose-500/10 w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-pulse border border-rose-500/20">
        <UserX size={48} className="text-rose-500" />
      </div>
      <h2 className="text-2xl font-black text-white mb-4">خروج اجباری از حساب</h2>
      <p className="text-slate-400 font-bold max-w-sm mb-8 leading-relaxed">
        یک دستگاه دیگر به تازگی وارد حساب کاربری شما شده است. برای حفظ امنیت، دسترسی این دستگاه متوقف شد. 
        <br/>
        <span className="text-rose-400 text-xs mt-4 block">لطفاً از اشتراک‌گذاری رمز عبور خود پرهیز کنید.</span>
      </p>
      <button 
        onClick={handleLogout}
        className="px-10 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-rose-900/40"
      >
        متوجه شدم (بازگشت به ورود)
      </button>
    </div>
  );

  if (isInitializing) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] p-6 text-right">
      <div className="bg-noosh-pattern opacity-10 absolute inset-0"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm animate-enter">
        <div className="relative">
          <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-32 h-32 object-contain animate-float" />
          <div className="absolute -inset-4 bg-teal-500/20 blur-2xl rounded-full -z-10 animate-pulse"></div>
        </div>
        
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between px-2">
             <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest">Database Sync Progress</span>
             <span className="text-sm font-black text-white bg-teal-600/20 px-3 py-1 rounded-lg border border-teal-500/30">{toPersian(initProgress)}٪</span>
          </div>
          
          <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px] shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-teal-600 via-emerald-400 to-teal-500 rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(45,212,191,0.5)]" 
              style={{ width: `${initProgress}%` }}
            ></div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
            <p className="text-teal-400 text-xs font-black text-center mb-2 animate-pulse">
              {loadingStatus}
            </p>
          </div>
        </div>

        {showSkipButton && (
          <button 
            onClick={handleSkipLoading}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-2xl font-black text-xs transition-all active:scale-95 group"
          >
            <span>ورود در حالت آفلاین (بدون انتظار)</span>
            <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.isAdmin && isAdminMode) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const isDatabaseEmpty = RecipeService.getAllDishes().length === 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-right dir-rtl bg-slate-50" key={refreshKey}>
      <header className="sticky top-0 z-40 metallic-navy text-white shadow-xl no-print">
        <div className="container mx-auto h-[70px] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-10 h-10" />
            <div className="flex flex-row items-baseline gap-1.5" style={{ direction: 'ltr' }}>
              <span className="text-2xl font-black italic uppercase text-halo">NOOSH</span>
              <span className="text-sm font-black text-teal-500 italic uppercase">APP</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2.5 bg-white/5 rounded-2xl text-teal-400 border border-white/10">
              <ShoppingCart size={22} />
              {currentUser.customShoppingList?.filter(i => !i.checked).length ? (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-full">{currentUser.customShoppingList.filter(i => !i.checked).length}</span>
              ) : null}
            </button>
            {currentUser.isAdmin && (
              <button onClick={() => setIsAdminMode(true)} className="p-2.5 bg-white/5 rounded-2xl text-amber-400 border border-white/10" title="پنل مدیریت">
                <ShieldCheck size={22} />
              </button>
            )}
          </div>
        </div>
        <nav className="bg-white border-b border-gray-100 flex p-1 gap-1 overflow-x-auto no-scrollbar">
          {[
            {id: 'plan', label: 'برنامه ریزی', icon: CalendarDays}, 
            {id: 'pantry', label: 'آشپز برتر', icon: ChefHat}, 
            {id: 'search', label: 'جستجو', icon: Search}, 
            {id: 'challenges', label: 'چالش', icon: Trophy},
            {id: 'settings', label: 'تنظیمات', icon: Settings}
          ].map(nav => (
            <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`flex-1 min-w-[70px] py-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${viewMode === nav.id ? 'text-teal-700 bg-teal-50 font-black' : 'text-slate-400'}`}>
              <nav.icon size={18} />
              <span className="text-[10px]">{nav.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 pb-24">
        {viewMode === 'plan' && (
          <div className="space-y-8">
            {isDatabaseEmpty && (
              <div className="relative group overflow-hidden bg-gradient-to-r from-teal-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-10 shadow-2xl animate-enter border border-white/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-inner">
                      <CloudDownload size={32} />
                   </div>
                   <div className="text-center md:text-right flex-grow">
                      <h2 className="text-xl font-black text-white mb-1">بروزرسانی دیتابیس</h2>
                      <p className="text-teal-50 font-bold text-sm leading-relaxed opacity-90">
                        برای بروز رسانی اطلاعات روی کلید فوق کلیک فرمایید
                      </p>
                   </div>
                   <button 
                    onClick={handleMainSync}
                    disabled={isMainSyncing}
                    className="flex-shrink-0 px-8 py-4 bg-white text-indigo-700 rounded-2xl font-black text-sm shadow-xl hover:bg-teal-50 transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                   >
                     {isMainSyncing ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                     {isMainSyncing ? 'در حال دریافت...' : 'بروزرسانی اطلاعات'}
                   </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-wrap gap-2 justify-center">
              <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`px-4 py-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                <Heart size={16} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                <span className="font-black text-xs">محبوب‌ها</span>
              </button>
              <button onClick={() => handleToggleFilter('quickMealsMode')} className={`px-4 py-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${currentUser.quickMealsMode ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                <Clock size={16} />
                <span className="font-black text-xs">سریع</span>
              </button>
              <button onClick={() => handleToggleFilter('meatlessMode')} className={`px-4 py-2 rounded-2xl border-2 flex items-center gap-2 transition-all ${currentUser.meatlessMode ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-transparent text-slate-400'}`}>
                <Leaf size={16} />
                <span className="font-black text-xs">گیاهی</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button 
                onClick={handleGenerateDaily} 
                disabled={!!loadingType || isDatabaseEmpty}
                className="group relative bg-white border-2 border-slate-200 p-8 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:border-teal-400 transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div className="p-5 bg-teal-50 text-teal-600 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  {loadingType === 'daily' ? <RefreshCw size={40} className="animate-spin" /> : <Utensils size={40} />}
                </div>
                <div className="text-center">
                  <span className="block font-black text-xl text-slate-800">برنامه پیشنهادی امروز</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Daily Recommendation</span>
                </div>
              </button>
              
              <button 
                onClick={handleGenerateWeekly} 
                disabled={!!loadingType || isDatabaseEmpty}
                className="group relative metallic-navy p-8 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-xl transition-all active:scale-95 disabled:opacity-50 overflow-hidden"
              >
                <div className="p-5 bg-white/10 text-teal-400 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                  {loadingType === 'weekly' ? <RefreshCw size={40} className="animate-spin" /> : <Calendar size={40} />}
                </div>
                <div className="text-center">
                  <span className="block font-black text-xl text-white text-halo">برنامه پیشنهادی هفتگی</span>
                  <span className="text-[10px] text-teal-500/60 font-bold uppercase tracking-wider">Weekly Meal Planner</span>
                </div>
              </button>
            </div>

            {displayPlan.length > 0 && (
              <div ref={planResultsRef} className="animate-enter pt-4">
                <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-200">
                      <Sparkles size={20} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800">نتایج هوشمند هفته</h2>
                  </div>
                  <button onClick={async () => { setDisplayPlan([]); if (currentUser) await UserService.updateProfile(currentUser.username, { weeklyPlan: [] }); }} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all font-black text-xs">
                    <Trash2 size={16} />
                    <span>پاکسازی لیست</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {displayPlan.map((plan, idx) => (
                    <div key={`${plan.dish.id}-${idx}`} className="animate-enter" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <MealCard plan={plan} user={currentUser!} onUpdateUser={setCurrentUser} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {viewMode === 'pantry' && currentUser && <PantryChef user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && currentUser && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'challenges' && currentUser && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={() => {}} />}
        {viewMode === 'settings' && currentUser && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      {isShoppingListOpen && currentUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full text-gray-500 z-[110] hover:bg-gray-200 transition-all"><X size={20} /></button>
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
