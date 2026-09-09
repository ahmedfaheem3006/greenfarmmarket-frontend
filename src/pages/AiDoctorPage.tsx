import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Diagnosis } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';

import doctorImg from '../assets/Docker.png';

import {
  Stethoscope,
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  X,
  FileText,
  Activity,
  Microscope,
  Leaf,
  Beef,
  Droplets,
  ScanLine,
  PhoneCall,
  Share2,
  RefreshCw,
  Cpu,
  Layers,
  ThermometerSun,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Info,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Send,
  Eye,
  RotateCcw,
  Printer,
  Pill,
  BadgeCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';

export const AiDoctorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal } = useAuth();

  // Mode Selection: TEXT | IMAGE
  const [mode, setMode] = useState<'TEXT' | 'IMAGE'>('TEXT');

  // Hero Image / Diagnostic Subject: PLANTS | LIVESTOCK
  const [subjectType, setSubjectType] = useState<'PLANTS' | 'LIVESTOCK'>('PLANTS');

  // Form Fields
  const [cropOrAnimal, setCropOrAnimal] = useState('طماطم / خضروات صيفية');
  const [governorate, setGovernorate] = useState('البحيرة');
  const [symptomsText, setSymptomsText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Diagnostic State
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [myHistory, setMyHistory] = useState<Diagnosis[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analysis Stages Simulation
  const analysisStages = [
    'جارٍ تهيئة الاتصال بمحرك الرؤية الحاسوبية الزراعية والبيطرية...',
    'تحليل المعطيات الطيفية وعزل بؤر الإصابة والأعراض...',
    'مطابقة البيانات مع قواعد بيانات أمراض النبات والحيوان العالمية ومراكز البحوث...',
    'توليد الروشتة الذكية وتحديد المواد الفعالة والبروتوكول الوقائي...',
  ];

  // Sync mode with query params
  useEffect(() => {
    if (searchParams.get('action') === 'scan') {
      setMode('IMAGE');
    }
  }, [searchParams]);

  // Fetch previous diagnoses for logged in users
  useEffect(() => {
    if (isRegistered) {
      fetchMyHistory();
    }
  }, [isRegistered]);

  const fetchMyHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await api.get('/diagnoses/my');
      if (res.data?.success && Array.isArray(res.data.data)) {
        setMyHistory(res.data.data);
      }
    } catch {
      setMyHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error('حجم الصورة كبير جداً (الحد الأقصى 15 ميجابايت).');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('تم تحميل الصورة بنجاح! جاهزة للفحص بالذكاء الاصطناعي.');
    }
  };

  // Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      toast.success('تم استلام الصورة بنجاح!');
    }
  };

  // Quick Preset Prompts
  const quickPlantSymptoms = [
    'اصفرار في أطراف الأوراق مع بقع بنية',
    'ذبول مفاجئ وسقوط للأزهار والثمار',
    'ظهور طبقة بيضاء دقيقة تشبه البودرة (بياض دقيقي)',
    'ثقوب وتآكل في الأوراق وسيقان النبات',
    'تبقعات دائرية بنية محاطة بهالة صفراء',
    'احتراق حواف الأوراق وتوقف نمو القمة النامية',
  ];

  const quickAnimalSymptoms = [
    'نقاط وعقد جلدية بارزة على الجسم والرقبة',
    'فقدان تام للشهية وخمول مع ارتفاع درجة الحرارة',
    'إفرازات من الأنف وسيلان اللعاب وصعوبة التنفس',
    'عرج في القائمة وتورم أو تعفن في الحافر',
    'التهاب وتورم في الضرع وانخفاض إدرار اللبن',
    'إسهال حاد أو انتفاخ ملحوظ في منطقة الكرش',
  ];

  // Helper to parse treatment text into structured protocol cards
  const parseTreatmentProtocol = (text: string) => {
    if (!text) return [];

    const rawSections = text.split(/(?=(?:^|\n)\s*\d+[\.\-]\s+)/g).filter((s) => s.trim().length > 0);

    if (rawSections.length > 1) {
      return rawSections.map((sec, idx) => {
        const clean = sec.trim();
        const firstLineEnd = clean.indexOf('\n');
        let title = '';
        let body = '';

        if (firstLineEnd !== -1) {
          title = clean.substring(0, firstLineEnd).replace(/^\d+[\.\-]\s*/, '').trim();
          body = clean.substring(firstLineEnd + 1).trim();
        } else {
          const colonIdx = clean.indexOf(':');
          if (colonIdx !== -1 && colonIdx < 50) {
            title = clean.substring(0, colonIdx).replace(/^\d+[\.\-]\s*/, '').trim();
            body = clean.substring(colonIdx + 1).trim();
          } else {
            title = `المرحلة ${idx + 1}: إجراء بروتوكول علاجي`;
            body = clean.replace(/^\d+[\.\-]\s*/, '').trim();
          }
        }

        let category: 'medication' | 'biosecurity' | 'nutrition' | 'general' = 'general';
        const combined = `${title} ${body}`.toLowerCase();
        if (
          combined.includes('دواء') ||
          combined.includes('علاج') ||
          combined.includes('حقن') ||
          combined.includes('رش') ||
          combined.includes('مضاد') ||
          combined.includes('مبيد') ||
          combined.includes('جرع')
        ) {
          category = 'medication';
        } else if (
          combined.includes('عزل') ||
          combined.includes('وقاي') ||
          combined.includes('تطهير') ||
          combined.includes('نظاف') ||
          combined.includes('مكافح') ||
          combined.includes('حشرات')
        ) {
          category = 'biosecurity';
        } else if (
          combined.includes('تغذي') ||
          combined.includes('علف') ||
          combined.includes('ماء') ||
          combined.includes('فيتامين') ||
          combined.includes('ري') ||
          combined.includes('تسميد')
        ) {
          category = 'nutrition';
        }

        return {
          id: idx + 1,
          title: title || `المرحلة العلاجية ${idx + 1}`,
          body,
          category,
        };
      });
    }

    return [
      {
        id: 1,
        title: 'البروتوكول العلاجي والإرشادات المعتمدة',
        body: text,
        category: 'medication' as const,
      },
    ];
  };

  // Submit AI Diagnosis
  const handleStartDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'IMAGE' && !selectedFile) {
      toast.error('يرجى اختيار أو رفع صورة الورقة أو الحيوان المراد فحصه.');
      return;
    }

    if (mode === 'TEXT' && !symptomsText.trim()) {
      toast.error('يرجى كتابة وصف الأعراض الملاحظة على النبات أو الماشية.');
      return;
    }

    setAnalyzing(true);
    setAnalysisStep(0);
    setResult(null);

    // Step sequence simulation
    const interval = setInterval(() => {
      setAnalysisStep((prev) => (prev < analysisStages.length - 1 ? prev + 1 : prev));
    }, 700);

    try {
      let response;
      if (mode === 'IMAGE' && selectedFile) {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('mode', 'IMAGE');
        formData.append('cropOrAnimal', cropOrAnimal);
        formData.append('governorate', governorate);
        formData.append('symptomsText', symptomsText || 'فحص بصري وتحليل طيفي عبر الصورة');

        response = await api.post('/diagnoses/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.post('/diagnoses/text', {
          mode: 'TEXT',
          cropOrAnimal,
          governorate,
          symptomsText,
        });
      }

      clearInterval(interval);
      setAnalyzing(false);

      if (response.data?.success) {
        setResult(response.data.data);
        toast.success('اكتمل التشخيص بنجاح! تم استخراج التقرير والروشتة العلاجية.');
        if (isRegistered) {
          fetchMyHistory();
        }
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      }
    } catch (err: any) {
      clearInterval(interval);
      setAnalyzing(false);
      const errMsg = err?.response?.data?.message || 'تعذر إجراء الفحص في الوقت الحالي. يرجى المحاولة لاحقاً.';
      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#be1622]/30 selection:text-red-950 pb-20 select-none" dir="rtl">
      
      {/* ========================================================================= */}
      {/* SECTION 1: AI DOCTOR HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 overflow-hidden isolate border-b border-slate-200/80 dark:border-[#220a0e]">
        
        {/* Red / Crimson Glowing Atmosphere (#be1622) */}
        <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-[#be1622]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#e63946]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Animated Digital Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 bg-[radial-gradient(#be1622_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Hero Live Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#be1622]/10 border border-[#be1622]/30 text-[#be1622] dark:text-[#ff6b6b] text-xs font-black shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6b6b] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#be1622]" />
                </span>
                <span>الذكاء الاصطناعي لصحة النبات والحيوان | AI Agritech Healthcare</span>
              </div>

              {/* Grand Title */}
              <div className="space-y-4 pt-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] tracking-normal py-1">
                  جرين فارم ماركت |{' '}
                  <span className="bg-gradient-to-r from-[#be1622] via-[#e63946] to-[#00C896] bg-clip-text text-transparent inline-block pb-1">
                    صيدلية الذكاء الاصطناعي
                  </span>{' '}
                  الزراعية
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-[1.8] pt-1">
                  تشخيص فوري لأمراض المحاصيل الزراعية والمواشي باستخدام تحليل الصور المتقدم بالرؤية الحاسوبية، وتوليد بروتوكولات علاجية ذكية تحمي استثمارك وتقلل الخسائر.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#diagnostic-studio"
                  onClick={() => setMode('TEXT')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#be1622] via-[#e63946] to-[#ff6b6b] hover:opacity-95 text-white text-sm font-black flex items-center gap-2.5 shadow-xl shadow-red-600/25 hover:scale-102 transition cursor-pointer"
                >
                  <Stethoscope className="w-5 h-5 text-white" />
                  <span>ابدأ الفحص والتشخيص الآن</span>
                </a>

                <a
                  href="#diagnostic-studio"
                  onClick={() => setMode('IMAGE')}
                  className="px-7 py-4 rounded-2xl bg-white/80 dark:bg-[#160a0c] hover:bg-slate-100 dark:hover:bg-[#200d10] border border-[#be1622]/40 text-slate-900 dark:text-white text-sm font-black flex items-center gap-2.5 shadow-sm transition cursor-pointer backdrop-blur-sm"
                >
                  <Camera className="w-5 h-5 text-[#ff6b6b]" />
                  <span>رفع صورة للفحص البصري</span>
                </a>
              </div>

              {/* Floating Live Diagnostic Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#14080a]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-red-500/15 text-[#ff6b6b] flex items-center justify-center font-bold shrink-0">
                    <ScanLine className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">رؤية حاسوبية فائقة</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">تحليل الأنماط الطيفية</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#14080a]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#00C896] flex items-center justify-center font-bold shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">نتائج خلال 3 ثوانٍ</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">روشتة وجرعات علاجية</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#14080a]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">بروتوكولات معتمدة</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">توصيات وقائية ومبيدات</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Doctor Showcase Image) */}
            <div className="lg:col-span-5">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={32}
                glowRadius={50}
                glowIntensity={1.3}
                coneSpread={25}
                animated={false}
                colors={['#be1622', '#e63946', '#00C896']}
                className="shadow-2xl shadow-red-600/15"
              >
                <div className="relative rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-[#2b1014] group">
                  <img
                    src={doctorImg}
                    alt="صيدلية وطبيب جرين فارم ماركت الذكي"
                    className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </BorderGlow>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: AI DIAGNOSIS WORKFLOW (4 CONNECTED STEPS) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-[#be1622]/10 text-[#be1622] dark:text-[#ff6b6b] text-xs font-black border border-[#be1622]/20">
            آلية عمل الفحص الذكي
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            كيف تتم عملية التشخيص وصرف التوصيات؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            4 مراحل تكنولوجية فائقة الدقة لضمان حصولك على البروتوكول العلاجي المعتمد.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            {
              step: '01',
              title: 'رفع صورة أو كتابة الأعراض',
              desc: 'التقط صورة واضحة للإصابة الورقية أو الماشية أو صف التغيرات الملاحظة بالمزرعة.',
              icon: Camera,
            },
            {
              step: '02',
              title: 'تحليل الذكاء الاصطناعي',
              desc: 'معالجة بصرية فورية بالرؤية الحاسوبية وعزل بؤر الإصابة وتحليل الأعراض السريرية.',
              icon: Cpu,
            },
            {
              step: '03',
              title: 'مطابقة قاعدة البيانات',
              desc: 'مقارنة الحالة مع +50,000 مرجع علمي ومعهد بحوث وقاية النبات والطب البيطري.',
              icon: Microscope,
            },
            {
              step: '04',
              title: 'تقرير التشخيص والعلاج',
              desc: 'إصدار الروشتة الذكية بالمواد الفعالة، الجرعات، وفترة الأمان قبل الحصاد (PHI).',
              icon: FileCheck,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0f0608] border border-slate-200/80 dark:border-[#220a0e] space-y-4 text-right hover:border-[#be1622] transition shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#be1622]/10 text-[#be1622] dark:text-[#ff6b6b] flex items-center justify-center font-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-[#250d12]">
                    {item.step}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: DIAGNOSTIC STUDIO (INTERACTIVE AI WORKBENCH) */}
      {/* ========================================================================= */}
      <section id="diagnostic-studio" className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <BorderGlow
          edgeSensitivity={30}
          borderRadius={36}
          glowRadius={55}
          glowIntensity={1.3}
          coneSpread={25}
          animated={false}
          colors={['#be1622', '#e63946', '#00C896']}
          className="shadow-2xl shadow-red-600/10"
        >
          <div className="p-6 sm:p-10 rounded-[36px] bg-white dark:bg-[#0c0507] border border-slate-200/80 dark:border-[#220a0e] space-y-8 text-right">
            
            {/* Studio Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#220a0e] pb-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#be1622]/10 text-[#be1622] dark:text-[#ff6b6b] text-xs font-black border border-[#be1622]/20">
                  لوحة الفحص السريري الذكي
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  استوديو الفحص والتشخيص الزراعي والبيطري
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-0.5">
                  اختر طريقة الفحص واملأ البيانات للحصول على تقرير طبي معتمد فوراً
                </p>
              </div>

              {/* Mode Selector (Text vs Image) */}
              <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-[#160a0c] border border-slate-200 dark:border-white/5 text-xs font-black">
                <button
                  type="button"
                  onClick={() => setMode('TEXT')}
                  className={`px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                    mode === 'TEXT'
                      ? 'bg-gradient-to-r from-[#be1622] to-[#e63946] text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-red-500'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>فحص نصي (وصف الأعراض)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMode('IMAGE')}
                  className={`px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 ${
                    mode === 'IMAGE'
                      ? 'bg-gradient-to-r from-[#be1622] to-[#e63946] text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>فحص بصري (تحليل صورة)</span>
                </button>
              </div>
            </div>

            {/* Sector Category Switcher: Plants vs Livestock */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#160a0c] border border-slate-200 dark:border-white/5">
              <button
                type="button"
                onClick={() => {
                  setSubjectType('LIVESTOCK');
                  if (cropOrAnimal === 'طماطم / خضروات صيفية' || !cropOrAnimal) {
                    setCropOrAnimal('عجل تسمين');
                  }
                }}
                className={`py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2.5 transition cursor-pointer ${
                  subjectType === 'LIVESTOCK'
                    ? 'bg-gradient-to-r from-[#be1622] via-[#d62828] to-[#e63946] text-white shadow-lg shadow-red-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#be1622]'
                }`}
              >
                <Beef className="w-4 h-4 text-amber-400" />
                <span>فحص المواشي والإنتاج الحيواني (طب بيطري)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubjectType('PLANTS');
                  if (cropOrAnimal === 'عجل تسمين' || !cropOrAnimal) {
                    setCropOrAnimal('طماطم / خضروات صيفية');
                  }
                }}
                className={`py-3 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2.5 transition cursor-pointer ${
                  subjectType === 'PLANTS'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
                }`}
              >
                <Leaf className="w-4 h-4 text-emerald-300" />
                <span>فحص المحاصيل والأشجار الزراعية (وقاية نبات)</span>
              </button>
            </div>

            {/* Diagnostic Form */}
            <form onSubmit={handleStartDiagnosis} className="space-y-6">
              
              {/* Row 1: Crop/Animal & Governorate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center justify-between">
                    <span>
                      {subjectType === 'LIVESTOCK'
                        ? 'نوع الحيوان أو الماشية المراد فحصها *'
                        : 'نوع المحصول الزراعي أو الأشجار المراد فحصها *'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {subjectType === 'LIVESTOCK' ? 'قسم بيطري' : 'قسم زراعي'}
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={cropOrAnimal}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCropOrAnimal(val);
                      const norm = val.toLowerCase();
                      if (['عجل', 'عجول', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'حصان', 'خيل', 'أرنب', 'بط'].some(k => norm.includes(k))) {
                        setSubjectType('LIVESTOCK');
                      } else if (['طماطم', 'قمح', 'شجر', 'أشجار', 'مانجو', 'موالح', 'برتقال', 'فلفل', 'خيار', 'بطاطس', 'محصول', 'نبات'].some(k => norm.includes(k))) {
                        setSubjectType('PLANTS');
                      }
                    }}
                    placeholder={
                      subjectType === 'LIVESTOCK'
                        ? 'مثال: عجل تسمين، أبقار هولشتاين، جاموس حلاب، أغنام برقي، دواجن تسمين...'
                        : 'مثال: طماطم، قمح، أشجار مانجو، موالح، بطاطس، فراولة...'
                    }
                    className="w-full bg-slate-50 dark:bg-[#14080a] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-[#be1622]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    المحافظة أو النطاق الجغرافي للمزرعة *
                  </label>
                  <input
                    type="text"
                    required
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    placeholder="مثال: الإسماعيلية، البحيرة، بني سويف، الشرقية، الفيوم، النوبارية..."
                    className="w-full bg-slate-50 dark:bg-[#14080a] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-xs font-bold outline-none focus:border-[#be1622]"
                  />
                </div>
              </div>

              {/* Mode Specific Inputs */}
              {mode === 'IMAGE' ? (
                /* Image Uploader Box */
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    ارفع صورة واضحة للورقة المصابة أو الحيوان أو الحقل *
                  </label>

                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-[#38151b] hover:border-[#be1622] rounded-3xl p-8 text-center bg-slate-50/50 dark:bg-[#120709] transition cursor-pointer space-y-3 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {filePreview ? (
                      <div className="space-y-3">
                        <div className="relative inline-block rounded-2xl overflow-hidden max-h-64 border border-[#be1622]/40 shadow-lg">
                          <img src={filePreview} alt="معاينة الصورة" className="max-h-64 object-contain mx-auto" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFile(null);
                              setFilePreview(null);
                            }}
                            className="absolute top-2 left-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-red-600 transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 block">
                          ✓ تم اختيار الصورة: {selectedFile?.name} (انقر للتغيير)
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-3xl bg-[#be1622]/10 text-[#be1622] dark:text-[#ff6b6b] flex items-center justify-center mx-auto group-hover:scale-110 transition">
                          <Upload className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <strong className="text-sm font-black text-slate-800 dark:text-slate-200 block">
                            اسحب وأفلت الصورة هنا، أو اضغط للاختيار من جهازك
                          </strong>
                          <span className="text-xs text-slate-400 font-bold block">
                            يدعم صيغ JPG, PNG, WEBP بدقة واضحة (الحد الأقصى 15 ميجابايت)
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Symptoms Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-800 dark:text-slate-200">
                    وصف الأعراض والملاحظات الميدانية {mode === 'IMAGE' ? '(اختياري لزيادة دقة الفحص)' : '*'}
                  </label>
                  <span className="text-[11px] text-slate-400 font-bold">
                    يمكنك الضغط على المقترحات السريعة أدناه:
                  </span>
                </div>

                {/* Quick Symptom Chips */}
                <div className="flex flex-wrap gap-2 pb-1">
                  {(subjectType === 'PLANTS' ? quickPlantSymptoms : quickAnimalSymptoms).map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSymptomsText((prev) => (prev ? `${prev}، ${chip}` : chip))}
                      className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-[#160a0c] border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-[#be1622] hover:text-[#be1622] transition cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={3}
                  required={mode === 'TEXT'}
                  value={symptomsText}
                  onChange={(e) => setSymptomsText(e.target.value)}
                  placeholder="اكتب بالتفصيل ما تلاحظه على الأوراق، الساق، الثمار، أو سلوك وحرارة الحيوان..."
                  className="w-full bg-slate-50 dark:bg-[#14080a] border border-slate-200 dark:border-white/10 rounded-2xl p-3.5 text-xs font-normal outline-none focus:border-[#be1622] resize-none leading-[1.8]"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={analyzing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#be1622] via-[#e63946] to-[#00C896] hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-red-600/25 transition cursor-pointer disabled:opacity-60"
                >
                  {analyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>جارٍ الفحص والمعالجة بالذكاء الاصطناعي...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-white" />
                      <span>بدء الفحص واستخراج الروشتة بالذكاء الاصطناعي ➔</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Scanning Simulation Bar */}
              {analyzing && (
                <div className="p-5 rounded-2xl bg-[#be1622]/10 border border-[#be1622]/30 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between text-xs font-black text-[#be1622] dark:text-[#ff6b6b]">
                    <span className="flex items-center gap-2">
                      <ScanLine className="w-4 h-4" />
                      <span>{analysisStages[analysisStep]}</span>
                    </span>
                    <span className="font-mono">
                      {Math.round(((analysisStep + 1) / analysisStages.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-black/40 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#be1622] to-[#00C896] transition-all duration-500"
                      style={{ width: `${((analysisStep + 1) / analysisStages.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

            </form>

          </div>
        </BorderGlow>

      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: FUTURISTIC AI CLINICAL CERTIFICATE & REPORT */}
      {/* ========================================================================= */}
      {result && (
        <section ref={resultRef} className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={36}
            glowRadius={65}
            glowIntensity={1.5}
            coneSpread={25}
            animated={false}
            colors={
              ['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري', 'lumpy', 'mastitis', 'pox'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k))
                ? ['#00C896', '#38bdf8', '#be1622']
                : ['#be1622', '#e63946', '#00C896']
            }
            className="shadow-2xl shadow-emerald-950/20"
          >
            <div className="p-6 sm:p-12 rounded-[36px] bg-gradient-to-b from-white via-slate-50 to-white dark:from-[#0d070a] dark:via-[#140b0e] dark:to-[#0a0507] border-2 border-emerald-500/30 dark:border-[#2d151a] space-y-8 text-right relative overflow-hidden">
              
              {/* Watermark Logo Background Effect */}
              <div className="absolute -bottom-10 -left-10 w-96 h-96 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none -z-0">
                {['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k)) ? (
                  <Beef className="w-full h-full text-white" />
                ) : (
                  <Leaf className="w-full h-full text-white" />
                )}
              </div>

              {/* Certificate Top Verified Seal & Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Official Category Sector Badge */}
                    <span className={`px-3.5 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 shadow-sm ${
                      ['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k))
                        ? 'bg-cyan-500/10 text-cyan-700 dark:text-[#38bdf8] border-cyan-500/30'
                        : 'bg-emerald-500/10 text-emerald-800 dark:text-[#00C896] border-emerald-500/30'
                    }`}>
                      {['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k)) ? (
                        <>
                          <Beef className="w-3.5 h-3.5" />
                          <span>قسم الطب البيطري وصحة الماشية (Veterinary Healthcare)</span>
                        </>
                      ) : (
                        <>
                          <Leaf className="w-3.5 h-3.5" />
                          <span>قسم وقاية النبات والمحاصيل الزراعية (Plant Pathology)</span>
                        </>
                      )}
                    </span>

                    {/* Certified Lab Stamp */}
                    <span className="px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-[#00C896] text-[11px] font-bold flex items-center gap-1 border border-emerald-500/30">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>تقرير سريري معتمد بالذكاء الاصطناعي</span>
                    </span>

                    {/* Timestamp */}
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {new Date().toLocaleDateString('ar-EG', { dateStyle: 'long' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      REF ID: GFM-DX-2026-{(result.id ? result.id.slice(-6) : Math.random().toString(36).slice(-6)).toUpperCase()}
                    </span>
                  </div>

                  {/* Primary Diagnosis Headline */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-[1.3] pt-1">
                    {result.detectedDisease}
                  </h2>
                </div>

                {/* Confidence Meter Circular Hub */}
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-[#190d10] p-4 rounded-3xl border border-slate-200 dark:border-white/10 shrink-0 self-start md:self-auto shadow-inner">
                  <div className="text-center space-y-0.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                      مؤشر الدقة والمطابقة
                    </span>
                    <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-[#00C896] font-mono leading-none block">
                      {Math.round((result.confidenceScore || 0.95) * 100)}%
                    </span>
                    <span className="text-[9px] font-extrabold text-emerald-600 dark:text-[#00C896] bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                      دقة سريرية عالية
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-[#00C896] flex items-center justify-center font-bold">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Grid: Telemetry & Clinical Matrix (4 Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                
                {/* Card 1: Subject */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160c0f] border border-slate-200/80 dark:border-white/5 space-y-1.5 shadow-sm">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                    {['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k)) ? (
                      <Beef className="w-4 h-4 text-[#be1622] dark:text-[#ff6b6b]" />
                    ) : (
                      <Leaf className="w-4 h-4 text-emerald-500" />
                    )}
                    الكائن والموقع الجغرافي:
                  </span>
                  <strong className="text-sm font-black text-slate-900 dark:text-white block">
                    {cropOrAnimal || 'غير محدد'} • {governorate || 'جمهورية مصر العربية'}
                  </strong>
                </div>

                {/* Card 2: Severity */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160c0f] border border-slate-200/80 dark:border-white/5 space-y-1.5 shadow-sm">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    مستوى الخطورة السريرية:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                      result.severityLevel?.includes('عالية') || result.severityLevel?.includes('حرجة') || result.severityLevel?.includes('مرتفعة')
                        ? 'bg-red-500 shadow-lg shadow-red-500/50'
                        : 'bg-amber-500 shadow-lg shadow-amber-500/50'
                    }`} />
                    <strong className="text-sm font-black text-slate-900 dark:text-white block">
                      {result.severityLevel || 'متوسطة'}
                    </strong>
                  </div>
                </div>

                {/* Card 3: Climate & Environment */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160c0f] border border-slate-200/80 dark:border-white/5 space-y-1.5 shadow-sm">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                    <ThermometerSun className="w-4 h-4 text-amber-500" />
                    الظروف البيئية والمناخية:
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900 dark:text-white block line-clamp-2">
                    {result.satelliteTemp || 'درجة الحرارة 30°م - الرطوبة 50%'}
                  </strong>
                </div>

                {/* Card 4: Inspection Technique */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#160c0f] border border-slate-200/80 dark:border-white/5 space-y-1.5 shadow-sm">
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                    <ScanLine className="w-4 h-4 text-sky-400" />
                    طريقة الفحص والنموذج:
                  </span>
                  <strong className="text-sm font-black text-slate-900 dark:text-white block">
                    {result.mode === 'IMAGE' ? 'فحص بصري (رؤية حاسوبية)' : 'فحص سريري (وصف الأعراض)'}
                  </strong>
                </div>

              </div>

              {/* Structured Smart Prescription Protocol */}
              <div className="space-y-4 relative z-10 pt-2">
                <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-3">
                  <div className="flex items-center gap-2 text-base font-black text-slate-900 dark:text-white">
                    <Pill className="w-5 h-5 text-[#be1622] dark:text-[#ff6b6b]" />
                    <span>الروشتة العلاجية والبروتوكول السريري المعتمد (Clinical Prescription)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-[#00C896] bg-emerald-500/10 px-3 py-1 rounded-full">
                    جرعات ومواد فعالة
                  </span>
                </div>

                {/* Structured Protocol Cards Grid */}
                <div className="grid grid-cols-1 gap-4">
                  {parseTreatmentProtocol(result.recommendedTreatment).map((stage) => {
                    const isMed = stage.category === 'medication';
                    const isBio = stage.category === 'biosecurity';

                    return (
                      <div
                        key={stage.id}
                        className={`p-6 rounded-3xl border transition-all duration-300 shadow-sm ${
                          isMed
                            ? 'bg-gradient-to-r from-red-500/5 via-transparent to-transparent dark:from-[#200c11] dark:via-[#15070a] dark:to-[#0f0507] border-[#be1622]/30 hover:border-[#be1622]'
                            : isBio
                            ? 'bg-gradient-to-r from-sky-500/5 via-transparent to-transparent dark:from-[#0d1620] dark:via-[#080d14] dark:to-[#05080c] border-sky-500/30 hover:border-sky-500'
                            : 'bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent dark:from-[#0d1c16] dark:via-[#08130e] dark:to-[#050c09] border-emerald-500/30 hover:border-emerald-500'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                              isMed
                                ? 'bg-[#be1622]/15 text-[#be1622] dark:text-[#ff6b6b]'
                                : isBio
                                ? 'bg-sky-500/15 text-sky-500'
                                : 'bg-emerald-500/15 text-emerald-500'
                            }`}
                          >
                            {isMed ? <Pill className="w-5 h-5" /> : isBio ? <ShieldCheck className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                            {stage.title}
                          </h3>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-[2.1] whitespace-pre-line pr-2 border-r-2 border-slate-200 dark:border-white/10">
                          {stage.body}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Direct Marketplace / Pharmacy Bridge */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-600/10 via-emerald-500/5 to-teal-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 shadow-sm">
                <div className="space-y-1 text-right">
                  <strong className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    توفير الأدوية والمبيدات والمطهرات المعتمدة
                  </strong>
                  <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">
                    يمكنك طلب كافة المواد الفعالة والأدوية والمطهرات الواردة بالتقرير مباشرة عبر سوق المنصة.
                  </p>
                </div>
                <a
                  href={`/marketplace?search=${encodeURIComponent(
                    ['عجل', 'عجول', 'تسمين', 'بقر', 'جاموس', 'ماشية', 'مواشي', 'غنم', 'خروف', 'ماعز', 'دواجن', 'فراخ', 'بيطري'].some(k => `${cropOrAnimal} ${result.detectedDisease}`.toLowerCase().includes(k)) ? 'أدوية بيطرية' : 'مبيدات زراعية'
                  )}`}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white text-xs font-black shrink-0 flex items-center gap-2 shadow-md transition"
                >
                  <span>تصفح سوق المستلزمات الطبية</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Disclaimer Notice */}
              {result.disclaimer && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200 font-medium leading-[1.8] relative z-10">
                  <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>{result.disclaimer}</p>
                </div>
              )}

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200/80 dark:border-white/10 relative z-10">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print();
                    }}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-black text-slate-800 dark:text-white flex items-center gap-2 transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#be1622] dark:text-[#ff6b6b]" />
                    <span>طباعة الروشتة (Print / PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const shareText = `تقرير فحص جرين فارم ماركت الطبي:\nالحالة: ${result.detectedDisease}\nنسبة الثقة: ${Math.round((result.confidenceScore || 0.95) * 100)}%\nدرجة الخطورة: ${result.severityLevel}\n${window.location.href}`;
                      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                      window.open(waUrl, '_blank');
                    }}
                    className="px-5 py-3 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-[#00C896] text-xs font-black flex items-center gap-2 transition cursor-pointer border border-emerald-500/20"
                  >
                    <Share2 className="w-4 h-4 text-emerald-500" />
                    <span>مشاركة عبر واتساب</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResult(null);
                      setSymptomsText('');
                      setSelectedFile(null);
                      setFilePreview(null);
                      document.getElementById('diagnostic-studio')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 text-xs font-black flex items-center gap-2 transition cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>إجراء فحص جديد</span>
                  </button>

                  <a
                    href="tel:01099856661"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#be1622] via-[#d62828] to-[#e63946] text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-red-600/25 cursor-pointer hover:opacity-95 transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>استشارة طبيب بيطري / استشاري زراعي</span>
                  </a>
                </div>
              </div>

            </div>
          </BorderGlow>

        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: SMART AGRICULTURE HEALTHCARE CAPABILITIES */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-[#be1622]/10 text-[#be1622] dark:text-[#ff6b6b] text-xs font-black">
            قدرات المنظومة الطبية الذكية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            شامل لكافة أمراض النبات والإنتاج الحيواني
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            تغطية علاجية تدمج أحدث تقنيات الرؤية الحاسوبية ونماذج الذكاء الاصطناعي التوليدي.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'تشخيص أمراض النباتات والمحاصيل',
              icon: Leaf,
              color: '#00C896',
              desc: 'كشف دقيق عن أمراض التبقع، البياض الدقيقي، اللفحات، ونقص العناصر الغذائية في الأوراق والثمار.',
            },
            {
              title: 'تشخيص أمراض الثروة الحيوانية',
              icon: Beef,
              color: '#be1622',
              desc: 'رصد أمراض الحمى القلاعية، التهابات الضرع، الجلد العقدي، الطفيليات، واضطرابات التغذية.',
            },
            {
              title: 'تحليل الصور بالرؤية الحاسوبية',
              icon: Camera,
              color: '#38bdf8',
              desc: 'معالجة بصرية دقيقة تعزل بؤر الإصابة الطيفية وتقارنها مع أكثر من 50 ألف حالة موثقة.',
            },
            {
              title: 'التوصيات العلاجية والجرعات الذكية',
              icon: Droplets,
              color: '#a855f7',
              desc: 'تحديد أسماء المواد الفعالة والمبيدات الموصى بها ونسب التخفيف وفترة الأمان قبل الحصاد (PHI).',
            },
            {
              title: 'ربط بيانات المناخ والأقمار الصناعية',
              icon: ThermometerSun,
              color: '#f59e0b',
              desc: 'تحليل درجات الحرارة والرطوبة الحقلية وتقديم إرشادات وقائية لتفادي الإجهاد الحراري.',
            },
            {
              title: 'سجل طبي رقمي للمزرعة',
              icon: Activity,
              color: '#ec4899',
              desc: 'حفظ كافة الفحوصات والروشتات السابقة للرجوع إليها ومتابعة تعافي المحصول والقطيع.',
            },
          ].map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0f0608] border border-slate-200/80 dark:border-[#220a0e] space-y-4 text-right hover:border-[#be1622]/60 transition shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                  style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {cap.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: PREVIOUS DIAGNOSTIC HISTORY (FOR REGISTERED USERS) */}
      {/* ========================================================================= */}
      {isRegistered && myHistory.length > 0 && (
        <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-[#220a0e] pb-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#be1622]" />
                سجل الفحوصات والتشخيصات السابقة لمزرعتك
              </h3>
              <span className="text-xs text-slate-400 font-bold block mt-0.5">
                {myHistory.length} فحص محفوظ في سجلك الطبي
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myHistory.map((diag) => (
              <div
                key={diag.id}
                onClick={() => {
                  setResult(diag);
                  resultRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="p-5 rounded-[24px] bg-white dark:bg-[#0f0608] border border-slate-200/80 dark:border-[#220a0e] hover:border-[#be1622] transition cursor-pointer space-y-3 text-right shadow-sm group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(diag.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00C896] text-[10px] font-bold">
                    {Math.round((diag.confidenceScore || 0.95) * 100)}% دقة
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-[#be1622] transition line-clamp-1">
                    {diag.detectedDisease}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                    {diag.recommendedTreatment}
                  </p>
                </div>

                <span className="text-[11px] font-bold text-[#be1622] flex items-center gap-1 group-hover:translate-x-1 transition">
                  عرض التقرير الكامل ➔
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
