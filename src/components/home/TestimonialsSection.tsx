import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronRight,
  ChevronLeft,
  MessageSquareHeart,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  MapPin,
  CheckCircle2,
  ThumbsUp,
  Headphones,
  TrendingUp,
} from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  review: string;
  avatarBg: string;
  avatarText: string;
  isRedHighlight?: boolean;
  tag: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'مزارع ومستثمر محاصيل',
      location: 'البحيرة، مصر',
      rating: 5,
      review: 'ساعدتني المنصة في متابعة الإنتاج والوصول إلى حلول زراعية أكثر كفاءة، وتقليل الفاقد في المحصول بنسبة ملحوظة.',
      avatarBg: 'bg-gradient-to-br from-emerald-500 to-teal-700',
      avatarText: 'أم',
      tag: 'عميل معتمد',
    },
    {
      id: 2,
      name: 'محمد علي',
      role: 'مستثمر زراعي ورائد أعمال',
      location: 'الرياض، السعودية',
      rating: 5,
      review: 'واجهة سهلة وخدمات متكاملة جعلت إدارة مشروعي الزراعي أكثر احترافية، مع ربط سريع ومباشر بأسواق التوريد.',
      avatarBg: 'bg-gradient-to-br from-[#be1622] to-[#e11d48]',
      avatarText: 'مع',
      isRedHighlight: true,
      tag: 'شريك استراتيجي',
    },
    {
      id: 3,
      name: 'سارة حسن',
      role: 'مهندسة وقاية وتشخيص نبات',
      location: 'الإسماعيلية، مصر',
      rating: 5,
      review: 'الذكاء الاصطناعي والتوصيات الذكية وفرت علينا الكثير من الوقت والجهد في فحص الآفات وتشخيص الأمراض النباتية بدقة.',
      avatarBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
      avatarText: 'سح',
      tag: 'استشارية زراعية',
    },
    {
      id: 4,
      name: 'خالد إبراهيم',
      role: 'مربي مواشي وتسمين',
      location: 'الشرقية، مصر',
      rating: 5,
      review: 'خدمات الثروة الحيوانية ساعدتني على تحسين المتابعة الدورية واتخاذ قرارات تغذية وعلاج أفضل لقطيع المواشي.',
      avatarBg: 'bg-gradient-to-br from-[#be1622] to-[#e11d48]',
      avatarText: 'خإ',
      isRedHighlight: true,
      tag: 'مربي معتمد',
    },
    {
      id: 5,
      name: 'د. طارق محمود',
      role: 'استشاري تغذية وتطوير مزارع',
      location: 'كفر الشيخ، مصر',
      rating: 5,
      review: 'ربط المزارع بالصيدلية الرقمية والتحاليل الفورية أحدث نقلة نوعية في سرعة علاج المحاصيل والماشية دون تأخير.',
      avatarBg: 'bg-gradient-to-br from-emerald-600 to-teal-800',
      avatarText: 'طم',
      tag: 'خبير زراعي',
    },
    {
      id: 6,
      name: 'م. رانيا عبد العزيز',
      role: 'مديرة بيوت محمية وتصدير',
      location: 'الجيزة، مصر',
      rating: 5,
      review: 'منظومة التوريد والتتبع الذكي عبر GPS سهلت علينا نقل الشحنات بأعلى معايير الجودة وتوفير تكاليف الشحن بشكل ملموس.',
      avatarBg: 'bg-gradient-to-br from-[#be1622] to-[#e11d48]',
      avatarText: 'رع',
      isRedHighlight: true,
      tag: 'إدارة وتصدير',
    },
  ];

  // Carousel State
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = testimonials.length;

  const nextSlide = () => {
    setDirection('right');
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const prevSlide = () => {
    setDirection('left');
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, totalItems]);

  // Compute 3 visible cards on desktop (cycling circularly)
  const visibleIndices = [
    startIndex % totalItems,
    (startIndex + 1) % totalItems,
    (startIndex + 2) % totalItems,
  ];

  return (
    <section
      className="relative bg-slate-50/50 dark:bg-[#00040d] pt-10 sm:pt-14 pb-12 sm:pb-16 overflow-hidden isolate"
      dir="rtl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#25D5AB_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-10 sm:space-y-14">
        
        {/* ==================================================
            1. SECTION HEADER
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
              <MessageSquareHeart className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] animate-pulse" />
              <span>آراء وتجارب العملاء</span>
            </motion.div>
          </div>

          {/* Main Heading */}
          <div className="w-full flex justify-center py-1">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] lg:leading-[1.5] max-w-4xl text-center"
            >
              شركاؤنا يثقون في{' '}
              <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent py-0.5">
                حلولنا الزراعية
              </span>
            </motion.h2>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-600 dark:text-slate-300 font-almarai font-normal text-xs sm:text-sm md:text-base leading-[1.8] sm:leading-[1.85] max-w-2xl mx-auto pt-1"
          >
            تجارب حقيقية من مستخدمين استفادوا من خدمات جرين فارم وطوروا أعمالهم الزراعية.
          </motion.p>
        </div>

        {/* ==================================================
            2. TESTIMONIAL CAROUSEL CONTAINER WITH TOP ARROWS
        ================================================== */}
        <div className="space-y-6">
          
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-almarai font-extrabold text-slate-800 dark:text-slate-200">
                4.9 / 5 تقييم الرضا العام
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[11px] font-almarai font-bold bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-800 dark:text-[#25D5AB] border border-emerald-600/20 dark:border-[#25D5AB]/20">
                {startIndex + 1} من {totalItems}
              </span>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="الشهادة السابقة"
                className="w-11 h-11 rounded-2xl bg-white dark:bg-[#0d1119] border border-slate-200/90 dark:border-[#25D5AB]/30 text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 dark:hover:bg-[#25D5AB]/15 hover:border-emerald-500 dark:hover:border-[#25D5AB] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="الشهادة التالية"
                className="w-11 h-11 rounded-2xl bg-white dark:bg-[#0d1119] border border-slate-200/90 dark:border-[#25D5AB]/30 text-slate-700 dark:text-slate-200 hover:bg-emerald-500/10 dark:hover:bg-[#25D5AB]/15 hover:border-emerald-500 dark:hover:border-[#25D5AB] flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md hover:scale-105 active:scale-95 group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* 3 Visible Cards Window with Smooth Transition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {visibleIndices.map((cardIndex, position) => {
              const item = testimonials[cardIndex];
              const isHighlight = item.isRedHighlight;

              return (
                <motion.div
                  key={`${item.id}-${cardIndex}-${startIndex}`}
                  initial={{ opacity: 0, x: direction === 'right' ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction === 'right' ? -30 : 30 }}
                  transition={{ duration: 0.35, delay: position * 0.08 }}
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
                    className="h-full shadow-md shadow-slate-200/50 dark:shadow-2xl dark:shadow-[#00040d] transition-transform duration-300 hover:-translate-y-2 group"
                  >
                    <div
                      className={`p-6 sm:p-7 rounded-[24px] flex flex-col justify-between h-full relative overflow-hidden select-none border ${
                        isHighlight
                          ? 'bg-white dark:bg-[#0d1119] border-[#be1622]/30 dark:border-[#be1622]/40'
                          : 'bg-white dark:bg-[#0d1119] border-slate-200/80 dark:border-[#25D5AB]/25'
                      }`}
                    >
                      {/* Giant Subtle Background Watermark Quote */}
                      <Quote
                        className={`absolute top-3 left-3 w-16 h-16 pointer-events-none opacity-10 ${
                          isHighlight ? 'text-[#be1622]' : 'text-emerald-500 dark:text-[#25D5AB]'
                        }`}
                      />

                      {/* Top Row: Stars + Tag */}
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center justify-between">
                          {/* 5 Gold Stars */}
                          <div className="flex items-center gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                            ))}
                          </div>

                          {/* Role Tag Pill */}
                          <span
                            className={`text-[10px] sm:text-[11px] font-almarai font-extrabold px-2.5 py-0.5 rounded-full border ${
                              isHighlight
                                ? 'bg-[#be1622]/10 text-[#be1622] border-[#be1622]/30'
                                : 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-800 dark:text-[#25D5AB] border-emerald-600/25 dark:border-[#25D5AB]/25'
                            }`}
                          >
                            {item.tag}
                          </span>
                        </div>

                        {/* Review Content */}
                        <p className="font-almarai text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-200 leading-[1.85] pt-1">
                          "{item.review}"
                        </p>
                      </div>

                      {/* Bottom Author Profile */}
                      <div className="pt-6 relative z-10 flex items-center gap-3.5 border-t border-slate-100 dark:border-slate-800/80 mt-5">
                        {/* Avatar Bubble */}
                        <div
                          className={`w-12 h-12 rounded-2xl ${item.avatarBg} text-white font-almarai font-black text-sm flex items-center justify-center shrink-0 shadow-md shadow-black/10 border-2 border-white/20`}
                        >
                          {item.avatarText}
                        </div>

                        {/* Name & Job */}
                        <div className="flex-1 min-w-0 text-right">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-almarai font-extrabold text-slate-900 dark:text-white truncate">
                              {item.name}
                            </h4>
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isHighlight ? 'text-[#be1622]' : 'text-emerald-600 dark:text-[#25D5AB]'
                              }`}
                            />
                          </div>

                          <span className="text-xs font-almarai font-medium text-slate-500 dark:text-slate-400 block truncate">
                            {item.role}
                          </span>

                          <div className="flex items-center gap-1 text-[11px] font-almarai text-slate-400 dark:text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setDirection(index > startIndex ? 'right' : 'left');
                  setStartIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  startIndex === index
                    ? 'w-8 bg-gradient-to-r from-[#047857] to-[#be1622] dark:from-[#25D5AB] dark:to-[#be1622]'
                    : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                }`}
                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
              />
            ))}
          </div>

        </div>

        {/* ==================================================
            3. LUXURY HIGH-CONVERTING SOCIAL PROOF TRUST BANNER
        ================================================== */}
        <BorderGlow
          edgeSensitivity={30}
          borderRadius={28}
          glowRadius={45}
          glowIntensity={1.2}
          animated={false}
          colors={['#047857', '#059669', '#be1622']}
          className="shadow-xl shadow-slate-200/50 dark:shadow-[#00040d]"
        >
          <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 dark:from-[#0d1612] dark:via-[#0d1119] dark:to-[#170e10] border border-slate-200/80 dark:border-[#25D5AB]/25 relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              
              {/* Right Side: Avatar Stack + Major Achievement */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
                
                {/* Overlapping Avatar Stack with Glowing Rim */}
                <div className="flex -space-x-3 space-x-reverse shrink-0 pt-1">
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0d1119] bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                    أم
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0d1119] bg-gradient-to-br from-[#be1622] to-rose-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                    مع
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0d1119] bg-gradient-to-br from-teal-400 to-emerald-700 flex items-center justify-center text-white font-black text-xs shadow-md">
                    سح
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0d1119] bg-gradient-to-br from-[#be1622] to-[#991b1b] flex items-center justify-center text-white font-black text-xs shadow-md">
                    خإ
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-[#0d1119] bg-emerald-600 flex items-center justify-center text-white font-extrabold text-[11px] shadow-md">
                    +6k
                  </div>
                </div>

                {/* Headline & Description */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="text-base sm:text-xl font-almarai font-extrabold text-slate-900 dark:text-white leading-tight">
                    أكثر من{' '}
                    <span className="text-[#be1622] font-black font-mono text-xl sm:text-2xl px-1">
                      +6,000
                    </span>{' '}
                    مزارع ومستثمر يثقون بمنصة جرين فارم
                  </h4>
                  <p className="text-xs sm:text-sm font-almarai font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                    منظومة زراعية رقمية متكاملة تحقق أعلى عوائد إنتاجية واستثمارية مستدامة في مصر والشرق الأوسط.
                  </p>
                </div>

              </div>

              {/* Left Side: 3 Micro Trust Feature Badges */}
              <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-center lg:justify-end gap-2.5">
                <div className="px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#070c09] border border-slate-200/90 dark:border-[#1e3b2c] flex items-center gap-2 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB] shrink-0" />
                  <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                    تقييمات موثقة 100%
                  </span>
                </div>

                <div className="px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#070c09] border border-slate-200/90 dark:border-[#1e3b2c] flex items-center gap-2 shadow-xs">
                  <ThumbsUp className="w-4 h-4 text-[#be1622] shrink-0" />
                  <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                    99.4% رضا الشركاء
                  </span>
                </div>

                <div className="px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-[#070c09] border border-slate-200/90 dark:border-[#1e3b2c] flex items-center gap-2 shadow-xs">
                  <Headphones className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB] shrink-0" />
                  <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                    دعم 24/7
                  </span>
                </div>
              </div>

            </div>

          </div>
        </BorderGlow>

      </div>
    </section>
  );
};

export default TestimonialsSection;
