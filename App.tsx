
import React, { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw, ChefHat, Search, Refrigerator, Settings, ShieldCheck, Trophy, Activity, Leaf, Info, X, ShoppingCart, Printer, Undo2, CalendarRange, Download } from 'lucide-react';
import { generateDailyPlan, generateWeeklyPlan } from './utils/planner';
import { DayPlan, UserProfile, CATEGORY_LABELS } from './types';
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
  const [previousPlan, setPreviousPlan] = useState<DayPlan[]>([]); // Store previous plan
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
    }

    const handleCartUpdate = () => {
       const updated = UserService.getCurrentUser();
       if (updated) {
         setCurrentUser(updated); 
       }
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  // Handle body class for modal printing
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
    // Save current plan to history before generating new
    if (dailyPlan.length > 0) setPreviousPlan(dailyPlan);
    
    setTimeout(() => {
      try {
        const { plan, updatedUser } = generateDailyPlan(currentUser);
        setDailyPlan(plan);
        setCurrentUser({ ...updatedUser }); 
      } catch (e) {
        console.error("Planner Error:", e);
        setDailyPlan([]);
      }
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleGenerateWeekly = () => {
    if (!currentUser) return;
    setIsGenerating(true);
    // Save current plan to history before generating new
    if (dailyPlan.length > 0) setPreviousPlan(dailyPlan);

    setTimeout(() => {
      try {
        const { plan, updatedUser } = generateWeeklyPlan(currentUser);
        setDailyPlan(plan);
        setCurrentUser({ ...updatedUser }); 
      } catch (e) {
        console.error("Planner Error:", e);
        setDailyPlan([]);
      }
      setIsGenerating(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleRestorePrevious = () => {
    if (previousPlan.length > 0) {
      const current = [...dailyPlan];
      setDailyPlan(previousPlan);
      setPreviousPlan(current); // Swap them so you can toggle back and forth
      showNotification('برنامه قبلی بازیابی شد', 'می‌توانید دوباره بین برنامه‌ها جابجا شوید.', 'bg-indigo-600', Undo2);
    }
  };

  const handlePrintPlan = () => {
    window.print();
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.isAdmin) setAdminViewMode('dashboard');
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
    setToast({
      show: true,
      title,
      message,
      colorClass,
      icon
    });
    
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const toggleDietMode = () => {
    if (!currentUser) return;
    const newMode = !currentUser.dietMode;
    const updated = UserService.updatePreferences(currentUser.username, { dietMode: newMode });
    setCurrentUser(updated);
    setDailyPlan([]);
    
    if (newMode) {
      showNotification(
        'حالت رژیمی فعال شد',
        'غذاهای پرکالری، سرخ‌کردنی و سنگین از پیشنهادات حذف شدند.',
        'bg-emerald-600',
        Leaf
      );
    } else {
      showNotification(
        'حالت رژیمی غیرفعال شد',
        'محدودیت‌های غذایی برداشته شدند.',
        'bg-slate-600',
        Activity
      );
    }
  };

  if (!currentUser) return <Login onLogin={handleLogin} />;
  if (currentUser.isAdmin && adminViewMode === 'dashboard') return <AdminDashboard onLogout={handleLogout} onSwitchToApp={() => setAdminViewMode('app')} />;
  
  const isSubValid = UserService.isSubscriptionValid(currentUser);
  if (!isSubValid && !currentUser.isAdmin) return <Subscription user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} />;

  const headerGradient = currentUser.dietMode 
    ? 'bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800' 
    : 'bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-800';
    
  const buttonBg = currentUser.dietMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-teal-600 hover:bg-teal-700';
  const navActive = currentUser.dietMode 
    ? 'text-emerald-700 bg-emerald-50 shadow-emerald-100' 
    : 'text-teal-700 bg-teal-50 shadow-teal-100';
  const navInactive = 'text-gray-400 hover:text-gray-600 hover:bg-gray-50';
  const lightBg = currentUser.dietMode ? 'bg-emerald-50' : 'bg-teal-50';
  const iconColor = currentUser.dietMode ? 'text-emerald-200' : 'text-teal-200';

  const ToastIcon = toast.icon;
  const shoppingCount = currentUser.customShoppingList?.filter(i => !i.checked).length || 0;

  return (
    <div className="min-h-screen bg-transparent font-sans flex flex-col">
      
      {/* Toast Notification - Screen Only */}
      <div 
        className={`fixed top-32 left-1/2 -translate-x-1/2 z-[70] w-full max-w-sm px-4 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
          toast.show ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95 pointer-events-none'
        } screen-only`}
      >
        <div className={`${toast.colorClass} text-white p-5 rounded-2xl shadow-2xl flex items-start gap-4 border border-white/20 backdrop-blur-xl bg-opacity-95`}>
          <div className="p-2 bg-white/20 rounded-full shrink-0 shadow-inner">
            <ToastIcon size={24} className="text-white drop-shadow-md" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-lg mb-1 drop-shadow-sm">{toast.title}</h4>
            <p className="text-sm text-white/90 leading-relaxed font-medium">
              {toast.message}
            </p>
          </div>
          <button onClick={() => setToast(prev => ({...prev, show: false}))} className="text-white/60 hover:text-white transition-colors bg-white/10 rounded-full p-1 hover:bg-white/20">
            <X size={16} />
          </button>
        </div>
      </div>

      {currentUser.isAdmin && (
        <button onClick={() => setAdminViewMode('dashboard')} className="fixed bottom-6 right-4 z-50 bg-slate-900 text-white p-3.5 rounded-full shadow-2xl hover:bg-slate-800 transition-all border-2 border-white/20 hover:scale-110 active:scale-95 group screen-only">
          <ShieldCheck size={24} className="group-hover:text-emerald-400 transition-colors" />
        </button>
      )}

      {/* Header and Nav Container - Screen Only */}
      <div className={`sticky top-0 z-40 shadow-xl shadow-slate-200/50 screen-only`}>
        <header className={`${headerGradient} text-white transition-all duration-500 relative`}>
          <div className="container mx-auto px-4 py-4 flex justify-between items-center relative min-h-[60px]">
            
            {/* RIGHT SIDE: App Name & Description */}
            <div className="flex flex-col z-10">
                <h1 className="text-3xl font-black tracking-tight leading-none drop-shadow-md">
                  نوش
                </h1>
                <p className="text-[11px] text-white/80 font-medium mt-1 tracking-wide">
                  {currentUser.dietMode ? 'همراه سلامتی شما' : 'همراه لحظه‌های خوش'}
                </p>
            </div>
            
            {/* CENTER: Logo Absolutely Positioned */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none z-20">
                 <img 
                    key={new Date().getTime()} // Force reload
                    src="https://i.ibb.co/gMDKtj4p/3.png" 
                    alt="Noosh Logo" 
                    className="w-20 h-20 object-contain drop-shadow-xl transform hover:scale-110 transition-transform duration-300"
                    style={{ maxWidth: '100px', maxHeight: '100px' }} 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
            </div>
            
            {/* LEFT SIDE: Buttons */}
            <div className="flex items-center gap-2 z-10">
                {/* Diet Mode Toggle */}
                <button 
                  onClick={toggleDietMode}
                  className={`px-3 py-2 rounded-xl font-bold text-[10px] sm:text-xs flex items-center gap-2 transition-all duration-300 ${
                    currentUser.dietMode 
                      ? 'bg-white text-emerald-700 shadow-[0_0_20px_rgba(255,255,255,0.4)] ring-2 ring-emerald-300' 
                      : 'bg-black/20 hover:bg-black/30 text-white border border-white/10'
                  }`}
                >
                  <Activity size={16} className={currentUser.dietMode ? "animate-pulse" : ""} />
                  {currentUser.dietMode ? 'رژیمی' : 'عادی'}
                </button>

                {/* Shopping List Button */}
                <button 
                  onClick={() => setIsShoppingListOpen(true)}
                  className="relative p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-all border border-white/10 text-white"
                  title="لیست خرید"
                >
                  <ShoppingCart size={22} />
                  {shoppingCount > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full shadow-md animate-bounce border-2 border-white">
                      {shoppingCount}
                    </span>
                  )}
                </button>
            </div>
          </div>
        </header>

        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-100 overflow-x-auto no-scrollbar relative z-20">
          <div className="container mx-auto flex min-w-full sm:min-w-0 p-1.5 gap-1.5">
            <button 
              onClick={() => setViewMode('plan')} 
              className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 ${viewMode === 'plan' ? navActive + ' font-bold shadow-md transform scale-[1.02]' : navInactive}`}
            >
              <CalendarDays size={20} strokeWidth={viewMode === 'plan' ? 2.5 : 2} />
              <span className="text-[11px] whitespace-nowrap">چی بپزم؟</span>
            </button>

            <button 
              onClick={() => setViewMode('pantry')} 
              className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 ${viewMode === 'pantry' ? navActive + ' font-bold shadow-md transform scale-[1.02]' : navInactive}`}
            >
              <Refrigerator size={20} strokeWidth={viewMode === 'pantry' ? 2.5 : 2} />
              <span className="text-[11px]">آشپز هوشمند</span>
            </button>

            <button 
              onClick={() => setViewMode('search')} 
              className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 ${viewMode === 'search' ? navActive + ' font-bold shadow-md transform scale-[1.02]' : navInactive}`}
            >
              <Search size={20} strokeWidth={viewMode === 'search' ? 2.5 : 2} />
              <span className="text-[11px]">جستجو</span>
            </button>

            <button 
              onClick={() => setViewMode('challenges')} 
              className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 ${viewMode === 'challenges' ? navActive + ' font-bold shadow-md transform scale-[1.02]' : navInactive}`}
            >
              <Trophy size={20} strokeWidth={viewMode === 'challenges' ? 2.5 : 2} />
              <span className="text-[11px]">چالش</span>
            </button>

            <button 
              onClick={() => setViewMode('settings')} 
              className={`flex-1 min-w-[75px] py-3 rounded-xl flex flex-col items-center gap-1.5 transition-all duration-300 ${viewMode === 'settings' ? navActive + ' font-bold shadow-md transform scale-[1.02]' : navInactive}`}
            >
              <Settings size={20} strokeWidth={viewMode === 'settings' ? 2.5 : 2} />
              <span className="text-[11px]">تنظیمات</span>
            </button>
          </div>
        </nav>
      </div>

      {isShoppingListOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsShoppingListOpen(false)}
        >
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl no-scrollbar"
            onClick={e => e.stopPropagation()}
          >
             <div className="sticky top-0 bg-white z-10 border-b p-4 flex justify-between items-center screen-only">
               <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <ShoppingCart className="text-teal-600" />
                 سبد خرید
               </h2>
               <button onClick={() => setIsShoppingListOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <X size={24} className="text-gray-500" />
               </button>
             </div>
             <ShoppingList weeklyPlan={dailyPlan} user={currentUser} onUpdateUser={setCurrentUser} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`container mx-auto px-4 py-8 flex-grow`}>
        {viewMode === 'plan' && (
          <div className="space-y-8 animate-enter">
            {/* Screen Content: Buttons and Cards */}
            <div className="screen-only">
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
                   <button 
                     onClick={handleGenerate} 
                     disabled={isGenerating} 
                     className={`px-6 py-4 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:active:scale-100 ${buttonBg}`}
                   >
                    <RefreshCw size={24} className={isGenerating ? "animate-spin" : ""} />
                    <span className="text-base sm:text-lg">پیشنهاد روزانه</span>
                  </button>

                  <button 
                     onClick={handleGenerateWeekly} 
                     disabled={isGenerating} 
                     className={`px-6 py-4 bg-white text-gray-700 border-2 border-gray-100 hover:border-teal-200 rounded-2xl font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70 disabled:active:scale-100 group`}
                   >
                    <CalendarRange size={24} className="text-teal-600 group-hover:text-teal-700" />
                    <span className="text-base sm:text-lg">برنامه هفته آینده</span>
                  </button>

                  {previousPlan.length > 0 && (
                    <button 
                      onClick={handleRestorePrevious} 
                      className="px-6 py-4 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 hover:bg-indigo-100 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95"
                      title="بازگشت به برنامه قبلی"
                    >
                      <Undo2 size={24} />
                      <span className="text-base sm:text-lg">برنامه قبلی</span>
                    </button>
                  )}

                  {dailyPlan.length > 0 && (
                    <button 
                      onClick={handlePrintPlan} 
                      className="px-6 py-4 bg-amber-50 text-amber-700 border-2 border-amber-100 hover:bg-amber-100 rounded-2xl font-bold shadow-sm transition-all flex items-center justify-center gap-3 active:scale-95"
                      title="دانلود فایل PDF برنامه"
                    >
                      <Download size={24} />
                      <span className="text-base sm:text-lg">دانلود برنامه (PDF)</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {dailyPlan.length > 0 ? (
                    dailyPlan.map((plan, index) => (
                      <div key={index} className="animate-enter card-3d h-full">
                        <MealCard plan={plan} />
                      </div>
                    ))
                  ) : (
                    !isGenerating && (
                      <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 bg-white/70 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200 animate-enter shadow-sm">
                        <div className={`p-8 rounded-full mb-6 ${lightBg} ${iconColor} shadow-inner`}>
                           <ChefHat size={80} strokeWidth={1} />
                        </div>
                        <p className="text-2xl font-bold text-gray-600 mb-2">هنوز غذایی پیشنهاد نشده</p>
                        <p className="text-base opacity-70 text-center max-w-md">
                          برای دریافت برنامه غذایی روزانه یا هفتگی، از دکمه‌های بالا استفاده کنید
                        </p>
                      </div>
                    )
                  )}
                </div>
            </div>

            {/* Print View: Dedicated Structure for Weekly Plan PDF */}
            <div className="print-view">
                {dailyPlan.length > 0 ? (
                  <div className="p-8 max-w-[210mm] mx-auto bg-white">
                    <div className="text-center mb-8 border-b-2 border-black pb-4 flex justify-between items-end">
                      <div className="text-right">
                         <h1 className="text-3xl font-black mb-2">برنامه غذایی هفتگی</h1>
                         <p className="text-sm font-bold text-gray-600">تهیه شده برای: {currentUser.fullName}</p>
                      </div>
                      <div className="text-left">
                        <div className="text-xs text-gray-500">تاریخ ایجاد:</div>
                        <div className="font-mono font-bold text-lg">{new Date().toLocaleDateString('fa-IR')}</div>
                      </div>
                    </div>
                    
                    <table style={{width: '100%', borderCollapse: 'collapse', direction: 'rtl', fontSize: '14px'}}>
                      <thead>
                        <tr style={{backgroundColor: '#f3f4f6', borderBottom: '2px solid #000'}}>
                          <th style={{padding: '12px', width: '15%', border: '1px solid #999', textAlign: 'center'}}>روز هفته</th>
                          <th style={{padding: '12px', width: '35%', border: '1px solid #999'}}>ناهار / شام</th>
                          <th style={{padding: '12px', width: '20%', border: '1px solid #999', textAlign: 'center'}}>دسته‌بندی</th>
                          <th style={{padding: '12px', border: '1px solid #999', textAlign: 'center'}}>زمان / کالری</th>
                          <th style={{padding: '12px', width: '15%', border: '1px solid #999'}}>یادداشت</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dailyPlan.map((plan, idx) => (
                          <tr key={idx} style={{backgroundColor: idx % 2 === 0 ? '#fff' : '#fafafa'}}>
                            <td style={{padding: '12px', border: '1px solid #ccc', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f9f9f9'}}>
                              {plan.dayName}
                            </td>
                            <td style={{padding: '12px', border: '1px solid #ccc'}}>
                              <div style={{fontWeight: 'bold', marginBottom: '4px', fontSize: '16px'}}>{plan.dish.name}</div>
                              <div style={{fontSize: '11px', color: '#666', lineHeight: '1.4'}}>{plan.dish.description.substring(0, 80)}...</div>
                            </td>
                            <td style={{padding: '12px', border: '1px solid #ccc', textAlign: 'center'}}>
                              <span style={{backgroundColor: '#eee', padding: '4px 8px', borderRadius: '4px', fontSize: '12px'}}>
                                {CATEGORY_LABELS[plan.dish.category]}
                              </span>
                            </td>
                            <td style={{padding: '12px', border: '1px solid #ccc', textAlign: 'center', fontSize: '12px'}}>
                              <div style={{marginBottom: '4px'}}>⏱ {estimateCookTime(plan.dish)} دقیقه</div>
                              <div>🔥 ~{estimateCalories(plan.dish)} کالری</div>
                            </td>
                            <td style={{padding: '12px', border: '1px solid #ccc'}}></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="mt-8 pt-4 border-t-2 border-black flex justify-between items-center text-xs text-gray-500">
                      <p>تولید شده توسط اپلیکیشن هوشمند نوش (Noosh App)</p>
                      <p>نوش جان!</p>
                    </div>
                  </div>
                ) : (
                   <p className="text-center p-10">هیچ برنامه‌ای برای چاپ موجود نیست.</p>
                )}
            </div>

          </div>
        )}
        
        <div className="screen-only">
            {viewMode === 'pantry' && <div className="animate-enter"><PantryChef user={currentUser} /></div>}
            {viewMode === 'search' && <div className="animate-enter"><RecipeSearch user={currentUser} onUpdateUser={setCurrentUser} /></div>}
            {viewMode === 'challenges' && <div className="animate-enter"><Challenges user={currentUser} onUpdateUser={setCurrentUser} onNotify={showNotification} /></div>}
            {viewMode === 'settings' && <div className="animate-enter"><Preferences user={currentUser} onUpdateUser={setCurrentUser} onLogout={handleLogout} /></div>}
        </div>
      </main>
    </div>
  );
};

export default App;
