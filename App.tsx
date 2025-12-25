import React, { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, CalendarRange, Heart, Clock, Trash2, Sparkles, ShieldCheck, Printer, Lock } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile } from './types';
import { UserService } from './services/userService';
import { RecipeService } from './services/recipeService';
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
  const [isQuickMode, setIsQuickMode] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      await RecipeService.initialize();
      await UserService.seedAdmin();
      const user = await UserService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        if (user.weeklyPlan && user.weeklyPlan.length > 0) {
          setDisplayPlan(user.weeklyPlan);
        }
        if (user.isAdmin) {
          setIsAdminMode(true);
        }
      }
      setIsInitializing(false);
    };

    initApp();

    const handleUserUpdate = async () => {
      const updated = await UserService.getCurrentUser();
      if (updated) {
        setCurrentUser({ ...updated });
        if (updated.weeklyPlan) {
          setDisplayPlan(updated.weeklyPlan);
        }
      }
    };

    window.addEventListener('user-data-updated', handleUserUpdate);
    return () => window.removeEventListener('user-data-updated', handleUserUpdate);
  }, []);

  const handleGenerate = async () => {
    if (!currentUser || (!currentUser.isApproved && !currentUser.isAdmin)) return;
    setLoadingType('daily');
    const { plan, updatedUser } = await generateDailyPlan(currentUser, isQuickMode);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
  };

  const handleGenerateWeekly = async () => {
    if (!currentUser || (!currentUser.isApproved && !currentUser.isAdmin)) return;
    setLoadingType('weekly');
    const { plan, updatedUser } = await generateWeeklyPlan(currentUser, isQuickMode);
    setDisplayPlan(plan);
    setCurrentUser(updatedUser);
    setLoadingType(null);
  };

  const handleClearPlan = async () => {
    if (!currentUser) return;
    const updatedUser = await UserService.updateProfile(currentUser.username, { weeklyPlan: [] });
    setCurrentUser(updatedUser);
    setDisplayPlan([]);
  };

  const handlePrintPlan = () => {
    window.print();
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.weeklyPlan) setDisplayPlan(user.weeklyPlan);
    if (user.isAdmin) setIsAdminMode(true);
  };

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
    setIsAdminMode(false);
    setDisplayPlan([]);
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="animate-spin text-teal-400" size={48} />
          <p className="font-black text-slate-400 text-lg">نوش در حال اتصال به مرکز داده...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return <Login onLogin={handleLogin} />;
  
  if (currentUser.isAdmin && isAdminMode) {
    return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setIsAdminMode(false)} />;
  }

  if (!UserService.isSubscriptionValid(currentUser)) {
    return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;
  }

  const isWeeklyView = displayPlan.length > 3;
  const isGenerating = !!loadingType;
  const isUserNotApproved = !currentUser.isApproved && !currentUser.isAdmin;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col text-right dir-rtl relative overflow-x-hidden">
      {/* لایه پترن لوگو */}
      <div className="bg-noosh-pattern"></div>
      
      {isUserNotApproved && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-6 pointer-events-none">
           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-md text-center border-t-8 border-amber-500 animate-enter pointer-events-auto relative z-10">
              <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-amber-100">
                <Lock size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">در انتظار تایید مدیریت</h2>
              <p className="text-slate-500 font-bold leading-relaxed mb-8">
                حساب شما با موفقیت ساخته شد، اما برای استفاده از امکانات هوشمند اپلیکیشن "نوش" باید توسط مدیریت تایید شوید.
              </p>
              <button onClick={handleLogout} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all">
                 خروج از حساب کاربری
              </button>
           </div>
        </div>
      )}

      <div className={`sticky top-0 z-40 shadow-2xl no-print ${isUserNotApproved ? 'grayscale pointer-events-none opacity-50' : ''}`}>
        <header className="bg-slate-950 text-white h-[75px] flex items-center border-b border-white/5 relative overflow-hidden">
          <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
                <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                <div className="flex flex-row items-baseline gap-1.5" style={{ direction: 'ltr' }}>
                   <span className="text-2xl font-black italic tracking-tighter text-white uppercase">NOOSH</span>
                   <span className="text-sm font-black text-teal-500 italic uppercase">APP</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2.5 bg-white/5 rounded-2xl text-teal-400 hover:bg-white/10 transition-all border border-white/10">
                <ShoppingCart size={22} />
                {currentUser.customShoppingList?.filter(i => !i.checked).length ? (
                  <span className="absolute -top-1 -left-1 bg-rose-500 text-white w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-full">
                    {currentUser.customShoppingList.filter(i => !i.checked).length}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
          <div className="container mx-auto flex p-1 gap-1">
            {[
              {id: 'plan', label: 'چی بپزم؟', icon: CalendarDays},
              {id: 'pantry', label: 'آشپز برتر', icon: ChefHat},
              {id: 'search', label: 'جستجو', icon: Search},
              {id: 'challenges', label: 'چالش', icon: Trophy},
              {id: 'settings', label: 'تنظیمات', icon: Settings}
            ].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} 
                className={`flex-1 min-w-[75px] py-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${viewMode === nav.id ? 'text-teal-700 bg-teal-50 font-black shadow-inner' : 'text-slate-400'}`}
              >
                <nav.icon size={20} />
                <span className="text-[10px] whitespace-nowrap">{nav.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main className={`container mx-auto px-4 py-8 flex-grow no-print relative z-10 ${isUserNotApproved ? 'grayscale pointer-events-none opacity-50 blur-[1px]' : ''}`}>
        {viewMode === 'plan' && (
          <div className="space-y-8 animate-enter">
            <div className="flex flex-col items-center gap-6">
              <div className="flex justify-center gap-3">
                <button onClick={() => UserService.updateProfile(currentUser.username, { onlyFavoritesMode: !currentUser.onlyFavoritesMode })} 
                  className={`px-4 py-2 rounded-xl font-black text-[10px] flex items-center gap-2 transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-500 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100'}`}>
                  <Heart size={14} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} /> فقط محبوب‌ها
                </button>
                <button onClick={() => setIsQuickMode(!isQuickMode)} 
                  className={`px-4 py-2 rounded-xl font-black text-[10px] flex items-center gap-2 transition-all ${isQuickMode ? 'bg-amber-500 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100'}`}>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> غذاهای سریع</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl">
                 <button onClick={handleGenerateWeekly} disabled={isGenerating} className="flex-1 px-8 py-5 bg-teal-600 text-white rounded-3xl font-black shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 group relative overflow-hidden">
                    {loadingType === 'weekly' ? <RefreshCw size={24} className="animate-spin" /> : <CalendarRange size={24} />} 
                    <span>برنامه ریزی کل هفته</span>
                    <Sparkles size={16} className="absolute top-2 left-2 text-teal-200" />
                 </button>
                 <button onClick={handleGenerate} disabled={isGenerating} className="flex-1 px-8 py-5 bg-white text-teal-700 border-2 border-teal-600 rounded-3xl font-black shadow-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-3 active:scale-95">
                    {loadingType === 'daily' ? <RefreshCw size={24} className="animate-spin" /> : <RefreshCw size={24} />} <span>پیشنهاد روزانه</span>
                 </button>
              </div>
            </div>

            {displayPlan.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl">
                  <h2 className="text-2xl font-black text-slate-800">
                    {isWeeklyView ? '📅 برنامه غذایی هفته شما' : '✨ پیشنهادات امروز شما'}
                  </h2>
                  <div className="flex gap-4">
                    <button onClick={handlePrintPlan} className="text-teal-600 hover:text-teal-800 flex items-center gap-1 text-xs font-black transition-colors">
                      <Printer size={16} /> چاپ برنامه
                    </button>
                    <button onClick={handleClearPlan} className="text-slate-400 hover:text-rose-500 flex items-center gap-1 text-xs font-black transition-colors">
                      <Trash2 size={14} /> پاک کردن لیست
                    </button>
                  </div>
                </div>
                
                <div className={`grid grid-cols-1 ${isWeeklyView ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'md:grid-cols-3'} gap-6`}>
                  {displayPlan.map((plan, idx) => (
                    <div key={`${plan.dish.id}-${idx}`} className="animate-enter" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <MealCard plan={plan} user={currentUser} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              !isGenerating && (
                <div className="flex flex-col items-center py-20 bg-white/80 backdrop-blur-sm rounded-[3rem] border-4 border-dashed border-slate-100 opacity-80 shadow-inner">
                   <div className="bg-teal-50 p-8 rounded-full text-teal-600 mb-6 shadow-lg shadow-teal-50">
                      <ChefHat size={64} />
                   </div>
                   <p className="text-slate-500 font-black text-xl">هنوز برنامه‌ای تنظیم نشده است.</p>
                   <p className="text-slate-400 font-bold text-sm mt-2">از دکمه‌های بالا برای دریافت پیشنهاد استفاده کنید.</p>
                </div>
              )
            )}
          </div>
        )}
        {viewMode === 'pantry' && <PantryChef user={currentUser} />}
        {viewMode === 'search' && <RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} />}
        {viewMode === 'challenges' && <Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={()=>{}} />}
        {viewMode === 'settings' && <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />}
      </main>

      {isShoppingListOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm no-print" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-enter h-[85vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full text-gray-500 z-50 transition-colors hover:bg-gray-200"><X size={20} /></button>
              <div className="h-full overflow-y-auto">
                <ShoppingList user={currentUser} weeklyPlan={displayPlan} onUpdateUser={setCurrentUser} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;