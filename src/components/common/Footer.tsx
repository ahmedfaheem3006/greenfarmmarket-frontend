import React from 'react';
import { Link } from 'react-router-dom';
import logoLightImg from '../../assets/Final_logo.png';
import logoWhiteImg from '../../assets/Logo_white.png';
import {
  ShieldCheck,
  Headphones,
  Lock,
  MapPin,
  Phone,
  Mail,
  ChevronLeft,
  Stethoscope,
  Store,
  Truck,
  TrendingUp,
  Briefcase,
  Newspaper,
} from 'lucide-react';
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaYoutube,
} from 'react-icons/fa6';

export const Footer: React.FC = () => {
  const platformLinks = [
    {
      title: 'الذكاء الاصطناعي الزراعي',
      path: '/ai-doctor',
      icon: Stethoscope,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
    {
      title: 'سوق البيع والشراء الزراعي',
      path: '/marketplace',
      icon: Store,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
    {
      title: 'خدمات النقل واللوجستيات',
      path: '/transport',
      icon: Truck,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
    {
      title: 'التمويل والاستثمار الزراعي',
      path: '/about',
      icon: TrendingUp,
      iconColor: 'text-[#be1622]',
      iconBg: 'bg-[#be1622]/10 dark:bg-[#be1622]/15',
    },
    {
      title: 'الوظائف والفرص الزراعية',
      path: '/jobs',
      icon: Briefcase,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
    {
      title: 'الأخبار والنشرة الزراعية',
      path: '/news',
      icon: Newspaper,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
  ];

  const securityCards = [
    {
      id: 1,
      title: 'معاملات آمنة ومشفرة بالكامل',
      desc: 'حماية كاملة للمدفوعات والشحنات',
      icon: ShieldCheck,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
    {
      id: 2,
      title: 'دعم واستشارات 24 ساعة',
      desc: 'نخبة من المهندسين والخبراء',
      icon: Headphones,
      iconColor: 'text-[#be1622]',
      iconBg: 'bg-[#be1622]/10 dark:bg-[#be1622]/15',
    },
    {
      id: 3,
      title: 'حماية بيانات المستخدمين',
      desc: 'خصوصية وأمان سحابي متقدم',
      icon: Lock,
      iconColor: 'text-emerald-700 dark:text-[#25D5AB]',
      iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/15',
    },
  ];

  const socialLinks = [
    { name: 'WhatsApp', icon: FaWhatsapp, href: 'https://wa.me/201099856661', hoverBg: 'hover:bg-emerald-600 hover:text-white' },
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com', hoverBg: 'hover:bg-[#1877F2] hover:text-white' },
    { name: 'X / Twitter', icon: FaXTwitter, href: 'https://x.com', hoverBg: 'hover:bg-black hover:text-white' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com', hoverBg: 'hover:bg-[#0A66C2] hover:text-white' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com', hoverBg: 'hover:bg-[#E4405F] hover:text-white' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com', hoverBg: 'hover:bg-[#FF0000] hover:text-white' },
  ];

  return (
    <footer className="relative bg-[#e5e9f0] dark:bg-[#00040d] text-[#12252f] dark:text-white font-almarai overflow-hidden isolate" dir="rtl">
      
      {/* ==================================================
          TOP GRADIENT LASER SEPARATOR BEAM
      ================================================== */}
      <div className="relative w-full h-[2px] bg-slate-300 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00C896] via-[#25D5AB] to-transparent dark:via-[#25D5AB] opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-4 bg-[#25D5AB]/20 blur-md pointer-events-none" />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-emerald-500/5 dark:bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[#be1622]/5 dark:bg-[#be1622]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Compact Main Container */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 sm:pt-10 pb-6 relative z-10">
        
        {/* 4-Columns Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 items-start pb-6 border-b border-slate-300/80 dark:border-[#172b22]">
          
          {/* ==============================================
              COLUMN 1: BRAND SECTION (lg:col-span-3)
          ============================================== */}
          <div className="lg:col-span-3 space-y-3.5 text-center md:text-right">
            
            {/* Logo */}
            <div className="flex justify-center md:justify-start items-center">
              <img
                src={logoLightImg}
                alt="Green Farm Market"
                className="block dark:hidden h-18 sm:h-20 md:h-18 lg:h-20 w-auto max-w-[260px] sm:max-w-[290px] object-contain select-none transition-transform hover:scale-105 filter drop-shadow-xs"
              />
              <img
                src={logoWhiteImg}
                alt="Green Farm Market"
                className="hidden dark:block h-18 sm:h-20 md:h-18 lg:h-20 w-auto max-w-[260px] sm:max-w-[290px] object-contain select-none transition-transform hover:scale-105 filter drop-shadow-xs"
              />
            </div>

            {/* Description */}
            <p className="text-xs font-normal text-[#475569] dark:text-[#999999] leading-[1.75] max-w-xs mx-auto md:mx-0">
              منصة رقمية متكاملة تجمع الزراعة والتكنولوجيا والاستثمار في منظومة واحدة باستخدام الذكاء الاصطناعي.
            </p>

            {/* Social Media Icons */}
            <div className="pt-0.5">
              <div className="flex items-center justify-center md:justify-start gap-1.5 flex-wrap">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`w-8 h-8 rounded-lg bg-white dark:bg-[#0d1119] border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 hover:shadow-xs ${social.hoverBg} cursor-pointer`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ==============================================
              COLUMN 2: PLATFORM SECTIONS (lg:col-span-3)
          ============================================== */}
          <div className="lg:col-span-3 space-y-2.5 text-right">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-r-2 border-emerald-600 dark:border-[#25D5AB] pr-2">
              <span>أقسام المنصة</span>
            </h4>

            <div className="space-y-1.5">
              {platformLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={idx}
                    to={link.path}
                    className="py-1.5 px-2.5 rounded-lg bg-white/90 dark:bg-[#0d1119] border border-slate-300/80 dark:border-[#25D5AB]/20 text-slate-900 dark:text-slate-100 hover:border-emerald-500 dark:hover:border-[#25D5AB] hover:shadow-2xs transition-all duration-150 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-5.5 h-5.5 rounded-md ${link.iconBg} ${link.iconColor} flex items-center justify-center shrink-0`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold truncate group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB] transition-colors">
                        {link.title}
                      </span>
                    </div>

                    <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-[#25D5AB] transition-transform group-hover:-translate-x-0.5 shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ==============================================
              COLUMN 3: SECURITY & TRUST CARDS (lg:col-span-3)
          ============================================== */}
          <div className="lg:col-span-3 space-y-2.5 text-right">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-r-2 border-emerald-600 dark:border-[#25D5AB] pr-2">
              <span>الأمان والموثوقية</span>
            </h4>

            <div className="space-y-2">
              {securityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className="p-2.5 rounded-xl bg-white dark:bg-[#0d1119] border border-slate-300/80 dark:border-[#25D5AB]/20 flex items-center gap-2.5 shadow-2xs hover:border-emerald-500/40 dark:hover:border-[#25D5AB]/40 transition-all duration-200 group"
                  >
                    <div
                      className={`w-7.5 h-7.5 rounded-lg ${card.iconBg} ${card.iconColor} flex items-center justify-center shrink-0 border border-current/20`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="text-[11px] font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                        {card.title}
                      </h5>
                      <p className="text-[10px] font-normal text-slate-500 dark:text-[#999999] leading-tight mt-0.5 truncate">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ==============================================
              COLUMN 4: CONTACT US (lg:col-span-3)
          ============================================== */}
          <div className="lg:col-span-3 space-y-2.5 text-right">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 border-r-2 border-[#be1622] pr-2">
              <span>تواصل معنا</span>
            </h4>

            <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-[#999999]">
              {/* Location */}
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 dark:bg-[#0d1119]/80 border border-slate-300/80 dark:border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-[#be1622]/10 text-[#be1622] flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 block leading-tight">المقر والنطاق</span>
                  <span className="text-slate-800 dark:text-slate-200 text-[11px] font-bold truncate block">
                    بني سويف والقاهرة والمحافظات
                  </span>
                </div>
              </div>

              {/* Phone */}
              <a
                href="tel:01099856661"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 dark:bg-[#0d1119]/80 border border-slate-300/80 dark:border-slate-800 hover:border-emerald-500/40 dark:hover:border-[#25D5AB]/40 transition group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 dark:bg-[#25D5AB]/15 text-emerald-700 dark:text-[#25D5AB] flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 block leading-tight">الهاتف المباشر</span>
                  <span className="text-slate-900 dark:text-white font-mono font-bold text-[11px] tracking-wider group-hover:text-emerald-700 dark:group-hover:text-[#25D5AB] transition-colors" dir="ltr">
                    01099856661
                  </span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@greenfarmmarket.com"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/80 dark:bg-[#0d1119]/80 border border-slate-300/80 dark:border-slate-800 hover:border-[#be1622]/40 transition group"
              >
                <div className="w-7 h-7 rounded-lg bg-[#be1622]/10 text-[#be1622] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 block leading-tight">البريد الإلكتروني</span>
                  <span className="text-slate-900 dark:text-white font-mono text-[11px] truncate block group-hover:text-[#be1622] transition-colors" dir="ltr">
                    info@greenfarmmarket.com
                  </span>
                </div>
              </a>
            </div>

          </div>

        </div>

        {/* ==================================================
            BOTTOM COPYRIGHT & POLICY BAR (COMPACT)
        ================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-normal text-slate-500 dark:text-[#999999] text-center sm:text-right">
          
          <div className="flex items-center gap-1.5">
            <span>© 2026</span>
            <span className="font-extrabold text-slate-800 dark:text-white">جرين فارم ماركت</span>
            <span>- جميع الحقوق محفوظة.</span>
          </div>

          {/* Quick Legal Links */}
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <Link to="/about" className="hover:text-emerald-600 dark:hover:text-[#25D5AB] transition">
              عن المنصة
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-[#25D5AB] transition">
              سياسة الخصوصية
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-emerald-600 dark:hover:text-[#25D5AB] transition">
              الشروط والأحكام
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
