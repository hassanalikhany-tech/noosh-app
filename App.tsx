
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2 } from 'lucide-react';
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
  const [footerSearchTerm, setFooterSearchTerm] = useState('');
  const [recipeCount, setRecipeCount] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const planResultsRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
  };

  // بهبود سرعت: به‌روزرسانی آنی وضعیت (Optimistic Update)
  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    
    // ۱. به‌روزرسانی فوری در ظاهر (بدون معطلی برای سرور)
    const optimisticUser = { ...currentUser, [filter]: newVal };
    setCurrentUser(optimisticUser);
    
    // ۲. همگام‌سازی در پس‌زمینه با دیتابیس
    try {
      await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    } catch (err) {
      // در صورت بروز خطا در شبکه، وضعیت را به حالت قبل برگردان
      setCurrentUser(currentUser);
      console.error("Sync failed:", err);
    }
  };

  const handleDismissForever = async () => {
    setShowOnboarding(false);
    localStorage.setItem('noosh_onboarding_dismissed', 'true');
    if (currentUser) {
      const updated = await UserService.updateProfile(currentUser.username, { hasCompletedSetup: true });
      setCurrentUser(updated);
    }
  };

  const handleGenerateDaily = async () => {
    if (!currentUser) return;
    if (recipeCount === 0) {
      setShowOnboarding(true);
      return;
    }
    setLoadingType('daily');
    try {
      const { plan, updatedUser } = await generateDailyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error(err); } finally { setLoadingType(null); }
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser) return;
    if (recipeCount === 0) {
      setShowOnboarding(true);
      return;
    }
    setLoadingType('weekly');
    try {
      const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error(err); } finally { setLoadingType(null); }
  };

  useEffect(() => {
    const startApp = async () => {
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
      }
      const result = await RecipeService.initialize();
      setRecipeCount(result.count);
      const isDismissedLocal = localStorage.getItem('noosh_onboarding_dismissed') === 'true';
      if (result.count === 0 && user && !user.hasCompletedSetup && !isDismissedLocal) {
        setShowOnboarding(true);
      }
      setIsInitializing(false);
    };
    startApp();

    const handleUpdate = () => {
      const count = RecipeService.getRawDishes().length;
      setRecipeCount(count);
      if (count > 0) setShowOnboarding(false);
    };
    window.addEventListener('recipes-updated', handleUpdate);
    return () => window.removeEventListener('recipes-updated', handleUpdate);
  }, []);

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.isAdmin && isAdminMode) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const activeChallengeName = currentUser.activeChallengeId ? (currentUser.activeChallengeId === 'vegan-week' ? 'هفته گیاهخواری' : currentUser.activeChallengeId === 'protein-power' ? 'پروتئین پلاس' : 'حذف قند') : null;

  const getActiveFilterMessage = () => {
    if (activeChallengeName) return null;
    if (viewMode !== 'plan') return null;

    if (currentUser.onlyFavoritesMode) {
      return { text: 'فیلتر محبوب‌ها فعال.', icon: Heart, color: 'text-rose-600 bg-rose-50/40 border-rose-100/50' };
    }
    if (currentUser.meatlessMode) {
      return { text: 'رژیم گیاهی فعال.', icon: Leaf, color: 'text-emerald-600 bg-emerald-50/40 border-emerald-100/50' };
    }
    if (currentUser.quickMealsMode) {
      return { text: 'پخت سریع فعال.', icon: Clock, color: 'text-amber-600 bg-amber-50/40 border-amber-100/50' };
    }
    return null;
  };

  const activeFilterInfo = getActiveFilterMessage();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      
      {/* هدر هوشمند - طراحی دو ردیفه Grid برای دسترسی کامل در موبایل */}
      <div className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] p-3 sm:px-8 sm:h-[85px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-all">
          
          {/* ردیف اول موبایل: لوگو و سبد خرید */}
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-9 h-9 sm:w-12 sm:h-12 object-contain" />
              <div className="flex flex-col" style={{ direction: 'ltr' }}>
                <span className="text-xl sm:text-2xl font-black italic text-slate-900 leading-none">NOOSH</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase">Premium</span>
              </div>
            </div>

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

          {/* ردیف دوم موبایل: منوی اصلی بصورت گرید ۲x۲ */}
          <nav className="w-full sm:flex-1 grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 bg-white/20 backdrop-blur-3xl p-1 sm:p-1.5 rounded-2xl sm:rounded-full border border-white/20 sm:mx-4">
            {[
              { id: 'plan', label: 'برنامه', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button 
                key={nav.id} 
                onClick={() => setViewMode(nav.id as ViewMode)}
                className={`px-3 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-full flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 transition-all duration-300 whitespace-nowrap ${
                  viewMode === nav.id 
                  ? 'bg-emerald-900 text-amber-400 shadow-md scale-[1.02] sm:scale-105' 
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

      <main className="pt-48 sm:pt-36 pb-36 sm:pb-48 px-4 sm:px-6 container mx-auto">
        {viewMode === 'plan' && (
          <div className="space-y-6 sm:space-y-10 animate-enter">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
              <button onClick={handleGenerateDaily} disabled={!!loadingType} className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center gap-3 sm:gap-4 hover:shadow-lg transition-all">
                <div className="p-4 sm:p-5 bg-emerald-50 text-emerald-600 rounded-2xl sm:rounded-3xl">
                  {loadingType === 'daily' ? <RefreshCw className="animate-spin" size={24} /> : <Utensils size={32} />}
                </div>
                <span className="font-black text-lg sm:text-xl text-slate-800">پیشنهاد امروز</span>
              </button>
              <button onClick={handleGenerateWeekly} disabled={!!loadingType} className="bg-slate-900 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col items-center gap-3 sm:gap-4 hover:scale-[1.01] transition-all">
                <div className="p-4 sm:p-5 bg-white/10 text-emerald-400 rounded-2xl sm:rounded-3xl">
                  {loadingType === 'weekly' ? <RefreshCw className="animate-spin" size={24} /> : <Calendar size={32} />}
                </div>
                <span className="font-black text-lg sm:text-xl text-white">برنامه هفتگی</span>
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

      {/* فوتر هوشمند - بازگرداندن متن فیلترها و بهینه‌سازی سرعت واکنش */}
      <div className="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] h-[75px] sm:h-[85px] px-3 sm:px-8 flex items-center">
          <div className="flex w-full items-center justify-between gap-1">
            
            {/* فیلترها و جستجو - با متن کامل برای درک بهتر */}
            <div className="flex items-center shrink-0">
              {viewMode === 'search' ? (
                <div className="relative w-36 sm:w-64 md:w-80 animate-enter">
                  <input
                    type="text"
                    placeholder="جستجو..."
                    value={footerSearchTerm}
                    onChange={(e) => setFooterSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-3 py-2.5 bg-white/50 backdrop-blur-3xl border border-white/40 rounded-xl outline-none font-black text-[10px] sm:text-sm"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} sm:size={20} />
                </div>
              ) : viewMode === 'plan' ? (
                <div className="flex items-center gap-1 sm:gap-2.5 animate-enter">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-200 ${currentUser.onlyFavoritesMode ? 'bg-rose-500 text-white border-rose-500 shadow-sm' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Heart size={14} sm:size={18} fill={currentUser.onlyFavoritesMode ? "white" : "none"} />
                    <span className="text-[9px] sm:text-xs font-black">محبوب</span>
                  </button>
                  <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-200 ${currentUser.meatlessMode ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Leaf size={14} sm:size={18} />
                    <span className="text-[9px] sm:text-xs font-black">گیاهی</span>
                  </button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-200 ${currentUser.quickMealsMode ? 'bg-amber-500 text-white border-amber-500 shadow-sm' : 'bg-white/40 border-white/20 text-slate-700'}`}>
                    <Clock size={14} sm:size={18} />
                    <span className="text-[9px] sm:text-xs font-black">سریع</span>
                  </button>
                </div>
              ) : null}
            </div>
            
            {/* پیام وضعیت مرکزی */}
            <div className="flex-1 flex items-center justify-center px-1 overflow-hidden">
              {activeChallengeName ? (
                <div className="flex items-center gap-1.5 bg-indigo-50/50 backdrop-blur-3xl text-indigo-700 px-3 py-1.5 rounded-xl border border-indigo-100/30 animate-pulse">
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

            {/* تنظیمات */}
            <div className="flex items-center shrink-0">
              <button 
                onClick={() => setViewMode('settings')} 
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  viewMode === 'settings' 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-white/40 border border-white/20 text-slate-700 hover:bg-white/60'
                }`}
              >
                <span className="text-[10px] sm:text-base font-black">تنظیمات</span>
                <Settings size={18} sm:size={22} className={viewMode === 'settings' ? 'animate-spin-slow' : ''} />
              </button>
            </div>
          </div>
        </footer>
      </div>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 sm:top-6 left-4 sm:left-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 z-[210] transition-all"><X size={18} /></button>
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
