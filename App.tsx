
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2, Loader2 } from 'lucide-react';
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
  const [isSyncing, setIsSyncing] = useState(false);
  const [initStatus, setInitStatus] = useState('در حال بررسی نشست...');
  const [footerSearchTerm, setFooterSearchTerm] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);
  const planResultsRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
    setRecipeCount(0);
  };

  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    const optimisticUser = { ...currentUser, [filter]: newVal };
    setCurrentUser(optimisticUser);
    try {
      await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    } catch (err) {
      setCurrentUser(currentUser);
      console.error("Sync failed:", err);
    }
  };

  const handleGenerateDaily = async () => {
    if (!currentUser || recipeCount === 0) return;
    setLoadingType('daily');
    try {
      const { plan, updatedUser } = await generateDailyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error(err); } finally { setLoadingType(null); }
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser || recipeCount === 0) return;
    setLoadingType('weekly');
    try {
      const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error(err); } finally { setLoadingType(null); }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
      }
      setIsInitializing(false);
    };
    checkAuth();

    const handleUpdate = () => {
      const count = RecipeService.getRawDishes().length;
      setRecipeCount(count);
    };
    window.addEventListener('recipes-updated', handleUpdate);
    return () => window.removeEventListener('recipes-updated', handleUpdate);
  }, []);

  useEffect(() => {
    const syncDatabase = async () => {
      if (currentUser && recipeCount === 0 && !isSyncing) {
        setIsSyncing(true);
        setInitStatus('در حال همگام‌سازی دیتابیس با سرور...');
        const result = await RecipeService.initialize((p, status) => {
          setInitStatus(status);
        });
        setRecipeCount(result.count);
        setIsSyncing(false);
      }
    };
    syncDatabase();
  }, [currentUser, recipeCount, isSyncing]);

  if (isInitializing || (currentUser && recipeCount === 0)) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white dir-rtl no-print">
        <div className="animate-float mb-8">
          <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
          <p className="text-sm font-black text-slate-400 animate-pulse">{initStatus}</p>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">Noosh App v15.5 | Auto-Sync Active</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.isAdmin && isAdminMode) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const activeChallengeName = currentUser.activeChallengeId ? (currentUser.activeChallengeId === 'vegan-week' ? 'هفته گیاهخواری' : currentUser.activeChallengeId === 'protein-power' ? 'پروتئین پلاس' : 'حذف قند') : null;

  const activeFilterInfo = (() => {
    if (activeChallengeName || viewMode !== 'plan') return null;
    if (currentUser.onlyFavoritesMode) return { text: 'فیلتر محبوب‌ها فعال.', icon: Heart, color: 'text-rose-600 bg-rose-50/40 border-rose-100/50' };
    if (currentUser.meatlessMode) return { text: 'رژیم گیاهی فعال.', icon: Leaf, color: 'text-emerald-600 bg-emerald-50/40 border-emerald-100/50' };
    if (currentUser.quickMealsMode) return { text: 'پخت سریع فعال.', icon: Clock, color: 'text-amber-600 bg-amber-50/40 border-amber-100/50' };
    return null;
  })();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      
      {/* هدر هوشمند */}
      <div className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] p-3 sm:px-8 sm:h-[85px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-all">
          
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-9 h-9 sm:w-12 sm:h-12 object-contain" />
              <div className="flex flex-col" style={{ direction: 'ltr' }}>
                <span className="text-xl sm:text-2xl font-black italic text-slate-900 leading-none">NOOSH</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Premium</span>
              </div>
            </div>

            {currentUser.isAdmin && (
              <button onClick={() => setIsAdminMode(true)} className="mx-2 px-3 py-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 active:scale-95 transition-all flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-[10px] font-black">مدیریت</span>
              </button>
            )}

            <div className="sm:hidden flex items-center">
              <button onClick={() => setIsShoppingListOpen(true)} className="relative p-3 bg-emerald-600 text-white rounded-xl shadow-md active:scale-95 transition-all">
                <ShoppingCart size={20} />
                {currentUser.customShoppingList?.filter(i => !i.checked).length > 0 && (
                  <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black ring-2 ring-white">
                    {currentUser.customShoppingList.filter(i => !i.checked).length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <nav className="w-full sm:flex-1 grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-3xl p-1 sm:p-1.5 rounded-2xl sm:rounded-full border border-white/20 sm:mx-4">
            {[
              { id: 'plan', label: 'برنامه‌ریزی', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button 
                key={nav.id} 
                onClick={() => setViewMode(nav.id as ViewMode)}
                className={`px-3 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-full flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 transition-all duration-300 whitespace-nowrap ${
                  viewMode === nav.id 
                  ? 'bg-emerald-900 text-amber-400 shadow-md scale-[1.02]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                <nav.icon size={16} className={viewMode === nav.id ? 'text-amber-400' : ''} />
                <span className="text-[11px] sm:text-base font-black">{nav.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden sm:flex items-center shrink-0">
             <button onClick={() => setIsShoppingListOpen(true)} className="relative p-3.5 bg-emerald-600 text-white rounded-2xl shadow-md hover:scale-105 transition-all">
              <ShoppingCart size={22} />
              {currentUser.customShoppingList?.filter(i => !i.checked).length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black ring-2 ring-white">
                  {currentUser.customShoppingList.filter(i => !i.checked).length}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      <main className="pt-48 sm:pt-36 pb-36 sm:pb-48 px-4 sm:px-6 container mx-auto no-print">
        {viewMode === 'plan' && (
          <div className="space-y-6 sm:space-y-10 animate-enter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
              <button onClick={handleGenerateDaily} disabled={!!loadingType} className="bg-white p-6 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col items-center gap-3 hover:shadow-lg transition-all">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                  {loadingType === 'daily' ? <RefreshCw className="animate-spin" size={24} /> : <Utensils size={32} />}
                </div>
                <span className="font-black text-lg text-slate-800">پیشنهاد امروز</span>
              </button>
              <button onClick={handleGenerateWeekly} disabled={!!loadingType} className="bg-slate-900 p-6 sm:p-10 rounded-[2rem] shadow-xl flex flex-col items-center gap-3 hover:scale-[1.01] transition-all">
                <div className="p-4 bg-white/10 text-emerald-400 rounded-2xl">
                  {loadingType === 'weekly' ? <RefreshCw className="animate-spin" size={24} /> : <Calendar size={32} />}
                </div>
                <span className="font-black text-lg text-white">برنامه هفتگی</span>
              </button>
            </div>
            {displayPlan.length > 0 && (
              <div ref={planResultsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
                {displayPlan.map((plan, idx) => (
                  <MealCard key={idx} plan={plan} user={currentUser} onUpdateUser={setCurrentUser} />
                ))}
              </div>
            )}
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} externalSearchTerm={footerSearchTerm} />}
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={() => {}} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      <div className="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] h-[75px] sm:h-[85px] px-3 sm:px-8 flex items-center">
          <div className="flex w-full items-center justify-between gap-1">
            <div className="flex items-center shrink-0">
              {viewMode === 'search' ? (
                <div className="relative w-36 sm:w-64 md:w-80">
                  <input type="text" placeholder="جستجو..." value={footerSearchTerm} onChange={(e) => setFooterSearchTerm(e.target.value)} className="w-full pr-10 pl-3 py-2.5 bg-white/50 backdrop-blur-3xl border border-white/40 rounded-xl outline-none font-black text-[10px] sm:text-sm" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                </div>
              ) : viewMode === 'plan' ? (
                <div className="flex items-center gap-1 sm:gap-2.5">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-500 text-white border-rose-500' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Heart size={14} fill={currentUser.onlyFavoritesMode ? "white" : "none"} />
                    <span className="text-[9px] sm:text-xs font-black">محبوب</span>
                  </button>
                  <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all ${currentUser.meatlessMode ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Leaf size={14} />
                    <span className="text-[9px] sm:text-xs font-black">گیاهی</span>
                  </button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all ${currentUser.quickMealsMode ? 'bg-amber-500 text-white border-amber-500' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Clock size={14} />
                    <span className="text-[9px] sm:text-xs font-black">سریع</span>
                  </button>
                </div>
              ) : null}
            </div>
            <div className="flex-1 flex items-center justify-center px-1 overflow-hidden">
              {activeChallengeName ? (
                <div className="flex items-center gap-1.5 bg-indigo-50/50 text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/30 animate-pulse">
                  <Trophy size={12} />
                  <span className="text-[8px] font-black whitespace-nowrap">{activeChallengeName}</span>
                </div>
              ) : activeFilterInfo ? (
                <div className={`flex items-center gap-1.5 backdrop-blur-3xl px-3 py-1.5 rounded-xl border animate-pulse ${activeFilterInfo.color}`}>
                  <activeFilterInfo.icon size={12} />
                  <span className="text-[8px] font-black leading-tight line-clamp-1">{activeFilterInfo.text}</span>
                </div>
              ) : null}
            </div>
            <div className="flex items-center shrink-0">
              <button onClick={() => setViewMode('settings')} className={`flex items-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white/40 border border-white/20 text-slate-700 hover:bg-white/60'}`}>
                <span className="text-[10px] sm:text-base font-black">تنظیمات</span>
                <Settings size={18} className={viewMode === 'settings' ? 'animate-spin-slow' : ''} />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 z-[210] transition-all no-print"><X size={18} /></button>
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
