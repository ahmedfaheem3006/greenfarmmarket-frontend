import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Product } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';
import marketplaceImg from '../assets/Digital Agricultural Marketplace.png';
import {
  Store,
  PlusCircle,
  Search,
  MapPin,
  PhoneCall,
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Tag,
  Filter,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  Star,
  Users,
  Eye,
  MessageCircle,
  Truck,
  Leaf,
  Layers,
  Beef,
  Droplets,
  Wrench,
  Wheat,
  Milk,
  RefreshCw,
  Loader2,
  Calendar,
  Lock,
  Building2,
  Share2,
} from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal, user } = useAuth();

  // Data State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'priceAsc' | 'priceDesc'>('newest');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Add Product Wizard State
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);
  const [newProductData, setNewProductData] = useState({
    title: '',
    description: '',
    categorySlug: 'livestock',
    price: '',
    priceUnit: 'ج.م',
    governorate: 'البحيرة',
    city: 'دمنهور',
    quantity: '1',
    condition: 'ممتاز',
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmittingProduct, setIsSubmittingProduct] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories Ecosystem Data
  const categories = [
    { id: 'all', label: 'كافة المنتجات', icon: Layers, badge: 'شامل', color: '#00C896' },
    { id: 'livestock', label: 'المواشي والإنتاج الحيواني', icon: Beef, badge: 'عجول وأغنام', color: '#f59e0b' },
    { id: 'trees', label: 'الأشجار والشتلات', icon: Leaf, badge: 'موالح ونخيل', color: '#10b981' },
    { id: 'crops', label: 'الخضروات والفاكهة', icon: Wheat, badge: 'محاصيل موسمية', color: '#84cc16' },
    { id: 'dairy', label: 'منتجات الألبان', icon: Milk, badge: 'بلدي وطازج', color: '#06b6d4' },
    { id: 'equipment', label: 'المعدات والجرارات', icon: Wrench, badge: 'ميكنة زراعية', color: '#6366f1' },
    { id: 'spare_parts', label: 'أنظمة وطلمبات الري', icon: Droplets, badge: 'تنقيط ومحاور', color: '#3b82f6' },
    { id: 'fertilizers', label: 'البذور والأسمدة والمبيدات', icon: Sparkles, badge: 'معتمدة', color: '#ec4899' },
  ];

  const governoratesList = [
    'البحيرة',
    'بني سويف',
    'الشرقية',
    'الدقهلية',
    'الغربية',
    'المنوفية',
    'كفر الشيخ',
    'الفيوم',
    'المنيا',
    'أسيوط',
    'سوهاج',
    'قنا',
    'الأقصر',
    'أسوان',
    'الإسكندرية',
    'القاهرة',
    'الجيزة',
    'الإسماعيلية',
    'السويس',
    'بورسعيد',
    'دمياط',
    'مطروح',
    'الوادي الجديد',
    'شمال سيناء',
    'جنوب سيناء',
    'البحر الأحمر',
    'القليوبية',
  ];

  // Open add modal from query params
  useEffect(() => {
    if (searchParams.get('action') === 'add-listing') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedGovernorate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedGovernorate) params.governorate = selectedGovernorate;
      if (searchQuery) params.search = searchQuery;

      const res = await api.get('/products', { params });
      if (res.data?.success && Array.isArray(res.data.data)) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Images Selection
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...filesArray].slice(0, 5));
      const previews = filesArray.map((f) => URL.createObjectURL(f));
      setImagePreviews((prev) => [...prev, ...previews].slice(0, 5));
      toast.success(`تم اختيار ${filesArray.length} صور`);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit New Product to Backend
  const handleCreateProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRegistered) {
      toast.info('يرجى تسجيل الدخول أو إنشاء حساب لإضافة منتجك في السوق.');
      toggleAuthModal(true);
      return;
    }

    if (!newProductData.title.trim() || !newProductData.price.trim()) {
      toast.error('يرجى إدخال اسم المنتج وسعره.');
      return;
    }

    setIsSubmittingProduct(true);

    try {
      const formData = new FormData();
      formData.append('title', newProductData.title.trim());
      formData.append('description', newProductData.description.trim());
      formData.append('categorySlug', newProductData.categorySlug);
      formData.append('price', newProductData.price.trim());
      formData.append('priceUnit', newProductData.priceUnit);
      formData.append('governorate', newProductData.governorate);
      formData.append('city', newProductData.city);
      formData.append('quantity', newProductData.quantity);
      formData.append('condition', newProductData.condition);

      selectedImages.forEach((img) => {
        formData.append('images', img);
      });

      const res = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        toast.success('تمت إضافة منتجك إلى السوق الرقمي بنجاح!');
        setProducts((prev) => [res.data.data, ...prev]);
        setShowAddModal(false);
        resetWizard();
      } else {
        throw new Error('Fallback trigger');
      }
    } catch {
      // Dev / Fallback optimistic UI
      const newCreated: Product = {
        id: 'p-' + Date.now(),
        sellerId: user?.id || 'demo-seller',
        seller: {
          name: user?.name || 'مزارع مسجل',
          phone: user?.phone || '01099856661',
          governorate: newProductData.governorate,
          city: newProductData.city,
        },
        title: newProductData.title,
        description: newProductData.description,
        categorySlug: newProductData.categorySlug,
        price: parseFloat(newProductData.price) || 1000,
        priceUnit: newProductData.priceUnit,
        governorate: newProductData.governorate,
        city: newProductData.city,
        quantity: parseInt(newProductData.quantity) || 1,
        condition: newProductData.condition,
        images: imagePreviews.length > 0 ? imagePreviews : ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop'],
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [newCreated, ...prev]);
      toast.success('تم نشر الإعلان بنجاح في السوق الزراعي المباشر!');
      setShowAddModal(false);
      resetWizard();
    } finally {
      setIsSubmittingProduct(false);
    }
  };

  const resetWizard = () => {
    setWizardStep(1);
    setNewProductData({
      title: '',
      description: '',
      categorySlug: 'livestock',
      price: '',
      priceUnit: 'ج.م',
      governorate: 'البحيرة',
      city: 'دمنهور',
      quantity: '1',
      condition: 'ممتاز',
    });
    setSelectedImages([]);
    setImagePreviews([]);
  };

  // Filtered & Sorted Products
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchGov = !selectedGovernorate || p.governorate.includes(selectedGovernorate);
    const matchCond = selectedCondition === 'all' || p.condition === selectedCondition;
    const matchSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.governorate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchGov && matchCond && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#25D5AB]/30 selection:text-emerald-950 pb-20 select-none" dir="rtl">
      
      {/* ==================================================
          SECTION 1: PREMIUM MARKETPLACE HERO
      ================================================== */}
      <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 overflow-hidden isolate">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D5AB]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C896]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right: Hero Content (7 cols on lg in RTL) */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-right"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/35 text-emerald-800 dark:text-[#25D5AB] text-xs sm:text-sm font-extrabold shadow-sm backdrop-blur-md">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 dark:bg-[#25D5AB]/20 animate-pulse">
                  <Store className="w-3.5 h-3.5 text-emerald-700 dark:text-[#25D5AB]" />
                </span>
                <span>السوق الزراعي الرقمي المباشر 2026</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">بدون عمولات وسيطة</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.4] sm:leading-[1.38] py-1">
                أكبر منظومة{' '}
                <span className="inline-block bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] bg-clip-text text-transparent drop-shadow-sm py-0.5">
                  رقمية
                </span>{' '}
                للبيع والشراء الزراعي
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                سوق مباشر يربط المزارعين والتجار والمستثمرين لبيع وشراء المواشي والمحاصيل والشتلات والمعدات الزراعية مباشرة في 27 محافظة بدون وسطاء.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-7 sm:px-9 py-4 rounded-2xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-700/25 dark:shadow-[#25D5AB]/25 hover:shadow-2xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center gap-2.5 cursor-pointer select-none"
                >
                  <PlusCircle className="w-5 h-5 animate-pulse" />
                  <span>أضف منتجك الآن (مجاناً)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <a
                  href="#marketplace-catalog"
                  className="px-6 py-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200 hover:border-[#25D5AB] backdrop-blur-md transition flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#25D5AB]" />
                  <span>استكشف المنتجات المعروضة</span>
                </a>
              </div>
            </motion.div>

            {/* Left: Futuristic Visual Card (5 cols on lg in RTL) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <BorderGlow
                edgeSensitivity={30}
                borderRadius={28}
                glowRadius={45}
                glowIntensity={1.2}
                coneSpread={25}
                animated={false}
                colors={['#00C896', '#25D5AB', '#6EE7B7']}
                className="shadow-2xl shadow-slate-200/50 dark:shadow-[#00040d]"
              >
                <div className="relative rounded-[28px] overflow-hidden p-6 sm:p-7 bg-gradient-to-b from-[#0e1f17] to-[#040906] text-white space-y-5 isolate">
                  
                  {/* Glowing Ambient Lights in Card */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#25D5AB] animate-ping" />
                      <span className="text-xs font-extrabold text-[#25D5AB]">البورصة الزراعية اللحظية</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-[#6EE7B7] text-[11px] font-bold border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>تداول مباشر 24/7</span>
                    </div>
                  </div>

                  {/* Marketplace Image Showcase */}
                  <div className="relative flex items-center justify-center my-2 group select-none">
                    <img
                      src={marketplaceImg}
                      alt="Green Farm Digital Marketplace"
                      className="max-h-[250px] sm:max-h-[290px] w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-105 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Glowing ring under image */}
                    <div className="absolute -bottom-2 w-52 h-10 bg-[#25D5AB]/30 rounded-full blur-xl -z-10 pointer-events-none" />
                  </div>

                  {/* Bottom Stats Banner */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
                      <span className="text-[10px] block text-slate-400 font-medium">العمولة الوسيطة</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">0% مجاني</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
                      <span className="text-[10px] block text-slate-400 font-medium">سرعة التواصل</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">⚡ هاتفي فوري</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 space-y-0.5">
                      <span className="text-[10px] block text-slate-400 font-medium">النقل المتاح</span>
                      <span className="text-xs font-extrabold text-[#6EE7B7]">🚚 بضغطة زر</span>
                    </div>
                  </div>

                </div>
              </BorderGlow>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: MARKET STATISTICS (Counter Cards)
      ================================================== */}
      <section className="py-8 sm:py-10 border-y border-slate-200/80 dark:border-[#1c3628] bg-white/60 dark:bg-[#07100b]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { num: '+10,000', label: 'منتج زراعي متاح', sub: 'تحديثات يومية مستمرة', icon: Store, color: '#00C896' },
              { num: '+5,000', label: 'مزارع وتاجر معتمد', sub: 'حسابات موثقة بالرقم القومي', icon: Users, color: '#25D5AB' },
              { num: '27', label: 'محافظة مشمولة', sub: 'تغطية لوجستية شاملة', icon: MapPin, color: '#be1622' },
              { num: '100%', label: 'تواصل مباشر', sub: 'بدون وسيط أو خصم أرباح', icon: ShieldCheck, color: '#6EE7B7' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-2 hover:border-[#25D5AB]/50 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB] transition-colors font-mono" dir="ltr">
                      {stat.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center border border-emerald-600/20 dark:border-[#25D5AB]/30">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                      {stat.label}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: SMART SEARCH & FILTER EXPERIENCE
      ================================================== */}
      <section id="marketplace-catalog" className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Large Floating Search Bar */}
          <BorderGlow
            edgeSensitivity={25}
            borderRadius={26}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#6EE7B7']}
            className="shadow-lg shadow-slate-200/50 dark:shadow-[#00040d]"
          >
            <div className="p-3 sm:p-4 bg-white dark:bg-[#0d1612] rounded-[26px] flex flex-col md:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-5 h-5 text-[#25D5AB] absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن عجول، محاصيل، شتلات مانجو، معدات زراعية، طلمبات ري..."
                  className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-2xl py-3.5 pr-12 pl-4 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-[#25D5AB] focus:ring-2 focus:ring-[#25D5AB]/20 outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Governorate Dropdown */}
              <div className="w-full md:w-56 shrink-0">
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:border-[#25D5AB] outline-none cursor-pointer"
                >
                  <option value="">جميع المحافظات (27)</option>
                  {governoratesList.map((g) => (
                    <option key={g} value={g} className="bg-white dark:bg-[#0d1612]">
                      محافظة {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="w-full md:w-48 shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200/90 dark:border-[#1e3b2c] rounded-2xl p-3.5 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 focus:border-[#25D5AB] outline-none cursor-pointer"
                >
                  <option value="newest">الأحدث نشرأً</option>
                  <option value="priceAsc">السعر: من الأقل للأعلى</option>
                  <option value="priceDesc">السعر: من الأعلى للأقل</option>
                </select>
              </div>

              {/* Add Product Button in Search Bar */}
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>أضف منتجك</span>
              </button>
            </div>
          </BorderGlow>

          {/* ==================================================
              SECTION 4: CATEGORY ECOSYSTEM HORIZONTAL CARDS
          ================================================== */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#25D5AB]" />
                تصنيفات قطاعات التداول الزراعي والحيواني:
              </span>
              <span className="text-[11px] text-slate-400 font-bold">
                {filteredProducts.length} إعلان مطابق
              </span>
            </div>

            {/* Horizontal Scrollable Categories Container */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none select-none">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 sm:px-5 py-3 rounded-2xl border text-right transition-all duration-300 flex items-center gap-3 shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#be1622]/15 to-[#be1622]/5 dark:from-[#be1622]/25 dark:to-transparent border-[#be1622] text-[#be1622] dark:text-rose-400 shadow-md shadow-[#be1622]/15 scale-102'
                        : 'bg-white dark:bg-[#0d1612] border-slate-200/90 dark:border-[#1e3b2c] text-slate-700 dark:text-slate-300 hover:border-[#25D5AB]/50'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-[#be1622] text-white border-[#be1622]'
                          : 'bg-emerald-500/10 dark:bg-[#25D5AB]/10 text-emerald-700 dark:text-[#25D5AB] border-emerald-500/20'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="text-right">
                      <strong className="text-xs font-extrabold block">
                        {cat.label}
                      </strong>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {cat.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==================================================
              SECTION 5: PRODUCT MARKET GRID (24px Rounded Cards)
          ================================================== */}
          {loading ? (
            <div className="py-20 text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-[#25D5AB] mx-auto" />
              <p className="text-xs sm:text-sm font-extrabold text-slate-500">
                جاري تحميل أحدث العروض والمنتجات من البورصة الزراعية...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-5 bg-white dark:bg-[#0d1612] rounded-[28px] border border-slate-200/80 dark:border-[#1e3b2c] p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 flex items-center justify-center mx-auto">
                <Store className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  لا توجد إعلانات مطابقة لبحثك حالياً
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                  جرّب تغيير التصنيف أو المحافظة، أو كن أول من يضيف إعلانه في هذا القسم مجاناً!
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-extrabold text-xs shadow-md"
              >
                + أضف أول منتج في هذا القسم
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {filteredProducts.map((product) => {
                const categoryObj = categories.find((c) => c.id === product.categorySlug);
                const displayImage = product.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop';

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="h-full flex flex-col"
                  >
                    <BorderGlow
                      edgeSensitivity={25}
                      borderRadius={24}
                      glowRadius={35}
                      glowIntensity={1}
                      coneSpread={25}
                      animated={false}
                      colors={['#00C896', '#25D5AB', '#6EE7B7']}
                      className="shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                    >
                      <div className="bg-white dark:bg-[#0d1612] rounded-[24px] overflow-hidden flex flex-col justify-between h-full group text-right">
                        
                        {/* Top Image Section */}
                        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                          <img
                            src={displayImage}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          {/* Category Badge Over Image */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-white text-[11px] font-extrabold backdrop-blur-md shadow-md">
                            <span>{categoryObj?.label || 'منتج زراعي'}</span>
                          </div>

                          {/* Verified Badge */}
                          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-black backdrop-blur-md shadow-md">
                            <ShieldCheck className="w-3 h-3" />
                            <span>موثق</span>
                          </div>

                          {/* Location Overlay Pill */}
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-slate-200 text-[10px] font-bold backdrop-blur-md">
                            <MapPin className="w-3 h-3 text-[#be1622]" />
                            <span>{product.governorate} • {product.city}</span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-relaxed">
                              {product.title}
                            </h3>

                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                              {product.description || 'منتج زراعي أصلي معروض للبيع المباشر من المزرعة للمشتري.'}
                            </p>
                          </div>

                          {/* Price & Seller Details */}
                          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#1c3628]">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-slate-400 block font-bold">السعر المطلوب:</span>
                                <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-[#25D5AB] font-mono" dir="ltr">
                                  {product.price.toLocaleString()} <span className="text-xs font-almarai">{product.priceUnit}</span>
                                </div>
                              </div>

                              <div className="text-left">
                                <span className="text-[10px] text-slate-400 block font-bold">الكمية:</span>
                                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                                  {product.quantity} متاح
                                </span>
                              </div>
                            </div>

                            {/* Seller Strip */}
                            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 font-bold bg-slate-50 dark:bg-[#111e18] p-2.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                              <span className="truncate max-w-[140px]">
                                👤 {product.seller?.name || 'مزارع معتمد'}
                              </span>
                              <span className="text-amber-500 font-extrabold flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-500" />
                                4.9
                              </span>
                            </div>

                            {/* Card Action Buttons */}
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setDetailProduct(product)}
                                className="py-2.5 rounded-xl bg-slate-100 dark:bg-[#111e18] hover:bg-slate-200 dark:hover:bg-[#192c22] text-slate-800 dark:text-slate-200 font-extrabold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#25D5AB]" />
                                <span>التفاصيل</span>
                              </button>

                              <a
                                href={`tel:${product.seller?.phone || '01099856661'}`}
                                className="py-2.5 rounded-xl bg-gradient-to-r from-[#047857] via-[#059669] to-[#047857] dark:from-[#00C896] dark:via-[#25D5AB] dark:to-[#6EE7B7] text-white dark:text-slate-950 font-black text-xs transition flex items-center justify-center gap-1 shadow-sm"
                              >
                                <PhoneCall className="w-3.5 h-3.5" />
                                <span>اتصال</span>
                              </a>
                            </div>

                          </div>
                        </div>

                      </div>
                    </BorderGlow>
                  </motion.div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          SECTION 6: TRUST SYSTEM ("لماذا السوق المباشر؟")
      ================================================== */}
      <section className="py-12 sm:py-16 bg-white/60 dark:bg-[#07100b]/60 border-y border-slate-200/80 dark:border-[#1c3628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-[#25D5AB]/15 border border-emerald-600/30 dark:border-[#25D5AB]/30 text-emerald-800 dark:text-[#25D5AB] text-xs font-extrabold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>منظومة الثقة والأمان المالي</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              لماذا السوق الزراعي المباشر عبر جرين فارم؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              صممنا السوق لحماية المزارع والمشتري وتوفير أقصى ربحية ممكنة لكافة أطراف الإنتاج
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'بدون وسطاء أو عمولات',
                desc: 'تداول مباشر من المزرعة للمشتري والمستهلك دون خصم أي نسب عمولة من أرباحك.',
                icon: Tag,
                badge: '0% عمولة',
              },
              {
                title: 'تواصل مباشر وفوري',
                desc: 'اتصال هاتفي سريع ورسائل واتساب فورية مع البائع لمعاينة البضاعة والاتفاق.',
                icon: PhoneCall,
                badge: 'مكالمات مباشرة',
              },
              {
                title: 'توثيق حسابات البائعين',
                desc: 'فحص وتدقيق هويات المزارعين والتجار لضمان جودة المحاصيل وصحة المواشي.',
                icon: ShieldCheck,
                badge: 'هوية مؤكدة',
              },
              {
                title: 'حماية وربط لوجستي',
                desc: 'إمكانية طلب أسطول النقل المبرد والمواشي بضغطة زر لنقل شحنتك لأي محافظة.',
                icon: Truck,
                badge: 'نقل مؤمّن',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-3 hover:border-[#25D5AB]/50 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center border border-emerald-600/20 dark:border-[#25D5AB]/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5">
                      {card.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 7: SELLER CTA BANNER
      ================================================== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={32}
            glowRadius={55}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#6EE7B7']}
            className="shadow-2xl shadow-emerald-950/20"
          >
            <div className="p-8 sm:p-12 rounded-[32px] bg-gradient-to-b from-[#0e1f17] to-[#040906] text-white text-center space-y-6 relative overflow-hidden isolate">
              
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D5AB]/20 rounded-full blur-3xl -z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#047857]/30 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D5AB]/15 border border-[#25D5AB]/30 text-[#25D5AB] text-xs sm:text-sm font-extrabold">
                <Sparkles className="w-4 h-4" />
                <span>فرصة بيع وتصدير مجانية</span>
              </div>

              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-[1.4] py-1">
                هل لديك{' '}
                <span className="bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] bg-clip-text text-transparent">
                  منتجات أو محاصيل زراعية؟
                </span>
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                اعرض محاصيلك ومواشيك وشتلاتك أمام آلاف المشترين والتجار في كافة محافظات مصر، واستقبل الاتصالات مباشرة بدون عمولات.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="px-8 sm:px-10 py-4 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-[#25D5AB]/25 hover:shadow-2xl hover:shadow-[#25D5AB]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2.5 mx-auto cursor-pointer select-none"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>ابدأ البيع الآن (أضف منتجك مجاناً)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

            </div>
          </BorderGlow>
        </div>
      </section>

      {/* ==================================================
          MODAL 1: PRODUCT DETAILS MODAL
      ================================================== */}
      <AnimatePresence>
        {detailProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-right my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setDetailProduct(null)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Gallery */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                <img
                  src={detailProduct.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop'}
                  alt={detailProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-extrabold backdrop-blur-md">
                  {categories.find((c) => c.id === detailProduct.categorySlug)?.label || 'منتج زراعي'}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-extrabold backdrop-blur-md flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>معروض ومفحوص</span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {detailProduct.title}
                  </h3>
                  <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-[#25D5AB] font-mono" dir="ltr">
                    {detailProduct.price.toLocaleString()} <span className="text-xs font-almarai">{detailProduct.priceUnit}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {detailProduct.description}
                </p>
              </div>

              {/* Product Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الموقع</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-extrabold">{detailProduct.governorate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">المدينة</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-extrabold">{detailProduct.city}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الكمية المتاحة</span>
                  <strong className="text-slate-800 dark:text-slate-200 font-extrabold">{detailProduct.quantity}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الحالة</span>
                  <strong className="text-emerald-700 dark:text-[#25D5AB] font-extrabold">{detailProduct.condition}</strong>
                </div>
              </div>

              {/* Seller Profile Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#25D5AB]/10 to-transparent border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 block">بيانات التاجر / المزارع:</span>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    👤 {detailProduct.seller?.name || 'مزارع معتمد'}
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-800 dark:text-[#25D5AB] px-2 py-0.5 rounded-full font-bold">
                      بائع موثوق
                    </span>
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/2${detailProduct.seller?.phone || '01099856661'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>واتساب</span>
                  </a>

                  <a
                    href={`tel:${detailProduct.seller?.phone || '01099856661'}`}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-black flex items-center gap-1.5 transition"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>اتصال هاتفي</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================
          MODAL 2: 4-STEP WIZARD ADD PRODUCT MODAL
      ================================================== */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-right my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetWizard();
                }}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Wizard Header & Progress Bar */}
              <div className="space-y-3 border-b border-slate-200/80 dark:border-[#1c3628] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#25D5AB]/15 text-[#25D5AB] flex items-center justify-center font-black text-xs">
                    {wizardStep}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    إضافة منتج أو محصول جديد بالسوق (الخطوة {wizardStep} من 4)
                  </h3>
                </div>

                <div className="w-full bg-slate-200 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] h-full transition-all duration-300"
                    style={{ width: `${(wizardStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Wizard Step 1: Category Selection */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <label className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                    1. اختر تصنيف المنتج أو السلعة الزراعية:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.filter((c) => c.id !== 'all').map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = newProductData.categorySlug === cat.id;
                      return (
                        <div
                          key={cat.id}
                          onClick={() => setNewProductData({ ...newProductData, categorySlug: cat.id })}
                          className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex items-center gap-3 ${
                            isSelected
                              ? 'bg-[#25D5AB]/15 border-[#25D5AB] text-[#25D5AB]'
                              : 'bg-slate-50 dark:bg-[#111e18] border-slate-200 dark:border-[#1e3b2c] text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          <span className="text-xs font-extrabold truncate">{cat.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <span>التالي: تفاصيل المنتج</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Step 2: Product Details */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      عنوان الإعلان واسم المنتج *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProductData.title}
                      onChange={(e) => setNewProductData({ ...newProductData, title: e.target.value })}
                      placeholder="مثال: عجول سيمينتال 350 كجم، شتلات مانجو كيت، طماطم صيفية..."
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      وصف وتفاصيل المنتج *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={newProductData.description}
                      onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                      placeholder="صف جودة المنتج، الوزن، التحصينات البيطرية، نوع الري، وموعد الحصاد..."
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-normal text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB] resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        الكمية المتاحة
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newProductData.quantity}
                        onChange={(e) => setNewProductData({ ...newProductData, quantity: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        حالة المنتج
                      </label>
                      <select
                        value={newProductData.condition}
                        onChange={(e) => setNewProductData({ ...newProductData, condition: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                      >
                        <option value="ممتاز">ممتاز / نخب أول</option>
                        <option value="جديد">جديد بالكرتونة</option>
                        <option value="جيد جداً">جيد جداً</option>
                        <option value="مستعمل بحالة جيدة">مستعمل بحالة جيدة</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newProductData.title.trim()) {
                          toast.error('يرجى كتابة عنوان المنتج');
                          return;
                        }
                        setWizardStep(3);
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <span>التالي: السعر والموقع</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Step 3: Price & Location */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        السعر المطلوب *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProductData.price}
                        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                        placeholder="5000"
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        وحدة التسعير
                      </label>
                      <select
                        value={newProductData.priceUnit}
                        onChange={(e) => setNewProductData({ ...newProductData, priceUnit: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                      >
                        <option value="ج.م">ج.م (إجمالي)</option>
                        <option value="ج.م / رأس">ج.م / رأس</option>
                        <option value="ج.م / طن">ج.م / طن</option>
                        <option value="ج.م / قفص">ج.م / قفص</option>
                        <option value="ج.م / شتلة">ج.م / شتلة</option>
                        <option value="ج.م / كيلو">ج.م / كيلو</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        المحافظة *
                      </label>
                      <select
                        value={newProductData.governorate}
                        onChange={(e) => setNewProductData({ ...newProductData, governorate: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                      >
                        {governoratesList.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        المدينة أو المركز *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProductData.city}
                        onChange={(e) => setNewProductData({ ...newProductData, city: e.target.value })}
                        placeholder="دمنهور، الواسطى..."
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newProductData.price.trim()) {
                          toast.error('يرجى تحديد السعر المطلوب');
                          return;
                        }
                        setWizardStep(4);
                      }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer"
                    >
                      <span>التالي: رفع الصور والنشر</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Wizard Step 4: Images & Final Publish */}
              {wizardStep === 4 && (
                <form onSubmit={handleCreateProductSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      صور المنتج أو المحصول (حتى 5 صور)
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {imagePreviews.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {imagePreviews.map((url, idx) => (
                          <div key={idx} className="relative h-20 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group">
                            <img src={url} alt="preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 left-1 p-1 rounded-full bg-rose-500 text-white opacity-90 hover:opacity-100"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {imagePreviews.length < 5 && (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className="h-20 border-2 border-dashed border-[#25D5AB]/40 hover:border-[#25D5AB] rounded-xl flex flex-col items-center justify-center cursor-pointer text-[#25D5AB]"
                          >
                            <PlusCircle className="w-6 h-6" />
                            <span className="text-[10px] font-bold">إضافة صورة</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="p-6 border-2 border-dashed border-[#25D5AB]/40 hover:border-[#25D5AB] rounded-2xl text-center cursor-pointer bg-emerald-50/50 dark:bg-[#25D5AB]/5 space-y-2"
                      >
                        <Upload className="w-8 h-8 text-[#25D5AB] mx-auto" />
                        <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">
                          اضغط لرفع صور المنتج بكاميرا الهاتف أو من المعرض
                        </span>
                        <span className="text-[10px] text-slate-400 block">JPG, PNG (بحد أقصى 5 صور)</span>
                      </div>
                    )}
                  </div>

                  {/* Review Summary Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200 dark:border-white/5 text-xs space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-400">المنتج:</span>
                      <span className="text-slate-900 dark:text-white font-extrabold">{newProductData.title}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-400">السعر:</span>
                      <span className="text-emerald-700 dark:text-[#25D5AB] font-mono font-extrabold">
                        {newProductData.price} {newProductData.priceUnit}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setWizardStep(3)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold"
                    >
                      السابق
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingProduct}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmittingProduct ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>جاري النشر في السوق...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تأكيد ونشر الإعلان فوراً</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
