
import React, { useState } from 'react';
import { Lock, Mail, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { UserService } from '../../services/userService';
import { UserProfile } from '../../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

type AuthMode = 'login' | 'register' | 'verify';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('لطفا اطلاعات را کامل وارد کنید.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = UserService.login(formData.username, formData.password);
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        setError(result.message || 'اطلاعات ورود اشتباه است.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleRegisterStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.username || !formData.password || !formData.email) {
      setError('لطفا تمام فیلدها را تکمیل کنید.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const result = UserService.register({
        username: formData.username,
        code: formData.password,
        fullName: formData.fullName,
        email: formData.email
      });
      if (result.success && result.user) onLogin(result.user);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans dir-rtl text-right">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
        
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 p-12 flex-col justify-between text-white relative">
          <div className="relative z-10">
            <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh-app" className="w-24 h-24 object-contain mb-6 mix-blend-lighten" />
            <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">Noosh-app</h1>
            <p className="text-teal-100 text-lg font-bold">همراه سلامتی و آسایش شما</p>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-sm font-medium bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="text-teal-300" size={24} />
              <div><p className="text-white">امنیت و حریم خصوصی شما اولویت ماست</p></div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="md:hidden flex flex-col items-center mb-8">
             <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Noosh-app" className="w-16 h-16 object-contain mb-2" />
             <h1 className="text-2xl font-black text-teal-800 uppercase">Noosh-app</h1>
             <p className="text-xs text-gray-500 font-bold">همراه سلامتی و آسایش شما</p>
          </div>

          {mode === 'login' && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black text-gray-800 mb-8">ورود به حساب</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-right">
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 mr-1">نام کاربری یا ایمیل</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={formData.username} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none transition-all text-black font-black text-left dir-ltr" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-600 mr-1">رمز عبور</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none transition-all text-black font-black text-left dir-ltr" 
                  />
                </div>
                {error && <p className="text-rose-600 text-sm font-black flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center disabled:opacity-70 mt-2">
                  {isLoading ? <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span> : 'ورود به اپلیکیشن'}
                </button>
              </form>

              <div className="relative my-8 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <span className="relative px-4 bg-white text-gray-400 text-xs font-black uppercase tracking-widest">یا</span>
              </div>

              <button className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-slate-100 rounded-2xl font-black text-slate-800 hover:bg-slate-50 transition-all">
                <GoogleIcon />
                <span>ورود با اکانت گوگل</span>
              </button>

              <div className="mt-8 text-center text-sm text-gray-500 font-bold">حساب ندارید؟ <button onClick={() => setMode('register')} className="text-teal-600 font-black">ثبت‌نام رایگان</button></div>
            </div>
          )}

          {mode === 'register' && (
            <div className="animate-in fade-in slide-in-from-right duration-500 text-right">
              <button onClick={() => setMode('login')} className="flex items-center gap-1 text-gray-400 text-sm font-black mb-4"><ArrowRight size={16} /> بازگشت به ورود</button>
              <h2 className="text-3xl font-black text-gray-800 mb-6">ساخت حساب جدید</h2>
              <form onSubmit={handleRegisterStep1} className="space-y-4">
                <input type="text" name="fullName" placeholder="نام و نام خانوادگی" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none text-black font-black" />
                <input type="text" name="username" placeholder="نام کاربری" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none text-black font-black text-left dir-ltr" />
                <input type="email" name="email" placeholder="ایمیل" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none text-black font-black text-left dir-ltr" />
                <input type="password" name="password" placeholder="رمز عبور" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border-2 border-slate-200 focus:border-teal-500 rounded-xl outline-none text-black font-black text-left dir-ltr" />
                {error && <p className="text-rose-600 text-sm font-black">{error}</p>}
                <button type="submit" disabled={isLoading} className="w-full bg-teal-600 text-white font-black py-4 rounded-2xl shadow-lg mt-4">ثبت‌نام و شروع</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
