import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Article } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  ArrowLeft,
  X,
  Search,
  Filter,
  Sparkles,
  BarChart3,
  RefreshCw,
  Clock,
  MapPin,
  Share2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Beef,
  Wheat,
  SlidersHorizontal,
  DollarSign,
  AlertTriangle,
  Zap,
  BookOpen,
  Send,
  Eye,
} from 'lucide-react';

import marketIntelligenceImg from '../assets/Market Intelligence  Agricultural Exchange.png';
import agriculturalNewsImg from '../assets/Agricultural News.png';

interface MarketItem {
  id: string;
  commodity: string;
  price: number;
  priceUnit: string;
  change: number;
  trend: string;
  notes?: string;
  updatedAt?: string;
}

export const NewsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, isRegistered, toggleAuthModal } = useAuth();

  // Admin Verification
  const isAdmin = Boolean(
    isRegistered &&
    user &&
    (user.email?.trim().toLowerCase() === 'ahmed.admin@gmail.com' || String(user.role).toUpperCase() === 'ADMIN')
  );

  // Data States
  const [articles, setArticles] = useState<Article[]>([]);
  const [marketUpdates, setMarketUpdates] = useState<MarketItem[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingMarket, setLoadingMarket] = useState(false);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarketTab, setSelectedMarketTab] = useState<'ALL' | 'CROPS' | 'LIVESTOCK' | 'VEGETABLES'>('ALL');

  // Modals
  const [selectedArticleForRead, setSelectedArticleForRead] = useState<Article | null>(null);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showAddMarketModal, setShowAddMarketModal] = useState(false);

  // Add News Form State
  const [newArticleData, setNewArticleData] = useState({
    title: '',
    category: 'أخبار المحاصيل',
    summary: '',
    content: '',
    author: 'فريق بحوث جرين فارم ماركت',
    imageUrl: '',
  });

  // Add Market Price Form State
  const [newMarketData, setNewMarketData] = useState({
    commodity: '',
    price: '',
    priceUnit: 'ج.م / طن',
    change: '0.0',
    trend: 'UP',
    notes: '',
  });

  // Handle URL actions
  useEffect(() => {
    if (searchParams.get('action') === 'add-news' && isAdmin) {
      setShowAddNewsModal(true);
    }
  }, [searchParams, isAdmin]);

  // Initial Fetch
  useEffect(() => {
    fetchArticles();
    fetchMarketUpdates();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const params: any = {};
      if (selectedCategory !== 'ALL') {
        params.category = selectedCategory;
      }
      const res = await api.get('/news', { params });
      if (res.data?.success && Array.isArray(res.data.data)) {
        setArticles(res.data.data);
      } else {
        setArticles([]);
      }
    } catch {
      setArticles([]);
    } finally {
      setLoadingArticles(false);
    }
  };

  const fetchMarketUpdates = async () => {
    setLoadingMarket(true);
    try {
      const res = await api.get('/news/market');
      if (res.data?.success && Array.isArray(res.data.data)) {
        setMarketUpdates(res.data.data);
      } else {
        setMarketUpdates([]);
      }
    } catch {
      setMarketUpdates([]);
    } finally {
      setLoadingMarket(false);
    }
  };

  // Filter Articles
  const filteredArticles = articles.filter((art) => {
    const matchesCategory = selectedCategory === 'ALL' || art.category?.includes(selectedCategory);
    const matchesSearch =
      !searchQuery.trim() ||
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter Market Commodities
  const filteredMarketUpdates = marketUpdates.filter((item) => {
    if (selectedMarketTab === 'ALL') return true;
    if (selectedMarketTab === 'CROPS') {
      return item.commodity.includes('قمح') || item.commodity.includes('ذرة') || item.commodity.includes('صويا') || item.commodity.includes('أرز') || item.commodity.includes('قطن');
    }
    if (selectedMarketTab === 'LIVESTOCK') {
      return item.commodity.includes('بقري') || item.commodity.includes('أبقار') || item.commodity.includes('أغنام') || item.commodity.includes('دواجن') || item.commodity.includes('بيض') || item.commodity.includes('عجول');
    }
    if (selectedMarketTab === 'VEGETABLES') {
      return item.commodity.includes('طماطم') || item.commodity.includes('بطاطس') || item.commodity.includes('بصل') || item.commodity.includes('خضار') || item.commodity.includes('فاكهة');
    }
    return true;
  });

  // Handle Create Article (Admin)
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('هذا الإجراء مخصص لمدير المنظومة فقط.');
      return;
    }

    try {
      const res = await api.post('/news', newArticleData);
      if (res.data?.success) {
        toast.success('تم نشر التقرير الإخباري بنجاح في المنظومة!');
        setShowAddNewsModal(false);
        setNewArticleData({
          title: '',
          category: 'أخبار المحاصيل',
          summary: '',
          content: '',
          author: 'فريق بحوث جرين فارم ماركت',
          imageUrl: '',
        });
        fetchArticles();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل نشر المقال الإخباري.');
    }
  };

  // Handle Create Market Price (Admin)
  const handleCreateMarketPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('هذا الإجراء مخصص لمدير المنظومة فقط.');
      return;
    }

    try {
      const res = await api.post('/news/market', {
        ...newMarketData,
        price: parseFloat(newMarketData.price) || 0,
        change: parseFloat(newMarketData.change) || 0,
      });

      if (res.data?.success) {
        toast.success('تم تسجيل مؤشر السعر بنجاح في البورصة الزراعية!');
        setShowAddMarketModal(false);
        setNewMarketData({
          commodity: '',
          price: '',
          priceUnit: 'ج.م / طن',
          change: '0.0',
          trend: 'UP',
          notes: '',
        });
        fetchMarketUpdates();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل تسجيل مؤشر السعر.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-purple-500/30 selection:text-purple-950 pb-20 select-none" dir="rtl">
      
      {/* ========================================================================= */}
      {/* SECTION 1: INTELLIGENT NEWS & MARKET INTELLIGENCE HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 overflow-hidden isolate border-b border-slate-200/80 dark:border-[#211634]">
        
        {/* Purple Glowing Radiations */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#7C3AED]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Animated Digital Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 bg-[radial-gradient(#A855F7_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Live Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-[#A855F7] text-xs font-black shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7C3AED]" />
                </span>
                <span>الذكاء الزراعي وبورصة السلع والأسعار اللحظية</span>
              </div>

              {/* Grand Title */}
              <div className="space-y-4 pt-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] tracking-normal py-1">
                  جرين فارم ماركت |{' '}
                  <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00C896] bg-clip-text text-transparent inline-block pb-1">
                    النشرة الزراعية الذكية
                  </span>{' '}
                  وبورصة الأسواق
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-[1.8] pt-1">
                  مركز المعلومات والأخبار الزراعية والبيطرية وتقارير البورصة اللحظية، مدعومة بتحليلات الذكاء الاصطناعي والتوصيات العلمية الموثوقة لحماية استثماراتك الزراعية.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#market-dashboard"
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#00C896] hover:opacity-95 text-white text-sm font-black flex items-center gap-2.5 shadow-xl shadow-purple-500/25 hover:scale-102 transition cursor-pointer"
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                  <span>بورصة الأسعار اللحظية</span>
                </a>

                <a
                  href="#news-directory"
                  className="px-7 py-4 rounded-2xl bg-white/80 dark:bg-[#120d1e] hover:bg-slate-100 dark:hover:bg-[#1c152d] border border-purple-500/40 text-slate-900 dark:text-white text-sm font-black flex items-center gap-2.5 shadow-sm transition cursor-pointer backdrop-blur-sm"
                >
                  <Newspaper className="w-5 h-5 text-[#A855F7]" />
                  <span>تصفح التقارير الإخبارية</span>
                </a>

                {/* Admin Quick Action Button */}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setShowAddNewsModal(true)}
                    className="px-5 py-4 rounded-2xl bg-rose-600/15 hover:bg-rose-600/25 border border-rose-500/30 text-[#be1622] dark:text-rose-400 text-xs font-black flex items-center gap-2 transition cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ نشر تقرير إخباري (إدارة)</span>
                  </button>
                )}
              </div>

              {/* Floating Live Market Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#130d22]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-[#A855F7] flex items-center justify-center font-bold shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">رصد الأسعار 24/7</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">تحديث أسواق الجملة والبورصة</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#130d22]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#00C896] flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">تحليلات AI ذكية</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">توقعات العروات والمناخ</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#130d22]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">مصادر رسمية موثقة</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">وزارة الزراعة ومراكز البحوث</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Market Intelligence Image) */}
            <div className="lg:col-span-5">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={32}
                glowRadius={50}
                glowIntensity={1.3}
                coneSpread={25}
                animated={false}
                colors={['#7C3AED', '#A855F7', '#00C896']}
                className="shadow-2xl shadow-purple-500/15"
              >
                <div className="relative rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-[#2a1c43] group">
                  <img
                    src={marketIntelligenceImg}
                    alt="مركز الذكاء الزراعي والبورصة"
                    className="w-full h-[360px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00040d]/90 via-[#00040d]/30 to-transparent" />

                  {/* Floating Badges on Image */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-[#110b1f]/90 backdrop-blur-md border border-purple-500/30 text-xs text-white flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A855F7] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
                    </span>
                    <span className="font-extrabold text-[11px]">مؤشرات الأسواق والبورصة | Live Ticker</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#0d0718]/95 backdrop-blur-md border border-white/10 space-y-1.5 text-right">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs sm:text-sm font-black flex items-center gap-1.5">
                        <BarChart3 className="w-4 h-4 text-[#A855F7]" />
                        منظومة رصد الأسعار والذكاء الزراعي 2026
                      </strong>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-[#A855F7] text-[10px] font-bold">
                        Bloomberg Agri
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-[1.6]">
                      تحديثات لحظية لحركة أسعار القمح، الأعلاف، اللحوم، والخضروات بأسواق الجملة المركزية.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: AGRICULTURAL MARKET DASHBOARD (LIVE COMMODITY & LIVESTOCK EXCHANGE) */}
      {/* ========================================================================= */}
      <section id="market-dashboard" className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#211634] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                لوحة البورصة وأسعار السلع والمواشي اليوم
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-[#A855F7] text-xs font-mono font-bold">
                {filteredMarketUpdates.length} سلعة مسجلة
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              متوسط الأسعار الرسمية واليومية بأسواق الجملة والصوامع والمضارب ومحطات الإنتاج الحيواني
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setShowAddMarketModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ إضافة / تحديث سعر سلعة</span>
              </button>
            )}

            <button
              type="button"
              onClick={fetchMarketUpdates}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#120d1e] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-purple-500 transition cursor-pointer"
              title="تحديث الأسعار الآن"
            >
              <RefreshCw className={`w-4 h-4 text-[#A855F7] ${loadingMarket ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Commodity Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: '📊 جميع السلع والبورصات' },
            { id: 'CROPS', label: '🌾 المحاصيل والحبوب الاستراتيجية' },
            { id: 'LIVESTOCK', label: '🐄 الثروة الحيوانية والداجنة والأعلاف' },
            { id: 'VEGETABLES', label: '🍅 الخضروات والفاكهة المركزية' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedMarketTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer ${
                selectedMarketTab === tab.id
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md'
                  : 'bg-white dark:bg-[#120d1e] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-purple-500/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Commodity Live Price Grid */}
        {loadingMarket ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#A855F7] animate-spin mx-auto" />
            <span className="text-xs text-slate-500 font-bold block">جاري تحميل أسعار البورصة اللحظية...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMarketUpdates.map((item) => {
              const isUp = item.trend === 'UP' || item.change > 0;
              const isDown = item.trend === 'DOWN' || item.change < 0;
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-[24px] bg-white dark:bg-[#0e0918] border border-slate-200/80 dark:border-[#221637] shadow-sm hover:border-purple-500/50 transition space-y-3 text-right flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {item.commodity}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-0.5 ${
                          isUp
                            ? 'bg-emerald-500/10 text-[#00C896]'
                            : isDown
                            ? 'bg-rose-500/10 text-[#be1622] dark:text-rose-400'
                            : 'bg-slate-500/10 text-slate-400'
                        }`}
                      >
                        {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                        <span>{item.change > 0 ? `+${item.change}%` : `${item.change}%`}</span>
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-baseline gap-1">
                        <strong className="text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-[#A855F7] transition">
                          {item.price.toLocaleString()}
                        </strong>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {item.priceUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {item.notes && (
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                      <span>{item.notes}</span>
                      <span className="text-emerald-500 font-bold">محدث اليوم</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: AI AGRICULTURAL PREDICTIVE INSIGHTS */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-[#A855F7] text-xs font-black border border-purple-500/20">
            تحليلات وتوقعات الذكاء الاصطناعي
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            رؤى ذكية لحركة الأسواق والمحاصيل القادمة
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            خوارزميات AI تحلل بيانات الطقس، العروات، وسلاسل الإمداد لتقديم توقعات دقيقة للمزارعين والمربين.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: 'توقعات أسعار الطماطم والخضار',
              sub: 'مؤشر العروة الصيفية الجديدة',
              desc: 'توقع استقرار المعروض في سوق العبور وانخفاض تدريجي في أسعار التجزئة بنسبة 12% خلال الأسبوعين القادمين.',
              badge: 'توقع صاعد للإنتاج',
              color: '#00C896',
              icon: Sparkles,
            },
            {
              title: 'خامات الأعلاف والذرة الصفراء',
              sub: 'تحليل الإمدادات والاستيراد',
              desc: 'استقرار أسعار الأعلاف 21% مع وصول شحنات جديدة للموانئ وانخفاض تكلفة التسمين لمزارع الدواجن والمواشي.',
              badge: 'استقرار الأسعار',
              color: '#A855F7',
              icon: BarChart3,
            },
            {
              title: 'مؤشر أسعار اللحوم الحية',
              sub: 'الطلب الموسمي على المواشي',
              desc: 'زيادة الطلب على العجول التسمين والأغنام في المحافظات مع ثبات المعروض بأسواق بني سويف والبحيرة.',
              badge: 'طلب نشط',
              color: '#f59e0b',
              icon: Beef,
            },
            {
              title: 'تحليل الطقس وموجات الري',
              sub: 'إرشادات المحافظة على الرطوبة',
              desc: 'توصيات بري المحاصيل فجراً وتقليل فترات التعطيش لتفادي الإجهاد الحراري ورفع جودة المحصول بنسبة 20%.',
              badge: 'توصية وقائية',
              color: '#38bdf8',
              icon: Zap,
            },
          ].map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#0e0918] border border-slate-200/80 dark:border-[#221637] space-y-4 text-right hover:border-purple-500 transition shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold"
                    style={{ backgroundColor: `${insight.color}15`, color: insight.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: `${insight.color}15`, color: insight.color }}
                  >
                    {insight.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    {insight.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-bold block">
                    {insight.sub}
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-[1.6] font-medium">
                  {insight.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: NEWS & INTELLIGENCE DIRECTORY (NEWS MARKETPLACE) */}
      {/* ========================================================================= */}
      <section id="news-directory" className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#211634] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                التقارير والأخبار الزراعية والبيطرية
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-[#A855F7] text-xs font-mono font-bold">
                {filteredArticles.length} تقرير
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              أحدث التوصيات العلمية والأخبار الحصرية المنشورة من المصادر الرسمية المعتمدة
            </p>
          </div>
        </div>

        {/* Category Pills Switcher */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'ALL', label: '🌟 جميع الأخبار والتقارير' },
            { id: 'أخبار المحاصيل', label: '🌱 أخبار المحاصيل والإنتاج النباتي' },
            { id: 'الثروة الحيوانية', label: '🐄 الثروة الحيوانية والبيطرية' },
            { id: 'الأسواق والبورصة', label: '📊 تحليلات الأسواق والبورصة' },
            { id: 'التكنولوجيا والذكاء الزراعي', label: '🚜 التكنولوجيا والذكاء الزراعي' },
            { id: 'الإرشاد الزراعي', label: '🧪 الإرشاد الزراعي والوقاية' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md'
                  : 'bg-white dark:bg-[#120d1e] border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:border-purple-500/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0e0918] border border-slate-200/80 dark:border-[#221637] shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأخبار والتقارير بالموضوع، العنوان، أو المصدر..."
              className="w-full bg-slate-50 dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold outline-none focus:border-purple-500"
            />
          </div>
        </div>

        {/* Articles Cards Grid */}
        {loadingArticles ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#A855F7] animate-spin mx-auto" />
            <span className="text-xs text-slate-500 font-bold block">جاري تحميل التقارير الإخبارية...</span>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                className="rounded-[28px] overflow-hidden bg-white dark:bg-[#0e0918] border border-slate-200/80 dark:border-[#221637] shadow-sm hover:border-purple-500/50 transition flex flex-col justify-between text-right group"
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={art.imageUrl || agriculturalNewsImg}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category & AI Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-purple-600/90 text-white text-[10px] font-black backdrop-blur-md">
                        {art.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white text-[10px] font-bold">
                      <span className="flex items-center gap-1 opacity-90">
                        <User className="w-3 h-3 text-[#A855F7]" />
                        {art.author || 'جرين فارم ماركت'}
                      </span>
                      <span className="flex items-center gap-1 opacity-90 font-mono">
                        <Clock className="w-3 h-3 text-[#00C896]" />
                        3 دقائق قراءة
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-black text-slate-900 dark:text-white leading-[1.45] group-hover:text-[#A855F7] transition">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-[1.7] line-clamp-3">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Read Action */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedArticleForRead(art)}
                    className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-[#180f2a] hover:bg-gradient-to-r hover:from-[#7C3AED] hover:to-[#A855F7] hover:text-white text-slate-800 dark:text-slate-200 text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <span>قراءة التقرير والتحليل الكامل</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-[32px] bg-white dark:bg-[#0e0918] border border-slate-200/80 dark:border-[#221637] text-center space-y-3 shadow-sm">
            <Newspaper className="w-12 h-12 text-[#A855F7] mx-auto opacity-50" />
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              لا توجد تقارير مطابقة لمعايير البحث حالياً
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              سيتم نشر أحدث التوصيات والأخبار الزراعية اللحظية تباعاً عبر فريق الدعم والذكاء الزراعي.
            </p>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: REAL-TIME UPDATES LIVE TIMELINE */}
      {/* ========================================================================= */}
      <section className="py-8 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <BorderGlow
          edgeSensitivity={30}
          borderRadius={32}
          glowRadius={45}
          glowIntensity={1.2}
          coneSpread={25}
          animated={false}
          colors={['#7C3AED', '#A855F7', '#00C896']}
          className="shadow-xl shadow-purple-500/10"
        >
          <div className="p-8 rounded-[32px] bg-gradient-to-r from-[#120a22] via-[#160c2b] to-[#0e071c] text-white space-y-6 text-right border border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-[#A855F7] text-xs font-black">
                  شريط التحديثات الحية
                </span>
                <h3 className="text-xl font-black text-white mt-1">
                  آخر مستجدات القطاع الزراعي والبورصة اليوم
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Live Broadcast
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-purple-400 font-bold block">منذ ساعتين • بورصة الحبوب</span>
                <p className="text-slate-200 font-bold">تم اعتماد جدول أسعار توريد القمح البلدي بالصوامع المركزية.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-emerald-400 font-bold block">منذ 4 ساعات • الإنتاج الحيواني</span>
                <p className="text-slate-200 font-bold">وصول دفعة جديدة من اللقاحات البيطرية المجانية لمديريات الطب البيطري.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-sky-400 font-bold block">منذ 6 ساعات • التكنولوجيا الزراعية</span>
                <p className="text-slate-200 font-bold">إتاحة التشخيص البيطري والزراعي الفوري عبر صيدلية AI على المنصة.</p>
              </div>
            </div>
          </div>
        </BorderGlow>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: FULL ARTICLE READING MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedArticleForRead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0e0918] border border-slate-200 dark:border-[#221637] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-right my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedArticleForRead(null)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-purple-500/15 text-[#A855F7] text-xs font-black">
                    {selectedArticleForRead.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-[#00C896] text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    تقرير موثق ومعتمد
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-[1.45]">
                  {selectedArticleForRead.title}
                </h2>

                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold border-b border-slate-100 dark:border-white/5 pb-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#A855F7]" />
                    المصدر: {selectedArticleForRead.author || 'جرين فارم ماركت'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00C896]" />
                    {new Date(selectedArticleForRead.createdAt).toLocaleDateString('ar-EG')}
                  </span>
                </div>
              </div>

              {selectedArticleForRead.imageUrl && (
                <div className="rounded-2xl overflow-hidden h-60 bg-slate-900">
                  <img
                    src={selectedArticleForRead.imageUrl}
                    alt={selectedArticleForRead.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* AI Key Insights Summary Box */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-[#A855F7]">
                  <Sparkles className="w-4 h-4" />
                  <span>الخلاصة الذكية للتقرير (AI Summary):</span>
                </div>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-bold leading-[1.7]">
                  {selectedArticleForRead.summary}
                </p>
              </div>

              {/* Full Content Body */}
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-normal leading-[1.9] whitespace-pre-line space-y-4">
                {selectedArticleForRead.content}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('تم نسخ رابط التقرير بنجاح!');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#A855F7]" />
                  <span>مشاركة التقرير</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedArticleForRead(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white text-xs font-black shadow-md cursor-pointer"
                >
                  إغلاق التقرير
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: ADMIN ADD NEWS ARTICLE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAddNewsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#0e0918] border border-slate-200 dark:border-[#221637] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setShowAddNewsModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#A855F7]" />
                  نشر تقرير أو خبر زراعي جديد (لوحة الإدارة)
                </h3>
                <p className="text-xs text-slate-500">أدخل تفاصيل ومحتوى التقرير للنشر الفوري في المنصة.</p>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">عنوان المقال / التقرير *</label>
                  <input
                    type="text"
                    required
                    placeholder="أدخل عنواناً جذاباً ودقيقاً للتقرير..."
                    value={newArticleData.title}
                    onChange={(e) => setNewArticleData({ ...newArticleData, title: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">التصنيف الإخباري *</label>
                    <select
                      value={newArticleData.category}
                      onChange={(e) => setNewArticleData({ ...newArticleData, category: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none cursor-pointer"
                    >
                      <option value="أخبار المحاصيل">أخبار المحاصيل والإنتاج النباتي</option>
                      <option value="الثروة الحيوانية">الثروة الحيوانية والبيطرية</option>
                      <option value="الأسواق والبورصة">تحليلات الأسواق والبورصة</option>
                      <option value="التكنولوجيا والذكاء الزراعي">التكنولوجيا والذكاء الزراعي</option>
                      <option value="الإرشاد الزراعي">الإرشاد الزراعي والوقاية</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">المصدر أو الكاتب *</label>
                    <input
                      type="text"
                      required
                      value={newArticleData.author}
                      onChange={(e) => setNewArticleData({ ...newArticleData, author: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">رابط الصورة (URL)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newArticleData.imageUrl}
                    onChange={(e) => setNewArticleData({ ...newArticleData, imageUrl: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none text-left font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">الموجز الذكي (AI Summary) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="موجز سريع من 2-3 أسطر يلخص أهم نقاط التقرير..."
                    value={newArticleData.summary}
                    onChange={(e) => setNewArticleData({ ...newArticleData, summary: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-normal outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">المحتوى الكامل للتقرير *</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="اكتب المحتوى التفصيلي للتقرير هنا..."
                    value={newArticleData.content}
                    onChange={(e) => setNewArticleData({ ...newArticleData, content: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-normal outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddNewsModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-black text-xs shadow-md"
                  >
                    تأكيد ونشر التقرير
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 3: ADMIN ADD / UPDATE MARKET COMMODITY PRICE */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showAddMarketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-[#0e0918] border border-slate-200 dark:border-[#221637] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setShowAddMarketModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#A855F7]" />
                  تحديث سعر سلعة في البورصة الزراعية
                </h3>
                <p className="text-xs text-slate-500">أدخل السعر الرسمي والتغير اليومي للسلعة.</p>
              </div>

              <form onSubmit={handleCreateMarketPrice} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">اسم السلعة / المحصول / الماشية *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: قمح بلدي، ذرة صفراء، عجول بقري..."
                    value={newMarketData.commodity}
                    onChange={(e) => setNewMarketData({ ...newMarketData, commodity: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">السعر الحالي *</label>
                    <input
                      type="number"
                      required
                      placeholder="مثال: 2000"
                      value={newMarketData.price}
                      onChange={(e) => setNewMarketData({ ...newMarketData, price: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">وحدة القياس *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: ج.م / طن"
                      value={newMarketData.priceUnit}
                      onChange={(e) => setNewMarketData({ ...newMarketData, priceUnit: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">نسبة التغير اليومي (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="مثال: 1.5 أو -0.8"
                      value={newMarketData.change}
                      onChange={(e) => setNewMarketData({ ...newMarketData, change: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">اتجاه المؤشر</label>
                    <select
                      value={newMarketData.trend}
                      onChange={(e) => setNewMarketData({ ...newMarketData, trend: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none cursor-pointer"
                    >
                      <option value="UP">صاعد 🟢 (UP)</option>
                      <option value="DOWN">هابط 🔴 (DOWN)</option>
                      <option value="STABLE">مستقر ⚪ (STABLE)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">ملاحظات / السوق المرجعي</label>
                  <input
                    type="text"
                    placeholder="مثال: صوامع كفر الشيخ، سوق العبور المركزي..."
                    value={newMarketData.notes}
                    onChange={(e) => setNewMarketData({ ...newMarketData, notes: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#150e24] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddMarketModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-black text-xs shadow-md"
                  >
                    تأكيد وتحديث البورصة
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
