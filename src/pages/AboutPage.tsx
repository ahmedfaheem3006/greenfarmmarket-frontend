import React from 'react';
import logoImg from '../assets/brand/green-farm-market-logo.jpeg';
import { Badge } from '../components/ui/Badge';
import { BrandName } from '../components/common/BrandName';
import {
  Building2,
  Compass,
  Shield,
  Target,
  Award,
  Globe,
  Zap,
  Leaf,
  Stethoscope,
  Store,
  Truck,
  Briefcase,
  Newspaper,
  CheckCircle2,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  Layers,
  Users,
  Code2,
  Lock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 select-none">
      {/* ==================================================
          1. Hero Header Banner (Borderless Logo & Tricolor RGB Theme)
      ================================================== */}
      <div
        className="bg-surface/95 backdrop-blur-md border-2 border-borderColor p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden isolate"
        style={{ borderRadius: '14px' }}
      >
        {/* Glowing RGB Ambient Background Circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-green-soft/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue-soft/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-red-soft/40 rounded-full blur-3xl pointer-events-none" />

        {/* Completely Borderless Logo */}
        <div className="relative z-10">
          <img
            src={logoImg}
            alt="شعار جرين فارم ماركت"
            className="w-28 h-28 sm:w-36 sm:h-36 mx-auto object-contain border-0 outline-none drop-shadow-md"
          />
        </div>

        <div className="space-y-4 max-w-4xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
            <Badge variant="green" className="py-1 px-4 text-xs font-black">
              🟢 الزراعة والسوق المباشر
            </Badge>
            <Badge variant="blue" className="py-1 px-4 text-xs font-black">
              🔵 النقل الذكي وسلاسل التوريد
            </Badge>
            <Badge variant="red" className="py-1 px-4 text-xs font-black">
              🔴 دكتور AI للإنذار المبكر
            </Badge>
          </div>

          <div className="py-2">
            <BrandName lang="both" className="text-2xl sm:text-4xl lg:text-[2.6rem] justify-center" />
          </div>

          <p className="text-sm sm:text-base text-text-secondary max-w-3xl mx-auto font-bold leading-relaxed">
            المنصة التكنولوجية الأولى بالشرق الأوسط التي تدمج بين <span className="text-brand-green">التجارة المباشرة</span>، و<span className="text-brand-blue">الخدمات اللوجستية الذكية</span>، و<span className="text-brand-red">تشخيص أمراض النباتات والحيوانات بالذكاء الاصطناعي</span> لإحداث ثورة رقمية مستدامة بالقطاع الزراعي.
          </p>
        </div>
      </div>

      {/* ==================================================
          2. Platform Highlights Bar (RGB Metrics)
      ================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-surface/95 border-2 border-brand-green/30 p-5 text-right space-y-1 shadow-lg bg-brand-green-soft/20"
          style={{ borderRadius: '14px' }}
        >
          <div className="flex items-center justify-between text-brand-green">
            <Store className="w-6 h-6" />
            <span className="text-2xl font-black">100%</span>
          </div>
          <h3 className="text-xs font-black text-text-primary">تجارة مباشرة</h3>
          <p className="text-[11px] text-text-secondary font-bold">إلغاء حلقة الوسطاء وتعظيم الأرباح</p>
        </div>

        <div
          className="bg-surface/95 border-2 border-brand-blue/30 p-5 text-right space-y-1 shadow-lg bg-brand-blue-soft/20"
          style={{ borderRadius: '14px' }}
        >
          <div className="flex items-center justify-between text-brand-blue">
            <Truck className="w-6 h-6" />
            <span className="text-2xl font-black">27+</span>
          </div>
          <h3 className="text-xs font-black text-text-primary">محافظة مغطاة</h3>
          <p className="text-[11px] text-text-secondary font-bold">شحن لوجستي مؤمن وتتبع جغرافي</p>
        </div>

        <div
          className="bg-surface/95 border-2 border-brand-red/30 p-5 text-right space-y-1 shadow-lg bg-brand-red-soft/20"
          style={{ borderRadius: '14px' }}
        >
          <div className="flex items-center justify-between text-brand-red">
            <Stethoscope className="w-6 h-6" />
            <span className="text-2xl font-black">AI 24/7</span>
          </div>
          <h3 className="text-xs font-black text-text-primary">صيدلية ذكية</h3>
          <p className="text-[11px] text-text-secondary font-bold">تشخيص فوري وعلاج من الكاميرا</p>
        </div>

        <div
          className="bg-surface/95 border-2 border-amber-500/30 p-5 text-right space-y-1 shadow-lg bg-amber-500/10"
          style={{ borderRadius: '14px' }}
        >
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <Briefcase className="w-6 h-6" />
            <span className="text-2xl font-black">مجاني</span>
          </div>
          <h3 className="text-xs font-black text-text-primary">سوق التوظيف</h3>
          <p className="text-[11px] text-text-secondary font-bold">ربط المزارعين بالمهندسين والعمالة</p>
        </div>
      </div>

      {/* ==================================================
          3. Company Identity, Vision & Mission (Green, Blue, Red Themes)
      ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview (Green) */}
        <div
          className="bg-surface border-2 border-borderColor p-7 space-y-4 shadow-xl text-right flex flex-col justify-between"
          style={{ borderRadius: '14px' }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-brand-green-soft text-brand-green border border-brand-green/30">
                <Building2 className="w-6 h-6" />
              </span>
              <div>
                <Badge variant="green">التأسيس والهوية</Badge>
                <h2 className="text-lg font-black text-text-primary mt-1">عن الشركة</h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-bold">
              تعد <strong className="text-brand-green">Green Farm Market</strong> شركة ناشئة متكاملة تهدف لإحداث ثورة رقمية في القطاع الزراعي والحيواني عبر دمج التكنولوجيا المتقدمة بالخدمات اللوجستية، وتوفير سوق رقمي مفتوح يربط جميع أطراف المزارع والمنتجين والتجار.
            </p>
          </div>
        </div>

        {/* Vision (Blue) */}
        <div
          className="bg-surface border-2 border-brand-blue/40 p-7 space-y-4 shadow-xl text-right flex flex-col justify-between bg-brand-blue-soft/10"
          style={{ borderRadius: '14px' }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-brand-blue-soft text-brand-blue border border-brand-blue/30">
                <Target className="w-6 h-6" />
              </span>
              <div>
                <Badge variant="blue">رؤيتنا 2028</Badge>
                <h2 className="text-lg font-black text-text-primary mt-1">الرؤية الاستراتيجية</h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-bold">
              أن نصبح المنصة الرقمية الأولى بالشرق الأوسط وأفريقيا لإدارة المزارع ذكياً، وترشيد الموارد المائية، وتقديم غطاء شامل للتسويق والخدمات اللوجستية المؤمنة.
            </p>
          </div>
        </div>

        {/* Mission (Red) */}
        <div
          className="bg-surface border-2 border-brand-red/40 p-7 space-y-4 shadow-xl text-right flex flex-col justify-between bg-brand-red-soft/10"
          style={{ borderRadius: '14px' }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="p-3 rounded-xl bg-brand-red-soft text-brand-red border border-brand-red/30">
                <Compass className="w-6 h-6" />
              </span>
              <div>
                <Badge variant="red">رسالتنا التشغيلية</Badge>
                <h2 className="text-lg font-black text-text-primary mt-1">الرسالة والأثر</h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-bold">
              تقديم حلول تقنية مبتكرة تساعد في تطوير القطاع الزراعي، وتحسين الإنتاجية وتكسير الوساطة، وتمكين أصحاب المزارع والمستثمرين والعمالة تقنياً.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          4. Corporate Core Values
      ================================================== */}
      <div
        className="bg-surface border-2 border-borderColor p-8 space-y-6 shadow-xl text-right"
        style={{ borderRadius: '14px' }}
      >
        <div className="border-b border-borderColor pb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-green" /> القيم المؤسسية (Corporate Core Values)
          </h3>
          <Badge variant="neutral">دعامة النجاح المستدام</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              title: '1. الابتكار التقني',
              color: 'text-brand-green',
              bg: 'bg-brand-green-soft/30 border-brand-green/30',
              desc: 'تطوير أدوات تشخيصية بالذكاء الاصطناعي وخوارزميات الرؤية الحاسوبية الدقيقة.',
            },
            {
              title: '2. الشفافية المطلقة',
              color: 'text-brand-blue',
              bg: 'bg-brand-blue-soft/30 border-brand-blue/30',
              desc: 'بناء الثقة التجارية وتتبع الشحنات والمعاملات بين البائع والمشتري والسائق.',
            },
            {
              title: '3. الجودة المعتمدة',
              color: 'text-brand-red',
              bg: 'bg-brand-red-soft/30 border-brand-red/30',
              desc: 'تقديم استشارات بيطرية وزراعية موثوقة وفحص ميداني بأعلى معايير السلامة.',
            },
            {
              title: '4. الاستدامة البيئية',
              color: 'text-amber-600 dark:text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/30',
              desc: 'ترشيد استهلاك المياه، تقليل الانبعاثات الكربونية للشحن، وتنمية الريف.',
            },
          ].map((val, i) => (
            <div
              key={i}
              className={`p-5 border space-y-2 text-right ${val.bg}`}
              style={{ borderRadius: '14px' }}
            >
              <h4 className={`text-sm font-black ${val.color}`}>{val.title}</h4>
              <p className="text-xs text-text-secondary font-bold leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================
          5. Strategic Goals (الأهداف الاستراتيجية الـ 5)
      ================================================== */}
      <div
        className="bg-surface border-2 border-borderColor p-8 space-y-6 shadow-xl text-right"
        style={{ borderRadius: '14px' }}
      >
        <div className="space-y-1 border-b border-borderColor pb-4">
          <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-green" /> الأهداف الاستراتيجية الخمسة (Strategic Goals)
          </h3>
          <p className="text-xs text-text-secondary font-bold">خطة العمل الاستثمارية والتنموية على المدى القريب والبعيد</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
          {[
            {
              num: '01',
              title: 'تمكين الاقتصاد الرقمي الزراعي (Ag-Tech Empowerment)',
              color: 'text-brand-green',
              desc: 'إعادة هيكلة الاقتصاد الزراعي التقليدي عبر دمج حلول الذكاء الاصطناعي والتحول الرقمي لتقليل هدر المحاصيل بنسبة لا تقل عن 30%.',
            },
            {
              num: '02',
              title: 'تحقيق الاستدامة وحماية الموارد (Sustainability First)',
              color: 'text-brand-blue',
              desc: 'التركيز على تقليل الهدر المائي وإدارة التربة بشكل علمي ومؤتمت بناءً على قراءات الحساسات الجوية، مما يرفع كفاءة المياه بنسبة 40%.',
            },
            {
              num: '03',
              title: 'ترسيخ الاعتمادية والشفافية التجارية (Market Credibility)',
              color: 'text-brand-red',
              desc: 'بناء سوق تجاري موثوق يضمن شفافية التعاملات وتتبع الرحلات اللوجستية وتأمين المستحقات المالية لكل الأطراف.',
            },
            {
              num: '04',
              title: 'تعزيز الاستثمار وحماية الأصول (Investment Defense)',
              color: 'text-amber-600 dark:text-amber-400',
              desc: 'جذب المستثمرين والمغتربين للاستثمار الزراعي والحيواني مع توفير غطاء قانوني وإداري صارم يضمن حقوق كافة الأطراف.',
            },
            {
              num: '05',
              title: 'التنمية المستدامة للأيدي العاملة المصرية (Empowering Labor Force)',
              color: 'text-purple-600 dark:text-purple-400',
              desc: 'خلق مجتمع ريفي متكامل يدمج التكنولوجيا بالمهارات البشرية من خلال ملتقى توظيف مجاني لربط المهندسين والعمال بالمزارع.',
            },
          ].map((goal) => (
            <div
              key={goal.num}
              className="p-6 rounded-2xl bg-surface-muted/80 border border-borderColor space-y-2 relative overflow-hidden text-right"
              style={{ borderRadius: '14px' }}
            >
              <span className={`absolute left-4 top-4 text-3xl font-black opacity-20 ${goal.color}`}>{goal.num}</span>
              <h4 className={`font-black text-sm sm:text-base leading-snug ${goal.color}`}>{goal.title}</h4>
              <p className="text-text-secondary font-bold text-xs sm:text-sm leading-relaxed pt-1">{goal.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================
          6. The 5 Core Systems & Services (المنظومة الخماسية)
      ================================================== */}
      <div
        className="bg-surface border-2 border-borderColor p-8 space-y-6 shadow-xl text-right"
        style={{ borderRadius: '14px' }}
      >
        <div className="border-b border-borderColor pb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-green" /> المنظومة التشغيلية والخدمات الخمس
          </h3>
          <Badge variant="green">منظومة شاشات متكاملة</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-6 bg-brand-green-soft/10 border-2 border-brand-green/30 space-y-3" style={{ borderRadius: '14px' }}>
            <Store className="w-8 h-8 text-brand-green" />
            <h4 className="font-black text-brand-green text-base">1. سوق البيع والشراء المباشر</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              منصة موثوقة لبيع وشراء المواشي، الأشجار والشتلات، المحاصيل، قطع الغيار، الأسمدة والأعلاف بدون وسطاء.
            </p>
          </div>

          <div className="p-6 bg-brand-blue-soft/10 border-2 border-brand-blue/30 space-y-3" style={{ borderRadius: '14px' }}>
            <Truck className="w-8 h-8 text-brand-blue" />
            <h4 className="font-black text-brand-blue text-base">2. الخدمات اللوجستية والنقل الذكي</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              تسهيل طلب وعرض سيارات النقل والتوصيل السريع للمحاصيل والمواشي مع تتبع الرحلات والتأمين الشامل.
            </p>
          </div>

          <div className="p-6 bg-brand-red-soft/10 border-2 border-brand-red/30 space-y-3" style={{ borderRadius: '14px' }}>
            <Stethoscope className="w-8 h-8 text-brand-red" />
            <h4 className="font-black text-brand-red text-base">3. صيدلية AI للنبات والحيوان</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              تشخيص آلي فوري لأمراض النباتات والماشية عبر كاميرا الهاتف بالذكاء الاصطناعي مع تقديم العلاج والوقاية.
            </p>
          </div>

          <div className="p-6 bg-amber-500/10 border-2 border-amber-500/30 space-y-3" style={{ borderRadius: '14px' }}>
            <Briefcase className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            <h4 className="font-black text-amber-600 dark:text-amber-400 text-base">4. ملتقى الوظائف الزراعية</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              بوابة توظيف مجانية تجمع أصحاب المزارع بالعمالة والمهندسين الزراعيين والأطباء البيطريين.
            </p>
          </div>

          <div className="p-6 bg-purple-500/10 border-2 border-purple-500/30 space-y-3 md:col-span-2" style={{ borderRadius: '14px' }}>
            <Newspaper className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <h4 className="font-black text-purple-600 dark:text-purple-400 text-base">5. الشاشة الإخبارية وبورصة الأسعار</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              متابعة لحظية لأسعار الحبوب والمواشي والطقس الزراعي مع نشرات إخبارية مدعومة بملخصات الذكاء الاصطناعي.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          7. Strategic Roadmap (2026 - 2028)
      ================================================== */}
      <div
        className="bg-surface border-2 border-borderColor p-8 space-y-6 shadow-xl text-right"
        style={{ borderRadius: '14px' }}
      >
        <div className="border-b border-borderColor pb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-text-primary flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-green" /> خارطة الطريق والتوسع الاستراتيجي (Roadmap)
          </h3>
          <Badge variant="blue">خطوات التنفيذ</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          <div className="p-6 bg-brand-green-soft/20 border-2 border-brand-green/40 space-y-2" style={{ borderRadius: '14px' }}>
            <span className="text-3xl font-black text-brand-green block">2026</span>
            <h4 className="font-black text-text-primary text-base">الانطلاقة والانتشار بمصر</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              التوسع بكافة المحافظات المصرية وتشجيع صغار وكبار المزارعين للانضمام للمنظومة الرقمية.
            </p>
          </div>

          <div className="p-6 bg-brand-blue-soft/20 border-2 border-brand-blue/40 space-y-2" style={{ borderRadius: '14px' }}>
            <span className="text-3xl font-black text-brand-blue block">2027</span>
            <h4 className="font-black text-text-primary text-base">التوسع العربي والإقليمي</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              تصدير النموذج الرقمي للدول العربية المجاورة لإعادة إخضار الأراضي وتسهيل التبادل التجاري.
            </p>
          </div>

          <div className="p-6 bg-brand-red-soft/20 border-2 border-brand-red/40 space-y-2" style={{ borderRadius: '14px' }}>
            <span className="text-3xl font-black text-brand-red block">2028</span>
            <h4 className="font-black text-text-primary text-base">الريادة بفريقيا والشرق الأوسط</h4>
            <p className="text-text-secondary font-bold leading-relaxed">
              أن نكون المركز الإقليمي الأول للحلول الزراعية واللوجستية المدعومة بالذكاء الاصطناعي.
            </p>
          </div>
        </div>
      </div>

      {/* ==================================================
          8. Tech Stack & Official Contact Details
      ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tech Stack */}
        <div
          className="lg:col-span-7 bg-surface border-2 border-borderColor p-7 space-y-4 shadow-xl text-right"
          style={{ borderRadius: '14px' }}
        >
          <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-borderColor pb-3">
            <Code2 className="w-5 h-5 text-brand-green" /> البنية التقنية (Tech Stack)
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary font-bold leading-relaxed">
            تم بناء المنصة باستخدام أحدث التقنيات التقنية المعاصرة:
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {['React', 'TypeScript', 'Node.js', 'FastAPI', 'Python AI', 'PostgreSQL', 'Prisma ORM', 'Computer Vision', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
              <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-black bg-surface-muted border border-borderColor text-text-primary">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Official Contacts */}
        <div
          className="lg:col-span-5 bg-surface border-2 border-borderColor p-7 space-y-4 shadow-xl text-right"
          style={{ borderRadius: '14px' }}
        >
          <h3 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-borderColor pb-3">
            <Phone className="w-5 h-5 text-brand-green" /> بيانات التواصل الرسمية
          </h3>
          <div className="space-y-3 text-xs sm:text-sm font-bold text-text-primary">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-brand-blue" />
              <span>info@greenfarmmarket.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-brand-green" />
              <span dir="ltr">01099856661</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-brand-red" />
              <a href="https://greenfarmmarket.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-brand-blue">
                https://greenfarmmarket.com/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
