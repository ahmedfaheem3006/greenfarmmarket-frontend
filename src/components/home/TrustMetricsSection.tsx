import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaUsers,
  FaClipboardCheck,
  FaAward,
  FaSeedling,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { BorderGlow } from '../ui/BorderGlow';

interface MetricItem {
  id: string;
  numberValue: number;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  icon: IconType;
  accentColor: string;
  iconBg: string;
  iconBorder: string;
  waveColor: string;
  isRedAccent?: boolean;
}

const METRICS_DATA: MetricItem[] = [
  {
    id: 'happy-clients',
    numberValue: 6,
    prefix: '+',
    suffix: 'k',
    title: 'عملاء سعداء',
    description: 'ثقة آلاف المزارعين والمستثمرين',
    icon: FaUsers,
    accentColor: 'text-[#be1622]',
    iconBg: 'bg-[#be1622]/10',
    iconBorder: 'border-[#be1622]/40 shadow-[0_0_15px_rgba(190,22,34,0.25)]',
    waveColor: '#be1622',
    isRedAccent: true,
  },
  {
    id: 'processed-orders',
    numberValue: 80,
    prefix: '',
    suffix: 'k',
    title: 'إتمام معالجة',
    description: 'مشروع وطلب مكتمل بنجاح',
    icon: FaClipboardCheck,
    accentColor: 'text-emerald-700 dark:text-[#25D5AB]',
    iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/10',
    iconBorder: 'border-emerald-600/30 dark:border-[#25D5AB]/40 shadow-[0_0_15px_rgba(37,213,171,0.2)]',
    waveColor: '#059669',
  },
  {
    id: 'years-experience',
    numberValue: 25,
    prefix: '',
    suffix: '',
    title: 'سنة خبرة',
    description: 'خبرة طويلة في القطاع الزراعي',
    icon: FaAward,
    accentColor: 'text-[#be1622]',
    iconBg: 'bg-[#be1622]/10',
    iconBorder: 'border-[#be1622]/40 shadow-[0_0_15px_rgba(190,22,34,0.25)]',
    waveColor: '#be1622',
    isRedAccent: true,
  },
  {
    id: 'popular-services',
    numberValue: 150,
    prefix: '',
    suffix: '',
    title: 'خدمة شائعة',
    description: 'حلول متكاملة لكل احتياجاتك',
    icon: FaSeedling,
    accentColor: 'text-emerald-700 dark:text-[#25D5AB]',
    iconBg: 'bg-emerald-500/10 dark:bg-[#25D5AB]/10',
    iconBorder: 'border-emerald-600/30 dark:border-[#25D5AB]/40 shadow-[0_0_15px_rgba(37,213,171,0.2)]',
    waveColor: '#059669',
  },
];

// Smooth Animated Counter Component
const Counter: React.FC<{
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}> = ({ value, prefix = '', suffix = '', inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000; // 2 seconds smooth count-up
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Smooth easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.round(start + (value - start) * easeProgress);

      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(value);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="tabular-nums tracking-tight font-almarai font-extrabold" dir="ltr">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const TrustMetricsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section className="relative w-full max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10" dir="rtl">
      {/* Outer Container (Matching Reference Image) */}
      <div
        ref={sectionRef}
        className="relative w-full rounded-[24px] bg-[#f8fafc]/90 dark:bg-[#0d1119] border border-slate-200/90 dark:border-[#25D5AB]/25 shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-[#00040d] p-5 sm:p-7 lg:p-10 overflow-hidden transition-all duration-300 backdrop-blur-md"
      >
        {/* Soft Ambient Corner Glows in Dark Mode */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#25D5AB]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#00C896]/10 rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* HEADER AREA: Title with Minimal Leaf Ornaments & Subtitle */}
        {/* ========================================================================= */}
        <div className="text-center space-y-2.5 relative z-10 max-w-2xl mx-auto mb-8 sm:mb-10">
          
          {/* Centered Heading with Decorative Leaf Line */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
            {/* Right Leaf Ornament */}
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D5AB]" />
              <svg className="w-4 h-4 text-[#25D5AB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L9 9C6 10 3 13 3 17C3 20 6 22 10 22C14 22 21 19 21 12C21 7 17 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2C12 7 10 12 7 16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-almarai font-extrabold text-[#12252f] dark:text-[#ffffff] tracking-tight">
              بأرقامنا نحقق الثقة
            </h2>

            {/* Left Leaf Ornament */}
            <div className="flex items-center gap-1.5 opacity-80">
              <svg className="w-4 h-4 text-[#25D5AB] -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L9 9C6 10 3 13 3 17C3 20 6 22 10 22C14 22 21 19 21 12C21 7 17 2 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2C12 7 10 12 7 16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D5AB]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-almarai font-normal text-[#667085] dark:text-[#999999]">
            نواصل النمو لنقدم لك أفضل تجربة زراعية رقمية
          </p>
        </div>

        {/* ========================================================================= */}
        {/* STATISTICS GRID: ALL 4 CARDS SIDE-BY-SIDE IN ONE ROW (Desktop & Tablet) */}
        {/* ========================================================================= */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-stretch">
          {METRICS_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connecting Dot between cards on Desktop (RTL side) */}
                {index > 0 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 lg:-right-3 -translate-y-1/2 items-center pointer-events-none z-20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D5AB]/60 dark:bg-[#25D5AB]/80" />
                  </div>
                )}

                <BorderGlow
                  edgeSensitivity={30}
                  borderRadius={20}
                  glowRadius={40}
                  glowIntensity={1.1}
                  colors={
                    item.isRedAccent
                      ? ['#be1622', '#f43f5e', '#fb7185']
                      : ['#00C896', '#25D5AB', '#6EE7B7']
                  }
                  className="h-full shadow-xs hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 bg-white dark:bg-[#0d1119] hover:bg-slate-50/50 dark:hover:bg-[#121824] transition-all duration-300 select-none h-full">
                    {/* 1. Circular Icon Container */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 rounded-full ${item.iconBg} ${item.accentColor} border ${item.iconBorder} flex items-center justify-center mb-3.5 sm:mb-4 transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* 2. Animated Number Counter */}
                    <div className={`text-2xl sm:text-3xl lg:text-[2.4rem] font-almarai font-extrabold ${item.accentColor} leading-none mb-1.5 sm:mb-2 tracking-tight`}>
                      <Counter
                        value={item.numberValue}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        inView={isInView}
                      />
                    </div>

                    {/* 3. Title */}
                    <h3 className="text-sm sm:text-base lg:text-[1.05rem] font-almarai font-extrabold text-[#12252f] dark:text-[#ffffff] mb-1">
                      {item.title}
                    </h3>

                    {/* 4. Description */}
                    <p className="text-[11px] sm:text-xs font-almarai font-normal text-[#667085] dark:text-[#999999] leading-relaxed max-w-[170px]">
                      {item.description}
                    </p>

                    {/* 5. Delicate Smooth Wavy Line Under Each Item */}
                    <div className="mt-auto pt-3.5 sm:pt-4 w-full flex justify-center">
                      <svg
                        viewBox="0 0 100 12"
                        className="w-16 sm:w-20 lg:w-22 h-2.5 sm:h-3 overflow-visible transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                      >
                        <path
                          d="M 0 6 Q 25 0 50 6 T 100 6"
                          fill="none"
                          stroke={item.waveColor}
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Status Pagination Dots (As in reference image) */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-1.5 sm:gap-2 relative z-10">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
          <span className="w-5 sm:w-6 h-1.5 sm:h-2 rounded-full bg-[#25D5AB]" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

      </div>
    </section>
  );
};
