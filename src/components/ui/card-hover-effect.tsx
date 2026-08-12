import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LucideIcon, ChevronLeft } from 'lucide-react';
import { Badge } from './Badge';

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
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 ${className}`}>
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === idx;

        // Custom accent color map for subtle glow borders and matching title color
        let borderGlowClass = 'border-borderColor hover:border-brand-green/60';
        let backgroundHoverGlow = 'bg-brand-green/10 dark:bg-emerald-950/40';
        let actionBtnHoverClass = 'group-hover:bg-brand-green group-hover:text-white group-hover:border-brand-green shadow-brand-green/20';
        let titleColor = 'text-brand-green';

        if (item.badgeVariant === 'red') {
          borderGlowClass = 'border-borderColor hover:border-brand-red/60';
          backgroundHoverGlow = 'bg-brand-red/10 dark:bg-rose-950/40';
          actionBtnHoverClass = 'group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red shadow-brand-red/20';
          titleColor = 'text-brand-red';
        } else if (item.badgeVariant === 'blue') {
          borderGlowClass = 'border-borderColor hover:border-brand-blue/60';
          backgroundHoverGlow = 'bg-brand-blue/10 dark:bg-sky-950/40';
          actionBtnHoverClass = 'group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue shadow-brand-blue/20';
          titleColor = 'text-brand-blue';
        } else if (item.badgeVariant === 'amber') {
          borderGlowClass = 'border-borderColor hover:border-amber-500/60';
          backgroundHoverGlow = 'bg-amber-500/10 dark:bg-amber-950/40';
          actionBtnHoverClass = 'group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600 shadow-amber-600/20';
          titleColor = 'text-amber-600 dark:text-amber-400';
        } else if (item.badgeVariant === 'neutral') {
          borderGlowClass = 'border-borderColor hover:border-purple-500/60';
          backgroundHoverGlow = 'bg-purple-500/10 dark:bg-purple-950/40';
          actionBtnHoverClass = 'group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 shadow-purple-600/20';
          titleColor = 'text-purple-600 dark:text-purple-400';
        }

        return (
          <Link
            to={item.link}
            key={item.id}
            className="relative group block p-2 h-full w-full select-none"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Smooth Aceternity UI Animated Hover Background Pill */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  className={`absolute inset-0 h-full w-full ${backgroundHoverGlow} block -z-0 backdrop-blur-sm border border-borderColor/40`}
                  style={{ borderRadius: '14px' }}
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
              className={`relative z-10 bg-surface/90 backdrop-blur-md border-2 ${borderGlowClass} p-7 h-full w-full overflow-hidden flex flex-col justify-between space-y-6 transition-all duration-300 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-1.5`}
              style={{ borderRadius: '14px' }}
            >
              {/* Top Card Section */}
              <div className="space-y-5 text-right">
                {/* Header Badge & Icon Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center border-2 transition-transform duration-300 group-hover:scale-110 shadow-md ${item.accentBg}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={item.badgeVariant} className="py-1 px-3.5 text-[11px] font-black shadow-sm">
                    {item.subtitle}
                  </Badge>
                </div>

                {/* Card Title (Reverted to distinct brand accent color) */}
                <h3 className={`text-xl sm:text-2xl font-black ${titleColor} tracking-tight leading-relaxed py-1 mb-2 transition-colors duration-200`}>
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary font-bold leading-relaxed mt-2.5">
                  {item.description}
                </p>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-3 border-t border-borderColor/80">
                <div
                  className={`w-full py-3 px-5 rounded-2xl border-2 border-borderColor bg-surface-muted/80 text-text-primary text-xs font-black flex items-center justify-between transition-all duration-300 shadow-sm ${actionBtnHoverClass}`}
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
