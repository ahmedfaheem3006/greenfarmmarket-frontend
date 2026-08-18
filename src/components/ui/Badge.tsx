import React from 'react';

export interface BadgeProps {
  variant?: 'green' | 'red' | 'blue' | 'amber' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'green', children, className = '' }) => {
  const styles = {
    green: 'bg-brand-green-soft text-brand-green-dark border-brand-green/30',
    red: 'bg-brand-red-soft text-brand-red-dark border-brand-red/30',
    blue: 'bg-brand-blue-soft text-brand-blue-dark border-brand-blue/30',
    amber: 'bg-[#FFB703]/10 text-[#FFB703] border-[#FFB703]/30',
    neutral: 'bg-surface-muted text-text-secondary border-borderColor',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-ibm font-bold border ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
