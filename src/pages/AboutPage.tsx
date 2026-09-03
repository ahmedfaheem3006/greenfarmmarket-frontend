import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoLightImg from '../assets/Final_logo.png';
import logoWhiteImg from '../assets/Logo_white.png';
import marketplaceImg1 from '../assets/Digital Agricultural Marketplace.webp';
import marketplaceImg2 from '../assets/Digital Agricultural 1 Marketplace.webp';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  CheckCircle2,
  Store,
  Truck,
  Stethoscope,
  Briefcase,
  Newspaper,
  ShieldCheck,
  TrendingUp,
  Target,
  Compass,
  Building2,
  Lightbulb,
  Lock,
  Leaf,
  Users,
  Award,
  Layers,
  Calendar,
  Zap,
  Globe,
  Check,
  Activity,
  BarChart3,
  Bot,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  // Accordion state for Strategic 5 Axes
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  const strategicAxes = [
    {
      id: 0,
      num: '01',
      title: 'تمكين الاقتصاد الرقمي الزراعي (Ag-Tech Empowerment)',
      goal: 'إعادة هيكلة وتطوير منظومة التداول الزراعي التقليدية عبر دمج الذكاء الاصطناعي والأتمتة السحابية.',
      impact: 'تقليل هدر المحاصيل والفاقد التسويقي بنسبة تتجاوز 30% مع رفع كفاءة التوزيع.',
      implementation: 'منصة تداول ذكية مفتوحة تلغي الوسطاء وتربط المزارع بأسواق الجملة والتجزئة مباشرة.',
      tag: 'اقتصاد رقمي',
      color: '#00C896',
    },
    {
      id: 1,
      num: '02',
      title: 'تحقيق الاستدامة وحماية الموارد الطبيعية (Sustainability First)',
      goal: 'إدارة الموارد المائية والتربة بطرق علمية مؤتمتة بالاستفادة من تحليلات الطقس والحساسات الذكية.',
      impact: 'ترشيد استهلاك مياه الري بنسبة 40% وحماية خصوبة التربة على المدى الطويل.',
      implementation: 'توصيات زراعية موجهة بالذكاء الاصطناعي لكل محصول ونوع تربة عبر المنصة.',
      tag: 'استدامة بيئية',
      color: '#25D5AB',
    },
    {
      id: 2,
      num: '03',
      title: 'ترسيخ الاعتمادية والشفافية التجارية (Market Credibility)',
      goal: 'بناء بيئة تجارية موثوقة تضمن تسعيراً عادلاً وحماية مالية لكافة أطراف المعاملات الزراعية.',
      impact: 'زيادة أرباح المنتجين بنسبة تصل إلى 25% مع توفير أسعار تنافسية للمشترين.',
      implementation: 'نظام تقييم معتمد للمنتجين وتتبع مباشر لرحلات الشحن عبر GPS مع ضمان الاستلام.',
      tag: 'شفافية وأمان',
      color: '#be1622',
    },
    {
      id: 3,
      num: '04',
      title: 'تعزيز الاستثمار وحماية الأصول الزراعية (Investment Defense)',
      goal: 'جذب المستثمرين والمغتربين للاستثمار في مشروعات الزراعة والإنتاج الحيواني بأعلى معايير الأمان.',
      impact: 'تحويل المزارع إلى أصول استثمارية مدرة للدخل وتوسيع الرقعة الخضراء في مصر والشرق الأوسط.',
      implementation: 'دراسات جدوى رقمية، استشارات بيطرية وزراعية معتمدة، وغطاء إداري وقانوني متكامل.',
      tag: 'استثمار وحماية',
      color: '#f59e0b',
    },
    {
      id: 4,
      num: '05',
      title: 'التنمية المستدامة للأيدي العاملة والكوادر (Empowering Labor Force)',
      goal: 'دمج التكنولوجيا بالخبرات البشرية وخلق مجتمع ريفي متطور عبر ملتقى توظيف مجاني متخصص.',
      impact: 'توفير آلاف فرص العمل للمهندسين والعمال والفنيين ورفع الكفاءة التشغيلية للمزارع.',
      implementation: 'بوابة توظيف متكاملة تتيح لأصحاب المزارع استقطاب الكفاءات والتواصل الفوري معهم.',
      tag: 'تنمية بشرية',
      color: '#8b5cf6',
    },
  ];

  const ecosystemCards = [
    {
      id: 1,
      num: '100%',
      title: 'التجارة المباشرة',
      desc: 'إلغاء حلقة الوسطاء وتعظيم أرباح المنتجين بربط المزارعين مباشرة بالأسواق والمستهلكين.',
      icon: Store,
      color: '#00C896',
      bgGrad: 'from-emerald-500/10 to-teal-500/5',
      badge: 'تداول مباشر',
      link: '/marketplace',
    },
    {
      id: 2,
      num: 'GPS Live',
      title: 'النقل واللوجستيات',
      desc: 'حلول نقل سهلة ومؤمنة بالكامل للمواشي والمحاصيل مع تتبع مسار الرحلات لحظة بلحظة.',
      icon: Truck,
      color: '#25D5AB',
      bgGrad: 'from-teal-500/10 to-emerald-500/5',
      badge: 'شحن ذكي',
      link: '/transport',
    },
    {
      id: 3,
      num: 'AI Vision',
      title: 'AI Doctor',
      desc: 'تشخيص فوري لأمراض النباتات والحيوانات عبر كاميرا الهاتف بذكاء اصطناعي دقيق.',
      icon: Stethoscope,
      color: '#be1622',
      bgGrad: 'from-rose-500/10 to-red-500/5',
      badge: 'صيدلية وفحص',
      link: '/ai-doctor',
    },
    {
      id: 4,
      num: 'مباشر',
      title: 'التوظيف الزراعي',
      desc: 'ربط أصحاب المزارع بالعمال والمهندسين الزراعيين والأطباء البيطريين مجاناً.',
      icon: Briefcase,
      color: '#f59e0b',
      bgGrad: 'from-amber-500/10 to-orange-500/5',
      badge: 'ملتقى الكوادر',
      link: '/jobs',
    },
    {
      id: 5,
      num: '24/7',
      title: 'الأخبار والبورصة',
      desc: 'متابعة لحظية لأسعار المحاصيل والمواشي مع تحليلات ذكية وتوقعات الطقس الزراعي.',
      icon: Newspaper,
      color: '#8b5cf6',
      bgGrad: 'from-purple-500/10 to-indigo-500/5',
      badge: 'مؤشرات السوق',
      link: '/news',
    },
  ];

  const coreValues = [
    {
      title: 'الابتكار التقني المستمر',
      subtitle: 'Innovation',
      desc: 'تطوير حلول رائدة في الرؤية الحاسوبية والذكاء الاصطناعي لإعادة ابتكار التجربة الزراعية بالكامل.',
      icon: Lightbulb,
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      borderGlow: ['#00C896', '#25D5AB', '#6EE7B7'],
      badge: 'ريادة وابتكار',
    },
    {
      title: 'الشفافية والاعتمادية',
      subtitle: 'Transparency',
      desc: 'بناء جسور الثقة في كل معاملة تجارية وشحنة نقل، مع وضوح كامل في الأسعار والتقييمات.',
      icon: Lock,
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      borderGlow: ['#00C896', '#25D5AB', '#6EE7B7'],
      badge: 'ثقة مطلقة',
    },
    {
      title: 'الاستدامة البيئية',
      subtitle: 'Sustainability',
      desc: 'ترشيد استهلاك المياه، تقليل البصمة الكربونية لسلاسل الإمداد، وحماية التنوع الحيوي الزراعي.',
      icon: Leaf,
      color: 'text-[#be1622]',
      borderGlow: ['#be1622', '#f43f5e', '#fb7185'],
      badge: 'كوكب أخضر',
    },
    {
      title: 'التمكين الاقتصادي',
      subtitle: 'Empowerment',
      desc: 'تمكين صغار وكبار المزارعين والمربين وأصحاب المهن من تحقيق أعلى عوائد مستحقة لجهودهم.',
      icon: Users,
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      borderGlow: ['#00C896', '#25D5AB', '#6EE7B7'],
      badge: 'تنمية مجتمعية',
    },
    {
      title: 'الاقتصاد الأخضر الذكي',
      subtitle: 'Green Economy',
      desc: 'تحويل الزراعة من نشاط تقليدي إلى استثمار رقمي مستدام يجذب رؤوس الأموال المحلية والإقليمية.',
      icon: TrendingUp,
      color: 'text-[#be1622]',
      borderGlow: ['#be1622', '#f43f5e', '#fb7185'],
      badge: 'استثمار مستدام',
    },
  ];

  const digitalModules = [
    {
      id: 'marketplace',
      num: '01',
      title: 'سوق التداول المباشر',
      category: 'Marketplace Module',
      desc: 'منصة بيع وشراء ذكية تشمل المواشي، الشتلات، المحاصيل، الأعلاف، المعدات وقطع الغيار دون أي وسيط.',
      features: ['تداول حر ومباشر بين المنتج والمشتري', 'دعم تسعير عادل وعروض فورية', 'ضمان توثيق العضويات والمنتجات'],
      icon: Store,
      link: '/marketplace',
      btnText: 'تصفح السوق الزراعي',
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      accentBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
      borderColor: 'border-emerald-600/30 dark:border-[#25D5AB]/30',
      isRed: false,
    },
    {
      id: 'transport',
      num: '02',
      title: 'النقل واللوجستيات الذكية',
      category: 'Smart Logistics Module',
      desc: 'أسطول سيارات نقل مجهزة للمواشي والمحاصيل المبردة مع تتبع مباشر وتأمين شامل على الشحنات.',
      features: ['طلب فوري لسيارات النقل والتوصيل', 'تتبع حي لمسار الشاحنات عبر الخرائط', 'تسعير دقيق وشفاف بدون مبالغة'],
      icon: Truck,
      link: '/transport',
      btnText: 'طلب شاحنة نقل',
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      accentBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
      borderColor: 'border-emerald-600/30 dark:border-[#25D5AB]/30',
      isRed: false,
    },
    {
      id: 'ai-doctor',
      num: '03',
      title: 'صيدلية وفحص AI النبات والحيوان',
      category: 'AI Diagnostic Module',
      desc: 'تشخيص فوري للأمراض والآفات الزراعية والبيطرية عبر كاميرا الهاتف بذكاء اصطناعي وخوارزميات دقيقة.',
      features: ['فحص فوري لأمراض المحاصيل عبر الصور', 'تشخيص علامات أعراض الماشية والأبقار', 'توصيات أدوية وجرعات وإرشادات وقائية'],
      icon: Stethoscope,
      link: '/ai-doctor',
      btnText: 'تجربة الفحص بالذكاء الاصطناعي',
      color: 'text-[#be1622]',
      accentBg: 'bg-[#be1622]/10',
      borderColor: 'border-[#be1622]/35',
      isRed: true,
    },
    {
      id: 'jobs',
      num: '04',
      title: 'ملتقى الوظائف والكوادر',
      category: 'Talent & Employment Module',
      desc: 'بوابة توظيف رقمية متخصصة تجمع بين المزارع والشركات والمهندسين الزراعيين والأطباء البيطريين والعمالة.',
      features: ['نشر وإدارة إعلانات الوظائف مجاناً', 'تواصل مباشر وسريع مع المتقدمين', 'تصنيف الكفاءات والخبرات المعتمدة'],
      icon: Briefcase,
      link: '/jobs',
      btnText: 'استكشاف فرص التوظيف',
      color: 'text-emerald-700 dark:text-[#25D5AB]',
      accentBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
      borderColor: 'border-emerald-600/30 dark:border-[#25D5AB]/30',
      isRed: false,
    },
    {
      id: 'news',
      num: '05',
      title: 'البورصة والنشرة الإخبارية',
      category: 'Market Intelligence Module',
      desc: 'شاشة معلوماتية حية ترصد أسعار الحبوب، اللحوم، الأعلاف، والطقس مع ملخصات وتحليلات ذكية لحظية.',
      features: ['تحديثات حية لبورصة السلع والمحاصيل', 'نشرات دورية بملخصات الذكاء الاصطناعي', 'تنبؤات الطقس وتأثيره على الإنتاج'],
      icon: Newspaper,
      link: '/news',
      btnText: 'متابعة أسعار البورصة',
      color: 'text-[#be1622]',
      accentBg: 'bg-[#be1622]/10',
      borderColor: 'border-[#be1622]/35',
      isRed: true,
    },
  ];

  const roadmapMilestones = [
    {
      year: '2026',
      badge: 'المرحلة الأولى',
      title: 'الانطلاقة والتغطية الشاملة بمصر',
      desc: 'بناء المنظومة الرقمية، تغطية كافة المحافظات المصرية، وتأهيل آلاف المزارعين والمربين للتداول والنقل الذكي.',
      achievements: ['إطلاق بوابات السوق المباشر والنقل', 'نشر نماذج AI Doctor للفحص الفوري', 'بناء أسطول اللوجستيات الذكي'],
      color: '#00C896',
      accentColor: 'text-emerald-700 dark:text-[#25D5AB]',
      borderColor: 'border-emerald-500/40 dark:border-[#25D5AB]/40',
      bgGlow: 'bg-emerald-500/10',
    },
    {
      year: '2027',
      badge: 'المرحلة الثانية',
      title: 'التوسع العربي والربط الإقليمي',
      desc: 'تصدير النموذج التقني الزراعي للأسواق العربية الشقيقة (السعودية، الإمارات، الأردن، وشمال إفريقيا) وتسهيل التجارة البينية.',
      achievements: ['منظومة التبادل التجاري العابر للحدود', 'منصات تسعير وبورصات إقليمية موحدة', 'توسيع نطاق الاستثمار الزراعي المشترك'],
      color: '#25D5AB',
      accentColor: 'text-teal-700 dark:text-[#25D5AB]',
      borderColor: 'border-teal-500/40 dark:border-teal-400/40',
      bgGlow: 'bg-teal-500/10',
    },
    {
      year: '2028',
      badge: 'المرحلة الثالثة',
      title: 'الريادة الإفريقية والمركز الزراعي الذكي',
      desc: 'ترسيخ المنصة كأكبر محور تقني زراعي متكامل في إفريقيا والشرق الأوسط، يقود الابتكار الأخضر والأمن الغذائي المستدام.',
      achievements: ['الريادة في حلول الاستشعار والأمن الغذائي', 'شراكات دولية لإدارة الاستثمارات الخضراء', 'أتمتة كاملة لسلاسل الإمداد من الحقل للمستهلك'],
      color: '#be1622',
      accentColor: 'text-[#be1622]',
      borderColor: 'border-[#be1622]/40',
      bgGlow: 'bg-[#be1622]/10',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f5f7] dark:bg-[#00040d] text-[#12252f] dark:text-white font-almarai overflow-hidden selection:bg-emerald-500 selection:text-white" dir="rtl">
      
      {/* ==================================================
          SECTION 1: ABOUT HERO EXPERIENCE
      ================================================== */}
      <section className="relative pt-14 sm:pt-20 pb-20 sm:pb-28 overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        
        {/* Futuristic Ambient Orbs */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-[#25D5AB]/10 to-transparent dark:from-[#25D5AB]/20 dark:via-[#00C896]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-40 w-96 h-96 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtle Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#25D5AB_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.04] dark:opacity-[0.07] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-9">
          
          {/* Ultra-Premium 3D Floating Logo Showcase Pedestal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center py-1"
          >
            <div className="relative group cursor-pointer">
              
              {/* Concentric Multi-Color Ambient Glow Rings */}
              <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/25 via-[#25D5AB]/30 to-[#be1622]/25 rounded-[36px] blur-2xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />
              
              {/* Luxury Floating Glass Container */}
              <div className="relative z-10 p-4 sm:p-6 rounded-[32px] bg-gradient-to-b from-white/95 to-slate-50/90 dark:from-[#0d1612]/95 dark:to-[#070c09]/95 border-2 border-emerald-500/30 dark:border-[#25D5AB]/40 shadow-2xl shadow-emerald-600/15 dark:shadow-[#00040d] backdrop-blur-xl transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                
                {/* Verified Brand Badge Header */}
                <div className="flex items-center justify-center gap-1.5 pb-2.5 mb-2 border-b border-slate-200/80 dark:border-[#1e3b2c]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                  <span className="text-[11px] sm:text-xs font-mono font-extrabold text-emerald-800 dark:text-[#25D5AB] tracking-wide">
                    GREEN FARM MARKET • منظومة زراعية معتمدة
                  </span>
                </div>

                {/* The Dynamic Logo View (Light & Dark Mode) */}
                <div className="px-4 py-1 flex items-center justify-center">
                  {/* Light Mode Logo */}
                  <img
                    src={logoLightImg}
                    alt="شعار جرين فارم ماركت"
                    className="block dark:hidden h-28 sm:h-36 md:h-44 w-auto object-contain select-none filter drop-shadow-md transition-all duration-300 group-hover:drop-shadow-xl"
                  />
                  {/* Dark Mode Logo */}
                  <img
                    src={logoWhiteImg}
                    alt="شعار جرين فارم ماركت"
                    className="hidden dark:block h-28 sm:h-36 md:h-44 w-auto object-contain select-none filter drop-shadow-2xl transition-all duration-300 group-hover:drop-shadow-[0_15px_30px_rgba(37,213,171,0.35)]"
                  />
                </div>

                {/* Bottom Trust Pills */}
                <div className="flex items-center justify-center gap-2 pt-2.5 mt-2 border-t border-slate-200/80 dark:border-[#1e3b2c]">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB]">
                    ذكاء اصطناعي AI
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#be1622]/10 text-[#be1622]">
                    تجارة مباشرة 100%
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    لوجستيات ذكية
                  </span>
                </div>

              </div>

            </div>
          </motion.div>

          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/35 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-extrabold shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-[#25D5AB] animate-pulse" />
              <span>المنظومة التكنولوجية الزراعية الأولى في الشرق الأوسط</span>
            </div>
          </motion.div>

          {/* Main Hero Headline with Generous Leading and Spacing */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-slate-900 dark:text-white leading-[1.45] sm:leading-[1.5] lg:leading-[1.55] max-w-5xl mx-auto tracking-tight"
          >
            نبني مستقبل{' '}
            <span className="inline-block py-1 px-1.5 leading-tight bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent">
              الزراعة الذكية
            </span>{' '}
            من خلال التكنولوجيا والذكاء الاصطناعي
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 font-normal leading-[1.9] sm:leading-[2.0] max-w-3xl mx-auto pt-1"
          >
            المنصة التكنولوجية الأولى في الشرق الأوسط التي تدمج التجارة المباشرة، النقل الذكي، التوظيف الزراعي، وتشخيص الأمراض بالذكاء الاصطناعي لإحداث ثورة رقمية مستدامة.
          </motion.p>

          {/* Two CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/marketplace"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#047857] to-[#059669] dark:from-[#00C896] dark:to-[#25D5AB] text-white dark:text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 dark:shadow-[#25D5AB]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>ابدأ رحلتك الزراعية</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>

            <a
              href="#ecosystem"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/90 dark:bg-[#0d1119]/90 border border-slate-300/90 dark:border-[#25D5AB]/30 text-slate-800 dark:text-slate-200 font-extrabold text-sm sm:text-base shadow-xs hover:border-emerald-500 dark:hover:border-[#25D5AB] hover:bg-slate-50 dark:hover:bg-[#121824] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>اكتشف المنصة</span>
              <ChevronDown className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* ==================================================
          SECTION 2: THE DIGITAL AGRICULTURE ECOSYSTEM
      ================================================== */}
      <section id="ecosystem" className="py-16 sm:py-24 relative overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Layers className="w-3.5 h-3.5" />
              <span>المنظومة الرقمية الخماسية</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45]">
              منظومة رقمية متكاملة لخدمة{' '}
              <span className="inline-block py-0.5 px-1 leading-tight bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent">
                القطاع الزراعي
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-[1.85]">
              خمس ركائز تكنولوجية مترابطة تعمل في تناغم رقمي لخدمة كل مزارع وتاجر ومستثمر وسائق.
            </p>
          </div>

          {/* Connected 5 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch relative">
            {ecosystemCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col h-full"
                >
                  <BorderGlow
                    edgeSensitivity={25}
                    borderRadius={22}
                    glowRadius={35}
                    glowIntensity={card.color === '#be1622' ? 1.2 : 0.9}
                    animated={false}
                    colors={
                      card.color === '#be1622'
                        ? ['#be1622', '#f43f5e', '#fb7185']
                        : ['#00C896', '#25D5AB', '#6EE7B7']
                    }
                    className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d] transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className={`p-5 sm:p-6 rounded-[22px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/25 flex flex-col justify-between h-full relative overflow-hidden select-none`}>
                      
                      {/* Top Metric & Badge */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                            style={{ backgroundColor: card.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>

                          <span className="text-[11px] font-mono font-black px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                            {card.num}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <span
                            className="text-[10px] font-extrabold uppercase tracking-wider block"
                            style={{ color: card.color }}
                          >
                            {card.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                            {card.title}
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-[1.75] pt-1">
                            {card.desc}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Link Action */}
                      <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <Link
                          to={card.link}
                          className="text-xs font-extrabold flex items-center gap-1 hover:underline group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB] transition-colors"
                          style={{ color: card.color }}
                        >
                          <span>استكشف الوحدة</span>
                          <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        </Link>
                      </div>

                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 3: ABOUT COMPANY (STORYTELLING)
      ================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Right Column: Storytelling Text & Checkpoints (in RTL) */}
            <div className="lg:col-span-6 space-y-6 text-right order-2 lg:order-1">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>قصة البداية والتمكين</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  عن جرين فارم ماركت
                </h2>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-[1.85] sm:leading-[1.9]">
                تعد <strong className="font-extrabold text-slate-900 dark:text-white">Green Farm Market</strong> شركة ناشئة رائدة في مجال التكنولوجيا الزراعية (Agritech)، تهدف لإحداث ثورة رقمية مستدامة بالقطاع الزراعي والحيواني بالشرق الأوسط عبر دمج التكنولوجيا المتقدمة بالخدمات اللوجستية وتوفير سوق مفتوح يلغي الحلقات الوسيطة غير العادلة.
              </p>

              {/* Visual Value Checkpoints */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'سوق رقمي مفتوح',
                    desc: 'منصة تداول حرة تتيح عرض وطلب المحاصيل والمواشي والمعدات بكل مرونة وأمان.',
                  },
                  {
                    title: 'ربط جميع أطراف القطاع الزراعي',
                    desc: 'جمع المزارع، المربي، المستثمر، التاجر، والناقل تحت مظلة تكنولوجية واحدة.',
                  },
                  {
                    title: 'حلول نقل ذكية ومؤمنة',
                    desc: 'أسطول شاحنات مجهز لنقل المواشي والمحاصيل مع تتبع مسار الرحلات بـ GPS.',
                  },
                  {
                    title: 'ذكاء اصطناعي للتشخيص والإنذار',
                    desc: 'أدوات رؤية حاسوبية فائقة الدقة لفحص أمراض المحاصيل وتشخيص صحة القطعان.',
                  },
                  {
                    title: 'تمكين المزارعين والمستثمرين',
                    desc: 'تعظيم هوامش أرباح المنتجين وتوفير بيئة استثمارية زراعية آمنة ذات عوائد مجزية.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/20 flex items-start gap-3 shadow-2xs hover:border-emerald-500/40 dark:hover:border-[#25D5AB]/40 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-[#999999] font-normal leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Left Column: Premium Layered 3D Visual Showcase */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <div className="relative group">
                
                {/* Background Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-[#25D5AB]/20 to-[#be1622]/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

                {/* Main Showcase Image Card */}
                <BorderGlow
                  edgeSensitivity={30}
                  borderRadius={26}
                  glowRadius={40}
                  glowIntensity={1.0}
                  animated={false}
                  colors={['#00C896', '#25D5AB', '#be1622']}
                  className="shadow-xl shadow-slate-300/50 dark:shadow-[#00040d]"
                >
                  <div className="p-2 sm:p-3 rounded-[26px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/30 overflow-hidden">
                    <img
                      src={marketplaceImg1}
                      alt="Digital Agricultural Marketplace"
                      className="w-full h-auto rounded-[20px] object-cover select-none transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </BorderGlow>

                {/* Overlapping Secondary Card */}
                <div className="hidden sm:block absolute -bottom-6 -right-6 max-w-[240px] p-2.5 rounded-2xl bg-white/95 dark:bg-[#0d1119]/95 border border-slate-300 dark:border-[#25D5AB]/40 shadow-2xl backdrop-blur-md">
                  <img
                    src={marketplaceImg2}
                    alt="Digital Agriculture Platform"
                    className="w-full h-24 object-cover rounded-xl select-none"
                  />
                  <div className="pt-2 px-1 text-right">
                    <span className="text-[10px] font-mono font-black text-emerald-700 dark:text-[#25D5AB] block">
                      منظومة التداول الذكي
                    </span>
                    <span className="text-[11px] font-extrabold text-slate-900 dark:text-white block truncate">
                      تجارة مباشرة بدون وسطاء
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 4: VISION + MISSION + VALUES (3D BLOCKS)
      ================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Target className="w-3.5 h-3.5" />
              <span>البوصلة الاستراتيجية والقيم</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              الهوية، الرؤية، والرسالة المؤسسية
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              المبادئ التي تقود كل قرار تقني وتشغيلي نتخذه لبناء قطاع زراعي رقمي ومستدام.
            </p>
          </div>

          {/* 3 Major Three-Dimensional Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Block 1: Company Identity (Green) */}
            <BorderGlow
              edgeSensitivity={25}
              borderRadius={24}
              glowRadius={35}
              glowIntensity={1.0}
              animated={false}
              colors={['#00C896', '#25D5AB', '#6EE7B7']}
              className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d]"
            >
              <div className="p-7 rounded-[24px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/30 flex flex-col justify-between h-full space-y-5 text-right">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center border border-emerald-500/30 shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-700 dark:text-[#25D5AB] block">
                      التأسيس والانطلاقة
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      عن الشركة
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-[1.85]">
                    شركة ناشئة متكاملة تهدف لإحداث ثورة رقمية في القطاع الزراعي والحيواني عبر دمج التكنولوجيا المتقدمة بالخدمات اللوجستية، وتوفير سوق رقمي مفتوح يربط جميع أطراف المنظومة بدون عوائق.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>شركة مسجلة ورائدة في الـ Ag-Tech</span>
                </div>
              </div>
            </BorderGlow>

            {/* Block 2: Strategic Vision 2028 (Primary Gradient) */}
            <BorderGlow
              edgeSensitivity={25}
              borderRadius={24}
              glowRadius={35}
              glowIntensity={1.2}
              animated={false}
              colors={['#00C896', '#25D5AB', '#6EE7B7']}
              className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d]"
            >
              <div className="p-7 rounded-[24px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/30 flex flex-col justify-between h-full space-y-5 text-right">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#25D5AB] text-slate-950 flex items-center justify-center shadow-md">
                    <Target className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-700 dark:text-[#25D5AB] block">
                      خطة التوسع 2028
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      الرؤية الاستراتيجية
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-[1.85]">
                    أن نصبح المنصة الرقمية الأولى بالشرق الأوسط وأفريقيا لإدارة المزارع ذكياً، ترشيد الموارد المائية، وتقديم غطاء شامل للتسويق المباشر والخدمات اللوجستية المؤمنة.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB]">
                  <Globe className="w-4 h-4" />
                  <span>ريادة إقليمية مستدامة بالشرق الأوسط</span>
                </div>
              </div>
            </BorderGlow>

            {/* Block 3: Operational Mission (Red #be1622) */}
            <BorderGlow
              edgeSensitivity={25}
              borderRadius={24}
              glowRadius={35}
              glowIntensity={1.3}
              animated={false}
              colors={['#be1622', '#f43f5e', '#fb7185']}
              className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d]"
            >
              <div className="p-7 rounded-[24px] bg-white dark:bg-[#0d1119] border border-[#be1622]/35 flex flex-col justify-between h-full space-y-5 text-right">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#be1622] text-white flex items-center justify-center shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>

                  <div>
                    <span className="text-[11px] font-extrabold text-[#be1622] block">
                      التشغيل والأثر الميداني
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      الرسالة والأثر
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-[1.85]">
                    تقديم حلول تقنية مبتكرة تساعد في تطوير القطاع الزراعي، تحسين الإنتاجية وتكسير حلقات الوساطة، وتمكين أصحاب المزارع والمستثمرين والعمالة تقنياً ومالياً.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2 text-xs font-extrabold text-[#be1622]">
                  <Zap className="w-4 h-4" />
                  <span>أثر حقيقي ملموس على أرض الواقع</span>
                </div>
              </div>
            </BorderGlow>

          </div>

          {/* Core Values Sub-Section (5 Values with Animated Glow) */}
          <div className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                القيم المؤسسية الخمس (Core Values)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                المعايير الراسخة التي تحكم أداءنا وتعاملاتنا اليومية
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="h-full"
                  >
                    <BorderGlow
                      edgeSensitivity={20}
                      borderRadius={20}
                      glowRadius={30}
                      glowIntensity={0.9}
                      animated={false}
                      colors={val.borderGlow}
                      className="h-full shadow-xs transition-all duration-300 hover:-translate-y-1.5"
                    >
                      <div className="p-5 rounded-[20px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-slate-800/80 h-full flex flex-col justify-between space-y-4 text-right">
                        <div className="space-y-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center">
                            <Icon className={`w-5 h-5 ${val.color}`} />
                          </div>

                          <div>
                            <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">
                              {val.subtitle}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                              {val.title}
                            </h4>
                          </div>

                          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {val.desc}
                          </p>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-800 dark:text-[#25D5AB] border border-emerald-600/20 dark:border-[#25D5AB]/20 inline-block">
                            {val.badge}
                          </span>
                        </div>
                      </div>
                    </BorderGlow>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 5: STRATEGIC FIVE AXES (PREMIUM ACCORDION)
      ================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>خطة العمل الاستثمارية والتنموية</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45]">
              الأهداف الاستراتيجية الخمسة لمنصة{' '}
              <span className="inline-block py-0.5 px-1 leading-tight bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent">
                Green Farm Market
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-[1.85]">
              محاور واضحة تضمن النمو المستدام، حماية الاستثمارات، وتعظيم العوائد للمجتمع الزراعي بأكمله.
            </p>
          </div>

          {/* Premium Accordion List */}
          <div className="space-y-3.5">
            {strategicAxes.map((axis) => {
              const isOpen = activeAccordion === axis.id;
              const isHighlight = axis.color === '#be1622';

              return (
                <div
                  key={axis.id}
                  className="rounded-[22px] transition-all duration-300"
                >
                  <BorderGlow
                    edgeSensitivity={25}
                    borderRadius={22}
                    glowRadius={35}
                    glowIntensity={isOpen ? 1.2 : 0.4}
                    animated={false}
                    colors={
                      isHighlight
                        ? ['#be1622', '#f43f5e', '#fb7185']
                        : ['#00C896', '#25D5AB', '#6EE7B7']
                    }
                    className="shadow-sm shadow-slate-200/50 dark:shadow-md dark:shadow-[#00040d]"
                  >
                    <div
                      className={`rounded-[22px] overflow-hidden border transition-colors duration-300 ${
                        isOpen
                          ? isHighlight
                            ? 'bg-white dark:bg-[#0d1119] border-[#be1622]/40'
                            : 'bg-white dark:bg-[#0d1119] border-emerald-500/40 dark:border-[#25D5AB]/40'
                          : 'bg-white/85 dark:bg-[#0d1119]/85 border-slate-300/80 dark:border-slate-800 hover:border-slate-400'
                      }`}
                    >
                      {/* Accordion Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setActiveAccordion(isOpen ? -1 : axis.id)}
                        className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 cursor-pointer select-none transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {/* Number Bubble */}
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl font-mono font-black text-sm sm:text-base flex items-center justify-center shrink-0 transition-transform ${
                              isOpen
                                ? isHighlight
                                  ? 'bg-[#be1622] text-white shadow-md'
                                  : 'bg-gradient-to-br from-[#00C896] to-[#25D5AB] text-slate-950 shadow-md'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {axis.num}
                          </div>

                          <div className="min-w-0">
                            <span className="text-[11px] font-extrabold text-slate-400 block mb-0.5">
                              {axis.tag}
                            </span>
                            <h3
                              className={`text-sm sm:text-base md:text-lg font-extrabold truncate transition-colors ${
                                isOpen
                                  ? isHighlight
                                    ? 'text-[#be1622]'
                                    : 'text-emerald-700 dark:text-[#25D5AB]'
                                  : 'text-slate-900 dark:text-white'
                              }`}
                            >
                              {axis.title}
                            </h3>
                          </div>
                        </div>

                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                            isOpen
                              ? 'rotate-180 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                              : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-right">
                              
                              {/* Goal Card */}
                              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070c09] border border-slate-200/80 dark:border-slate-800 space-y-1">
                                <span className="text-[11px] font-extrabold text-emerald-700 dark:text-[#25D5AB] block">
                                  🎯 الهدف الاستراتيجي
                                </span>
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                  {axis.goal}
                                </p>
                              </div>

                              {/* Impact Card */}
                              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070c09] border border-slate-200/80 dark:border-slate-800 space-y-1">
                                <span className="text-[11px] font-extrabold text-[#be1622] block">
                                  ⚡ الأثر والعائد
                                </span>
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                  {axis.impact}
                                </p>
                              </div>

                              {/* Implementation Card */}
                              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070c09] border border-slate-200/80 dark:border-slate-800 space-y-1">
                                <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-400 block">
                                  🛠️ آلية التنفيذ
                                </span>
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                                  {axis.implementation}
                                </p>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </BorderGlow>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 6: SERVICES ECOSYSTEM (DIGITAL MODULES)
      ================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden isolate border-b border-slate-300/80 dark:border-[#172b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Bot className="w-3.5 h-3.5" />
              <span>الوحدات الرقمية المتخصصة</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              وحدات وخدمات المنصة الرقمية
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              بوابات متكاملة تغطي كافة متطلبات الإنتاج، التشخيص، النقل، والتوظيف في القطاع الزراعي.
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {digitalModules.map((module) => {
              const Icon = module.icon;
              return (
                <BorderGlow
                  key={module.id}
                  edgeSensitivity={25}
                  borderRadius={24}
                  glowRadius={35}
                  glowIntensity={module.isRed ? 1.2 : 0.9}
                  animated={false}
                  colors={
                    module.isRed
                      ? ['#be1622', '#f43f5e', '#fb7185']
                      : ['#00C896', '#25D5AB', '#6EE7B7']
                  }
                  className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d] transition-transform duration-300 hover:-translate-y-2 group"
                >
                  <div className="p-6 sm:p-7 rounded-[24px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/25 flex flex-col justify-between h-full space-y-6 text-right select-none">
                    
                    <div className="space-y-4">
                      {/* Top Row: Icon + Number */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl ${module.accentBg} ${module.color} flex items-center justify-center border ${module.borderColor} shadow-xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                          {module.num}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-slate-400 block uppercase">
                          {module.category}
                        </span>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                          {module.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-[1.8] pt-1">
                          {module.desc}
                        </p>
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                        {module.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${module.color}`} />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Button */}
                    <div className="pt-2">
                      <Link
                        to={module.link}
                        className={`w-full py-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer ${
                          module.isRed
                            ? 'bg-[#be1622] text-white hover:bg-[#991b1b]'
                            : 'bg-emerald-600 dark:bg-[#25D5AB] text-white dark:text-slate-950 hover:bg-emerald-700 dark:hover:bg-[#1fb893]'
                        }`}
                      >
                        <span>{module.btnText}</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </div>
                </BorderGlow>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 7: STRATEGIC ROADMAP (TIMELINE 2026-2028)
      ================================================== */}
      <section className="py-16 sm:py-24 relative overflow-hidden isolate">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-32 w-80 h-80 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-600/25 dark:border-[#25D5AB]/25 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <Calendar className="w-3.5 h-3.5" />
              <span>مراحل النمو والتوسع</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              خارطة الطريق والتوسع الاستراتيجي (2026 - 2028)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              خطوات تنفيذية واضحة ومدروسة لقيادة التحول الرقمي الزراعي محلياً وإقليمياً.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch relative">
            {roadmapMilestones.map((milestone, idx) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col h-full"
              >
                <BorderGlow
                  edgeSensitivity={25}
                  borderRadius={24}
                  glowRadius={35}
                  glowIntensity={milestone.year === '2028' ? 1.3 : 1.0}
                  animated={false}
                  colors={
                    milestone.year === '2028'
                      ? ['#be1622', '#f43f5e', '#fb7185']
                      : ['#00C896', '#25D5AB', '#6EE7B7']
                  }
                  className="h-full shadow-md shadow-slate-200/50 dark:shadow-xl dark:shadow-[#00040d] transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="p-7 rounded-[24px] bg-white dark:bg-[#0d1119] border border-slate-300/90 dark:border-[#25D5AB]/25 flex flex-col justify-between h-full space-y-6 text-right select-none">
                    
                    <div className="space-y-4">
                      {/* Year & Badge Header */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-3xl sm:text-4xl font-mono font-black"
                          style={{ color: milestone.color }}
                        >
                          {milestone.year}
                        </span>

                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full ${milestone.bgGlow} ${milestone.accentColor} border ${milestone.borderColor}`}>
                          {milestone.badge}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-normal leading-[1.8]">
                          {milestone.desc}
                        </p>
                      </div>

                      {/* Milestones list */}
                      <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        {milestone.achievements.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: milestone.color }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div
                        className="h-1.5 rounded-full w-full opacity-70"
                        style={{
                          background: `linear-gradient(to left, ${milestone.color}, transparent)`,
                        }}
                      />
                    </div>

                  </div>
                </BorderGlow>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;
