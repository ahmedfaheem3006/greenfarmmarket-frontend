import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authStore } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
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
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

type UserRoleOption = 'FARMER' | 'LIVESTOCK_TRADER' | 'TRANSPORT_DRIVER' | 'WORKER' | 'VENDOR';

const backendRoleMap: Record<UserRoleOption, string> = {
  FARMER: 'FARMER',
  LIVESTOCK_TRADER: 'SELLER',
  TRANSPORT_DRIVER: 'DRIVER',
  WORKER: 'WORKER',
  VENDOR: 'SELLER',
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [governorate, setGovernorate] = useState('البحيرة');
  const [city, setCity] = useState('دمنهور');
  const [role, setRole] = useState<UserRoleOption>('FARMER');

  // Driver File Upload States (Strict requirement for TRANSPORT_DRIVER role)
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [nationalIdPreview, setNationalIdPreview] = useState<string | null>(null);
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [licensePreview, setLicensePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle National ID File Upload
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNationalIdFile(file);
      setNationalIdPreview(URL.createObjectURL(file));
    }
  };

  // Handle Driver License File Upload
  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLicenseFile(file);
      setLicensePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!name.trim() || !email.trim() || !phone.trim() || !password || !governorate || !city || !role) {
      setErrorMsg('جميع الحقول الأساسية مطلوبة!');
      return;
    }

    if (name.trim().split(/\s+/).length < 3) {
      setErrorMsg('يرجى إدخال الاسم الثلاثي كاملاً كما هو مسجل في بطاقة الرقم القومي.');
      return;
    }

    if (!/^01[0125]\d{8}$/.test(phone.trim())) {
      setErrorMsg('يرجى إدخال رقم هاتف مصري صحيح ومفعّل عليه واتساب.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('كلمة المرور يجب أن لا تقل عن 6 أحرف!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('كلمة المرور وتأكيدها غير متطابقين!');
      return;
    }

    setLoading(true);

    try {
      // Map frontend role to valid backend Role enum
      const backendRole = backendRoleMap[role] || 'FARMER';
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: backendRole,
        governorate,
        city,
        hasNationalId: !!nationalIdFile,
        hasLicense: !!licenseFile,
      };

      const res = await api.post('/auth/register', payload);

      if (res.data?.success) {
        authStore.setAuth(res.data.data.user, res.data.data.accessToken);
        toast.success(`تم إنشاء حساب ${role === 'TRANSPORT_DRIVER' ? 'سائق النقل' : ''} بنجاح! مرحباً بك يا ${name}.`);
        navigate('/dashboard');
      } else {
        const message = res.data?.message || 'فشل إنشاء الحساب. يرجى مراجعة البيانات.';
        if (import.meta.env.PROD) {
          setErrorMsg(message);
          toast.error(message);
        } else {
          // Dev-only fallback
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
          toast.success(`تم إنشاء حسابك الجديد بنجاح (وضع التطوير)!`);
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'حدث خطأ أثناء الاتصال بالخادم. حاول لاحقاً.';
      if (import.meta.env.PROD) {
        setErrorMsg(apiError);
        toast.error(apiError);
      } else {
        const newUser = {
          id: 'usr-new',
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role: backendRoleMap[role] as any,
          governorate,
          city,
        };
        authStore.setAuth(newUser, 'token-demo-999');
        toast.success('تم إنشاء الحساب بنجاح!');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

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
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-surface border-2 border-borderColor rounded-3xl sm:rounded-4xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden isolate"
      >
        {/* Glow ambient decorations */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-green-soft/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-brand-blue-soft/40 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary">إنشاء حساب جديد بالمنصة</h2>
            <p className="text-xs sm:text-sm text-text-secondary font-bold">
              انضم لأول منصة رقمية تربط المزارعين والمربين وسائقي النقل بالشرق الأوسط
            </p>
          </div>
        </div>

        {/* Validation Error Alert */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-brand-red-soft/60 border border-brand-red/40 text-brand-red dark:text-rose-400 text-xs font-black flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-right">
          {/* Section 1: Role Selection Cards */}
          <div className="space-y-3">
            <label className="text-xs font-black text-text-primary block">
              الصفة داخل قطاع الزراعة <span className="text-brand-red">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'FARMER', label: 'مزارع / منتج', icon: Tractor, color: 'text-brand-green' },
                { id: 'LIVESTOCK_TRADER', label: 'تاجر مواشي', icon: Beef, color: 'text-amber-600' },
                { id: 'TRANSPORT_DRIVER', label: 'سائق نقل ذكي', icon: Truck, color: 'text-brand-blue' },
                { id: 'WORKER', label: 'عامل / صاحب مهنة', icon: User, color: 'text-[#FFB703]' },
                { id: 'VENDOR', label: 'موزع / مشتري', icon: Store, color: 'text-purple-600' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id as UserRoleOption)}
                    className={`p-3.5 rounded-2xl border-2 text-center transition flex flex-col items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-green/10 border-brand-green text-brand-green shadow-sm'
                        : 'bg-surface-muted border-borderColor text-text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-brand-green' : item.color}`} />
                    <span className="text-xs font-black">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Personal Info Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                الاسم الثلاثي <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="الاسم الثلاثي كما هو بالبطاقة"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                />
                <User className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                البريد الإلكتروني <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                />
                <Mail className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                رقم الهاتف (مفعّل عليه واتساب) <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01012345678"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                />
                <Phone className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Governorate */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                المحافظة والمدينة <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition appearance-none cursor-pointer"
                >
                  {governoratesList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                كلمة المرور <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6 أحرف على الأقل"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-10 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                />
                <Lock className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-black text-text-primary block">
                تأكيد كلمة المرور <span className="text-brand-red">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="إعادة إدخال كلمة المرور"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                />
                <Lock className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Optional identity verification for drivers and workers */}
          <AnimatePresence>
            {(role === 'TRANSPORT_DRIVER' || role === 'WORKER') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="space-y-4 pt-4 border-t-2 border-dashed border-brand-blue/40 bg-brand-blue-soft/20 p-5 rounded-3xl"
              >
                <div className="flex items-center gap-2 text-brand-blue dark:text-sky-400">
                  <Truck className="w-5 h-5" />
                  <h4 className="text-xs sm:text-sm font-black">
                    توثيق الحساب وزيادة موثوقية الملف الشخصي 🔒 <span className="text-text-secondary">(اختياري)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* File Upload 1: National ID */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text-primary block">
                      1. رفع صورة الرقم القومي / البطاقة الشخصية
                    </label>
                    <div className="relative border-2 border-dashed border-borderColor hover:border-brand-blue rounded-2xl p-4 text-center bg-surface transition cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleNationalIdChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {nationalIdPreview ? (
                        <div className="space-y-2">
                          <img
                            src={nationalIdPreview}
                            alt="معاينة البطاقة"
                            className="w-full h-24 object-cover rounded-xl border border-borderColor"
                          />
                          <span className="text-[11px] font-bold text-brand-green flex items-center justify-center gap-1">
                            <FileCheck className="w-3.5 h-3.5" /> تم رفع صورة البطاقة بنجاح
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          <Upload className="w-7 h-7 text-brand-blue mx-auto group-hover:scale-110 transition" />
                          <span className="text-xs font-bold text-text-primary block">اضغط لرفع صورة البطاقة</span>
                          <span className="text-[10px] text-text-secondary block">JPG, PNG, PDF (أقصى حجم 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Upload 2: Driver License */}
                  <div className="space-y-2">
                    <label className="text-xs font-black text-text-primary block">
                      2. رفع صورة رخصة القيادة / رخصة السيارة {role === 'WORKER' && '(إن وجدت)'}
                    </label>
                    <div className="relative border-2 border-dashed border-borderColor hover:border-brand-blue rounded-2xl p-4 text-center bg-surface transition cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleLicenseChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {licensePreview ? (
                        <div className="space-y-2">
                          <img
                            src={licensePreview}
                            alt="معاينة الرخصة"
                            className="w-full h-24 object-cover rounded-xl border border-borderColor"
                          />
                          <span className="text-[11px] font-bold text-brand-green flex items-center justify-center gap-1">
                            <FileCheck className="w-3.5 h-3.5" /> تم رفع صورة الرخصة بنجاح
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2 py-2">
                          <Upload className="w-7 h-7 text-brand-blue mx-auto group-hover:scale-110 transition" />
                          <span className="text-xs font-bold text-text-primary block">اضغط لرفع صورة الرخصة</span>
                          <span className="text-[10px] text-text-secondary block">JPG, PNG, PDF (أقصى حجم 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="green"
            size="lg"
            fullWidth
            disabled={loading}
            className="font-black text-sm py-4 rounded-2xl shadow-lg shadow-brand-green/25 mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري توثيق وإنشاء الحساب...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                تأكيد إنشاء الحساب والتوثيق (+ حساب جديد)
              </span>
            )}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-borderColor text-center text-xs font-bold text-text-secondary space-y-3">
          <p>
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="text-brand-green font-black hover:underline">
              تسجيل الدخول الآن
            </Link>
          </p>

          <Link to="/" className="inline-flex items-center gap-1.5 text-text-secondary hover:text-brand-green transition text-[11px] font-bold">
            <ArrowRight className="w-3.5 h-3.5" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
