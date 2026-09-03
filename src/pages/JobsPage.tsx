import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Job } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  Briefcase,
  UserCheck,
  MapPin,
  Phone,
  X,
  Star,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  PlusCircle,
  Sparkles,
  Users,
  BadgeCheck,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  MessageCircle,
  Building2,
  Award,
  Wallet,
  Calendar,
  Layers,
  GraduationCap,
  Tractor,
  Beef,
  Wheat,
  Wrench,
  BarChart3,
  Truck,
  UserPlus,
  Send,
} from 'lucide-react';

import agriculturalEmploymentImg from '../assets/Agricultural Employment.webp';

export const JobsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, isRegistered, toggleAuthModal } = useAuth();

  // Data & Loading States
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // Tab & Filters
  const [activeTab, setActiveTab] = useState<'ALL' | 'HIRING' | 'SEEKING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedGovernorate, setSelectedGovernorate] = useState('ALL');
  const [selectedWorkType, setSelectedWorkType] = useState('ALL');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalMode, setModalMode] = useState<'HIRING' | 'SEEKING'>('HIRING');
  const [selectedJobForContact, setSelectedJobForContact] = useState<Job | null>(null);

  // New Job Form State
  const [newJobData, setNewJobData] = useState({
    title: '',
    description: '',
    roleCategory: 'مهندس زراعي',
    governorate: 'البحيرة',
    salaryRange: '8,000 - 12,000 ج.م',
    experienceYears: 'سنتان إلى 4 سنوات',
    workType: 'FULL_TIME',
    contactPhone: user?.phone || '',
  });

  // Handle URL actions
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'post-job') {
      setModalMode('HIRING');
      setShowAddModal(true);
    } else if (action === 'seek-work') {
      setModalMode('SEEKING');
      setShowAddModal(true);
    }
  }, [searchParams]);

  // Initial Fetch
  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const params: any = {};
      if (activeTab !== 'ALL') {
        params.type = activeTab.toLowerCase();
      }
      const res = await api.get('/jobs', { params });
      if (res.data?.success && Array.isArray(res.data.data)) {
        setJobs(res.data.data);
      } else {
        setJobs([]);
      }
    } catch {
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Filter Jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesTab = activeTab === 'ALL' || job.type === activeTab;
    const matchesCategory = selectedCategory === 'ALL' || job.roleCategory?.includes(selectedCategory);
    const matchesGov = selectedGovernorate === 'ALL' || job.governorate?.includes(selectedGovernorate);
    const matchesWorkType = selectedWorkType === 'ALL' || (job as any).workType === selectedWorkType;
    const matchesSearch =
      !searchQuery.trim() ||
      job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.roleCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.governorate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.publisher?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesCategory && matchesGov && matchesWorkType && matchesSearch;
  });

  // Submit Job
  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toggleAuthModal(true);
      return;
    }

    try {
      const res = await api.post('/jobs', {
        ...newJobData,
        type: modalMode.toLowerCase(),
      });

      if (res.data?.success) {
        toast.success(
          modalMode === 'HIRING'
            ? 'تم نشر الإعلان الوظيفي بنجاح! سيظهر لجميع الكفاءات الزراعية في المنصة.'
            : 'تم نشر ملفك المهني بنجاح! سيتمكن أصحاب المزارع من التواصل معك مباشرة.'
        );
        setShowAddModal(false);
        setNewJobData({
          title: '',
          description: '',
          roleCategory: 'مهندس زراعي',
          governorate: 'البحيرة',
          salaryRange: '8,000 - 12,000 ج.م',
          experienceYears: 'سنتان إلى 4 سنوات',
          workType: 'FULL_TIME',
          contactPhone: user?.phone || '',
        });
        fetchJobs();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل نشر الإعلان الوظيفي.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-amber-500/30 selection:text-amber-950 pb-20 select-none" dir="rtl">
      
      {/* ========================================================================= */}
      {/* SECTION 1: SMART EMPLOYMENT HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 overflow-hidden isolate border-b border-slate-200/80 dark:border-[#1e1c14]">
        
        {/* Ambient Warm Golden/Amber Lights */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#FFB703]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Animated Digital Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Calls to Action (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Badge with Live Radar Pulse */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-[#FFB703] text-xs font-black shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB703] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]" />
                </span>
                <span>المنظومة الرقمية للتوظيف والكوادر الزراعية</span>
              </div>

              {/* Grand Title */}
              <div className="space-y-4 pt-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] tracking-normal py-1">
                  جرين فارم ماركت |{' '}
                  <span className="bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] bg-clip-text text-transparent inline-block pb-1">
                    بوابة الفرص الزراعية الذكية
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-[1.8] pt-1">
                  منصة مجانية تربط أصحاب المزارع بالكفاءات الزراعية، والعمالة الفنية، والمهندسين، والأطباء البيطريين لبناء مجتمع زراعي متكامل بعقود مباشرة وفرص يومية مضمونة.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('HIRING');
                    setShowAddModal(true);
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] hover:opacity-95 text-slate-950 text-sm font-black flex items-center gap-2.5 shadow-xl shadow-amber-500/25 hover:scale-102 transition cursor-pointer"
                >
                  <Briefcase className="w-5 h-5 text-slate-950" />
                  <span>أعلن عن وظيفة في مزرعتك</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModalMode('SEEKING');
                    setShowAddModal(true);
                  }}
                  className="px-7 py-4 rounded-2xl bg-white/80 dark:bg-[#121c16] hover:bg-slate-100 dark:hover:bg-[#192820] border border-amber-500/40 text-slate-900 dark:text-white text-sm font-black flex items-center gap-2.5 shadow-sm transition cursor-pointer backdrop-blur-sm"
                >
                  <UserPlus className="w-5 h-5 text-[#FFB703]" />
                  <span>أضف ملفك المهني (ابحث عن فرصة)</span>
                </button>
              </div>

              {/* Floating Live Career Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#111914]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-[#FFB703] flex items-center justify-center font-bold shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">كفاءات موثقة</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">فحص شهادات وخبرات</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#111914]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#00C896] flex items-center justify-center font-bold shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">توظيف مباشر</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">بدون أي عمولات أو وسيط</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#111914]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">تغطية 27 محافظة</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">مزارع وصوب ومحطات</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Agricultural Employment Image) */}
            <div className="lg:col-span-5">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={32}
                glowRadius={50}
                glowIntensity={1.3}
                coneSpread={25}
                animated={false}
                colors={['#F59E0B', '#FFB703', '#00C896']}
                className="shadow-2xl shadow-amber-500/15"
              >
                <div className="relative rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-[#2b2416] group">
                  <img
                    src={agriculturalEmploymentImg}
                    alt="المنظومة الرقمية للتوظيف والكوادر الزراعية"
                    className="w-full h-[360px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00040d]/90 via-[#00040d]/30 to-transparent" />

                  {/* Floating Badges on Image */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-[#0d1510]/90 backdrop-blur-md border border-amber-500/30 text-xs text-white flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB703] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F59E0B]" />
                    </span>
                    <span className="font-extrabold text-[11px]">سوق العمل الزراعي | Live Talent Hub</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#09110d]/95 backdrop-blur-md border border-white/10 space-y-1.5 text-right">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs sm:text-sm font-black flex items-center gap-1.5">
                        <GraduationCap className="w-4 h-4 text-[#FFB703]" />
                        ملتقى الكفاءات والخبرات الزراعية 2026
                      </strong>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-[#00C896] text-[10px] font-bold">
                        100% مجاني
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-[1.6]">
                      ربط مهندسي الإنتاج، الأطباء البيطريين، ومشغلي المعدات مع كبرى المشاريع الزراعية.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: EMPLOYMENT KEY STATISTICS */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              count: '+500',
              label: 'فرصة عمل منشورة',
              sub: 'مزارع، محطات تصدير وصوب',
              icon: Briefcase,
              color: '#F59E0B',
            },
            {
              count: '+1,000',
              label: 'كادر وباحث عن عمل',
              sub: 'مهندسون وفنيون وعمال',
              icon: Users,
              color: '#00C896',
            },
            {
              count: '27',
              label: 'محافظة مشمولة بالكامل',
              sub: 'شبكة توظيف تغطي كافة الأقاليم',
              icon: MapPin,
              color: '#38bdf8',
            },
            {
              count: '100%',
              label: 'مجاني للمزارعين والعمال',
              sub: 'بدون أي عمولات أو رسوم توظيف',
              icon: ShieldCheck,
              color: '#a855f7',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] shadow-sm text-right space-y-2 hover:border-amber-500/40 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight group-hover:scale-105 transition">
                    {stat.count}
                  </span>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                    style={{ backgroundColor: `${stat.color}18`, color: stat.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {stat.label}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW IT WORKS (4 CONNECTED STEPS) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-[#FFB703] text-xs font-black border border-amber-500/20">
            خطوات التوظيف الذكي
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            كيف تبدأ رحلتك التوظيفية عبر جرين فارم؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            4 خطوات سريعة للوصول إلى الوظيفة المناسبة أو توظيف الكوادر الزراعية لمزرعتك.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            {
              step: '01',
              title: 'أنشئ حسابك المهني',
              desc: 'سجل حسابك وحدد هويتك كصاحب مزرعة أو مهندس زراعي أو باحث عن عمل.',
              icon: UserCheck,
            },
            {
              step: '02',
              title: 'أضف الوظيفة أو تخصصك',
              desc: 'انشر تفاصيل الشاغر الوظيفي والراتب أو أضف خبراتك ومؤهلاتك المهنية.',
              icon: PlusCircle,
            },
            {
              step: '03',
              title: 'تواصل مع الطرف المناسب',
              desc: 'محادثة مباشرة واتصال فوري بين أصحاب المزارع والكفاءات بدون وسطاء.',
              icon: MessageCircle,
            },
            {
              step: '04',
              title: 'ابدأ العمل والإنتاج',
              desc: 'اتفاق مباشر واستلام العمل وبناء مستقبل زراعي مستدام بعائد مجزي.',
              icon: CheckCircle2,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] space-y-4 text-right hover:border-amber-500 transition shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-[#FFB703] flex items-center justify-center font-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-[#1c2920]">
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
      {/* SECTION 4: JOB MARKETPLACE (LIVE JOBS & TALENT DIRECTORY) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#212c24] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                سوق الفرص والكوادر الزراعية المتاحة
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-[#FFB703] text-xs font-mono font-bold">
                {filteredJobs.length} إعلان نشط
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              تصفح الوظائف المطلوبة في المزارع أو استكشف الكوادر وأصحاب المهن الزراعية
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setModalMode('HIRING');
                setShowAddModal(true);
              }}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ نشر إعلان وظيفي جديد</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: ALL / HIRING / SEEKING */}
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'ALL', label: '🌟 جميع الفرص والكوادر', count: jobs.length },
            { id: 'HIRING', label: '💼 مطلوب للتوظيف في المزارع', count: jobs.filter((j) => j.type === 'HIRING').length },
            { id: 'SEEKING', label: '👤 أصحاب مهن وباحثين عن عمل', count: jobs.filter((j) => j.type === 'SEEKING').length },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs transition cursor-pointer flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#F59E0B] to-[#FFB703] text-slate-950 shadow-md scale-102'
                  : 'bg-white dark:bg-[#0c140f] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-amber-500/40'
              }`}
            >
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/10 dark:bg-white/10 font-mono">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* FilterBar & Search */}
        <div className="p-5 rounded-[24px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] shadow-sm space-y-4 text-right">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالمسمى، التخصص، أو صاحب الإعلان..."
                className="w-full bg-slate-50 dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pr-10 pl-4 text-xs font-bold outline-none focus:border-amber-500"
              />
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="ALL">جميع التخصصات الزراعية</option>
                <option value="مهندس زراعي">مهندس زراعي واستشاري</option>
                <option value="طبيب بيطري">طبيب بيطري وإنتاج حيواني</option>
                <option value="عامل مزرعة">عامل مزرعة وصوب</option>
                <option value="مشغل معدات">مشغل جرارات ومعدات</option>
                <option value="مدير مزرعة">مدير ومشرف مزرعة</option>
                <option value="سائق نقل">سائق نقل زراعي</option>
              </select>
            </div>

            {/* Governorate Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedGovernorate}
                onChange={(e) => setSelectedGovernorate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="ALL">كافة المحافظات</option>
                <option value="البحيرة">البحيرة والنوبارية</option>
                <option value="بني سويف">بني سويف</option>
                <option value="الشرقية">الشرقية والصالحية</option>
                <option value="المنيا">المنيا</option>
                <option value="الفيوم">الفيوم</option>
                <option value="الدقهلية">الدقهلية</option>
                <option value="الإسماعيلية">الإسماعيلية</option>
                <option value="الجيزة">الجيزة والقاهرة</option>
                <option value="الوادي الجديد">الوادي الجديد</option>
              </select>
            </div>

            {/* Work Type Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedWorkType}
                onChange={(e) => setSelectedWorkType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="ALL">نوع العمل (الكل)</option>
                <option value="FULL_TIME">دوام كامل</option>
                <option value="PART_TIME">دوام جزئي</option>
                <option value="SEASONAL">موسمي / باليومية</option>
              </select>
            </div>

          </div>
        </div>

        {/* Jobs Cards Grid */}
        {loadingJobs ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#FFB703] animate-spin mx-auto" />
            <span className="text-xs text-slate-500 font-bold block">جاري تحميل الفرص الوظيفية...</span>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] shadow-sm hover:border-amber-500/50 transition space-y-5 text-right flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  
                  {/* Top Badge & Type */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-black border flex items-center gap-1.5 ${
                        job.type === 'HIRING'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-[#FFB703] border-amber-500/20'
                          : 'bg-emerald-500/10 text-[#00C896] border-emerald-500/20'
                      }`}
                    >
                      {job.type === 'HIRING' ? (
                        <>
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>مطلوب للتوظيف</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>صاحب مهنة / باحث عن عمل</span>
                        </>
                      )}
                    </span>

                    <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      إعلان موثق
                    </span>
                  </div>

                  {/* Job Title & Category */}
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-[1.4] group-hover:text-amber-500 transition">
                      {job.title}
                    </h3>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block">
                      التخصص: {job.roleCategory}
                    </span>
                  </div>

                  {/* Details Specifications Strip */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121c16] border border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">الموقع الجغرافي:</span>
                      <span className="text-slate-900 dark:text-white flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span>{job.governorate}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">الخبرة المطلوبة / المتاحة:</span>
                      <span className="text-slate-800 dark:text-slate-200">{job.experienceYears || 'خبرة ميدانية'}</span>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">الراتب / المقابل التقديري:</span>
                      <span className="font-mono text-emerald-600 dark:text-[#00C896] font-black">{job.salaryRange || 'يحدد عند المقابلة'}</span>
                    </div>
                  </div>

                  {/* Description Snippet */}
                  {job.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-[1.6] line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  {/* Publisher Information */}
                  <div className="flex items-center gap-2.5 pt-1 border-t border-slate-100 dark:border-white/5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-xs">
                      {job.publisher?.name ? job.publisher.name.charAt(0) : 'م'}
                    </div>
                    <div className="text-[11px]">
                      <span className="font-extrabold text-slate-800 dark:text-slate-200 block">
                        {job.publisher?.name || 'صاحب إعلان معتمد'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJobForContact(job)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] hover:opacity-95 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-slate-950" />
                    <span>عرض التفاصيل والتواصل الفوري</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 sm:p-16 rounded-[32px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20">
              <Briefcase className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                لا توجد فرص وظيفية مطابقة لمعايير البحث حالياً
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                كن أول من ينشر إعلاناً وظيفياً لمزرعتك أو يعلن عن تخصصه ومهنته الزراعية مجاناً.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setModalMode('HIRING');
                  setShowAddModal(true);
                }}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FFB703] text-slate-950 text-xs font-black shadow-md cursor-pointer"
              >
                + أعلن عن شاغر وظيفي
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalMode('SEEKING');
                  setShowAddModal(true);
                }}
                className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white text-xs font-black cursor-pointer"
              >
                أضف ملفك المهني
              </button>
            </div>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SPECIALIZED AGRICULTURAL EMPLOYMENT CATEGORIES */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-[#FFB703] text-xs font-black">
            التخصصات المطلوبة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            المجالات والكوادر الزراعية الأكثر طلباً
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            تغطية شاملة لكافة المهن التخصصية والتشغيلية في المزارع ومحطات الإنتاج.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'عمال المزارع والإنتاج',
              icon: Tractor,
              color: '#F59E0B',
              desc: 'عمال حصاد، تقليم، وتسميد مدربون على رعاية الصوب الزراعية والمزارع المكشوفة.',
            },
            {
              title: 'مهندسون زراعيون واستشاريون',
              icon: Wheat,
              color: '#00C896',
              desc: 'خبراء وقاية المحاصيل، شبكات الري الحديث، إدارة التسميد، وتطوير الإنتاجية الزراعية.',
            },
            {
              title: 'أطباء بيطريون ورعاية مواشي',
              icon: Beef,
              color: '#38bdf8',
              desc: 'متخصصون في رعاية مزارع التسمين، الألبان، الدواجن، والبرامج الوقائية البيطرية.',
            },
            {
              title: 'مشغلو المعدات والجرارات',
              icon: Wrench,
              color: '#a855f7',
              desc: 'سائقو جرارات زراعية، حفارات، آلات حرث، وكومباينات حصاد الحبوب المتطورة.',
            },
            {
              title: 'مديرو ومطورو المزارع',
              icon: BarChart3,
              color: '#f43f5e',
              desc: 'إدارة العمليات الميدانية، متابعة المحاصيل، التخطيط المالي، وتنسيق سلاسل الإمداد.',
            },
            {
              title: 'سائقو النقل الزراعي',
              icon: Truck,
              color: '#fbbf24',
              desc: 'سائقو شاحنات وسيارات نقل مبردة متخصصة في نقل المحاصيل والمواشي بين المحافظات.',
            },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0c140f] border border-slate-200/80 dark:border-[#212c24] space-y-4 text-right hover:border-amber-500/50 transition shadow-sm"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                  style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {cat.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {cat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: POST JOB / SEEK WORK DUAL CTA */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Employers */}
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={32}
            glowRadius={45}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#F59E0B', '#FFB703', '#00C896']}
            className="shadow-xl shadow-amber-500/10"
          >
            <div className="p-8 rounded-[32px] bg-gradient-to-r from-[#17140b] via-[#1c180d] to-[#120f08] text-white space-y-5 text-right border border-white/5">
              <span className="px-3.5 py-1 rounded-full bg-amber-500/15 text-[#FFB703] text-xs font-black border border-amber-500/20">
                لأصحاب المزارع والشركات
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-[1.45]">
                لديك مزرعة وتبحث عن كفاءات مهنية وعمالة؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-[1.8]">
                انشر إعلان وظيفتك مجاناً وتواصل مباشرة مع مئات المهندسين والفنيين والعمال في محافظتك.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('HIRING');
                    setShowAddModal(true);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#FFB703] text-slate-950 font-black text-xs shadow-md hover:scale-102 transition cursor-pointer"
                >
                  أضف إعلان شاغر وظيفي ➔
                </button>
              </div>
            </div>
          </BorderGlow>

          {/* Card 2: Job Seekers */}
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={32}
            glowRadius={45}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#38bdf8']}
            className="shadow-xl shadow-emerald-500/10"
          >
            <div className="p-8 rounded-[32px] bg-gradient-to-r from-[#0b1713] via-[#0d1c17] to-[#08120e] text-white space-y-5 text-right border border-white/5">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 text-[#00C896] text-xs font-black border border-emerald-500/20">
                للكوادر وأصحاب المهن
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-[1.45]">
                تبحث عن فرصة عمل في القطاع الزراعي؟
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-[1.8]">
                سجل تخصصك وخبرتك المهنية لتصل سيرتك الذاتية لكبرى المزارع والمشروعات الزراعية في مصر.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalMode('SEEKING');
                    setShowAddModal(true);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs shadow-md hover:scale-102 transition cursor-pointer"
                >
                  أضف ملفك المهني مجاناً ➔
                </button>
              </div>
            </div>
          </BorderGlow>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: POST JOB / SEEK WORK MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#0c140f] border border-slate-200 dark:border-[#212c24] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-500" />
                  {modalMode === 'HIRING' ? 'نشر فرصة عمل (مطلوب موظفين)' : 'تسجيل ملف مهني (باحث عن عمل)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {modalMode === 'HIRING'
                    ? 'أدخل تفاصيل الشاغر الوظيفي والمهام المطلوبة في مزرعتك.'
                    : 'أدخل تخصصك وخبراتك وسيقوم أصحاب المزارع بالتواصل معك.'}
                </p>
              </div>

              {/* Mode Toggle Inside Modal */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#121c16] text-xs font-black">
                <button
                  type="button"
                  onClick={() => setModalMode('HIRING')}
                  className={`py-2 rounded-xl transition ${
                    modalMode === 'HIRING' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  💼 مطلوب للتوظيف
                </button>
                <button
                  type="button"
                  onClick={() => setModalMode('SEEKING')}
                  className={`py-2 rounded-xl transition ${
                    modalMode === 'SEEKING' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  👤 باحث عن عمل
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">
                    {modalMode === 'HIRING' ? 'المسمى الوظيفي المطلوب *' : 'المسمى المهني والتخصص *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      modalMode === 'HIRING'
                        ? 'مثال: مطلوب مهندس زراعي خبرة بمزارع الفراولة'
                        : 'مثال: طبيب بيطري خبرة 5 سنوات بمزارع التسمين'
                    }
                    value={newJobData.title}
                    onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">التخصص الزراعي *</label>
                    <select
                      value={newJobData.roleCategory}
                      onChange={(e) => setNewJobData({ ...newJobData, roleCategory: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none cursor-pointer"
                    >
                      <option value="مهندس زراعي">مهندس زراعي واستشاري</option>
                      <option value="طبيب بيطري">طبيب بيطري وإنتاج حيواني</option>
                      <option value="عامل مزرعة">عامل مزرعة وصوب</option>
                      <option value="مشغل معدات">مشغل جرارات ومعدات</option>
                      <option value="مدير مزرعة">مدير ومشرف مزرعة</option>
                      <option value="سائق نقل">سائق نقل زراعي</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">المحافظة *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: البحيرة، بني سويف..."
                      value={newJobData.governorate}
                      onChange={(e) => setNewJobData({ ...newJobData, governorate: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">سنوات الخبرة *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سنتان إلى 4 سنوات"
                      value={newJobData.experienceYears}
                      onChange={(e) => setNewJobData({ ...newJobData, experienceYears: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">الراتب / المقابل الشهري</label>
                    <input
                      type="text"
                      placeholder="مثال: 8,000 - 12,000 ج.م"
                      value={newJobData.salaryRange}
                      onChange={(e) => setNewJobData({ ...newJobData, salaryRange: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">رقم هاتف التواصل والواتساب *</label>
                  <input
                    type="tel"
                    required
                    value={newJobData.contactPhone}
                    onChange={(e) => setNewJobData({ ...newJobData, contactPhone: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono text-left"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">تفاصيل ومتطلبات إضافية</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب نبذة عن المهام المطلوبة، المزرعة، أو خبراتك السابقة..."
                    value={newJobData.description}
                    onChange={(e) => setNewJobData({ ...newJobData, description: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#121c16] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-normal outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] text-slate-950 font-black text-xs shadow-md"
                  >
                    تأكيد ونشر الإعلان
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: JOB DETAILS & DIRECT CONTACT MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedJobForContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0c140f] border border-slate-200 dark:border-[#212c24] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setSelectedJobForContact(null)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/15 text-amber-500 flex items-center justify-center mx-auto text-2xl font-black border border-amber-500/20">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white leading-[1.4]">
                  {selectedJobForContact.title}
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#00C896] text-xs font-bold inline-flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {selectedJobForContact.type === 'HIRING' ? 'فرصة عمل منشورة' : 'ملف مهني معتمد'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#121c16] border border-slate-200/60 dark:border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">التخصص:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedJobForContact.roleCategory}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">المحافظة:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedJobForContact.governorate}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">سنوات الخبرة:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedJobForContact.experienceYears || 'خبرة عملية'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">الراتب / المقابل:</span>
                  <strong className="font-mono text-emerald-600 dark:text-[#00C896]">{selectedJobForContact.salaryRange || 'يحدد عند المقابلة'}</strong>
                </div>
              </div>

              {selectedJobForContact.description && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#121c16] text-xs text-slate-600 dark:text-slate-300 leading-[1.6]">
                  {selectedJobForContact.description}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${selectedJobForContact.contactPhone || selectedJobForContact.publisher?.phone || '01012345678'}`}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#FFB703] to-[#00C896] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-102 transition"
                >
                  <Phone className="w-4 h-4 text-slate-950" />
                  <span>اتصال هاتفي مباشر: {selectedJobForContact.contactPhone || selectedJobForContact.publisher?.phone || '01012345678'}</span>
                </a>

                <a
                  href={`https://wa.me/2${(selectedJobForContact.contactPhone || selectedJobForContact.publisher?.phone || '01012345678').replace(/^0/, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>محادثة واتساب سريعة</span>
                </a>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
