import React from 'react';
import { useAuth } from '../store/authStore';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
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
} from 'lucide-react';

export const UserDashboardPage: React.FC = () => {
  const { user, isRegistered, toggleAuthModal } = useAuth();

  if (!isRegistered || !user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">يرجى تسجيل الدخول لعرض لوحة التحكّم الخاصة بك</h2>
        <Button variant="green" size="md" onClick={() => toggleAuthModal(true)}>
          تسجيل بيانات المزرعة والدخول
        </Button>
      </div>
    );
  }

  const farm = user.farms && user.farms.length > 0 ? user.farms[0] : null;

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-surface border border-borderColor p-8 rounded-5xl flex flex-wrap items-center justify-between gap-4 shadow-soft-card">
        <div className="space-y-1">
          <Badge variant="green">لوحة تحكّم المزرعة</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary">مرحباً بك، {user.name}</h1>
          <p className="text-xs sm:text-sm text-text-secondary font-semibold">
            الصفة: {user.role === 'FARM_OWNER' ? 'مالك مزرعة' : user.role === 'ADMIN' ? 'مدير النظام' : 'مزارع مسجل'} | المحافظة: {user.governorate} - {user.city}
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/ai-doctor">
            <Button variant="red" size="sm">
              <Stethoscope className="w-4 h-4" /> فحص سريع
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant="green" size="sm">
              <PlusCircle className="w-4 h-4" /> إضافة منتج
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid: Farm Summary & Quick Weather */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Farm Specs Card */}
        <div className="md:col-span-2 bg-surface border border-borderColor p-8 rounded-5xl space-y-4 shadow-soft-card">
          <h3 className="text-base font-black text-text-primary flex items-center gap-2 border-b border-borderColor pb-3">
            <Wheat className="w-5 h-5 text-brand-green" /> ملخص بيانات المزرعة المسجلة
          </h3>

          {farm ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-semibold">
              <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor space-y-1">
                <span className="text-text-secondary block">اسم المزرعة:</span>
                <span className="text-text-primary font-bold">{farm.name}</span>
              </div>
              <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor space-y-1">
                <span className="text-text-secondary block">المساحة:</span>
                <span className="text-brand-green-dark font-black">
                  {farm.area} {farm.areaUnit === 'FEDDAN' ? 'فدان' : 'م²'}
                </span>
              </div>
              <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor space-y-1">
                <span className="text-text-secondary block">الموقع:</span>
                <span className="text-text-primary font-bold">{farm.governorate}</span>
              </div>
              <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor space-y-1 col-span-2">
                <span className="text-text-secondary block">المحاصيل والمواشي:</span>
                <span className="text-amber-800 font-bold">{farm.mainCrops || 'موالح وعجول تسمين'}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-text-secondary">لم يتم تسجيل بيانات مزرعة خاصة حتى الآن.</p>
          )}
        </div>

        {/* Live Weather Widget */}
        <div className="bg-surface border border-amber-200 p-8 rounded-5xl space-y-4 text-xs shadow-soft-card">
          <h3 className="text-base font-black text-amber-800 flex items-center gap-2 border-b border-borderColor pb-3">
            <ThermometerSun className="w-5 h-5 text-amber-600" /> طقس المزرعة الحي (EOSDA)
          </h3>
          <div className="space-y-2.5 font-semibold">
            <div className="flex justify-between text-text-secondary">
              <span>درجة الحرارة:</span>
              <span className="text-text-primary font-bold">32° م</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>نسبة الرطوبة:</span>
              <span className="text-text-primary font-bold">45%</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>سرعة الرياح:</span>
              <span className="text-text-primary font-bold">14 كم/س</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 text-[11px] mt-2">
              توصية المناخ: طقس مناسب للري الصباحي بدون مخاطر إجهاد حراري حاد.
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-surface border border-borderColor p-8 rounded-5xl space-y-6 shadow-soft-card">
        <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-borderColor pb-3">
          <Activity className="w-5 h-5 text-brand-blue" /> الفحوصات والطلبات الأخيرة
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor flex flex-wrap items-center justify-between gap-4 font-semibold">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-red-soft text-brand-red font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">فحص الذكاء الاصطناعي: النمش البكتيري</h4>
                <p className="text-text-secondary text-[11px]">منذ يومين | المزرعة الرئيسية</p>
              </div>
            </div>
            <Badge variant="green">تم تطبيق الرش الموصى به</Badge>
          </div>

          <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor flex flex-wrap items-center justify-between gap-4 font-semibold">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-brand-blue-soft text-brand-blue font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-text-primary">طلب نقل ذكي: بني سويف ➔ القاهرة</h4>
                <p className="text-text-secondary text-[11px]">منذ 4 أيام | باقة النقل والدفع والكشف</p>
              </div>
            </div>
            <Badge variant="blue">تم التسليم بنجاح</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
