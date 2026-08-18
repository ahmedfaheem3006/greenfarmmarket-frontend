import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBg from '../assets/Hero.png';
import { HeroWorkflowAnimation } from '../components/hero/HeroWorkflowAnimation';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { HoverEffect, HoverEffectItem } from '../components/ui/card-hover-effect';
import {
  ArrowLeft,
  BarChart3,
  Briefcase,
  Check,
  CheckCircle2,
  Leaf,
  MapPin,
  Newspaper,
  ScanLine,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Store,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

const services: HoverEffectItem[] = [
  {
    id: 'market', title: 'السوق الزراعي', subtitle: 'بيع وشراء مباشر',
    description: 'اعرض المحاصيل والمواشي والشتلات، وتواصل مباشرة مع المشترين دون حلقات معقدة.',
    actionText: 'استكشف السوق', link: '/marketplace', icon: Store, badgeVariant: 'green', accentBg: '', glowColor: '#4FCB7A',
  },
  {
    id: 'transport', title: 'النقل واللوجستيات', subtitle: 'شاحنات وطلبات نقل',
    description: 'اعرض أو اطلب سيارة نقل، وحدد خط السير ونوع الشحنة قبل التواصل المباشر.',
    actionText: 'اطلب خدمة نقل', link: '/transport', icon: Truck, badgeVariant: 'blue', accentBg: '', glowColor: '#54B7C2',
  },
  {
    id: 'jobs', title: 'الوظائف الزراعية', subtitle: 'فرص وكوادر موثوقة',
    description: 'مساحة تجمع أصحاب المزارع بالمهندسين والفنيين والعمالة الزراعية المتخصصة.',
    actionText: 'تصفح الفرص', link: '/jobs', icon: Briefcase, badgeVariant: 'amber', accentBg: '', glowColor: '#D3A84E',
  },
  {
    id: 'ai-doctor', title: 'دكتور النبات والحيوان', subtitle: 'تشخيص بالذكاء الاصطناعي',
    description: 'ابدأ باستفسار نصي أو ارفع صورة أو فيديو للحصول على قراءة أولية وإرشادات مناسبة.',
    actionText: 'ابدأ الفحص', link: '/ai-doctor', icon: Stethoscope, badgeVariant: 'red', accentBg: '', glowColor: '#D96C82',
  },
  {
    id: 'news', title: 'البورصة والنشرة', subtitle: 'أسعار ومناخ ومعرفة',
    description: 'تابع حركة الأسعار والتنبيهات المناخية وأهم الأخبار المؤثرة على نشاطك الزراعي.',
    actionText: 'تابع النشرة', link: '/news', icon: Newspaper, badgeVariant: 'neutral', accentBg: '', glowColor: '#9A7AC2',
  },
];

const journeySteps = [
  { number: '01', title: 'أنشئ حسابك', description: 'سجّل بياناتك الأساسية وحدد صفتك داخل القطاع الزراعي.', icon: Users },
  { number: '02', title: 'اختر الخدمة', description: 'ادخل إلى السوق أو النقل أو الوظائف أو التشخيص الذكي.', icon: Sprout },
  { number: '03', title: 'تواصل واتخذ القرار', description: 'راجع التفاصيل ثم تواصل مباشرة مع الطرف المناسب لنشاطك.', icon: CheckCircle2 },
];

const impactItems = [
  { title: 'تحول رقمي عملي', description: 'أدوات سهلة تساعد على التشخيص واتخاذ القرار.', icon: ScanLine },
  { title: 'سلسلة توريد أقصر', description: 'وصول مباشر يحد من الحلقات الوسيطة والفاقد.', icon: TrendingUp },
  { title: 'تمكين المنتجين', description: 'سوق وخدمات وفرص عمل داخل منظومة واحدة.', icon: Users },
  { title: 'استخدام أكثر كفاءة', description: 'معرفة أفضل لدعم استهلاك واعٍ للمياه والمدخلات.', icon: Leaf },
  { title: 'بيانات تخدم السوق', description: 'متابعة منظمة للأسعار والمناخ وحركة النشاط.', icon: BarChart3 },
];

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

export const HomePage: React.FC = () => (
  <div className="overflow-hidden">
    <section className="relative isolate overflow-hidden border-b border-borderColor/70">
      <div className="absolute inset-0 -z-20">
        <img src={heroBg} alt="مزرعة حديثة" className="h-full w-full object-cover object-center opacity-[0.14] saturate-50" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(6,17,12,.98)_0%,rgba(6,17,12,.88)_48%,rgba(6,17,12,.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-14">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="lg:col-span-7 text-right">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green-soft px-4 py-2 text-xs font-bold text-brand-green-dark">
              <span className="h-2 w-2 rounded-full bg-brand-green" /> منصة زراعية رقمية تربط كل أطراف السوق
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-3xl text-4xl font-black leading-[1.35] tracking-[-0.035em] text-text-primary sm:text-5xl lg:text-[3.65rem]">
              كل ما يحتاجه نشاطك الزراعي
              <span className="mt-1 block text-brand-green-dark">في مكان واحد</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-sm font-medium leading-[2] text-text-secondary sm:text-base">
              سوق مباشر، نقل ولوجستيات، فرص عمل، تشخيص ذكي، ومتابعة للأسعار والمناخ؛ منظومة واحدة تساعد المزارعين والمستثمرين ومربي المواشي على العمل بوضوح وكفاءة.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <Link to="/marketplace"><Button variant="green" size="lg">استكشف السوق <ArrowLeft className="h-4 w-4" /></Button></Link>
              <Link to="/register"><Button variant="outline" size="lg">إنشاء حساب</Button></Link>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-borderColor/70 pt-6 text-xs font-semibold text-text-secondary">
              <span className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> تواصل مباشر</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-green" /> حسابات قابلة للتوثيق</span>
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-green" /> خدمات حسب موقعك</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.12 }} className="lg:col-span-5">
            <HeroWorkflowAnimation />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading eyebrow="خدمات المنصة" title="ابدأ من الخدمة التي تحتاجها" description="خمس بوابات أساسية بتجربة بسيطة وواضحة، من العرض والطلب وحتى المتابعة والتشخيص." />
        <div className="mt-10"><HoverEffect items={services} /></div>
      </div>
    </section>

    <section className="border-y border-borderColor/70 bg-surface/45 py-16 sm:py-20">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 text-right">
            <span className="text-xs font-black text-brand-green">تجربة واضحة من البداية</span>
            <h2 className="mt-3 text-3xl font-black leading-[1.5] text-text-primary sm:text-4xl">من احتياجك إلى التواصل في ثلاث خطوات</h2>
            <p className="mt-4 max-w-xl text-sm leading-[1.9] text-text-secondary">صممنا المنصة لتكون مفهومة من أول زيارة، بدون شاشات مزدحمة أو خطوات غير ضرورية.</p>
            <Link to="/register" className="mt-7 inline-flex items-center gap-2 text-sm font-black text-brand-green-dark transition hover:gap-3">أنشئ حسابك الآن <ArrowLeft className="h-4 w-4" /></Link>
          </div>

          <div className="lg:col-span-7 grid gap-4">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="group flex items-center gap-4 rounded-3xl border border-borderColor bg-surface p-5 text-right transition hover:border-brand-green/35">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-green-soft text-brand-green"><Icon className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><span className="text-[10px] font-black text-brand-green">{step.number}</span><h3 className="text-sm font-black text-text-primary">{step.title}</h3></div>
                    <p className="mt-1 text-xs leading-relaxed text-text-secondary">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading eyebrow="أثر المنصة" title="تقنية تخدم العمل الزراعي الحقيقي" description="نركز على نتائج عملية: وصول أفضل للسوق، قرارات أوضح، واستخدام أكفأ للموارد." />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {impactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-3xl border border-borderColor bg-surface p-5 text-right">
                <Icon className="h-5 w-5 text-brand-green" />
                <h3 className="mt-4 text-sm font-black text-text-primary">{item.title}</h3>
                <p className="mt-2 text-xs leading-[1.8] text-text-secondary">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-[28px] border border-brand-green/20 bg-surface px-6 py-10 text-center sm:px-10 sm:py-14">
          <div className="absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />
          <h2 className="text-2xl font-black text-text-primary sm:text-3xl">ابدأ بخطوة بسيطة نحو إدارة زراعية أذكى</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">أنشئ حسابك وحدد صفتك لتصل إلى الخدمات والفرص الأقرب إلى احتياجك.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/register"><Button variant="green" size="md">إنشاء حساب جديد</Button></Link>
            <Link to="/about"><Button variant="outline" size="md">تعرف على المنصة</Button></Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);
