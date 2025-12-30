
import React, { useState, useEffect, useRef } from 'react';
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, Heart, Clock, Trash2, Printer, Lock, LayoutDashboard, Calendar, Leaf, Settings2, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, PrinterCheck } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile } from './types';
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

  const toPersianDigits = (num: number) => num.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);

  const handleGenerate = async () => {
    if (!currentUser || (!currentUser.isApproved && !currentUser.isAdmin)) return;
    setLoadingType('daily');
    triggerTrustBanner();
    const { plan, updatedUser } = await generateDailyPlan(currentUser);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
    setTimeout(() => planResultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser || (!currentUser.isApproved && !currentUser.isAdmin)) return;
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

  const handlePrint = () => {
    window.print();
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
  
  // منطق نمایش پنل مدیریت
  if (currentUser.isAdmin && isAdminMode) {
    return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  }

  if (!UserService.isSubscriptionValid(currentUser)) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const isWeeklyView = displayPlan.length > 3;
  const isGenerating = !!loadingType;
  const activeChallenge = CHALLENGES.find(c => c.id === currentUser.activeChallengeId);

  const natureLabels: Record<string, string> = { hot: 'گرم', cold: 'سرد', balanced: 'معتدل' };
  const activeNaturesText = currentUser.preferredNatures?.map(n => natureLabels[n]).join(' و ') || '';
  
  const blacklistedCount = currentUser.blacklistedDishIds 
    ? Array.from(new Set(currentUser.blacklistedDishIds.filter(id => typeof id === 'string' && id.trim() !== ''))).length 
    : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-right dir-rtl">
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

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10 pb-24">
        {/* هدر مخصوص چاپ */}
        <div className="print-header">
           <h1 className="text-3xl font-black">برنامه غذایی اختصاصی نوش‌اپ</h1>
           <p className="text-sm font-bold">تنظیم شده برای: {currentUser.fullName || currentUser.username}</p>
        </div>

        {(viewMode === 'plan' || viewMode === 'pantry') && (
           <div className="max-w-5xl mx-auto space-y-4 mb-8 h-auto min-h-[60px] no-print">
              {showTrustBanner && (
                <div className="bg-white border-2 border-indigo-100 p-5 rounded-[2.5rem] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-enter">
                  <div className="flex items-center gap-4 w-full">
                      <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg flex-shrink-0"><ShieldCheck size={24} /></div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-slate-800">نوش‌اپ تمام شخصی‌سازی‌های شما را لحاظ کرده است:</h4>
                          <button onClick={() => setShowTrustBanner(false)} className="text-slate-300 hover:text-slate-500"><X size={16}/></button>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
                            {currentUser.dislikedIngredients?.length > 0 && (
                              <span className="text-[10px] font-bold bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-100 flex items-center gap-1">
                                <AlertCircle size={10}/> {toPersianDigits(currentUser.dislikedIngredients.length)} مورد ممنوعه
                              </span>
                            )}
                            {currentUser.dietMode && (
                              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                                <Leaf size={10}/> غذاهای زیر ۵۰۰ کالری
                              </span>
                            )}
                            {currentUser.preferredNatures?.length > 0 && (
                              <span className="text-[10px] font-bold bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100 flex items-center gap-1">
                                <Sparkles size={10}/> طبع {activeNaturesText}
                              </span>
                            )}
                            {blacklistedCount > 0 && (
                              <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-full border border-slate-100 flex items-center gap-1">
                                <X size={10}/> {toPersianDigits(blacklistedCount)} غذا که دوست ندارید
                              </span>
                            )}
                        </div>
                      </div>
                  </div>
                </div>
              )}

              {activeChallenge && (
                <div className={`${activeChallenge.color} bg-opacity-10 border-2 ${activeChallenge.color.replace('bg-', 'border-')} border-dashed p-4 rounded-3xl flex items-center justify-between gap-4 animate-enter`}>
                  <div className="flex items-center gap-4">
                      <div className={`${activeChallenge.color} p-3 rounded-2xl text-white shadow-lg`}><activeChallenge.icon size={24} /></div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm">چالش فعال: {activeChallenge.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500">{activeChallenge.description}</p>
                      </div>
                  </div>
                </div>
              )}
           </div>
        )}

        {viewMode === 'plan' && (
          <div className="space-y-12 animate-enter">
            <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden no-print">
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><Settings2 size={24} /></div>
                  <h2 className="text-xl font-black text-slate-800">تنظیمات سریع برنامه</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => handleToggleFilter('onlyFavoritesMode')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-50 border-rose-500 text-rose-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><Heart size={24} /><span className="font-black text-sm">غذاهای محبوب</span></button>
                  <button onClick={() => handleToggleFilter('quickMealsMode')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all ${currentUser.quickMealsMode ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><Clock size={24} /><span className="font-black text-sm">غذاهای سریع</span></button>
                  <button disabled={currentUser.activeChallengeId === 'vegan-week'} onClick={() => handleToggleFilter('meatlessMode')} className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all ${currentUser.meatlessMode || currentUser.activeChallengeId === 'vegan-week' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'}`}><Leaf size={24} /><span className="font-black text-sm">بدون گوشت</span></button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto no-print">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-xl group relative overflow-hidden">
                <div className="w-16 h-16 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-100 relative z-10"><Calendar size={32} /></div>
                <h2 className="text-2xl font-black text-slate-800 mb-3 relative z-10">برنامه غذایی هفتگی</h2>
                <button onClick={handleGenerateWeekly} disabled={isGenerating} className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">{loadingType === 'weekly' ? <RefreshCw size={24} className="animate-spin" /> : <span>ساخت برنامه ۷ روزه</span>}</button>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:shadow-xl group relative overflow-hidden">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-100 relative z-10"><RefreshCw size={32} /></div>
                <h2 className="text-2xl font-black text-slate-800 mb-3 relative z-10">برنامه غذایی روزانه</h2>
                <button onClick={handleGenerate} disabled={isGenerating} className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">{loadingType === 'daily' ? <RefreshCw size={24} className="animate-spin" /> : <span>پیشنهاد غذای امروز</span>}</button>
              </div>
            </div>

            <div ref={planResultsRef} className="scroll-mt-32">
              {displayPlan.length > 0 && (
                <div className="space-y-8 pb-12">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg"><Calendar size={20} /></div>
                       <h2 className="text-xl font-black text-slate-900">پیشنهادات منطبق با پروفایل شما</h2>
                    </div>
                    <div className="flex gap-3 no-print">
                      <button onClick={handlePrint} className="px-4 py-2 bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-xl flex items-center gap-2 text-xs font-black transition-all border border-teal-100 active:scale-95"><Printer size={16} /> چاپ برنامه</button>
                      <button onClick={handleClearPlan} className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl flex items-center gap-2 text-xs font-black transition-all border border-rose-100 active:scale-95"><Trash2 size={16} /> پاکسازی لیست</button>
                    </div>
                  </div>
                  <div className={`grid grid-cols-1 ${isWeeklyView ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3'} gap-8`}>
                    {displayPlan.map((plan, idx) => (
                      <div key={`${plan.dish.id}-${idx}`} className="animate-enter meal-card-print" style={{ animationDelay: `${idx * 0.05}s` }}><MealCard plan={plan} user={currentUser} /></div>
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
                <ShoppingList user={currentUser} weeklyPlan={displayPlan} onUpdateUser={setCurrentUser} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;