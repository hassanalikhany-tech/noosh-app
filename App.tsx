
import React, { useState, useEffect } from 'react';
// Added missing icons: Users, HeartPulse, CheckCircle2
import { CalendarDays, RefreshCw, ChefHat, Search, Refrigerator, Settings, ShieldCheck, Trophy, Activity, Leaf, Info, X, ShoppingCart, Printer, Undo2, CalendarRange, Download, Sparkles, User, Sun, Snowflake, Scale, Users, HeartPulse, CheckCircle2 } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile, CATEGORY_LABELS, NatureType } from './types';
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
import { estimateCookTime, estimateCalories } from './utils/recipeHelpers';

type ViewMode = 'plan' | 'pantry' | 'search' | 'challenges' | 'settings';

interface ToastState {
  show: boolean;
  title: string;
  message: string;
  colorClass: string;
  icon: any;
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [dailyPlan, setDailyPlan] = useState<DayPlan[]>([]);
  const [previousPlan, setPreviousPlan] = useState<DayPlan[]>([]); 
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('plan');
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);
  const [adminViewMode, setAdminViewMode] = useState<'dashboard' | 'app'>('dashboard');
  
  const [toast, setToast] = useState<ToastState>({
    show: false,
    title: '',
    message: '',
    colorClass: 'bg-emerald-600',
    icon: Info
  });

  useEffect(() => {
    const existing = UserService.getCurrentUser();
    if (existing) {
      setCurrentUser(existing);
      if (existing.isAdmin) setAdminViewMode('dashboard');
      // If setup not completed, go to settings
      if (!existing.hasCompletedSetup && !existing.isAdmin) {
          setViewMode('settings');
      }
    }

    const handleCartUpdate = () => {
       const updated = UserService.getCurrentUser();
       if (updated) setCurrentUser(updated); 
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  useEffect(() => {
    if (isShoppingListOpen) {
      document.body.classList.add('printing-modal');
    } else {
      document.body.classList.remove('printing-modal');
    }
    return () => document.body.classList.remove('printing-modal');
  }, [isShoppingListOpen]);

  const handleGenerate = () => {
    if (!currentUser) return;
    setIsGenerating(true);
    if (dailyPlan.length > 0) setPreviousPlan(dailyPlan);
    
    setTimeout(() => {
      const { plan, updatedUser } = generateDailyPlan(currentUser);
      setDailyPlan(plan);
      setCurrentUser({ ...updatedUser }); 
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleGenerateWeekly = () => {
    if (!currentUser) return;
    setIsGenerating(true);
    if (dailyPlan.length > 0) setPreviousPlan(dailyPlan);

    setTimeout(() => {
      const { plan, updatedUser } = generateWeeklyPlan(currentUser);
      setDailyPlan(plan);
      setCurrentUser({ ...updatedUser }); 
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleRestorePrevious = () => {
    if (previousPlan.length > 0) {
      const current = [...dailyPlan];
      setDailyPlan(previousPlan);
      setPreviousPlan(current);
      showNotification('برنامه قبلی بازیابی شد', 'می‌توانید دوباره بین برنامه‌ها جابجا شوید.', 'bg-indigo-600', Undo2);
    }
  };

  const handlePrintPlan = () => window.print();

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.isAdmin) setAdminViewMode('dashboard');
    if (!user.hasCompletedSetup && !user.isAdmin) setViewMode('settings');
  };

  const handleLogout = () => {
    UserService.logout();
    setCurrentUser(null);
    setDailyPlan([]);
    setPreviousPlan([]);
    setViewMode('plan');
    setAdminViewMode('dashboard');
  };

  const showNotification = (title: string, message: string, colorClass: string, icon: any) => {
    setToast({ show: true, title, message, colorClass, icon });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 5000);
  };

  const toggleDietMode = () => {
    if (!currentUser) return;
    const newMode = !currentUser.dietMode;
    const updated = UserService.updatePreferences(currentUser.username, { dietMode: newMode });
    setCurrentUser(updated);
    setDailyPlan([]);
    showNotification(
        newMode ? 'حالت رژیمی فعال شد' : 'حالت رژیمی غیرفعال شد',
        newMode ? 'غذاهای پرکالری حذف شدند.' : 'محدودیت‌های غذایی برداشته شدند.',
        newMode ? 'bg-emerald-600' : 'bg-slate-600',
        newMode ? Leaf : Activity
    );
  };

  const markSetupComplete = () => {
      if (currentUser) {
          const updated = UserService.updatePreferences(currentUser.username, { hasCompletedSetup: true });
          setCurrentUser(updated);
          setViewMode('plan');
          showNotification('آماده هستید!', 'شخصی‌سازی با موفقیت انجام شد.', 'bg-teal-600', Sparkles);
      }
  };

  if (!currentUser) return <Login onLogin={handleLogin} />;
  if (currentUser.isAdmin && adminViewMode === 'dashboard') return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setAdminViewMode('app')} />;
  
  if (!UserService.isSubscriptionValid(currentUser) && !currentUser.isAdmin) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const shoppingCount = currentUser.customShoppingList?.filter(i => !i.checked).length || 0;

  return (
    <div className="min-h-screen bg-transparent font-sans flex flex-col">
      
      {/* Toast Notification */}
      <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 transition-all duration-500 transform ${toast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'} screen-only`}>
        <div className={`${toast.colorClass} text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4 border border-white/20 backdrop-blur-xl bg-opacity-95`}>
          <div className="p-2 bg-white/20 rounded-full shrink-0 shadow-inner">
            <toast.icon size={24} className="text-white drop-shadow-md" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-lg mb-1 drop-shadow-sm">{toast.title}</h4>
            <p className="text-sm text-white/90 leading-relaxed font-medium">{toast.message}</p>
          </div>
          <button onClick={() => setToast(prev => ({...prev, show: false}))} className="text-white/60 hover:text-white bg-white/10 rounded-full p-1"><X size={16} /></button>
        </div>
      </div>

      {/* Header */}
      <div className={`sticky top-0 z-40 shadow-xl shadow-slate-200/50 screen-only`}>
        <header className={`${currentUser.dietMode ? 'bg-gradient-to-r from-emerald-600 to-green-800' : 'bg-gradient-to-r from-teal-600 to-cyan-800'} text-white transition-all duration-500 relative`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center relative min-h-[60px]">
            <div className="flex flex-col z-10">
                <h1 className="text-3xl font-black tracking-tight leading-none drop-shadow-md">نوش</h1>
                <p className="text-[11px] text-white/80 font-medium mt-1 tracking-wide">{currentUser.dietMode ? 'همراه سلامتی شما' : 'همراه لحظه‌های خوش'}</p>
            </div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-20">
                 <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-20 h-20 object-contain drop-shadow-xl" />
            </div>
            <div className="flex items-center gap-2 z-10">
                <button onClick={toggleDietMode} className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${currentUser.dietMode ? 'bg-white text-emerald-700 shadow-lg' : 'bg-black/20 text-white'}`}>
                  <Activity size={16} className={currentUser.dietMode ? "animate-pulse" : ""} />
                  {currentUser.dietMode ? 'رژیمی' : 'عادی'}
                </button>
                <button onClick={() => setIsShoppingListOpen(true)} className="relative p-2.5 bg-white/20 rounded-xl text-white">
                  <ShoppingCart size={22} />
                  {shoppingCount > 0 && <span className="absolute -top-1.5 -left-1.5 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full border-2 border-white">{shoppingCount}</span>}
                </button>
            </div>
          </div>
        </header>

        <nav className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar relative z-20">
          <div className="container mx-auto flex p-1.5 gap-1.5">
            {[
              {id: 'plan', label: 'چی بپزم؟', icon: CalendarDays},
              {id: 'pantry', label: 'آشپز هوشمند', icon: Refrigerator},
              {id: 'search', label: 'جستجو', icon: Search},
              {id: 'challenges', label: 'چالش', icon: Trophy},
              {id: 'settings', label: 'تنظیمات', icon: Settings}
            ].map(nav => (
              <button 
                key={nav.id}
                onClick={() => setViewMode(nav.id as ViewMode)} 
                className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all ${viewMode === nav.id ? (currentUser.dietMode ? 'text-emerald-700 bg-emerald-50' : 'text-teal-700 bg-teal-50') + ' font-bold shadow-sm' : 'text-gray-400'}`}
              >
                <nav.icon size={20} />
                <span className="text-[10px] whitespace-nowrap">{nav.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <main className={`container mx-auto px-4 py-8 flex-grow`}>
        {viewMode === 'plan' && (
          <div className="space-y-8 animate-enter">
            <div className="screen-only">
                {/* Onboarding / Setup Banner */}
                {!currentUser.hasCompletedSetup && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-3xl text-white mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-2xl"><Sparkles size={32} /></div>
                            <div>
                                <h3 className="text-xl font-black">اولین قدم: شخصی‌سازی مزاج و سلیقه</h3>
                                <p className="text-amber-50 text-sm font-medium">برای دریافت بهترین پیشنهادات، ابتدا تنظیمات اولیه را انجام دهید.</p>
                            </div>
                        </div>
                        <button onClick={() => setViewMode('settings')} className="px-8 py-3 bg-white text-orange-600 font-black rounded-xl shadow-lg hover:bg-orange-50 transition-all transform active:scale-95">بزن بریم!</button>
                    </div>
                )}

                {/* Personalization Summary Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8 bg-white/50 backdrop-blur-sm p-4 rounded-[2rem] border border-white/50 shadow-sm max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border shadow-sm text-xs font-bold text-gray-600">
                        <Users size={14} className="text-amber-500" />
                        {currentUser.familySize} نفر
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border shadow-sm text-xs font-bold text-gray-600">
                        <HeartPulse size={14} className="text-rose-500" />
                        طبع: {currentUser.preferredNatures?.map(n => n === 'hot' ? 'گرم' : n === 'cold' ? 'سرد' : 'معتدل').join('، ')}
                    </div>
                    {currentUser.dietMode && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white rounded-full border-none shadow-sm text-xs font-bold">
                            <Leaf size={14} /> حالت رژیمی فعال
                        </div>
                    )}
                    <button onClick={() => setViewMode('settings')} className="text-teal-600 hover:underline text-[10px] font-bold">ویرایش تنظیمات</button>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
                   <button onClick={handleGenerate} disabled={isGenerating} className={`px-6 py-4 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 ${currentUser.dietMode ? 'bg-emerald-600' : 'bg-teal-600'}`}>
                    <RefreshCw size={24} className={isGenerating ? "animate-spin" : ""} />
                    <span>پیشنهاد روزانه</span>
                  </button>
                  <button onClick={handleGenerateWeekly} disabled={isGenerating} className="px-6 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold shadow-md hover:border-teal-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 group">
                    <CalendarRange size={24} className="text-teal-600" />
                    <span>برنامه هفته آینده</span>
                  </button>
                  {previousPlan.length > 0 && (
                    <button onClick={handleRestorePrevious} className="px-6 py-4 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95"><Undo2 size={24} /><span>برنامه قبلی</span></button>
                  )}
                  {dailyPlan.length > 0 && (
                    <button onClick={handlePrintPlan} className="px-6 py-4 bg-amber-50 text-amber-700 border-2 border-amber-100 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-95"><Download size={24} /><span>دانلود برنامه (PDF)</span></button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {dailyPlan.map((plan, index) => (
                    <div key={index} className="animate-enter card-3d h-full"><MealCard plan={plan} /></div>
                  ))}
                  {dailyPlan.length === 0 && !isGenerating && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white/70 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200 shadow-sm">
                        <div className={`p-8 rounded-full mb-6 ${currentUser.dietMode ? 'bg-emerald-50 text-emerald-200' : 'bg-teal-50 text-teal-200'}`}><ChefHat size={80} strokeWidth={1} /></div>
                        <p className="text-2xl font-bold text-gray-600 mb-2">هنوز غذایی پیشنهاد نشده</p>
                        <p className="text-base opacity-70 text-center max-w-md">برای دریافت برنامه متناسب با مزاج شما، از دکمه‌های بالا استفاده کنید</p>
                    </div>
                  )}
                </div>
            </div>

            <div className="print-view" id="weekly-plan-print">
                <div className="p-8 max-w-[210mm] mx-auto bg-white">
                    <div className="text-center mb-6 border-b-2 border-black pb-4 flex justify-between items-end">
                      <div className="text-right">
                         <h1 className="text-3xl font-black mb-2">برنامه غذایی هوشمند نوش</h1>
                         <p className="text-sm font-bold text-gray-600">تهیه شده برای: {currentUser.fullName}</p>
                      </div>
                      <div className="text-left font-bold text-sm">تاریخ: {new Date().toLocaleDateString('fa-IR')}</div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6 border border-gray-300">
                        <h4 className="font-bold text-sm mb-2 border-b border-gray-300 pb-1">مبنای شخصی‌سازی پیشنهادات:</h4>
                        <div className="grid grid-cols-3 text-xs gap-4">
                            <div>• <strong>خانواده:</strong> {currentUser.familySize} نفر</div>
                            <div>• <strong>رژیم:</strong> {currentUser.dietMode ? 'فعال (کم‌کالری)' : 'عادی'}</div>
                            <div>• <strong>طبع‌های مجاز:</strong> {currentUser.preferredNatures?.map(n => n === 'hot' ? 'گرمی' : n === 'cold' ? 'سردی' : 'معتدل').join('، ')}</div>
                        </div>
                    </div>
                    
                    <table style={{width: '100%', borderCollapse: 'collapse', direction: 'rtl', fontSize: '13px'}}>
                      <thead>
                        <tr style={{backgroundColor: '#eee'}}>
                          <th style={{padding: '10px', border: '1px solid #000'}}>روز هفته</th>
                          <th style={{padding: '10px', border: '1px solid #000', width: '40%'}}>نام غذا و توضیحات</th>
                          <th style={{padding: '10px', border: '1px solid #000'}}>طبع</th>
                          <th style={{padding: '10px', border: '1px solid #000'}}>زمان و کالری</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyPlan.map((plan, idx) => (
                          <tr key={idx}>
                            <td className="text-center font-bold" style={{border: '1px solid #000'}}>{plan.dayName}</td>
                            <td style={{border: '1px solid #000', padding: '10px'}}>
                              <div className="font-bold mb-1">{plan.dish.name}</div>
                              <div className="text-[10px] leading-tight opacity-70">{plan.dish.description}</div>
                            </td>
                            <td className="text-center" style={{border: '1px solid #000'}}>
                                {plan.dish.nature === 'hot' ? 'گرم' : plan.dish.nature === 'cold' ? 'سرد' : 'معتدل'}
                            </td>
                            <td className="text-center" style={{border: '1px solid #000'}}>
                              ⏱ {estimateCookTime(plan.dish)} دقیقه | 🔥 {estimateCalories(plan.dish)} کالری
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>
            </div>
          </div>
        )}
        
        <div className="screen-only">
            {viewMode === 'pantry' && <div className="animate-enter"><PantryChef user={currentUser} /></div>}
            {viewMode === 'search' && <div className="animate-enter"><RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} /></div>}
            {viewMode === 'challenges' && <div className="animate-enter"><Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={showNotification} /></div>}
            {viewMode === 'settings' && (
                <div className="animate-enter space-y-8">
                    <Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />
                    {!currentUser.hasCompletedSetup && (
                        <div className="max-w-4xl mx-auto flex justify-center pb-20">
                            <button onClick={markSetupComplete} className="px-12 py-5 bg-teal-600 text-white rounded-3xl font-black text-xl shadow-2xl hover:bg-teal-700 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3">
                                <CheckCircle2 size={28} /> تایید و شروع استفاده از اپ
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;