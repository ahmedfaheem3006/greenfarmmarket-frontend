import React, { useState, useEffect, useRef } from 'react';
import { WORKFLOW_CARDS } from './workflowData';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowConnectionLines } from './WorkflowConnectionLines';
import { motion } from 'framer-motion';

const TOTAL_CYCLE_DURATION = 15.0; // Seconds for full zig.ai loop cycle

export const HeroWorkflowAnimation: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // 2. High-precision requestAnimationFrame loop sequence
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isMounted = true;

    const animateTimeline = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setCurrentTime((prevTime) => {
        const nextTime = prevTime + deltaTime;
        if (nextTime >= TOTAL_CYCLE_DURATION) {
          return 0; // Restart loop seamlessly
        }
        return nextTime;
      });

      if (isMounted) {
        animationRef.current = requestAnimationFrame(animateTimeline);
      }
    };

    animationRef.current = requestAnimationFrame(animateTimeline);

    return () => {
      isMounted = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimeRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Reduced motion static fallback
  if (prefersReducedMotion) {
    return (
      <div className="relative w-full h-[420px] sm:h-[460px] lg:h-[500px] rounded-5xl bg-surface-muted/60 border border-borderColor p-4 sm:p-6 flex flex-col justify-center space-y-4 shadow-soft-card overflow-hidden select-none">
        <WorkflowConnectionLines />
        {WORKFLOW_CARDS.map((card) => (
          <WorkflowCard key={card.id} card={card} isVisible={true} isFloating={false} />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-label="رسوم بيانية حية لمنظومة المزرعة الذكية - zig.ai style"
      className="relative w-full h-[420px] sm:h-[460px] lg:h-[500px] rounded-5xl bg-surface-muted/60 border border-borderColor shadow-soft-card overflow-hidden select-none flex flex-col justify-center p-4 sm:p-6"
    >
      {/* Ambient background glows */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-green-soft/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-blue-soft/50 rounded-full blur-3xl pointer-events-none" />

      {/* Radiating SVG Connection Lines with Moving Animated Dots */}
      <WorkflowConnectionLines />

      {/* Staggered Stacked Cards Layer (zig.ai style) */}
      <div className="relative z-10 space-y-3.5 sm:space-y-4 max-w-lg mx-auto w-full">
        {WORKFLOW_CARDS.map((card) => {
          const isVisible =
            currentTime >= card.appearTime && currentTime < card.exitTime;

          return (
            <div key={card.id} className="w-full">
              <WorkflowCard card={card} isVisible={isVisible} isFloating={true} />
            </div>
          );
        })}
      </div>

      {/* Live Workflow Status Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-3.5 left-4 z-30 flex items-center gap-2 bg-surface border border-borderColor px-3.5 py-1.5 rounded-full text-[11px] font-black text-text-primary shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
        <span>منظومة العمليات الرقمية الحية</span>
      </motion.div>
    </div>
  );
};
