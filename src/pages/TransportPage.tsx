import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Truck,
  ShieldCheck,
  Calculator,
  Handshake,
  DollarSign,
  ClipboardCheck,
  CheckCircle2,
  Phone,
  AlertTriangle,
  FileText,
  BarChart3,
  UserCheck,
  PlusCircle,
  Search,
  Filter,
} from 'lucide-react';

export const TransportPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { isRegistered, toggleAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'MARKETPLACE' | 'SMART' | 'DASHBOARD' | 'TERMS'>('MARKETPLACE');

  useEffect(() => {
    if (searchParams.get('action') === 'request-truck' || searchParams.get('action') === 'add-cargo') {
      setActiveTab('SMART');
    }
  }, [searchParams]);
  const [filterCargo, setFilterCargo] = useState('ALL');

  // Interactive booking calculator state
  const [distanceKm, setDistanceKm] = useState(120);
  const [cargoType, setCargoType] = useState('محاصيل وخضروات');
  const [pickupGov, setPickupGov] = useState('بني سويف');
  const [destGov, setDestGov] = useState('القاهرة والجيزة');

  const pricePerKm = 12;
  const baseCost = distanceKm * pricePerKm;
  const platformFee = Math.round(baseCost * 0.05);
  const totalEstimatedCost = baseCost + platformFee;

  const transportAds = [
    {
      id: 1,
      type: 'shipper',
      title: 'مطلوب نقل 15 طن قمح محلي',
      route: 'بني سويف ➔ صوامع الجيزة',
      cargoCategory: 'محاصيل وخضروات',
      user: 'مزرعة النور للموالح',
      date: 'منذ ساعتين',
      phone: '01012345678',
    },
    {
      id: 2,
      type: 'driver',
      title: 'سيارة جامبو 7 متر مجهزة للمواشي والمحاصيل',
      route: 'البحيرة ➔ كفر الشيخ وكافة المحافظات',
      cargoCategory: 'مواشي وأعلاف',
      user: 'كابتن محمود الصاوي (سائق نقل ذكي)',
      date: 'متاح الآن',
      phone: '01122334455',
    },
    {
      id: 3,
      type: 'shipper',
      title: 'مطلوب سيارة نقل شتلات مانجو فص',
      route: 'الإسماعيلية ➔ النوبارية',
      cargoCategory: 'أشجار وشتلات',
      user: 'مشاتل الشرق الأوسط',
      date: 'منذ 4 ساعات',
      phone: '01234567890',
    },
  ];

  const filteredAds = transportAds.filter((ad) => {
    if (filterCargo === 'ALL') return true;
    return ad.cargoCategory === filterCargo;
  });

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8 select-none">
      {/* Header Banner */}
      <div className="bg-surface p-8 sm:p-10 rounded-4xl border-2 border-brand-blue/30 shadow-2xl space-y-6">
        <div>
          <Badge variant="blue" className="py-1 px-4 text-xs font-black">
            <Truck className="w-3.5 h-3.5 text-brand-blue" /> المنظومة الرقمية للخدمات اللوجستية والنقل الذكي
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-black text-text-primary flex items-center gap-3 mt-2">
            جرين فارم ماركت | النقل الذكي والخدمات اللوجستية
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-1 font-bold">
            ربط المزارع بصاحب السيارة لتسهيل نقل المنتجات والمستلزمات بطريقة تكنولوجية سهلة وآمنة للطرفين
          </p>
        </div>

        {/* 4 Interactive Section Tabs */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {[
            { id: 'MARKETPLACE', label: '🔄 سوق العرض والطلب', icon: Search },
            { id: 'SMART', label: '🛡️ حاسبة النقل الذكي والأسعار', icon: Calculator },
            { id: 'DASHBOARD', label: '📊 الداش بورد وأرشيف الرحلات', icon: BarChart3 },
            { id: 'TERMS', label: '⚖️ الإطار القانوني والتعليمات', icon: FileText },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                variant={isActive ? 'blue' : 'outline'}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="font-black text-xs py-2.5 px-4 rounded-2xl"
              >
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* CRITICAL MANDATORY SPECIFICATION: Legal Disclaimer Notice Banner */}
      <div className="bg-brand-red-soft/40 border-2 border-brand-red/50 p-6 rounded-3xl space-y-2 text-right text-xs text-text-primary shadow-lg relative overflow-hidden">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h3 className="font-black text-brand-red text-sm">تنبيه قانوني وإداري هام (Legal Notice)</h3>
            <p className="text-xs font-bold leading-relaxed text-text-primary">
              الشركة غير مسؤولة فنياً أو إدارياً عن المعاملة بين الطالب والعارض من الجانبين من حيث التسعير أو الاتفاق على النقل وخطوط السير.
            </p>
            <p className="text-[11px] font-semibold text-text-secondary leading-relaxed">
              المنصة لا تؤمن البضاعة المنقولة ولا تضمن حق السائق حالياً، والمعاملات المالية وتحديد التكلفة تتم مباشرة خارج نطاق مسؤولية المنصة والموقع.
            </p>
          </div>
        </div>
      </div>

      {/* Tab 1: MARKETPLACE */}
      {activeTab === 'MARKETPLACE' && (
        <div className="space-y-6 text-right">
          {/* Filters */}
          <div className="bg-surface p-6 rounded-3xl border-2 border-borderColor space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2 space-y-1">
                <label className="text-xs font-black text-text-primary block">تصفية حسب نوع المنقولات:</label>
                <select
                  value={filterCargo}
                  onChange={(e) => setFilterCargo(e.target.value)}
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3 text-xs font-bold text-text-primary focus:border-brand-blue outline-none cursor-pointer"
                >
                  <option value="ALL">جميع المنقولات (محاصيل، مواشي، شتلات...)</option>
                  <option value="محاصيل وخضروات">محاصيل وخضروات طازجة</option>
                  <option value="مواشي وأعلاف">مواشي وأعلاف وتسمين</option>
                  <option value="أشجار وشتلات">أشجار وشتلات زراعية</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="green" size="sm" onClick={() => toast.info('افتح صفحة طلب سيارة نقل')}>
                  + طلب سيارة / إنشاء إعلان
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.info('افتح صفحة تسجيل مالك سيارة')}>
                  🪪 تسجيل مالك سيارة
                </Button>
              </div>
            </div>
          </div>

          {/* Cards Feed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAds.map((ad) => (
              <div
                key={ad.id}
                className="bg-surface p-6 rounded-3xl border-2 border-borderColor shadow-xl space-y-4 relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 border-b border-borderColor pb-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-blue" />
                    <h4 className="text-sm font-black text-text-primary">{ad.title}</h4>
                  </div>
                  <Badge variant={ad.type === 'shipper' ? 'green' : 'blue'}>
                    {ad.type === 'shipper' ? 'طلب نقل' : 'شاحنة متاحة'}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-text-secondary font-bold">
                  <p className="text-brand-blue font-black">{ad.route}</p>
                  <p>نوع الشحنة: {ad.cargoCategory}</p>
                  <p>صاحب الإعلان: {ad.user}</p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-text-secondary font-semibold">{ad.date}</span>
                  <a
                    href={`tel:${ad.phone}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-blue text-white text-xs font-black shadow-md hover:bg-brand-blue-dark transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> اتصل مباشرة ({ad.phone})
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: SMART CALCULATOR */}
      {activeTab === 'SMART' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-right">
          <div className="lg:col-span-2 bg-surface p-8 rounded-4xl border-2 border-borderColor space-y-6 shadow-xl">
            <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
              <Calculator className="w-5 h-5 text-brand-blue" /> حاسبة المسافة والتكلفة التقديرية
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-xs font-black text-text-primary">
                <span>المسافة الكيلومترية للرحلة:</span>
                <span className="text-brand-blue font-black text-sm">{distanceKm} كم</span>
              </div>
              <input
                type="range"
                min="20"
                max="600"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-brand-blue bg-surface-muted h-2.5 rounded-lg cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-primary font-black">محافظة الاستلام *</label>
                <input
                  type="text"
                  value={pickupGov}
                  onChange={(e) => setPickupGov(e.target.value)}
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3 text-text-primary font-bold focus:border-brand-blue outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-black">محافظة التسليم *</label>
                <input
                  type="text"
                  value={destGov}
                  onChange={(e) => setDestGov(e.target.value)}
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3 text-text-primary font-bold focus:border-brand-blue outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-4xl border-2 border-brand-blue/30 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <h3 className="text-lg font-black text-text-primary border-b border-borderColor pb-3">
                ملخص التكلفة المقدرة
              </h3>
              <div className="space-y-3 text-xs font-bold">
                <div className="flex justify-between text-text-secondary">
                  <span>التكلفة الأساسية ({distanceKm} كم):</span>
                  <span className="text-text-primary font-black">{baseCost.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>عمولة خدمات المنصة (5%):</span>
                  <span className="text-brand-blue font-black">{platformFee.toLocaleString()} ج.م</span>
                </div>
                <div className="border-t border-borderColor pt-3 flex justify-between text-sm font-black text-text-primary">
                  <span>الإجمالي المتوقع:</span>
                  <span className="text-brand-blue-dark">{totalEstimatedCost.toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>

            <Button variant="blue" size="lg" fullWidth onClick={() => toast.success('تم تسجيل طلبك بنجاح!')}>
              حجز وتأكيد سيارة النقل
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: DASHBOARD */}
      {activeTab === 'DASHBOARD' && (
        <div className="bg-surface p-8 rounded-4xl border-2 border-borderColor space-y-6 shadow-xl text-right">
          <h3 className="text-lg font-black text-text-primary">أرشيف ورحلات النقل السابقة</h3>
          <p className="text-xs text-text-secondary font-bold">سجل الرحلات المكتملة وتتبع خطوط السير</p>
          <div className="p-6 rounded-3xl bg-surface-muted border border-borderColor text-center text-xs font-bold text-text-secondary">
            لا توجد رحلات معلقة حالياً لحسابك.
          </div>
        </div>
      )}

      {/* Tab 4: TERMS */}
      {activeTab === 'TERMS' && (
        <div className="bg-surface p-8 rounded-4xl border-2 border-borderColor space-y-6 shadow-xl text-right">
          <h3 className="text-lg font-black text-text-primary flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-blue" /> الإطار القانوني والتعليمات اللوجستية
          </h3>
          <div className="space-y-3 text-xs text-text-secondary font-bold leading-relaxed">
            <p>1. المنصة توفر شاشة عرض وطلب تكنولوجية فقط لتسهيل المعاملات بين المزارع والسائق.</p>
            <p>2. لا تضمن المنصة الاتفاق المالي الخارجي المبرم بين الطرفين حالياً.</p>
            <p>3. يتم التحقق من وثائق السائقين (الرقم القومي ورخصة القيادة) لرفع الاعتمادية داخل المنصة.</p>
          </div>
        </div>
      )}
    </div>
  );
};
