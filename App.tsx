
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2, Loader2, ScanFace, Printer, Share2, MessageCircle, Smartphone, Database, ShieldAlert, FilterX, Check, AlertTriangle, Shield, LayoutDashboard, Bell } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
import Subscription from './components/auth/Subscription';
import Challenges from './components/Challenges';
import MealCard from './components/MealCard';
import PantryChef from './components/PantryChef';
import Preferences from './components/Preferences';
import RecipeSearch from './components/RecipeSearch';
import ShoppingList from './components/ShoppingList';
import AuthGate from './components/auth/AuthGate';
import NotificationCenter from './components/NotificationCenter';
import { RecipeService } from './services/recipeService';
import { UserService } from './services/userService';
import { DayPlan, UserProfile, CATEGORY_LABELS, ShoppingItem, DishCategory } from './types';
import { generateDailyPlan, generateWeeklyPlan, generateMonthlyPlan } from './utils/planner';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

const ADMIN_MOBILE = '09143013288';

interface StatusAlert {
  show: boolean;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const AppContent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [displayPlan, setDisplayPlan] = useState<DayPlan[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAutoSyncing, setIsAutoSyncing] = useState(false);
  const [appVersion, setAppVersion] = useState("V19.6");
  const [statusAlert, setStatusAlert] = useState<StatusAlert>({ 
    show: false, 
    title: '', 
    description: '', 
    icon: Info, 
    color: 'emerald' 
  });
  const [planLoading, setPlanLoading] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  
  const [showExclusionAlert, setShowExclusionAlert] = useState(false);
  const [hideExclusionForever, setHideExclusionForever] = useState(false);
  const [pendingPlanType, setPendingPlanType] = useState<'daily' | 'weekly' | 'monthly' | null>(null);

  const AlertIcon = statusAlert.icon;

  useEffect(() => {
    const initApp = async () => {
      try {
        const metaRes = await fetch('/metadata.json');
        if (metaRes.ok) {
          const metaData = await metaRes.json();
          if (metaData.name) {
            const parts = metaData.name.split(' ');
            setAppVersion(parts[parts.length - 1]);
          }
        }

        const stats = await RecipeService.initialize();
        const user = await UserService.getCurrentUser();
        
        if (user) {
          setCurrentUser(user);
          if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
        }
        
        if (stats.count === 0) {
          setIsAutoSyncing(true);
          await RecipeService.syncFromCloud();
          setIsAutoSyncing(false);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        setIsInitializing(false);
      }
    };
    initApp();
  }, []);

  const triggerStatusAlert = (title: string, description: string, icon: any, color: string) => {
    setStatusAlert({ show: true, title, description, icon, color });
    setTimeout(() => {
      setStatusAlert(prev => ({ ...prev, show: false }));
    }, 4000); 
  };

  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    setCurrentUser({ ...currentUser, [filter]: newVal });
    
    const meta = {
      onlyFavoritesMode: { title: 'محبوب‌ها', desc: newVal ? 'فیلتر محبوب فعال شد.' : 'فیلتر محبوب غیرفعال شد.', icon: Heart, color: 'rose' },
      quickMealsMode: { title: 'پخت سریع', desc: newVal ? 'فیلتر پخت سریع فعال شد.' : 'فیلتر پخت سریع غیرفعال شد.', icon: Clock, color: 'amber' },
      meatlessMode: { title: 'گیاهی', desc: newVal ? 'رژیم گیاهی فعال شد.' : 'رژیم گیاهی غیرفعال شد.', icon: Leaf, color: 'emerald' }
    };
    
    triggerStatusAlert(meta[filter].title, meta[filter].desc, meta[filter].icon, meta[filter].color);
    await UserService.updateProfile(currentUser.username, { [filter]: newVal });
  };

