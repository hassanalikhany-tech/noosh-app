
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
      await RecipeService.initialize();
      await UserService.seedAdmin();
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan && user.weeklyPlan.length > 0) setDisplayPlan(user.weeklyPlan);
        triggerTrustBanner();
      }
      setIsInitializing(false);
    };
    initApp();

    const handleUserUpdate = async () => {
      const updated = await UserService.getCurrentUser();
      if (updated) {
        setCurrentUser({ ...updated });
        if (updated.weeklyPlan) setDisplayPlan(updated.weeklyPlan);
      }
    };

    const handleExternalBannerTrigger = () => triggerTrustBanner();

    window.addEventListener('user-data-updated', handleUserUpdate);
    window.addEventListener('trigger-trust-banner', handleExternalBannerTrigger);
    
    return () => {
      window.removeEventListener('user-data-updated', handleUserUpdate);
      window.removeEventListener('trigger-trust-banner', handleExternalBannerTrigger);
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  const toPersianDigits = (num: number | string) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleGenerate = async () => {
    if (!currentUser) return;
    setLoadingType('daily');
    triggerTrustBanner();
    const { plan, updatedUser } = await generateDailyPlan(currentUser);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
    setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser) return;
    setLoadingType('weekly');
    triggerTrustBanner();
    const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
    setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleClearPlan = async () => {
    if (!currentUser) return;
    setDisplayPlan([]);
    UserService.updateProfile(currentUser.username, { weeklyPlan: [] }).then(updatedUser => setCurrentUser(updatedUser));
  };

  const handlePrintPlan = () => {
    setActivePrintSource('plan');
    setTimeout(() => {
      window.print();
      setActivePrintSource(null);
    }, 100);
  };

  const handlePrintShopping = () => {
    setActivePrintSource('shopping');
    setTimeout(() => {
      window.print();
      setActivePrintSource(null);
    }, 100);
  };

  const handleToggleFilter = (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newValue = !currentUser[filter];
    setCurrentUser({ ...currentUser, [filter]: newValue });
    UserService.updateProfile(currentUser.username, { [filter]: newValue });
  };

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
    setDisplayPlan([]);
  };

  if (isInitializing) return <div className="fixed inset-0 flex items-center justify-center bg-slate-950 z-[9999]"><RefreshCw className="animate-spin text-teal-400" size={64} /></div>;
  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  
  if (currentUser.isAdmin && isAdminMode) {
    return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  }

  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const isWeeklyView = displayPlan.length > 3;
  const isGenerating = !!loadingType;
  const activeChallenge = CHALLENGES.find(c => c.id === currentUser.activeChallengeId);
  const isUnapproved = !currentUser.isAdmin && !currentUser.isApproved;

  const natureLabels: Record<string, string> = { hot: 'گرم', cold: 'سرد', balanced: 'معتدل' };
  const activeNaturesText = currentUser.preferredNatures?.map(n => natureLabels[n]).join(' و ') || '';
  
  const blacklistedCount = currentUser.blacklistedDishIds 
    ? Array.from(new Set(currentUser.blacklistedDishIds.filter(id => typeof id === 'string' && id.trim() !== ''))).length 
    : 0;

  // --- هدر مشترک چاپ ---
  const PrintHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="print-brand flex items-center justify-between mb-8 border-b-2 border-slate-900 pb-4">
      <div className="flex items-center gap-4">
        <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-16 h-16 object-contain" />
        <div className="flex flex-col items-start" style={{ direction: 'ltr' }}>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black italic text-slate-900 uppercase">NOOSH</span>
            <span className="text-xl font-black text-teal-600 italic uppercase">APP</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Smart Kitchen Assistant</span>
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-xl font-black text-slate-800 mb-1">{title}</h1>
        <p className="text-sm font-bold text-teal-600 italic">{subtitle}</p>
      </div>
    </div>
  );

  // --- قالب چاپ برنامه غذایی ---
  const PrintPlanTemplate = () => {
    const planTypeText = displayPlan.length > 3 ? 'هفتگی' : 'روزانه';
    return (
      <div className={`print-only w-full bg-white p-4 ${activePrintSource === 'plan' ? 'active-print' : ''}`}>
        <PrintHeader title={`برنامه غذایی اختصاصی ${planTypeText}`} subtitle="نوش جان! سفره‌ای رنگین برای سلامتی شما" />
        <div className="mb-4 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
           نام کاربر: {currentUser?.fullName || currentUser?.username} | تاریخ تهیه: {new Date().toLocaleDateString('fa-IR')}
        </div>
        <table>
          <thead>
            <tr>
              <th className="w-20">روز / نوبت</th>
              <th className="w-40">نام غذا</th>
              <th className="w-32">طبع و مصلح</th>
              <th className="w-24">کالری و زمان</th>
              <th>خلاصه توضیحات و مواد کلیدی</th>
            </tr>
          </thead>
          <tbody>
            {displayPlan.map((plan, idx) => {
              const natureInfo = plan.dish.nature ? { type: plan.dish.nature, label: plan.dish.natureLabel || '' } : getDishNature(plan.dish);
              const cal = plan.dish.calories || estimateCalories(plan.dish);
              const time = plan.dish.cookTime || estimateCookTime(plan.dish);
              return (
                <tr key={idx}>
                  <td className="font-black text-center">{plan.dayName}</td>
                  <td className="font-black text-teal-700 text-lg">{plan.dish.name}</td>
                  <td>
                    <div className="font-bold">طبع: {natureInfo.label}</div>
                    <div className="text-[9px] text-slate-500">مصلح: {plan.dish.mosleh || 'نیاز ندارد'}</div>
                  </td>
                  <td className="text-center">
                    <div className="font-bold">{toPersianDigits(cal)} کالری</div>
                    <div className="text-[9px] text-slate-500">{toPersianDigits(time)} دقیقه پخت</div>
                  </td>
                  <td className="text-justify text-[10px]">
                    <p className="mb-1">{plan.dish.description}</p>
                    <div className="font-bold text-slate-700">مواد اصلی: {plan.dish.ingredients?.slice(0, 5).map(i => i.item).join('، ')} ...</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-10 pt-4 border-t border-dashed border-slate-300 text-center">
          <p className="text-[10px] font-black text-slate-500 leading-relaxed">
            این برنامه غذایی {planTypeText} با توجه به محدودیت‌های اعمال شده و سلیقه‌های شخصی شما در اپلیکیشن نوش اپ تهیه شده است.
            <br/>
            <span className="text-slate-400 mt-2 block">www.nooshapp.ir | دستیار هوشمند آشپزی شما</span>
          </p>
        </div>
      </div>
    );
  };

  // --- قالب چاپ سبد خرید ---
  const PrintShoppingTemplate = () => {
    const activeItems = (currentUser?.customShoppingList || []).filter(i => !i.checked);
    return (
      <div className={`print-only w-full bg-white p-4 ${activePrintSource === 'shopping' ? 'active-print' : ''}`}>
        <PrintHeader title="لیست خرید هوشمند" subtitle="ملزومات مورد نیاز برای آشپزخانه شما" />
        <div className="mb-4 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
           نام کاربر: {currentUser?.fullName || currentUser?.username} | تعداد اقلام: {toPersianDigits(activeItems.length)} | تاریخ: {new Date().toLocaleDateString('fa-IR')}
        </div>
        <table>
          <thead>
            <tr>
              <th className="w-12 text-center">ردیف</th>
              <th>نام کالا / مواد اولیه</th>
              <th className="w-32 text-center">مقدار</th>
              <th className="w-32 text-center">واحد</th>
              <th>مربوط به / یادداشت</th>
            </tr>
          </thead>
          <tbody>
            {activeItems.length > 0 ? activeItems.map((item, idx) => (
              <tr key={idx}>
                <td className="text-center font-bold">{toPersianDigits(idx + 1)}</td>
                <td className="font-black text-slate-800 text-base">{item.name}</td>
                <td className="text-center font-bold text-teal-700">{item.amount ? toPersianDigits(item.amount) : '---'}</td>
                <td className="text-center font-bold text-slate-600">{item.unit || '---'}</td>
                <td className="text-xs text-slate-400">{item.fromRecipe || 'افزودن دستی'}</td>
              </tr>
            )) : (
              <tr><td colSpan={5} className="text-center p-10 font-bold text-slate-400 italic">لیست خرید شما خالی است.</td></tr>
            )}
          </tbody>
        </table>
        <div className="mt-10 pt-4 border-t border-dashed border-slate-300 text-center">
          <p className="text-[10px] font-black text-slate-500 leading-relaxed">
             این لیست خرید با توجه به برنامه غذایی و نیازهای شخصی شما در اپلیکیشن نوش اپ تهیه شده است.
            <br/>
            <span className="text-slate-400 mt-2 block">www.nooshapp.ir | دستیار هوشمند آشپزی شما</span>
          </p>
        </div>
      </div>
    );
  };

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

      {isUnapproved && (
        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-8 px-8 text-center shadow-2xl relative z-[55] no-print border-b-4 border-amber-900/40">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="bg-white/20 p-4 rounded-[2rem] animate-bounce flex-shrink-0 shadow-inner">
              <AlertCircle size={40} className="text-white" />
            </div>
            <div className="text-right">
              <span className="text-lg md:text-xl font-black leading-tight drop-shadow-md block mb-1">
                حساب شما در انتظار تایید است.
              </span>
              <span className="text-sm md:text-base font-bold opacity-90 block">
                هم‌اکنون در «حالت پیش‌نمایش» هستید و فقط ۲۴ غذای منتخب در دسترس است.
              </span>
            </div>
          </div>
        </div>
      )}

      {(viewMode === 'plan' || viewMode === 'pantry') && (showTrustBanner || activeChallenge) && (
        <div className="fixed top-40 left-4 right-4 z-[60] pointer-events-none flex flex-col gap-2 max-w-lg mx-auto no-print">
          {showTrustBanner && (
            <div className="bg-white/95 backdrop-blur border-2 border-indigo-500 p-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-enter pointer-events-auto ring-4 ring-indigo-500/10">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg shadow-lg flex-shrink-0"><ShieldCheck size={18} /></div>
              <div className="flex-grow overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-slate-800">شخصی‌سازی‌های فعال شما:</h4>
                  <button onClick={() => setShowTrustBanner(false)} className="text-slate-300 hover:text-slate-500"><X size={12}/></button>
                </div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {currentUser.dislikedIngredients?.length > 0 && <span className="text-[8px] font-bold bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded-full border border-rose-100">{toPersianDigits(currentUser.dislikedIngredients.length)} ممنوعه</span>}
                  {currentUser.dietMode && <span className="text-[8px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full border border-emerald-100">رژیمی</span>}
                  {currentUser.preferredNatures?.length > 0 && <span className="text-[8px] font-bold bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full border border-amber-100">طبع {activeNaturesText}</span>}
                  {blacklistedCount > 0 && <span className="text-[8px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full border border-slate-200">{toPersianDigits(blacklistedCount)} حذفی</span>}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

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

            <div className="max-w-3xl mx-auto text-center px-4 no-print py-1">
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed">
                 {isUnapproved ? 'در حالت پیش‌نمایش، فقط ۲۴ غذای منتخب برای شما نمایش داده می‌شود.' : 'برنامه غذایی مطابق با سلیقه شما در پروفایل و تنظیمات سریع تهیه می‌گردد.'}
               </p>
            </div>

            {displayPlan.length === 0 && !isGenerating && (
              <div className="flex flex-col items-center justify-center py-12 text-slate-200 animate-pulse no-print">
                 <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-4 border-4 border-dashed border-slate-100">
                    <Utensils size={48} />
                 </div>
                 <p className="text-xs font-black text-slate-300">منتظر درخواست شما برای چیدن یک سفره رنگین هستیم...</p>
              </div>
            )}

            <div ref={planResultsRef} className="scroll-mt-48 pt-2">
              {displayPlan.length > 0 && (
                <div className="space-y-4 pb-12">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                       <div className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center shadow-lg"><Calendar size={14} /></div>
                       <h2 className="text-sm font-black text-slate-900">پیشنهادات منطبق با پروفایل شما</h2>
                    </div>
                    <div className="flex gap-2 no-print">
                      <button onClick={handlePrintPlan} className="px-2.5 py-1 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black border border-teal-100 active:scale-95"><Printer size={12} /> چاپ برنامه</button>
                      <button onClick={handleClearPlan} className="px-2.5 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg flex items-center gap-1.5 text-[9px] font-black border border-rose-100 active:scale-95"><Trash2 size={12} /> پاکسازی لیست</button>
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 ${isWeeklyView ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3'} gap-4`}>
                    {displayPlan.map((plan, idx) => (
                      <div key={`${plan.dish.id}-${idx}`} className="animate-enter" style={{ animationDelay: `${idx * 0.05}s` }}><MealCard plan={plan} user={currentUser} /></div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={()=>{}} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-enter h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-6 left-6 p-2 bg-gray-100 rounded-full text-gray-500 z-50 transition-colors hover:bg-gray-200 active:scale-90"><X size={20} /></button>
              <div className="flex-grow overflow-y-auto">
                <ShoppingList user={currentUser} weeklyPlan={displayPlan} onUpdateUser={setCurrentUser} onPrintInternal={handlePrintShopping} />
              </div>
           </div>
        </div>
      )}

      {/* بخش قالب‌های چاپ (در انتهای DOM برای عدم تداخل) */}
      <PrintPlanTemplate />
      <PrintShoppingTemplate />
    </div>
  );
};

export default App;
