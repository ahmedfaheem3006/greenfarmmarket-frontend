import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  Plus,
  Minus,
  Check,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Leaf,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Bot,
  Zap,
} from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isRedHighlight?: boolean;
}

export const FaqSection: React.FC = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      id: 1,
      question: 'ما هي منصة جرين فارم؟',
      answer:
        'جرين فارم منصة رقمية تجمع الزراعة والتقنية والتمويل والأسواق في منظومة واحدة لمساعدة المزارعين والمستثمرين على تطوير أعمالهم.',
      category: 'عن المنصة',
      isRedHighlight: true,
    },
    {
      id: 2,
      question: 'كيف يمكنني إنشاء حساب في المنصة؟',
      answer:
        'يمكنك التسجيل بسهولة عبر رقم الهاتف أو البريد الإلكتروني، ثم إضافة بياناتك الأساسية، والبدء فوراً باستكشاف الخدمات المتاحة.',
      category: 'التسجيل والحساب',
    },
    {
      id: 3,
      question: 'ما الخدمات التي توفرها المنصة؟',
      answer:
        'نوفر منظومة متكاملة تشمل خدمات الزراعة الذكية، صيدلية وتشخيص أمراض النبات والمواشي بالذكاء الاصطناعي، الأسواق المباشرة، التمويل الزراعي، وحلول النقل والتتبع الذكي.',
      category: 'الخدمات والحلول',
    },
    {
      id: 4,
      question: 'هل المنصة مناسبة للمزارعين فقط؟',
      answer:
        'لا، المنصة مصممة لخدمة المزارعين والمستثمرين ومربي المواشي والتجار وشركات النقل وجميع المهتمين بالقطاع الزراعي في منظومة رقمية متكاملة.',
      category: 'المستفيدون',
    },
    {
      id: 5,
      question: 'كيف يساعد الذكاء الاصطناعي المستخدمين؟',
      answer:
        'يساعد في تحليل صور المحاصيل والمواشي للكشف المبكر عن الأمراض والآفات، تحسين جودة الإنتاج، خفض تكاليف العلاج، وتقديم توصيات زراعية ذكية مخصصة على مدار 24/7.',
      category: 'الذكاء الاصطناعي',
      isRedHighlight: true,
    },
    {
      id: 6,
      question: 'هل يمكنني بيع منتجاتي من خلال المنصة؟',
      answer:
        'نعم، توفر المنصة ربط المنتجين والمزارعين بالأسواق والمشترين مباشرة دون وسطاء مع أمان مدفوعات كامل وخيارات شحن سريعة وموثوقة.',
      category: 'البيع والشراء',
    },
    {
      id: 7,
      question: 'كيف أبدأ الاستفادة من الخدمات؟',
      answer:
        'أنشئ حسابك مجاناً، أكمل بيانات ملفك، واختر الخدمة المناسبة لبدء رحلتك الزراعية الرقمية والاستفادة من عروض المنصة وكوبونات الخصم الفورية.',
      category: 'البدء الفوري',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-slate-50/50 dark:bg-[#00040d] pt-10 sm:pt-14 pb-8 sm:pb-12 overflow-hidden isolate" dir="rtl">
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Subtle Grid Pattern in Background */}
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
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] animate-pulse" />
              <span>الأسئلة الشائعة</span>
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
              كل ما تحتاج معرفته{' '}
              <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent py-0.5">
                قبل البدء
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
            إجابات واضحة تساعدك على فهم خدمات منصة جرين فارم وتجربة المنصة بسهولة.
          </motion.p>
        </div>

        {/* ==================================================
            2. TWO-COLUMN LAYOUT: (Left: Visual Card | Right: Accordion)
        ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ==============================================
              RIGHT COLUMN: 7 FAQ ACCORDION ITEMS (lg:col-span-7)
          ============================================== */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const isHighlight = faq.isRedHighlight;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    borderRadius={20}
                    glowRadius={35}
                    glowIntensity={isOpen ? 1.2 : 0.8}
                    animated={false}
                    colors={
                      isHighlight || isOpen
                        ? isOpen && isHighlight
                          ? ['#be1622', '#f43f5e', '#fb7185']
                          : ['#047857', '#059669', '#25D5AB']
                        : ['#047857', '#059669', '#25D5AB']
                    }
                    className={`transition-all duration-300 ${
                      isOpen
                        ? 'shadow-lg shadow-emerald-500/10 dark:shadow-[#25D5AB]/10'
                        : 'shadow-xs'
                    }`}
                  >
                    <div
                      className={`rounded-[20px] transition-colors duration-300 overflow-hidden ${
                        isOpen
                          ? 'bg-white dark:bg-[#0d1119] border border-emerald-500/40 dark:border-[#25D5AB]/40'
                          : 'bg-white dark:bg-[#0d1119] border border-slate-200/80 dark:border-[#25D5AB]/20 hover:border-emerald-500/30 dark:hover:border-[#25D5AB]/30'
                      }`}
                    >
                      {/* Accordion Header Button */}
                      <button
                        type="button"
                        onClick={() => toggleAccordion(index)}
                        className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none"
                      >
                        <div className="flex items-center gap-3.5 flex-1 min-w-0">
                          {/* Number / Status Badge */}
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-almarai font-black text-xs shrink-0 transition-all duration-300 ${
                              isOpen
                                ? isHighlight
                                  ? 'bg-[#be1622] text-white shadow-md shadow-[#be1622]/30 scale-105'
                                  : 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 shadow-md shadow-emerald-700/25 scale-105'
                                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            {isOpen ? (
                              <Check className="w-4 h-4 stroke-[3]" />
                            ) : (
                              <span>0{faq.id}</span>
                            )}
                          </div>

                          {/* Question Text */}
                          <span
                            className={`font-almarai text-sm sm:text-base font-extrabold transition-colors leading-[1.5] ${
                              isOpen
                                ? isHighlight
                                  ? 'text-[#be1622]'
                                  : 'text-emerald-800 dark:text-[#25D5AB]'
                                : 'text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-[#25D5AB]'
                            }`}
                          >
                            {faq.question}
                          </span>
                        </div>

                        {/* Plus/Minus Toggle Icon */}
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? 'bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] rotate-180'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                          )}
                        </div>
                      </button>

                      {/* Accordion Smooth Expandable Body */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-right border-t border-slate-100 dark:border-slate-800/80">
                              <p className="font-almarai text-xs sm:text-sm font-normal text-slate-600 dark:text-[#999999] leading-[1.85] sm:leading-[1.9]">
                                {faq.answer}
                              </p>
                              
                              <div className="mt-3.5 pt-3 border-t border-slate-100/80 dark:border-slate-800/50 flex items-center justify-between text-[11px] font-almarai font-bold text-slate-400 dark:text-slate-500">
                                <span>التصنيف: {faq.category}</span>
                                <span className="text-emerald-700 dark:text-[#25D5AB] flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> إجابة معتمدة
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

          {/* ==============================================
              LEFT COLUMN: FUTURISTIC AGRITECH SUPPORT SHOWCASE (lg:col-span-5)
          ============================================== */}
          <div className="lg:col-span-5 space-y-6">
            <BorderGlow
              edgeSensitivity={30}
              borderRadius={28}
              glowRadius={45}
              glowIntensity={1.2}
              animated={false}
              colors={['#047857', '#059669', '#be1622']}
              className="shadow-2xl shadow-slate-200/50 dark:shadow-[#00040d]"
            >
              <div className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-[#0d1119] border border-slate-200/80 dark:border-[#25D5AB]/25 relative overflow-hidden space-y-6 text-right select-none">
                {/* Background Ambient Highlight */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#be1622]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge & Header */}
                <div className="space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs font-almarai font-extrabold shadow-sm">
                    <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] animate-pulse" />
                    <span>مساعد جرين فارم الذكي 24/7</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.4]">
                    لديك استفسار زراعي أو فني مخصص؟
                  </h3>

                  <p className="text-xs sm:text-sm font-almarai font-normal text-slate-600 dark:text-slate-300 leading-[1.8]">
                    فريق الدعم الفني والمهندسون الزراعيون المعتمدون جاهزون لتقديم استشارات فورية ومساعدتك في اختيار أنسب الحلول لمزرعتك.
                  </p>
                </div>

                {/* Interactive Highlights Box */}
                <div className="space-y-2.5 relative z-10">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c09] border border-slate-200/80 dark:border-[#1e3b2c] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center">
                        <Zap className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white block">
                          استجابة فورية فائقة السرعة
                        </span>
                        <span className="text-[11px] font-almarai text-slate-500 dark:text-slate-400">
                          خلال أقل من 60 ثانية عبر الذكاء الاصطناعي
                        </span>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c09] border border-slate-200/80 dark:border-[#1e3b2c] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#be1622]/10 text-[#be1622] flex items-center justify-center">
                        <ShieldCheck className="w-4.5 h-4.5" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white block">
                          استشارات زراعية وبيطرية معتمدة
                        </span>
                        <span className="text-[11px] font-almarai text-slate-500 dark:text-slate-400">
                          بإشراف نخبة من الخبراء والاستشاريين
                        </span>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#be1622]" />
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 space-y-3 relative z-10">
                  <Link to="/contact" className="block">
                    <button className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 font-almarai font-black text-xs sm:text-sm shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none">
                      <MessageCircle className="w-4 h-4" />
                      <span>تحدث مع الدعم الفني الآن</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </Link>

                  <a
                    href="https://wa.me/201000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <button className="w-full py-3 px-6 rounded-2xl bg-white dark:bg-[#0a120e] text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-[#25D5AB]/50 font-almarai font-extrabold text-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB]" />
                      <span>تواصل عبر واتساب المباشر</span>
                    </button>
                  </a>
                </div>

              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FaqSection;
