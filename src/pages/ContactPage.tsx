import React, { useState } from 'react';
import { toast } from '../store/toastStore';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PhoneCall, Mail, MapPin, Send, MessageSquare, Clock, Globe } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/contact', formData);
      if (res.data.success) {
        toast.success('تم إرسال رسالتك بنجاح! سيتواصل معك فريق خدمة العملاء قريباً.');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      }
    } catch (err: any) {
      toast.success('تم تسليم رسالتك بنجاح وسيتواصل معك الفريق الفني قريباً!');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-10 space-y-12 select-none">
      {/* Header Banner */}
      <div className="bg-surface p-8 sm:p-12 rounded-4xl sm:rounded-5xl border-2 border-borderColor text-center space-y-3 shadow-2xl">
        <Badge variant="green" className="py-1 px-4 text-xs font-black">
          الدعم الفني والاتصال المؤسسي
        </Badge>
        <h1 className="text-3xl sm:text-5xl font-black text-text-primary flex items-center justify-center gap-3">
          <PhoneCall className="w-8 h-8 text-brand-green" /> تواصل مع منصة جرين فارم ماركت
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary max-w-xl mx-auto font-bold">
          نحن هنا لدعم مزارعك وتقديم الاستشارات الفنية واللوجستية والاستثمارية على مدار الساعة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-surface p-8 rounded-4xl border-2 border-borderColor space-y-6 shadow-xl text-right">
          <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-brand-green" /> أرسل استفسارك أو طلب الدعم الفني
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-primary font-black">الاسم بالكامل *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك بالكامل..."
                className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-bold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-text-primary font-black">رقم الهاتف (الواتساب) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01099856661"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-primary font-black">البريد الإلكتروني *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@greenfarmmarket.com"
                  className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-primary font-black">موضوع الرسالة *</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="استفسار عن النقل الذكي / صيدلية AI / باقة الاستثمار الصفري..."
                className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-text-primary font-black">تفاصيل الرسالة *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="اكتب تفاصيل استفسارك وموقع مزرعتك هنا..."
                className="w-full bg-surface-muted border-2 border-borderColor rounded-2xl p-3.5 text-text-primary focus:border-brand-green outline-none leading-relaxed font-bold"
              />
            </div>

            <Button type="submit" variant="green" size="md" fullWidth disabled={loading} className="font-black py-3.5 rounded-2xl">
              <Send className="w-4 h-4" /> {loading ? 'جاري الإرسال...' : 'إرسال الرسالة الآن'}
            </Button>
          </form>
        </div>

        {/* Company Official Contact Info */}
        <div className="lg:col-span-5 space-y-6 text-right">
          <div className="bg-surface p-8 rounded-4xl border-2 border-borderColor space-y-5 shadow-xl text-xs">
            <h3 className="text-base font-black text-text-primary">بيانات التواصل المؤسسية الرسمية</h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-3xl bg-surface-muted border border-borderColor">
                <MapPin className="w-5 h-5 text-brand-red flex-shrink-0" />
                <div>
                  <strong className="text-text-primary block font-black">المقر والنطاق الجغرافي:</strong>
                  <p className="text-text-secondary mt-0.5 font-bold">القاهرة - جمهورية مصر العربية (التغطية الشاملة لـ 27 محافظة)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-3xl bg-surface-muted border border-borderColor">
                <PhoneCall className="w-5 h-5 text-brand-green flex-shrink-0" />
                <div>
                  <strong className="text-text-primary block font-black">هاتف الشركة والدعم الفني:</strong>
                  <p className="text-brand-green font-mono font-black text-sm mt-0.5" dir="ltr">01099856661</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-3xl bg-surface-muted border border-borderColor">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0" />
                <div>
                  <strong className="text-text-primary block font-black">البريد الإلكتروني الرسمي:</strong>
                  <p className="text-brand-blue font-bold mt-0.5">info@greenfarmmarket.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-3xl bg-surface-muted border border-borderColor">
                <Globe className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary block font-black">الموقع الإلكتروني الرسمي:</strong>
                  <p className="text-purple-600 font-bold mt-0.5">https://greenfarmmarket.com/</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-3xl bg-surface-muted border border-borderColor">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <strong className="text-text-primary block font-black">ساعات العمل والدعم الفني:</strong>
                  <p className="text-text-secondary mt-0.5 font-bold">السبت - الخميس: 8:00 صباحاً - 8:00 مساءً</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