  const executePlanGeneration = async (type: 'daily' | 'weekly' | 'monthly') => {
    if (!currentUser) return;
    setPlanLoading(type);
    
    setTimeout(async () => {
      try {
        let result;
        if (type === 'daily') result = await generateDailyPlan(currentUser);
        else if (type === 'weekly') result = await generateWeeklyPlan(currentUser);
        else result = await generateMonthlyPlan(currentUser);
        
        setDisplayPlan(result.plan);
        setCurrentUser(result.updatedUser);
        
        if (hideExclusionForever) {
            localStorage.setItem('hide_exclusion_reminder', 'true');
            localStorage.setItem('excluded_categories_at_last_reminder', JSON.stringify(currentUser.excludedCategories || []));
        }
      } catch (err: any) {
        triggerStatusAlert('عملیات ناموفق', err.message || 'خطا در تولید برنامه', AlertTriangle, 'rose');
      } finally {
        setPlanLoading(null);
        setPendingPlanType(null);
        setShowExclusionAlert(false);
      }
    }, 100);
  };

  const handleGeneratePlan = (type: 'daily' | 'weekly' | 'monthly') => {
    if (!currentUser) return;

    if (RecipeService.getLocalCount() === 0) {
      triggerStatusAlert('در حال آماده‌سازی', 'دیتابیس در حال دریافت اطلاعات است. لطفاً چند لحظه دیگر دوباره امتحان کنید.', RefreshCw, 'indigo');
      RecipeService.syncFromCloud();
      return;
    }

    const excluded = currentUser.excludedCategories || [];
    const isHiddenForever = localStorage.getItem('hide_exclusion_reminder') === 'true';
    const lastSeenList = JSON.parse(localStorage.getItem('excluded_categories_at_last_reminder') || '[]');
    const hasFilterChanged = JSON.stringify([...excluded].sort()) !== JSON.stringify([...lastSeenList].sort());

    if (excluded.length > 0 && (!isHiddenForever || hasFilterChanged)) {
      setPendingPlanType(type);
      setShowExclusionAlert(true);
      if (hasFilterChanged) setHideExclusionForever(false);
      return;
    }

    executePlanGeneration(type);
  };

  const handleBackToSettings = () => {
    setShowExclusionAlert(false);
    setViewMode('settings');
    setTimeout(() => {
        const section = document.getElementById('smart-filters-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 300);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // فقط متد خروج را صدا می‌زنیم؛ AuthGate خودش بقیه کارها را مدیریت می‌کند
      await UserService.logout();
      // استیت‌های لوکال را برای امنیت پاک می‌کنیم (اختیاری چون AuthGate کلا این بخش را حذف می‌کند)
      setCurrentUser(null);
      setIsAdminMode(false);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
        // دیگر از window.location.reload() استفاده نمی‌کنیم
        setIsLoggingOut(false);
    }
  };

  if (isLoggingOut) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white dir-rtl animate-fade-in">
      <div className="p-6 bg-emerald-500/10 rounded-full mb-6 border border-emerald-500/20">
        <ShieldCheck className="w-12 h-12 text-emerald-500 animate-pulse" />
      </div>
      <h2 className="text-xl font-black mb-2">خروج ایمن...</h2>
      <p className="text-slate-400 text-xs font-bold tracking-widest">در حال بستن نشست و ذخیره تغییرات نهایی</p>
    </div>
  );

  if (isInitializing || !currentUser) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white dir-rtl">
      <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
      <p className="text-sm font-black tracking-widest">در حال فراخوانی دستیار هوشمند نوش...</p>
    </div>
  );

  const isAdmin = currentUser.role === 'admin' || currentUser.uid === ADMIN_MOBILE || currentUser.username === ADMIN_MOBILE;
  
