
import React, { useState, useEffect } from 'react';
import { Lock, Mail, User, ArrowRight, AlertCircle, Loader2, Sparkles, Phone, CheckSquare, Square, Info, KeyRound, ArrowLeft } from 'lucide-react';
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
  const [detailedError, setDetailedError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  
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

  useEffect(() => {
    setError('');
    setSuccessMsg('');
    setDetailedError(null);
    if (mode === 'register') {
      setFormData(prev => ({ ...prev, fullName: '', phoneNumber: '', confirmPassword: '' }));
    }
  }, [mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error || successMsg) {
      setError('');
      setSuccessMsg('');
      setDetailedError(null);
    }
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
        setError(result.message || 'خطا در ورود با گوگل');
        setIsGoogleLoading(false);
      }
    } catch (err: any) {
      setError('خطا در برقراری ارتباط با گوگل.');
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setError('لطفاً ایمیل خود را وارد کنید.');
      return;
    }
    setIsLoading(true);
    const result = await UserService.sendResetPassword(formData.email);
    setIsLoading(false);
    if (result.success) {
      setSuccessMsg(result.message);
    } else {
      setError(result.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot-password') return handleResetPassword(e);
    if (isLoading) return;
    
    const email = formData.email.trim();
    const password = formData.password;

    setError('');

    if (!email || !password) {
      setError('لطفاً ایمیل و رمز عبور را وارد کنید.');
      return;
    }

    if (mode === 'register') {
      if (!formData.fullName.trim() || !formData.phoneNumber.trim()) {
        setError('تکمیل تمامی فیلدها الزامی است.');
        return;
      }
      if (password !== formData.confirmPassword) {
        setError('رمز عبور و تکرار آن با هم مطابقت ندارند.');
        return;
      }
      if (password.length < 6) {
        setError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
        return;
      }
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
        if (mode === 'login' && rememberMe) {
          localStorage.setItem('noosh_saved_email', email);
          localStorage.setItem('noosh_saved_password', password);
          localStorage.setItem('noosh_remember_me', 'true');
        }
        onLogin(result.user);
      } else {
        setError(result.message || 'خطایی رخ داده است.');
      }
    } catch (err: any) {
      setError('خطای سیستمی: ' + (err.message || 'نامشخص'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-950 font-sans overflow-hidden dir-rtl p-0 md:p-6 relative">
      <div className="bg-noosh-pattern opacity-10 absolute inset-0 pointer-events-none"></div>
      
      <div className="w-full h-full md:h-auto md:max-w-4xl bg-white md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row border border-white/5 relative z-10">
        
        {/* بخش برندینگ */}
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
              <p className="text-slate-400 font-bold mt-6 leading-relaxed text-lg uppercase tracking-wide">همراه سلامتی و آسایش شما</p>
            </div>
          </div>
        </div>

        {/* بخش فرم */}
        <div className="w-full md:w-1/2 h-full p-6 sm:p-10 flex flex-col justify-center bg-white relative overflow-hidden">
          
          <div className="md:hidden flex flex-col items-center mb-6 gap-2 flex-shrink-0">
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh Logo" className="w-20 h-20 object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]" />
            <div className="flex flex-row items-baseline justify-center gap-1.5" style={{ direction: 'ltr' }}>
              <span className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">NOOSH</span>
              <span className="text-xl font-black text-teal-600 italic uppercase">APP</span>
            </div>
          </div>

          <div className="mb-4 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-teal-600">
              <Sparkles size={18} />
              <span className="text-[11px] font-black uppercase tracking-widest">
                {mode === 'login' ? 'ورود به حساب' : mode === 'register' ? 'ساخت حساب کاربری' : 'بازیابی رمز عبور'}
              </span>
            </div>
          </div>

          {mode === 'register' && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 animate-enter">
              <Info className="text-blue-500 shrink-0" size={18} />
              <p className="text-[10px] text-blue-800 font-black leading-relaxed">
                <span className="block text-[11px] mb-0.5">توجه بسیار مهم:</span>
                لطفاً از ایمیل معتبر و فعال استفاده کنید. لینک‌های بازیابی و فاکتورها به این آدرس ارسال خواهد شد.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 flex-grow md:flex-grow-0 overflow-y-auto pr-1">
            {mode === 'register' && (
              <>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                    <User size={12}/> نام و نام خانوادگی
                  </label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm" placeholder="حمید رضایی" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                    <Phone size={12}/> شماره همراه
                  </label>
                  <input type="tel" name="phoneNumber" dir="ltr" value={formData.phoneNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="0912xxxxxxx" />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                <Mail size={12}/> آدرس ایمیل
              </label>
              <input type="email" name="email" dir="ltr" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="example@gmail.com" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                  <Lock size={12}/> رمز عبور
                </label>
                <input type="password" name="password" dir="ltr" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="••••••••" />
              </div>

              {mode === 'register' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 pr-2 flex items-center gap-1">
                    <Lock size={12}/> تکرار رمز عبور
                  </label>
                  <input type="password" name="confirmPassword" dir="ltr" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-teal-500 focus:bg-white rounded-xl outline-none transition-all font-bold text-sm text-left" placeholder="••••••••" />
                </div>
              )}
            </div>

            {mode === 'login' && (
              <div className="flex items-center justify-between px-1">
                <button type="button" onClick={() => setRememberMe(!rememberMe)} className="flex items-center gap-2 text-slate-500">
                  {rememberMe ? <CheckSquare size={16} className="text-teal-600" /> : <Square size={16} />}
                  <span className="text-[10px] font-black">مرا به خاطر بسپار</span>
                </button>
                <button type="button" onClick={() => setMode('forgot-password')} className="text-[10px] font-black text-teal-600 hover:text-teal-700">فراموشی رمز؟</button>
              </div>
            )}

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black flex items-center gap-2 border border-rose-100 animate-enter">
                <AlertCircle size={14} className="shrink-0" /> <span>{error}</span>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button 
                type="submit" 
                disabled={isLoading || isGoogleLoading} 
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-3.5 rounded-xl shadow-xl shadow-teal-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 group"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                  <>
                    <span>{mode === 'login' ? 'ورود به حساب' : mode === 'register' ? 'تایید و ثبت‌نام' : 'ارسال لینک بازیابی'}</span>
                    <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {mode === 'login' && (
                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  disabled={isLoading || isGoogleLoading}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 font-black py-3.5 rounded-xl border border-slate-200 shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isGoogleLoading ? <Loader2 size={20} className="animate-spin" /> : <GoogleIcon />}
                  <span>ورود با حساب گوگل</span>
                </button>
              )}
            </div>

            <div className="pt-4 text-center">
              <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-teal-600 font-black text-[11px]">{mode === 'login' ? 'ساخت حساب جدید' : 'وارد شوید'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
