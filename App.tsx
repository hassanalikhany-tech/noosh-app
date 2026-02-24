
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Calendar, Leaf, Sparkles, Utensils, ShieldCheck, ArrowRight, CloudDownload, UserX, Info, CheckCircle2, Wand2, Loader2, ScanFace, Printer, Share2, MessageCircle, Smartphone, Database, ShieldAlert, FilterX, Check, AlertTriangle, Shield, LayoutDashboard, Bell, Zap, Square, CheckSquare } from 'lucide-react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import AdminDashboard from './components/admin/AdminDashboard';
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
import { EconomicService } from './services/economicService';
import { NotificationService } from './services/notificationService';
import { DayPlan, UserProfile, CATEGORY_LABELS, DishCategory, Notification } from './types';
import { generateDailyPlan, generateWeeklyPlan, generateMonthlyPlan, generateSingleReplacement } from './utils/planner';
import { CHALLENGES } from './data/challenges';
import metadata from './metadata.json';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

const ADMIN_MOBILE = '09143013288';

interface FilterNotif {
  show: boolean;
  message: string;
  active: boolean;
  icon: any;
  color: string;
  exiting: boolean;
  filterKey: string; 
}

const AppContent: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [displayPlan, setDisplayPlan] = useState<DayPlan[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [appVersion, setAppVersion] = useState(metadata.name.split(' ').pop() || "V16.2");
  const [planLoading, setPlanLoading] = useState<'daily' | 'weekly' | 'monthly' | null>(null);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);
  
  const [filterNotif, setFilterNotif] = useState<FilterNotif>({ 
    show: false, message: '', active: false, icon: Info, color: 'teal', exiting: false, filterKey: ''
  });

  const checkUnreadNotifications = async (user: UserProfile) => {
    try {
      const notifs = await NotificationService.getUserNotifications(
        user.uid, 
        user.role || 'user', 
        user.subscriptionExpiry > Date.now()
      );
      const readIds = user.readNotificationIds || [];
      const deletedIds = user.deletedNotificationIds || [];
      const unread = notifs.filter(n => !readIds.includes(n.id) && !deletedIds.includes(n.id)).length;
      setUnreadNotifCount(unread);
    } catch (e) {
      console.error("Failed to fetch unread count");
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        await RecipeService.initialize();
        const user = await UserService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          if (user.weeklyPlan) {
            const enrichedPlan = user.weeklyPlan.map(p => ({
              ...p,
              dish: EconomicService.enrichDishWithEconomicData(p.dish, user)
            }));
            setDisplayPlan(enrichedPlan);
          }
          await checkUnreadNotifications(user);
          
          // Update last active immediately
          UserService.updateProfile(user.username, { lastActiveAt: Date.now() });
        }
        if (RecipeService.getLocalCount() === 0) await RecipeService.syncFromCloud();
      } catch (err) { console.error(err); }
      finally { setIsInitializing(false); }
    };
    initApp();

    const handleUserUpdate = async () => {
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan) {
          const enrichedPlan = user.weeklyPlan.map(p => ({
            ...p,
            dish: EconomicService.enrichDishWithEconomicData(p.dish, user)
          }));
          setDisplayPlan(enrichedPlan);
        }
        await checkUnreadNotifications(user);
      }
    };

    window.addEventListener('user-data-updated', handleUserUpdate);

    // Periodically update last active
    const interval = setInterval(() => {
      const mobile = localStorage.getItem('noosh_auth_mobile');
      if (mobile) {
        UserService.updateProfile('', { lastActiveAt: Date.now() }).catch(() => {});
      }
    }, 1000 * 60 * 3); // Every 3 minutes

    return () => {
      window.removeEventListener('user-data-updated', handleUserUpdate);
      clearInterval(interval);
    };
  }, []);

  const closeNotif = async () => {
    if (dontShowAgain && filterNotif.filterKey && currentUser) {
      await UserService.hideGuidance(currentUser.uid, filterNotif.filterKey);
    }
    setFilterNotif(prev => ({ ...prev, exiting: true }));
    setTimeout(() => setFilterNotif(prev => ({ ...prev, show: false, exiting: false })), 800);
    setDontShowAgain(false);
  };

  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    
    const isHidden = currentUser.hiddenGuidanceKeys?.includes(filter);
    
    if (!isHidden) {
      let msg = "";
      let icon = Info;
      let color = "teal";
      
      if (filter === 'meatlessMode') {
        msg = newVal ? "رژیم گیاه‌خواری فعال شد. غذاهای گوشتی از پیشنهادات حذف می‌شوند." : "رژیم گیاه‌خواری غیرفعال شد. پیشنهادات به حالت عادی بازگشت.";
        icon = Leaf; color = "emerald";
      } else if (filter === 'onlyFavoritesMode') {
        msg = newVal ? "حالت محبوب‌ها فعال شد. فقط غذاهای مورد علاقه شما پیشنهاد می‌شوند." : "حالت محبوب‌ها غیرفعال شد. تمام غذاها نمایش داده می‌شوند.";
        icon = Heart; color = "rose";
      } else {
        msg = newVal ? "حالت غذای سریع فعال شد. غذاهای زیر ۴۵ دقیقه در اولویت هستند." : "حالت غذای سریع غیرفعال شد.";
        icon = Zap; color = "amber";
      }

      setFilterNotif({ show: true, message: msg, active: newVal, icon, color, exiting: false, filterKey: filter });
    }

    const updatedUser = await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    setCurrentUser(updatedUser);
  };

  const handleChallengeNotify = (title: string, message: string, colorClass: string, icon: any) => {
    if (!currentUser) return;
    const isHidden = currentUser.hiddenGuidanceKeys?.includes('challenge');
    if (isHidden) return;

    setFilterNotif({
      show: true,
      message: `${title}: ${message}`,
      active: true,
      icon: icon,
      color: colorClass.includes('emerald') ? 'emerald' : colorClass.includes('rose') ? 'rose' : colorClass.includes('blue') ? 'blue' : colorClass.includes('green') ? 'emerald' : 'purple',
      exiting: false,
      filterKey: 'challenge'
    });
  };

  const handleGeneratePlan = async (type: 'daily' | 'weekly' | 'monthly') => {
    if (!currentUser) return;

    const isHidden = currentUser.hiddenGuidanceKeys?.includes(`plan_${type}`);
    if (!isHidden) {
      let msg = "";
      let icon = Info;
      if (type === 'daily') {
        msg = "برنامه امروز بر اساس ذائقه و موجودی فعلی شما تنظیم می‌شود.";
        icon = Utensils;
      } else if (type === 'weekly') {
        msg = "برنامه هفتگی شامل ۷ پخت متنوع برای کل هفته شماست.";
        icon = Calendar;
      } else {
        msg = "برنامه ماهانه یک لیست کامل ۳۰ روزه برای مدیریت بلندمدت است.";
        icon = CalendarDays;
      }
      setFilterNotif({ show: true, message: msg, active: true, icon, color: 'indigo', exiting: false, filterKey: `plan_${type}` });
    }

    setPlanLoading(type);
    try {
      let result;
      if (type === 'daily') result = await generateDailyPlan(currentUser);
      else if (type === 'weekly') result = await generateWeeklyPlan(currentUser);
      else result = await generateMonthlyPlan(currentUser);
      setDisplayPlan(result.plan);
      setCurrentUser(result.updatedUser);
    } catch (err: any) {
      alert(err.message || 'خطا در تولید برنامه');
    } finally { setPlanLoading(null); }
  };

  const handleRefreshSingleMeal = async (index: number) => {
      if (!currentUser) return;
      try {
          const currentDishIds = displayPlan.map(p => p.dish.id);
          const newDish = await generateSingleReplacement(currentUser, currentDishIds);
          
          const newPlan = [...displayPlan];
          newPlan[index] = { ...newPlan[index], dish: newDish };
          
          setDisplayPlan(newPlan);
          const updatedUser = await UserService.updateProfile(currentUser.username, { weeklyPlan: newPlan });
          setCurrentUser(updatedUser);
      } catch (err: any) {
          alert(err.message);
      }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try { await UserService.logout(); setCurrentUser(null); }
    catch (error) { console.error(error); }
    finally { setIsLoggingOut(false); }
  };

  const toPersian = (num: number | string) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]);

  const footerMessage = useMemo(() => {
    if (planLoading) return "در حال تنظیم هوشمند برنامه غذایی شما...";
    if (RecipeService.getLocalCount() === 0) return "در حال بارگذاری بانک اطلاعات پخت‌ها...";
    if (!currentUser) return "دستیار هوشمند نوش آماده به کار است";

    const now = Date.now();
    const expiry = currentUser.subscriptionExpiry || 0;
    if (expiry < now) return "⚠️ اشتراک شما منقضی شده؛ جهت دسترسی کامل تمدید کنید.";
    
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    if (diffDays <= 5) return `⏳ فقط ${toPersian(diffDays)} روز تا پایان اشتراک ویژه باقی مانده است.`;

    if (currentUser.activeChallengeId) {
        const challenge = CHALLENGES.find(c => c.id === currentUser.activeChallengeId);
        if (challenge) return `🏆 چالش «${challenge.title}» فعال است؛ پیشنهادات بر این اساس تنظیم شده‌اند.`;
    }

    const activeFilters = [];
    if (currentUser.meatlessMode) activeFilters.push("گیاهی");
    if (currentUser.onlyFavoritesMode) activeFilters.push("محبوب‌ها");
    if (currentUser.quickMealsMode) activeFilters.push("سریع");

    if (activeFilters.length > 0) {
        return `🔍 فیلتر فعال: ${activeFilters.join(' + ')} (در حال اعمال روی پیشنهادات)`;
    }

    return "دستیار هوشمند نوش آماده به کار است";
  }, [planLoading, RecipeService.getLocalCount(), currentUser]);

  const persianDate = useMemo(() => {
    return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date());
  }, []);

  const planRowsPerPage = 13;
  const shopRowsPerPage = 20;

  const chunkedPlan = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < displayPlan.length; i += planRowsPerPage) {
      chunks.push(displayPlan.slice(i, i + planRowsPerPage));
    }
    return chunks;
  }, [displayPlan]);

  const shoppingItemsToPrint = useMemo(() => {
    return currentUser?.customShoppingList?.filter(i => !i.checked) || [];
  }, [currentUser?.customShoppingList]);

  const chunkedShoppingList = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < shoppingItemsToPrint.length; i += shopRowsPerPage) {
      chunks.push(shoppingItemsToPrint.slice(i, i + shopRowsPerPage));
    }
    return chunks;
  }, [shoppingItemsToPrint]);

  const activeShoppingCount = useMemo(() => {
    return currentUser?.customShoppingList?.filter(i => !i.checked).length || 0;
  }, [currentUser?.customShoppingList]);

  if (isInitializing || !currentUser) return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center bg-slate-950 text-white dir-rtl overflow-hidden">
      <Loader2 className="w-16 h-16 text-teal-500 animate-spin mb-4" />
      <p className="text-sm font-black tracking-widest animate-pulse">فراخوانی دستیار هوشمند نوش...</p>
    </div>
  );

  const isAdmin = currentUser.role === 'admin' || currentUser.uid === ADMIN_MOBILE;
  if (isAdminMode && isAdmin) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;

  const navItems = [
    { id: 'plan', label: 'برنامه', icon: CalendarDays },
    { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
    { id: 'search', label: 'جستجو', icon: Search },
    { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
  ];

  const FilterIcon = filterNotif.icon;

  return (
    <div className="h-[100dvh] w-full bg-[#f8fafc] font-sans text-right dir-rtl flex flex-col relative overflow-hidden select-none">
      
      {filterNotif.show && (
        <>
          <div className="fixed inset-0 z-[4999] bg-slate-900/60 backdrop-blur-md animate-enter"></div>
          <div className={`fixed top-1/2 left-1/2 z-[5000] w-[90%] max-w-xl pointer-events-auto ${filterNotif.exiting ? 'animate-filter-out' : 'animate-filter-in'}`}>
             <div className="bg-white/95 backdrop-blur-[40px] border border-white p-8 sm:p-12 rounded-[3rem] sm:rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.3)] flex flex-col items-center text-center gap-6 sm:gap-8">
                <div className={`p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-${filterNotif.color === 'purple' ? 'indigo' : filterNotif.color}-500 text-white shadow-2xl`}>
                   <FilterIcon size={64} className="sm:w-20 sm:h-20" strokeWidth={2.5} />
                </div>
                <div className="space-y-3">
                   <h3 className="text-2xl sm:text-3xl font-black text-slate-900">تنظیمات هوشمند نوش</h3>
                   <p className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed px-4">{filterNotif.message}</p>
                </div>
                
                <div className="w-full space-y-5 pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => setDontShowAgain(!dontShowAgain)}
                    className="flex items-center justify-center gap-3 w-full group cursor-pointer transition-all"
                  >
                     <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${dontShowAgain ? 'bg-slate-900 border-slate-900 shadow-md' : 'border-slate-200 group-hover:border-slate-400'}`}>
                        {dontShowAgain && <Check size={20} className="text-white" strokeWidth={4} />}
                     </div>
                     <span className="text-base sm:text-lg font-black text-slate-600">دیگر نمایش نده</span>
                  </button>

                  <button 
                    onClick={closeNotif}
                    className="w-full py-5 bg-slate-900 hover:bg-black text-white rounded-[1.75rem] font-black text-lg sm:text-xl shadow-xl transition-all active:scale-95"
                  >
                     متوجه شدم
                  </button>
                </div>
             </div>
          </div>
        </>
      )}

      <div className="print-only">
        {!isShoppingListOpen && chunkedPlan.map((chunk, pageIdx) => (
          <div key={`plan-page-${pageIdx}`} className="print-page-container">
             <div className="print-header flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="https://i.ibb.co/gMDKtj4p/3.png" className="w-16 h-16 object-contain" alt="Logo" />
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-slate-900">برنامه پیشنهادی نوش</h1>
                    <p className="text-teal-600 font-bold text-xs">همراه سلامتی و آسایش شما</p>
                  </div>
                </div>
                <div className="text-left font-bold text-slate-600 text-xs leading-6">
                  <div>تاریخ گزارش: {persianDate}</div>
                  <div>صفحه: {toPersian(pageIdx + 1)} از {toPersian(chunkedPlan.length)}</div>
                </div>
             </div>
             <table className="print-table">
                <thead>
                   <tr>
                      <th className="w-12 text-center">ردیف</th>
                      <th className="w-32">وعده / روز</th>
                      <th>نام پخت پیشنهادی</th>
                      <th className="w-32">نوع غذا</th>
                   </tr>
                </thead>
                <tbody>
                   {chunk.map((plan, idx) => (
                      <tr key={idx}>
                         <td className="text-center font-mono">{toPersian(pageIdx * planRowsPerPage + idx + 1)}</td>
                         <td className="font-bold">{plan.dayName}</td>
                         <td className="font-black text-slate-800">{plan.dish.name}</td>
                         <td className="text-slate-500">{CATEGORY_LABELS[plan.dish.category]}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="print-footer">🌐 www.nooshapp.ir | اپلیکیشن تخصصی هوشمند برنامه‌ریزی غذایی نوش</div>
          </div>
        ))}

        {isShoppingListOpen && chunkedShoppingList.map((chunk, pageIdx) => (
          <div key={`shop-page-${pageIdx}`} className="print-page-container">
             <div className="print-header flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img src="https://i.ibb.co/gMDKtj4p/3.png" className="w-16 h-16 object-contain" alt="Logo" />
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-slate-900">لیست خرید نوش</h1>
                    <p className="text-teal-600 font-bold text-xs">مواد اولیه مورد نیاز برای پخت و پز</p>
                  </div>
                </div>
                <div className="text-left font-bold text-slate-600 text-xs leading-6">
                  <div>تاریخ گزارش: {persianDate}</div>
                  <div>صفحه: {toPersian(pageIdx + 1)} از {toPersian(chunkedShoppingList.length)}</div>
                </div>
             </div>
             <table className="print-table">
                <thead>
                   <tr>
                      <th className="w-12 text-center">ردیف</th>
                      <th>نام کالا / مواد اولیه</th>
                      <th className="w-32 text-center">مقدار</th>
                      <th className="w-32 text-center">واحد</th>
                      <th className="w-48">بابت دستور پخت</th>
                   </tr>
                </thead>
                <tbody>
                   {chunk.map((item, idx) => (
                      <tr key={item.id}>
                         <td className="text-center font-mono">{toPersian(pageIdx * shopRowsPerPage + idx + 1)}</td>
                         <td className="font-black text-slate-800">{item.name}</td>
                         <td className="text-center font-bold text-teal-600">{toPersian(item.amount || '---')}</td>
                         <td className="text-center text-slate-500">{item.unit || '---'}</td>
                         <td className="text-[11px] text-slate-400">{item.fromRecipe || 'خرید متفرقه'}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="print-footer">🌐 www.nooshapp.ir | لیست خرید هوشمند اپلیکیشن نوش</div>
          </div>
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-[1000] no-print h-16 sm:h-20 lg:h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center px-4 sm:px-12 shadow-sm">
        <div className="flex items-center justify-between w-full">
          <div 
            onClick={() => setViewMode('plan')} 
            className="flex flex-col items-center cursor-pointer logo-animate transition-all"
          >
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-8 h-8 sm:w-14 sm:h-14 object-contain" />
            <span className="text-[6px] sm:text-[10px] font-black text-emerald-600 tracking-[0.2em] uppercase mt-1">{appVersion}</span>
          </div>

          <div className="hidden lg:flex flex-col items-center" style={{ direction: 'ltr' }}>
            <div className="flex items-baseline gap-1">
               <span className="text-lg sm:text-3xl font-black italic text-slate-900 leading-none">NOOSH</span>
               <span className="text-xs sm:text-xl font-black text-teal-600 leading-none">APP</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            {navItems.map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`px-5 py-2.5 rounded-full flex items-center gap-2 transition-all ${viewMode === nav.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-white/50'}`}>
                <nav.icon size={18} />
                <span className="text-sm font-black">{nav.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
             <button onClick={() => { setIsNotificationCenterOpen(true); setUnreadNotifCount(0); }} className="p-2 sm:p-3.5 bg-white border border-slate-100 text-indigo-600 rounded-xl sm:rounded-2xl shadow-sm relative">
                <Bell size={18} className="sm:w-6 sm:h-6" />
                {unreadNotifCount > 0 && (
                   <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-rose-600 text-white text-[8px] sm:text-[10px] font-black w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                      {toPersian(unreadNotifCount)}
                   </div>
                )}
             </button>
             {isAdmin && <button onClick={() => setIsAdminMode(true)} className="p-2 sm:p-3.5 bg-slate-900 text-teal-400 rounded-xl sm:rounded-2xl shadow-lg border border-white/10"><ShieldAlert size={18} className="sm:w-6 sm:h-6" /></button>}
             <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2 sm:p-3.5 bg-emerald-600 text-white rounded-xl sm:rounded-2xl shadow-lg">
              <ShoppingCart size={18} className="sm:w-6 sm:h-6" />
              {activeShoppingCount > 0 && (
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-rose-600 text-white text-[8px] sm:text-[10px] font-black w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                  {toPersian(activeShoppingCount)}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      <NotificationCenter isOpen={isNotificationCenterOpen} onClose={() => { setIsNotificationCenterOpen(false); checkUnreadNotifications(currentUser!); }} user={currentUser!} />

      <main className="flex-grow pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-0 no-print overflow-hidden flex flex-col bg-[#f8fafc]">
        {viewMode === 'plan' && (
          <div className="flex flex-col h-full animate-enter">
            <div className="sticky top-0 z-[900] bg-white/40 backdrop-blur-2xl px-4 py-3 sm:py-6 sm:px-10 border-b border-white/20">
                <div className="backdrop-blur-3xl bg-white/50 border border-white/60 shadow-xl shadow-slate-200/50 rounded-[1.75rem] sm:rounded-[2.5rem] p-3 sm:p-6 space-y-3 sm:space-y-4 max-w-7xl mx-auto">
                    <div className="flex justify-center gap-8 sm:gap-16 border-b border-white/40 pb-2 sm:pb-4">
                       <button onClick={() => handleToggleFilter('meatlessMode')} className={`p-1.5 sm:p-2 transition-all active:scale-125 ${currentUser.meatlessMode ? 'text-emerald-600' : 'text-slate-300'}`} title="رژیم گیاهی">
                         <Leaf size={24} className="sm:w-8 sm:h-8" fill={currentUser.meatlessMode ? "currentColor" : "none"} />
                       </button>
                       <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`p-1.5 sm:p-2 transition-all active:scale-125 ${currentUser.onlyFavoritesMode ? 'text-rose-600' : 'text-slate-300'}`} title="فقط محبوب‌ها">
                         <Heart size={24} className="sm:w-8 sm:h-8" fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                       </button>
                       <button onClick={() => handleToggleFilter('quickMealsMode')} className={`p-1.5 sm:p-2 transition-all active:scale-125 ${currentUser.quickMealsMode ? 'text-amber-600' : 'text-slate-300'}`} title="غذای سریع">
                         <Zap size={24} className="sm:w-8 sm:h-8" fill={currentUser.quickMealsMode ? "currentColor" : "none"} />
                       </button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                       <div className="flex-grow grid grid-cols-4 gap-2 sm:gap-3 w-full">
                          <button onClick={() => handleGeneratePlan('daily')} disabled={planLoading !== null} className={`flex items-center justify-center gap-1.5 sm:gap-3 py-2.5 sm:py-4 rounded-xl sm:rounded-[1.75rem] font-black text-[10px] sm:text-sm transition-all shadow-sm active:scale-95 ${planLoading === 'daily' ? 'bg-teal-50 text-teal-600' : 'bg-white/80 text-slate-800 hover:bg-teal-50'}`}>
                             {planLoading === 'daily' ? <Loader2 size={14} className="animate-spin" /> : <Utensils size={14} className="sm:w-[18px]" />} <span>امروز</span>
                          </button>
                          <button onClick={() => handleGeneratePlan('weekly')} disabled={planLoading !== null} className={`flex items-center justify-center gap-1.5 sm:gap-3 py-2.5 sm:py-4 rounded-xl sm:rounded-[1.75rem] font-black text-[10px] sm:text-sm shadow-md transition-all active:scale-95 ${planLoading === 'weekly' ? 'bg-slate-800' : 'bg-slate-900 text-white'}`}>
                             {planLoading === 'weekly' ? <Loader2 size={14} className="animate-spin" /> : <Calendar size={14} className="sm:w-[18px]" />} <span>هفتگی</span>
                          </button>
                          <button onClick={() => handleGeneratePlan('monthly')} disabled={planLoading !== null} className={`flex items-center justify-center gap-1.5 sm:gap-3 py-2.5 sm:py-4 rounded-xl sm:rounded-[1.75rem] font-black text-[10px] sm:text-sm shadow-md transition-all active:scale-95 ${planLoading === 'monthly' ? 'bg-emerald-700' : 'bg-emerald-600 text-white'}`}>
                             {planLoading === 'monthly' ? <Loader2 size={14} className="animate-spin" /> : <CalendarDays size={14} className="sm:w-[18px]" />} <span>ماهانه</span>
                          </button>
                          <button onClick={() => window.print()} className="flex items-center justify-center gap-1.5 sm:gap-3 py-2.5 sm:py-4 rounded-xl sm:rounded-[1.75rem] font-black text-[10px] sm:text-sm bg-white/80 text-slate-500 hover:text-indigo-600 transition-all shadow-sm active:scale-95 border border-white/60">
                             <Printer size={14} className="sm:w-[18px]" /> <span>چاپ</span>
                          </button>
                       </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 sm:px-10 pb-20 no-scrollbar">
                <div className="h-10 sm:h-12 w-full"></div>
                <div className="max-w-7xl mx-auto py-4 sm:py-6">
                    {displayPlan.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {displayPlan.map((plan, idx) => (
                           <MealCard 
                            key={idx} 
                            plan={plan} 
                            user={currentUser!} 
                            onUpdateUser={setCurrentUser} 
                            onRefresh={() => handleRefreshSingleMeal(idx)}
                           />
                        ))}
                      </div>
                    ) : (
                      <div className="py-24 sm:py-32 text-center">
                         <ChefHat size={60} className="mx-auto text-slate-200 mb-6 animate-pulse sm:w-20" />
                         <p className="text-slate-400 font-black text-base sm:text-xl italic">یکی از دکمه‌های بالا را برای برنامه انتخاب کنید.</p>
                      </div>
                    )}
                </div>
            </div>
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser!} onUpdateUser={setCurrentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser!} onUpdateUser={setCurrentUser} externalSearchTerm={globalSearchTerm} />}
        {viewMode === 'challenges' && <Challenges user={currentUser!} onUpdateUser={setCurrentUser} onNotify={handleChallengeNotify} />}
        {viewMode === 'settings' && <Preferences user={currentUser!} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-[1000] no-print h-16 sm:h-auto">
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-around h-16 px-2 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)]">
           {navItems.map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all ${viewMode === nav.id ? 'text-teal-600' : 'text-slate-400'}`}>
                 <div className={`p-1.5 rounded-lg transition-all ${viewMode === nav.id ? 'bg-teal-50' : ''}`}><nav.icon size={20} strokeWidth={viewMode === nav.id ? 2.5 : 2} /></div>
                 <span className="text-[9px] font-black">{nav.label}</span>
              </button>
           ))}
           <button onClick={() => setViewMode('settings')} className={`flex flex-col items-center justify-center gap-1 flex-1 ${viewMode === 'settings' ? 'text-slate-900' : 'text-slate-400'}`}>
              <div className={`p-1.5 rounded-lg ${viewMode === 'settings' ? 'bg-slate-100' : ''}`}><Settings size={20} strokeWidth={viewMode === 'settings' ? 2.5 : 2} /></div>
              <span className="text-[9px] font-black">تنظیمات</span>
           </button>
        </div>

        <footer className="hidden md:flex backdrop-blur-3xl bg-white/50 border border-white/60 rounded-[2.5rem] h-[90px] px-12 items-center justify-between shadow-2xl mx-12 mb-10">
            <button onClick={() => setViewMode('settings')} className={`flex items-center gap-3 px-8 py-4 rounded-[1.75rem] transition-all flex-shrink-0 ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white/80 border border-slate-200 text-slate-700 hover:bg-white'}`}>
                <Settings size={24} />
                <span className="text-lg font-black">تنظیمات</span>
            </button>
            <div className="flex-grow flex items-center justify-center gap-4 text-slate-500 font-black italic">
               <Sparkles size={24} className="text-amber-400 animate-pulse" />
               <span className="text-lg">{footerMessage}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center">
                 <ChefHat size={32} />
              </div>
            </div>
        </footer>
      </div>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-0 sm:p-8 bg-black/60 backdrop-blur-sm no-print" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white sm:rounded-[3rem] shadow-2xl overflow-hidden animate-enter h-full sm:h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-8 left-8 p-3 bg-slate-100 rounded-full text-slate-500 z-[210] hover:bg-slate-200 transition-all shadow-sm"><X size={24} /></button>
              <div className="flex-grow overflow-y-auto">
                <ShoppingList 
                  user={currentUser!} 
                  weeklyPlan={displayPlan} 
                  onUpdateUser={setCurrentUser} 
                  onPrintInternal={() => window.print()}
                />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => <AuthGate><AppContent /></AuthGate>;
export default App;
