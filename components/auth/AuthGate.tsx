
import React, { useState, useEffect } from 'react';
import { Smartphone, ShieldCheck, Loader2, ArrowLeft, ArrowRight, AlertCircle, User, UserPlus, Info, Ticket, ShieldAlert, MonitorOff } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { SecurityService } from '../../services/securityService';

interface AuthGateProps {
  children: React.ReactNode;
}

type AuthStep = 'mobile' | 'registration' | 'otp' | 'device_check';

const RESEND_COOLDOWN = 60;

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [step, setStep] = useState<AuthStep>('mobile');
  const [mobile, setMobile] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const [tempAuthData, setTempAuthData] = useState<any>(null);

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => document.getElementById('otp-input-0')?.focus(), 100);
    }
  }, [step]);

  useEffect(() => {
    const timer = setInterval(() => setResendTimer(prev => prev > 0 ? prev - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const verify = async () => {
      const { isValid, user } = await AuthService.checkSession();
      setIsAuthenticated(isValid && user?.isActive !== false);
    };
    verify();

    // شنود رویداد خروج برای بازگشت به صفحه لاگین
    const handleLogoutEvent = () => {
      setIsAuthenticated(false);
      setStep('mobile');
      setOtp(['', '', '', '', '']);
    };

    window.addEventListener('auth-logout', handleLogoutEvent);
    return () => window.removeEventListener('auth-logout', handleLogoutEvent);
  }, []);

  const validateName = (name: string) => /^[\u0600-\u06FF\s]+$/.test(name) && name.length >= 2;

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 11) return setError('شماره موبایل نامعتبر است.');
    setIsLoading(true);
    setError('');
    try {
      const { exists } = await AuthService.checkUserExists(mobile);
      setIsNewUser(!exists);
      const res = await AuthService.sendOtp(mobile);
      if (res.success) {
        setStep(exists ? 'otp' : 'registration');
        if (exists) setResendTimer(RESEND_COOLDOWN);
      } else setError(res.message);
    } catch (err) { setError('خطا در برقراری ارتباط.'); }
    finally { setIsLoading(false); }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(firstName) || !validateName(lastName)) return setError('لطفاً نام و نام خانوادگی را فقط با حروف فارسی وارد کنید.');
    setError('');
    setStep('otp');
    setResendTimer(RESEND_COOLDOWN);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 5) return setError('کد تایید ۵ رقمی است.');
    setIsLoading(true);
    setError('');
    try {
      const res = await AuthService.verifyOtp(mobile, code, isNewUser ? { firstName, lastName, referralCode } : undefined);
      if (res.success && res.user) {
        // مرحله جدید: بررسی امنیتی دستگاه
        const deviceCheck = await SecurityService.validateDevice(res.user.uid, btoa(navigator.userAgent).substring(0, 16));
        if (deviceCheck.isAllowed) {
            setIsAuthenticated(true);
        } else {
            setTempAuthData(res.user);
            setStep('device_check');
        }
      }
      else setError(res.message || 'کد وارد شده صحیح نیست.');
    } catch (err) { setError('خطا در تایید نشست.'); }
    finally { setIsLoading(false); }
  };

  const handleReplaceDevice = async () => {
    if (!tempAuthData) return;
    setIsLoading(true);
    try {
        await SecurityService.replaceActiveDevice(tempAuthData.uid, btoa(navigator.userAgent).substring(0, 16));
        setIsAuthenticated(true);
    } catch (e) {
        setError("خطا در تعویض دستگاه.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const val = value.replace(/[^0-9]/g, '');
    if (!val && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    if (val && index < 4) document.getElementById(`otp-input-${index + 1}`)?.focus();
  };

  if (isAuthenticated === null) return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white dir-rtl">
      <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
      <p className="font-black animate-pulse">در حال بررسی امنیت حساب...</p>
    </div>
  );

  if (!isAuthenticated) return (
    <div className="h-screen w-full flex items-center justify-center metallic-navy p-4 dir-rtl overflow-hidden">
      <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl p-8 sm:p-12 animate-enter">
        <div className="flex flex-col items-center mb-10">
          <img src="https://i.ibb.co/gMDKtj4p/3.png" alt="Logo" className="w-20 h-20 animate-float" />
          <div className="mt-4 text-center">
             <div className="flex items-baseline gap-1" style={{ direction: 'ltr' }}>
                <span className="text-4xl font-black italic text-slate-900">NOOSH</span>
                <span className="text-xl font-black text-teal-600">APP</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase mt-1">همراه سلامت و آسایش شما</p>
          </div>
        </div>

        {step === 'mobile' && (
          <form onSubmit={handleMobileSubmit} className="space-y-6">
            <p className="text-slate-500 font-bold text-sm text-center">شماره موبایل ۱۱ رقمی خود را وارد کنید</p>
            <div className="relative group">
              <input type="tel" maxLength={11} value={mobile} onChange={e => setMobile(e.target.value.replace(/[^0-9]/g, ''))} className="w-full px-8 py-5 bg-slate-50 border-2 border-slate-100 rounded-[2rem] outline-none text-xl font-black text-center focus:border-teal-500 transition-all shadow-inner" placeholder="09xxxxxxxxx" required />
              <Smartphone className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
            </div>
            {error && <div className="p-4 bg-rose-50 text-rose-500 text-[11px] font-black rounded-2xl text-center border border-rose-100">{error}</div>}
            <button disabled={isLoading} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 active:scale-95 transition-all">
              {isLoading ? <Loader2 className="animate-spin" /> : 'تایید و مرحله بعد'} <ArrowRight size={22} />
            </button>
          </form>
        )}

        {step === 'registration' && (
          <form onSubmit={handleRegistrationSubmit} className="space-y-6 animate-enter">
            <div className="text-center mb-4"><h2 className="text-2xl font-black text-slate-800">خوش آمدید!</h2></div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex gap-3 items-start">
              <Info size={16} className="text-blue-500 shrink-0" />
              <p className="text-[11px] text-blue-800 font-bold">نام و فامیل خود را به <span className="underline">فارسی و واقعی</span> بنویسید (جهت تطبیق با واریزی‌ها).</p>
            </div>
            <div className="space-y-4">
              <div className="relative group">
                <input type="text" placeholder="نام (فارسی)" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-full px-8 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-black text-center focus:border-teal-500 transition-all" required />
                <UserPlus className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>
              <div className="relative group">
                <input type="text" placeholder="نام خانوادگی (فارسی)" value={lastName} onChange={e => setLastName(e.target.value)} className="w-full px-8 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-black text-center focus:border-teal-500 transition-all" required />
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>
              <div className="relative group">
                <input type="text" placeholder="کد معرف (اختیاری)" value={referralCode} onChange={e => setReferralCode(e.target.value.toUpperCase())} className="w-full px-8 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-black text-center focus:border-emerald-500 transition-all" />
                <Ticket className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              </div>
            </div>
            {error && <div className="p-4 bg-rose-50 text-rose-500 text-[11px] font-black rounded-2xl text-center border border-rose-100">{error}</div>}
            <button className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 transition-all">دریافت کد تایید <ArrowRight size={22} /></button>
            <button type="button" onClick={() => setStep('mobile')} className="w-full text-slate-400 font-bold text-xs py-2">اصلاح شماره موبایل</button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={handleVerify} className="space-y-8 animate-enter">
            <div className="text-center"><h2 className="text-3xl font-black text-slate-800">کد تایید</h2><p className="text-slate-500 font-bold text-sm">کد ۵ رقمی ارسال شده به {mobile} را وارد کنید</p></div>
            <div className="flex justify-center gap-3" style={{ direction: 'ltr' }}>
              {otp.map((digit, idx) => (
                <input key={idx} id={`otp-input-${idx}`} type="tel" maxLength={1} value={digit} onChange={e => handleOtpChange(idx, e.target.value)} onKeyDown={e => e.key === 'Backspace' && !otp[idx] && idx > 0 && document.getElementById(`otp-input-${idx - 1}`)?.focus()} className="w-12 h-16 sm:w-14 sm:h-20 bg-slate-50 border-2 border-slate-200 rounded-2xl text-3xl font-black text-center outline-none focus:border-teal-500 shadow-sm" />
              ))}
            </div>
            {error && <div className="p-4 bg-rose-50 text-rose-500 text-[11px] font-black rounded-2xl text-center border border-rose-100">{error}</div>}
            <button disabled={isLoading} className="w-full py-5 bg-teal-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 active:scale-95 transition-all">
              {isLoading ? <Loader2 className="animate-spin" /> : 'ورود به سامانه'} <ShieldCheck size={22} />
            </button>
            <div className="flex flex-col items-center gap-4">
              <button type="button" disabled={resendTimer > 0} onClick={handleMobileSubmit} className={`text-sm font-black transition-all ${resendTimer > 0 ? 'text-slate-300' : 'text-teal-600 hover:text-teal-800'}`}>
                {resendTimer > 0 ? `ارسال مجدد کد تا ${resendTimer.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d])} ثانیه` : 'دریافت مجدد کد تایید'}
              </button>
              <button type="button" onClick={() => { setStep('mobile'); setError(''); setOtp(['','','','','']); }} className="text-slate-400 font-bold text-sm flex items-center justify-center gap-2"><ArrowLeft size={16} /> اصلاح شماره موبایل</button>
            </div>
          </form>
        )}

        {step === 'device_check' && (
          <div className="space-y-8 animate-enter text-center">
            <div className="p-6 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><MonitorOff size={32}/></div>
                <h2 className="text-2xl font-black text-rose-900">حساب روی دستگاه دیگری فعال است</h2>
                <p className="text-sm font-bold text-rose-700 leading-relaxed">
                    مطابق قوانین اشتراک اپلیکیشن نوش، هر اکانت تنها می‌تواند روی یک دستگاه سخت‌افزاری فعال باشد.
                </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-right space-y-2">
                <div className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase"><Info size={14}/> راهنما</div>
                <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                    با کلیک روی دکمه زیر، دسترسی دستگاه قبلی لغو شده و این گوشی به عنوان دستگاه اصلی شما ثبت می‌گردد. این کار باعث خروج شما از گوشی قبلی خواهد شد.
                </p>
            </div>
            <div className="space-y-4">
                <button onClick={handleReplaceDevice} disabled={isLoading} className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-4 active:scale-95 transition-all shadow-xl">
                  {isLoading ? <Loader2 className="animate-spin" /> : 'غیرفعال‌سازی قبلی و جایگزینی'} <ShieldAlert size={22} />
                </button>
                <button onClick={() => setStep('mobile')} className="text-slate-400 font-bold text-sm">انصراف و خروج</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return <>{children}</>;
};

export default AuthGate;
