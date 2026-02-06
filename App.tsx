
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
import { CHALLENGES } from './data/challenges';

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
  const [recipeCount, setRecipeCount] = useState(0);
  const [footerSearchTerm, setFooterSearchTerm] = useState('');
  const [statusAlert, setStatusAlert] = useState<StatusAlert>({ show: false, title: '', description: '', icon: Info, color: 'emerald' });
  const planResultsRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
  };

  const triggerStatusAlert = (title: string, description: string, icon: any, color: string) => {
    setStatusAlert({ show: true, title, description, icon, color });
    setTimeout(() => {
      setStatusAlert(prev => ({ ...prev, show: false }));
    }, 15000);
  };

  const handleToggleFilter = async (filter: 'onlyFavoritesMode' | 'quickMealsMode' | 'meatlessMode') => {
    if (!currentUser) return;
    const newVal = !currentUser[filter];
    const optimisticUser = { ...currentUser, [filter]: newVal };
    setCurrentUser(optimisticUser);
    
    const meta = {
      onlyFavoritesMode: { title: 'فهرست محبوب‌ها', desc: newVal ? 'برنامه‌ریزی شما محدود به غذاهایی شد که قبلاً لایک کرده‌اید.' : 'برنامه غذایی دوباره از تمام بانک اطلاعاتی انتخاب می‌شود.', icon: Heart, color: 'rose' },
      quickMealsMode: { title: 'پخت سریع', desc: newVal ? 'فقط غذاهایی با زمان آماده‌سازی زیر ۴۵ دقیقه به شما پیشنهاد می‌شود.' : 'محدودیت زمانی برای پیشنهاد غذا برداشته شد.', icon: Clock, color: 'amber' },
      meatlessMode: { title: 'رژیم گیاهی', desc: newVal ? 'تمامی غذاهای گوشتی از لیست پیشنهادات حذف شدند.' : 'غذاهای گوشتی دوباره در برنامه شما قرار گرفتند.', icon: Leaf, color: 'emerald' }
    };
    triggerStatusAlert(meta[filter].title, meta[filter].desc, meta[filter].icon, meta[filter].color);

    try {
      await UserService.updateProfile(currentUser.username, { [filter]: newVal });
    } catch (err) {
      setCurrentUser(currentUser);
    }
  };

  const handleGenerateDaily = async () => {
    if (!currentUser) return;
    setLoadingType('daily');
    const { plan, updatedUser } = await generateDailyPlan(currentUser);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
    setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser) return;
    setLoadingType('weekly');
    const { plan, updatedUser } = await generateWeeklyPlan(currentUser);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
    setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleGenerateMonthly = async () => {
     if (!currentUser) return;
     setLoadingType('monthly');
     const { plan, updatedUser } = await generateMonthlyPlan(currentUser);
     setDisplayPlan(plan);
     setCurrentUser(updatedUser);
     setLoadingType(null);
     setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handlePrintPlan = () => {
    window.print();
  };

  // پروتکل بوت‌آپ هوشمند
  useEffect(() => {
    const bootstrap = async () => {
      // ۱. لود آنی دیتای محلی برای جلوگیری از صفحه سفید
      await RecipeService.initialize();
      setRecipeCount(RecipeService.getRawDishes().length);

      // ۲. بررسی وضعیت کاربر
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
        
        // ۳. شروع خودکار همسان‌سازی در پس‌زمینه بلافاصله پس از تایید هویت
        setIsAutoSyncing(true);
        try {
          await RecipeService.syncFromCloud(true);
        } catch (e) {
          console.log("Background sync failed, using cache.");
        }
        setIsAutoSyncing(false);
      }
      setIsInitializing(false);
    };
    
    bootstrap();

    const handleRecipesUpdate = () => {
      setRecipeCount(RecipeService.getRawDishes().length);
    };
    window.addEventListener('recipes-updated', handleRecipesUpdate);
    return () => window.removeEventListener('recipes-updated', handleRecipesUpdate);
  }, []);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white dir-rtl no-print">
        <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
        <p className="text-sm font-black animate-pulse">در حال فراخوانی دستیار هوشمند...</p>
      </div>
    );
  }

  if (!currentUser) return <Login onLogin={setCurrentUser} />;
  if (currentUser.isAdmin && isAdminMode) return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const AlertIcon = statusAlert.icon;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-right dir-rtl">
      
      {/* نشانگر وضعیت همسان‌سازی خودکار در پس‌زمینه */}
      {isAutoSyncing && (
        <div className="fixed top-28 right-6 z-[1000] bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-teal-100 shadow-xl flex items-center gap-3 animate-enter">
          <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
          <span className="text-[10px] font-black text-teal-800">بروزرسانی خودکار دیتابیس...</span>
        </div>
      )}

      {/* مودال اطلاع‌رسانی شیشه‌ای هوشمند */}
      <div className={`fixed inset-x-0 top-0 z-[2000] flex justify-center p-6 transition-all duration-700 pointer-events-none ${statusAlert.show ? 'translate-y-24 opacity-100 scale-100' : '-translate-y-full opacity-0 scale-90'}`}>
         <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-8 rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.1)] max-w-lg w-full flex items-start gap-6 relative overflow-hidden pointer-events-auto">
            <div className={`absolute top-0 right-0 w-2 h-full bg-${statusAlert.color}-500`}></div>
            <div className={`p-4 bg-${statusAlert.color}-500 text-white rounded-[1.5rem] shadow-lg`}>
               <AlertIcon size={32} />
            </div>
            <div className="flex-1">
               <h3 className={`text-xl font-black text-${statusAlert.color}-900 mb-2`}>{statusAlert.title}</h3>
               <p className="text-slate-700 text-sm font-bold leading-relaxed">{statusAlert.description}</p>
            </div>
            <button onClick={() => setStatusAlert(prev => ({ ...prev, show: false }))} className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
               <X size={18} />
            </button>
         </div>
      </div>

      {/* بخش چاپ برنامه */}
      <div className="print-only p-12 bg-white">
         <div className="flex justify-between items-center border-b-4 border-slate-900 pb-6 mb-8">
            <div className="flex items-center gap-4">
               <img src="https://i.ibb.co/gMDKtj4p/3.png" className="w-16 h-16" alt="Logo" />
               <div className="text-right">
                  <h1 className="text-3xl font-black text-slate-900">برنامه غذایی هوشمند نوش</h1>
               </div>
            </div>
         </div>
         <table className="w-full border-collapse border-2 border-slate-900 text-right">
            <thead className="bg-slate-100">
               <tr>
                  <th className="border-2 border-slate-900 p-4 font-black">روز / تاریخ</th>
                  <th className="border-2 border-slate-900 p-4 font-black">نام غذا</th>
                  <th className="border-2 border-slate-900 p-4 font-black">طبع و مزاج</th>
               </tr>
            </thead>
            <tbody>
               {displayPlan.map((p, idx) => (
                  <tr key={idx}>
                     <td className="border border-slate-900 p-4 font-bold">{p.dayName}</td>
                     <td className="border border-slate-900 p-4 font-black text-lg">{p.dish.name}</td>
                     <td className="border border-slate-900 p-4 font-bold text-center">{p.dish.natureLabel || 'معتدل'}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* هدر هوشمند */}
      <div className="fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-[100] no-print">
        <header className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[1.5rem] sm:rounded-[2.5rem] shadow-sm p-3 sm:px-8 sm:h-[110px] flex flex-col sm:flex-row items-center justify-between gap-3 transition-all">
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-9 h-9 sm:w-16 sm:h-16 object-contain" />
              <div className="flex flex-col" style={{ direction: 'ltr' }}>
                <span className="text-xl sm:text-4xl font-black italic text-slate-900 leading-none">NOOSH</span>
                <span className="text-[10px] sm:text-xs font-black text-emerald-600 uppercase">Premium</span>
              </div>
            </div>
            {currentUser.isAdmin && (
              <button onClick={() => setIsAdminMode(true)} className="mx-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black">مدیریت</button>
            )}
          </div>
          <nav className="w-full sm:flex-1 grid grid-cols-2 sm:flex sm:items-center gap-1.5 bg-white/20 backdrop-blur-3xl p-1 rounded-2xl border border-white/20 sm:mx-6">
            {[
              { id: 'plan', label: 'برنامه‌ریزی', icon: CalendarDays },
              { id: 'pantry', label: 'آشپز برتر', icon: ChefHat },
              { id: 'search', label: 'جستجو', icon: Search },
              { id: 'challenges', label: 'چالش‌ها', icon: Trophy }
            ].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} className={`px-3 py-2.5 sm:px-10 sm:py-5 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-all ${viewMode === nav.id ? 'bg-emerald-900 text-amber-400 shadow-xl' : 'text-slate-600 hover:bg-white/30'}`}>
                <nav.icon size={18} className="sm:w-7 sm:h-7" />
                <span className={`font-black ${viewMode === nav.id ? 'text-[11px] sm:text-3xl' : 'text-[11px] sm:text-3xl opacity-75'}`}>{nav.label}</span>
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

      <main className="pt-48 pb-48 px-4 container mx-auto no-print">
        {viewMode === 'plan' && (
          <div className="space-y-6 sm:space-y-12 animate-enter">
            <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-3xl border border-white/40 rounded-[3rem] p-4 shadow-2xl flex flex-col md:flex-row items-center gap-4">
               <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                  <button onClick={handleGenerateDaily} disabled={!!loadingType} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all ${loadingType === 'daily' ? 'bg-white/50 text-slate-400' : 'bg-white text-slate-800 hover:bg-emerald-50'}`}>
                     {loadingType === 'daily' ? <Loader2 className="animate-spin" size={20} /> : <Utensils size={24} />} پیشنهاد امروز
                  </button>
                  <button onClick={handleGenerateWeekly} disabled={!!loadingType} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all ${loadingType === 'weekly' ? 'bg-white/50 text-slate-400' : 'bg-slate-900 text-white shadow-xl'}`}>
                     {loadingType === 'weekly' ? <Loader2 className="animate-spin" size={20} /> : <Calendar size={24} />} برنامه هفتگی
                  </button>
                  <button onClick={handleGenerateMonthly} disabled={!!loadingType} className={`flex items-center justify-center gap-3 py-5 rounded-[2rem] font-black text-sm transition-all ${loadingType === 'monthly' ? 'bg-white/50 text-slate-400' : 'bg-emerald-600 text-white shadow-xl'}`}>
                     {loadingType === 'monthly' ? <Loader2 className="animate-spin" size={20} /> : <CalendarDays size={24} />} برنامه ماهانه
                  </button>
               </div>
               <button onClick={handlePrintPlan} className="p-5 bg-white text-slate-600 rounded-[2rem] shadow-sm hover:text-indigo-600 transition-all border border-white/50"><Printer size={32} /></button>
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
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={triggerStatusAlert} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      <div className="fixed bottom-6 left-6 right-6 z-[110] no-print">
        <footer className="backdrop-blur-3xl bg-white/30 border border-white/40 rounded-[2.5rem] h-[105px] px-8 flex items-center overflow-hidden">
          <div className="flex w-full items-center justify-between gap-1 relative z-10">
            <div className="flex items-center shrink-0">
              {viewMode === 'search' ? (
                <div className="relative w-80">
                  <input type="text" placeholder="جستجو در بین هزاران پخت..." value={footerSearchTerm} onChange={(e) => setFooterSearchTerm(e.target.value)} className="w-full pr-10 pl-3 py-3 bg-white/50 rounded-xl outline-none font-black text-sm" />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                </div>
              ) : viewMode === 'plan' ? (
                <div className="flex items-center gap-12">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`flex items-center gap-3 transition-all ${currentUser.onlyFavoritesMode ? 'text-rose-600 scale-110 drop-shadow-md' : 'text-slate-400'}`}>
                    <Heart size={28} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} />
                    <span className="text-2xl font-black">محبوب</span>
                  </button>
                  <button onClick={() => handleToggleFilter('meatlessMode')} className={`flex items-center gap-3 transition-all ${currentUser.meatlessMode ? 'text-emerald-600 scale-110 drop-shadow-md' : 'text-slate-400'}`}>
                    <Leaf size={28} />
                    <span className="text-2xl font-black">گیاهی</span>
                  </button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`flex items-center gap-3 transition-all ${currentUser.quickMealsMode ? 'text-amber-600 scale-110 drop-shadow-md' : 'text-slate-400'}`}>
                    <Clock size={28} />
                    <span className="text-2xl font-black">سریع</span>
                  </button>
                </div>
              ) : null}
            </div>
            <button onClick={() => setViewMode('settings')} className={`flex items-center gap-4 px-12 py-5 rounded-[1.75rem] transition-all ${viewMode === 'settings' ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white/40 border border-white/20 text-slate-700'}`}>
              <span className="text-2xl font-black">تنظیمات</span>
              <Settings size={32} className={viewMode === 'settings' ? 'animate-spin-slow' : ''} />
            </button>
          </div>
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
