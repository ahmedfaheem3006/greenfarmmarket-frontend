import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  Truck,
  ShieldCheck,
  Calculator,
  Phone,
  AlertTriangle,
  Search,
  Filter,
  MapPin,
  Calendar,
  Weight,
  Clock,
  CheckCircle2,
  Navigation,
  ArrowLeft,
  X,
  PlusCircle,
  Zap,
  Sparkles,
  Users,
  Compass,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Shield,
  MessageCircle,
  BadgeCheck,
  RefreshCw,
  SlidersHorizontal,
  Beef,
  Wheat,
  Package,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import smartLogisticsImg from '../assets/Smart Logistics.webp';
import coldShippingImg from '../assets/brand/Contact us for Toronto based temperature controlled shipping.jpeg';

export const TransportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, isRegistered, toggleAuthModal } = useAuth();

  // Loading & Data states
  const [transportOffers, setTransportOffers] = useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('ALL');
  const [selectedOriginGov, setSelectedOriginGov] = useState('ALL');

  // Quick Calculator State (Hero section)
  const [calcDistance, setCalcDistance] = useState(120);
  const [calcTier, setCalcTier] = useState<'TRANSPORT_ONLY' | 'TRANSPORT_PAY' | 'TRANSPORT_PAY_INSPECT'>('TRANSPORT_ONLY');
  const [calcCargoType, setCalcCargoType] = useState('محاصيل وخضروات');
  const [calcPickupGov, setCalcPickupGov] = useState('بني سويف');
  const [calcDestGov, setCalcDestGov] = useState('القاهرة والجيزة');

  // Modals
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedDriverForContact, setSelectedDriverForContact] = useState<any | null>(null);

  // Request Form State
  const [requestFormData, setRequestFormData] = useState({
    pickupGov: 'بني سويف',
    pickupAddress: '',
    destGov: 'القاهرة',
    destAddress: '',
    cargoType: 'محاصيل وخضروات طازجة',
    cargoWeightTons: '5',
    distanceKm: '120',
    tier: 'TRANSPORT_ONLY',
    notes: '',
  });

  // Register Vehicle Form State
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleType: 'جامبو نقل مواشي مجهزة',
    originGov: 'بني سويف',
    destGov: 'كافة المحافظات',
    capacityTons: '8',
    tripDate: 'متاح يومياً على مدار 24 ساعة',
    contactPhone: user?.phone || '',
  });

  // Fetch initial transport listings
  useEffect(() => {
    fetchTransportOffers();
  }, []);

  // Handle URL actions
  useEffect(() => {
    const action = searchParams.get('action');
    if (action === 'request-truck' || action === 'add-cargo') {
      setShowRequestModal(true);
    } else if (action === 'register-vehicle' || action === 'driver') {
      setShowRegisterModal(true);
    }
  }, [searchParams]);

  const fetchTransportOffers = async () => {
    setLoadingOffers(true);
    try {
      const res = await api.get('/transport/offers');
      if (res.data?.success && Array.isArray(res.data.data)) {
        setTransportOffers(res.data.data);
      } else {
        setTransportOffers([]);
      }
    } catch {
      setTransportOffers([]);
    } finally {
      setLoadingOffers(false);
    }
  };

  // Real-time calculation formula
  const pricePerKm = 12;
  const basePrice = calcDistance * pricePerKm;
  const tierMultiplier = calcTier === 'TRANSPORT_PAY_INSPECT' ? 1.2 : calcTier === 'TRANSPORT_PAY' ? 1.1 : 1.0;
  const estimatedCost = Math.round(basePrice * tierMultiplier);

  // Filter transport listings
  const filteredOffers = transportOffers.filter((offer) => {
    const matchesType = selectedVehicleType === 'ALL' || offer.vehicleType?.toLowerCase().includes(selectedVehicleType.toLowerCase());
    const matchesGov = selectedOriginGov === 'ALL' || offer.originGov?.includes(selectedOriginGov) || offer.destGov?.includes(selectedOriginGov);
    const matchesSearch =
      !searchQuery.trim() ||
      offer.vehicleType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.originGov?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.destGov?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.driver?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesGov && matchesSearch;
  });

  // Handle Request Submission
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toggleAuthModal(true);
      return;
    }

    try {
      const res = await api.post('/transport/requests', {
        ...requestFormData,
        distanceKm: parseFloat(requestFormData.distanceKm) || 100,
        cargoWeightTons: parseFloat(requestFormData.cargoWeightTons) || 1,
      });

      if (res.data?.success) {
        toast.success('تم إرسال وتأكيد طلب النقل بنجاح! سيتواصل معك أقرب ناقل معتمد.');
        setShowRequestModal(false);
        setRequestFormData({
          pickupGov: 'بني سويف',
          pickupAddress: '',
          destGov: 'القاهرة',
          destAddress: '',
          cargoType: 'محاصيل وخضروات طازجة',
          cargoWeightTons: '5',
          distanceKm: '120',
          tier: 'TRANSPORT_ONLY',
          notes: '',
        });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل إرسال طلب النقل. يرجى المحاولة لاحقاً.');
    }
  };

  // Handle Vehicle Registration Submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRegistered) {
      toggleAuthModal(true);
      return;
    }

    try {
      const res = await api.post('/transport/offers', {
        ...vehicleFormData,
        capacityTons: parseFloat(vehicleFormData.capacityTons) || 5,
      });

      if (res.data?.success) {
        toast.success('تم تسجيل مركبتك بنجاح في شبكة النقل الزراعي الذكي!');
        setTransportOffers([res.data.data, ...transportOffers]);
        setShowRegisterModal(false);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل تسجيل المركبة.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#38BDF8]/30 selection:text-sky-950 pb-20 select-none" dir="rtl">
      
      {/* ========================================================================= */}
      {/* SECTION 1: SMART AGRICULTURAL LOGISTICS HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 overflow-hidden isolate border-b border-slate-200/80 dark:border-[#102436]">
        {/* Futuristic Ambient Blue Light Radiations */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#1597D4]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-[400px] h-[400px] bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Animated Digital Grid Background Lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none -z-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Value Proposition (7 cols on lg) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Badge with Live Radar Pulse */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1597D4]/10 border border-[#38BDF8]/30 text-[#1597D4] dark:text-[#38BDF8] text-xs font-black shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1597D4]" />
                </span>
                <span>المنظومة الرقمية للنقل الزراعي الذكي</span>
              </div>

              {/* Grand Title */}
              <div className="space-y-4 pt-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.4] sm:leading-[1.45] tracking-normal py-1">
                  جرين فارم ماركت |{' '}
                  <span className="bg-gradient-to-r from-[#1597D4] via-[#38BDF8] to-[#00C896] bg-clip-text text-transparent inline-block pb-1">
                    النقل الذكي
                  </span>{' '}
                  والخدمات اللوجستية
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium max-w-2xl leading-[1.8] pt-1">
                  اربط مزرعتك بشبكة نقل موثوقة لنقل المواشي والمحاصيل والمستلزمات الزراعية بسهولة وأمان مع تتبع لحظي وشفافية كاملة في الأسعار.
                </p>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(true)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#1597D4] via-[#38BDF8] to-[#00C896] hover:opacity-95 text-slate-950 text-sm font-black flex items-center gap-2.5 shadow-xl shadow-[#38BDF8]/25 hover:scale-102 transition cursor-pointer"
                >
                  <Truck className="w-5 h-5 text-slate-950" />
                  <span>اطلب نقل الآن</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="px-7 py-4 rounded-2xl bg-white/80 dark:bg-[#0d1722] hover:bg-slate-100 dark:hover:bg-[#132334] border border-[#38BDF8]/40 text-slate-900 dark:text-white text-sm font-black flex items-center gap-2.5 shadow-sm transition cursor-pointer backdrop-blur-sm"
                >
                  <PlusCircle className="w-5 h-5 text-[#38BDF8]" />
                  <span>سجل مركبتك في الشبكة</span>
                </button>
              </div>

              {/* Floating Live Tech Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#0d1722]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-[#38BDF8] flex items-center justify-center font-bold shrink-0">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">تتبع GPS مباشر</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">مراقبة خط السير لحظياً</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#0d1722]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-[#00C896] flex items-center justify-center font-bold shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">سائقون موثقون</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">فحص هويات وتراخيص</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-[#0d1722]/60 border border-slate-200/60 dark:border-white/5 backdrop-blur-md flex items-center gap-2.5 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <strong className="block font-black text-slate-900 dark:text-white leading-[1.4]">استجابة فورية</strong>
                    <span className="text-[10px] text-slate-400 block leading-[1.4]">تغطية كافة المحافظات</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Showcase (Smart Logistics Fleet Image) */}
            <div className="lg:col-span-5">
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={32}
                glowRadius={45}
                glowIntensity={1.2}
                coneSpread={25}
                animated={false}
                colors={['#1597D4', '#38BDF8', '#00C896']}
                className="shadow-2xl shadow-sky-500/15"
              >
                <div className="relative rounded-[32px] overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-[#1c364e] group">
                  <img
                    src={smartLogisticsImg}
                    alt="المنظومة الرقمية للنقل الزراعي والخدمات اللوجستية"
                    className="w-full h-[360px] sm:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00040d]/90 via-[#00040d]/30 to-transparent" />

                  {/* Floating Tech Badges on Image */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-[#0d1722]/85 backdrop-blur-md border border-[#38BDF8]/30 text-xs text-white flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1597D4]" />
                    </span>
                    <span className="font-extrabold text-[11px]">تتبع أسطول النقل الزراعي | GPS Live</span>
                  </div>

                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-[#09131d]/90 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-white text-xs sm:text-sm font-black flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#38BDF8]" />
                        شبكة النقل الزراعي والخدمات اللوجستية
                      </strong>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-[#00C896] text-[10px] font-bold">
                        جاهزية 100%
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium leading-[1.6]">
                      تغطية شاملة لكافة المحافظات لنقل المواشي، المحاصيل، والأعلاف بشاحنات مجهزة.
                    </p>
                  </div>
                </div>
              </BorderGlow>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* ULTRA-PREMIUM SMART TRANSPORT CALCULATOR & FARE ESTIMATOR COCKPIT */}
          {/* ========================================================================= */}
          <div className="pt-6">
            <BorderGlow
              edgeSensitivity={30}
              borderRadius={32}
              glowRadius={50}
              glowIntensity={1.3}
              coneSpread={25}
              animated={false}
              colors={['#1597D4', '#38BDF8', '#00C896']}
              className="shadow-2xl shadow-sky-500/15"
            >
              <div className="p-6 sm:p-9 rounded-[32px] bg-white dark:bg-[#09131d] backdrop-blur-2xl border border-slate-200/90 dark:border-[#1c364e] space-y-8 text-right">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-white/5 pb-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-[#38BDF8] flex items-center justify-center font-bold">
                        <Calculator className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                        حاسبة النقل الذكي والتسعير المقدر للرحلات
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      احسب التكلفة التقديرية لرحلتك الزراعية بدقة وشفافية بناءً على المسافة الفعلية ونوع الخدمة ومستوى الضمان.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-[#38BDF8] text-xs font-mono font-black border border-sky-500/20">
                      AI Route Estimator 2026
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-[#00C896] text-xs font-bold border border-emerald-500/20">
                      تسعير فوري
                    </span>
                  </div>
                </div>

                {/* Main 2-Column Cockpit Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* RIGHT COLUMN: Configuration Deck (7 cols on lg) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* 1. Origin & Destination Route Card */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200/80 dark:border-white/5 space-y-4">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Navigation className="w-4 h-4 text-[#38BDF8]" />
                        <span>تحديد خط السير (من المزرعة إلى السوق / المشتري):</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 block">
                            مكان الانطلاق (المزرعة / الحقل):
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-[#38BDF8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                              value={calcPickupGov}
                              onChange={(e) => setCalcPickupGov(e.target.value)}
                              className="w-full bg-white dark:bg-[#07111c] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pr-9 pl-3 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-[#38BDF8] cursor-pointer"
                            >
                              <option value="بني سويف">بني سويف (مزارع ومحاصيل)</option>
                              <option value="المنيا">المنيا (عروس الصعيد)</option>
                              <option value="الفيوم">الفيوم (إنتاج زراعي وحيواني)</option>
                              <option value="البحيرة">البحيرة والنوبارية</option>
                              <option value="الشرقية">الشرقية والصالحية</option>
                              <option value="الدقهلية">الدقهلية والدلتا</option>
                              <option value="الإسماعيلية">الإسماعيلية والقناة</option>
                              <option value="الوادي الجديد">الوادي الجديد ومستصلحة</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 block">
                            وجهة التسليم (السوق / التاجر):
                          </label>
                          <div className="relative">
                            <MapPin className="w-4 h-4 text-[#00C896] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <select
                              value={calcDestGov}
                              onChange={(e) => setCalcDestGov(e.target.value)}
                              className="w-full bg-white dark:bg-[#07111c] border border-slate-200 dark:border-white/10 rounded-xl py-2.5 pr-9 pl-3 text-xs font-bold text-slate-900 dark:text-white outline-none focus:border-[#00C896] cursor-pointer"
                            >
                              <option value="القاهرة والجيزة">القاهرة وسوق العبور المركزي</option>
                              <option value="الإسكندرية">الإسكندرية وسوق العامرية</option>
                              <option value="بني سويف">سوق بني سويف المركزي</option>
                              <option value="الشرقية">الشرقية وأسواق الدلتا</option>
                              <option value="السويس وبورسعيد">مدن القناة والموانئ</option>
                              <option value="أسيوط وسوهاج">محافظات الصعيد</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Interactive Distance Slider with Mileage Quick Presets */}
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0d1b2a] border border-slate-200/80 dark:border-white/5 space-y-3.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                          <Activity className="w-4 h-4 text-[#38BDF8]" />
                          <span>المسافة التقديرية لخط السير:</span>
                        </span>
                        <span className="font-mono text-base font-black text-[#38BDF8] bg-sky-500/10 px-3 py-1 rounded-xl border border-sky-500/20">
                          {calcDistance} كم
                        </span>
                      </div>

                      {/* Mileage Slider */}
                      <input
                        type="range"
                        min="20"
                        max="600"
                        step="10"
                        value={calcDistance}
                        onChange={(e) => setCalcDistance(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                      />

                      {/* Quick Distance Presets */}
                      <div className="flex items-center justify-between gap-1 pt-1">
                        {[50, 100, 160, 250, 400, 600].map((km) => (
                          <button
                            key={km}
                            type="button"
                            onClick={() => setCalcDistance(km)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition cursor-pointer ${
                              calcDistance === km
                                ? 'bg-[#1597D4] text-white shadow-sm font-black'
                                : 'bg-white dark:bg-[#07111c] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-[#38BDF8]'
                            }`}
                          >
                            {km} كم
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Service Level / Tier Cards */}
                    <div className="space-y-2">
                      <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                        اختر مستوى الخدمة والضمان المطلوب:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          {
                            id: 'TRANSPORT_ONLY',
                            title: 'نقل قياسي',
                            sub: 'شاحنة معتمدة وتتبع GPS',
                            fee: 'السعر الأساسي',
                            icon: Truck,
                          },
                          {
                            id: 'TRANSPORT_PAY',
                            title: 'نقل + ضمان دفع',
                            sub: 'تسليم بضمان مالي للمدفوعات',
                            fee: '+10% فقط',
                            icon: ShieldCheck,
                          },
                          {
                            id: 'TRANSPORT_PAY_INSPECT',
                            title: 'نقل + فحص بيطري',
                            sub: 'فحص صحي للمواشي والمحاصيل',
                            fee: '+20% شامل',
                            icon: Sparkles,
                          },
                        ].map((t) => {
                          const Icon = t.icon;
                          const isSelected = calcTier === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setCalcTier(t.id as any)}
                              className={`p-3.5 rounded-2xl text-right border transition cursor-pointer flex flex-col justify-between gap-2 group ${
                                isSelected
                                  ? 'bg-sky-500/15 border-[#38BDF8] text-[#38BDF8] shadow-md shadow-sky-500/10'
                                  : 'bg-slate-50 dark:bg-[#0d1b2a] border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:border-[#38BDF8]/40'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-black text-xs text-slate-900 dark:text-white">
                                  {t.title}
                                </span>
                                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#38BDF8]' : 'text-slate-400'}`} />
                              </div>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-[1.4]">
                                {t.sub}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md self-start ${isSelected ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'bg-slate-200/60 dark:bg-white/5 text-slate-500'}`}>
                                {t.fee}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* LEFT COLUMN: Digital Transport Ticket & Live Fare Card (5 cols on lg) */}
                  <div className="lg:col-span-5">
                    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0b1b2b] via-[#091522] to-[#060e17] text-white border border-[#38BDF8]/30 shadow-2xl shadow-sky-950/40 space-y-6 relative overflow-hidden">
                      
                      {/* Ticket Top Strip */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] font-mono text-[#38BDF8] font-bold tracking-wider block">
                            LOGISTICS TICKET SUMMARY
                          </span>
                          <strong className="text-sm font-black text-white">
                            ملخص التكلفة وخطة الشحن
                          </strong>
                        </div>
                        <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-[#38BDF8] flex items-center justify-center border border-sky-500/30">
                          <Truck className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Route Summary Points */}
                      <div className="space-y-3 text-xs">
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">خط السير المختار:</span>
                          <span className="font-extrabold text-white flex items-center gap-1.5">
                            <span>{calcPickupGov}</span>
                            <ArrowLeft className="w-3.5 h-3.5 text-[#38BDF8]" />
                            <span>{calcDestGov}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">المسافة المحسوبة:</span>
                          <span className="font-mono font-black text-[#38BDF8]">{calcDistance} كم</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">سعر الكيلو التقديري:</span>
                          <span className="font-mono text-slate-300">12 ج.م / كم</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">مستوى الخدمة والضمان:</span>
                          <span className="font-bold text-emerald-400">
                            {calcTier === 'TRANSPORT_PAY_INSPECT' ? 'فحص بيطري وتأمين شامل' : calcTier === 'TRANSPORT_PAY' ? 'ضمان دفع ومتابعة' : 'نقل قياسي أساسي'}
                          </span>
                        </div>
                      </div>

                      {/* Grand Estimated Price Box */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/20 via-[#1597D4]/15 to-emerald-500/15 border border-[#38BDF8]/40 space-y-1 text-center">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          إجمالي التكلفة الإرشادية المقدرة للرحلة:
                        </span>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight text-glow">
                            {estimatedCost.toLocaleString()}
                          </span>
                          <span className="text-sm font-almarai font-black text-[#38BDF8]">
                            ج.م تقريباً
                          </span>
                        </div>
                      </div>

                      {/* Primary Order Action Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setRequestFormData({
                            ...requestFormData,
                            pickupGov: calcPickupGov,
                            destGov: calcDestGov,
                            distanceKm: String(calcDistance),
                            tier: calcTier,
                          });
                          setShowRequestModal(true);
                        }}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1597D4] via-[#38BDF8] to-[#00C896] hover:opacity-95 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-sky-500/25 hover:scale-102 transition cursor-pointer"
                      >
                        <span>تأكيد هذا السير وطلب الشاحنة الآن</span>
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      {/* Assurance Badges Footer */}
                      <div className="pt-1 flex items-center justify-center gap-4 text-[10px] text-slate-400 font-bold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00C896]" />
                          بدون أي عمولات خفية
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-[#38BDF8]" />
                          تواصل واتفاق مباشر
                        </span>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </BorderGlow>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: TRANSPORT KEY STATISTICS */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              count: '+500',
              label: 'رحلة نقل مكتملة',
              sub: 'مواشي، محاصيل ومعدات',
              icon: CheckCircle2,
              color: '#38BDF8',
            },
            {
              count: '+100',
              label: 'سائق موثق ومعتمد',
              sub: 'بفحص أمني وتراخيص سارية',
              icon: BadgeCheck,
              color: '#00C896',
            },
            {
              count: '27',
              label: 'محافظة مشمولة بالكامل',
              sub: 'ربط مباشر بين المزارع والأسواق',
              icon: MapPin,
              color: '#8b5cf6',
            },
            {
              count: '24/7',
              label: 'خدمة وتتبع لوجستي',
              sub: 'دعم فني مباشر أثناء الرحلة',
              icon: Clock,
              color: '#f59e0b',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] shadow-sm text-right space-y-2 hover:border-[#38BDF8]/40 transition group"
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
      {/* SECTION 3: SMART TRANSPORT WORKFLOW (4 CONNECTED STEPS) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-sky-500/10 text-[#38BDF8] text-xs font-black border border-sky-500/20">
            خطوات العمل الذكية
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            كيف تعمل منظومة النقل الزراعي الذكي؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            4 خطوات ميسرة لنقل شحنتك الزراعية بأقصى درجات الأمان والسرعة.
          </p>
        </div>

        {/* 4 Connected Cards Grid with Animated Pulse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {[
            {
              step: '01',
              title: 'أدخل تفاصيل الشحنة',
              desc: 'حدد نوع المنقولات (مواشي، محاصيل، أعلاف أو معدات) والوزن التقديري.',
              icon: Package,
            },
            {
              step: '02',
              title: 'حدد الموقع والوجهة',
              desc: 'اختر موقع المزرعة أو الحقل بدقة ونقطة التسليم في السوق أو التاجر.',
              icon: MapPin,
            },
            {
              step: '03',
              title: 'اختر الناقل المناسب',
              desc: 'قارن بين العروض المتاحة، سعة الشاحنة، التقييم، وتكلفة الرحلة.',
              icon: Truck,
            },
            {
              step: '04',
              title: 'تتبع عملية النقل',
              desc: 'متابعة حية لخط السير حتى وصول الشحنة بسلام وتأكيد استلام الطرفين.',
              icon: Navigation,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] space-y-4 text-right hover:border-[#38BDF8] transition shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-[#38BDF8] flex items-center justify-center font-black">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-300 dark:text-[#183149]">
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
      {/* SECTION 4: TRANSPORT MARKETPLACE (OFFERS & AVAILABLE DRIVERS) */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Marketplace Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-[#172c40] pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                سوق سيارات النقل المتاحة الآن
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#1597D4]/15 text-[#38BDF8] text-xs font-mono font-bold">
                {filteredOffers.length} شاحنة
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
              تواصل مباشرة مع أصحاب السيارات الموثقة لنقل شحنتك اليومية
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowRegisterModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md self-start md:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ إضافة عرض نقل لمركبتك</span>
          </button>
        </div>

        {/* FilterBar & Search Bar */}
        <div className="p-5 rounded-[24px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] shadow-sm space-y-4 text-right">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بنوع الشاحنة، المحافظة، أو اسم السائق..."
                className="w-full bg-slate-50 dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 pr-10 pl-4 text-xs font-bold outline-none focus:border-[#38BDF8]"
              />
            </div>

            {/* Vehicle Type Filter */}
            <div className="md:col-span-4">
              <select
                value={selectedVehicleType}
                onChange={(e) => setSelectedVehicleType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="ALL">جميع أنواع المركبات</option>
                <option value="جامبو">شاحنات جامبو (مواشي / محاصيل)</option>
                <option value="تريلا">تريلا ومقطورات ثقيلة (20+ طن)</option>
                <option value="نصف نقل">ربع ونصف نقل خفيف وسريع</option>
                <option value="تبريد">شاحنات مبردة للمنتجات الحساسة</option>
                <option value="جرار">لوادر ونواقل معدات زراعية</option>
              </select>
            </div>

            {/* Origin Governorate Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedOriginGov}
                onChange={(e) => setSelectedOriginGov(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-2xl py-2.5 px-3 text-xs font-bold outline-none cursor-pointer"
              >
                <option value="ALL">كافة المحافظات</option>
                <option value="بني سويف">بني سويف</option>
                <option value="القاهرة">القاهرة والجيزة</option>
                <option value="المنيا">المنيا</option>
                <option value="الفيوم">الفيوم</option>
                <option value="البحيرة">البحيرة</option>
                <option value="الشرقية">الشرقية</option>
                <option value="الدقهلية">الدقهلية</option>
                <option value="الإسكندرية">الإسكندرية</option>
              </select>
            </div>

          </div>

        </div>

        {/* Offers Cards Grid */}
        {loadingOffers ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#38BDF8] animate-spin mx-auto" />
            <span className="text-xs text-slate-500 font-bold block">جاري تحميل عروض سيارات النقل...</span>
          </div>
        ) : filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-6 rounded-[28px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] shadow-sm hover:border-[#38BDF8] transition space-y-5 text-right flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Badge & Vehicle Type */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-[#38BDF8] text-[11px] font-black border border-sky-500/20 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      {offer.vehicleType}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-[#00C896] text-[10px] font-bold flex items-center gap-1">
                      <BadgeCheck className="w-3 h-3" />
                      سائق معتمد
                    </span>
                  </div>

                  {/* Driver Name & Identity */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1597D4]/20 to-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center font-black text-base border border-sky-500/20">
                      {offer.driver?.name ? offer.driver.name.charAt(0) : 'س'}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white">
                        {offer.driver?.name || 'سائق معتمد بالمنصة'}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-bold block">
                        موقع التمركز: {offer.originGov}
                      </span>
                    </div>
                  </div>

                  {/* Route & Specifications */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0e1d2c] border border-slate-200/60 dark:border-white/5 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">خط السير المعتاد:</span>
                      <span className="text-slate-900 dark:text-white flex items-center gap-1">
                        <span>{offer.originGov}</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{offer.destGov}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">الحمولة القصوى:</span>
                      <span className="font-mono text-[#38BDF8] font-black">{offer.capacityTons} طن</span>
                    </div>

                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-500">موعد التوفر:</span>
                      <span className="text-slate-700 dark:text-slate-300 text-[11px]">{offer.tripDate || 'متاح يومياً'}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDriverForContact(offer)}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] hover:opacity-95 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>طلب الخدمة والتواصل مع السائق</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 sm:p-16 rounded-[32px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-sky-500/10 text-[#38BDF8] flex items-center justify-center mx-auto border border-sky-500/20">
              <Truck className="w-8 h-8" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                لا توجد عروض سيارات مطابقة لبحثك حالياً
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                كن أول من يضيف عرض نقل لمركبته في هذه المحافظة أو قم بتقديم طلب شحن مخصص.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 text-xs font-black shadow-md cursor-pointer"
              >
                + تسجيل مركبة جديدة
              </button>
              <button
                type="button"
                onClick={() => setShowRequestModal(true)}
                className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white text-xs font-black cursor-pointer"
              >
                طلب شاحنة نقل خاصة
              </button>
            </div>
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: SPECIALIZED AGRICULTURAL TRANSPORT TYPES */}
      {/* ========================================================================= */}
      <section className="py-12 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-[#1597D4]/10 text-[#38BDF8] text-xs font-black">
            تجهيزات متخصصة
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            أنواع النقل الزراعي المعتمدة
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            شاحنات وسيارات مجهزة هندسياً للحفاظ على سلامة المواشي والمحاصيل الحساسة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'نقل المواشي والإنتاج الحيواني',
              icon: Beef,
              color: '#38BDF8',
              desc: 'شاحنات مجهزة بتهوية مستمرة، أرضيات مطاطية مانعة للانزلاق، وحواجز عزل لحماية الأبقار والأغنام.',
            },
            {
              title: 'نقل المحاصيل والحبوب والخضار',
              icon: Wheat,
              color: '#00C896',
              desc: 'صناديق نقل محكمة لحماية الخضروات والفواكه من حرارة الشمس والرطوبة لضمان وصولها طازجة للأسواق.',
            },
            {
              title: 'نقل المستلزمات والأسمدة',
              icon: Package,
              color: '#8b5cf6',
              desc: 'شاحنات نقل مغلقة لحماية أجولة الأعلاف والأسمدة والتقاوي من العوامل الجوية والأمطار.',
            },
            {
              title: 'المعدات والجرارات الزراعية',
              icon: Wrench,
              color: '#f59e0b',
              desc: 'لوادر ونواقل هيدروليكية مخصصة لنقل الجرارات، العزاقات، وطلمبات الري الثقيلة بين المزارع.',
            },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-white dark:bg-[#09131d] border border-slate-200/80 dark:border-[#172c40] space-y-4 text-right hover:border-[#38BDF8]/50 transition shadow-sm"
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
      {/* SECTION 6: REGISTER VEHICLE CTA BANNER */}
      {/* ========================================================================= */}
      <section className="py-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <BorderGlow
          edgeSensitivity={30}
          borderRadius={32}
          glowRadius={45}
          glowIntensity={1.2}
          coneSpread={25}
          animated={false}
          colors={['#1597D4', '#38BDF8', '#00C896']}
          className="shadow-xl shadow-sky-500/10"
        >
          <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-r from-[#091522] via-[#0b1c2e] to-[#08121d] text-white space-y-6 text-right relative overflow-hidden border border-white/5">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3.5 py-1 rounded-full bg-sky-500/15 text-[#38BDF8] text-xs font-black border border-sky-500/20">
                  انضم لأسطول النقل والخدمات اللوجستية
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white leading-[1.45]">
                  هل تمتلك مركبة نقل أو أسطولاً مبرداً؟
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-[1.8]">
                  انضم إلى شبكة النقل الزراعي الذكي وسلاسل التبريد واحصل على فرص نقل يومية بعائد مجزي، وتواصل مباشر مع كبرى المزارع والتجار في مصر.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(true)}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 font-black text-sm shadow-xl shadow-sky-500/20 hover:scale-102 transition cursor-pointer"
                  >
                    سجل مركبتك الآن في الشبكة ➔
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={coldShippingImg}
                    alt="شاحنات مبردة وسلاسل نقل حراري زراعي"
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 p-3 rounded-2xl bg-[#09131d]/90 backdrop-blur-md border border-white/10 space-y-1">
                    <strong className="block text-white text-xs font-black">شاحنات مبردة وسلاسل تبريد زراعية</strong>
                    <span className="text-[10px] text-sky-300 block leading-[1.4]">حماية المنتجات الحساسة والتحكم الدقيق في درجات الحرارة</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </BorderGlow>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: LEGAL NOTICE & SECURITY GUARANTEE */}
      {/* ========================================================================= */}
      <section className="py-6 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-[28px] bg-rose-500/10 border-2 border-rose-500/30 text-right space-y-2 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-[#be1622] dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="text-sm font-black text-[#be1622] dark:text-rose-400">
                إشعار وإطار قانوني وتنظيمي هام (Legal Notice)
              </h4>
              <p className="font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                المنصة توفر الربط والتنظيم التكنولوجي المباشر بين الأطراف، ويتم الاتفاق على تفاصيل السعر وموعد وتأمين الخدمة مباشرة بين المستخدمين لضمان الشفافية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL 1: REQUEST TRANSPORTATION MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showRequestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#09131d] border border-slate-200 dark:border-[#172c40] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setShowRequestModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#38BDF8]" />
                  طلب شاحنة نقل زراعي ذكي
                </h3>
                <p className="text-xs text-slate-500">أدخل تفاصيل الحمولة ومواقع التحميل والتسليم.</p>
              </div>

              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">مكان التحميل (المحافظة) *</label>
                    <input
                      type="text"
                      required
                      value={requestFormData.pickupGov}
                      onChange={(e) => setRequestFormData({ ...requestFormData, pickupGov: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">مكان التسليم (الوجهة) *</label>
                    <input
                      type="text"
                      required
                      value={requestFormData.destGov}
                      onChange={(e) => setRequestFormData({ ...requestFormData, destGov: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">نوع المنقولات *</label>
                    <select
                      value={requestFormData.cargoType}
                      onChange={(e) => setRequestFormData({ ...requestFormData, cargoType: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none cursor-pointer"
                    >
                      <option value="محاصيل وخضروات طازجة">محاصيل وخضروات طازجة</option>
                      <option value="مواشي وإنتاج حيواني">مواشي وإنتاج حيواني</option>
                      <option value="أعلاف وأسمدة وتقاوي">أعلاف وأسمدة وتقاوي</option>
                      <option value="معدات وآلات زراعية">معدات وآلات زراعية</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">الوزن التقديري (بالطن) *</label>
                    <input
                      type="number"
                      required
                      value={requestFormData.cargoWeightTons}
                      onChange={(e) => setRequestFormData({ ...requestFormData, cargoWeightTons: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">ملاحظات إضافية أو متطلبات خاصة</label>
                  <textarea
                    rows={2}
                    placeholder="مثال: مطلوب شاحنة ذات تهوية خاصة، مواعيد الاستلام فجراً..."
                    value={requestFormData.notes}
                    onChange={(e) => setRequestFormData({ ...requestFormData, notes: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-normal outline-none resize-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 font-black text-xs shadow-md"
                  >
                    تأكيد وإرسال الطلب
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 2: REGISTER VEHICLE / OFFER TRIP MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#09131d] border border-slate-200 dark:border-[#172c40] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#38BDF8]" />
                  تسجيل مركبة وعرض نقل جديد
                </h3>
                <p className="text-xs text-slate-500">أضف سيارتك لشبكة النقل لاستقبال طلبات المزارعين والتجار.</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">نوع المركبة وتجهيزاتها *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: جامبو نقل مواشي مجهزة، تريلا جوانب..."
                    value={vehicleFormData.vehicleType}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleType: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">نقطة التمركز (المحافظة) *</label>
                    <input
                      type="text"
                      required
                      value={vehicleFormData.originGov}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, originGov: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">نطاق التوصيل *</label>
                    <input
                      type="text"
                      required
                      value={vehicleFormData.destGov}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, destGov: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">الحمولة القصوى (بالطن) *</label>
                    <input
                      type="number"
                      required
                      value={vehicleFormData.capacityTons}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, capacityTons: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-800 dark:text-slate-200 block">رقم هاتف التواصل *</label>
                    <input
                      type="tel"
                      required
                      value={vehicleFormData.contactPhone}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, contactPhone: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none font-mono text-left"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-800 dark:text-slate-200 block">موعد وتكرار التوفر</label>
                  <input
                    type="text"
                    value={vehicleFormData.tripDate}
                    onChange={(e) => setVehicleFormData({ ...vehicleFormData, tripDate: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#0e1d2c] border border-slate-200 dark:border-white/10 rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 font-black text-xs shadow-md"
                  >
                    تأكيد وحفظ المركبة
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL 3: DRIVER CONTACT & BOOKING MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedDriverForContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-white dark:bg-[#09131d] border border-slate-200 dark:border-[#172c40] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                type="button"
                onClick={() => setSelectedDriverForContact(null)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-sky-500/15 text-[#38BDF8] flex items-center justify-center mx-auto text-2xl font-black border border-sky-500/20">
                  {selectedDriverForContact.driver?.name ? selectedDriverForContact.driver.name.charAt(0) : '🚚'}
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {selectedDriverForContact.driver?.name || 'سائق معتمد'}
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-[#00C896] text-xs font-bold inline-flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  مركبة موثقة بهوية وتراخيص معتمدة
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0e1d2c] border border-slate-200/60 dark:border-white/5 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">نوع المركبة:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedDriverForContact.vehicleType}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">الحمولة:</span>
                  <strong className="font-mono text-[#38BDF8]">{selectedDriverForContact.capacityTons} طن</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">خط السير:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedDriverForContact.originGov} ➔ {selectedDriverForContact.destGov}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <a
                  href={`tel:${selectedDriverForContact.contactPhone || selectedDriverForContact.driver?.phone}`}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#1597D4] to-[#38BDF8] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-102 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال هاتفي مباشر: {selectedDriverForContact.contactPhone || selectedDriverForContact.driver?.phone || '01099856661'}</span>
                </a>

                <a
                  href={`https://wa.me/2${(selectedDriverForContact.contactPhone || selectedDriverForContact.driver?.phone || '01099856661').replace(/^0/, '')}`}
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
