import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { useAuth } from '../store/authStore';
import { BorderGlow } from '../components/ui/BorderGlow';
import digitalMarketplaceImg from '../assets/Digital Agricultural 1 Marketplace.webp';
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  Headset,
  Leaf,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowLeft,
  Building2,
  Users,
  Bot,
  Layers,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Loader2,
  RotateCcw,
  CheckCircle,
  Activity,
  Award,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { user, toggleAuthModal } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    subject: 'استفسار عام',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Quick Subject Options
  const subjectOptions = [
    'استفسار عام',
    'خدمات المنصة',
    'النقل الذكي',
    'صيدلية AI',
    'الاستثمار الزراعي',
    'الشراكات',
  ];

  // Smart Contact Cards Data
  const smartContactCards = [
    {
      id: 1,
      title: 'الدعم الفني',
      icon: Headset,
      subjectKey: 'خدمات المنصة',
      desc: 'دعم مستمر لمساعدتك في استخدام خدمات المنصة وإدارة حسابك ومزرعتك.',
      badge: '24/7 متاح',
      gradient: 'from-emerald-500/15 via-[#25D5AB]/10 to-transparent',
    },
    {
      id: 2,
      title: 'الخدمات الزراعية',
      icon: Leaf,
      subjectKey: 'استفسار عام',
      desc: 'استفسارات حول الأسواق، المزارع، المواشي والخدمات الرقمية وسلاسل التوريد.',
      badge: 'إرشاد زراعي',
      gradient: 'from-[#00C896]/15 via-emerald-500/10 to-transparent',
    },
    {
      id: 3,
      title: 'الشراكات والاستثمار',
      icon: TrendingUp,
      subjectKey: 'الاستثمار الزراعي',
      desc: 'تواصل معنا لبناء شراكات زراعية مستقبلية ومشاريع التسمين والإنتاج المشترك.',
      badge: 'فرص استثمارية',
      gradient: 'from-[#be1622]/15 via-rose-500/10 to-transparent',
    },
    {
      id: 4,
      title: 'الذكاء الاصطناعي',
      icon: Sparkles,
      subjectKey: 'صيدلية AI',
      desc: 'حلول AI المتطورة لتشخيص الآفات والأمراض وتطوير الإنتاج الزراعي والحيواني.',
      badge: 'رؤية حاسوبية',
      gradient: 'from-sky-500/15 via-[#25D5AB]/10 to-transparent',
    },
  ];

  const handleCardClick = (subjectKey: string) => {
    setFormData((prev) => ({ ...prev, subject: subjectKey }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast.info(`تم تحديد نوع الطلب: "${subjectKey}"`);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`تم نسخ ${fieldName} بنجاح: ${text}`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        userId: user?.id || undefined,
      };

      const res = await api.post('/contact', payload);
      if (res.data.success) {
        toast.success(res.data.message || 'تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة العملاء قريباً.');
        setSubmitted(true);
      } else {
        throw new Error(res.data.message || 'تعذر إرسال الرسالة');
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || err?.message;
      if (apiError) {
        toast.error(apiError);
      } else {
        toast.error('تعذر إرسال الرسالة. يرجى التأكد من اتصال الإنترنت والمحاولة لاحقاً.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#25D5AB]/30 selection:text-emerald-950 pb-20" dir="rtl">
      
      {/* ==================================================
          SECTION 1: CONTACT HERO (Futuristic Agritech SaaS)
      ================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden isolate">
        {/* Futuristic Background Lights & Glowing Particles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D5AB]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C896]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/35 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-extrabold shadow-sm backdrop-blur-md">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 dark:bg-[#25D5AB]/20 animate-pulse">
                <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-[#25D5AB]" />
              </span>
              <span>قنوات الاتصال والمساندة الذكية 2026</span>
              <span className="text-slate-400">·</span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">دعم متواصل 24/7</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.45] sm:leading-[1.4] lg:leading-[1.38] max-w-4xl mx-auto py-1.5"
          >
            تواصل مع{' '}
            <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent drop-shadow-sm py-1">
              منظومة جرين فارم
            </span>{' '}
            ماركت
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto"
          >
            فريقنا جاهز لمساعدتك في خدمات الزراعة الذكية، النقل، الاستثمار، والذكاء الاصطناعي الزراعي، وتقديم الاستشارات الفنية على مدار الساعة.
          </motion.p>

          {/* Telemetry Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 dark:bg-[#0d1612]/80 border border-slate-200/80 dark:border-[#1e3b2c] text-xs font-extrabold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
              <Zap className="w-4 h-4 text-[#25D5AB] animate-pulse" />
              <span>زمن الاستجابة: أقل من 15 دقيقة</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 dark:bg-[#0d1612]/80 border border-slate-200/80 dark:border-[#1e3b2c] text-xs font-extrabold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>فريق الدعم متصل 24/7</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 dark:bg-[#0d1612]/80 border border-slate-200/80 dark:border-[#1e3b2c] text-xs font-extrabold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
              <MapPin className="w-4 h-4 text-[#be1622]" />
              <span>تغطية شاملة لـ 27 محافظة</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ==================================================
          SECTION 2: SMART CONTACT OPTIONS (4 Premium Cards)
      ================================================== */}
      <section className="py-8 sm:py-12 border-y border-slate-200/80 dark:border-[#1c3628] bg-white/50 dark:bg-[#07100b]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>قنوات التواصل المتخصصة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-[1.4] py-1">
              اختر مسار التواصل الأنسب لاحتياجاتك
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              اضغط على أي مسار لتوجيه استفسارك مباشرة إلى القسم المختص وتعبئة نموذج الرسالة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {smartContactCards.map((card) => {
              const Icon = card.icon;
              return (
                <BorderGlow
                  key={card.id}
                  edgeSensitivity={25}
                  borderRadius={24}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#00C896', '#25D5AB', '#6EE7B7']}
                  className="shadow-sm"
                  onClick={() => handleCardClick(card.subjectKey)}
                >
                  <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] text-right space-y-4 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden h-full flex flex-col justify-between select-none">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.gradient} rounded-full blur-2xl pointer-events-none`} />

                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center border border-emerald-600/20 dark:border-[#25D5AB]/30 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5">
                          {card.badge}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB] transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                          {card.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB] relative z-10">
                      <span>تواصل الآن</span>
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </div>
                  </div>
                </BorderGlow>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 3: CONTACT EXPERIENCE (Two-Column Layout)
      ================================================== */}
      <section ref={formRef} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Right: Contact Form (7 cols on lg in RTL) */}
            <div className="lg:col-span-7 flex flex-col">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={28}
                glowRadius={45}
                glowIntensity={1.1}
                coneSpread={25}
                animated={false}
                colors={['#00C896', '#25D5AB', '#6EE7B7']}
                className="shadow-xl shadow-slate-200/50 dark:shadow-[#00040d] h-full"
              >
                <div className="p-6 sm:p-8 lg:p-10 bg-white dark:bg-[#0d1612] rounded-[28px] text-right space-y-6 relative overflow-hidden backdrop-blur-md h-full flex flex-col justify-between">
                  
                  {/* Ambient Highlight */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none -z-10" />

                  {/* Form Header */}
                  <div className="space-y-2 border-b border-slate-200/80 dark:border-[#1c3628] pb-5">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>نموذج التواصل السريع</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-bold">الاستجابة خلال دقائق</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-[1.4] py-0.5">
                      أرسل رسالتك وسنتواصل معك
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                      املأ البيانات أدناه وسيتواصل معك مستشار زراعي أو ممثل الدعم الفني فوراً.
                    </p>
                  </div>

                  {/* Submission States */}
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-[#25D5AB] border border-[#25D5AB]/40 flex items-center justify-center mx-auto shadow-lg shadow-[#25D5AB]/20">
                        <CheckCircle className="w-8 h-8" />
                      </div>

                      <div className="space-y-2 max-w-md mx-auto">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                          تم استلام رسالتك بنجاح!
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                          شكراً لتواصلك مع منظومة جرين فارم ماركت. تم تحويل استفسارك إلى الفريق المختص وسيقوم أحد مستشارينا بالرد عليك عبر الهاتف أو البريد الإلكتروني.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', phone: '', email: '', subject: 'استفسار عام', message: '' });
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 font-extrabold text-xs shadow-md transition cursor-pointer"
                      >
                        إرسال رسالة أخرى
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {/* Name & Phone Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Field 1: Name */}
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-[#25D5AB]" />
                            <span>الاسم بالكامل *</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="أدخل اسمك الكريم..."
                            className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-normal text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                          />
                        </div>

                        {/* Field 2: Phone */}
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5 text-[#25D5AB]" />
                            <span>رقم الهاتف (الواتساب) *</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="01099856661"
                            className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-normal text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                          />
                        </div>

                      </div>

                      {/* Email & Subject Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Field 3: Email */}
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#25D5AB]" />
                            <span>البريد الإلكتروني *</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="info@greenfarmmarket.com"
                            className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-normal text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner"
                          />
                        </div>

                        {/* Field 4: Subject Dropdown */}
                        <div className="space-y-2">
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#be1622]" />
                            <span>نوع الطلب / موضوع الرسالة *</span>
                          </label>
                          <select
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-3.5 sm:p-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 shadow-inner cursor-pointer"
                          >
                            {subjectOptions.map((opt, idx) => (
                              <option key={idx} value={opt} className="bg-white dark:bg-[#0d1612] text-slate-900 dark:text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                      </div>

                      {/* Field 5: Message */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-[#25D5AB]" />
                            <span>تفاصيل الرسالة أو الاستفسار *</span>
                          </label>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {formData.message.length > 0 ? `${formData.message.length} حرف` : 'كتابة حرة'}
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="اكتب تفاصيل استفسارك، موقع مزرعتك، أو متطلباتك بالتفصيل..."
                          className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-[20px] p-4 text-xs sm:text-sm font-normal text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 resize-none shadow-inner"
                        />
                      </div>

                      {/* Submit Action */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 rounded-[20px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm sm:text-base shadow-lg shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                              <span>جاري إرسال الطلب إلى فريق جرين فارم...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-4.5 h-4.5" />
                              <span>ابدأ التواصل الآن</span>
                            </>
                          )}
                        </button>
                      </div>

                    </form>
                  )}

                </div>
              </BorderGlow>
            </div>

            {/* Left: AI Agriculture Communication Visual (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={28}
                glowRadius={45}
                glowIntensity={1.2}
                coneSpread={25}
                animated={false}
                colors={['#00C896', '#25D5AB', '#6EE7B7']}
                className="shadow-xl shadow-slate-200/50 dark:shadow-[#00040d] h-full"
              >
                <div className="relative rounded-[28px] overflow-hidden p-6 sm:p-7 bg-gradient-to-b from-[#0e1f17] to-[#040906] text-white space-y-5 isolate h-full flex flex-col justify-between">
                  
                  {/* Glowing Ambient Lights in Card */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#25D5AB] animate-ping" />
                      <span className="text-xs font-extrabold text-[#25D5AB]">شبكة الاتصال والربط الزراعي</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6EE7B7] text-[11px] font-bold border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>متصل 24/7</span>
                    </div>
                  </div>

                  {/* Visual Image Presentation: Digital Agricultural 1 Marketplace.png */}
                  <div className="relative flex-1 flex items-center justify-center my-2 group select-none">
                    <img
                      src={digitalMarketplaceImg}
                      alt="Green Farm Market Digital Ecosystem"
                      className="max-h-[250px] sm:max-h-[290px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-105 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Glowing ring under image */}
                    <div className="absolute -bottom-2 w-52 h-10 bg-[#25D5AB]/30 rounded-full blur-xl -z-10 pointer-events-none" />
                  </div>

                  {/* Bottom Glass Telemetry Ribbon */}
                  <div className="relative z-10 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-3 shadow-lg">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#25D5AB]" />
                        منظومة جرين فارم المتكاملة
                      </span>
                      <span className="text-[#25D5AB] font-bold">حماية وتشفير 100%</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] block text-slate-400 font-medium">الاستجابة</span>
                        <span className="text-xs font-extrabold text-[#6EE7B7]">⚡ فورية</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] block text-slate-400 font-medium">الاستشارات</span>
                        <span className="text-xs font-extrabold text-[#6EE7B7]">👨‍🌾 معتمدة</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] block text-slate-400 font-medium">المحافظات</span>
                        <span className="text-xs font-extrabold text-[#6EE7B7]">🇪🇬 27 محافظة</span>
                      </div>
                    </div>
                  </div>

                </div>
              </BorderGlow>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 4: OFFICIAL CONTACT INFORMATION (Futuristic Panel)
      ================================================== */}
      <section className="py-12 sm:py-16 bg-slate-50 dark:bg-[#00040d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Building2 className="w-3.5 h-3.5" />
              <span>البيانات المؤسسية الرسمية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-[1.4] py-1">
              معلومات الاتصال المباشرة بالشركة
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              تفضل بالتواصل معنا عبر وسائل الاتصال المعتمدة أو زيارة مقراتنا الإدارية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Location */}
            <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-4 hover:border-[#25D5AB]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-[#be1622] flex items-center justify-center border border-[#be1622]/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-rose-500/10 text-[#be1622] border border-[#be1622]/20">
                  المقر الرئيسي
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  القاهرة - العاصمة الإدارية
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  جمهورية مصر العربية (تغطية تشغيلية ولوجستية كاملة لـ 27 محافظة)
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-slate-500">
                <span>تغطية مركزية وشبكة لوجستية</span>
              </div>
            </div>

            {/* Box 2: Phone & WhatsApp */}
            <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-4 hover:border-[#25D5AB]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center border border-emerald-600/20 dark:border-[#25D5AB]/30 group-hover:scale-110 transition-transform">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-800 dark:text-[#25D5AB] border border-emerald-600/30">
                  هاتف & واتساب
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-mono" dir="ltr">
                  01099856661
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  متاح للاتصال الهاتفي المباشر والمراسلة السريعة عبر تطبيق واتساب
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href="tel:01099856661"
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB] hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>اتصال هاتفي</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('01099856661', 'رقم الهاتف')}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  title="نسخ الرقم"
                >
                  {copiedField === 'رقم الهاتف' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Box 3: Email */}
            <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-4 hover:border-[#25D5AB]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/20">
                  البريد الرسمي
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-mono text-xs sm:text-sm" dir="ltr">
                  info@greenfarmmarket.com
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  لاستقبال العروض الاستثمارية، خطابات الشراكة، والاستفسارات الرسمية
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <a
                  href="mailto:info@greenfarmmarket.com"
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>إرسال إيميل</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('info@greenfarmmarket.com', 'البريد الإلكتروني')}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                  title="نسخ الإيميل"
                >
                  {copiedField === 'البريد الإلكتروني' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Box 4: Website */}
            <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-4 hover:border-[#25D5AB]/50 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
                  البوابة الرقمية
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-mono text-sm" dir="ltr">
                  greenfarmmarket.com
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  المنصة الرقمية المتكاملة لمستقبل الزراعة وسلاسل الإمداد الذكية
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs font-extrabold text-purple-600 dark:text-purple-400">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>الموقع الرسمي للمنصة</span>
              </div>
            </div>

            {/* Box 5: Working Hours */}
            <div className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-4 hover:border-[#25D5AB]/50 transition-all duration-300 group md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                  مواعيد العمل الرسمية
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  السبت - الخميس: 8:00 صباحاً - 8:00 مساءً
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  فريق الطوارئ الزراعية وغرفة العمليات اللوجستية متواجدون على مدار 24 ساعة للتعامل مع الشحنات الحية والفحوصات الطارئة.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-[#25D5AB]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>دعم الحالات الطارئة متاح 24/7</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 5: CALL TO ACTION (Final CTA)
      ================================================== */}
      <section className="py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={32}
            glowRadius={55}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#6EE7B7']}
            className="shadow-2xl shadow-[#00C896]/10"
          >
            <div className="p-8 sm:p-12 lg:p-16 rounded-[32px] bg-gradient-to-b from-[#0b1b13] to-[#040a07] text-white text-center space-y-6 relative overflow-hidden isolate">
              
              {/* Glowing Ambient Lights */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D5AB]/15 border border-[#25D5AB]/30 text-[#25D5AB] text-xs sm:text-sm font-extrabold">
                <Sparkles className="w-4 h-4" />
                <span>انضم إلى ثورة الزراعة الرقمية</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.5] sm:leading-[1.45] md:leading-[1.4] py-2">
                جاهز للانضمام إلى مستقبل{' '}
                <span className="inline-block bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] bg-clip-text text-transparent py-1">
                  الزراعة الذكية؟
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                ابدأ رحلتك مع منصة تجمع السوق، التكنولوجيا، والذكاء الاصطناعي في مكان واحد، واربط إنتاجك بأفضل الأسعار وأحدث الحلول الرقمية.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link to="/register">
                  <button className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-[#25D5AB]/25 hover:shadow-2xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2.5 cursor-pointer select-none">
                    <span>إنشاء حساب مجاني</span>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                </Link>

                <Link to="/marketplace">
                  <button className="px-8 sm:px-10 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-[#25D5AB]/60 backdrop-blur-md font-extrabold text-sm sm:text-base shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2 select-none cursor-pointer">
                    <Layers className="w-5 h-5 text-[#25D5AB]" />
                    <span>استكشف الخدمات الزراعية</span>
                  </button>
                </Link>
              </div>

            </div>
          </BorderGlow>
        </div>
      </section>

    </div>
  );
};