  if (isAdminMode && isAdmin) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      {/* پیام‌های وضعیت */}
      <div className={`fixed inset-0 z-[2000] flex items-center justify-center p-6 pointer-events-none transition-all duration-700 ease-out ${statusAlert.show ? 'translate-y-0 opacity-100 scale-100 visible' : '-translate-y-20 opacity-0 scale-95 invisible'}`}>
         <div className={`bg-white/95 backdrop-blur-2xl border border-white/60 p-10 rounded-[3rem] shadow-2xl max-w-lg w-full flex flex-col items-center text-center gap-6 relative transition-all ${statusAlert.show ? 'pointer-events-auto' : 'pointer-events-none'}`}>
            <div className={`absolute top-0 inset-x-0 h-2 bg-${statusAlert.color}-500`}></div>
            <div className={`p-6 bg-${statusAlert.color}-500 text-white rounded-[2rem] shadow-2xl animate-bounce`}>
               <AlertIcon size={48} />
            </div>
            <div>
               <h3 className={`text-2xl font-black text-slate-900 mb-2`}>{statusAlert.title}</h3>
               <p className="text-slate-600 text-lg font-bold leading-relaxed">{statusAlert.description}</p>
            </div>
            <button onClick={() => setStatusAlert(prev => ({ ...prev, show: false }))} className="mt-4 px-8 py-3 bg-slate-100 hover:bg-slate-200 rounded-2xl text-slate-600 font-black text-sm transition-all pointer-events-auto cursor-pointer">متوجه شدم</button>
         </div>
      </div>

