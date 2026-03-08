
import { X, ChefHat, Clock, Activity, Flame, PlusCircle, Check, Sun, Snowflake, Scale, ShieldCheck, Utensils, AlertCircle, Users, Minus, Plus, Play, Pause, RotateCcw, CheckSquare, Square, Trophy, AlarmClock } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Dish, ShoppingItem, UserProfile } from '../types';
import DishVisual from './DishVisual';
import { UserService } from '../services/userService';
import { estimateCalories, estimateCookTime, getDifficulty, getDishNature } from '../utils/recipeHelpers';

interface RecipeModalProps {
  dish: Dish;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUpdateUser?: (user: UserProfile) => void;
}

const EXCLUDED_SHOPPING_ITEMS = ['آب', 'آب جوش', 'نمک', 'فلفل', 'زردچوبه', 'روغن'];

const RecipeModal: React.FC<RecipeModalProps> = ({ dish, isOpen, onClose, user, onUpdateUser }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const [servings, setServings] = useState(user?.familySize || 4);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [isTimerOverlayOpen, setIsTimerOverlayOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState(10); // Default 10 mins
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const hasRecipe = dish.recipeSteps && dish.recipeSteps.length > 0;
  const hasIngredients = dish.ingredients && dish.ingredients.length > 0;
  
  const calories = dish.calories || estimateCalories(dish);
  const time = dish.cookTime || estimateCookTime(dish);
  const difficulty = dish.difficulty || getDifficulty(dish);
  const natureInfo = dish.nature ? { type: dish.nature, label: dish.natureLabel, mosleh: dish.mosleh } : getDishNature(dish);

  useEffect(() => {
    if (isOpen) {
      setAddedToCart(false);
      setServings(user?.familySize || 4);
      setCheckedSteps([]);
      setTimerSeconds(0);
      setIsTimerRunning(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isOpen, user?.familySize]);

  // Keyboard listener for spacebar
  useEffect(() => {
    if (!isOpen || !hasRecipe) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        // Find first unchecked step
        const nextStepIdx = dish.recipeSteps!.findIndex((_, idx) => !checkedSteps.includes(idx));
        if (nextStepIdx !== -1) {
          toggleStep(nextStepIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, checkedSteps, dish.recipeSteps]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setIsAlarmPlaying(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isTimerRunning]);

  // Alarm logic
  useEffect(() => {
    if (isAlarmPlaying) {
      if (!audioRef.current) {
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isAlarmPlaying]);

  const stopAlarm = () => {
    setIsAlarmPlaying(false);
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const startTimer = () => {
    if (timerSeconds === 0) {
      setTimerSeconds(timerInput * 60);
    }
    setIsTimerRunning(true);
  };

  const pauseTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(0);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${toPersianDigits(mins)}:${secs < 10 ? '۰' : ''}${toPersianDigits(secs)}`;
  };

  const toPersianDigits = (num: number | string) => {
    if (num === undefined || num === null) return '';
    const val = typeof num === 'number' ? Math.round(num * 10) / 10 : num;
    return val.toString().replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'['0123456789'.indexOf(d)]);
  };

  const getScaledAmount = (baseAmount: number) => {
    if (!baseAmount) return 0;
    return Math.round((baseAmount / 4) * servings * 10) / 10;
  };

  const handleAddAllToCart = () => {
    if (!user || !dish.ingredients) return;
    setAddedToCart(true);
    const currentList = user.customShoppingList || [];
    const newItems: ShoppingItem[] = dish.ingredients
      .filter(ing => !EXCLUDED_SHOPPING_ITEMS.includes(ing.item))
      .map(ing => ({
        id: `ing-${Date.now()}-${Math.random()}`,
        name: ing.item,
        amount: getScaledAmount(ing.amount),
        unit: ing.unit,
        checked: false,
        fromRecipe: `${dish.name} (${toPersianDigits(servings)} نفر)`
      }));
    const updatedFullList = [...currentList, ...newItems];
    if (onUpdateUser) onUpdateUser({ ...user, customShoppingList: updatedFullList });
    UserService.updateShoppingList(user.username, updatedFullList);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 bg-black/80 backdrop-blur-md overflow-hidden" onClick={onClose}>
      <div className="relative w-full h-full sm:w-[95vw] sm:h-[95vh] sm:rounded-[3rem] bg-white flex flex-col animate-enter shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        
        {/* Fixed Glassy Header - Ultra Transparent & High Blur */}
        <div className="flex-shrink-0 bg-white/10 backdrop-blur-[50px] border-b border-white/20 z-50 sticky top-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
          
          {/* Row 1: Centered Title with Premium Typography */}
          <div className="relative p-6 sm:p-10 flex items-center justify-center">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-teal-800 to-slate-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] leading-tight py-2">
              {dish.name}
            </h2>
            <button 
              onClick={onClose} 
              className="absolute right-4 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-slate-900 flex items-center justify-center transition-all shadow-xl active:scale-90 border border-white/30 group"
            >
              <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
          </div>

          {/* Row 2: Info Bar (Ultra Glassy) */}
          <div className="p-4 flex flex-row items-center justify-between px-6 sm:px-12 bg-white/5 border-t border-white/10">
               {/* Right side: Info (Time, Calories, Difficulty) */}
               <div className="flex flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5 bg-orange-100/80 text-orange-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black border border-orange-200/30 shadow-sm backdrop-blur-sm">
                    <Clock size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                    <span>{toPersianDigits(time)} دقیقه</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-rose-100/80 text-rose-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black border border-rose-200/30 shadow-sm backdrop-blur-sm">
                    <Flame size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                    <span>~{toPersianDigits(calories)} کالری</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-100/80 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black border border-blue-200/30 shadow-sm backdrop-blur-sm">
                    <Activity size={16} className="sm:w-[18px] sm:h-[18px]" /> 
                    <span>{difficulty}</span>
                  </div>
               </div>

               {/* Left side: Timer */}
               <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsTimerOverlayOpen(true);
                }}
                className={`flex items-center gap-2 sm:gap-3 bg-slate-900/90 text-white px-6 py-3 sm:px-10 sm:py-4 rounded-[1.5rem] sm:rounded-[2rem] text-xs sm:text-base font-black hover:bg-teal-600 transition-all shadow-xl active:scale-95 relative overflow-hidden group ${isTimerRunning ? 'animate-pulse ring-4 ring-amber-400/50' : ''}`}
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                 <AlarmClock size={20} strokeWidth={3} className={`sm:w-6 sm:h-6 ${isTimerRunning ? 'text-amber-400' : ''}`} />
                 <span>تایمر</span>
               </button>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto p-0 no-scrollbar">
          <div className="max-w-7xl mx-auto p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
              
              {/* Right Column: Ingredients & Info (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex flex-col gap-6">
                  <div className={`p-6 rounded-[2rem] border-2 flex flex-col gap-4 ${natureInfo.type === 'hot' ? 'bg-orange-50 border-orange-100' : natureInfo.type === 'cold' ? 'bg-blue-50 border-blue-100' : 'bg-emerald-50 border-emerald-100'}`}>
                      <div className="flex items-center gap-4">
                         <div className={`w-12 h-12 rounded-2xl ${natureInfo.type === 'hot' ? 'bg-orange-500' : natureInfo.type === 'cold' ? 'bg-blue-500' : 'bg-emerald-500'} text-white flex items-center justify-center shadow-lg`}>
                           {natureInfo.type === 'hot' ? <Sun size={24} /> : natureInfo.type === 'cold' ? <Snowflake size={24} /> : <Scale size={24} />}
                         </div>
                         <div>
                           <h4 className="font-black text-slate-900 text-lg">طبع {natureInfo.label}</h4>
                           <p className="text-xs font-bold text-slate-500">مصلح: {natureInfo.mosleh}</p>
                         </div>
                      </div>
                  </div>

                  <div className="p-6 rounded-[2rem] border-2 border-slate-100 bg-slate-50 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-black text-slate-400 uppercase tracking-wider">تعداد نفرات</span>
                        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
                            <button onClick={() => setServings(Math.max(1, servings - 1))} className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-all"><Minus size={20} /></button>
                            <span className="text-xl font-black text-slate-900 min-w-[30px] text-center">{toPersianDigits(servings)}</span>
                            <button onClick={() => setServings(Math.min(20, servings + 1))} className="p-1 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all"><Plus size={20} /></button>
                        </div>
                      </div>
                  </div>
                </div>

                {hasIngredients && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 text-slate-900 font-black text-2xl">
                      <Utensils size={28} className="text-teal-600" />
                      <h3>مواد لازم</h3>
                    </div>
                    <div className="space-y-2">
                      {dish.ingredients.map((ing, idx) => {
                        const scaled = getScaledAmount(ing.amount);
                        return (
                          <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-teal-200 transition-colors group">
                            <span className="font-bold text-slate-700">{ing.item}</span>
                            <span className="font-black text-teal-600 text-sm bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-all">
                              {scaled > 0 ? `${toPersianDigits(scaled)} ${ing.unit}` : ing.unit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {user && (
                      <button onClick={handleAddAllToCart} className={`w-full py-5 rounded-[1.75rem] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${addedToCart ? 'bg-emerald-500 text-white scale-95' : 'bg-slate-900 text-white hover:bg-teal-600'}`}>
                        {addedToCart ? <Check size={24} /> : <PlusCircle size={24} />}
                        {addedToCart ? 'در سبد خرید ذخیره شد' : 'افزودن همه به سبد خرید'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Left Column: Image (lg:col-span-5) */}
              <div className="lg:col-span-5">
                {/* Square Image */}
                <div className="aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                  <DishVisual category={dish.category} className="w-full h-full" iconSize={120} imageUrl={dish.imageUrl} dishId={dish.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Bottom Column: Steps (lg:col-span-12) */}
              <div className="lg:col-span-12 mt-4">
                {hasRecipe ? (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-slate-900 font-black text-2xl">
                         <ChefHat size={28} className="text-orange-600" />
                         <h3>مراحل پخت</h3>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                        <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Space</span>
                        <span>برای تیک زدن مرحله بعد</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {dish.recipeSteps.map((step, idx) => {
                        const isChecked = checkedSteps.includes(idx);
                        return (
                          <div 
                            key={idx} 
                            onClick={() => toggleStep(idx)}
                            className={`flex gap-6 p-6 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${isChecked ? 'bg-emerald-50 border-emerald-200 opacity-60 scale-[0.98]' : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-xl'}`}
                          >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isChecked ? 'bg-emerald-500 text-white' : 'bg-orange-100 text-orange-700'}`}>
                              {isChecked ? <Check size={24} strokeWidth={3} /> : <span className="text-xl font-black">{toPersianDigits(idx + 1)}</span>}
                            </div>
                            <div className="flex-grow space-y-2">
                              <p className={`text-lg leading-relaxed font-bold transition-all duration-500 ${isChecked ? 'text-emerald-800 line-through decoration-2' : 'text-slate-700'}`}>
                                {step}
                              </p>
                            </div>
                            <div className={`flex-shrink-0 self-center transition-all duration-500 ${isChecked ? 'text-emerald-500' : 'text-slate-200'}`}>
                              {isChecked ? <CheckSquare size={28} /> : <Square size={28} />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {checkedSteps.length === dish.recipeSteps.length && (
                      <div className="bg-emerald-500 p-10 rounded-[3rem] text-center space-y-4 animate-bounce mt-12 shadow-2xl">
                        <div className="w-20 h-20 bg-white text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                          <Trophy size={40} />
                        </div>
                        <h4 className="text-3xl font-black text-white">نوش جان!</h4>
                        <p className="text-white/90 font-bold">شما تمام مراحل پخت را با موفقیت انجام دادید.</p>
                        <button onClick={onClose} className="bg-white text-emerald-600 px-8 py-3 rounded-2xl font-black hover:bg-emerald-50 transition-colors">بستن و بازگشت</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                    <AlertCircle size={64} className="text-slate-300 mb-6" />
                    <h3 className="text-2xl font-black text-slate-400">دستور پخت موجود نیست</h3>
                    <p className="text-slate-400 font-bold mt-2">برای این غذا هنوز دستور پخت مرحله‌به‌مرحله ثبت نشده است.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isTimerOverlayOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-white/10 backdrop-blur-xl"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <div 
            className="w-full max-w-md bg-slate-900/90 text-white p-8 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col gap-6 transform transition-all animate-slide-down"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-500 rounded-2xl shadow-lg">
                  <AlarmClock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black">تایمر</h3>
                </div>
              </div>
              <button 
                onClick={() => setIsTimerOverlayOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col items-center py-4">
              <span className="text-6xl font-mono font-black tabular-nums tracking-tighter">
                {timerSeconds > 0 ? formatTime(timerSeconds) : `${toPersianDigits(timerInput)}:۰۰`}
              </span>
              <div className="flex items-center gap-8 mt-6">
                <button 
                  onClick={() => setTimerInput(prev => Math.min(120, prev + 1))}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
                >
                  <Plus size={24} />
                </button>
                <div className="text-center">
                  <span className="text-sm font-black text-slate-400">زمان تنظیمی</span>
                  <div className="text-xl font-black">{toPersianDigits(timerInput)} دقیقه</div>
                </div>
                <button 
                  onClick={() => setTimerInput(prev => Math.max(1, prev - 1))}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
                >
                  <Minus size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {isAlarmPlaying ? (
                <button 
                  onClick={stopAlarm}
                  className="col-span-2 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[1.75rem] font-black text-lg shadow-xl animate-pulse transition-all active:scale-95"
                >
                  قطع صدای زنگ
                </button>
              ) : (
                <>
                  {!isTimerRunning ? (
                    <button 
                      onClick={startTimer}
                      className="py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[1.75rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
                    >
                      <Play size={24} fill="currentColor" />
                      شروع
                    </button>
                  ) : (
                    <button 
                      onClick={pauseTimer}
                      className="py-5 bg-amber-500 hover:bg-amber-600 text-white rounded-[1.75rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
                    >
                      <Pause size={24} fill="currentColor" />
                      توقف
                    </button>
                  )}
                  <button 
                    onClick={resetTimer}
                    className="py-5 bg-slate-700 hover:bg-slate-600 text-white rounded-[1.75rem] font-black text-lg shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95"
                  >
                    <RotateCcw size={24} />
                    ریست
                  </button>
                </>
              )}
            </div>

            <button 
              onClick={() => setIsTimerOverlayOpen(false)}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-2xl font-black text-sm transition-all border border-white/5"
            >
              بستن پنجره تایمر
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default RecipeModal;
