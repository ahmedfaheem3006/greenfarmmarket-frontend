import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/brand/green-farm-market-logo.jpeg';
import { BrandName } from './BrandName';
import { Leaf, ShieldCheck, Phone, Mail, MapPin, ArrowLeft, Sparkles, Handshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#051C12] text-slate-300 text-xs mt-24 border-t border-emerald-950">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Green Farm Market Logo" className="w-12 h-12 object-contain border-0 outline-none" />
            <div>
              <h3 className="text-xl font-black text-white">
                <BrandName lang="en" />
              </h3>
            </div>
          </div>
          <p className="leading-relaxed text-emerald-200/70 text-xs font-medium">
            أول منصة بالشرق الأوسط تجمع التكنولوجيا والزراعة والتسمين، تربط المزارعين والمستثمرين وأصحاب المواشي عبر الذكاء الاصطناعي وسلاسل التوريد المباشرة.
          </p>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Leaf className="w-4 h-4 text-brand-green" /> أقسام المنصة الرئيسية
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/ai-doctor" className="hover:text-brand-red transition flex items-center gap-1.5"><ArrowLeft className="w-3 h-3 text-brand-red" /> صيدلية AI النبات والحيوان</Link></li>
            <li><Link to="/marketplace" className="hover:text-brand-green transition flex items-center gap-1.5"><ArrowLeft className="w-3 h-3 text-brand-green" /> سوق البيع والشراء الزراعي</Link></li>
            <li><Link to="/transport" className="hover:text-brand-blue transition flex items-center gap-1.5"><ArrowLeft className="w-3 h-3 text-brand-blue" /> خدمات النقل واللوجستيات الذكية</Link></li>
            <li><Link to="/jobs" className="hover:text-amber-400 transition flex items-center gap-1.5"><ArrowLeft className="w-3 h-3 text-amber-400" /> فرص العمل والتوظيف الزراعي</Link></li>
            <li><Link to="/news" className="hover:text-purple-400 transition flex items-center gap-1.5"><ArrowLeft className="w-3 h-3 text-purple-400" /> النشرة الإخبارية والبورصة</Link></li>
          </ul>
        </div>

        {/* Digital Guarantees & Platform Features */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-blue" /> الأمان والاعتمادية الرقمية
          </h4>
          <ul className="space-y-2.5 text-emerald-200/80 text-xs font-bold">
            <li className="flex items-center gap-2.5 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>معاملات تجارية وشحن <strong className="text-white">مؤمن بالكامل</strong></span>
            </li>
            <li className="flex items-center gap-2.5 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/60">
              <Sparkles className="w-4 h-4 text-brand-blue flex-shrink-0" />
              <span>دعم وحلول بالذكاء الاصطناعي <strong className="text-white">على مدار 24 ساعة</strong></span>
            </li>
            <li className="flex items-center gap-2.5 bg-emerald-950/80 p-2.5 rounded-xl border border-emerald-800/60">
              <Handshake className="w-4 h-4 text-brand-red flex-shrink-0" />
              <span>ربط مباشر <strong className="text-white">إلغاء حلقة الوسطاء</strong></span>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-brand-green" /> التغطية والتواصل
          </h4>
          <p className="flex items-center gap-2 text-slate-300 font-bold">
            <MapPin className="w-4 h-4 text-brand-red flex-shrink-0" /> بني سويف والقاهرة وباقي المحافظات
          </p>
          <p className="flex items-center gap-2 text-slate-300 font-mono">
            <Phone className="w-4 h-4 text-brand-green flex-shrink-0" /> 01099856661
          </p>
          <p className="flex items-center gap-2 text-slate-300">
            <Mail className="w-4 h-4 text-brand-blue flex-shrink-0" /> info@greenfarmmarket.com
          </p>
        </div>
      </div>

      <div className="border-t border-emerald-900/60 py-6 text-center text-slate-400 text-xs font-bold flex items-center justify-center gap-1">
        <BrandName lang="ar" /> <span>© 2026 - جميع الحقوق محفوظة.</span>
      </div>
    </footer>
  );
};
