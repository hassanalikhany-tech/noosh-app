
import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2, Sparkles, Phone, CheckCircle2, RefreshCw } from 'lucide-react';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

type AuthMode = 'login' | 'register';

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
  const [isResending, setIsResending] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResend, setShowResend] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleResendEmail = async () => {
    if (!formData.email || !formData.password) {
      setError("لطفاً ابتدا ایمیل و رمز عبور خود را وارد کنید.");
      return;
    }
    setIsResending(true);
    const result = await UserService.resendVerificationEmail(formData.email, formData.password);
    if (result.success) {
      setSuccessMessage(result.message);
      setShowResend(false);
    } else {
      setError(result.message);
    }
    setIsResending(false);
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;
    setError('');
    setIsGoogleLoading(true);
    try {
      const result = await UserService.loginWithGoogle();
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        // نمایش مستقیم پیام خطای دریافتی از سرویس (شامل راهنمای دامنه)
        setError(result.message || 'خطا در ورود با گوگل');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setError('خطا در برقراری ارتباط با گوگل.');
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    const email = formData.email.trim();
    const password = formData.password;

    setError('');
    setSuccessMessage('');
    setShowResend(false);

    if (!email) {
      setError('لطفاً آدرس ایمیل خود را وارد کنید.');
      return;
    }
    if (!password) {
      setError('لطفاً رمز عبور خود را وارد کنید.');
      return;
    }

    if (mode === 'register' && !formData.fullName.trim()) {
      setError('نام و نام خانوادگی الزامی است.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const result = await UserService.login(email, password);
        if (result.success && result.user) {
          onLogin(result.user);
        } else {
          setError(result.message || 'ایمیل یا رمز عبور اشتباه است.');
          if (result.needsVerification) setShowResend(true);
        }
      } else {
        const result = await UserService.register({ ...formData, email });
        if (result.success) {
          setSuccessMessage('حساب شما ساخته شد! اکنون می‌توانید وارد شوید.');
          setMode('login');
          setFormData(prev => ({ ...prev, password: '' }));
        } else {
          setError(result.message || 'خطا در ثبت‌نام');
        }
      }
    } catch (err: any) {
      console.error("Critical Auth Error:", err);
      setError('خطای سیستمی: ' + (err.message || 'نامشخص'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950 font-sans overflow-hidden dir-rtl p-0 md:p-6 relative">
      <div className="bg-noosh-pattern" style={{ opacity: 0.08 }}></div>
      
      <div className="w-full h-full md:h-auto md:max-w-4xl bg-white md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-white/5 relative z-10">
        
        {/* بخش برندینگ */}
        <div className="hidden md:flex md:w-1/2 bg-slate-950 p-12 flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black opacity-70"></div>
          <div className="bg-noosh-pattern" style={{ opacity: 0.1 }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_8s_infinite] pointer-events-none"></div>
          
          <div className="relative z-10 text-center space-y-8">
            <div className="animate-float">
               <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-48 h-48 object-contain drop-shadow-[0_0_25px_rgba(45,212,191,0.5)]" />
            </div>
            <div>
              <div className="flex flex-row items-baseline justify-center gap-3" style={{ direction: 'ltr' }}>
                 <span className="text-6xl font-black tracking-tighter italic text-white leading-none uppercase">NOOSH</span>
                 <span className="text-3xl font-black text-teal-500 italic uppercase tracking-widest">APP</span>
              </div>
              <p className="text-slate-400 font-bold mt-6 leading-relaxed text-lg uppercase tracking-wide">همراه سلامتی و آسایش شما</p>
            </div>
          </div>
        </div>

        {/* بخش فرم */}
        <div className="w-full md:w-1/2 h-full p-6 sm:p-10 flex flex-col justify-center bg-white relative overflow-hidden">
          
          <div className="md:hidden flex flex-col items-center mb-6 gap-2 animate-enter flex-shrink-0">
            <div className="animate-float h-24 flex items-center justify-center">
              <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
            </div>
            <div className="text-center">
               <div className="flex flex-row items-baseline justify-center gap-1.5" style={{ direction: 'ltr' }}>
                  <span className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">NOOSH</span>
                  <span className="text-xl font-black text-teal-600 italic uppercase">APP</span>
               </div>
            </div>
          </div>

          <div className="mb-4 md:mb-8 text-center md:text-right flex-shrink-0">
            <div className="inline-flex md:flex items-center justify-center md:justify-start gap-2 text-teal-600">
              <span className="animate-pulse"><Sparkles size={18} /></span>
              <span className="text-[11px] font-black uppercase tracking-widest">خوش آمدید | Welcome</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 flex-grow md:flex-grow-0 overflow-y-auto pr-1 relative z-10">
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                    <User size={12}/> نام و نام خانوادگی
                  </label>
                  <input 
                    type="text" 
                    name="fullName" 
                    autoComplete="name"
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-slate-800 placeholder:text-slate-400" 
                    placeholder="مثلاً: حمید رضایی" 
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                    <Phone size={12}/> شماره همراه
                  </label>
                  <input 
                    type="tel" 
                    name="phoneNumber" 
                    autoComplete="tel"
                    value={formData.phoneNumber} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left dir-ltr text-slate-800 placeholder:text-slate-400" 
                    placeholder="0912xxxxxxx" 
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                <Mail size={12}/> آدرس ایمیل
              </label>
              <input 
                type="email" 
                name="email" 
                autoComplete="email"
                value={formData.email} 
                onChange={handleInputChange} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left dir-ltr text-slate-800 placeholder:text-slate-400" 
                placeholder="name@gmail.com" 
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                <Lock size={12}/> رمز عبور
              </label>
              <input 
                type="password" 
                name="password" 
                autoComplete={mode === 'login' ? "current-password" : "new-password"}
                value={formData.password} 
                onChange={handleInputChange} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left dir-ltr text-slate-800 placeholder:text-slate-400" 
                placeholder="••••••••" 
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black space-y-2 border border-rose-100 animate-enter flex flex-col">
                <div className="flex items-center gap-2">
                   <AlertCircle size={14} className="flex-shrink-0" /> 
                   <span className="leading-relaxed">{error}</span>
                </div>
                {showResend && (
                  <button 
                    type="button" 
                    onClick={handleResendEmail}
                    disabled={isResending}
                    className="flex items-center gap-1 text-teal-600 hover:underline mt-1 pr-1"
                  >
                    {isResending ? <Loader2 size={12} className="animate-spin"/> : <RefreshCw size={12}/>}
                    ارسال مجدد لینک تایید به ایمیل
                  </button>
                )}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl text-[10px] font-black flex items-start gap-2 border border-teal-100 animate-enter">
                <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" /> 
                <span className="leading-relaxed">{successMessage}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading} 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-3.5 rounded-xl shadow-xl shadow-teal-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 group mt-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span>{mode === 'login' ? 'ورود به حساب' : 'تایید و ثبت‌نام'}</span>
                  <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="relative py-2 flex items-center justify-center">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
               <span className="relative bg-white px-3 text-slate-400 text-[9px] font-bold uppercase">یا</span>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-black py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <Loader2 size={20} className="animate-spin text-teal-600" />
              ) : (
                <>
                  <GoogleIcon />
                  <span className="text-xs">ورود با حساب گوگل</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center flex-shrink-0">
              <p className="text-slate-400 text-[11px] font-bold">
                {mode === 'login' ? 'هنوز عضو نشده‌اید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}
                <button 
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')} 
                  className="text-teal-600 font-black mr-1.5 hover:text-teal-700 transition-colors"
                >
                  {mode === 'login' ? 'ساخت حساب جدید' : 'وارد شوید'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
