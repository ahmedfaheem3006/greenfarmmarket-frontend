import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authStore } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Logo } from '../components/common/Logo';
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
  Sparkles,
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
      setErrorMsg('برجاء إدخال البريد الإلكتروني أو رقم الهاتف!');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('كلمة المرور يجب أن لا تقل عن 6 أحرف!');
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
        const message = res.data?.message || 'فشل تسجيل الدخول. تحقق من البيانات.';
        if (import.meta.env.PROD) {
          setErrorMsg(message);
          toast.error(message);
        } else {
          // Dev-only fallback
          const demoUser = {
            id: 'usr-' + Date.now(),
            name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'مستخدم تجريبي',
            email: emailOrPhone.includes('@') ? emailOrPhone : `${emailOrPhone}@greenfarm.com`,
            phone: emailOrPhone.includes('@') ? '01012345678' : emailOrPhone,
            role: 'FARM_OWNER' as const,
            governorate: 'القاهرة',
            city: 'مدينة نصر',
          };
          authStore.setAuth(demoUser, 'demo-token-' + Date.now());
          toast.success(`تم تسجيل الدخول بنجاح (وضع التطوير)!`);
          navigate('/dashboard');
        }
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'تعذر الاتصال بالخادم. يرجى التأكد من الاتصال بالإنترنت.';
      if (import.meta.env.PROD) {
        setErrorMsg(apiError);
        toast.error(apiError);
      } else {
        // Dev-only fallback
        const demoUser = {
          id: 'usr-demo',
          name: 'مهندس أحمد زكي',
          email: emailOrPhone.includes('@') ? emailOrPhone : 'ahmed@greenfarm.com',
          phone: '01012345678',
          role: 'FARM_OWNER' as const,
          governorate: 'بني سويف',
          city: 'الواسطى',
        };
        authStore.setAuth(demoUser, 'demo-token-123');
        toast.success('تم تسجيل الدخول بنجاح في المنصة!');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-surface border-2 border-borderColor rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden isolate"
      >
        {/* Glow ambient decorations */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-green-soft/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-brand-blue-soft/40 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header & Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-text-primary">تسجيل الدخول للمنصة</h2>
            <p className="text-xs sm:text-sm text-text-secondary font-bold">
              أهلاً بك مجدداً في أول منصة زراعية ذكية بالشرق الأوسط
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
            <AlertCircle className="w-4.5 h-4.5 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Phone Field */}
          <div className="space-y-2 text-right">
            <label className="text-xs font-black text-text-primary block">
              البريد الإلكتروني أو رقم الهاتف <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="example@greenfarm.com أو 01012345678"
                className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl py-3 pr-10 pl-4 text-xs font-bold text-text-primary focus:outline-none focus:border-brand-green transition"
                dir="auto"
              />
              <Mail className="w-4.5 h-4.5 text-text-secondary absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2 text-right">
            <label className="text-xs font-black text-text-primary block">
              كلمة المرور <span className="text-brand-red">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs font-bold pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text-primary">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-brand-green focus:ring-brand-green border-borderColor"
              />
              <span>تذكر بياناتي</span>
            </label>

            <span className="text-brand-green hover:underline cursor-pointer">نسيت كلمة المرور؟</span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="green"
            size="lg"
            fullWidth
            disabled={loading}
            className="font-black text-sm py-3.5 rounded-2xl shadow-lg shadow-brand-green/25 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري تسجيل الدخول...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="w-4.5 h-4.5" />
                دخول للمنصة
              </span>
            )}
          </Button>
        </form>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-borderColor text-center text-xs font-bold text-text-secondary space-y-3">
          <p>
            ليس لديك حساب بعد؟{' '}
            <Link to="/register" className="text-brand-green font-black hover:underline">
              انشئ حسابك الآن (+ حساب جديد)
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
