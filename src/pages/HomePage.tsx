import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg from '../assets/Hero.png';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { HeroWorkflowAnimation } from '../components/hero/HeroWorkflowAnimation';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { HoverEffect, HoverEffectItem } from '../components/ui/card-hover-effect';
import {
  Sparkles,
  Award,
  Stethoscope,
  Store,
  Truck,
  Briefcase,
  Newspaper,
  TrendingUp,
  ShieldCheck,
  Zap,
  MapPin,
  PhoneCall,
  PlusCircle,
  Camera,
  Search,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Layers,
  Users,
  Globe,
  ArrowLeft,
  ChevronLeft,
  DollarSign,
  Clock,
  Send,
  Building2,
  Activity,
  Droplets,
  Sun,
  Loader2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isRegistered, toggleAuthModal } = useAuth();

  // State for Marketplace category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  // State for Strategic Pillars active tab
  const [activePillar, setActivePillar] = useState<number>(0);

  // State for AI Doctor Symptom Input
  const [symptomInput, setSymptomInput] = useState<string>('');
  const [showAiResult, setShowAiResult] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Stock Ticker Items
  const stockTickerItems = [
    { label: '🌾 القمح المحلي', price: '2100 ج/إردب', status: 'up' },
    { label: '🌽 الذرة الصفراء', price: '12,500 ج/طن', status: 'stable' },
    { label: '🐂 عجل التسمين القائم', price: '175 ج/كيلو', status: 'stable' },
    { label: '🥭 المانجو الفص', price: '45,000 ج/طن', status: 'up' },
    { label: '🚛 النقل الذكي', price: 'انخفاض تكاليف الشحن اللوجستي بنسبة 18%', status: 'down' },
  ];

  // Core 5 Services Data for Aceternity UI Card Hover Effect
  const coreServices: HoverEffectItem[] = [
    {
      id: 'market',
      title: 'سوق البيع والشراء الزراعي',
      subtitle: 'الشاشة الأولى',
      description: 'بوابة مباشرة لبيع وشراء المحاصيل والمواشي والشتلات ومستلزمات الإنتاج دون حلقات وسيطة.',
      actionText: 'دخول السوق المباشر',
      link: '/marketplace',
      icon: Store,
      badgeVariant: 'green',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      glowColor: '#00FF66',
    },
    {
      id: 'transport',
      title: 'النقل واللوجستيات الذكية',
      subtitle: 'الشاشة الثانية',
      description: 'توصيل الشحنات الزراعية والمواشي بخيارات: نقل فقط | نقل ودفع | نقل وكشف جودة.',
      actionText: 'طلب شاحنة نقل',
      link: '/transport',
      icon: Truck,
      badgeVariant: 'blue',
      accentBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      glowColor: '#00E5FF',
    },
    {
      id: 'jobs',
      title: 'ملتقى التوظيف والفرص الزراعية',
      subtitle: 'الشاشة الثالثة',
      description: 'ملتقى مجاني يعرض وظائف المزارع والمهندسين الزراعيين والعمالة الماهرة والخبرات.',
      actionText: 'استعراض الفرص المتاحة',
      link: '/jobs',
      icon: Briefcase,
      badgeVariant: 'amber',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      glowColor: '#FFB703',
    },
    {
      id: 'ai-doctor',
      title: 'صيدلية دكتور النبات والحيوان',
      subtitle: 'الشاشة الرابعة',
      description: 'فحص وتشخيص أمراض النباتات والمواشي بالذكاء الاصطناعي والرؤية البصرية عبر الكاميرا.',
      actionText: 'بدء الفحص واستشارة AI',
      link: '/ai-doctor',
      icon: Stethoscope,
      badgeVariant: 'red',
      accentBg: 'bg-brand-red-soft text-brand-red dark:text-rose-400 border-brand-red/30',
      glowColor: '#FF3366',
    },
    {
      id: 'news',
      title: 'البورصة الزراعية والنشرة الإخبارية',
      subtitle: 'الشاشة الخامسة',
      description: 'تحديثات لحظية بأسعار المحاصيل، التحذيرات المناخية الاستباقية، والنشرات التوعوية.',
      actionText: 'متابعة السوق',
      link: '/news',
      icon: Newspaper,
      badgeVariant: 'neutral' as const,
      accentBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      glowColor: '#A855F7',
    },
  ];

  // Strategic Pillars Data with Rich RGB Brand Colors
  const strategicPillars = [
    {
      id: 'ai',
      title: 'التحول الرقمي والذكاء الاصطناعي',
      icon: Zap,
      badgeVariant: 'blue' as const,
      colorClass: 'text-brand-blue dark:text-sky-400',
      activeTabBg: 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/30',
      iconBg: 'bg-brand-blue-soft text-brand-blue dark:text-sky-400 border-brand-blue/30',
      checkColor: 'text-brand-blue dark:text-sky-400',
      points: [
        'ترشيد استهلاك الموارد عبر البيانات الزراعية والمناخية الدقيقة.',
        'تشخيص أمراض النباتات والحيوانات فورياً عبر كاميرا الهاتف والذكاء الاصطناعي.',
        'خفض تكاليف التشخيص والاستشارات الإرشادية والمبيدات غير الضرورية.',
      ],
    },
    {
      id: 'supply-chain',
      title: 'كفاءة سلاسل التوريد',
      icon: Truck,
      badgeVariant: 'green' as const,
      colorClass: 'text-brand-green dark:text-emerald-400',
      activeTabBg: 'bg-brand-green text-white border-brand-green shadow-lg shadow-brand-green/30',
      iconBg: 'bg-brand-green-soft text-brand-green dark:text-emerald-400 border-brand-green/30',
      checkColor: 'text-brand-green dark:text-emerald-400',
      points: [
        'تقليل الحلقات الوسيطة بين المنتج والمشتري عبر قنوات اتصال وتداول مباشرة.',
        'رفع هامش ربح المزارع المستهدف بنسبة تتراوح من 10% إلى 25%.',
        'دعم النقل والتتبع لتقليل زمن التوريد والفاقد في المحاصيل والشحنات.',
      ],
    },
    {
      id: 'enablement',
      title: 'تمكين المزارعين ومربي التسمين',
      icon: Users,
      badgeVariant: 'blue' as const,
      colorClass: 'text-brand-blue dark:text-sky-400',
      activeTabBg: 'bg-brand-blue text-white border-brand-blue shadow-lg shadow-brand-blue/30',
      iconBg: 'bg-brand-blue-soft text-brand-blue dark:text-sky-400 border-brand-blue/30',
      checkColor: 'text-brand-blue dark:text-sky-400',
      points: [
        'تقديم خدمات إرشادية وتدريبية شاملة للمزارعين ومربي الثروة الحيوانية.',
        'إتاحة أدوات رقمية مبسطة تساعد على تحسين الإنتاج واتخاذ القرار.',
        'ربط الخبرات والعمالة المتخصصة باحتياجات المزارع الفعلية.',
      ],
    },
    {
      id: 'esg',
      title: 'الاستدامة البيئية (ESG)',
      icon: Leaf,
      badgeVariant: 'red' as const,
      colorClass: 'text-brand-red dark:text-rose-400',
      activeTabBg: 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/30',
      iconBg: 'bg-brand-red-soft text-brand-red dark:text-rose-400 border-brand-red/30',
      checkColor: 'text-brand-red dark:text-rose-400',
      points: [
        'ترشيد مياه الري عبر التوصيات المناخية والبيانات التشغيلية الدقيقة.',
        'خفض الاعتماد غير الرشيد على الأسمدة والمبيدات الكيميائية.',
        'تقليل الفاقد والانبعاثات الناتجة عن النقل والتخزين غير الكفء.',
      ],
    },
    {
      id: 'food-security',
      title: 'الأمن الغذائي القومي',
      icon: Globe,
      badgeVariant: 'amber' as const,
      colorClass: 'text-amber-600 dark:text-amber-400',
      activeTabBg: 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-600/30',
      iconBg: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      checkColor: 'text-amber-500 dark:text-amber-400',
      points: [
        'دعم جهود ترقيم وتوثيق الثروة الزراعية والحيوانية بصورة منظمة.',
        'تحسين إتاحة البيانات اللازمة للتخطيط والإنتاج والتوزيع.',
        'تعزيز استقرار الإمدادات المحلية ومساندة جهود تحقيق الاكتفاء الغذائي.',
      ],
    },
  ];

  // Marketplace Featured Products
  const marketplaceProducts = [
    {
      id: 'prod-1',
      category: 'المواشي والتسمين',
      name: 'عجول تسمين بقر هولشتاين',
      details: 'العدد: 15 رأس • الوزن المتوسط: 320 كجم • المكان: البحيرة',
      price: '175 ج / كجم',
      badge: 'مواشي وتسمين',
      accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'prod-2',
      category: 'الأشجار والشتلات',
      name: 'شتلات مانجو كيت معتمدة',
      details: 'الكمية: 1200 شتلة • العمر: سنة ونصف • المكان: الإسماعيلية',
      price: '65 ج / شتلة',
      badge: 'أشجار وشتلات',
      accentColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'prod-3',
      category: 'قطع الغيار ومعدات الري',
      name: 'طلمبة أعماق طاقة شمسية 10 حصان',
      details: 'الحالة: ممتازة استعمال 3 أشهر • المكان: الوادي الجديد',
      price: '42,000 جنيه',
      badge: 'قطع غيار ومعدات',
      accentColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
  ];

  // Filtered Products
  const filteredProducts = selectedCategory === 'الكل'
    ? marketplaceProducts
    : marketplaceProducts.filter((p) => p.category === selectedCategory || p.badge === selectedCategory);

  // Transport Services Data
  const transportServices = [
    {
      id: 't-1',
      title: 'نقل فقط',
      description: 'توصيل البضائع والمحاصيل من المزرعة إلى موقع التسليم مباشرة عبر سائقين موثوقين.',
      icon: Truck,
      badge: 'خدمة أساسية',
    },
    {
      id: 't-2',
      title: 'نقل ودفع آمن',
      description: 'استلام قيمة البضاعة من المشتري وتسليمها للبائع فور وصول الشحنة بسلام.',
      icon: ShieldCheck,
      badge: 'أمان مالي',
    },
    {
      id: 't-3',
      title: 'نقل ودفع وكشف جودة',
      description: 'معاينة الشحنة وفحص السلامة بواسطة فني الشركة قبل التحميل والنقل.',
      icon: CheckCircle2,
      badge: 'فحص شامل',
    },
  ];

  // Jobs Listings Data
  const jobListings = [
    {
      id: 'j-1',
      type: 'مطلوب للتوظيف',
      title: 'مهندس زراعي - إدارة مزرعة خضار',
      location: 'السادات',
      experience: '3-5 سنوات',
      workType: 'دوام كامل',
      badgeVariant: 'green' as const,
    },
    {
      id: 'j-2',
      type: 'باحث عن عمل',
      title: 'فني صيانة شبكات ري وطلمبات',
      location: 'الشرقية',
      experience: '8 سنوات',
      workType: 'مهمة محددة',
      badgeVariant: 'blue' as const,
    },
  ];

  // News Items Data
  const newsItems = [
    {
      id: 'n-1',
      category: 'تحذير مناخي',
      title: 'موجة حارة متوقعة بنهاية الأسبوع',
      content: 'توصيات بري المحاصيل في الساعات الصباحية المبكرة لتفادي الإجهاد الحراري.',
      icon: Sun,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'n-2',
      category: 'تقرير البورصة',
      title: 'استقرار أسعار عجول التسمين',
      content: 'سجل متوسط سعر الكيلو القائم 175 جنيهاً مع زيادة الإقبال على أسواق الماشية.',
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'n-3',
      category: 'تكنولوجيا',
      title: 'اعتماد تقنيات المستشعرات المائية',
      content: 'دراسات تؤكد توفير 30% من استهلاك المياه عند استخدام الحساسات الذكية.',
      icon: Droplets,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
    },
  ];

  // Navigation Action Handlers
  const handleAddListingClick = () => {
    navigate('/marketplace?action=add-listing');
  };

  const handlePostJobClick = () => {
    navigate('/jobs?action=post-job');
  };

  const handleRequestTruckClick = () => {
    navigate('/transport?action=request-truck');
  };

  const handleAiScanClick = () => {
    navigate('/ai-doctor?action=scan');
  };

  const handleSellerContact = () => {
    if (!isRegistered) {
      toast.info('يرجى تسجيل الدخول للتواصل مع البائع');
      toggleAuthModal(true);
    } else {
      toast.success('جاري فتح الاتصال المباشر مع البائع...');
    }
  };

  const handleAiPhotoUpload = () => {
    toast.info('يرجى السماح بفتح الكاميرا لالتقاط صورة النبات');
  };

  const handleRunAiDiagnosis = () => {
    if (!symptomInput.trim()) {
      toast.info('يرجى كتابة الأعراض أولاً');
      return;
    }
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setShowAiResult(true);
      toast.success('تم تحليل الأعراض وإخراج النتيجة والتشخيص المبدئي!');
    }, 900);
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="overflow-hidden">
      {/* ==================================================
          SECTION 2: Live Stock Ticker Marquee Bar
      ================================================== */}
      <div className="bg-surface-muted/90 border-y border-borderColor py-2.5 overflow-hidden select-none relative z-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-brand-green-soft text-brand-green border border-brand-green/30 px-3.5 py-1 rounded-full text-xs font-ibm font-bold flex-shrink-0 shadow-sm z-10">
            <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
            <span>البورصة الزراعية المباشرة</span>
          </div>

          <div className="flex-1 overflow-hidden relative flex items-center select-none" dir="ltr">
            <div className="flex items-center gap-8 shrink-0 min-w-full justify-around animate-marquee py-0.5 pr-8">
              {stockTickerItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 font-ibm" dir="rtl">
                  <span className="text-text-secondary font-noto font-bold">{item.label}:</span>
                  <span className="text-text-primary font-ibm font-black">{item.price}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8 shrink-0 min-w-full justify-around animate-marquee py-0.5 pr-8" aria-hidden="true">
              {stockTickerItems.map((item, idx) => (
                <div key={`dup-${idx}`} className="flex items-center gap-2 font-ibm" dir="rtl">
                  <span className="text-text-secondary font-noto font-bold">{item.label}:</span>
                  <span className="text-text-primary font-ibm font-black">{item.price}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          SECTION 3: Hero Section (Zero Gap + Clearer Hero.png)
      ================================================== */}
      <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-14 sm:pb-16 lg:pb-20 overflow-hidden isolate">
        {/* Background Image with Crisp Image Clarity & Soft Atmosphere */}
        <div className="absolute inset-0 -z-10 overflow-hidden select-none">
          <img
            src={heroBg}
            alt="Green Farm Market Hero Background"
            className="w-full h-full object-cover object-center scale-105 filter blur-[2.5px] opacity-45 dark:opacity-50 transition-all duration-700 pointer-events-none"
          />
          {/* Subtle Color Overlay so image is clear and text is 100% crisp */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/65 to-background/95 backdrop-blur-[1px]" />
          <div className="absolute top-1/4 -right-10 w-96 h-96 bg-brand-green-soft/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -left-10 w-96 h-96 bg-brand-blue-soft/30 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Hero Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-7 text-right"
          >
            <motion.div variants={itemFadeUp} className="inline-block">
              <div className="inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-surface/90 border border-brand-green/40 text-xs sm:text-sm text-brand-green shadow-md backdrop-blur-md hover:shadow-lg transition-all duration-300 group cursor-default leading-relaxed">
                <span className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-amber-400/20 text-amber-400 animate-pulse flex-shrink-0">
                  <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                </span>
                <span className="font-poppins font-black tracking-tight" dir="ltr">Green Farm Market 2026</span>
                <span className="text-text-secondary font-inter font-normal">·</span>
                <span className="font-cairo font-bold">المنظومة الزراعية الرقمية المتكاملة</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemFadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-cairo font-black text-text-primary tracking-tight leading-[1.3] sm:leading-[1.25] lg:leading-[1.2]"
            >
              منظومة تقنية شاملة لتطوير{' '}
              <span className="bg-gradient-to-r from-brand-green via-teal-600 to-brand-blue bg-clip-text text-transparent">
                الزراعة والتسمين والخدمات
              </span>
            </motion.h1>

            <motion.p
              variants={itemFadeUp}
              className="text-text-secondary font-noto text-base sm:text-lg leading-[1.95] sm:leading-[2] max-w-2xl font-medium bg-surface/60 p-6 sm:p-7 lg:p-8 rounded-2xl border border-borderColor/60 backdrop-blur-md shadow-md"
              style={{ borderRadius: '14px' }}
            >
              أول منصة بالشرق الأوسط تجمع التكنولوجيا والزراعة والتسمين، تربط المزارعين والمستثمرين وأصحاب المواشي عبر الذكاء الاصطناعي وسلاسل التوريد المباشرة.
            </motion.p>

            <motion.div variants={itemFadeUp} className="pt-2 flex flex-wrap gap-4">
              <Link to="/ai-doctor">
                <Button variant="green" size="lg">
                  <Stethoscope className="w-5 h-5" /> ابدأ الآن
                </Button>
              </Link>
              <Link to="/marketplace">
                <Button variant="white" size="lg">
                  <Store className="w-5 h-5 text-brand-green" /> استكشف خدماتنا
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual Ecosystem Animation (zig.ai style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <HeroWorkflowAnimation />
          </motion.div>
        </div>
      </section>

      {/* Wrapper for remaining sections with vertical spacing */}
      <div className="space-y-16 lg:space-y-24">

      {/* ==================================================
          SECTION 4: The 5 Core Services (Aceternity UI HoverEffect Animation)
      ================================================== */}
      <section className="relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-7">
          <SectionHeading
            eyebrow="خدمات المنصة الشاملة"
            title="منظومة الخدمات الرئيسية"
            description="خمس بوابات واضحة ومرتبة من اليمين إلى اليسار، لكل بوابة لون تشغيلي يسهّل الوصول السريع للخدمة."
          />

          <HoverEffect items={coreServices} />
        </div>
      </section>

      {/* ==================================================
          SECTION 5: The 5 Strategic Pillars
      ================================================== */}
      <section className="relative bg-surface-muted/40 py-16 sm:py-20 border-y-2 border-borderColor/60 overflow-hidden isolate">
        {/* Ambient Glow Decorations */}
        <div className="absolute top-1/4 -right-24 w-72 h-72 bg-brand-blue-soft/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-brand-red-soft/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12 relative z-10">
          {/* Header - Single Line Title & Spacing */}
          <div className="space-y-3 max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-3">
              <Badge variant="green" className="py-1 px-4 text-xs font-ibm font-bold">رؤيتنا المستقبلية</Badge>
            </div>
            <div className="w-full overflow-hidden flex justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] font-cairo font-black tracking-tight leading-snug py-1 text-gradient-rgb whitespace-nowrap text-ellipsis max-w-full">
                المحاور الاستراتيجية الخمسة لمنصة جرين فارم
              </h2>
            </div>
            <p className="text-text-secondary font-noto text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium pt-2">
              تكامل الأبعاد التقنية والاقتصادية والبيئية لتطوير سلاسل التوريد والتحول الرقمي
            </p>
          </div>

          {/* Interactive Pillars Tabs & Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left/Right Pillar Selector Tabs */}
            <div className="lg:col-span-5 space-y-2.5">
              {strategicPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const isActive = activePillar === index;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(index)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border-2 text-right transition-all duration-300 flex items-center gap-3.5 cursor-pointer select-none ${
                      isActive
                        ? pillar.activeTabBg
                        : 'bg-surface border-borderColor text-text-primary hover:bg-surface-muted'
                    }`}
                    style={{ borderRadius: '14px' }}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${isActive ? 'bg-white/20 text-white border-white/20' : pillar.iconBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] block font-ibm font-bold ${isActive ? 'text-white/80' : 'text-text-secondary'}`}>المحور {index + 1}</span>
                      <h4 className={`text-xs sm:text-sm font-cairo font-bold truncate ${isActive ? 'text-white' : pillar.colorClass}`}>{pillar.title}</h4>
                    </div>
                    <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-90 text-white' : 'text-text-secondary'}`} />
                  </button>
                );
              })}
            </div>

            {/* Selected Pillar Content Display */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-surface/95 backdrop-blur-md border-2 border-borderColor p-6 sm:p-7 shadow-xl space-y-5 text-right"
                  style={{ borderRadius: '14px' }}
                >
                  <div className="flex flex-wrap items-center justify-between border-b border-borderColor pb-3.5 gap-3">
                    <Badge variant={strategicPillars[activePillar].badgeVariant} className="py-1 px-3.5 text-xs font-ibm font-bold">
                      المحور الاستراتيجي {activePillar + 1}
                    </Badge>
                    <h3 className={`text-lg sm:text-xl font-cairo font-black ${strategicPillars[activePillar].colorClass}`}>
                      {strategicPillars[activePillar].title}
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm font-noto font-medium text-text-primary">
                    {strategicPillars[activePillar].points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-surface-muted/80 p-3.5 sm:p-4 rounded-xl border border-borderColor/80 shadow-sm transition hover:border-borderColor">
                        <CheckCircle2 className={`w-4.5 h-4.5 flex-shrink-0 mt-0.5 ${strategicPillars[activePillar].checkColor}`} />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 6: Marketplace Section
      ================================================== */}
      <section className="relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="السوق التفاعلي المباشر"
              title="سوق البيع والشراء الزراعي"
              description="عرض وطلب المنتجات الزراعية والمواشي وقطع الغيار مباشرة"
              centered={false}
            />

            <Button variant="green" size="md" onClick={handleAddListingClick}>
              <PlusCircle className="w-4.5 h-4.5" />
              <span>إضافة إعلان جديد</span>
            </Button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
            {[
              'الكل',
              'المواشي والتسمين',
              'الأشجار والشتلات',
              'المحاصيل والخضار',
              'منتجات الألبان',
              'قطع الغيار ومعدات الري',
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-ibm font-bold transition border cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                    : 'bg-surface border-borderColor text-text-primary hover:bg-surface-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-surface border-2 border-borderColor rounded-4xl p-6 shadow-soft-card flex flex-col justify-between space-y-5 text-right"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-ibm font-bold border ${prod.accentColor}`}>
                      {prod.category}
                    </span>
                    <span className="text-xs font-ibm font-black text-brand-green">{prod.price}</span>
                  </div>

                  <h4 className="text-lg font-cairo font-black text-text-primary">{prod.name}</h4>
                  <p className="text-xs text-text-secondary font-noto font-normal leading-relaxed bg-surface-muted p-3 rounded-2xl border border-borderColor">
                    {prod.details}
                  </p>
                </div>

                <Button variant="white" size="md" fullWidth onClick={handleSellerContact}>
                  <PhoneCall className="w-4 h-4 text-brand-green" />
                  <span>تواصل مع البائع</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: Smart Transport System
      ================================================== */}
      <section className="relative bg-surface-muted/60 py-16 border-y border-borderColor">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="خدمات الشحن واللوجستيات"
              title="منظومة النقل الذكي وسلاسل التوريد"
              description="حجز سيارات نقل المواشي والمحاصيل بأمان وتتبع حي"
              centered={false}
            />

            <Button variant="blue" size="md" onClick={handleRequestTruckClick}>
              <Truck className="w-4.5 h-4.5" />
              <span>طلب سيارة نقل / إضافة شحنة</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="bg-surface border-2 border-borderColor rounded-4xl p-7 shadow-soft-card space-y-4 text-right flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center">
                        <Icon className="w-5.5 h-5.5" />
                      </div>
                      <Badge variant="blue" className="font-ibm font-bold">{service.badge}</Badge>
                    </div>

                    <h4 className="text-lg font-cairo font-black text-text-primary">{service.title}</h4>
                    <p className="text-xs text-text-secondary font-noto font-normal leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <Link to="/transport" className="pt-2">
                    <Button variant="white" size="sm" fullWidth>
                      <span>احجز هذه الخدمة</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 8: Agricultural Jobs & Opportunities
      ================================================== */}
      <section className="relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="سوق التوظيف المجاني"
              title="ملتقى الوظائف والفرص الزراعية"
              description="ربط أصحاب المزارع بالمهندسين والعمالة الماهرة"
              centered={false}
            />

            <Button variant="green" size="md" onClick={handlePostJobClick}>
              <PlusCircle className="w-4.5 h-4.5" />
              <span>إعلان وظيفة / طلب عمل</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-surface border-2 border-borderColor rounded-4xl p-7 shadow-soft-card space-y-4 text-right flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={job.badgeVariant} className="font-ibm font-bold">{job.type}</Badge>
                    <span className="text-xs font-ibm font-bold text-text-secondary">{job.workType}</span>
                  </div>

                  <h4 className="text-xl font-cairo font-black text-text-primary">{job.title}</h4>

                  <div className="flex flex-wrap gap-4 text-xs font-noto text-text-secondary bg-surface-muted p-3.5 rounded-2xl border border-borderColor">
                    <span className="flex items-center gap-1 font-noto">📍 المكان: <strong className="text-text-primary font-bold">{job.location}</strong></span>
                    <span className="flex items-center gap-1 font-noto">💼 الخبرة: <strong className="text-text-primary font-bold">{job.experience}</strong></span>
                  </div>
                </div>

                <Button variant="white" size="md" fullWidth onClick={handleSellerContact}>
                  <Send className="w-4 h-4 text-brand-green" />
                  <span>{job.type === 'مطلوب للتوظيف' ? 'تقديم على الوظيفة' : 'تواصل مع الفني'}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: AI Plant & Animal Pharmacy
      ================================================== */}
      <section className="relative bg-surface-muted/60 py-16 border-y border-borderColor">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <SectionHeading
            eyebrow="الرؤية البصرية والذكاء الاصطناعي"
            title="صيدلية دكتور النبات والحيوان AI"
            description="فحص ومعالجة الأمراض بالذكاء الاصطناعي والرؤية البصرية"
          />

          <div className="bg-surface border-2 border-borderColor rounded-4xl p-8 shadow-soft-card max-w-4xl mx-auto space-y-6 text-right">
            <div className="space-y-2">
              <label className="text-sm font-cairo font-black text-text-primary block flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-brand-red" />
                اكتب استفسارك أو وصف الأعراض:
              </label>
              <textarea
                rows={3}
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="مثال: يوجد اصفرار في أطراف أوراق طماطم المزرعة مع بقع بنية..."
                className="w-full bg-surface-muted border-2 border-borderColor rounded-3xl p-4 text-sm font-noto font-medium text-text-primary focus:border-brand-green outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="red" size="md" onClick={handleRunAiDiagnosis} disabled={aiLoading}>
                <Zap className="w-4.5 h-4.5 animate-pulse" />
                <span>{aiLoading ? 'جاري التحليل...' : 'تشخيص بالذكاء الاصطناعي'}</span>
              </Button>

              <Button variant="white" size="md" onClick={handleAiPhotoUpload}>
                <Camera className="w-4.5 h-4.5 text-brand-green" />
                <span>رفع صورة</span>
              </Button>
            </div>

            {/* Diagnostic Result Card */}
            <AnimatePresence>
              {showAiResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-rose-500/10 border-2 border-rose-500/30 rounded-3xl p-6 space-y-4 text-right"
                >
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-cairo font-black">
                    <AlertTriangle className="w-5 h-5" />
                    <h4>النتيجة والتشخيص المبدئي:</h4>
                  </div>

                  <p className="text-sm font-noto font-medium text-text-primary leading-relaxed">
                    بناءً على الأعراض المدخلة، يُرجح إصابة النبات بـ <strong className="text-rose-600 dark:text-rose-400 font-bold">اللفحة المبكرة (Early Blight)</strong> ناتجة عن ارتفاع الرطوبة.
                  </p>

                  <div className="bg-surface p-4 rounded-2xl border border-rose-500/20 text-xs font-ibm font-bold text-text-primary leading-relaxed">
                    💚 <strong>التوصية العلاجية:</strong> رش مادة ميثيل التوفانات أو هيدروكسيد النحاس مع تنظيم فترات الري خلال 48 ساعة.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 10: News & Climate Forecasting
      ================================================== */}
      <section className="relative">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          <SectionHeading
            eyebrow="النشرة اليومية والإرشاد"
            title="البوابة الإخبارية والتنبؤات المناخية"
            description="متابعة الأسواق وتوصيات الإرشاد الزراعي"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((news) => {
              const Icon = news.icon;
              return (
                <div
                  key={news.id}
                  className="bg-surface border-2 border-borderColor rounded-4xl p-7 shadow-soft-card space-y-4 text-right flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-ibm font-bold border ${news.color}`}>
                        {news.category}
                      </span>
                      <Icon className="w-5 h-5 text-text-secondary" />
                    </div>

                    <h4 className="text-lg font-cairo font-black text-text-primary">{news.title}</h4>
                    <p className="text-xs text-text-secondary font-noto font-normal leading-relaxed">
                      {news.content}
                    </p>
                  </div>

                  <Link to="/news" className="pt-2">
                    <Button variant="white" size="sm" fullWidth>
                      <span>اقرأ المزيد</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};
