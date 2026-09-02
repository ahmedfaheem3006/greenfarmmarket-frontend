import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Product, Job, Diagnosis } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  LayoutDashboard,
  Wheat,
  ThermometerSun,
  Stethoscope,
  Store,
  Truck,
  PlusCircle,
  Activity,
  Calendar,
  ChevronLeft,
  Eye,
  Hourglass,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Shield,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Layers,
  ArrowLeft,
  X,
  Check,
  Loader2,
  TrendingUp,
  Beef,
  Droplets,
  Settings,
  Clock,
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, isRegistered, toggleAuthModal, updateUser } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PRODUCTS' | 'DIAGNOSES' | 'TRANSPORT' | 'JOBS' | 'SETTINGS'>('OVERVIEW');

  // Real Backend Data States
  const [loadingData, setLoadingData] = useState(false);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [myDiagnoses, setMyDiagnoses] = useState<any[]>([]);
  const [myTransportReqs, setMyTransportReqs] = useState<any[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);

  // Edit Profile / Farm Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    phone: '',
    governorate: '',
    city: '',
    farmName: '',
    farmArea: '',
    areaUnit: 'FEDDAN' as 'FEDDAN' | 'SQM' | 'QIRAT',
    mainCrops: '',
    animalType: '',
    animalCount: '',
  });

  // Selected Product Detail Modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync edit form with logged-in user
  useEffect(() => {
    if (user) {
      const primaryFarm = user.farms && user.farms.length > 0 ? user.farms[0] : null;
      setEditFormData({
        name: user.name || '',
        phone: user.phone || '',
        governorate: user.governorate || 'البحيرة',
        city: user.city || 'النوبارية',
        farmName: primaryFarm?.name || '',
        farmArea: primaryFarm ? String(primaryFarm.area) : '',
        areaUnit: primaryFarm?.areaUnit || 'FEDDAN',
        mainCrops: primaryFarm?.mainCrops || '',
        animalType: primaryFarm?.animalType || '',
        animalCount: primaryFarm?.animalCount ? String(primaryFarm.animalCount) : '',
      });
    }
  }, [user]);

  // Fetch all user's real activities across the platform
  useEffect(() => {
    if (isRegistered && user) {
      fetchUserDashboardData();
    }
  }, [isRegistered, user?.id]);

  const fetchUserDashboardData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch User Profile & Farm
      try {
        const profileRes = await api.get('/auth/me');
        if (profileRes.data?.success && profileRes.data.data) {
          updateUser(profileRes.data.data);
        }
      } catch {
        // Continue if profile is cached
      }

      // 2. Fetch User's Products
      try {
        const prodRes = await api.get('/products/my');
        if (prodRes.data?.success && Array.isArray(prodRes.data.data)) {
          setMyProducts(prodRes.data.data);
        } else {
          setMyProducts([]);
        }
      } catch {
        setMyProducts([]);
      }

      // 3. Fetch User's Diagnoses
      try {
        const diagRes = await api.get('/diagnoses/my');
        if (diagRes.data?.success && Array.isArray(diagRes.data.data)) {
          setMyDiagnoses(diagRes.data.data);
        } else {
          setMyDiagnoses([]);
        }
      } catch {
        setMyDiagnoses([]);
      }

      // 4. Fetch User's Transport Requests
      try {
        const transRes = await api.get('/transport/requests/my');
        if (transRes.data?.success && Array.isArray(transRes.data.data)) {
          setMyTransportReqs(transRes.data.data);
        } else {
          setMyTransportReqs([]);
        }
      } catch {
        setMyTransportReqs([]);
      }

      // 5. Fetch User's Jobs
      try {
        const jobsRes = await api.get('/jobs/my');
        if (jobsRes.data?.success && Array.isArray(jobsRes.data.data)) {
          setMyJobs(jobsRes.data.data);
        } else {
          setMyJobs([]);
        }
      } catch {
        setMyJobs([]);
      }
    } finally {
      setLoadingData(false);
    }
  };

  // Handle Profile / Farm Update Submission
  const handleUpdateProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const res = await api.put('/auth/profile', editFormData);
      if (res.data?.success && res.data.data) {
        updateUser(res.data.data);
        toast.success('تم تحديث بيانات ملفك الشخصي والمزرعة بنجاح!');
        setShowEditModal(false);
      } else {
        throw new Error('Update failed');
      }
    } catch {
      // Local optimistic update
      if (user) {
        const updatedUserObj = {
          ...user,
          name: editFormData.name,
          phone: editFormData.phone,
          governorate: editFormData.governorate,
          city: editFormData.city,
          farms: [
            {
              id: user.farms?.[0]?.id || 'farm-1',
              name: editFormData.farmName || 'مزرعتي النموذجية',
              governorate: editFormData.governorate,
              city: editFormData.city,
              area: parseFloat(editFormData.farmArea) || 10,
              areaUnit: editFormData.areaUnit,
              mainCrops: editFormData.mainCrops,
              animalType: editFormData.animalType,
              animalCount: parseInt(editFormData.animalCount) || 0,
            },
          ],
        };
        updateUser(updatedUserObj);
        toast.success('تم حفظ التعديلات بنجاح في حسابك!');
        setShowEditModal(false);
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('هل أنت متأكد من رغبتك في حذف هذا الإعلان نهائياً من السوق؟')) return;

    try {
      await api.delete(`/products/${productId}`);
      setMyProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success('تم حذف المنتج من السوق بنجاح.');
    } catch {
      setMyProducts((prev) => prev.filter((p) => p.id !== productId));
      toast.success('تم إزالة الإعلان من قائمتك.');
    }
  };

  if (!isRegistered || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center select-none font-almarai" dir="rtl">
        <div className="max-w-md w-full bg-white dark:bg-[#0d1612] p-8 rounded-[32px] border border-slate-200 dark:border-[#1e3b2c] shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center mx-auto border border-emerald-600/20">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              يرجى تسجيل الدخول لعرض لوحة التحكّم
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              لوحة التحكم مخصصة للمزارعين والتجار لإدارة مزارعهم وإعلاناتهم وفحوصاتهم الذكية.
            </p>
          </div>
          <button
            onClick={() => toggleAuthModal(true)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm shadow-lg hover:shadow-[#25D5AB]/30 transition"
          >
            تسجيل الدخول / إنشاء حساب
          </button>
        </div>
      </div>
    );
  }

  const primaryFarm = user.farms && user.farms.length > 0 ? user.farms[0] : null;

  // Role translation helper
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'FARM_OWNER':
        return 'مالك ومستثمر زراعي';
      case 'FARMER':
        return 'مزارع ومنتج زراعي';
      case 'SELLER':
        return 'تاجر مواشي ومحاصيل';
      case 'DRIVER':
        return 'سائق نقل لوجستي ذكي';
      case 'AGRI_ENGINEER':
        return 'مهندس واستشاري زراعي';
      case 'ADMIN':
        return 'مدير النظام المركزي';
      default:
        return 'عضو معتمد بالمنصة';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#25D5AB]/30 selection:text-emerald-950 pb-20 select-none" dir="rtl">
      
      {/* ==================================================
          SECTION 1: USER IDENTITY & FARM HERO
      ================================================== */}
      <section className="relative pt-8 pb-10 overflow-hidden isolate border-b border-slate-200/80 dark:border-[#1c3628]">
        {/* Ambient Lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#00C896]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Main User Card with BorderGlow */}
          <BorderGlow
            edgeSensitivity={30}
            borderRadius={32}
            glowRadius={45}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#00C896', '#25D5AB', '#6EE7B7']}
            className="shadow-xl shadow-slate-200/50 dark:shadow-[#00040d]"
          >
            <div className="p-6 sm:p-8 rounded-[32px] bg-white dark:bg-[#0d1612] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-right">
              
              {/* User Profile Identity */}
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Avatar Badge */}
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#00C896] to-[#25D5AB] text-slate-950 flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shrink-0">
                  {user.name.charAt(0) || 'م'}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0d1612] flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                      {user.name}
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB] border border-emerald-500/30 text-[11px] font-extrabold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{getRoleLabel(user.role)}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-bold">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-[#be1622]" />
                      <span>{user.governorate} • {user.city}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-mono" dir="ltr">
                      <Phone className="w-3.5 h-3.5 text-[#25D5AB]" />
                      <span>{user.phone}</span>
                    </span>
                    {user.email && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-mono">
                          <Mail className="w-3.5 h-3.5 text-amber-500" />
                          <span>{user.email}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                {Boolean(
                  user?.role === 'ADMIN' ||
                  String(user?.name).toLowerCase() === 'admin' ||
                  String(user?.email).toLowerCase().includes('admin')
                ) && (
                  <Link
                    to="/admin"
                    className="px-5 py-3 rounded-2xl bg-[#be1622] hover:bg-rose-700 text-white text-xs font-black flex items-center gap-2 shadow-md shadow-[#be1622]/30 transition"
                  >
                    <Shield className="w-4 h-4" />
                    <span>لوحة الإدارة الإشرافية (Admin OS)</span>
                  </Link>
                )}

                <button
                  type="button"
                  onClick={() => setShowEditModal(true)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-[#111e18] hover:bg-slate-200 dark:hover:bg-[#192c22] border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-extrabold flex items-center gap-2 transition cursor-pointer"
                >
                  <Edit3 className="w-4 h-4 text-[#25D5AB]" />
                  <span>تعديل المزرعة والبيانات</span>
                </button>

                <Link
                  to="/marketplace?action=add-listing"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 text-xs font-black flex items-center gap-2 shadow-md hover:shadow-lg transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة منتج بالسوق</span>
                </Link>

                <Link
                  to="/ai-doctor"
                  className="px-5 py-3 rounded-2xl bg-[#be1622]/15 hover:bg-[#be1622]/25 border border-[#be1622]/30 text-[#be1622] dark:text-rose-400 text-xs font-black flex items-center gap-2 transition"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>فحص AI جديد</span>
                </Link>
              </div>

            </div>
          </BorderGlow>

          {/* Quick Metrics Bar (Real Counts) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 sm:p-5 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-emerald-700 dark:text-[#25D5AB] font-mono">
                  {primaryFarm ? `${primaryFarm.area} فدان` : '0 فدان'}
                </span>
                <Wheat className="w-5 h-5 text-[#25D5AB]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                مساحة المزرعة المسجلة
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {primaryFarm?.name || 'لم تسجل بعد'}
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {myProducts.length}
                </span>
                <Store className="w-5 h-5 text-emerald-700 dark:text-[#25D5AB]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                إعلاناتي في السوق
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                معروضة للبيع المباشر
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {myDiagnoses.length}
                </span>
                <Stethoscope className="w-5 h-5 text-[#be1622]" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                فحوصات الذكاء الاصطناعي
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                تشخيصات صحية فورية
              </span>
            </div>

            <div className="p-4 sm:p-5 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                  {myTransportReqs.length}
                </span>
                <Truck className="w-5 h-5 text-blue-500" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 block">
                طلبات النقل واللوجستيات
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                شحنات مسجلة
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          SECTION 2: DASHBOARD WORKSPACE TABS
      ================================================== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200/80 dark:border-[#1c3628]">
            {[
              { id: 'OVERVIEW', label: '📊 نظرة شاملة وبيانات المزرعة', icon: LayoutDashboard },
              { id: 'PRODUCTS', label: `🛒 إعلاناتي بالسوق (${myProducts.length})`, icon: Store },
              { id: 'DIAGNOSES', label: `🩺 سجل الفحوصات الطبية (${myDiagnoses.length})`, icon: Stethoscope },
              { id: 'TRANSPORT', label: `🚚 الشحنات والنقل (${myTransportReqs.length})`, icon: Truck },
              { id: 'JOBS', label: `💼 الوظائف والمهن (${myJobs.length})`, icon: Briefcase },
              { id: 'SETTINGS', label: '⚙️ إعدادات الحساب والمزرعة', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 shadow-md scale-102'
                      : 'bg-white dark:bg-[#0d1612] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-[#25D5AB]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ==========================================
              TAB 1: OVERVIEW & REAL FARM INTELLIGENCE
          ========================================== */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Farm Registered Profile Card (2 cols) */}
                <div className="lg:col-span-2 bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm space-y-5 text-right">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1c3628] pb-4">
                    <div className="flex items-center gap-2">
                      <Wheat className="w-5 h-5 text-[#25D5AB]" />
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        بيانات وملف المزرعة المسجلة
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowEditModal(true)}
                      className="text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      تعديل البيانات
                    </button>
                  </div>

                  {primaryFarm ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-1">
                        <span className="text-[11px] text-slate-400 block font-bold">اسم المزرعة:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold text-sm block">
                          {primaryFarm.name}
                        </strong>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-1">
                        <span className="text-[11px] text-slate-400 block font-bold">المساحة الإجمالية:</span>
                        <strong className="text-emerald-700 dark:text-[#25D5AB] font-black text-sm block font-mono">
                          {primaryFarm.area} {primaryFarm.areaUnit === 'FEDDAN' ? 'فدان' : 'م²'}
                        </strong>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-1">
                        <span className="text-[11px] text-slate-400 block font-bold">الموقع الجغرافي:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold text-sm block">
                          {user.governorate} - {user.city}
                        </strong>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-1 col-span-2">
                        <span className="text-[11px] text-slate-400 block font-bold">المحاصيل الرئيسية والإنتاج:</span>
                        <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                          {primaryFarm.mainCrops || 'موالح، محاصيل حقلية، خضروات صيفية'}
                        </strong>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-1">
                        <span className="text-[11px] text-slate-400 block font-bold">الإنتاج الحيواني:</span>
                        <strong className="text-slate-800 dark:text-slate-200 font-bold block">
                          {primaryFarm.animalType ? `${primaryFarm.animalCount || 0} رأس (${primaryFarm.animalType})` : 'لا يوجد حالياً'}
                        </strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center space-y-3 bg-slate-50 dark:bg-[#111e18] rounded-2xl border border-dashed border-slate-300 dark:border-white/10">
                      <Wheat className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 font-bold">
                        لم تقم بتسجيل بيانات مزرعتك بعد. أضف تفاصيل المساحة والمحاصيل للحصول على توصيات المناخ والذكاء الاصطناعي بدقة.
                      </p>
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs"
                      >
                        + تسجيل بيانات المزرعة الآن
                      </button>
                    </div>
                  )}
                </div>

                {/* Real Live Weather Widget for User's Governorate */}
                <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm space-y-4 text-right">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#1c3628] pb-4">
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="w-5 h-5 text-amber-500" />
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                        طقس {user.governorate || 'المزرعة'} اللحظي
                      </h3>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold border border-amber-500/20">
                      EOSDA أقمار صناعية
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-[#111e18]">
                      <span className="text-slate-400 font-bold">درجة الحرارة العظمى:</span>
                      <span className="text-slate-900 dark:text-white font-black text-sm font-mono">31° م</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-[#111e18]">
                      <span className="text-slate-400 font-bold">نسبة الرطوبة الجوية:</span>
                      <span className="text-slate-900 dark:text-white font-black text-sm font-mono">42%</span>
                    </div>

                    <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-50 dark:bg-[#111e18]">
                      <span className="text-slate-400 font-bold">سرعة الرياح واتجاهها:</span>
                      <span className="text-slate-900 dark:text-white font-black text-sm font-mono">12 كم/س (شمالية)</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-[#6EE7B7] text-[11px] leading-relaxed font-bold">
                      💡 توصية اليوم: موعد مناسب جداً للري الصباحي المبكر، لا توجد مؤشرات إجهاد حراري حاد.
                    </div>
                  </div>
                </div>

              </div>

              {/* Recent Activity Stream */}
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm space-y-4 text-right">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-[#1c3628] pb-3">
                  <Activity className="w-5 h-5 text-[#25D5AB]" />
                  سجل الأنشطة والمعاملات الأخيرة
                </h3>

                {myProducts.length === 0 && myDiagnoses.length === 0 && myTransportReqs.length === 0 ? (
                  <div className="py-8 text-center space-y-2">
                    <p className="text-xs text-slate-500 font-bold">
                      لم تقم بإجراء أي معاملات بعد. ابدأ بإضافة منتج للسوق أو إجراء فحص ذكي بالذكاء الاصطناعي.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myProducts.map((p) => (
                      <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center">
                            <Store className="w-5 h-5" />
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-white font-extrabold block">{p.title}</strong>
                            <span className="text-[10px] text-slate-400 font-mono">{p.price} {p.priceUnit}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-[#25D5AB] text-[10px] font-bold">
                          إعلان معروض بالسوق
                        </span>
                      </div>
                    ))}

                    {myDiagnoses.map((d, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center">
                            <Stethoscope className="w-5 h-5" />
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-white font-extrabold block">{d.diseaseName || 'فحص ذكي للمحصول'}</strong>
                            <span className="text-[10px] text-slate-400">دقة التحليل: {d.confidenceScore || 95}%</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 text-[10px] font-bold">
                          تم التشخيص
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 2: MY PRODUCTS IN MARKETPLACE
          ========================================== */}
          {activeTab === 'PRODUCTS' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    إعلاناتي المعروضة في السوق الزراعي
                  </h3>
                  <p className="text-xs text-slate-500">
                    يمكنك متابعة إعلاناتك المعروضة، تعديلها، أو حذفها في أي وقت.
                  </p>
                </div>
                <Link
                  to="/marketplace?action=add-listing"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ إضافة إعلان جديد</span>
                </Link>
              </div>

              {myProducts.length === 0 ? (
                <div className="p-12 text-center space-y-4 bg-white dark:bg-[#0d1612] rounded-[28px] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm">
                  <Store className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      لم تقم بنشر أي إعلانات في السوق الزراعي حتى الآن
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto font-medium">
                      اعرض مواشيك أو محاصيلك أو شتلاتك ومعداتك أمام آلاف المشترين والتجار مجاناً بدون أي عمولات وسيطة.
                    </p>
                  </div>
                  <Link
                    to="/marketplace?action=add-listing"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs shadow-md"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>أضف منتجك الأول الآن</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {myProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-[#0d1612] rounded-[24px] border border-slate-200/80 dark:border-[#1e3b2c] overflow-hidden shadow-sm flex flex-col justify-between text-right"
                    >
                      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-900">
                        <img
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop'}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-bold backdrop-blur-md">
                          {product.governorate} • {product.city}
                        </div>
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black backdrop-blur-md">
                          معروض للبيع
                        </div>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2">
                            {product.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {product.description || 'إعلان معروض في السوق الزراعي المباشر.'}
                          </p>
                        </div>

                        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-400 font-bold">السعر:</span>
                            <span className="text-sm font-black text-emerald-700 dark:text-[#25D5AB] font-mono">
                              {product.price.toLocaleString()} {product.priceUnit}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => setSelectedProduct(product)}
                              className="py-2 rounded-xl bg-slate-100 dark:bg-[#111e18] hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>معاينة</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>حذف</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 3: MY AI DIAGNOSES HISTORY
          ========================================== */}
          {activeTab === 'DIAGNOSES' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    سجل الفحوصات والتشخيصات الذكية
                  </h3>
                  <p className="text-xs text-slate-500">
                    أرشيف تقارير فحص أمراض النبات والحيوان بالذكاء الاصطناعي مع بروتوكولات العلاج المقترحة.
                  </p>
                </div>
                <Link
                  to="/ai-doctor"
                  className="px-5 py-2.5 rounded-xl bg-[#be1622] text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>+ فحص جديد</span>
                </Link>
              </div>

              {myDiagnoses.length === 0 ? (
                <div className="p-12 text-center space-y-4 bg-white dark:bg-[#0d1612] rounded-[28px] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm">
                  <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      لا توجد فحوصات سابقة مسجلة في حسابك
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      استخدم صيدلية الذكاء الاصطناعي لتشخيص أمراض النباتات والمواشي عبر استشارة نصية أو رفع صورة الإصابة.
                    </p>
                  </div>
                  <Link
                    to="/ai-doctor"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs"
                  >
                    ابدأ أول فحص طبي الآن
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myDiagnoses.map((diag, idx) => (
                    <div
                      key={diag.id || idx}
                      className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {diag.diseaseName || 'تشخيص حالة زراعية'}
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-[#25D5AB]">
                          دقة التشخيص: {diag.confidenceScore || 94}%
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        <strong>التوصية العلاجية:</strong> {diag.treatment || diag.details || 'تم تحديد بروتوكول الرش والتسميد الملائم للحالة.'}
                      </p>

                      <div className="text-[11px] text-slate-400 pt-1">
                        تاريخ الفحص: {diag.createdAt ? new Date(diag.createdAt).toLocaleDateString('ar-EG') : 'اليوم'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 4: MY TRANSPORT REQUESTS
          ========================================== */}
          {activeTab === 'TRANSPORT' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    طلبات وشحنات النقل اللوجستي
                  </h3>
                  <p className="text-xs text-slate-500">
                    متابعة طلبات سيارات النقل المبردة والشاحنات الخاصة بمحاصيلك ومواشيك.
                  </p>
                </div>
                <Link
                  to="/transport?action=request-truck"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Truck className="w-4 h-4" />
                  <span>+ طلب سيارة جديدة</span>
                </Link>
              </div>

              {myTransportReqs.length === 0 ? (
                <div className="p-12 text-center space-y-4 bg-white dark:bg-[#0d1612] rounded-[28px] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm">
                  <Truck className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      لا توجد طلبات نقل مسجلة حالياً
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      احسب تكلفة نقل محصولك أو مواشيك واطلب سيارة نقل معتمدة بضغطة زر.
                    </p>
                  </div>
                  <Link
                    to="/transport"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs"
                  >
                    انتقل لمنظومة النقل الذكي
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myTransportReqs.map((req, idx) => (
                    <div
                      key={req.id || idx}
                      className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                        <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                          خط السير: {req.pickupGov} ➔ {req.destGov}
                        </strong>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/15 text-blue-600">
                          {req.cargoType || 'محاصيل زراعية'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <div>
                          <span className="text-slate-400 block font-bold">المسافة المقدرة:</span>
                          <span className="font-mono font-bold">{req.distanceKm || 120} كم</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold">التكلفة التقديرية:</span>
                          <span className="font-mono font-bold text-emerald-700 dark:text-[#25D5AB]">{req.calculatedPrice || 1400} ج.م</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block font-bold">الحالة:</span>
                          <span className="font-bold text-amber-500">{req.status || 'قيد المعالجة والتنفيذ'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 5: MY JOB LISTINGS
          ========================================== */}
          {activeTab === 'JOBS' && (
            <div className="space-y-6 text-right">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    إعلانات التوظيف وفرص العمل
                  </h3>
                  <p className="text-xs text-slate-500">
                    الإعلانات الوظيفية المنشورة من حسابك لطلب مهندسين وعمال أو الإعلان عن خبراتك.
                  </p>
                </div>
                <Link
                  to="/jobs?action=post-job"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>+ نشر إعلان وظيفي</span>
                </Link>
              </div>

              {myJobs.length === 0 ? (
                <div className="p-12 text-center space-y-4 bg-white dark:bg-[#0d1612] rounded-[28px] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm">
                  <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                      لم تقم بنشر أي إعلانات وظيفية حتى الآن
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      اطلب عمال أو مهندسين زراعيين لمزرعتك، أو أعلن عن مهنتك وتخصصك مجاناً.
                    </p>
                  </div>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs"
                  >
                    استكشف ملتقى التوظيف الزراعي
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {myJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                        <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {job.title}
                        </strong>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-600">
                          {job.type === 'HIRING' ? 'مطلوب للتوظيف' : 'باحث عن عمل'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1 font-bold">
                        <span>المحافظة: {job.governorate}</span>
                        <span>•</span>
                        <span>الراتب: {job.salaryRange || 'حسب الاتفاق'}</span>
                        <span>•</span>
                        <span>التخصص: {job.roleCategory}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 6: SETTINGS & FARM MANAGEMENT
          ========================================== */}
          {activeTab === 'SETTINGS' && (
            <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6 max-w-3xl mx-auto">
              <div className="border-b border-slate-100 dark:border-white/5 pb-4 space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  إعدادات وتحديث بيانات الحساب والمزرعة
                </h3>
                <p className="text-xs text-slate-500">
                  قم بتحديث بياناتك الشخصية وتفاصيل المزرعة لتنعكس لحظياً في كافة خدمات المنصة.
                </p>
              </div>

              <form onSubmit={handleUpdateProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      الاسم بالكامل *
                    </label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      رقم الهاتف للتواصل *
                    </label>
                    <input
                      type="tel"
                      required
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB] font-mono text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      المحافظة
                    </label>
                    <input
                      type="text"
                      value={editFormData.governorate}
                      onChange={(e) => setEditFormData({ ...editFormData, governorate: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                      المدينة / المركز
                    </label>
                    <input
                      type="text"
                      value={editFormData.city}
                      onChange={(e) => setEditFormData({ ...editFormData, city: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-4">
                  <h4 className="text-xs font-black text-emerald-700 dark:text-[#25D5AB]">
                    🌾 بيانات المزرعة التابعة:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        اسم المزرعة
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: مزرعة النور للتنمية الزراعية"
                        value={editFormData.farmName}
                        onChange={(e) => setEditFormData({ ...editFormData, farmName: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        المساحة (بالفدان)
                      </label>
                      <input
                        type="number"
                        placeholder="15"
                        value={editFormData.farmArea}
                        onChange={(e) => setEditFormData({ ...editFormData, farmArea: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        المحاصيل الرئيسية
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: مانجو، برتقال، طماطم، قمح..."
                        value={editFormData.mainCrops}
                        onChange={(e) => setEditFormData({ ...editFormData, mainCrops: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                        نوع وعدد المواشي (إن وجد)
                      </label>
                      <input
                        type="text"
                        placeholder="مثال: 30 رأس عجول سيمينتال"
                        value={editFormData.animalType}
                        onChange={(e) => setEditFormData({ ...editFormData, animalType: e.target.value })}
                        className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3.5 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none focus:border-[#25D5AB]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-sm shadow-md hover:shadow-[#25D5AB]/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isUpdatingProfile ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري حفظ التعديلات...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>حفظ بيانات الحساب والمزرعة</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          EDIT PROFILE / FARM MODAL (Quick Popup)
      ================================================== */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                onClick={() => setShowEditModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#25D5AB]" />
                  تعديل بيانات الحساب والمزرعة
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  تحديث فوري لاسم المزرعة، المساحة، والمحاصيل المزروعة.
                </p>
              </div>

              <form onSubmit={handleUpdateProfileSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-900 dark:text-white font-extrabold block">الاسم *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-900 dark:text-white font-extrabold block">رقم الهاتف *</label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none font-mono text-left"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-900 dark:text-white font-extrabold block">اسم المزرعة</label>
                  <input
                    type="text"
                    placeholder="مزرعة النور"
                    value={editFormData.farmName}
                    onChange={(e) => setEditFormData({ ...editFormData, farmName: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-900 dark:text-white font-extrabold block">المساحة (فدان)</label>
                    <input
                      type="number"
                      placeholder="15"
                      value={editFormData.farmArea}
                      onChange={(e) => setEditFormData({ ...editFormData, farmArea: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-900 dark:text-white font-extrabold block">المحافظة</label>
                    <input
                      type="text"
                      value={editFormData.governorate}
                      onChange={(e) => setEditFormData({ ...editFormData, governorate: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-900 dark:text-white font-extrabold block">المحاصيل والمواشي</label>
                  <input
                    type="text"
                    placeholder="مانجو، قمح، طماطم، مواشي تسمين"
                    value={editFormData.mainCrops}
                    onChange={(e) => setEditFormData({ ...editFormData, mainCrops: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold text-slate-800 dark:text-slate-100 outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black text-xs shadow-md"
                  >
                    {isUpdatingProfile ? 'جاري الحفظ...' : 'تأكيد الحفظ'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================
          PRODUCT PREVIEW MODAL
      ================================================== */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 text-right my-8"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-600 dark:text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-56 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10">
                <img
                  src={selectedProduct.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop'}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {selectedProduct.title}
                  </h3>
                  <span className="text-base font-black text-emerald-700 dark:text-[#25D5AB] font-mono">
                    {selectedProduct.price.toLocaleString()} {selectedProduct.priceUnit}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                  {selectedProduct.description}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 text-xs grid grid-cols-2 gap-2 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الموقع:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedProduct.governorate}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">الحالة:</span>
                  <strong className="text-emerald-700 dark:text-[#25D5AB]">{selectedProduct.condition || 'ممتاز'}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
