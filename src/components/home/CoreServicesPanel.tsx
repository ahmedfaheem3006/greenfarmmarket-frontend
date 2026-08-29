import React from 'react';
import { Link } from 'react-router-dom';
import { SpiderwebMeshAnimation } from './SpiderwebMeshAnimation';
import {
  FaShop,
  FaTruckFast,
  FaUserTie,
  FaUserDoctor,
  FaChartLine,
  FaCircleCheck,
  FaChevronLeft,
  FaSuitcaseMedical,
  FaSatelliteDish,
  FaNewspaper,
  FaWheatAwn,
  FaBriefcase,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';

export interface CoreServiceGate {
  id: string;
  screenNumber: string;
  category: string;
  time: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  icon: IconType;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  sideAccentBorder: string;
  checkBg: string;
  checkColor: string;
  statusBadge: string;
  tagColor: string;
  badgeIcon?: IconType;
}

const CORE_SERVICES: CoreServiceGate[] = [
  {
    id: 'marketplace',
    screenNumber: 'الشاشة الأولى',
    category: 'السوق الزراعي المباشر',
    time: 'تداول لحظي',
    title: 'سوق البيع والشراء للمحاصيل والمواشي والمعدات',
    subtitle: 'بوابة مباشرة لبيع وشراء المحاصيل والمواشي والشتلات ومستلزمات الإنتاج دون حلقات وسيطة.',
    description: 'عرض وطلب مباشر يرفع هامش ربح المزارع بنسبة تصل إلى 25% مع ضمان أمان التعاملات.',
    link: '/marketplace',
    icon: FaShop,
    accentColor: 'text-emerald-700 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30',
    accentBorder: 'border-emerald-300/80 dark:border-emerald-500/30 group-hover:border-emerald-500',
    sideAccentBorder: 'border-r-4 border-r-emerald-500',
    checkBg: 'bg-emerald-600 dark:bg-emerald-500 text-white',
    checkColor: 'text-white',
    statusBadge: 'تداول مباشر',
    tagColor: 'text-emerald-700 dark:text-emerald-400',
    badgeIcon: FaWheatAwn,
  },
  {
    id: 'transport',
    screenNumber: 'الشاشة الثانية',
    category: 'الخدمات اللوجستية والشحن',
    time: 'تتبع حي GPS',
    title: 'منظومة النقل الذكي وسلاسل التوريد المباشرة',
    subtitle: 'توصيل الشحنات الزراعية والمواشي بخيارات: نقل فقط | نقل ودفع آمن | نقل وكشف جودة.',
    description: 'تتبع حي عبر الأقمار الصناعية GPS مع تأمين شامل 100% للشحنة أثناء النقل بين المحافظات.',
    link: '/transport',
    icon: FaTruckFast,
    accentColor: 'text-sky-700 dark:text-sky-400',
    accentBg: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400 border-sky-300 dark:border-sky-500/30',
    accentBorder: 'border-sky-300/80 dark:border-sky-500/30 group-hover:border-sky-500',
    sideAccentBorder: 'border-r-4 border-r-sky-500',
    checkBg: 'bg-sky-600 dark:bg-sky-500 text-white',
    checkColor: 'text-white',
    statusBadge: 'أسطول جاهز',
    tagColor: 'text-sky-700 dark:text-sky-400',
    badgeIcon: FaSatelliteDish,
  },
  {
    id: 'jobs',
    screenNumber: 'الشاشة الثالثة',
    category: 'ملتقى التوظيف والفرص',
    time: 'فرص يومية',
    title: 'ملتقى التوظيف الزراعي والكوادر التخصصية',
    subtitle: 'ملتقى مجاني متكامل يعرض وظائف المزارع والمهندسين الزراعيين والعمالة الماهرة والخبرات.',
    description: 'ربط أصحاب المزارع والشركات الزراعية بالمهندسين والاستشاريين والفنيين المؤهلين فورياً.',
    link: '/jobs',
    icon: FaUserTie,
    accentColor: 'text-amber-700 dark:text-amber-400',
    accentBg: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-300 dark:border-amber-500/30',
    accentBorder: 'border-amber-300/80 dark:border-amber-500/30 group-hover:border-amber-500',
    sideAccentBorder: 'border-r-4 border-r-amber-500',
    checkBg: 'bg-amber-500 text-slate-950',
    checkColor: 'text-slate-950',
    statusBadge: 'فرص متاحة',
    tagColor: 'text-amber-700 dark:text-amber-400',
    badgeIcon: FaBriefcase,
  },
  {
    id: 'ai-doctor',
    screenNumber: 'الشاشة الرابعة',
    category: 'صيدلية دكتور AI',
    time: 'فحص فوري 24/7',
    title: 'صيدلية وفحص أمراض النبات والمواشي بالذكاء الاصطناعي',
    subtitle: 'فحص وتشخيص أمراض النباتات والمواشي بالذكاء الاصطناعي والرؤية البصرية عبر الكاميرا.',
    description: 'بروتوكولات علاج معتمدة وجرعات مبيدات دقيقة لخفض التكاليف وتجنب خسائر المحاصيل.',
    link: '/ai-doctor',
    icon: FaUserDoctor,
    accentColor: 'text-rose-700 dark:text-rose-400',
    accentBg: 'bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-rose-300 dark:border-rose-500/30',
    accentBorder: 'border-rose-300/80 dark:border-rose-500/30 group-hover:border-rose-500',
    sideAccentBorder: 'border-r-4 border-r-rose-500',
    checkBg: 'bg-rose-600 dark:bg-rose-500 text-white',
    checkColor: 'text-white',
    statusBadge: 'فحص معتمد',
    tagColor: 'text-rose-700 dark:text-rose-400',
    badgeIcon: FaSuitcaseMedical,
  },
  {
    id: 'news',
    screenNumber: 'الشاشة الخامسة',
    category: 'البورصة الزراعية والأخبار',
    time: 'تحديثات حية',
    title: 'بورصة الأسعار اليومية والنشرات المناخية الاستباقية',
    subtitle: 'تحديثات لحظية بأسعار المحاصيل، التحذيرات المناخية الاستباقية، والنشرات التوعوية.',
    description: 'متابعة حركة السوق، قرارات التسمين، ونصائح إدارة الري لتفادي تقلبات الطقس المفاجئة.',
    link: '/news',
    icon: FaChartLine,
    accentColor: 'text-purple-700 dark:text-purple-400',
    accentBg: 'bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400 border-purple-300 dark:border-purple-500/30',
    accentBorder: 'border-purple-300/80 dark:border-purple-500/30 group-hover:border-purple-500',
    sideAccentBorder: 'border-r-4 border-r-purple-500',
    checkBg: 'bg-purple-600 dark:bg-purple-500 text-white',
    checkColor: 'text-white',
    statusBadge: 'مؤشرات حية',
    tagColor: 'text-purple-700 dark:text-purple-400',
    badgeIcon: FaNewspaper,
  },
];

export const CoreServicesPanel: React.FC = () => {
  return (
    <div className="w-full relative" dir="rtl">
      {/* Main Wide Command Dashboard Container */}
      <div className="relative w-full rounded-3xl sm:rounded-[32px] bg-slate-100/90 dark:bg-[#071911]/95 border border-slate-300/80 dark:border-borderColor/80 shadow-2xl p-4 sm:p-6 lg:p-8 overflow-hidden backdrop-blur-xl">
        
        {/* Ambient background glows */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-green-soft/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-blue-soft/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Glowing Spiderweb with EXACTLY 5 Concentric Web Rings in the Background */}
        <SpiderwebMeshAnimation />

        {/* 5 Service Gates Stack */}
        <div className="relative z-10 space-y-3.5 sm:space-y-4">
          {CORE_SERVICES.map((gate) => {
            const MainIcon = gate.icon;
            const BadgeIcon = gate.badgeIcon;
            return (
              <Link
                key={gate.id}
                to={gate.link}
                className={`group relative block w-full bg-white dark:bg-[#0B2318] border border-slate-200/90 dark:border-[#1B4430] ${gate.accentBorder} ${gate.sideAccentBorder} rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-5.5 transition-all duration-300 shadow-md shadow-slate-300/40 dark:shadow-xl hover:shadow-2xl hover:shadow-slate-300/70 hover:-translate-y-1 select-none focus:outline-none focus:ring-2 focus:ring-brand-green/40`}
              >
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r from-transparent via-slate-50/50 dark:via-surface/10 to-brand-green-soft/10" />

                <div className="flex items-center justify-between gap-3 sm:gap-6 relative z-10">
                  
                  {/* Right Side (RTL): Authentic FontAwesome Icon + Texts */}
                  <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                    
                    {/* FontAwesome Large Icon Box */}
                    <div className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl ${gate.accentBg} border flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                      <MainIcon className="w-5 h-5 sm:w-6 sm:h-6 text-current" />
                    </div>

                    {/* Texts Container */}
                    <div className="space-y-1 min-w-0 flex-1">
                      
                      {/* Top Badges Line */}
                      <div className="flex items-center flex-wrap gap-2 text-xs font-ibm">
                        <span className={`font-bold ${gate.tagColor}`}>{gate.category}</span>
                        <span className="text-slate-400 dark:text-text-secondary opacity-60">•</span>
                        <span className="text-slate-600 dark:text-text-secondary font-bold text-[11px] sm:text-xs">{gate.screenNumber}</span>
                        <span className="text-slate-400 dark:text-text-secondary opacity-60 hidden sm:inline">•</span>
                        <span className="text-slate-500 dark:text-text-secondary font-inter text-[11px] hidden sm:inline">{gate.time}</span>
                        <span className="mr-auto hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-ibm font-bold bg-slate-100 dark:bg-surface-muted border border-slate-200 dark:border-borderColor text-slate-700 dark:text-text-secondary shadow-xs">
                          {BadgeIcon && <BadgeIcon className="w-2.5 h-2.5 text-emerald-600 dark:text-brand-green" />}
                          <span>{gate.statusBadge}</span>
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="font-cairo font-black text-sm sm:text-base lg:text-lg text-slate-900 dark:text-[#F0FDF4] tracking-tight leading-snug group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors truncate">
                        {gate.title}
                      </h3>

                      {/* Subtitle / Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-noto font-medium leading-relaxed line-clamp-1 sm:line-clamp-2">
                        {gate.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Left Side (RTL): FontAwesome Checkmark / Action Arrow */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="hidden lg:inline-flex items-center gap-1 text-xs font-ibm font-bold text-slate-500 dark:text-text-secondary group-hover:text-emerald-600 dark:group-hover:text-brand-green transition-colors">
                      دخول البوابة
                      <FaChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                    </span>

                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full ${gate.checkBg} ${gate.checkColor} flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-110`}>
                      <FaCircleCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Live System Indicator Badge */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-borderColor/60 flex items-center justify-between flex-wrap gap-4 relative z-10">
          <div className="flex items-center gap-2.5 bg-white dark:bg-[#0B2318] border border-slate-200 dark:border-borderColor px-4 py-2 rounded-full text-xs font-ibm font-bold text-slate-800 dark:text-text-primary shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-brand-green animate-pulse" />
            <span>منظومة العمليات الرقمية والخدمات الحية</span>
          </div>

          <div className="text-xs font-noto font-medium text-slate-600 dark:text-text-secondary">
            خمس بوابات رقمية متصلة بالذكاء الاصطناعي وسلاسل التوريد المباشرة
          </div>
        </div>

      </div>
    </div>
  );
};