      {/* مودال یادآوری فیلترها */}
      {showExclusionAlert && (
          <div className="fixed inset-0 z-[2500] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm no-print">
              <div className="bg-white rounded-[3rem] shadow-2xl max-w-xl w-full p-10 animate-enter border border-white/20">
                  <div className="flex flex-col items-center text-center gap-6">
                      <div className="p-6 bg-amber-100 text-amber-600 rounded-[2.5rem]"><FilterX size={48} /></div>
                      <div>
                          <h3 className="text-2xl font-black text-slate-800 mb-3">یادآوری فیلترها</h3>
                          <p className="text-slate-500 font-bold text-sm leading-relaxed mb-6">دسته‌های زیر در تنظیمات شما حذف شده‌اند و در برنامه نخواهند بود:</p>
                          <div className="flex flex-wrap justify-center gap-2 mb-8">
                              {(currentUser.excludedCategories as DishCategory[]).map(cat => (
                                  <span key={cat} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black border border-slate-200">{CATEGORY_LABELS[cat]}</span>
                              ))}
                          </div>
                      </div>
                      <div className="w-full space-y-4">
                          <button onClick={() => setHideExclusionForever(!hideExclusionForever)} className="flex items-center gap-3 justify-center text-sm font-black text-slate-400 hover:text-slate-600 transition-colors w-full cursor-pointer">
                             <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${hideExclusionForever ? 'bg-teal-500 border-teal-500' : 'border-slate-200'}`}>
                                 {hideExclusionForever && <Check size={16} className="text-white" />}
                             </div>
                             دیگر این پیام را نشان نده
                          </button>
                          <button onClick={() => executePlanGeneration(pendingPlanType!)} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg shadow-xl active:scale-95 transition-all cursor-pointer">تایید و ادامه</button>
                          <button onClick={handleBackToSettings} className="text-teal-600 font-black text-xs py-2 w-full hover:underline cursor-pointer">بازگشت به تنظیمات و اصلاح دسته‌ها</button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* هدر */}
      <div className="fixed top-4 left-4 right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[2.5rem] shadow-sm p-4 h-[110px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-16 h-16 object-contain" />
            <div className="flex flex-col" style={{ direction: 'ltr' }}>
              <div className="flex items-baseline gap-1.5">
                 <span className="text-3xl sm:text-4xl font-black italic text-slate-900 tracking-tighter">NOOSH</span>
                 <span className="text-xl sm:text-2xl font-black text-teal-600 italic">APP</span>
              </div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mt-0.5 ml-0.5">Premium {appVersion}</span>
            </div>
          </div>
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1.5 bg-white/20 backdrop-blur-3xl p-1 rounded-full border border-white/20 mx-6">
            {[
              { id: 'plan', label: 'برنامه‌ریزی', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`px-6 py-4 rounded-full flex items-center gap-2 transition-all cursor-pointer ${viewMode === nav.id ? 'bg-emerald-900 text-amber-400 shadow-xl' : 'text-slate-600 hover:bg-white/30'}`}>
                <nav.icon size={20} />
                <span className="text-lg font-black">{nav.label}</span>
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
             <button onClick={() => setIsNotificationCenterOpen(true)} className="p-4 bg-white border border-slate-100 text-indigo-600 rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer relative">
               <Bell size={28} />
             </button>
             {isAdmin && (
               <button onClick={() => setIsAdminMode(true)} className="p-4 bg-slate-950 text-teal-400 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/10" title="ورود به پنل مدیریت ارشد">
                 <ShieldAlert size={28} />
               </button>
             )}
             <button onClick={() => setIsShoppingListOpen(true)} className="relative p-4 bg-emerald-600 text-white rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer">
              <ShoppingCart size={28} />
              {currentUser?.customShoppingList?.filter((i:any) => !i.checked).length > 0 && (
                <span className="absolute -top-1 -left-1 bg-rose-500 text-white text-[10px] w-6 h-6 flex items-center justify-center rounded-full font-black ring-2 ring-white">
                  {currentUser?.customShoppingList.filter((i:any) => !i.checked).length}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>

      <NotificationCenter isOpen={isNotificationCenterOpen} onClose={() => setIsNotificationCenterOpen(false)} user={currentUser!} />

      <main className="pt-48 pb-48 px-4 container mx-auto no-print">
        {viewMode === 'plan' && (
          <div className="space-y-12 animate-enter relative z-10">
            {isAutoSyncing && (
              <div className="max-w-xl mx-auto p-6 bg-indigo-50 border-2 border-indigo-100 rounded-[2rem] flex items-center justify-center gap-4 animate-pulse">
                <RefreshCw size={24} className="animate-spin text-indigo-600" />
                <span className="font-black text-indigo-800 text-sm">در حال دریافت پخت‌های جدید از سرور...</span>
              </div>
            )}
            <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[3rem] p-4 shadow-2xl flex items-center gap-4">
               <div className="flex-grow grid grid-cols-3 gap-3">
                  <button onClick={() => handleGeneratePlan('daily')} disabled={planLoading !== null} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all shadow-sm active:scale-95 cursor-pointer ${planLoading === 'daily' ? 'bg-teal-50 text-teal-600' : 'bg-white text-slate-800 hover:bg-teal-50'}`}>
                     {planLoading === 'daily' ? <RefreshCw size={24} className="animate-spin" /> : <Utensils size={24} />} 
                     {planLoading === 'daily' ? 'در حال پخت...' : 'پیشنهاد امروز'}
                  </button>
                  <button onClick={() => handleGeneratePlan('weekly')} disabled={planLoading !== null} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm shadow-xl transition-all active:scale-95 cursor-pointer ${planLoading === 'weekly' ? 'bg-slate-800' : 'bg-slate-900 text-white'}`}>
                     {planLoading === 'weekly' ? <RefreshCw size={24} className="animate-spin text-amber-400" /> : <Calendar size={24} />} 
                     {planLoading === 'weekly' ? 'کمی صبر...' : 'برنامه هفتگی'}
                  </button>
                  <button onClick={() => handleGeneratePlan('monthly')} disabled={planLoading !== null} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm shadow-xl transition-all active:scale-95 cursor-pointer ${planLoading === 'monthly' ? 'bg-emerald-700' : 'bg-emerald-600 text-white'}`}>
                     {planLoading === 'monthly' ? <RefreshCw size={24} className="animate-spin text-white" /> : <CalendarDays size={24} />} 
                     {planLoading === 'monthly' ? 'یک لحظه...' : 'برنامه ماهانه'}
                  </button>
               </div>
               {displayPlan.length > 0 && (
                 <button onClick={() => window.print()} className="p-5 bg-white text-slate-800 rounded-[2rem] shadow-sm border border-white/50 hover:bg-emerald-50 transition-all cursor-pointer"><Printer size={32} /></button>
               )}
            </div>
            {displayPlan.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayPlan.map((plan, idx) => (
                  <MealCard key={idx} plan={plan} user={currentUser!} onUpdateUser={setCurrentUser} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                 <ChefHat size={64} className="mx-auto text-slate-200 mb-6" />
                 <p className="text-slate-400 font-black text-xl italic">برای دریافت برنامه جدید روی یکی از دکمه‌های بالا کلیک کنید...</p>
              </div>
            )}
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser!} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser!} onUpdateUser={setCurrentUser} />}
        {viewMode === 'challenges' && <Challenges user={currentUser!} onUpdateUser={setCurrentUser} onNotify={triggerStatusAlert} />}
        {viewMode === 'settings' && (
          <div className="space-y-8">
             <Preferences user={currentUser!} onUpdateUser={setCurrentUser} onLogout={handleLogout} onNotify={triggerStatusAlert} />
             {isAdmin && (
               <div className="max-w-4xl mx-auto px-4 pb-12 animate-enter">
                  <button onClick={() => setIsAdminMode(true)} className="w-full p-8 bg-slate-900 border border-slate-700 rounded-[2.5rem] shadow-2xl flex items-center justify-between group hover:bg-black transition-all cursor-pointer">
                     <div className="flex items-center gap-6">
                        <div className="p-4 bg-teal-500/10 text-teal-400 rounded-2xl group-hover:scale-110 transition-transform"><LayoutDashboard size={32} /></div>
                        <div className="text-right">
                           <h4 className="text-xl font-black text-white">ورود به پنل مدیریت ارشد</h4>
                           <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Admin Control Center</p>
                        </div>
                     </div>
                     <ArrowRight size={24} className="text-slate-600 group-hover:text-teal-400 group-hover:translate-x-[-10px] transition-all" />
                  </button>
               </div>
             )}
          </div>
        )}
      </main>

      {/* فوتر */}
      <div className="fixed bottom-6 left-6 right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[2.5rem] h-[105px] px-10 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-6 sm:gap-12 overflow-x-auto no-scrollbar">
               {viewMode === 'plan' && currentUser ? (
                 <>
                   <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-3 transition-all cursor-pointer flex-shrink-0 ${currentUser.onlyFavoritesMode ? 'text-rose-600 scale-110' : 'text-slate-400 opacity-60'}`}>
                     <Heart size={28} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                     <span className="text-xl sm:text-2xl font-black">محبوب</span>
                   </button>
                   <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-3 transition-all cursor-pointer flex-shrink-0 ${currentUser.meatlessMode ? 'text-emerald-600 scale-110' : 'text-slate-400 opacity-60'}`}>
                     <Leaf size={28} />
                     <span className="text-xl sm:text-2xl font-black">گیاهی</span>
                   </button>
                   <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-3 transition-all cursor-pointer flex-shrink-0 ${currentUser.quickMealsMode ? 'text-amber-600 scale-110' : 'text-slate-400 opacity-60'}`}>
                     <Clock size={28} />
                     <span className="text-xl sm:text-2xl font-black">سریع</span>
                   </button>
                 </>
               ) : (
                 <div className="flex items-center gap-4 text-slate-500 font-black italic whitespace-nowrap">
                    <Sparkles size={24} className="text-amber-400 animate-pulse" />
                    <span className="text-sm sm:text-lg">دستیار هوشمند نوش آماده به کار است</span>
                 </div>
               )}
            </div>
            <button onClick={() => setViewMode('settings')} className={`flex items-center gap-3 px-8 py-5 rounded-[1.75rem] transition-all cursor-pointer flex-shrink-0 ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white/40 border border-white/20 text-slate-700 hover:bg-white/60'}`}>
              <span className="text-xl sm:text-2xl font-black">تنظیمات</span>
              <Settings size={28} />
            </button>
        </footer>
      </div>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md no-print" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-slate-100 rounded-full text-slate-500 z-[210] cursor-pointer hover:bg-slate-200 transition-all"><X size={18} /></button>
              <div className="flex-grow overflow-y-auto">
                <ShoppingList user={currentUser!} weeklyPlan={displayPlan} onUpdateUser={setCurrentUser} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthGate>
      <AppContent />
    </AuthGate>
  );
};

export default App;
