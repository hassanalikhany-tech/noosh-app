
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2, Loader2, ScanFace, Info as InfoIcon, AlertTriangle, ShieldAlert } from 'lucide-react';
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
import { DayPlan, UserProfile } from './types';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { CHALLENGES } from './data/challenges';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

interface SmartNotice {
  title: string;
  description: string;
  icon: any;
  color: string;
  list?: string[];
}

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
  const [showBiometricPrompt, setShowBiometricPrompt] = useState(false);
  
  // وضعیت کادر اعلان هوشمند
  const [activeNotice, setActiveNotice] = useState<SmartNotice | null>(null);
  const [noticeClosing, setNoticeClosing] = useState(false);
  // Fix: Use ReturnType<typeof setTimeout> to avoid NodeJS namespace dependency in browser environments
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const planResultsRef = useRef<HTMLDivElement>(null);

  const triggerSmartNotice = (notice: SmartNotice) => {
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    
    setNoticeClosing(false);
    setActiveNotice(notice);
    
    // فاز خروج بعد از ۱۴.۲ ثانیه
    const closingTimer = setTimeout(() => {
      setNoticeClosing(true);
    }, 14200);

    // حذف کامل بعد از ۱۵ ثانیه
    const finalTimer = setTimeout(() => {
      setActiveNotice(null);
      setNoticeClosing(false);
    }, 15000);

    noticeTimerRef.current = finalTimer;
  };

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
    
    // نمایش اعلان هوشمند بر اساس فیلتر فعال شده
    if (newVal) {
      let notice: SmartNotice;
      if (filter === 'onlyFavoritesMode') {
        notice = {
          title: 'فقط غذاهای محبوب شما',
          description: 'شما فیلتر محبوب‌ها را فعال کردید. از این پس در پیشنهادات روزانه و هفتگی، فقط غذاهایی که قبلاً با قلب قرمز مشخص کرده‌اید نمایش داده می‌شوند تا همیشه از طعم‌های دلخواه خود لذت ببرید.',
          icon: Heart,
          color: 'bg-rose-500'
        };
      } else if (filter === 'meatlessMode') {
        notice = {
          title: 'رژیم گیاه‌خواری فعال شد',
          description: 'حالت بدون گوشت فعال است. سیستم به طور خودکار تمامی غذاهای حاوی گوشت قرمز، مرغ و ماهی را از پیشنهادات شما حذف کرده تا یک برنامه کاملاً گیاهی و سلامت‌محور داشته باشید.',
          icon: Leaf,
          color: 'bg-emerald-500'
        };
      } else {
        notice = {
          title: 'آشپزی سریع و فوری',
          description: 'حالت پخت سریع فعال شد. از این پس فقط غذاهایی به شما پیشنهاد داده می‌شوند که کل زمان آماده‌سازی و پخت آن‌ها کمتر از ۴۵ دقیقه باشد؛ مناسب برای روزهای پرمشغله شما.',
          icon: Clock,
          color: 'bg-amber-500'
        };
      }
      triggerSmartNotice(notice);
    }

    try {
      await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    } catch (err) {
      setCurrentUser(currentUser);
    }
  };

  const handleGenerateDaily = async () => {
    if (!currentUser || recipeCount === 0) return;
    setLoadingType('daily');
    try {
      const { plan, updatedUser } = await generateDailyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      
      // اگر مواد ممنوعه داشت، یادآوری کن
      if (currentUser.dislikedIngredients?.length > 0) {
        triggerSmartNotice({
          title: 'یادآوری محدودیت پخت',
          description: 'برنامه پیشنهادی شما با موفقیت تولید شد. طبق تنظیمات قبلی شما، هیچ‌کدام از غذاهای پیشنهادی شامل مواد ممنوعه زیر نیستند:',
          icon: AlertTriangle,
          color: 'bg-rose-600',
          list: currentUser.dislikedIngredients
        });
      }

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

      // اگر مواد ممنوعه داشت، یادآوری کن
      if (currentUser.dislikedIngredients?.length > 0) {
        triggerSmartNotice({
          title: 'یادآوری محدودیت پخت',
          description: 'برنامه هفتگی شما فیلتر شد. طبق لیست سیاه مواد غذایی شما، موارد زیر در هیچ‌یک از وعده‌های این هفته استفاده نشده‌اند:',
          icon: AlertTriangle,
          color: 'bg-rose-600',
          list: currentUser.dislikedIngredients
        });
      }

      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) { console.error(err); } finally { setLoadingType(null); }
  };

  // تابع کمکی برای چالش‌ها
  const handleChallengeNotice = (challengeId: string | null) => {
    if (!challengeId) return;
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    if (challenge) {
      triggerSmartNotice({
        title: `چالش ${challenge.title} آغاز شد`,
        description: `شما وارد یک چالش جدید شدید! ${challenge.description}. از این پس پیشنهادات غذایی سیستم طبق قوانین این چالش تنظیم خواهد شد تا به هدف سلامتی خود برسید.`,
        icon: Trophy,
        color: 'bg-purple-600'
      });
    }
  };

  // Fix: Added missing handleEnableBiometric handler
  const handleEnableBiometric = async () => {
    if (!currentUser) return;
    const success = await UserService.enableBiometric(currentUser.uid, true);
    if (success) {
      setCurrentUser(prev => prev ? { ...prev, isBiometricEnabled: true } : null);
    }
    setShowBiometricPrompt(false);
  };

  // Fix: Added missing handleDeclineBiometric handler
  const handleDeclineBiometric = () => {
    setShowBiometricPrompt(false);
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

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      
      {/* کادر اعلان هوشمند شیشه‌ای و متحرک (Generic Notice) */}
      {activeNotice && (
        <div 
          className={`fixed left-1/2 -translate-x-1/2 top-[10%] z-[2000] w-[95%] max-w-xl p-8 rounded-[3rem] backdrop-blur-3xl bg-white/40 border border-white/60 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] flex flex-col items-center text-center gap-5 ${noticeClosing ? 'notice-slide-out' : 'notice-slide-in'}`}
        >
          <div className={`p-6 ${activeNotice.color} text-white rounded-[2.5rem] shadow-2xl animate-pulse`}>
            <activeNotice.icon size={56} />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">{activeNotice.title}</h3>
            <p className="text-sm font-bold text-slate-600 leading-relaxed px-4">
              {activeNotice.description}
            </p>
          </div>
          
          {activeNotice.list && activeNotice.list.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {activeNotice.list.map(item => (
                <span key={item} className="px-4 py-2 bg-white/80 border border-slate-200 text-slate-700 rounded-xl text-xs font-black shadow-sm">
                  {item}
                </span>
              ))}
            </div>
          )}

          <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden mt-6">
            <div className={`h-full ${activeNotice.color} animate-[progress_15s_linear_forwards]`}></div>
          </div>
          <style>{`
            @keyframes progress { from { width: 100%; } to { width: 0%; } }
          `}</style>
        </div>
      )}

      {showBiometricPrompt && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-enter">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-teal-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-teal-50/50">
                <ScanFace size={64} strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">ورود سریع و امن</h2>
              <p className="text-slate-500 font-bold text-sm leading-relaxed mb-8 px-4">
                آیا مایل هستید در دفعات بعدی با استفاده از تشخیص چهره یا اثرانگشت وارد برنامه شوید؟ این کار امنیت و سرعت ورود شما را افزایش می‌دهد.
              </p>
              <div className="space-y-3">
                <button type="button" onClick={() => handleEnableBiometric()} className="w-full py-4 bg-teal-600 text-white rounded-2xl font-black shadow-xl shadow-teal-100 transition-all active:scale-95">بله، فعال کن</button>
                <button type="button" onClick={() => handleDeclineBiometric()} className="w-full py-4 bg-slate-100 text-slate-500 rounded-2xl font-black transition-all">خیر، فعلاً نه</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] p-3 sm:px-8 sm:h-[110px] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 transition-all">
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4 shrink-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-9 h-9 sm:w-16 sm:h-16 object-contain" />
              <div className="flex flex-col" style={{ direction: 'ltr' }}>
                <span className="text-xl sm:text-4xl font-black italic text-slate-900 leading-none">NOOSH</span>
                <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase">Premium</span>
              </div>
            </div>
            {currentUser.isAdmin && (
              <button onClick={() => setIsAdminMode(true)} className="mx-2 px-3 py-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-700 active:scale-95 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-[10px] font-black">مدیریت</span>
              </button>
            )}
          </div>
          <nav className="w-full sm:flex-1 grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-6 bg-white/20 backdrop-blur-3xl p-1 sm:p-2 rounded-2xl sm:rounded-full border border-white/20 sm:mx-6">
            {[
              { id: 'plan', label: 'برنامه‌ریزی', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button 
                key={nav.id} 
                onClick={() => setViewMode(nav.id as ViewMode)}
                className={`px-3 py-2.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-full flex items-center justify-center sm:justify-start gap-2 sm:gap-4 transition-all duration-300 whitespace-nowrap ${
                  viewMode === nav.id 
                  ? 'bg-emerald-900 text-amber-400 shadow-xl scale-[1.05]' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/30'
                }`}
              >
                <nav.icon size={18} className={`${viewMode === nav.id ? 'text-amber-400' : ''} sm:w-7 sm:h-7`} />
                <span className={`font-black tracking-tight ${viewMode === nav.id ? 'text-[11px] sm:text-3xl' : 'text-[11px] sm:text-3xl opacity-75'}`}>
                  {nav.label}
                </span>
              </button>
            ))}
          </nav>
          <div className="hidden sm:flex items-center shrink-0">
             <button onClick={() => setIsShoppingListOpen(true)} className="relative p-5 bg-emerald-600 text-white rounded-[2rem] shadow-md hover:scale-105 transition-all">
              <ShoppingCart size={32} />
              {currentUser.customShoppingList?.filter(i => !i.checked).length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] w-7 h-7 flex items-center justify-center rounded-full font-black ring-2 ring-white">
                  {currentUser.customShoppingList.filter(i => !i.checked).length}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      <main className="pt-48 sm:pt-48 pb-36 sm:pb-48 px-4 sm:px-6 container mx-auto no-print">
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
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={(t, d, c, i) => triggerSmartNotice({title: t, description: d, color: c, icon: i})} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      <div className="fixed bottom-2 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] h-[75px] sm:h-[95px] px-3 sm:px-8 flex items-center">
          <div className="flex w-full items-center justify-between gap-1">
            <div className="flex items-center shrink-0">
              {viewMode === 'search' ? (
                <div className="relative w-36 sm:w-64 md:w-80">
                  <input type="text" placeholder="جستجو..." value={footerSearchTerm} onChange={(e) => setFooterSearchTerm(e.target.value)} className="w-full pr-10 pl-3 py-2.5 bg-white/50 backdrop-blur-3xl border border-white/40 rounded-xl outline-none font-black text-[10px] sm:text-sm" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                </div>
              ) : viewMode === 'plan' ? (
                <div className="flex items-center gap-2 sm:gap-6">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-2 transition-all ${currentUser.onlyFavoritesMode ? 'text-rose-500 scale-110' : 'text-slate-400'}`}>
                    <Heart size={20} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                    <span className="text-[10px] sm:text-base font-black">محبوب</span>
                  </button>
                  <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-2 transition-all ${currentUser.meatlessMode ? 'text-emerald-500 scale-110' : 'text-slate-400'}`}>
                    <Leaf size={20} />
                    <span className="text-[10px] sm:text-base font-black">گیاهی</span>
                  </button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-2 transition-all ${currentUser.quickMealsMode ? 'text-amber-500 scale-110' : 'text-slate-400'}`}>
                    <Clock size={20} />
                    <span className="text-[10px] sm:text-base font-black">سریع</span>
                  </button>
                </div>
              ) : null}
            </div>

            {/* داشبورد میانی فوتر حذف شد تا برنامه خلوت‌تر شود (طبق درخواست کاربر) */}
            <div className="hidden md:flex flex-1"></div>

            <div className="flex items-center shrink-0">
              <button onClick={() => setViewMode('settings')} className={`flex items-center gap-1.5 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white/40 border border-white/20 text-slate-700 hover:bg-white/60'}`}>
                <span className="text-[10px] sm:text-base font-black">تنظیمات</span>
                <Settings size={22} className={viewMode === 'settings' ? 'animate-spin-slow' : ''} />
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
