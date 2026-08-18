import React, { CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LucideIcon, ChevronLeft } from 'lucide-react';

export interface HoverEffectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  icon: LucideIcon;
  badgeVariant: 'green' | 'blue' | 'red' | 'amber' | 'neutral';
  accentBg: string;
  glowColor?: string; // RGB hex for glow effect e.g. #00ffc3, #0095ff, #ff1c52
  actionText: string;
}

interface HoverEffectProps {
  items: HoverEffectItem[];
  className?: string;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 lg:gap-5 py-4 ${className}`} dir="rtl">
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === idx;
        const accent = item.glowColor || '#00FF66';
        const accentStyle = { '--service-accent': accent } as CSSProperties;

        return (
          <Link
            to={item.link}
            key={item.id}
            className="relative group block h-full w-full select-none rounded-[18px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ ...accentStyle, color: accent }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Smooth Aceternity UI Animated Hover Background Pill */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className="absolute inset-0 h-full w-full block -z-0 rounded-[18px]"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${accent}18, transparent 64%)` }}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.2, ease: 'easeIn' },
                  }}
                />
              )}
            </AnimatePresence>

            {/* Main Ultra-Modern Glass Card Container */}
            <div
              className="service-gate-card relative z-10 border p-5 lg:p-5 h-full min-h-[310px] w-full overflow-hidden flex flex-col justify-between gap-5 transition-all duration-300 group-hover:-translate-y-1.5 rounded-[18px]"
              style={accentStyle}
            >
              <div className="absolute top-0 right-5 left-5 neon-rule" style={accentStyle} />
              {/* Top Card Section */}
              <div className="space-y-4 text-right">
                {/* Header Badge & Icon Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                    style={{ color: accent, borderColor: `${accent}55`, backgroundColor: `${accent}12`, boxShadow: `0 0 22px ${accent}18` }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full border text-[10px] font-ibm font-bold shadow-sm tracking-wide"
                    style={{ color: accent, borderColor: `${accent}4d`, backgroundColor: `${accent}12` }}
                  >
                    {item.subtitle}
                  </span>
                </div>

                {/* Card Title (Reverted to distinct brand accent color) */}
                <h3 className="text-lg lg:text-xl font-cairo font-black tracking-tight leading-[1.65] py-1 transition-colors duration-200" style={{ color: accent }}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-text-secondary font-noto font-medium leading-[1.9]">
                  {item.description}
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-3 border-t border-borderColor/70">
                <div
                  className="w-full py-3 px-4 rounded-xl border bg-black/10 text-text-primary text-[11px] font-cairo font-bold flex items-center justify-between transition-all duration-300"
                  style={{ borderColor: `${accent}3d` }}
                >
                  <span className="font-extrabold">{item.actionText}</span>
                  <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
