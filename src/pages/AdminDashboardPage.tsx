import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Product, Job, Article } from '../types';
import { BorderGlow } from '../components/ui/BorderGlow';
import {
  LayoutDashboard,
  Users,
  Shield,
  ShieldAlert,
  FileText,
  Store,
  Truck,
  Briefcase,
  Newspaper,
  TrendingUp,
  MessageSquare,
  Settings,
  PlusCircle,
  Search,
  Filter,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  MapPin,
  Phone,
  Mail,
  Lock,
  ArrowLeft,
  X,
  Check,
  ChevronLeft,
  AlertTriangle,
  Loader2,
  Activity,
  Layers,
  Database,
  Server,
  Zap,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isRegistered, toggleAuthModal } = useAuth();

  // Active Section / Tab
  const [activeSection, setActiveSection] = useState<
    'OVERVIEW' | 'USERS' | 'AUDIT' | 'PRODUCTS' | 'TRANSPORT' | 'JOBS' | 'NEWS' | 'MARKET' | 'MESSAGES' | 'SETTINGS'
  >('OVERVIEW');

  // Loading States
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Platform Overview Stats
  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalFarms: 0,
    totalProducts: 0,
    totalDiagnoses: 0,
    totalTransportReqs: 0,
    totalTransportOffers: 0,
    totalJobs: 0,
    totalNews: 0,
    totalAuditLogs: 0,
    totalContactMsgs: 0,
  });

  // Data Collections
  const [usersList, setUsersList] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [newsList, setNewsList] = useState<Article[]>([]);
  const [marketUpdates, setMarketUpdates] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [auditModuleFilter, setAuditModuleFilter] = useState('ALL');
  const [userRoleFilter, setUserRoleFilter] = useState('ALL');

  // Modals States
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'FARMER',
    password: '',
    governorate: 'القاهرة',
    city: 'الرئيسية',
  });

  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    category: 'تسمين المواشي',
    summary: '',
    content: '',
    imageUrl: '',
    author: 'إدارة منصة جرين فارم ماركت',
  });

  const [showAddMarketModal, setShowAddMarketModal] = useState(false);
  const [marketFormData, setMarketFormData] = useState({
    commodity: '',
    price: '',
    priceUnit: 'ج.م / طن',
    change: '0.0',
    trend: 'STABLE',
    notes: '',
  });

  // Selected item detail preview modal
  const [previewItem, setPreviewItem] = useState<{ type: string; data: any } | null>(null);

  // Fetch initial data when admin logs in
  useEffect(() => {
    if (isRegistered && user?.role === 'ADMIN') {
      loadAllAdminData();
    }
  }, [isRegistered, user?.role]);

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      // 1. Stats
      try {
        const statsRes = await api.get('/admin/stats');
        if (statsRes.data?.success) setStats(statsRes.data.data);
      } catch {}

      // 2. Users
      try {
        const usersRes = await api.get('/admin/users');
        if (usersRes.data?.success && Array.isArray(usersRes.data.data)) setUsersList(usersRes.data.data);
      } catch {}

      // 3. Audit Logs
      try {
        const auditRes = await api.get('/admin/audit');
        if (auditRes.data?.success && Array.isArray(auditRes.data.data)) setAuditLogs(auditRes.data.data);
      } catch {}

      // 4. Products
      try {
        const prodRes = await api.get('/admin/products');
        if (prodRes.data?.success && Array.isArray(prodRes.data.data)) setProductsList(prodRes.data.data);
      } catch {}

      // 5. Jobs
      try {
        const jobsRes = await api.get('/admin/jobs');
        if (jobsRes.data?.success && Array.isArray(jobsRes.data.data)) setJobsList(jobsRes.data.data);
      } catch {}

      // 6. News
      try {
        const newsRes = await api.get('/admin/news');
        if (newsRes.data?.success && Array.isArray(newsRes.data.data)) setNewsList(newsRes.data.data);
      } catch {}

      // 7. Market Updates
      try {
        const marketRes = await api.get('/admin/market');
        if (marketRes.data?.success && Array.isArray(marketRes.data.data)) setMarketUpdates(marketRes.data.data);
      } catch {}

      // 8. Contact Messages
      try {
        const msgRes = await api.get('/admin/messages');
        if (msgRes.data?.success && Array.isArray(msgRes.data.data)) setContactMessages(msgRes.data.data);
      } catch {}
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadAllAdminData();
    toast.success('تم تحديث البيانات الإدارية اللحظية.');
  };

  // ==========================================
  // HANDLERS: USER ACTIONS
  // ==========================================
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserFormData.name || !newUserFormData.email || !newUserFormData.phone || !newUserFormData.password) {
      toast.error('يرجى ملء جميع البيانات الأساسية.');
      return;
    }

    try {
      const res = await api.post('/admin/users', newUserFormData);
      if (res.data?.success) {
        toast.success(`تم إنشاء حساب المستخدم (${newUserFormData.name}) بنجاح!`);
        setUsersList([res.data.data, ...usersList]);
        setShowAddUserModal(false);
        setNewUserFormData({
          name: '',
          email: '',
          phone: '',
          role: 'FARMER',
          password: '',
          governorate: 'القاهرة',
          city: 'الرئيسية',
        });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل إنشاء المستخدم.');
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`هل أنت متأكد من رغبتك في حذف المستخدم (${userName}) نهائياً؟`)) return;

    try {
      await api.delete(`/admin/users/${userId}`);
      setUsersList(usersList.filter((u) => u.id !== userId));
      toast.success(`تم حذف المستخدم (${userName}) بنجاح.`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'فشل حذف المستخدم.');
    }
  };

  const handleChangeUserRole = async (userId: string, newRole: string) => {
    try {
      await api.put(`/admin/users/${userId}`, { role: newRole });
      setUsersList(usersList.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
      toast.success('تم تعديل صلاحية المستخدم بنجاح.');
    } catch {
      toast.error('فشل تعديل الصلاحية.');
    }
  };

  // ==========================================
  // HANDLERS: PRODUCT ACTIONS
  // ==========================================
  const handleToggleProductStatus = async (productId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE';
    try {
      await api.put(`/admin/products/${productId}/status`, { status: nextStatus });
      setProductsList(productsList.map((p) => (p.id === productId ? { ...p, status: nextStatus as any } : p)));
      toast.success(`تم تحديث حالة المنتج إلى: ${nextStatus === 'ACTIVE' ? 'نشط ومعروض' : 'مؤرشف'}`);
    } catch {
      toast.error('فشل تحديث حالة المنتج.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج من السوق؟')) return;
    try {
      await api.delete(`/admin/products/${productId}`);
      setProductsList(productsList.filter((p) => p.id !== productId));
      toast.success('تم حذف المنتج بنجاح.');
    } catch {
      toast.error('فشل حذف المنتج.');
    }
  };

  // ==========================================
  // HANDLERS: JOB ACTIONS
  // ==========================================
  const handleDeleteJob = async (jobId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا الإعلان الوظيفي؟')) return;
    try {
      await api.delete(`/admin/jobs/${jobId}`);
      setJobsList(jobsList.filter((j) => j.id !== jobId));
      toast.success('تم حذف الإعلان الوظيفي بنجاح.');
    } catch {
      toast.error('فشل حذف الوظيفة.');
    }
  };

  // ==========================================
  // HANDLERS: NEWS ACTIONS
  // ==========================================
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsFormData.title || !newsFormData.content) {
      toast.error('يرجى كتابة عنوان المقال ومحتواه.');
      return;
    }

    try {
      const res = await api.post('/admin/news', newsFormData);
      if (res.data?.success) {
        toast.success('تم نشر المقال الإخباري بنجاح!');
        setNewsList([res.data.data, ...newsList]);
        setShowAddNewsModal(false);
        setNewsFormData({
          title: '',
          category: 'تسمين المواشي',
          summary: '',
          content: '',
          imageUrl: '',
          author: 'إدارة منصة جرين فارم ماركت',
        });
      }
    } catch {
      toast.error('فشل نشر المقال.');
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    try {
      await api.delete(`/admin/news/${newsId}`);
      setNewsList(newsList.filter((n) => n.id !== newsId));
      toast.success('تم حذف المقال بنجاح.');
    } catch {
      toast.error('فشل حذف المقال.');
    }
  };

  // ==========================================
  // HANDLERS: MARKET ACTIONS
  // ==========================================
  const handleCreateMarketUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marketFormData.commodity || !marketFormData.price) {
      toast.error('يرجى تحديد السلعة والسعر.');
      return;
    }

    try {
      const res = await api.post('/admin/market', marketFormData);
      if (res.data?.success) {
        toast.success('تمت إضافة السلعة للبورصة بنجاح!');
        setMarketUpdates([res.data.data, ...marketUpdates]);
        setShowAddMarketModal(false);
        setMarketFormData({
          commodity: '',
          price: '',
          priceUnit: 'ج.م / طن',
          change: '0.0',
          trend: 'STABLE',
          notes: '',
        });
      }
    } catch {
      toast.error('فشل إضافة السلعة.');
    }
  };

  const handleDeleteMarketUpdate = async (id: string) => {
    if (!window.confirm('هل أنت متأكد من حذف هذه السلعة من البورصة؟')) return;
    try {
      await api.delete(`/admin/market/${id}`);
      setMarketUpdates(marketUpdates.filter((m) => m.id !== id));
      toast.success('تم حذف السلعة من البورصة بنجاح.');
    } catch {
      toast.error('فشل حذف السلعة.');
    }
  };

  // Exclusive Admin check
  const isExclusiveAdmin = Boolean(
    isRegistered &&
    user &&
    (
      user.email?.trim().toLowerCase() === 'ahmed.admin@gmail.com' ||
      String(user.role).toUpperCase() === 'ADMIN'
    )
  );

  // Guard: Not the Exclusive Admin
  if (!isExclusiveAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 text-center select-none font-almarai" dir="rtl">
        <div className="max-w-md w-full bg-white dark:bg-[#0d1612] p-8 rounded-[32px] border border-rose-500/30 shadow-2xl space-y-5">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto border border-rose-500/20">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              منطقة إدارية محمية (Admin Protected)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              عفواً، هذه اللوحة مخصصة حصرياً لمدير النظام (ahmed.admin@gmail.com) فقط لا غير.
            </p>
          </div>
          <button
            onClick={() => toggleAuthModal(true)}
            className="w-full py-3.5 rounded-2xl bg-[#be1622] hover:bg-rose-700 text-white font-black text-xs shadow-lg transition"
          >
            تسجيل الدخول بحساب المدير (ahmed.admin@gmail.com)
          </button>
        </div>
      </div>
    );
  }

  // Navigation Sidebar Definition
  const sidebarItems = [
    { id: 'OVERVIEW', label: 'لوحة المؤشرات العامة', icon: LayoutDashboard, badge: 'الرئيسية' },
    { id: 'USERS', label: 'إدارة المستخدمين والصلاحيات', icon: Users, badge: `${usersList.length}` },
    { id: 'AUDIT', label: 'سجل العمليات والرقابة (Audit)', icon: FileText, badge: `${auditLogs.length}` },
    { id: 'PRODUCTS', label: 'إدارة إعلانات السوق', icon: Store, badge: `${productsList.length}` },
    { id: 'JOBS', label: 'إدارة الوظائف الزراعية', icon: Briefcase, badge: `${jobsList.length}` },
    { id: 'NEWS', label: 'الأخبار والمحتوى العلمي', icon: Newspaper, badge: `${newsList.length}` },
    { id: 'MARKET', label: 'أسعار البورصة الزراعية', icon: TrendingUp, badge: `${marketUpdates.length}` },
    { id: 'MESSAGES', label: 'رسائل الدعم الفني', icon: MessageSquare, badge: `${contactMessages.length}` },
    { id: 'SETTINGS', label: 'إعدادات النظام والأمان', icon: Settings, badge: 'v2.6.0' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#00040d] text-slate-900 dark:text-white font-almarai selection:bg-[#25D5AB]/30 selection:text-emerald-950 pb-20 select-none" dir="rtl">
      
      {/* Top Banner Control Header */}
      <header className="bg-white/80 dark:bg-[#07100b]/80 border-b border-slate-200/80 dark:border-[#1c3628] sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#be1622] text-white flex items-center justify-center shadow-md shadow-[#be1622]/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  مركز الإدارة والتحكم المؤسسي
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-[#be1622]/15 text-[#be1622] dark:text-rose-400 text-[10px] font-black border border-[#be1622]/30">
                  Green Farm OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                مرحباً {user?.name || 'Ahmed Admin'} | التحكم المركزي في المستخدمين، السوق، الأمان وسجل العمليات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition flex items-center gap-1.5 text-xs font-extrabold cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-[#25D5AB] ${refreshing ? 'animate-spin' : ''}`} />
              <span>تحديث البيانات</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-[#25D5AB] border border-emerald-500/20 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>النظام متصل وآمن</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main SaaS Administration Grid */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* ==========================================
              SIDEBAR NAVIGATION (3 Cols on lg)
          ========================================== */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-4 rounded-[28px] shadow-sm space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-400 px-3 py-1 block">
                قوائم الإشراف والرقابة:
              </span>

              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as any)}
                    className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#00C896] via-[#25D5AB] to-[#6EE7B7] text-slate-950 font-black shadow-md scale-101'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-slate-950/20 text-slate-950 font-black'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-500'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Server Health Box */}
            <div className="bg-gradient-to-b from-[#0e1f17] to-[#040906] text-white p-5 rounded-[24px] border border-white/5 space-y-3 text-right">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#25D5AB] flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  خوادم التشغيل
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">100% Online</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                قاعدة البيانات محمية ومؤمنة مع تفعيل المراقبة اللحظية لسجل الأنشطة والأمان.
              </p>
            </div>
          </aside>

          {/* ==========================================
              MAIN WORKSPACE CONTENT (9 Cols on lg)
          ========================================== */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* ==========================================
                VIEW 1: OVERVIEW DASHBOARD
            ========================================== */}
            {activeSection === 'OVERVIEW' && (
              <div className="space-y-6">
                
                {/* 6 Key Enterprise Counter Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'إجمالي المستخدمين', count: stats.totalUsers, sub: '+12% هذا الشهر', icon: Users, color: '#00C896' },
                    { label: 'إعلانات السوق', count: stats.totalProducts, sub: 'معروضة للبيع', icon: Store, color: '#25D5AB' },
                    { label: 'فحوصات AI المنفذة', count: stats.totalDiagnoses, sub: 'تشخيصات دقيقة', icon: Zap, color: '#be1622' },
                    { label: 'سجلات الرقابة', count: stats.totalAuditLogs, sub: 'نشاط مسجل', icon: FileText, color: '#6EE7B7' },
                    { label: 'طلبات النقل', count: stats.totalTransportReqs, sub: 'لوجستيات المحافظات', icon: Truck, color: '#3b82f6' },
                    { label: 'فرص التوظيف', count: stats.totalJobs, sub: 'وظائف زراعية', icon: Briefcase, color: '#f59e0b' },
                    { label: 'المقالات والأخبار', count: stats.totalNews, sub: 'إرشاد وبورصة', icon: Newspaper, color: '#8b5cf6' },
                    { label: 'رسائل الدعم', count: stats.totalContactMsgs, sub: 'تواصل مباشر', icon: MessageSquare, color: '#ec4899' },
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-5 rounded-[24px] bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] shadow-sm text-right space-y-2 hover:border-[#25D5AB]/50 transition"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                            {stat.count}
                          </span>
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                            {stat.label}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                            {stat.sub}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Action Shortcuts Grid */}
                <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 rounded-[28px] shadow-sm text-right space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#25D5AB]" />
                    إجراءات سريعة من لوحة التحكم:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button
                      onClick={() => setShowAddUserModal(true)}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] hover:bg-slate-100 dark:hover:bg-[#192c22] border border-slate-200/70 dark:border-white/5 text-right space-y-1 transition cursor-pointer"
                    >
                      <PlusCircle className="w-5 h-5 text-emerald-700 dark:text-[#25D5AB]" />
                      <strong className="text-xs font-extrabold block text-slate-900 dark:text-white">إضافة مستخدم جديد</strong>
                      <span className="text-[10px] text-slate-400 block">تعيين صلاحية مخصصة</span>
                    </button>

                    <button
                      onClick={() => setShowAddNewsModal(true)}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] hover:bg-slate-100 dark:hover:bg-[#192c22] border border-slate-200/70 dark:border-white/5 text-right space-y-1 transition cursor-pointer"
                    >
                      <Newspaper className="w-5 h-5 text-purple-600" />
                      <strong className="text-xs font-extrabold block text-slate-900 dark:text-white">نشر مقال إخباري</strong>
                      <span className="text-[10px] text-slate-400 block">إرشادات وبورصة</span>
                    </button>

                    <button
                      onClick={() => setShowAddMarketModal(true)}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] hover:bg-slate-100 dark:hover:bg-[#192c22] border border-slate-200/70 dark:border-white/5 text-right space-y-1 transition cursor-pointer"
                    >
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      <strong className="text-xs font-extrabold block text-slate-900 dark:text-white">تحديث سعر سلعة</strong>
                      <span className="text-[10px] text-slate-400 block">بورصة الأسعار</span>
                    </button>

                    <button
                      onClick={() => setActiveSection('AUDIT')}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] hover:bg-slate-100 dark:hover:bg-[#192c22] border border-slate-200/70 dark:border-white/5 text-right space-y-1 transition cursor-pointer"
                    >
                      <FileText className="w-5 h-5 text-rose-500" />
                      <strong className="text-xs font-extrabold block text-slate-900 dark:text-white">فحص سجل العمليات</strong>
                      <span className="text-[10px] text-slate-400 block">مراقبة الأحداث الأمنية</span>
                    </button>
                  </div>
                </div>

                {/* Recent Audit Activities Stream */}
                <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 rounded-[28px] shadow-sm text-right space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#25D5AB]" />
                      أحدث الأنشطة المسجلة في النظام (Audit Stream)
                    </h3>
                    <button
                      onClick={() => setActiveSection('AUDIT')}
                      className="text-xs font-extrabold text-emerald-700 dark:text-[#25D5AB] hover:underline"
                    >
                      عرض السجل بالكامل ➔
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {auditLogs.slice(0, 5).map((log) => (
                      <div
                        key={log.id}
                        className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-[#25D5AB] font-mono text-[10px] font-bold">
                            {log.module}
                          </span>
                          <div>
                            <strong className="text-slate-900 dark:text-white block font-extrabold">
                              {log.description}
                            </strong>
                            <span className="text-[10px] text-slate-400">
                              بواسطة: {log.user?.name || 'مستخدم النظام'} • IP: {log.ipAddress || '127.0.0.1'}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(log.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 2: AUDIT LOGS DASHBOARD (/admin/audit)
            ========================================== */}
            {activeSection === 'AUDIT' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-rose-500" />
                      سجل العمليات والرقابة الأمنية (Audit Logs)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      تتبع لحظي وشامل لكافة عمليات تسجيل الدخول، إنشاء الإعلانات، وتعديلات النظام.
                    </p>
                  </div>

                  {/* Filter by Module Chips */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {['ALL', 'AUTH', 'MARKETPLACE', 'USERS', 'JOBS', 'NEWS', 'MARKET', 'SYSTEM'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setAuditModuleFilter(m)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                          auditModuleFilter === m
                            ? 'bg-rose-600 text-white font-black'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Audit Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في سجل العمليات: بالوصف، المستخدم، أو عنوان IP..."
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-2xl py-3 pr-11 pl-4 text-xs font-bold outline-none focus:border-[#25D5AB]"
                  />
                </div>

                {/* Audit Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#1e3b2c]">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-50 dark:bg-[#111e18] border-b border-slate-200/80 dark:border-[#1e3b2c] text-slate-500 font-extrabold">
                      <tr>
                        <th className="p-3.5">الوقت والتاريخ</th>
                        <th className="p-3.5">المستخدم</th>
                        <th className="p-3.5">الوحدة (Module)</th>
                        <th className="p-3.5">النشاط (Action)</th>
                        <th className="p-3.5">تفاصيل العملية</th>
                        <th className="p-3.5">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {auditLogs
                        .filter((l) => auditModuleFilter === 'ALL' || l.module === auditModuleFilter)
                        .filter(
                          (l) =>
                            !searchQuery.trim() ||
                            l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            l.ipAddress?.includes(searchQuery) ||
                            l.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                            <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                              {new Date(log.createdAt).toLocaleString('ar-EG')}
                            </td>
                            <td className="p-3.5 font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                              {log.user?.name || 'مستخدم عام'}
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-[10px] font-mono font-bold">
                                {log.module}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB] text-[10px] font-mono font-bold">
                                {log.action}
                              </span>
                            </td>
                            <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium max-w-md">
                              {log.description}
                            </td>
                            <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap" dir="ltr">
                              {log.ipAddress || '127.0.0.1'}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 3: USER MANAGEMENT & RBAC (/admin/users)
            ========================================== */}
            {activeSection === 'USERS' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-emerald-700 dark:text-[#25D5AB]" />
                      إدارة حسابات المستخدمين والصلاحيات (RBAC)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      التحكم في أدوار الأعضاء، تعديل الصلاحيات، وإضافة مستخدمين جدد للنظام.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md self-start cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ إضافة مستخدم جديد</span>
                  </button>
                </div>

                {/* Users DataTable */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#1e3b2c]">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-50 dark:bg-[#111e18] border-b border-slate-200/80 dark:border-[#1e3b2c] text-slate-500 font-extrabold">
                      <tr>
                        <th className="p-3.5">الاسم</th>
                        <th className="p-3.5">البريد الإلكتروني</th>
                        <th className="p-3.5">الهاتف</th>
                        <th className="p-3.5">الصلاحية الحالية</th>
                        <th className="p-3.5">المحافظة</th>
                        <th className="p-3.5">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {usersList.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                          <td className="p-3.5 font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                            👤 {u.name}
                          </td>
                          <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300">
                            {u.email}
                          </td>
                          <td className="p-3.5 font-mono text-slate-600 dark:text-slate-300" dir="ltr">
                            {u.phone}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={u.role}
                              onChange={(e) => handleChangeUserRole(u.id, e.target.value)}
                              className="bg-slate-100 dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-1.5 text-[11px] font-bold outline-none cursor-pointer text-slate-900 dark:text-white"
                            >
                              <option value="ADMIN">ADMIN (مدير)</option>
                              <option value="FARM_OWNER">FARM_OWNER (مالك مزرعة)</option>
                              <option value="FARMER">FARMER (مزارع)</option>
                              <option value="SELLER">SELLER (تاجر)</option>
                              <option value="DRIVER">DRIVER (سائق)</option>
                              <option value="AGRI_ENGINEER">AGRI_ENGINEER (مهندس)</option>
                              <option value="BUYER">BUYER (مشتري)</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">
                            {u.governorate} • {u.city}
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 transition cursor-pointer"
                              title="حذف المستخدم"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 4: PRODUCTS MODERATION (/admin/products)
            ========================================== */}
            {activeSection === 'PRODUCTS' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Store className="w-5 h-5 text-emerald-700 dark:text-[#25D5AB]" />
                      مراقبة وإدارة إعلانات السوق الزراعي ({productsList.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      اعتماد، أرشفة، أو حذف المنتجات المعروضة للبيع المباشر من المزارعين.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#1e3b2c]">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-50 dark:bg-[#111e18] border-b border-slate-200/80 dark:border-[#1e3b2c] text-slate-500 font-extrabold">
                      <tr>
                        <th className="p-3.5">المنتج</th>
                        <th className="p-3.5">التاجر / البائع</th>
                        <th className="p-3.5">السعر المطلوب</th>
                        <th className="p-3.5">الموقع</th>
                        <th className="p-3.5">الحالة</th>
                        <th className="p-3.5">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {productsList.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                          <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop'}
                                alt=""
                                className="w-10 h-10 rounded-xl object-cover"
                              />
                              <div>
                                <span className="block font-bold truncate max-w-xs">{product.title}</span>
                                <span className="text-[10px] text-slate-400">{product.condition}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">
                            {product.seller?.name || 'مزارع'}
                          </td>
                          <td className="p-3.5 font-mono font-black text-emerald-700 dark:text-[#25D5AB]">
                            {product.price.toLocaleString()} {product.priceUnit}
                          </td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">
                            {product.governorate}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                                product.status === 'ACTIVE'
                                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB]'
                                  : 'bg-amber-500/15 text-amber-600'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap space-x-1.5 space-x-reverse">
                            <button
                              onClick={() => handleToggleProductStatus(product.id, product.status)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-[10px] font-extrabold cursor-pointer"
                            >
                              {product.status === 'ACTIVE' ? 'أرشفة' : 'تفعيل'}
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 5: JOBS MODERATION (/admin/jobs)
            ========================================== */}
            {activeSection === 'JOBS' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-amber-500" />
                      إدارة ومراقبة فرص التوظيف الزراعية ({jobsList.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      الإشراف على إعلانات التوظيف والعمالة المنشورة من المزارعين والشركات.
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#1e3b2c]">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-50 dark:bg-[#111e18] border-b border-slate-200/80 dark:border-[#1e3b2c] text-slate-500 font-extrabold">
                      <tr>
                        <th className="p-3.5">عنوان الوظيفة</th>
                        <th className="p-3.5">النوع</th>
                        <th className="p-3.5">التخصص</th>
                        <th className="p-3.5">المحافظة</th>
                        <th className="p-3.5">الراتب المتوقع</th>
                        <th className="p-3.5">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {jobsList.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                          <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                            {job.title}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 text-[10px] font-bold">
                              {job.type}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">{job.roleCategory}</td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">{job.governorate}</td>
                          <td className="p-3.5 font-mono text-emerald-700 dark:text-[#25D5AB]">{job.salaryRange || 'اتفاق'}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 6: NEWS & GUIDANCE (/admin/news)
            ========================================== */}
            {activeSection === 'NEWS' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Newspaper className="w-5 h-5 text-purple-600" />
                      إدارة النشرة الإخبارية والمحتوى الإرشادي ({newsList.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      نشر وتعديل المقالات العلمية والتوصيات الزراعية والبيطرية للمزارعين.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddNewsModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ نشر مقال جديد</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsList.map((art) => (
                    <div
                      key={art.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/80 dark:border-white/5 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-600 text-[10px] font-bold">
                          {art.category}
                        </span>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{art.summary}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50 dark:border-white/5 text-xs">
                        <span className="text-[10px] text-slate-400">✍️ {art.author}</span>
                        <button
                          onClick={() => handleDeleteNews(art.id)}
                          className="text-rose-600 text-[11px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف المقال
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 7: AGRICULTURAL STOCK MARKET (/admin/market)
            ========================================== */}
            {activeSection === 'MARKET' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-amber-500" />
                      إدارة أسعار البورصة الزراعية اللحظية ({marketUpdates.length})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      تحديث أسعار السلع والمحاصيل والمواشي المتداولة وتحديد اتجاهات المؤشر.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAddMarketModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ إضافة سلعة للبورصة</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-[#1e3b2c]">
                  <table className="w-full text-xs text-right">
                    <thead className="bg-slate-50 dark:bg-[#111e18] border-b border-slate-200/80 dark:border-[#1e3b2c] text-slate-500 font-extrabold">
                      <tr>
                        <th className="p-3.5">السلعة الزراعية</th>
                        <th className="p-3.5">السعر الحالي</th>
                        <th className="p-3.5">وحدة التسعير</th>
                        <th className="p-3.5">التغير %</th>
                        <th className="p-3.5">الاتجاه</th>
                        <th className="p-3.5">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      {marketUpdates.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition">
                          <td className="p-3.5 font-extrabold text-slate-900 dark:text-white">
                            🌾 {m.commodity}
                          </td>
                          <td className="p-3.5 font-mono font-black text-emerald-700 dark:text-[#25D5AB]">
                            {m.price?.toLocaleString()}
                          </td>
                          <td className="p-3.5 text-slate-600 dark:text-slate-300">{m.priceUnit}</td>
                          <td className="p-3.5 font-mono font-bold" dir="ltr">
                            {m.change >= 0 ? `+${m.change}%` : `${m.change}%`}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                                m.trend === 'UP'
                                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-[#25D5AB]'
                                  : m.trend === 'DOWN'
                                  ? 'bg-rose-500/15 text-rose-600'
                                  : 'bg-slate-100 dark:bg-white/10 text-slate-400'
                              }`}
                            >
                              {m.trend === 'UP' ? '↗ ارتفاع' : m.trend === 'DOWN' ? '↘ انخفاض' : '↔ استقرار'}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteMarketUpdate(m.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}

            {/* ==========================================
                VIEW 8: CONTACT MESSAGES (/admin/messages)
            ========================================== */}
            {activeSection === 'MESSAGES' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-emerald-700 dark:text-[#25D5AB]" />
                    رسائل واستفسارات العملاء ({contactMessages.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {contactMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200/70 dark:border-white/5 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-2">
                        <strong className="text-sm font-extrabold text-slate-900 dark:text-white">
                          {msg.subject || 'استفسار عام'}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(msg.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{msg.message}</p>
                      <div className="flex items-center gap-4 text-slate-400 font-bold text-[11px] pt-1">
                        <span>👤 {msg.name}</span>
                        <span>📞 {msg.phone}</span>
                        <span>✉️ {msg.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==========================================
                VIEW 9: SYSTEM SETTINGS (/admin/settings)
            ========================================== */}
            {activeSection === 'SETTINGS' && (
              <div className="bg-white dark:bg-[#0d1612] border border-slate-200/80 dark:border-[#1e3b2c] p-6 sm:p-8 rounded-[28px] shadow-sm text-right space-y-6">
                <div className="border-b border-slate-100 dark:border-white/5 pb-4">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Settings className="w-5 h-5 text-[#25D5AB]" />
                    إعدادات النظام والأمان السحابي
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="text-slate-400 block font-bold">إصدار منصة التشغيل:</span>
                    <strong className="text-slate-900 dark:text-white text-sm font-mono block">v2.6.0 Enterprise SaaS</strong>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111e18] border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="text-slate-400 block font-bold">حالة قاعدة البيانات:</span>
                    <strong className="text-emerald-700 dark:text-[#25D5AB] text-sm font-mono block">MySQL & Prisma 6.19 (Connected)</strong>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </main>

      {/* ==========================================
          MODAL 1: ADD USER MODAL
      ========================================== */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                onClick={() => setShowAddUserModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-[#25D5AB]" />
                  إضافة مستخدم جديد للنظام (RBAC)
                </h3>
                <p className="text-xs text-slate-500">تعيين بيانات الحساب والصلاحية المباشرة.</p>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-900 dark:text-white block">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    value={newUserFormData.name}
                    onChange={(e) => setNewUserFormData({ ...newUserFormData, name: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">البريد الإلكتروني *</label>
                    <input
                      type="email"
                      required
                      value={newUserFormData.email}
                      onChange={(e) => setNewUserFormData({ ...newUserFormData, email: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">رقم الهاتف *</label>
                    <input
                      type="tel"
                      required
                      value={newUserFormData.phone}
                      onChange={(e) => setNewUserFormData({ ...newUserFormData, phone: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none font-mono text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">الصلاحية والدور *</label>
                    <select
                      value={newUserFormData.role}
                      onChange={(e) => setNewUserFormData({ ...newUserFormData, role: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none cursor-pointer"
                    >
                      <option value="FARMER">FARMER (مزارع)</option>
                      <option value="FARM_OWNER">FARM_OWNER (مالك مزرعة)</option>
                      <option value="SELLER">SELLER (تاجر)</option>
                      <option value="DRIVER">DRIVER (سائق)</option>
                      <option value="AGRI_ENGINEER">AGRI_ENGINEER (مهندس)</option>
                      <option value="BUYER">BUYER (مشتري)</option>
                      <option value="ADMIN">ADMIN (مدير)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">كلمة المرور *</label>
                    <input
                      type="password"
                      required
                      value={newUserFormData.password}
                      onChange={(e) => setNewUserFormData({ ...newUserFormData, password: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 text-xs font-bold text-slate-500"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#25D5AB] text-slate-950 font-black text-xs shadow-md"
                  >
                    تأكيد وإنشاء المستخدم
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==========================================
          MODAL 2: ADD NEWS ARTICLE MODAL
      ========================================== */}
      <AnimatePresence>
        {showAddNewsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                onClick={() => setShowAddNewsModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-purple-600" />
                  نشر مقال إخباري وإرشادي جديد
                </h3>
              </div>

              <form onSubmit={handleCreateNews} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-900 dark:text-white block">عنوان المقال *</label>
                  <input
                    type="text"
                    required
                    value={newsFormData.title}
                    onChange={(e) => setNewsFormData({ ...newsFormData, title: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">التصنيف</label>
                    <select
                      value={newsFormData.category}
                      onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                    >
                      <option value="تسمين المواشي">تسمين المواشي والإنتاج الحيواني</option>
                      <option value="فوائد الأشجار">فوائد الأشجار والشتلات</option>
                      <option value="الري والتكنولوجيا">الري والتكنولوجيا والطاقة</option>
                      <option value="البورصة والأسعار">البورصة والأسعار</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">الكاتب</label>
                    <input
                      type="text"
                      value={newsFormData.author}
                      onChange={(e) => setNewsFormData({ ...newsFormData, author: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-900 dark:text-white block">محتوى المقال *</label>
                  <textarea
                    rows={4}
                    required
                    value={newsFormData.content}
                    onChange={(e) => setNewsFormData({ ...newsFormData, content: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-normal outline-none resize-none"
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
                    className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-black text-xs shadow-md"
                  >
                    تأكيد النشر
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==========================================
          MODAL 3: ADD MARKET COMMODITY MODAL
      ========================================== */}
      <AnimatePresence>
        {showAddMarketModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0d1612] border border-slate-200 dark:border-[#1e3b2c] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-right my-8"
            >
              <button
                onClick={() => setShowAddMarketModal(false)}
                className="absolute top-5 left-5 p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  إضافة سلعة زراعية جديدة للبورصة
                </h3>
              </div>

              <form onSubmit={handleCreateMarketUpdate} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-slate-900 dark:text-white block">اسم السلعة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: قمح محلي درجة أولى، عجول بقري حي..."
                    value={marketFormData.commodity}
                    onChange={(e) => setMarketFormData({ ...marketFormData, commodity: e.target.value })}
                    className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">السعر الحالي *</label>
                    <input
                      type="number"
                      required
                      placeholder="18500"
                      value={marketFormData.price}
                      onChange={(e) => setMarketFormData({ ...marketFormData, price: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">وحدة التسعير</label>
                    <select
                      value={marketFormData.priceUnit}
                      onChange={(e) => setMarketFormData({ ...marketFormData, priceUnit: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                    >
                      <option value="ج.م / طن">ج.م / طن</option>
                      <option value="ج.م / كيلو قائم">ج.م / كيلو قائم</option>
                      <option value="ج.م / إردب">ج.م / إردب</option>
                      <option value="ج.م / قفص">ج.م / قفص</option>
                      <option value="ج.م / رأس">ج.م / رأس</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">نسبة التغير %</label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="+2.5"
                      value={marketFormData.change}
                      onChange={(e) => setMarketFormData({ ...marketFormData, change: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold text-slate-900 dark:text-white block">الاتجاه (Trend)</label>
                    <select
                      value={marketFormData.trend}
                      onChange={(e) => setMarketFormData({ ...marketFormData, trend: e.target.value })}
                      className="w-full bg-[#f8fafc] dark:bg-[#111e18] border border-slate-200 dark:border-[#1e3b2c] rounded-xl p-3 text-xs font-bold outline-none"
                    >
                      <option value="UP">ارتفاع ↗</option>
                      <option value="STABLE">استقرار ↔</option>
                      <option value="DOWN">انخفاض ↘</option>
                    </select>
                  </div>
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
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-md"
                  >
                    حفظ ونشر السعر
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
