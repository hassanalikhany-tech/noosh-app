
import React, { useState, useEffect } from 'react';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2, Phone, CheckSquare, Square, ScanFace, CheckCircle2 } from 'lucide-react';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

type AuthMode = 'login' | 'register' | 'forgot-password';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // وضعیت فعال بودن بیومتریک در حافظه
  const [isBiometricActive] = useState(localStorage.getItem('noosh_biometric_active') === 'true');
  const [bioStatus, setBioStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem('noosh_saved_email');
    const savedPassword = localStorage.getItem('noosh_saved_password');
    const savedRemember = localStorage.getItem('noosh_remember_me') === 'true';

    if (savedRemember && savedEmail && savedPassword) {
      setFormData(prev => ({ ...prev, email: savedEmail, password: savedPassword }));
      setRememberMe(true);
    }
  }, []);

  // تابع اصلی برای بیدار کردن سخت‌افزار گوشی با لمس کاربر
  const handleTriggerBiometric = async () => {
    if (!isBiometricActive) return;
    
    setBioStatus('scanning');
    try {
      // این خط مستقیماً سخت‌افزار FaceID/اثرانگشت را فعال می‌کند
      const result = await UserService.loginWithBiometric();
      
      if (result.success && result.user) {
        setBioStatus('success');
        // وقفه کوتاه برای نمایش تیک سبز
        setTimeout(() => onLogin(result.user!), 600);
      } else {
        setBioStatus('idle');
        setError(result.message || 'تایید هویت انجام نشد.');
      }
    } catch (e) {
      setBioStatus('idle');
      setError('خطا در برقراری ارتباط با سنسور گوشی');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;
    setIsGoogleLoading(true);
    try {
      const result = await UserService.loginWithGoogle();
      if (result.success && result.user) onLogin(result.user);
      else setIsGoogleLoading(false);
    } catch (err) {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (mode === 'forgot-password') {
      setIsLoading(true);
      const res = await UserService.sendResetPassword(formData.email);
      setSuccessMsg(res.message);
      setIsLoading(false);
      return;
    }

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError('لطفاً ایمیل و رمز عبور را وارد کنید.');
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (mode === 'login') {
        result = await UserService.login(email, password);
      } else {
        result = await UserService.register({ ...formData, email });
      }

      if (result.success && result.user) {
        localStorage.setItem('noosh_saved_email', email);
        localStorage.setItem('noosh_saved_password', password);
        onLogin(result.user);
      } else {
        setError(result.message || 'خطا در عملیات');
      }
    } catch (err) {
      setError('خطای سیستمی');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950 font-sans overflow-hidden dir-rtl p-0 md:p-6 relative">
      <div className="bg-noosh-pattern opacity-10 absolute inset-0 pointer-events-none"></div>
      
      <div className="w-full h-full md:h-auto md:max-w-4xl bg-white md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-white/5 relative z-10">
        
        {/* بخش لوگو (سمت چپ در دسکتاپ) */}
        <div className="hidden md:flex md:w-1/2 bg-slate-950 p-12 flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black opacity-70"></div>
          <div className="relative z-10 text-center space-y-8">
            <div className="animate-float">
               <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-48 h-48 mx-auto object-contain drop-shadow-[0_0_25px_rgba(45,212,191,0.5)]" />
            </div>
            <div>
              <div className="flex flex-row items-baseline justify-center gap-3" style={{ direction: 'ltr' }}>
                 <span className="text-6xl font-black tracking-tighter italic text-white leading-none uppercase">NOOSH</span>
                 <span className="text-3xl font-black text-teal-500 italic uppercase tracking-widest">APP</span>
              </div>
              <p className="text-slate-400 font-bold mt-6 text-lg uppercase tracking-wide">همراه سلامتی و آسایش شما</p>
            </div>
          </div>
        </div>

        {/* بخش فرم ورود (سمت راست) */}
        <div className="w-full md:w-1/2 h-full p-6 sm:p-10 flex flex-col justify-center bg-white relative">
          
          {/* دکمه اسکن هوشمند - لایه روی فرم برای فعالسازی قطعی سنسور */}
          {isBiometricActive && mode === 'login' && (
            <div className="mb-8 p-6 bg-teal-50 rounded-3xl border-2 border-teal-100 flex flex-col items-center gap-4 animate-enter relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 opacity-20 group-hover:opacity-100 animate-pulse transition-opacity"></div>
               <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-2xl shadow-sm">
                    {bioStatus === 'success' ? <CheckCircle2 className="text-emerald-500" size={32} /> : <ScanFace className="text-teal-600" size={32} />}
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm font-black text-slate-800">ورود سریع با تشخیص چهره</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">برای فعال‌سازی سنسور گوشی دکمه زیر را لمس کنید</p>
                  </div>
               </div>
               <button 
                type="button"
                onClick={handleTriggerBiometric}
                disabled={bioStatus !== 'idle'}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-black shadow-lg shadow-teal-100 transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                 {bioStatus === 'scanning' ? <Loader2 size={16} className="animate-spin" /> : <ScanFace size={16} />}
                 {bioStatus === 'scanning' ? 'در حال تشخیص...' : 'لمس کنید و وارد شوید'}
               </button>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-black text-slate-800">
              {mode === 'login' ? 'خوش آمدید' : mode === 'register' ? 'ساخت حساب کاربری' : 'بازیابی رمز عبور'}
            </h2>
            <p className="text-slate-400 text-xs font-bold mt-1">NOOSH PREMIUM ACCESS</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 pr-2">نام و نام خانوادگی</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-sm" />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1"><Mail size={12}/> آدرس ایمیل</label>
              <input type="email" name="email" dir="ltr" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="example@gmail.com" />
            </div>

            {mode !== 'forgot-password' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1"><Lock size={12}/> رمز عبور</label>
                <input type="password" name="password" dir="ltr" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="••••••••" />
              </div>
            )}

            {error && <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black border border-rose-100 flex items-center gap-2"><AlertCircle size={14} /> {error}</div>}
            {successMsg && <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black border border-emerald-100">{successMsg}</div>}

            <button type="submit" disabled={isLoading} className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <span>{mode === 'login' ? 'ورود به حساب' : mode === 'register' ? 'ثبت‌نام' : 'ارسال لینک'}</span>}
              {!isLoading && <ArrowRight size={18} />}
            </button>

            {mode === 'login' && (
              <button type="button" onClick={handleGoogleLogin} className="w-full bg-white hover:bg-slate-50 text-slate-700 font-black py-4 rounded-xl border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2 mt-2">
                <GoogleIcon />
                <span className="text-[10px]">ورود با گوگل</span>
              </button>
            )}

            <div className="pt-4 text-center">
              <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-teal-600 font-black text-[11px] underline-offset-4 hover:underline">
                {mode === 'login' ? 'هنوز ثبت‌نام نکرده‌اید؟ ساخت حساب' : 'قبلاً ثبت‌نام کرده‌اید؟ وارد شوید'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
