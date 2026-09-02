import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  BadgeCheck,
  Compass,
  Rocket,
  ArrowLeft,
  Leaf,
  CheckCircle2,
  ChevronLeft,
  Mail,
  BadgePercent,
  Copy,
  Check,
  ShieldCheck,
  Gift,
  Tag,
} from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';
import { toast } from '../../store/toastStore';
import { api } from '../../services/api';
import heroImg from '../../assets/Hero.png';

interface StepItem {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isHighlight?: boolean;
  badgeTag: string;
}

export const HowItWorksSection: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const steps: StepItem[] = [
    {
      id: 1,
      number: '01',
      title: 'أنشئ حسابك',
      description: 'سجل بياناتك بسهولة وابدأ بناء ملفك الزراعي الرقمي في أقل من دقيقة.',
      icon: UserPlus,
      badgeTag: 'تسجيل فوري',
    },
    {
      id: 2,
      number: '02',
      title: 'أكمل ملفك',
      description: 'أضف معلوماتك وموقع مزرعتك واحتياجاتك للحصول على تجربة مخصصة ودقيقة.',
      icon: BadgeCheck,
      isHighlight: true,
      badgeTag: 'توثيق البيانات',
    },
    {
      id: 3,
      number: '03',
      title: 'استكشف الخدمات',
      description: 'تصفح الأسواق المباشرة، فحص المحاصيل، حلول المواشي، والخدمات اللوجستية.',
      icon: Compass,
      badgeTag: 'بوابات ذكية',
    },
    {
      id: 4,
      number: '04',
      title: 'ابدأ استخدام المنصة',
      description: 'استفد من حلولنا الذكية والذكاء الاصطناعي وطوّر إنتاجك الزراعي وأرباحك.',
      icon: Rocket,
      isHighlight: true,
      badgeTag: 'انطلاق فوري',
    },
  ];

  const handleClaimDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      toast.info('يرجى إدخال بريد إلكتروني صحيح لتفعيل كود الخصم');
      return;
    }
    setSubmitting(true);
    try {
      const response = await api.post('/contact/claim-discount', {
        email: emailInput.trim().toLowerCase(),
      });
      const code = response.data?.data?.discountCode || 'GREENFARM10';
      setDiscountCode(code);
      toast.success(`تهانينا! تم تفعيل كود الخصم 10% بنجاح وحفظه في حسابك: ${code}`);
    } catch {
      // Graceful fallback
      setDiscountCode('GREENFARM10');
      toast.success('تهانينا! تم تفعيل كود الخصم 10% بنجاح: GREENFARM10');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    toast.success('تم نسخ كود الخصم إلى الحافظة!');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative bg-slate-50/50 dark:bg-[#00040d] pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden isolate" dir="rtl">
      {/* Ambient Glow Flares */}
      <div className="absolute top-1/4 -right-28 w-96 h-96 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-28 w-96 h-96 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Grid in Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#25D5AB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ==================================================
            1. SECTION HEADER (Almarai + Gradient Highlight)
        ================================================== */}
        <div className="space-y-4 max-w-4xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div className="flex justify-center mb-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/35 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-almarai font-extrabold shadow-sm backdrop-blur-md"
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] animate-pulse" />
              <span>كيف تبدأ رحلتك الزراعية</span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <div className="w-full flex justify-center py-1">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.35] sm:leading-[1.4] lg:leading-[1.45] max-w-4xl text-center"
            >
              ابدأ{' '}
              <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent py-0.5">
                رحلتك مع جرين فارم
              </span>{' '}
              في خطوات بسيطة
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-300 font-almarai font-normal text-xs sm:text-sm md:text-base leading-[1.75] max-w-2xl mx-auto pt-1"
          >
            من التسجيل إلى الاستفادة من الخدمات الزراعية الرقمية، نوفر لك تجربة سهلة وسريعة في منصة واحدة.
          </motion.p>
        </div>

        {/* ==================================================
            2. INTERACTIVE TIMELINE & 4 STEP CARDS CONTAINER
        ================================================== */}
        <div className="relative">
          
          {/* Desktop Connected Gradient Timeline Beam (Hidden on Mobile) */}
          <div className="hidden lg:block absolute top-[52px] right-[12%] left-[12%] h-[3px] z-0 pointer-events-none">
            {/* Background track */}
            <div className="w-full h-full bg-slate-200 dark:bg-slate-800/80 rounded-full" />
            {/* Animated Laser Gradient Beam */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-l from-[#047857] via-[#be1622] to-[#be1622] dark:from-[#00C896] via-[#be1622] to-[#be1622] rounded-full origin-right shadow-sm shadow-[#25D5AB]/30"
            />
          </div>

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isHighlight = step.isHighlight;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 }}
                  className="flex flex-col h-full"
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    borderRadius={24}
                    glowRadius={40}
                    glowIntensity={isHighlight ? 1.3 : 1.0}
                    animated={false}
                    colors={
                      isHighlight
                        ? ['#be1622', '#f43f5e', '#fb7185']
                        : ['#047857', '#059669', '#25D5AB']
                    }
                    className="h-full shadow-md shadow-slate-200/50 dark:shadow-2xl dark:shadow-[#00040d] group transition-transform duration-300 hover:-translate-y-2"
                  >
                    <div
                      className={`p-6 sm:p-7 flex flex-col justify-between h-full relative overflow-hidden select-none transition-colors duration-300 ${
                        isHighlight
                          ? 'bg-white dark:bg-[#0d1119]'
                          : 'bg-white dark:bg-[#0d1119]'
                      }`}
                    >
                      {/* Subtle Ambient Watermark Number in background */}
                      <div className="absolute top-1 left-3 text-6xl sm:text-7xl font-almarai font-black text-slate-100 dark:text-slate-800/30 select-none pointer-events-none">
                        {step.number}
                      </div>

                      {/* Top Row: Icon + Step Badge */}
                      <div className="space-y-5 relative z-10">
                        <div className="flex items-center justify-between">
                          {/* Main Icon Bubble */}
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-xs ${
                              isHighlight
                                ? 'bg-[#be1622]/10 border-[#be1622]/30 text-[#be1622] dark:bg-[#be1622]/15 dark:border-[#be1622]/40'
                                : 'bg-emerald-500/10 dark:bg-[#25D5AB]/15 border-emerald-600/25 dark:border-[#25D5AB]/30 text-emerald-700 dark:text-[#25D5AB]'
                            }`}
                          >
                            <Icon className="w-7 h-7" />
                          </div>

                          {/* Step Number Circular Badge */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-almarai font-black text-xs shadow-md transition-transform duration-300 group-hover:rotate-12 ${
                              isHighlight
                                ? 'bg-gradient-to-r from-[#be1622] via-[#e11d48] to-[#be1622] text-white shadow-[#be1622]/30'
                                : 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 shadow-emerald-700/25 dark:shadow-[#25D5AB]/30'
                            }`}
                          >
                            {step.number}
                          </div>
                        </div>

                        {/* Tag Pill */}
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[11px] font-almarai font-bold px-2.5 py-0.5 rounded-full border ${
                              isHighlight
                                ? 'bg-[#be1622]/10 text-[#be1622] border-[#be1622]/25'
                                : 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-800 dark:text-[#25D5AB] border-emerald-600/25 dark:border-[#25D5AB]/25'
                            }`}
                          >
                            {step.badgeTag}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2 pt-1">
                          <h3
                            className={`text-lg sm:text-xl font-almarai font-extrabold transition-colors ${
                              isHighlight
                                ? 'text-slate-900 dark:text-white group-hover:text-[#be1622]'
                                : 'text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB]'
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm font-almarai font-normal text-slate-600 dark:text-[#999999] leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Footer Accent Line */}
                      <div className="pt-6 relative z-10 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 mt-4">
                        <span className="text-[11px] font-almarai font-bold text-slate-400 dark:text-slate-500">
                          الخطوة {step.id} من 4
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-emerald-500 dark:group-hover:bg-[#25D5AB] transition-colors" />
                          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        </div>
                      </div>

                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ==================================================
            3. LARGE SHOWCASE BANNER WITH HERO.PNG & 10% DISCOUNT
        ================================================== */}
        <BorderGlow
          edgeSensitivity={30}
          borderRadius={32}
          glowRadius={50}
          glowIntensity={1.2}
          animated={false}
          colors={['#047857', '#059669', '#be1622']}
          className="shadow-2xl shadow-slate-200/50 dark:shadow-[#00040d]"
        >
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 dark:from-[#0d1612] dark:via-[#0d1119] dark:to-[#08130e] p-6 sm:p-8 lg:p-12 border border-slate-200/80 dark:border-[#25D5AB]/20">
            
            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Right Column: Content & Discount Lead Form */}
              <div className="lg:col-span-7 space-y-6 text-right">
                
                {/* Special Offer Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#be1622]/10 dark:bg-[#be1622]/15 border border-[#be1622]/30 text-[#be1622] text-xs sm:text-sm font-almarai font-extrabold shadow-sm">
                  <Tag className="w-3.5 h-3.5 text-[#be1622]" />
                  <span>عرض انضمام حصري • خصم 10% فوري</span>
                </div>

                {/* Main Offer Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.5] sm:leading-[1.55] lg:leading-[1.6] tracking-tight">
                  <span className="block pb-1">جاهز لتطوير إنتاجك الزراعي؟</span>
                  <span className="block text-[#be1622] pt-1 sm:pt-2">
                    احصل على خصم 10% على أول طلبية
                  </span>
                </h3>

                {/* Offer Subtitle */}
                <p className="text-xs sm:text-sm md:text-base font-almarai font-normal text-slate-600 dark:text-slate-300 leading-[1.8] sm:leading-[1.85] max-w-xl">
                  أدخل بريدك الإلكتروني الآن واستلم كود الخصم الحصري الصالح على جميع الأسمدة المعتمدة، الأدوية الزراعية، وحجوزات النقل الذكي.
                </p>

                {/* Interactive Email Input & Claim Form */}
                <form onSubmit={handleClaimDiscount} className="space-y-3.5 max-w-lg">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="أدخل بريدك الإلكتروني هنا..."
                        className="w-full bg-white dark:bg-[#070c09] border border-slate-200/90 dark:border-[#1e3b2c] rounded-2xl pr-11 pl-4 py-3.5 text-xs sm:text-sm font-almarai font-normal text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#be1622] focus:ring-1 focus:ring-[#be1622]/30 outline-none transition duration-200 shadow-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#be1622] via-[#e11d48] to-[#be1622] hover:brightness-110 text-white font-almarai font-extrabold text-xs sm:text-sm shadow-lg shadow-[#be1622]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-75 select-none"
                    >
                      <BadgePercent className="w-4.5 h-4.5" />
                      <span>{submitting ? 'جاري التفعيل...' : 'تفعيل خصم 10%'}</span>
                    </button>
                  </div>

                  {/* Active Discount Code Reveal Box */}
                  <AnimatePresence>
                    {discountCode && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-2xl bg-[#be1622]/10 border border-[#be1622]/30 flex items-center justify-between gap-3 overflow-hidden"
                      >
                        <div className="flex items-center gap-2.5">
                          <Gift className="w-5 h-5 text-[#be1622]" />
                          <div>
                            <span className="text-xs font-almarai font-bold text-slate-800 dark:text-slate-100 block">
                              كود الخصم الحصري الخاص بك:
                            </span>
                            <span className="text-sm font-mono font-black text-[#be1622] tracking-wider">
                              {discountCode}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="px-3.5 py-1.5 rounded-xl bg-[#be1622] text-white text-xs font-almarai font-extrabold flex items-center gap-1.5 hover:bg-[#a0121d] transition cursor-pointer shadow-xs"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>نسخ الكود</span>
                            </>
                          )}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Trust Points */}
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-almarai font-medium text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                    <span>تفعيل فوري لكود الخصم</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                    <span>سارٍ على جميع المتاجر والخدمات</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                    <span>بدون أي شروط أو رسوم مخفية</span>
                  </div>
                </div>

              </div>

              {/* Left Column: Enlarged Featured Hero.png Image Showcase */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                
                {/* Ambient Glow under image */}
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-[#be1622]/20 rounded-3xl blur-2xl pointer-events-none" />

                <div className="relative rounded-[26px] overflow-hidden border-2 border-emerald-500/30 dark:border-[#25D5AB]/30 shadow-2xl bg-[#06110a] w-full max-h-[380px] sm:max-h-[420px] flex items-center justify-center group">
                  <img
                    src={heroImg}
                    alt="Green Farm Market Showcase"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Glassmorphism Floating Badge on Image */}
                  <div className="absolute bottom-4 right-4 left-4 p-3.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-right flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#be1622] to-[#e11d48] flex items-center justify-center text-white font-black text-xs shadow-md">
                        10%
                      </div>
                      <div>
                        <span className="text-xs font-almarai font-extrabold text-white block">
                          وفر 10% على استثمارك القادم
                        </span>
                        <span className="text-[10px] font-almarai text-emerald-300">
                          معتمد ومتاح لجميع الأعضاء الجدد
                        </span>
                      </div>
                    </div>

                    <Link to="/register">
                      <button className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-almarai font-extrabold transition flex items-center gap-1 cursor-pointer">
                        <span>انضم الآن</span>
                        <ArrowLeft className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </BorderGlow>

      </div>
    </section>
  );
};

export default HowItWorksSection;

