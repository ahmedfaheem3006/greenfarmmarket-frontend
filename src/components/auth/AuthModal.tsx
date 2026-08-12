import React, { useState } from 'react';
import { useAuth } from '../../store/authStore';
import { toast } from '../../store/toastStore';
import { api } from '../../services/api';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { X, CreditCard, Lock, Mail, Phone, MapPin, User, Wheat, ShieldCheck } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { showAuthModal, toggleAuthModal, setAuth } = useAuth();
  const [isLoginView, setIsLoginView] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: 'مهندس أحمد زكي',
    phone: '01012345678',
    email: 'ahmed@greenfarm.com',
    password: 'password123',
    governorate: 'بني سويف',
    city: 'الواسطى',
    role: 'FARM_OWNER',
    customRole: '',
    farmName: 'مزرعة بني سويف للموالح والتسمين',
    area: '15',
    areaUnit: 'FEDDAN',
    mainCrops: 'موالح وعجول سيمينتال',
    animalType: 'عجول سيمينتال',
    animalCount: '40',
    notes: 'مزرعة متخصصة في الموالح والتسمين مع طاقة شمسية',
  });

  if (!showAuthModal) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLoginView) {
        const res = await api.post('/auth/login', {
          emailOrPhone: formData.email,
          password: formData.password,
        });

        if (res.data.success) {
          setAuth(res.data.data.user, res.data.data.accessToken);
          toast.success('تم تسجيل الدخول بنجاح!');
        }
      } else {
        const res = await api.post('/auth/register', formData);
        if (res.data.success) {
          setAuth(res.data.data.user, res.data.data.accessToken);
          toast.success('تم تسجيل بيانات المزرعة بنجاح!');
        }
      }
    } catch (err: any) {
      const apiError = err?.response?.data?.message || 'حدث خطأ في عملية التسجيل/الدخول. يرجى المحاولة لاحقاً.';
      if (import.meta.env.PROD) {
        toast.error(apiError);
      } else {
        const mockUser = {
          id: 'user-' + Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role as any,
          governorate: formData.governorate,
          city: formData.city,
          farms: [
            {
              id: 'farm-1',
              name: formData.farmName,
              governorate: formData.governorate,
              city: formData.city,
              area: parseFloat(formData.area),
              areaUnit: formData.areaUnit as any,
              mainCrops: formData.mainCrops,
            },
          ],
        };
        setAuth(mockUser, 'mock_jwt_token_2026');
        toast.success(isLoginView ? 'مرحباً بك مجدداً!' : 'تم حفظ بيانات المزرعة بنجاح!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface border border-borderColor rounded-4xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => toggleAuthModal(false)}
          className="absolute top-5 left-5 text-text-secondary hover:text-text-primary p-2 rounded-full bg-surface-muted"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <Badge variant="green">{isLoginView ? 'تسجيل الدخول' : 'حساب جديد'}</Badge>
          <h3 className="text-2xl font-black text-text-primary flex items-center gap-2 mt-1">
            <CreditCard className="w-6 h-6 text-brand-green" />
            {isLoginView ? 'تسجيل الدخول للحساب' : 'تسجيل بيانات المزارع والعميل'}
          </h3>
          <p className="text-xs text-text-secondary">
            {isLoginView
              ? 'أدخل بيانات حسابك للاستفادة الكاملة من خدمات المنصة.'
              : 'أدخل بياناتك للاستفادة الكاملة من صيدلية الذكاء الاصطناعي ودرجات حرارة مزرعتك الحية.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {!isLoginView && (
            <div className="space-y-1.5">
              <label className="text-text-primary font-bold flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brand-green" /> الاسم بالكامل *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-text-primary font-bold flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-green" /> رقم الهاتف *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-text-primary font-bold flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-brand-green" /> البريد الإلكتروني *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-text-primary font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-brand-green" /> كلمة المرور *
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
            />
          </div>

          {!isLoginView && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-green" /> المحافظة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-green" /> المركز / المدينة *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" /> الصفة داخل القطاع الزراعي *
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                >
                  <option value="FARM_OWNER">مالك مزرعة</option>
                  <option value="FARMER">مزارع / مستثمر</option>
                  <option value="FARM_MANAGER">مدير مزرعة</option>
                  <option value="AGRI_ENGINEER">مهندس زراعي</option>
                  <option value="DRIVER">سائق شاحنة نقل</option>
                  <option value="BUYER">تاجر / مشتري</option>
                </select>
              </div>

              {/* Extended Farm Details */}
              <div className="border-t border-borderColor pt-4 space-y-4">
                <h4 className="text-xs font-black text-brand-green-dark flex items-center gap-1.5">
                  <Wheat className="w-4 h-4 text-brand-green" /> بيانات المزرعة (مطلوبة لشاشة اكتشف علاجك والطقس الحي):
                </h4>

                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">اسم المزرعة</label>
                  <input
                    type="text"
                    value={formData.farmName}
                    onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-text-primary font-bold">المساحة</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-text-primary font-bold">الوحدة</label>
                    <select
                      value={formData.areaUnit}
                      onChange={(e) => setFormData({ ...formData, areaUnit: e.target.value })}
                      className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                    >
                      <option value="FEDDAN">فدان</option>
                      <option value="SQM">متر مربع</option>
                      <option value="QIRAT">قيراط</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-primary font-bold">المحاصيل الرئيسية أو نوع المواشي</label>
                  <input
                    type="text"
                    value={formData.mainCrops}
                    onChange={(e) => setFormData({ ...formData, mainCrops: e.target.value })}
                    placeholder="مثال: موالح، مانجو، عجول سيمينتال..."
                    className="w-full bg-surface-muted border border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-semibold"
                  />
                </div>
              </div>
            </>
          )}

          <Button type="submit" variant="green" size="md" fullWidth disabled={loading}>
            {loading ? 'جاري التنفيذ...' : isLoginView ? 'تسجيل الدخول' : 'حفظ البيانات واستكمال التصفح'}
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-xs text-brand-green-dark hover:underline font-extrabold cursor-pointer"
            >
              {isLoginView ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
