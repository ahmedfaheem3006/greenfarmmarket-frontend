import React from 'react';
import { motion } from 'framer-motion';
import { WorkflowCardItem } from './workflowData';
import logoImg from '../../assets/brand/green-farm-market-logo.jpeg';
import {
  Stethoscope,
  Truck,
  Store,
  Check,
  Zap,
} from 'lucide-react';

interface WorkflowCardProps {
  card: WorkflowCardItem;
  isVisible: boolean;
  isFloating?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({
  card,
  isVisible,
  isFloating = true,
}) => {
  const getCategoryColor = () => {
    switch (card.accent) {
      case 'green':
        return 'text-brand-green';
      case 'red':
        return 'text-brand-red';
      case 'blue':
        return 'text-brand-blue';
      case 'amber':
      default:
        return 'text-amber-500';
    }
  };

  const renderIconBox = () => {
    switch (card.type) {
      case 'farm':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-green-soft text-brand-green border border-brand-green/20 flex items-center justify-center flex-shrink-0 shadow-sm p-1">
            <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-lg" />
          </div>
        );
      case 'ai':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-red-soft text-brand-red border border-brand-red/20 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
        );
      case 'transport':
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-blue-soft text-brand-blue border border-brand-blue/20 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Truck className="w-5 h-5" />
          </div>
        );
      case 'market':
      default:
        return (
          <div className="w-10 h-10 rounded-xl bg-brand-green-soft text-brand-green border border-brand-green/20 flex items-center justify-center flex-shrink-0 shadow-sm">
            <Store className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              x: 0,
              y: isFloating ? [0, -3, 0, 3, 0] : 0,
              scale: 1,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              x: -30,
              scale: 0.96,
              filter: 'blur(2px)',
            }
      }
      transition={{
        duration: isVisible ? 0.55 : 0.4,
        ease: [0.22, 1, 0.36, 1],
        y: isFloating && isVisible
          ? { duration: 4.2, repeat: Infinity, ease: 'easeInOut' }
          : undefined,
      }}
      className="w-full bg-surface border border-borderColor rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-2xl isolate select-none will-change-transform text-right opacity-100"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Right side (RTL): Icon Box & Content */}
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {renderIconBox()}

          <div className="space-y-0.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] font-ibm font-bold">
              <span className={`font-bold ${getCategoryColor()}`}>{card.category}</span>
              <span className="text-text-secondary opacity-60">•</span>
              <span className="text-text-secondary font-inter text-[10px]">{card.time}</span>
            </div>

            <h4 className="font-cairo font-black text-xs sm:text-sm text-text-primary tracking-tight leading-snug truncate">
              {card.title}
            </h4>

            <p className="text-[11px] sm:text-xs text-text-secondary font-noto font-medium leading-relaxed truncate">
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Left side (RTL): Checkmark Action Circle */}
        <div className="flex-shrink-0">
          <div className="w-7 h-7 rounded-full bg-brand-green text-white flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
