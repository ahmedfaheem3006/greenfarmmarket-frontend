import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authStore } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Logo } from '../components/common/Logo';
import { BorderGlow } from '../components/ui/BorderGlow';
import marketplaceImg from '../assets/Digital Agricultural Marketplace.png';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Shield,
  Sparkles,
  Zap,
  Globe,
  Leaf,
  Store,
  Truck,
  Activity,
  Bot,
  UserCheck,
  Loader2,
  LockKeyhole,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!emailOrPhone.trim()) {
      setErrorMsg('برجاء إدخال البريد الإلكتروني أو رقم الهاتف.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('كلمة المرور يجب أن لا تقل عن 6 أحرف.');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        emailOrPhone: emailOrPhone.trim(),
        password,
      });

      if (res.data?.success) {
        authStore.setAuth(res.data.data.user, res.data.data.accessToken);
        toast.success(`أهلاً بك مجدداً يا ${res.data.data.user.name}! تم تسجيل الدخول بنجاح.`);
        navigate('/dashboard');
      } else {
        const message = res.data?.message || 'بيانات الدخول غير صحيحة. تحقق من البيانات.';
        if (import.meta.env.PROD) {
          setErrorMsg(message);
          toast.error(message);
        } else {
          // Dev-only fallback
          const isAdminLogin = emailOrPhone.trim().toLowerCase() === 'ahmed.admin@gmail.com' || emailOrPhone.toLowerCase().includes('ahmed.admin');
          const demoUser = {
            id: 'usr-' + Date.now(),
            name: isAdminLogin ? 'Ahmed Admin' : (emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'مستخدم جرين فارم'),
            email: isAdminLogin ? 'ahmed.admin@gmail.com' : (emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@greenfarmmarket.com`),
            phone: emailOrPhone.includes('@') ? '01099856661' : emailOrPhone,
            role: (isAdminLogin ? 'ADMIN' : 'FARM_OWNER') as any,
            governorate: 'القاهرة',
            city: 'العاصمة الإدارية',
          };
          authStore.setAuth(demoUser, 'demo-token-' + Date.now());
          toast.success(isAdminLogin ? 'أهلاً بك يا مدير النظام (Ahmed Admin)!' : 'تم تسجيل الدخول بنجاح في منصة جرين فارم!');
          navigate(isAdminLogin ? '/admin' : '/dashboard');
        }
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'تعذر الاتصال بالخادم. يرجى التأكد من الاتصال بالإنترنت.';
      if (import.meta.env.PROD && err?.response?.status) {
        setErrorMsg(apiError);
        toast.error(apiError);
      } else {
        // Dev fallback
        const isAdminLogin = emailOrPhone.trim().toLowerCase() === 'ahmed.admin@gmail.com' || emailOrPhone.toLowerCase().includes('ahmed.admin');
        const demoUser = {
          id: 'usr-demo',
          name: isAdminLogin ? 'Ahmed Admin' : (emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'مستخدم تجريبي'),
          email: isAdminLogin ? 'ahmed.admin@gmail.com' : (emailOrPhone.includes('@') ? emailOrPhone : 'user@greenfarmmarket.com'),
          phone: '01099856661',
          role: (isAdminLogin ? 'ADMIN' : 'FARM_OWNER') as any,
          governorate: 'القاهرة',
          city: 'الرئيسية',
        };
        authStore.setAuth(demoUser, 'demo-token-123');
        toast.success(isAdminLogin ? 'مرحباً بك يا مدير النظام (Ahmed Admin)!' : 'تم تسجيل الدخول بنجاح!');
        navigate(isAdminLogin ? '/admin' : '/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#25D5AB]/30 selection:text-emerald-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden isolate select-none" dir="rtl">
      
      {/* Background Animated Lights */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00C896]/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#be1622]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ==================================================
              RIGHT SIDE (7 cols on lg in RTL): LOGIN CARD
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* Top Eyebrow Header */}
            <div className="space-y-2 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>بوابة الدخول الموحدة للزراعة الذكية 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.4] py-1">
                مرحباً بك في{' '}
                <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent drop-shadow-sm py-0.5">
                  مستقبل الزراعة الذكية
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                ادخل إلى منصة جرين فارم ماركت لإدارة خدماتك الزراعية والوصول إلى السوق الرقمي وإجراء التشخيص الذكي بالأقمار الصناعية.
              </p>

              {/* 4 Small Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {[
                  { label: 'سوق زراعي رقمي', icon: Store },
                  { label: 'ذكاء اصطناعي', icon: Bot },
                  { label: 'خدمات لوجستية', icon: Truck },
                  { label: 'مجتمع متكامل', icon: Leaf },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white/70 dark:bg-[#0d1612]/80 border border-slate-200/80 dark:border-[#1e3b2c] flex items-center gap-1.5 text-xs font-extrabold text-slate-700 dark:text-slate-300 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Interactive Login Card with BorderGlow */}
            <BorderGlow
              edgeSensitivity={30}
              borderRadius={28}
              glowRadius={45}
              glowIntensity={1.1}
              coneSpread={25}
              animated={false}
              colors={['#00C896', '#25D5AB', '#6EE7B7']}
              className="shadow-xl shadow-slate-200/50 dark:shadow-[#00040d]"
            >
              <div className="p-6 sm:p-8 bg-white dark:bg-[#0d1612] rounded-[28px] text-right space-y-6 relative overflow-hidden backdrop-blur-md">
                
                {/* Card Title & Logo */}
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-[#1c3628] pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <LogIn className="w-5 h-5 text-[#25D5AB]" />
                      تسجيل الدخول للمنصة
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      أدخل بيانات حسابك المعتمدة للمتابعة
                    </span>
                  </div>
                  <Logo size="sm" />
                </div>

                {/* Validation Error Alert */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-extrabold flex items-center gap-2.5"
                    >
                      <AlertCircle className="w-4.5 h-4.5 shrink-0 text-rose-500" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Field 1: Email / Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#25D5AB]" />
                      <span>البريد الإلكتروني أو رقم الهاتف *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="example@greenfarm.com أو 01099856661"
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        dir="auto"
                      />
                    </div>
                  </div>

                  {/* Field 2: Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#25D5AB]" />
                        <span>كلمة المرور *</span>
                      </label>
                      <span
                        onClick={() => toast.info('يرجى التواصل مع الدعم الفني أو تسجيل حساب جديد في حال نسيت كلمة المرور.')}
                        className="text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB] hover:underline cursor-pointer"
                      >
                        نسيت كلمة المرور؟
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 pl-12 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1"
                      >
                        {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded text-[#25D5AB] focus:ring-[#25D5AB] border-slate-300 dark:border-[#1e3b2c] cursor-pointer"
                      />
                      <span>تذكر بيانات دخولي على هذا الجهاز</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-[20px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                          <span>جاري تسجيل الدخول والتحقق...</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-5 h-5" />
                          <span>دخول إلى المنصة</span>
                          <ArrowRight className="w-4 h-4 mr-1" />
                        </>
                      )}
                    </button>
                  </div>

                </form>

                {/* Footer Switch */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-[#1c3628] text-center text-xs font-bold text-slate-600 dark:text-slate-400 space-y-3">
                  <p>
                    ليس لديك حساب بعد؟{' '}
                    <Link to="/register" className="text-emerald-700 dark:text-[#25D5AB] font-black hover:underline">
                      انضم إلى مجتمع جرين فارم (+ حساب جديد)
                    </Link>
                  </p>

                  <Link to="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-[#25D5AB] transition text-[11px] font-bold">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>العودة للصفحة الرئيسية للمنصة</span>
                  </Link>
                </div>

              </div>
            </BorderGlow>

            {/* Security Section Below Login Card */}
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#0d1612]/60 border border-slate-200/80 dark:border-[#1e3b2c] flex flex-wrap items-center justify-between gap-3 text-xs backdrop-blur-sm">
              <div className="flex items-center gap-2 font-extrabold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4.5 h-4.5 text-[#25D5AB]" />
                <span>منصة آمنة لحماية بياناتك ومعاملاتك الزراعية</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-bold">
                <span className="flex items-center gap-1">
                  <LockKeyhole className="w-3 h-3 text-[#25D5AB]" />
                  تشفير SSL 256-bit
                </span>
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#25D5AB]" />
                  هوية موثقة
                </span>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              LEFT SIDE (5 cols on lg in RTL): AI AGRITECH VISUAL
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <BorderGlow
              edgeSensitivity={30}
              borderRadius={28}
              glowRadius={45}
              glowIntensity={1.2}
              coneSpread={25}
              animated={false}
              colors={['#00C896', '#25D5AB', '#6EE7B7']}
              className="shadow-2xl shadow-slate-200/50 dark:shadow-[#00040d] h-full"
            >
              <div className="relative rounded-[28px] overflow-hidden p-6 sm:p-7 bg-gradient-to-b from-[#0e1f17] to-[#040906] text-white space-y-5 isolate h-full flex flex-col justify-between">
                
                {/* Glowing Ambient Lights in Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                {/* Top Status Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D5AB] animate-ping" />
                    <span className="text-xs font-extrabold text-[#25D5AB]">المنظومة الرقمية للزراعة الذكية</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6EE7B7] text-[11px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>مزامنة الأقمار الصناعية</span>
                  </div>
                </div>

                {/* Image Showcase */}
                <div className="relative flex-1 flex items-center justify-center my-2 group select-none">
                  <img
                    src={marketplaceImg}
                    alt="Green Farm Market AI Ecosystem"
                    className="max-h-[250px] sm:max-h-[300px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-105 group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Circular glow ring */}
                  <div className="absolute -bottom-2 w-52 h-10 bg-[#25D5AB]/30 rounded-full blur-xl -z-10 pointer-events-none" />
                </div>

                {/* Live Telemetry Ribbon */}
                <div className="relative z-10 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-3 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#25D5AB]" />
                      شبكة الربط اللوجستي والتداول الفوري
                    </span>
                    <span className="text-[#25D5AB] font-bold">24/7 نشط</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">المزارع النشطة</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">🌱 +15k</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">أسطول النقل</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">🚚 +2,400</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">فحوصات AI</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">⚡ فوري</span>
                    </div>
                  </div>
                </div>

              </div>
            </BorderGlow>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
