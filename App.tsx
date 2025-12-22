
import React, { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw, ChefHat, Search, Settings, Trophy, X, ShoppingCart, CalendarRange, Heart, Clock } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile } from './types';
import { UserService } from './services/userService';
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
  const [dailyPlan, setDailyPlan] = useState<DayPlan[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [adminViewMode, setAdminViewMode] = useState<'dashboard' | 'app'>('dashboard');
  const [isQuickMode, setIsQuickMode] = useState(false);

  useEffect(() => {
    const existing = UserService.getCurrentUser();
    if (existing) {
      setCurrentUser(existing);
      if (existing.isAdmin) setAdminViewMode('dashboard');
    }

    const syncUserData = () => {
       const updated = UserService.getCurrentUser();
       if (updated) {
         setCurrentUser({ ...updated });
       }
    };

    window.addEventListener('user-data-updated', syncUserData);
    window.addEventListener('cart-updated', syncUserData);

    return () => {
      window.removeEventListener('user-data-updated', syncUserData);
      window.removeEventListener('cart-updated', syncUserData);
    };
  }, []);

  const handleGenerate = () => {
    if (!currentUser) return;
    setIsGenerating(true);
    setTimeout(() => {
      const { plan, updatedUser } = generateDailyPlan(currentUser, isQuickMode);
      setDailyPlan(plan);
      setCurrentUser({ ...updatedUser }); 
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleGenerateWeekly = () => {
    if (!currentUser) return;
    setIsGenerating(true);
    setTimeout(() => {
      const { plan, updatedUser } = generateWeeklyPlan(currentUser, isQuickMode);
      setDailyPlan(plan);
      setCurrentUser({ ...updatedUser }); 
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.isAdmin) setAdminViewMode('dashboard');
    if (!user.hasCompletedSetup && !user.isAdmin) setViewMode('settings');
  };

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
    setDailyPlan([]);
    setViewMode('plan');
  };

  if (!currentUser) return <Login onLogin={handleLogin} />;
  if (currentUser.isAdmin && adminViewMode === 'dashboard') return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setAdminViewMode('app')} />;
  if (!UserService.isSubscriptionValid(currentUser) && !currentUser.isAdmin) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const shoppingCount = currentUser.customShoppingList?.filter(i => !i.checked).length || 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col text-right dir-rtl">
      <div className="sticky top-0 z-40 shadow-xl screen-only">
        <header className="bg-gradient-to-r from-teal-600 to-cyan-800 text-white relative overflow-hidden h-[85px] flex items-center">
          <div className="container mx-auto px-4 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
                <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-14 h-14 object-contain mix-blend-lighten" />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black tracking-tighter leading-none uppercase">Noosh-app</h1>
                    <p className="text-[10px] text-teal-50 font-black mt-1 tracking-tight">همراه سلامتی و آسایش شما</p>
                </div>
            </div>
            <button onClick={() => setIsShoppingListOpen(true)} className="relative p-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-all border border-white/10 shadow-inner">
              <ShoppingCart size={22} />
              {shoppingCount > 0 && <span className="absolute -top-1 -left-1 bg-rose-500 text-white w-5 h-5 flex items-center justify-center text-[10px] font-black rounded-full border-2 border-teal-600">{shoppingCount}</span>}
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </header>

        <nav className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar shadow-sm">
          <div className="container mx-auto flex p-1 gap-1">
            {[
              {id: 'plan', label: 'چی بپزم؟', icon: CalendarDays},
              {id: 'pantry', label: 'آشپز هوشمند', icon: ChefHat},
              {id: 'search', label: 'جستجو', icon: Search},
              {id: 'challenges', label: 'چالش', icon: Trophy},
              {id: 'settings', label: 'تنظیمات', icon: Settings}
            ].map(nav => (
              <button key={nav.id} onClick={() => setViewMode(nav.id as ViewMode)} 
                className={`flex-1 min-w-[70px] py-3 rounded-2xl flex flex-col items-center gap-1 transition-all ${viewMode === nav.id ? 'text-teal-700 bg-teal-50 font-black shadow-inner ring-1 ring-teal-100' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <nav.icon size={20} />
                <span className="text-[10px] whitespace-nowrap">{nav.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {viewMode === 'plan' && (
          <div className="space-y-8 animate-enter text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
              <button onClick={() => { UserService.updatePreferences(currentUser.username, { onlyFavoritesMode: !currentUser.onlyFavoritesMode }); }} className={`px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2 transition-all ${currentUser.onlyFavoritesMode ? 'bg-rose-500 text-white shadow-lg ring-4 ring-rose-50' : 'bg-white text-slate-500 border border-slate-200'}`}>
                <Heart size={16} fill={currentUser.onlyFavoritesMode ? "currentColor" : "none"} /> فقط محبوب‌ها
              </button>
              <button onClick={() => { setIsQuickMode(!isQuickMode); }} className={`px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2 transition-all ${isQuickMode ? 'bg-amber-500 text-white shadow-lg ring-4 ring-amber-50' : 'bg-white text-slate-500 border border-slate-200'}`}>
                <Clock size={16} /> غذاهای سریع
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
               <button onClick={handleGenerate} disabled={isGenerating} className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-black shadow-xl shadow-teal-100 hover:bg-teal-700 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70">
                <RefreshCw size={24} className={isGenerating ? "animate-spin" : ""} /> <span>پیشنهاد روزانه</span>
              </button>
              <button onClick={handleGenerateWeekly} disabled={isGenerating} className="px-8 py-4 bg-white text-teal-700 border-2 border-teal-600 rounded-2xl font-black shadow-md hover:bg-teal-50 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70">
                <CalendarRange size={24} /> <span>برنامه هفتگی</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto text-right">
              {dailyPlan.map((plan) => (
                <div key={plan.dish.id} className="animate-enter card-3d">
                  <MealCard plan={plan} user={currentUser} />
                </div>
              ))}
              {dailyPlan.length === 0 && (
                <div className="col-span-full flex flex-col items-center py-20 bg-white/40 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <div className="p-8 bg-teal-50 text-teal-200 rounded-full mb-4 shadow-inner"><ChefHat size={80} strokeWidth={1} /></div>
                    <p className="text-xl font-black text-slate-400">برنامه ریزی هوشمند منتظر کلیک شماست</p>
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsShoppingListOpen(false)}>
           <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-enter h-[80vh]" onClick={e => e.stopPropagation()}>
              <button onClick={() => setIsShoppingListOpen(false)} className="absolute top-4 left-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 z-50 transition-colors"><X size={20} /></button>
              <div className="h-full overflow-y-auto custom-scrollbar">
                <ShoppingList user={currentUser} weeklyPlan={dailyPlan} onUpdateUser={setCurrentUser} />
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
