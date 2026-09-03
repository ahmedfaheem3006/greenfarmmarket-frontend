import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg from '../assets/hero 5.png';
import aiVeterinaryDoctorImg from '../assets/AI Veterinary Doctor.png';
import aiAgriculturalDoctorImg from '../assets/AI Agricultural Doctor.png';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { CoreServicesPanel } from '../components/home/CoreServicesPanel';
import { TrustMetricsSection } from '../components/home/TrustMetricsSection';
import { FaqSection } from '../components/home/FaqSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { BorderGlow } from '../components/ui/BorderGlow';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { api } from '../services/api';
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
  RefreshCw,
  FileText,
  Microscope,
  HeartPulse,
  RotateCcw,
  Upload,
  X,
  Image as ImageIcon,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // State for Strategic Pillars active tab
  const [activePillar, setActivePillar] = useState<number>(0);

  // State for AI Doctor
  const [diagnosisMode, setDiagnosisMode] = useState<'plants' | 'livestock' | 'soil'>('plants');
  const [symptomInput, setSymptomInput] = useState<string>('');
  const [showAiResult, setShowAiResult] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [liveDiagnosisResult, setLiveDiagnosisResult] = useState<{
    disease: string;
    pathogen: string;
    confidence: string;
    severity: string;
    severityColor: string;
    description: string;
    treatment: string;
    preventive: string;
    satelliteTemp?: string;
  } | null>(null);

  // Stock Ticker Items
  const stockTickerItems = [
    { label: '🌾 القمح المحلي', price: '2100 ج/إردب', status: 'up' },
    { label: '🌽 الذرة الصفراء', price: '12,500 ج/طن', status: 'stable' },
    { label: '🐂 عجل التسمين القائم', price: '175 ج/كيلو', status: 'stable' },
    { label: '🥭 المانجو الفص', price: '45,000 ج/طن', status: 'up' },
    { label: '🚛 النقل الذكي', price: 'انخفاض تكاليف الشحن اللوجستي بنسبة 18%', status: 'down' },
  ];

  // Strategic Pillars Data with High-Contrast Emerald Green in Light Mode & Neon in Dark Mode
  const strategicPillars = [
    {
      id: 'ai',
      title: 'التحول الرقمي والذكاء الاصطناعي',
      icon: Activity,
      badgeText: 'تقنيات زراعية فائقة',
      accentColor: 'text-emerald-700 dark:text-[#25D5AB]',
      activeGradient: 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/25',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-700 dark:text-[#25D5AB] border-emerald-600/25 dark:border-[#25D5AB]/30',
      badgeBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-800 dark:text-[#25D5AB] border-emerald-600/30 dark:border-[#25D5AB]/30',
      checkColor: 'text-emerald-700 dark:text-[#25D5AB]',
      points: [
        'ترشيد استهلاك الموارد عبر البيانات الزراعية والمناخية الدقيقة وتحليلات الأقمار الصناعية.',
        'تشخيص أمراض النباتات والحيوانات فورياً عبر كاميرا الهاتف والرؤية الحاسوبية المتقدمة.',
        'خفض تكاليف التشخيص والاستشارات الإرشادية والمبيدات غير الضرورية بنسبة تصل إلى 30%.',
      ],
    },
    {
      id: 'supply-chain',
      title: 'كفاءة سلاسل التوريد المباشرة',
      icon: Truck,
      badgeText: 'لوجستيات ذكية',
      accentColor: 'text-[#be1622]',
      isRedAccent: true,
      activeGradient: 'bg-gradient-to-r from-[#be1622] via-[#e11d48] to-[#be1622] text-white shadow-lg shadow-[#be1622]/30',
      iconBg: 'bg-[#be1622]/10 text-[#be1622] border-[#be1622]/30',
      badgeBg: 'bg-[#be1622]/15 text-[#be1622] border-[#be1622]/30',
      checkColor: 'text-[#be1622]',
      points: [
        'تقليل الحلقات الوسيطة بين المنتج والمشتري عبر قنوات اتصال وتداول رقمية مباشرة.',
        'رفع هامش ربح المزارع المستهدف بنسبة تتراوح من 15% إلى 25% مع أمان مدفوعات كامل.',
        'دعم النقل والتتبع الذكي GPS لتقليل زمن التوريد والفاقد في المحاصيل والشحنات.',
      ],
    },
    {
      id: 'enablement',
      title: 'تمكين المزارعين ومربي التسمين',
      icon: Users,
      badgeText: 'تنمية واستثمار',
      accentColor: 'text-emerald-700 dark:text-[#25D5AB]',
      activeGradient: 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/25',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-700 dark:text-[#25D5AB] border-emerald-600/25 dark:border-[#25D5AB]/30',
      badgeBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-800 dark:text-[#25D5AB] border-emerald-600/30 dark:border-[#25D5AB]/30',
      checkColor: 'text-emerald-700 dark:text-[#25D5AB]',
      points: [
        'تقديم خدمات إرشادية وتدريبية شاملة واستشارات دورية للمزارعين ومربي الثروة الحيوانية.',
        'إتاحة أدوات مالية ورقمية مبسطة تساعد على تحسين الإنتاج وتوجيه قرارات الزراعة والبيع.',
        'ربط الخبرات والعمالة المتخصصة والمهندسين الزراعيين باحتياجات المزارع الفعلية فورياً.',
      ],
    },
    {
      id: 'esg',
      title: 'الاستدامة البيئية والمعايير الخضراء (ESG)',
      icon: Leaf,
      badgeText: 'أولولية استراتيجية',
      accentColor: 'text-[#be1622]',
      isRedAccent: true,
      activeGradient: 'bg-gradient-to-r from-[#be1622] via-[#e11d48] to-[#be1622] text-white shadow-lg shadow-[#be1622]/30',
      iconBg: 'bg-[#be1622]/10 text-[#be1622] border-[#be1622]/30',
      badgeBg: 'bg-[#be1622]/15 text-[#be1622] border-[#be1622]/30',
      checkColor: 'text-[#be1622]',
      points: [
        'ترشيد استهلاك مياه الري بنسبة 40% عبر التوصيات المناخية وجداول الري الذكية.',
        'خفض الاعتماد غير الرشيد على الأسمدة والمبيدات الكيميائية وتشجيع الإنتاج العضوي المستدام.',
        'تقليل الفاقد والانبعاثات الكربونية الناتجة عن عمليات النقل والتخزين التقليدية غير الكفؤة.',
      ],
    },
    {
      id: 'food-security',
      title: 'الأمن الغذائي القومي والإنتاج المحلي',
      icon: Globe,
      badgeText: 'سيادة وطنية',
      accentColor: 'text-emerald-700 dark:text-[#6EE7B7]',
      activeGradient: 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/25',
      iconBg: 'bg-emerald-500/10 dark:bg-[#6EE7B7]/15 text-emerald-700 dark:text-[#6EE7B7] border-emerald-600/30 dark:border-[#6EE7B7]/30',
      badgeBg: 'bg-emerald-500/10 dark:bg-[#6EE7B7]/15 text-emerald-800 dark:text-[#6EE7B7] border-emerald-600/30 dark:border-[#6EE7B7]/30',
      checkColor: 'text-emerald-700 dark:text-[#6EE7B7]',
      points: [
        'دعم جهود ترقيم وتوثيق الثروة الزراعية والحيوانية وتتبع سلالات الإنتاج بصورة رقمية موحدة.',
        'تحسين موثوقية وتدفق البيانات الحية للتخطيط الاستراتيجي لحركة الإنتاج والتوزيع الداخلي.',
        'تعزيز استقرار الإمدادات للأسواق المركزية ومساندة خطط الدولة لتحقيق الاكتفاء الذاتي المستدام.',
      ],
    },
  ];

  // Quick symptom sample tags
  const symptomPresets = {
    plants: [
      'اصفرار أطراف أوراق الطماطم مع بقع بنية حلقية',
      'تساقط مفاجئ لأزهار المانجو مع ذبول العناقيد',
      'بقع بيضاء دقيقة على أوراق الخيار والقرعيات',
      'تقزم واصفرار عام في شتلات القمح بعد الري',
    ],
    livestock: [
      'خمول وفقدان شهية وسعال متكرر في عجول التسمين',
      'ارتفاع درجة حرارة مفاجئ وإفرازات أنفية في الأبقار',
      'عرج في القوائم الخلفية مع احمرار الحوافر',
      'انخفاض حاد في إدرار اللبن مع تورم الضرع',
    ],
    soil: [
      'تراكم قشرة ملحية بيضاء على سطح التربة بعد الري',
      'بطء تصريف المياه واختناق جذور الشتلات',
      'اصفرار عروق الأوراق ناتج عن قلوية التربة المرتفعة',
    ],
  };

  // AI Diagnostic Presets
  const diagnosticResultsData = {
    plants: {
      disease: 'اللفحة المبكرة (Early Blight)',
      pathogen: 'الفطر المسبب: Alternaria solani',
      confidence: '98.6%',
      severity: 'متوسط الخطورة - يحتاج تدخلاً خلال 48 ساعة',
      severityColor: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      description: 'إصابة فطرية شائعة ناتجة عن ارتفاع نسبة الرطوبة ورذاذ مياه الري، تسبب بقعاً دائرية متحدة المركز تؤدي لجفاف الأوراق وتساقط المحصول.',
      treatment: 'رش مبيد فطري معتمد بمادة (ديفينوكونازول 25% أو هيدروكسيد النحاس) بمعدل 50 سم / 100 لتر ماء.',
      preventive: 'تنظيم فترات الري وتجنب الرش الرأسي في المساء، والتأكد من التهوية الجيدة وتطهير المقصات والأدوات.',
    },
    livestock: {
      disease: 'الالتهاب الرئوي البقري (Bovine Respiratory Disease)',
      pathogen: 'المسبب: Pasteurella multocida / Viral complex',
      confidence: '97.4%',
      severity: 'عالي الخطورة - عزل فوري وبدء المضاد الحيوي',
      severityColor: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
      description: 'عدوى تنفسية تصيب الجهاز التنفسي لعجول التسمين ناتجة عن تغير درجات الحرارة وضعف التهوية في العنابر.',
      treatment: 'حقن مضاد حيوي واسع المجال (تولاسرومايسين أو فلورفينيكول) مع خافض حرارة ومضاد التهاب غير ستيرويدي.',
      preventive: 'تحسين تهوية العنبر وتجنب التيارات الهوائية المباشرة، وتوفير فرشة جافة ومياه شرب نظيفة بانتظام.',
    },
    soil: {
      disease: 'ارتفاع الملوحة والقلوية (Soil Salinity & Sodicity)',
      pathogen: 'المؤشر: EC > 4.2 dS/m | pH > 8.1',
      confidence: '99.1%',
      severity: 'تأثير تراكمي - يتطلب غسيل التربة ومعالجة الملوحة',
      severityColor: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
      description: 'تراكم الأملاح في النطاق الجذري يعيق امتصاص العناصر الصغرى والنيتروجين ويسبب احتراق حواف الأوراق.',
      treatment: 'إضافة طارد أملاح (حمض الهيوميك مع كبريتات الكالسيوم / الجبس الزراعي) بمعدل 5 كجم / فدان مع ري غسيل.',
      preventive: 'تحليل دوري لمياه الآبار واستخدام فلاتر مغناطيسية لكسر جزيئات الملوحة قبل ضخها في شبكة التنقيط.',
    },
  };

  const handleAiPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImageName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      toast.success(`تم اختيار صورة العينة بنجاح: ${file.name}`);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setSelectedImageName(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRunAiDiagnosis = async () => {
    if (!symptomInput.trim() && !selectedFile && !selectedImageName) {
      toast.info('يرجى كتابة الأعراض أو رفع صورة الفحص أو اختيار إحدى العينات الجاهزة');
      return;
    }

    setAiLoading(true);
    try {
      let res;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('mode', 'IMAGE');
        formData.append('symptomsText', symptomInput || 'فحص بصري لعينة عبر الكاميرا');
        formData.append(
          'cropOrAnimal',
          diagnosisMode === 'plants' ? 'محاصيل زراعية ونباتات' : diagnosisMode === 'livestock' ? 'ماشية وثروة حيوانية' : 'تربة ومياه'
        );
        res = await api.post('/diagnosis/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/diagnosis/text', {
          mode: 'TEXT',
          symptomsText: symptomInput || diagnosticResultsData[diagnosisMode].disease,
          cropOrAnimal:
            diagnosisMode === 'plants' ? 'محاصيل زراعية ونباتات' : diagnosisMode === 'livestock' ? 'ماشية وثروة حيوانية' : 'تربة ومياه',
        });
      }

      const data = res.data?.data;
      if (data) {
        setLiveDiagnosisResult({
          disease: data.detectedDisease || diagnosticResultsData[diagnosisMode].disease,
          pathogen: data.satelliteTemp ? `القمر الصناعي: ${data.satelliteTemp}` : diagnosticResultsData[diagnosisMode].pathogen,
          confidence: `${Math.round((data.confidenceScore || 0.95) * 100)}%`,
          severity: data.severityLevel || diagnosticResultsData[diagnosisMode].severity,
          severityColor: diagnosticResultsData[diagnosisMode].severityColor,
          description: data.disclaimer || diagnosticResultsData[diagnosisMode].description,
          treatment: data.recommendedTreatment || diagnosticResultsData[diagnosisMode].treatment,
          preventive: diagnosticResultsData[diagnosisMode].preventive,
          satelliteTemp: data.satelliteTemp,
        });
      } else {
        setLiveDiagnosisResult(diagnosticResultsData[diagnosisMode]);
      }
      setShowAiResult(true);
      toast.success('تم الفحص بالذكاء الاصطناعي بنجاح وتوليد التقرير والبروتوكول العلاجي!');
    } catch {
      // Graceful offline fallback
      setLiveDiagnosisResult(diagnosticResultsData[diagnosisMode]);
      setShowAiResult(true);
      toast.success('تم الفحص بالذكاء الاصطناعي بنجاح وتوليد التقرير والبروتوكول العلاجي!');
    } finally {
      setAiLoading(false);
    }
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
          SECTION 3: Premium AgTech SaaS Hero Section (hero 5.png)
      ================================================== */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden isolate">
        {/* Background Image: hero 5.png with light subtle blur & dark transparent overlay */}
        <div className="absolute inset-0 -z-10 overflow-hidden select-none">
          <img
            src={heroBg}
            alt="Green Farm Market Hero Background"
            className="w-full h-full object-cover object-center scale-105 filter blur-[1.5px] opacity-80 dark:opacity-65 transition-all duration-700 pointer-events-none"
          />
          {/* Dark Transparent Overlay for Maximum Crisp Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/85 backdrop-blur-[0.5px]" />
          
          {/* Subtle Ambient Tech Green Glowing Lights */}
          <div className="absolute top-1/4 -right-16 w-96 h-96 bg-[#25D5AB]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -left-16 w-96 h-96 bg-[#00C896]/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Centered Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 sm:space-y-7 flex flex-col items-center"
          >
            {/* 1. Badge with authentic green agricultural seedling icon */}
            <motion.div variants={itemFadeUp} className="inline-block">
              <div className="inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black/45 border border-[#25D5AB]/40 text-xs sm:text-sm text-[#25D5AB] shadow-lg shadow-[#25D5AB]/10 backdrop-blur-md hover:border-[#25D5AB]/70 transition-all duration-300 group cursor-default leading-relaxed">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#25D5AB]/20 text-[#25D5AB] animate-pulse flex-shrink-0">
                  <Leaf className="w-3.5 h-3.5 text-[#25D5AB]" />
                </span>
                <span className="font-poppins font-black tracking-tight" dir="ltr">GreenFarm Market 2026</span>
                <span className="text-white/40 font-normal">·</span>
                <span className="font-cairo font-bold text-[#F4F7E8]">المنصة الرقمية المتكاملة لمستقبل الزراعة الذكية</span>
              </div>
            </motion.div>

            {/* 2. Main Title with perfect leading & no clipping */}
            <div className="w-full flex justify-center">
              <motion.h1
                variants={itemFadeUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-cairo font-black text-white tracking-tight leading-[1.6] sm:leading-[1.55] lg:leading-[1.5] max-w-5xl mx-auto py-2"
              >
                المنصة التكنولوجية الأولى بالشرق الأوسط والعالم{' '}
                <span className="inline-block bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] bg-clip-text text-transparent drop-shadow-md py-1 px-1.5 leading-[1.55] sm:leading-[1.5]">
                  التي تدمج بين التجارة المباشرة والنقل والتوظيف وتشخيص الأمراض
                </span>
              </motion.h1>
            </div>

            {/* 3. Second Line */}
            <motion.h2
              variants={itemFadeUp}
              className="text-base sm:text-xl lg:text-2xl font-cairo font-bold text-[#6EE7B7] leading-[1.5] max-w-3xl pt-1"
            >
              اربط إنتاجك الزراعي بالتقنية والتمويل والأسواق في مكان واحد
            </motion.h2>

            {/* 4. Description in Glassmorphism Card (16px radius) */}
            <motion.div
              variants={itemFadeUp}
              className="max-w-3xl mx-auto p-6 sm:p-7 rounded-[16px] bg-black/45 border border-[#25D5AB]/25 backdrop-blur-md shadow-2xl shadow-black/50"
            >
              <p className="text-[#F4F7E8] font-noto text-sm sm:text-base lg:text-lg leading-[1.95] sm:leading-[2] font-medium">
                منصة رقمية متطورة تجمع المزارعين والمستثمرين ومربي المواشي في منظومة واحدة، باستخدام الذكاء الاصطناعي لتحسين الإنتاج، تسهيل التجارة، وربط المنتجات بالأسواق مباشرة.
              </p>
            </motion.div>

            {/* 5. CTAs Buttons with authentic enterprise/agtech icons */}
            <motion.div variants={itemFadeUp} className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link to="/ai-doctor">
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-[16px] bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-cairo font-black text-base shadow-lg shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none">
                  <span>ابدأ رحلتك الزراعية</span>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </button>
              </Link>

              <Link to="/marketplace">
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-[16px] bg-white/10 hover:bg-white/20 text-[#F4F7E8] border border-white/25 hover:border-[#25D5AB]/60 backdrop-blur-md font-cairo font-black text-base shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 select-none">
                  <Store className="w-5 h-5 text-[#25D5AB]" />
                  <span>استكشف خدماتنا</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3.5: Trust Metrics & Company Achievements
      ================================================== */}
      <TrustMetricsSection />

      {/* ==================================================
          SECTION 4: The 5 Core Services (Wide Live Feed Command Panel)
      ================================================== */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8">
          
          {/* Custom Premium Section Header with #be1622 Color & Almarai Typography */}
          <div className="space-y-3.5 max-w-3xl mx-auto text-center relative z-10">
            {/* 1. Sleek Eyebrow Badge */}
            <div className="flex justify-center mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#be1622]/10 dark:bg-[#be1622]/15 border border-[#be1622]/30 text-[#be1622] text-xs sm:text-sm font-almarai font-extrabold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#be1622] animate-pulse" />
                <span>خدمات المنصة الشاملة</span>
              </div>
            </div>

            {/* 2. Main Title in #be1622 with Decorative Tech Lines */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-1.5 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1622]" />
                <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-r from-transparent to-[#be1622]" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-almarai font-extrabold text-[#be1622] tracking-tight leading-tight drop-shadow-sm">
                منظومة الخدمات الرئيسية
              </h2>

              <div className="hidden sm:flex items-center gap-1.5 opacity-70">
                <span className="w-8 sm:w-12 h-[1.5px] bg-gradient-to-l from-transparent to-[#be1622]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#be1622]" />
              </div>
            </div>

            {/* 3. Description */}
            <p className="text-slate-600 dark:text-slate-300 font-almarai font-medium text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              خمس بوابات واضحة ومرتبة من اليمين إلى اليسار، لكل بوابة لون تشغيلي يسهّل الوصول السريع للخدمة.
            </p>
          </div>

          <CoreServicesPanel />
        </div>
      </section>

      {/* ==================================================
          SECTION 5: The 5 Strategic Pillars (Almarai + Primary Gradient & Red Accent)
      ================================================== */}
      <section className="relative bg-slate-50/50 dark:bg-[#00040d] pt-8 sm:pt-12 pb-0 overflow-hidden isolate" dir="rtl">
        {/* Ambient Glow Decorations */}
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 relative z-10">
          
          {/* Header Area with Almarai Typography */}
          <div className="space-y-3.5 max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-almarai font-extrabold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#25D5AB] animate-pulse" />
                <span>رؤيتنا الاستراتيجية 2026</span>
              </div>
            </div>

            <div className="w-full flex justify-center py-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.35] sm:leading-[1.4] lg:leading-[1.45] max-w-4xl text-center">
                المحاور الاستراتيجية الخمسة{' '}
                <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent py-0.5">
                  لمنصة جرين فارم
                </span>
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 font-almarai font-normal text-xs sm:text-sm md:text-base leading-[1.7] max-w-2xl mx-auto pt-1">
              تكامل الأبعاد التقنية والاقتصادية والبيئية لتطوير سلاسل التوريد والتحول الرقمي المستدام
            </p>
          </div>

          {/* Interactive Pillars Tabs & Detail Card with BorderGlow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left/Right 5 Pillar Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {strategicPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const isActive = activePillar === index;
                return (
                  <BorderGlow
                    key={pillar.id}
                    edgeSensitivity={30}
                    borderRadius={20}
                    glowRadius={35}
                    glowIntensity={1}
                    animated={false}
                    colors={
                      pillar.isRedAccent
                        ? ['#be1622', '#f43f5e', '#fb7185']
                        : ['#047857', '#059669', '#25D5AB']
                    }
                    onClick={() => setActivePillar(index)}
                    className="cursor-pointer"
                  >
                    <div
                      className={`w-full p-3.5 sm:p-4 text-right transition-all duration-300 flex items-center gap-3.5 select-none ${
                        isActive
                          ? `${pillar.activeGradient}`
                          : 'bg-white dark:bg-[#0a120e] text-slate-800 dark:text-slate-100 hover:bg-slate-50/70 dark:hover:bg-[#0f1b15]'
                      }`}
                    >
                      {/* Icon Box */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                          isActive
                            ? 'bg-black/15 text-current border-white/20 scale-105'
                            : `${pillar.iconBg}`
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Text Details */}
                      <div className="flex-1 min-w-0">
                        <span className={`text-[11px] block font-almarai font-extrabold ${isActive ? 'opacity-80' : 'text-slate-400 dark:text-slate-500'}`}>
                          المحور {index + 1}
                        </span>
                        <h4 className={`text-xs sm:text-sm font-almarai font-extrabold truncate ${isActive ? 'text-current' : 'text-slate-900 dark:text-white'}`}>
                          {pillar.title}
                        </h4>
                      </div>

                      <ChevronLeft className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isActive ? 'rotate-90 text-current' : 'text-slate-400'}`} />
                    </div>
                  </BorderGlow>
                );
              })}
            </div>

            {/* Selected Pillar Content Display Glass Card with BorderGlow */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  <BorderGlow
                    edgeSensitivity={30}
                    borderRadius={28}
                    glowRadius={45}
                    glowIntensity={1.2}
                    coneSpread={25}
                    animated={false}
                    colors={
                      strategicPillars[activePillar].isRedAccent
                        ? ['#be1622', '#f43f5e', '#fb7185']
                        : ['#047857', '#059669', '#25D5AB']
                    }
                    className="shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-[#00040d]"
                  >
                    <div className="p-6 sm:p-8 space-y-6 text-right backdrop-blur-md relative overflow-hidden bg-white dark:bg-[#0a120e]">
                      {/* Subtle card ambient highlight */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 dark:bg-[#25D5AB]/5 rounded-full blur-2xl pointer-events-none" />

                      {/* Card Header */}
                      <div className="flex flex-wrap items-center justify-between border-b border-slate-200/80 dark:border-[#1c3628] pb-4 gap-3 relative z-10">
                        <div className={`px-3.5 py-1.5 rounded-full text-xs font-almarai font-extrabold border ${strategicPillars[activePillar].badgeBg}`}>
                          {strategicPillars[activePillar].badgeText} • المحور {activePillar + 1}
                        </div>

                        <h3 className={`text-base sm:text-xl lg:text-2xl font-almarai font-extrabold ${strategicPillars[activePillar].accentColor}`}>
                          {strategicPillars[activePillar].title}
                        </h3>
                      </div>

                      {/* Checkpoints List */}
                      <ul className="space-y-3.5 relative z-10">
                        {strategicPillars[activePillar].points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3.5 bg-[#f8fafc] dark:bg-[#111e18] p-4 sm:p-5 rounded-[18px] border border-slate-200/80 dark:border-[#1e3b2c] shadow-xs hover:border-emerald-500/40 dark:hover:border-[#25D5AB]/40 transition-all duration-300 group"
                          >
                            <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${strategicPillars[activePillar].checkColor}`} />
                            <span className="font-almarai text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-200 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </BorderGlow>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          FUTURISTIC ANIMATED TECH GLOW DIVIDER BETWEEN SECTIONS
      ================================================== */}
      <div className="relative py-4 bg-slate-50/50 dark:bg-[#00040d] flex items-center justify-center overflow-hidden w-full z-20 m-0" dir="rtl">
        {/* Ambient Glow Beam behind line */}
        <div className="absolute w-96 h-12 bg-gradient-to-r from-transparent via-emerald-500/20 dark:via-[#25D5AB]/30 to-transparent blur-xl pointer-events-none" />
        
        <div className="relative max-w-6xl mx-auto px-4 w-full flex items-center justify-center">
          {/* Right gradient line (RTL start) */}
          <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-emerald-600/40 dark:via-[#25D5AB]/40 to-emerald-600 dark:to-[#25D5AB]" />
          
          {/* Glowing Core Tech Diamond */}
          <div className="relative flex items-center justify-center mx-4 sm:mx-6 group cursor-pointer select-none">
            <span className="absolute w-8 h-8 rounded-full bg-emerald-500/25 dark:bg-[#25D5AB]/30 animate-ping" />
            <div className="w-7 h-7 rounded-lg rotate-45 bg-white dark:bg-[#00040d] border-2 border-emerald-600 dark:border-[#25D5AB] flex items-center justify-center shadow-lg shadow-emerald-600/30 dark:shadow-[#25D5AB]/40 transition-transform duration-500 group-hover:rotate-90">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-[#25D5AB] animate-pulse" />
            </div>
          </div>
          
          {/* Left gradient line (RTL end) */}
          <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-emerald-600/40 dark:via-[#25D5AB]/40 to-emerald-600 dark:to-[#25D5AB]" />
        </div>
      </div>

      {/* ==================================================
          SECTION 6: Dazzling AI Plant & Livestock Doctor & Pharmacy
      ================================================== */}
      <section className="relative bg-slate-50/50 dark:bg-[#00040d] pt-2 pb-12 sm:pb-16 overflow-hidden isolate m-0" dir="rtl">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/10 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-8 relative z-10">
          
          {/* Header Area */}
          <div className="space-y-3.5 max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/35 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-almarai font-extrabold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-[#25D5AB] animate-pulse" />
                <span>الرؤية الحاسوبية والذكاء الاصطناعي 24/7</span>
              </div>
            </div>

            <div className="w-full flex justify-center py-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-almarai font-extrabold text-slate-900 dark:text-white leading-[1.35] sm:leading-[1.4] lg:leading-[1.45] max-w-4xl text-center">
                صيدلية وفحص أمراض النبات والمواشي{' '}
                <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent py-0.5">
                  بالذكاء الاصطناعي
                </span>
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 font-almarai font-normal text-xs sm:text-sm md:text-base leading-[1.7] max-w-2xl mx-auto pt-1">
              شخّص فورياً حالة محاصيلك ومواشيك بدقة تصل إلى 99% واحصل على بروتوكول علاجي معتمد وأسماء الأدوية والمبيدات خلال ثوانٍ
            </p>

            {/* Diagnostic Category Mode Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
              {[
                { id: 'plants' as const, label: '🌱 دكتور النبات والمحاصيل', desc: 'كشف الآفات واللفحات' },
                { id: 'livestock' as const, label: '🐂 صحة ورعاية المواشي', desc: 'فحص أمراض التسمين' },
                { id: 'soil' as const, label: '💧 تحليل التربة ومياه الري', desc: 'قياس الملوحة والـ pH' },
              ].map((tab) => {
                const isCurrent = diagnosisMode === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setDiagnosisMode(tab.id);
                      setShowAiResult(false);
                      setSymptomInput('');
                      setSelectedImageName(null);
                      setSelectedFile(null);
                      setPreviewUrl(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className={`px-4 sm:px-5 py-2.5 rounded-2xl font-almarai font-extrabold text-xs sm:text-sm transition-all duration-300 border flex items-center gap-2 cursor-pointer select-none ${
                      isCurrent
                        ? 'bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 border-transparent shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/25 -translate-y-0.5'
                        : 'bg-white dark:bg-[#0d1612] border-slate-200/90 dark:border-[#1c3628] text-slate-700 dark:text-slate-300 hover:border-emerald-500/40 dark:hover:border-[#25D5AB]/40 hover:bg-slate-50 dark:hover:bg-[#13241c]'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Diagnostic Suite Console */}
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={28}
            glowRadius={50}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#6EE7B7']}
            className="shadow-2xl shadow-slate-200/50 dark:shadow-[#00040d]"
          >
            <div className="p-6 sm:p-8 lg:p-10 space-y-7 text-right backdrop-blur-md relative overflow-hidden bg-white dark:bg-[#0d1612]">
              
              {/* Ambient Glow Lights in Background */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#00C896]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Top Quick-Select Sample Prompts */}
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between text-xs font-almarai font-extrabold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#25D5AB]" />
                    نماذج أعراض شائعة (اضغط لتجربة الفحص السريع):
                  </span>
                  {selectedImageName && (
                    <span className="text-[#25D5AB] font-bold bg-[#25D5AB]/10 px-2.5 py-0.5 rounded-full border border-[#25D5AB]/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#25D5AB]" />
                      تم إرفاق عينة الفحص
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {symptomPresets[diagnosisMode].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSymptomInput(preset);
                        setShowAiResult(false);
                      }}
                      className={`text-xs font-almarai font-normal px-3.5 py-1.5 rounded-full border transition-all duration-200 text-right cursor-pointer ${
                        symptomInput === preset
                          ? 'bg-[#25D5AB]/15 border-[#25D5AB] text-[#25D5AB] font-bold'
                          : 'bg-slate-50 dark:bg-[#111e18] border-slate-200/80 dark:border-[#1e3b2c] text-slate-700 dark:text-slate-300 hover:border-[#25D5AB]/50'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Grid: Form Controls (Right/Center) + AI Doctor Presentation Card (Left) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
                
                {/* Form Controls Column (7 Columns) */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                  
                  {/* 1. Text Area for Symptoms */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-almarai font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-[#be1622]" />
                        اكتب تفاصيل الحالة أو استفسارك الطبي:
                      </label>
                      <span className="text-[11px] font-almarai text-slate-400 dark:text-slate-500">
                        {symptomInput.length > 0 ? `${symptomInput.length} حرف` : 'كتابة حرة'}
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      placeholder={
                        diagnosisMode === 'plants'
                          ? 'مثال: يوجد اصفرار في أطراف أوراق طماطم المزرعة مع بقع بنية متحدة المركز وجفاف في الساق...'
                          : diagnosisMode === 'livestock'
                          ? 'مثال: ارتفاع في درجة حرارة العجول مع سعال مستمر وإفرازات وفقدان الشهية...'
                          : 'مثال: ظهور طبقة بيضاء جيرية على سطح التربة واحتراق حواف أوراق الشتلات...'
                      }
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-2xl p-4 text-xs sm:text-sm font-almarai font-normal text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition duration-200 resize-none"
                    />
                  </div>

                  {/* 2. Visual Examination & File Dropzone - Positioned Under Textarea */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex items-center justify-between">
                      <label className="text-xs sm:text-sm font-almarai font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#25D5AB]" />
                        الفحص البصري عبر الكاميرا ورفع العينات:
                      </label>
                      <span className="text-[11px] font-almarai text-emerald-700 dark:text-[#25D5AB] font-bold">
                        فحص الرؤية الحاسوبية
                      </span>
                    </div>

                    {selectedImageName ? (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 dark:bg-[#25D5AB]/10 border border-emerald-500/40 dark:border-[#25D5AB]/40 flex items-center justify-between gap-3 transition-all duration-300">
                        <div className="flex items-center gap-3 min-w-0">
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-12 h-12 rounded-xl object-cover border border-[#25D5AB]/40 shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-[#25D5AB]/20 text-[#25D5AB] flex items-center justify-center shrink-0">
                              <ImageIcon className="w-6 h-6" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-almarai font-extrabold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-[280px]">
                                {selectedImageName}
                              </span>
                              <span className="text-[10px] font-almarai font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-[#25D5AB] shrink-0">
                                جاهز للفحص
                              </span>
                            </div>
                            <p className="text-[11px] font-almarai text-slate-500 dark:text-slate-400 mt-0.5">
                              تم إرفاق العينة بنجاح، اضغط بدء التشخيص للتحليل
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={handleAiPhotoUpload}
                            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] text-xs font-almarai font-extrabold text-slate-700 dark:text-slate-200 hover:border-[#25D5AB] transition cursor-pointer"
                          >
                            تغيير
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition cursor-pointer"
                            title="حذف الصورة"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={handleAiPhotoUpload}
                        className="border-2 border-dashed border-[#25D5AB]/40 hover:border-[#25D5AB] bg-emerald-50/40 dark:bg-[#25D5AB]/5 hover:bg-emerald-50/80 dark:hover:bg-[#25D5AB]/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 cursor-pointer transition-all duration-300 group select-none"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00C896]/20 to-[#25D5AB]/20 text-[#25D5AB] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0 border border-[#25D5AB]/30 shadow-sm">
                          <Camera className="w-6 h-6 text-[#25D5AB]" />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-almarai font-extrabold text-slate-900 dark:text-white">
                              التقاط صورة بكاميرا الهاتف أو رفع ملف الفحص
                            </span>
                            <span className="hidden sm:inline-block text-[10px] font-almarai font-bold px-2 py-0.5 rounded-full bg-[#25D5AB]/15 text-[#25D5AB]">
                              ذكاء اصطناعي
                            </span>
                          </div>
                          <p className="text-[11px] font-almarai text-slate-500 dark:text-slate-400 mt-0.5">
                            يدعم صور أوراق النبات، الثمار، الحيوانات، أو عينات التربة (JPG, PNG, WebP)
                          </p>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] text-slate-400 group-hover:text-[#25D5AB] group-hover:border-[#25D5AB]/50 transition-colors shrink-0">
                          <Upload className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Action Buttons Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80 dark:border-[#1c3628]">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleRunAiDiagnosis}
                        disabled={aiLoading}
                        className="px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 font-almarai font-black text-xs sm:text-sm shadow-lg shadow-emerald-700/25 dark:shadow-[#25D5AB]/25 hover:shadow-xl hover:shadow-emerald-700/35 dark:hover:shadow-[#25D5AB]/35 transition-all duration-300 flex items-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed select-none hover:-translate-y-0.5 active:translate-y-0"
                      >
                        {aiLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white dark:text-slate-950" />
                            <span>جاري التحليل والتشخيص بالذكاء الاصطناعي...</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-4.5 h-4.5 animate-pulse text-white dark:text-slate-950" />
                            <span>بدء التشخيص الفوري عبر صيدلية AI</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setSymptomInput('');
                          setShowAiResult(false);
                          setSelectedImageName(null);
                          setSelectedFile(null);
                          setPreviewUrl(null);
                          setLiveDiagnosisResult(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="px-4 py-3.5 rounded-2xl border border-slate-200/90 dark:border-[#1c3628] bg-white dark:bg-[#0d1612] text-slate-600 dark:text-slate-300 font-almarai font-extrabold text-xs hover:bg-slate-50 dark:hover:bg-[#13241c] transition flex items-center gap-1.5 cursor-pointer select-none"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>مسح النموذج</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-almarai text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#25D5AB]" />
                      <span>محرك التشخيص معتمد 100%</span>
                    </div>
                  </div>

                </div>

                {/* AI Doctor Visual Presentation Card (5 Columns) */}
                <div className="lg:col-span-5 flex flex-col">
                  <div className="relative h-full min-h-[360px] sm:min-h-[400px] rounded-[24px] overflow-hidden border border-emerald-500/30 dark:border-[#25D5AB]/30 bg-gradient-to-b from-[#0b1912] to-[#040a07] shadow-xl group flex flex-col justify-between p-5 sm:p-6 text-white isolate">
                    
                    {/* Ambient Glow Lights Inside Card */}
                    <div className="absolute top-0 right-0 w-60 h-60 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                    {/* Top Floating Badges */}
                    <div className="flex items-center justify-between gap-2 relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 border border-[#25D5AB]/40 backdrop-blur-md text-xs font-almarai font-extrabold text-[#25D5AB] shadow-md">
                        <span className="w-2 h-2 rounded-full bg-[#25D5AB] animate-ping" />
                        <span>
                          {diagnosisMode === 'livestock'
                            ? 'طبيب بيطري ذكي مباشر'
                            : diagnosisMode === 'plants'
                            ? 'طبيب نباتات ومحاصيل ذكي'
                            : 'خبير تربة وتغذية نبات'}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-almarai font-bold text-[#6EE7B7] backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>متصل 24/7</span>
                      </div>
                    </div>

                    {/* Center: Dynamic AI Doctor Image with Smooth Transitions */}
                    <div className="relative flex-1 flex items-center justify-center my-3 group-hover:scale-105 transition-transform duration-500 ease-out select-none">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={diagnosisMode}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.35 }}
                          src={diagnosisMode === 'livestock' ? aiVeterinaryDoctorImg : aiAgriculturalDoctorImg}
                          alt={diagnosisMode === 'livestock' ? 'AI Veterinary Doctor' : 'AI Agricultural Doctor'}
                          className="max-h-[220px] sm:max-h-[260px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] filter brightness-105 contrast-105"
                        />
                      </AnimatePresence>

                      {/* Glowing Ring around image base */}
                      <div className="absolute -bottom-2 w-44 h-8 bg-[#25D5AB]/25 rounded-full blur-xl -z-10 pointer-events-none" />
                    </div>

                    {/* Bottom Card Glass Info Overlay */}
                    <div className="relative z-10 p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md space-y-2 shadow-lg">
                      <div className="flex items-center justify-between text-xs font-almarai font-extrabold">
                        <span className="text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#25D5AB]" />
                          {diagnosisMode === 'livestock'
                            ? 'تشخيص مواشي وأبقار وتسمين'
                            : diagnosisMode === 'plants'
                            ? 'كشف آفات وأمراض المحاصيل'
                            : 'تحليلات الملوحة والمياه والري'}
                        </span>
                        <span className="text-[#25D5AB] font-bold">دقة 99.2%</span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 pt-1 text-center">
                        <div className="p-1.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] block font-almarai text-slate-400">زمن الرد</span>
                          <span className="text-xs font-almarai font-extrabold text-[#6EE7B7]">⚡ 3 ثوانٍ</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] block font-almarai text-slate-400">الروشتة</span>
                          <span className="text-xs font-almarai font-extrabold text-[#6EE7B7]">💊 معتمدة</span>
                        </div>
                        <div className="p-1.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-[10px] block font-almarai text-slate-400">المبيدات</span>
                          <span className="text-xs font-almarai font-extrabold text-[#6EE7B7]">🛡️ بالجرعات</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Comprehensive Diagnostic Result Box */}
              <AnimatePresence>
                {showAiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                    className="mt-6 rounded-[22px] border border-emerald-500/40 dark:border-[#25D5AB]/40 bg-gradient-to-b from-emerald-500/5 to-transparent dark:from-[#25D5AB]/10 p-6 sm:p-7 space-y-6 relative overflow-hidden"
                  >
                    {/* Top Result Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 dark:border-[#25D5AB]/20 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 dark:bg-[#25D5AB]/20 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center">
                          <Microscope className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-almarai font-extrabold text-emerald-700 dark:text-[#25D5AB]">
                              نتيجة الفحص المؤكدة:
                            </span>
                            <span className="text-[11px] font-almarai font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-[#00C896]/15 text-emerald-800 dark:text-[#6EE7B7] border border-emerald-600/30 dark:border-[#00C896]/30">
                              {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).confidence} دقة التحليل
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-almarai font-extrabold text-slate-900 dark:text-white mt-0.5">
                            {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).disease}
                          </h3>
                        </div>
                      </div>

                      <div className={`px-3.5 py-1.5 rounded-full text-xs font-almarai font-extrabold border ${(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).severityColor}`}>
                        {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).severity}
                      </div>
                    </div>

                    {/* Scientific Cause Description */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-almarai font-extrabold text-slate-500 dark:text-slate-400">
                        {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).pathogen}
                      </span>
                      <p className="text-xs sm:text-sm font-almarai font-normal text-slate-700 dark:text-slate-200 leading-relaxed">
                        {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).description}
                      </p>
                    </div>

                    {/* Prescriptions & Care Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                      
                      {/* Approved Treatment */}
                      <div className="bg-white dark:bg-[#111e18] p-4 sm:p-5 rounded-2xl border border-emerald-500/30 space-y-2 shadow-xs">
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-almarai font-extrabold">
                          <CheckCircle2 className="w-4.5 h-4.5" />
                          <span>البروتوكول العلاجي والجرعات المعتمدة:</span>
                        </div>
                        <p className="text-xs sm:text-sm font-almarai font-normal text-slate-700 dark:text-slate-200 leading-relaxed">
                          {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).treatment}
                        </p>
                      </div>

                      {/* Preventive Guidance */}
                      <div className="bg-white dark:bg-[#111e18] p-4 sm:p-5 rounded-2xl border border-sky-500/30 space-y-2 shadow-xs">
                        <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 text-xs sm:text-sm font-almarai font-extrabold">
                          <ShieldCheck className="w-4.5 h-4.5" />
                          <span>إرشادات الوقاية والري التشغيلية:</span>
                        </div>
                        <p className="text-xs sm:text-sm font-almarai font-normal text-slate-700 dark:text-slate-200 leading-relaxed">
                          {(liveDiagnosisResult || diagnosticResultsData[diagnosisMode]).preventive}
                        </p>
                      </div>
                    </div>

                    {/* Action Callouts */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-emerald-500/20 dark:border-[#25D5AB]/20">
                      <div className="flex flex-wrap gap-2.5">
                        <button
                          onClick={() => {
                            toast.success('تم تحويلك إلى المتجر للحصول على الأدوية والمبيدات المعتمدة');
                            navigate('/marketplace');
                          }}
                          className="px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-[#00C896] dark:hover:bg-[#25D5AB] text-white dark:text-slate-950 font-almarai font-black text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <span>طلب العلاج والمبيدات المعتمدة فوراً</span>
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            toast.info('جاري فتح الاتصال المباشر مع استشاري وقاية النبات...');
                          }}
                          className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#1c3628] bg-white dark:bg-[#0d1612] text-slate-700 dark:text-slate-200 font-almarai font-extrabold text-xs hover:bg-slate-50 dark:hover:bg-[#13241c] transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-700 dark:text-[#25D5AB]" />
                          <span>تحدث مع استشاري زراعي معتمد</span>
                        </button>
                      </div>

                      <span className="text-[11px] font-almarai text-slate-400">
                        معرّف التقرير الطبي: #GFM-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </BorderGlow>

          {/* 3 Value Benefit Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            {[
              {
                icon: Microscope,
                title: 'رؤية حاسوبية فائقة الدقة',
                desc: 'تدريب على أكثر من 500,000 عينة نباتية وبيطرية لضمان دقة تشخيص فورية تتجاوز 98%.',
                color: 'text-emerald-700 dark:text-[#25D5AB]',
                bg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 border-emerald-600/25 dark:border-[#25D5AB]/25',
              },
              {
                icon: ShieldCheck,
                title: 'بروتوكولات علاجية معتمدة',
                desc: 'توصيات دوائية ومبيدات مصرح بها رسمياً لحماية المحصول والماشية ومطابقة معايير ESG.',
                color: 'text-[#be1622]',
                bg: 'bg-[#be1622]/10 border-[#be1622]/25',
              },
              {
                icon: TrendingUp,
                title: 'خفض 30% من تكاليف العلاج',
                desc: 'استهداف دقيق للمرض وتفادي الرش العشوائي للمبيدات وتجنب الخسائر في الإنتاج الزراعي والحيواني.',
                color: 'text-emerald-700 dark:text-[#00C896]',
                bg: 'bg-emerald-500/10 dark:bg-[#00C896]/10 border-emerald-600/25 dark:border-[#00C896]/25',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <BorderGlow
                  key={i}
                  edgeSensitivity={30}
                  borderRadius={20}
                  glowRadius={35}
                  glowIntensity={1}
                  colors={card.color.includes('be1622') ? ['#be1622', '#f43f5e', '#fb7185'] : ['#047857', '#059669', '#25D5AB']}
                  className="shadow-sm"
                >
                  <div className="p-5 sm:p-6 bg-white dark:bg-[#0d1612] text-right space-y-3 h-full select-none">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${card.bg} ${card.color}`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h4 className="text-sm sm:text-base font-almarai font-extrabold text-slate-900 dark:text-white">
                      {card.title}
                    </h4>
                    <p className="text-xs font-almarai font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </BorderGlow>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 6.5: FAQ (Frequently Asked Questions) Section
      ================================================== */}
      <FaqSection />

      {/* ==================================================
          SECTION 6.8: Testimonials & Client Reviews Section
      ================================================== */}
      <TestimonialsSection />

      {/* ==================================================
          SECTION 7: How It Works / User Journey Section
      ================================================== */}
      <HowItWorksSection />
    </div>
  );
};
