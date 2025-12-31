
import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Printer, Lock, LayoutDashboard, Calendar, Leaf, Settings2, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Utensils, Flame, Info } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile, ShoppingItem } from './types';
import { UserService } from './services/userService';
import { RecipeService } from './services/recipeService';
import { CHALLENGES } from './data/challenges';
import MealCard from './components/MealCard';
import ShoppingList from './components/ShoppingList';
import PantryChef from './components/PantryChef';
import RecipeSearch from './components/RecipeSearch';
import Preferences from './components/Preferences';
import Challenges from './components/Challenges';
import Login from './components/auth/Login';
import Subscription from './components/auth/Subscription';
import AdminDashboard from './components/admin/AdminDashboard';
import { estimateCalories, estimateCookTime, getDishNature } from './utils/recipeHelpers';

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
  const [showTrustBanner, setShowTrustBanner] = useState(false);
  const [activePrintSource, setActivePrintSource] = useState<'plan' | 'shopping' | null>(null);
  const bannerTimerRef = useRef<any | null>(null);
  const planResultsRef = useRef<HTMLDivElement>(null);

  const triggerTrustBanner = () => {
    setShowTrustBanner(true);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => setShowTrustBanner(false), 30000);
  };

  useEffect(() => {
    const initApp = async () => {
      // ۱. اجبار به خروج و پاکسازی کش در هر بار بازگشت به اپلیکیشن
      // این خط تضمین می‌کند کاربر همیشه پنل ورود را ببیند و دیتابیس دوبل نشود
      await UserService.logout();
      setInitProgress(20);

      // ۲. شبیه‌سازی پیشرفت بارگذاری برای نمایش به کاربر
      const progressInterval = setInterval(() => {
        setInitProgress(prev => {
          if (prev >= 95) return prev;
          return prev + 2;
        });
      }, 150);

      await RecipeService.initialize();
      setInitProgress(60);
      
      await UserService.seedAdmin();
      setInitProgress(85);
      
      // در این مرحله آگاهانه currentUser را ست نمی‌کنیم تا صفحه ورود نمایش داده شود
      setInitProgress(100);
      
      clearInterval(progressInterval);
      
      // یک تاخیر کوتاه برای نمایش ۱۰۰ درصد و سپس حذف صفحه بارگذاری
      setTimeout(() => {
        setIsInitializing(false);
      }, 800);
    };
    
    initApp();

    const handleUserUpdate = async () => {
      const updated = await UserService.getCurrentUser();
      if (updated) {
        setCurrentUser({ ...updated });
        if (updated.weeklyPlan) setDisplayPlan(updated.weeklyPlan);
      }
    };

    window.addEventListener('user-data-updated', handleUserUpdate);
    // Fix: Listen to trigger-trust-banner event dispatched from other components
    window.addEventListener('trigger-trust-banner', triggerTrustBanner);
    
    return () => {
      window.removeEventListener('user-data-updated', handleUserUpdate);
      window.removeEventListener('trigger-trust-banner', triggerTrustBanner);
    };
  }, []);

  const toPersianDigits = (num: number | string) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
    setDisplayPlan([]);
  };

  // Fix: Added handleToggleFilter to toggle specific boolean settings in user profile
  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const updates: Partial<UserProfile> = { [filter]: !currentUser[filter] };
    const updated = await UserService.updateProfile(currentUser.username, updates);
    setCurrentUser(updated);
  };

  // Fix: Added handleGenerate to generate a daily recommendation plan
  const handleGenerate = async () => {
    if (!currentUser) return;
    setLoadingType('daily');
    try {
      const { plan, updatedUser } = await generateDailyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error("Daily plan generation failed:", err);
    } finally {
      setLoadingType(null);
    }
  };

  // Fix: Added handleGenerateWeekly to generate a 7-day meal plan
  const handleGenerateWeekly = async () => {
    if (!currentUser) return;
    setLoadingType('weekly');
    try {
      const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
      setDisplayPlan(plan);
      setCurrentUser(updatedUser);
      setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error("Weekly plan generation failed:", err);
    } finally {
      setLoadingType(null);
    }
  };

  // صفحه بارگذاری اختصاصی با لوگو و نام دو رنگ
  if (isInitializing) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[9999] overflow-hidden">
      <div className="bg-noosh-pattern opacity-10 absolute inset-0"></div>
      
      <div className="relative z-10 flex flex-col items-center gap-10 animate-enter">
        {/* لوگوی اپلیکیشن با افکت درخشش */}
        <div className="animate-float">
          <img 
            src="https://i.ibb.co/gMDKtj4p/3.png" 
            alt="Noosh Logo" 
            className="w-36 h-36 object-contain drop-shadow-[0_0_30px_rgba(45,212,191,0.5)]" 
          />
        </div>
        
        {/* نام دو رنگ انگلیسی اپلیکیشن */}
        <div className="text-center">
          <div className="flex flex-row items-baseline justify-center gap-2 mb-4" style={{ direction: 'ltr' }}>
            <span className="text-5xl font-black italic text-white uppercase tracking-tighter">NOOSH</span>
            <span className="text-3xl font-black text-teal-500 italic uppercase">APP</span>
          </div>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full mb-2 opacity-50"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">Smart Kitchen Assistant</p>
        </div>

        {/* نوار پیشرفت و درصد */}
        <div className="w-72 space-y-4">
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-teal-600 via-teal-400 to-teal-500 transition-all duration-500 ease-out rounded-full shadow-[0_0_15px_rgba(45,212,191,0.6)]"
              style={{ width: `${initProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center px-1">
             <div className="flex items-center gap-2">
                <RefreshCw size={14} className="text-teal-500 animate-spin" />
                <span className="text-teal-500 text-[11px] font-black">در حال آماده‌سازی...</span>
             </div>
             <span className="text-white font-mono text-sm font-black">{toPersianDigits(initProgress)}٪</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
        Version 12.7.2 | Secure Environment
      </div>
    </div>
  );

  // اگر کاربر لاگین نکرده باشد (که با توجه به منطق بالا همیشه در ابتدا نکرده است) صفحه ورود نشان داده می‌شود
  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  
  if (currentUser.isAdmin && isAdminMode) {
    return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  }

  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const isWeeklyView = displayPlan.length > 3;
  const isGenerating = !!loadingType;

  return (
    <div className="min-h-screen flex flex-col font-sans text-right dir-rtl relative">
      <div className={`sticky top-0 z-40 shadow-2xl no-print bg-slate-950`}>
        <header className="h-[75px] flex items-center border-b border-white/5 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
                <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                <div className="flex flex-row items-baseline gap-1.5" style={{ direction: 'ltr' }}>
                   <span className="text-2xl font-black italic text-white uppercase">NOOSH</span>
                   <span className="text-sm font-black text-teal-500 italic uppercase">APP</span>
                </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentUser.isAdmin && (
                <button 
                  onClick={() => setIsAdminMode(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-slate-900 rounded-xl font-black text-xs hover:bg-amber-400 transition-all active:scale-95"
                >
                  <Lock size={16} />
                  پنل مدیریت
                </button>
              )}
              <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2.5 bg-white/5 rounded-2xl text-teal-400 border border-white/10 active:scale-95">
                <ShoppingCart size={22} />
                {currentUser.customShoppingList?.filter(i => !i.checked).length ? (
                  <span className="absolute -top-1 -left-1 bg-rose-500 text-white w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-full ring-2 ring-slate-950">{currentUser.customShoppingList.filter(i => !i.checked).length}</span>
                ) : null}
              </button>
            </div>
          </div>
        </header>
        <nav className="bg-white border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          <div className="container mx-auto flex p-1 gap-1">
            {[{id: 'plan', label: 'چی بپزم؟', icon: CalendarDays}, {id: 'pantry', label: 'آشپز برتر', icon: ChefHat}, {id: 'search', label: 'جستجو', icon: Search}, {id: 'challenges', label: 'چالش', icon: Trophy}, {id: 'settings', label: 'تنظیمات', icon: Settings}].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`flex-1 min-w-[70px] py-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${viewMode === nav.id ? 'text-teal-700 bg-teal-50 font-black shadow-inner' : 'text-slate-400'}`}><nav.icon size={20} /><span className="text-[10px] whitespace-nowrap">{nav.label}</span></button>
            ))}
          </div>
        </nav>
      </div>

      <main className="flex-grow container mx-auto px-4 pt-0 py-8 relative z-10 pb-24 no-print">
        {viewMode === 'plan' && (
          <div className="space-y-3 animate-enter">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl p-2 px-4 shadow-sm border-2 border-teal-500/20 no-print flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
               <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="p-1.5 bg-teal-600 text-white rounded-lg shadow-md shadow-teal-100"><Settings2 size={16} /></div>
                  <h2 className="text-xs font-black text-slate-900 whitespace-nowrap">تنظیمات سریع برنامه</h2>
               </div>
               <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end w-full">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <Heart size={14} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                    <span className="font-black text-[9px]">غذاهای محبوب</span>
                  </button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 transition-all ${currentUser.quickMealsMode ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <Clock size={14} />
                    <span className="font-black text-[9px]">غذاهای سریع</span>
                  </button>
                  <button disabled={currentUser.activeChallengeId === 'vegan-week'} onClick={() => handleToggleFilter('meatlessMode')} className={`px-3 py-1.5 rounded-xl border-2 flex items-center gap-1.5 transition-all ${currentUser.meatlessMode || currentUser.activeChallengeId === 'vegan-week' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    <Leaf size={14} />
                    <span className="font-black text-[9px]">بدون گوشت</span>
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-4xl mx-auto no-print">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md group relative overflow-hidden">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-lg flex items-center justify-center mb-2 shadow-md shadow-teal-100 relative z-10"><Calendar size={18} /></div>
                <h2 className="text-sm font-black text-slate-800 mb-2 relative z-10">برنامه غذایی هفتگی</h2>
                <button onClick={handleGenerateWeekly} disabled={isGenerating} className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-black transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 text-[10px]">
                  {loadingType === 'weekly' ? <RefreshCw size={14} className="animate-spin" /> : <span>ساخت برنامه ۷ روزه</span>}
                </button>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-md group relative overflow-hidden">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-lg flex items-center justify-center mb-2 shadow-md shadow-amber-100 relative z-10"><RefreshCw size={18} /></div>
                <h2 className="text-sm font-black text-slate-800 mb-2 relative z-10">برنامه غذایی روزانه</h2>
                <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-black transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 text-[10px]">
                  {loadingType === 'daily' ? <RefreshCw size={14} className="animate-spin" /> : <span>پیشنهاد غذای امروز</span>}
                </button>
              </div>
            </div>

            {displayPlan.length > 0 && (
              <div ref={planResultsRef} className="scroll-mt-48 pt-2">
                <div className="space-y-4 pb-12">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-lg"><Calendar size={14} /></div>
                       <h2 className="text-sm font-black text-slate-900">پیشنهادات منطبق با پروفایل شما</h2>
                    </div>
                    <div className="flex gap-2 no-print">
                      <button onClick={() => window.print()} className="px-2.5 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black border border-teal-100 active:scale-95"><Printer size={12} /> چاپ برنامه</button>
                      <button onClick={async () => { setDisplayPlan([]); await UserService.updateProfile(currentUser.username, { weeklyPlan: [] }); }} className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black border border-rose-100 active:scale-95"><Trash2 size={12} /> پاکسازی لیست</button>
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 ${isWeeklyView ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
                    {displayPlan.map((plan, idx) => (
                      <div key={`${plan.dish.id}-${idx}`} className="animate-enter" style={{ animationDelay: `${idx * 0.05}s` }}><MealCard plan={plan} user={currentUser} onUpdateUser={setCurrentUser} /></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={()=>{}} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full text-gray-500 z-[110] transition-colors hover:bg-gray-200 active:scale-90"><X size={20} /></button>
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
