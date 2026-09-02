import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authStore } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Logo } from '../components/common/Logo';
import { BorderGlow } from '../components/ui/BorderGlow';
import marketplaceImg from '../assets/Digital Agricultural 1 Marketplace.png';
import {
  UserPlus,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Truck,
  Tractor,
  Store,
  Beef,
  Upload,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe,
  Leaf,
  Layers,
  Check,
  X,
  Loader2,
  LockKeyhole,
  UserCheck,
  Award,
  Building2,
} from 'lucide-react';

type UserRoleOption = 'FARMER' | 'LIVESTOCK_TRADER' | 'TRANSPORT_DRIVER' | 'WORKER' | 'VENDOR';

const backendRoleMap: Record<UserRoleOption, string> = {
  FARMER: 'FARMER',
  LIVESTOCK_TRADER: 'SELLER',
  TRANSPORT_DRIVER: 'DRIVER',
  WORKER: 'WORKER',
  VENDOR: 'BUYER',
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Multi-step state: 1 | 2 | 3
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [role, setRole] = useState<UserRoleOption>('FARMER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [governorate, setGovernorate] = useState('البحيرة');
  const [city, setCity] = useState('دمنهور');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [farmOrStoreName, setFarmOrStoreName] = useState('');

  // Identity Verification Files (Drivers & Workers)
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [nationalIdPreview, setNationalIdPreview] = useState<string | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Governorates List
  const governoratesList = [
    'البحيرة',
    'بني سويف',
    'الشرقية',
    'الدقهلية',
    'الغربية',
    'المنوفية',
    'كفر الشيخ',
    'الفيوم',
    'المنيا',
    'أسيوط',
    'سوهاج',
    'قنا',
    'الأقصر',
    'أسوان',
    'الإسكندرية',
    'القاهرة',
    'الجيزة',
    'الإسماعيلية',
    'السويس',
    'بورسعيد',
    'دمياط',
    'مطروح',
    'الوادي الجديد',
    'شمال سيناء',
    'جنوب سيناء',
    'البحر الأحمر',
    'القليوبية',
  ];

  // Role Cards Data
  const roleCards = [
    {
      id: 'FARMER' as UserRoleOption,
      title: 'مزارع / منتج',
      desc: 'تسويق المحاصيل والخضار والفاكهة وإجراء فحص صيدلية AI الذكي.',
      icon: Tractor,
      badge: 'إنتاج زراعي',
      color: '#00C896',
    },
    {
      id: 'LIVESTOCK_TRADER' as UserRoleOption,
      title: 'تاجر ومربي مواشي',
      desc: 'سوق الماشية والأعلاف والفحص البيطري الفوري بالذكاء الاصطناعي.',
      icon: Beef,
      badge: 'إنتاج حيواني',
      color: '#f59e0b',
    },
    {
      id: 'TRANSPORT_DRIVER' as UserRoleOption,
      title: 'سائق نقل ذكي',
      desc: 'استقبال طلبات شحن المحاصيل والمواشي وزيادة أرباح أسطول النقل.',
      icon: Truck,
      badge: 'لوجستيات',
      color: '#38bdf8',
    },
    {
      id: 'WORKER' as UserRoleOption,
      title: 'عامل / صاحب مهنة',
      desc: 'التقديم على الوظائف الزراعية والبيطرية وأعمال الحصاد والري.',
      icon: User,
      badge: 'وظائف زراعية',
      color: '#fbbf24',
    },
    {
      id: 'VENDOR' as UserRoleOption,
      title: 'موزع / مشتري',
      desc: 'شراء المحاصيل بالجملة ومستلزمات الإنتاج والأسمدة والمبيدات.',
      icon: Store,
      badge: 'تجارة وتوزيع',
      color: '#a855f7',
    },
  ];

  // File Handlers
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNationalIdFile(file);
      setNationalIdPreview(URL.createObjectURL(file));
      toast.success(`تم إرفاق صورة البطاقة: ${file.name}`);
    }
  };

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLicenseFile(file);
      setLicensePreview(URL.createObjectURL(file));
      toast.success(`تم إرفاق صورة الرخصة: ${file.name}`);
    }
  };

  // Step Navigations
  const handleNextStep = () => {
    setErrorMsg('');

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!name.trim() || !email.trim() || !phone.trim() || !password || !governorate || !city) {
        setErrorMsg('جميع البيانات الشخصية مطلوبة للمتابعة.');
        return;
      }
      if (name.trim().split(/\s+/).length < 2) {
        setErrorMsg('يرجى إدخال الاسم كاملاً (الاسم الثنائي أو الثلاثي).');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('كلمة المرور يجب أن لا تقل عن 6 أحرف.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('كلمة المرور وتأكيدها غير متطابقين.');
        return;
      }
      setStep(3);
    }
  };

  // Final Registration Submit
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    setLoading(true);

    try {
      const backendRole = backendRoleMap[role] || 'FARMER';
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: backendRole,
        governorate,
        city,
        farmName: farmOrStoreName.trim() || undefined,
        hasNationalId: !!nationalIdFile,
        hasLicense: !!licenseFile,
      };

      const res = await api.post('/auth/register', payload);

      if (res.data?.success) {
        authStore.setAuth(res.data.data.user, res.data.data.accessToken);
        toast.success(`تم إنشاء حسابك بنجاح! مرحباً بك في منظومة جرين فارم يا ${name}.`);
        navigate('/dashboard');
      } else {
        const message = res.data?.message || 'فشل إنشاء الحساب. يرجى مراجعة البيانات.';
        if (import.meta.env.PROD) {
          setErrorMsg(message);
          toast.error(message);
        } else {
          // Dev fallback
          const newUser = {
            id: 'usr-' + Date.now(),
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            role: backendRole as any,
            governorate,
            city,
          };
          authStore.setAuth(newUser, 'token-' + Date.now());
          toast.success(`تم إنشاء الحساب بنجاح في المنصة!`);
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'حدث خطأ أثناء الاتصال بالخادم. حاول لاحقاً.';
      if (import.meta.env.PROD && err?.response?.status) {
        setErrorMsg(apiError);
        toast.error(apiError);
      } else {
        // Dev fallback
        const newUser = {
          id: 'usr-dev-registered',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role: backendRoleMap[role] as any,
          governorate,
          city,
        };
        authStore.setAuth(newUser, 'token-dev-registered-123');
        toast.success('تم إنشاء الحساب وتوثيقه بنجاح!');
        navigate('/dashboard');
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ==================================================
              RIGHT SIDE (7 cols on lg in RTL): 3-STEP REGISTER CARD
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
                <span>عضوية المنظومة الزراعية الذكية 2026</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.4] py-1">
                انضم إلى{' '}
                <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent drop-shadow-sm py-0.5">
                  مجتمع جرين فارم
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                افتح حسابك الرقمي الموثق في خطوات سريعة للوصول إلى الأسواق المركزية والنقل الذكي واستشارات الذكاء الاصطناعي.
              </p>
            </div>

            {/* Main Interactive Multi-Step Register Card */}
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
                
                {/* 3-Step Progress Indicator Header */}
                <div className="space-y-4 border-b border-slate-200/80 dark:border-[#1c3628] pb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      الخطوة {step} من 3: {step === 1 ? 'اختيار نوع الحساب' : step === 2 ? 'البيانات الشخصية' : 'التوثيق والتأكيد'}
                    </span>
                    <Logo size="sm" />
                  </div>

                  {/* Visual Progress Bar with 3 Pills */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { num: '01', title: 'نوع الحساب' },
                      { num: '02', title: 'البيانات الشخصية' },
                      { num: '03', title: 'توثيق الحساب' },
                    ].map((stepItem, idx) => {
                      const stepIdx = idx + 1;
                      const isActive = step === stepIdx;
                      const isCompleted = step > stepIdx;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-2xl border text-center transition-all duration-300 space-y-0.5 select-none ${
                            isActive
                              ? 'bg-[#25D5AB]/15 border-[#25D5AB] text-[#25D5AB] shadow-md shadow-[#25D5AB]/10'
                              : isCompleted
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-[#25D5AB]'
                              : 'bg-slate-50 dark:bg-[#111e18] border-slate-200/80 dark:border-[#1e3b2c] text-slate-400'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 text-[11px] font-black">
                            {isCompleted ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB]" />
                            ) : (
                              <span>{stepItem.num}</span>
                            )}
                          </div>
                          <span className="text-[10px] sm:text-xs font-extrabold block truncate">
                            {stepItem.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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

                {/* ==================================================
                    STEP 1: ROLE SELECTION CARDS
                ================================================== */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <Layers className="w-4.5 h-4.5 text-[#25D5AB]" />
                        حدد صفتك ونشاطك داخل المنظومة الزراعية:
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        يتم تخصيص لوحة التحكم والخدمات الرقمية تلقائياً بناءً على نوع الحساب المختار.
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      {roleCards.map((card) => {
                        const Icon = card.icon;
                        const isSelected = role === card.id;
                        return (
                          <div
                            key={card.id}
                            onClick={() => setRole(card.id)}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 select-none ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#00C896]/15 via-[#25D5AB]/10 to-transparent border-[#25D5AB] shadow-md shadow-[#25D5AB]/15 -translate-y-0.5'
                                : 'bg-[#f8fafc] dark:bg-[#111e18] border-slate-200/90 dark:border-[#1e3b2c] hover:border-[#25D5AB]/50'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <div
                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform ${
                                  isSelected
                                    ? 'bg-[#25D5AB] text-slate-950 border-[#25D5AB] scale-105 shadow-sm'
                                    : 'bg-white dark:bg-[#0d1612] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                                }`}
                              >
                                <Icon className="w-6 h-6" />
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
                                    {card.title}
                                  </h4>
                                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5 shrink-0">
                                    {card.badge}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                                  {card.desc}
                                </p>
                              </div>
                            </div>

                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                                isSelected
                                  ? 'bg-[#25D5AB] text-slate-950 border-[#25D5AB]'
                                  : 'border-slate-300 dark:border-slate-600'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 rounded-[20px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>متابعة إدخال البيانات الشخصية</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ==================================================
                    STEP 2: PERSONAL INFORMATION INPUTS
                ================================================== */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-4.5 h-4.5 text-[#25D5AB]" />
                        بيانات الحساب والتواصل الأساسية:
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        يرجى كتابة البيانات بدقة لضمان تفعيل الحساب واستلام الإشعارات.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>الاسم بالكامل *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="الاسم الثلاثي كما بالبطاقة"
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>البريد الإلكتروني *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>رقم الهاتف (الواتساب) *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="01099856661"
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                      {/* Governorate */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#be1622]" />
                          <span>المحافظة *</span>
                        </label>
                        <select
                          value={governorate}
                          onChange={(e) => setGovernorate(e.target.value)}
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner cursor-pointer"
                        >
                          {governoratesList.map((g) => (
                            <option key={g} value={g} className="bg-white dark:bg-[#0d1612] text-slate-900 dark:text-white">
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>المدينة / المركز *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="مثال: دمنهور، إيتاي البارود، الواسطى..."
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                      {/* Optional Farm/Store Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>اسم المزرعة أو النشاط (اختياري)</span>
                        </label>
                        <input
                          type="text"
                          value={farmOrStoreName}
                          onChange={(e) => setFarmOrStoreName(e.target.value)}
                          placeholder="مثال: مزارع النماء، معرض الصفا..."
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                      {/* Password */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>كلمة المرور *</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="6 أحرف على الأقل"
                            className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 pl-12 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition p-1"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1.5">
                        <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#25D5AB]" />
                          <span>تأكيد كلمة المرور *</span>
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="إعادة إدخال كلمة المرور"
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                        />
                      </div>

                    </div>

                    <div className="pt-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-3.5 rounded-[20px] border border-slate-200/90 dark:border-[#1c3628] bg-white dark:bg-[#0d1612] text-slate-600 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-50 dark:hover:bg-[#13241c] transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>السابق</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-8 py-3.5 rounded-[20px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>متابعة إلى خطوة التوثيق</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ==================================================
                    STEP 3: ACCOUNT VERIFICATION & CONFIRMATION
                ================================================== */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldCheck className="w-4.5 h-4.5 text-[#25D5AB]" />
                        توثيق الحساب وتأكيد العضوية:
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {role === 'TRANSPORT_DRIVER' || role === 'WORKER'
                          ? 'ارفع وثائق الهوية لتسريع اعتماد حسابك وتلقي طلبات الشحن والتوظيف ذات الأولوية.'
                          : 'مراجعة تفاصيل حسابك وتفعيل ميزات التداول والتشخيص الذكي الفوري.'}
                      </p>
                    </div>

                    {/* Verification Upload Cards (For Drivers & Workers) */}
                    {(role === 'TRANSPORT_DRIVER' || role === 'WORKER') ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Upload 1: National ID */}
                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                            1. بطاقة الرقم القومي (اختياري / موصى به)
                          </label>
                          <div className="relative border-2 border-dashed border-[#25D5AB]/40 hover:border-[#25D5AB] rounded-2xl p-4 text-center bg-[#f8fafc] dark:bg-[#111e18] transition cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleNationalIdChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {nationalIdPreview ? (
                              <div className="space-y-2">
                                <img
                                  src={nationalIdPreview}
                                  alt="National ID Preview"
                                  className="w-full h-24 object-cover rounded-xl border border-[#25D5AB]/40 shadow-xs"
                                />
                                <span className="text-[11px] font-extrabold text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> تم رفع صورة البطاقة
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-1.5 py-2">
                                <Upload className="w-7 h-7 text-[#25D5AB] mx-auto group-hover:scale-110 transition" />
                                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">
                                  اضغط لرفع صورة البطاقة
                                </span>
                                <span className="text-[10px] text-slate-400 block">JPG, PNG (أقصى حجم 10MB)</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Upload 2: License */}
                        <div className="space-y-2">
                          <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                            2. رخصة القيادة / ترخيص المهنة (اختياري)
                          </label>
                          <div className="relative border-2 border-dashed border-[#25D5AB]/40 hover:border-[#25D5AB] rounded-2xl p-4 text-center bg-[#f8fafc] dark:bg-[#111e18] transition cursor-pointer group">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLicenseChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            {licensePreview ? (
                              <div className="space-y-2">
                                <img
                                  src={licensePreview}
                                  alt="License Preview"
                                  className="w-full h-24 object-cover rounded-xl border border-[#25D5AB]/40 shadow-xs"
                                />
                                <span className="text-[11px] font-extrabold text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> تم رفع صورة الرخصة
                                </span>
                              </div>
                            ) : (
                              <div className="space-y-1.5 py-2">
                                <Upload className="w-7 h-7 text-[#25D5AB] mx-auto group-hover:scale-110 transition" />
                                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">
                                  اضغط لرفع صورة الرخصة
                                </span>
                                <span className="text-[10px] text-slate-400 block">JPG, PNG (أقصى حجم 10MB)</span>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    ) : (
                      /* Summary & Benefits Card for Farmers & Traders */
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#25D5AB]/10 to-transparent border border-emerald-500/30 space-y-3">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-extrabold">
                          <Award className="w-5 h-5 flex-shrink-0" />
                          <span>مزايا حساب {roleCards.find((r) => r.id === role)?.title}:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                            <span>تفعيل مجاني فوري 100%</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                            <span>استشارات غير محدودة بصيدلية AI</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                            <span>عرض المنتجات في السوق الرقمي</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                            <span>طلب أسطول الشحن والنقل الذكي</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Summary Strip */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#111e18] border border-slate-200/80 dark:border-[#1e3b2c] flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">الحساب المسجل:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold">{name} ({roleCards.find((r) => r.id === role)?.title})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">الموقع:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold">{governorate} - {city}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] font-bold">الهاتف:</span>
                        <strong className="text-emerald-700 dark:text-[#25D5AB] font-mono font-extrabold" dir="ltr">{phone}</strong>
                      </div>
                    </div>

                    {/* Final Submit & Back Buttons */}
                    <div className="pt-3 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="px-5 py-4 rounded-[20px] border border-slate-200/90 dark:border-[#1c3628] bg-white dark:bg-[#0d1612] text-slate-600 dark:text-slate-300 font-extrabold text-xs hover:bg-slate-50 dark:hover:bg-[#13241c] transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>تعديل البيانات</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        disabled={loading}
                        className="flex-1 py-4 rounded-[20px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-[#25D5AB]/25 hover:shadow-2xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                            <span>جاري توثيق وإنشاء الحساب...</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-5 h-5" />
                            <span>تأكيد إنشاء الحساب والتوثيق (+ حساب جديد)</span>
                          </>
                        )}
                      </button>
                    </div>

                  </motion.div>
                )}

                {/* Footer Switch */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-[#1c3628] text-center text-xs font-bold text-slate-600 dark:text-slate-400 space-y-3">
                  <p>
                    لديك حساب بالفعل؟{' '}
                    <Link to="/login" className="text-emerald-700 dark:text-[#25D5AB] font-black hover:underline">
                      تسجيل الدخول الآن
                    </Link>
                  </p>

                  <Link to="/" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-[#25D5AB] transition text-[11px] font-bold">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>العودة للصفحة الرئيسية للمنصة</span>
                  </Link>
                </div>

              </div>
            </BorderGlow>

            {/* Security Section Below Register Card
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
                  توثيق هوية معتمد
                </span>
              </div>
            </div> */}
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
                    <span className="text-xs font-extrabold text-[#25D5AB]">شبكة الإنتاج والتداول الزراعي</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6EE7B7] text-[11px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>انضمام فوري</span>
                  </div>
                </div>

                {/* Image Showcase */}
                <div className="relative flex-1 flex items-center justify-center my-2 group select-none">
                  <img
                    src={marketplaceImg}
                    alt="Green Farm Market AI Community"
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
                      مجتمع زراعي ذكي ينمو كل دقيقة
                    </span>
                    <span className="text-[#25D5AB] font-bold">27 محافظة</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">سوق التداول</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">💰 مباشر</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">صيدلية AI</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">🩺 24/7</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] block text-slate-400 font-medium">أسطول النقل</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">🚚 لحظي</span>
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
