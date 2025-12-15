import React, { useState } from 'react';
import { Lock, User, Mail, Phone, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
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
  
  // Form States
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    confirmPassword: ''
  });

  const [verifyCode, setVerifyCode] = useState(['', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulation of Google Auth Flow
    setTimeout(() => {
      // Try to find if this "Google User" already exists or create new
      const mockGoogleUser = {
        username: 'google_user_' + Math.floor(Math.random() * 1000),
        code: 'google-auth-token',
        fullName: 'کاربر گوگل',
        email: 'user@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
      };

      // In a real app, this would verify the token with backend
      // Here we just register/login directly
      const result = UserService.register(mockGoogleUser);
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        // If already exists (based on username logic in mock), try login
        // But since our mock uses random username, it acts as new.
        // Let's assume successful login
        const loginResult = UserService.login(mockGoogleUser.username, mockGoogleUser.code);
        if(loginResult.success && loginResult.user) {
            onLogin(loginResult.user);
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('لطفا نام کاربری/ایمیل و رمز عبور را وارد کنید.');
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
      setError('لطفا تمام فیلدهای ستاره‌دار را تکمیل کنید.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند.');
      return;
    }
    if (formData.password.length < 4) {
      setError('رمز عبور باید حداقل ۴ کاراکتر باشد.');
      return;
    }

    // Simulate sending email/code
    setIsLoading(true);
    setTimeout(() => {
      const code = Math.floor(10000 + Math.random() * 90000).toString(); // 5 digit code
      setGeneratedCode(code);
      setIsLoading(false);
      setMode('verify');
      // In a real app, this would be an email. Here we alert it for the demo.
      alert(`کد تایید شما: ${code}`); 
    }, 1000);
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputCode = verifyCode.join('');
    
    if (inputCode === generatedCode) {
      setIsLoading(true);
      setTimeout(() => {
        const result = UserService.register({
          username: formData.username,
          code: formData.password,
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone
        });

        if (result.success && result.user) {
          onLogin(result.user);
        } else {
          setError(result.message || 'خطا در ساخت حساب.');
          setMode('register');
        }
        setIsLoading(false);
      }, 1000);
    } else {
      setError('کد تایید اشتباه است.');
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newCode = [...verifyCode];
    newCode[index] = value;
    setVerifyCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans dir-rtl">
      
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 min-h-[600px]">
        
        {/* Left Side (Image/Brand) */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-600 to-teal-800 p-12 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/20">
               <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tight">به نوش خوش آمدید</h1>
            <p className="text-teal-100 text-lg leading-relaxed font-medium">
              همراه هوشمند آشپزی شما. برنامه‌ریزی کنید، لذت ببرید و سالم بمانید.
            </p>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-sm font-medium bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
              <ShieldCheck className="text-teal-300" size={24} />
              <div>
                <p className="text-white">امنیت تضمین شده</p>
                <p className="text-teal-200 text-xs mt-0.5">اطلاعات شما رمزنگاری شده و محفوظ است.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (Forms) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-8">
             <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center">
                <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-12 h-12 object-contain" />
             </div>
          </div>

          {/* Mode: Login */}
          {mode === 'login' && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-black text-gray-800 mb-2">ورود به حساب</h2>
              <p className="text-gray-500 mb-8">برای استفاده از امکانات وارد شوید.</p>

              <button 
                onClick={handleGoogleLogin}
                className="w-full py-3.5 border-2 border-gray-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all font-bold text-gray-700 mb-6 group"
              >
                <GoogleIcon />
                <span className="group-hover:text-gray-900">ورود با حساب گوگل</span>
              </button>

              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">یا ورود با ایمیل</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">نام کاربری یا ایمیل</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr placeholder:text-right"
                      placeholder="user@example.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">رمز عبور</label>
                  <div className="relative">
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr placeholder:text-right"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>

                {error && <p className="text-rose-500 text-sm font-bold flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                  ) : 'ورود'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm font-medium text-gray-500">
                حساب کاربری ندارید؟ 
                <button onClick={() => setMode('register')} className="text-teal-600 hover:text-teal-700 font-bold mr-1">
                  ثبت نام کنید
                </button>
              </div>
            </div>
          )}

          {/* Mode: Register */}
          {mode === 'register' && (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <button onClick={() => setMode('login')} className="flex items-center gap-1 text-gray-400 hover:text-gray-600 text-sm font-bold mb-4 transition-colors">
                <ArrowRight size={16} /> بازگشت
              </button>
              <h2 className="text-3xl font-black text-gray-800 mb-2">ساخت حساب کاربری</h2>
              <p className="text-gray-500 mb-6">اطلاعات خود را وارد کنید.</p>

              <form onSubmit={handleRegisterStep1} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 mr-1">نام و نام خانوادگی <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 mr-1">نام کاربری <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">آدرس ایمیل <span className="text-rose-500">*</span></label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr"
                      placeholder="user@example.com"
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 mr-1">شماره موبایل (اختیاری)</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr"
                      placeholder="0912..."
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 mr-1">رمز عبور <span className="text-rose-500">*</span></label>
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 mr-1">تکرار رمز عبور <span className="text-rose-500">*</span></label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-teal-500 rounded-xl outline-none transition-all font-medium text-gray-800 text-left dir-ltr"
                    />
                  </div>
                </div>

                {error && <p className="text-rose-500 text-sm font-bold flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                  {isLoading ? (
                    <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                  ) : 'ادامه و دریافت کد تایید'}
                </button>
              </form>
            </div>
          )}

          {/* Mode: Verify */}
          {mode === 'verify' && (
            <div className="animate-in fade-in slide-in-from-right duration-500 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">تایید ایمیل</h2>
              <p className="text-gray-500 mb-8 text-sm">
                کد ۵ رقمی ارسال شده به <strong>{formData.email}</strong> را وارد کنید.
              </p>

              <form onSubmit={handleVerifySubmit} className="space-y-8">
                <div className="flex justify-center gap-3 dir-ltr">
                  {verifyCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`code-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(idx, e.target.value)}
                      className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold text-teal-600 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 transition-all outline-none"
                    />
                  ))}
                </div>

                {error && <p className="text-rose-500 text-sm font-bold">{error}</p>}

                <div className="space-y-3">
                  <button 
                    type="submit" 
                    disabled={isLoading || verifyCode.some(c => !c)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                    ) : 'تایید و ساخت حساب'}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold transition-colors"
                  >
                    اصلاح اطلاعات
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;