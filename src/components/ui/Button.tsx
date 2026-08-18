import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'green' | 'red' | 'blue' | 'dark' | 'white' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'green',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyle =
    'inline-flex items-center justify-center font-cairo font-black rounded-full transition-all duration-300 focus:outline-none cursor-pointer border select-none';

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const variantStyles = {
    green:
      'bg-brand-green text-white border-brand-green hover:bg-brand-green-dark shadow-soft-green hover:shadow-lg',
    red:
      'bg-brand-red text-white border-brand-red hover:bg-brand-red-dark shadow-soft-red hover:shadow-lg',
    blue:
      'bg-brand-blue text-white border-brand-blue hover:bg-brand-blue-dark shadow-soft-blue hover:shadow-lg',
    dark:
      'bg-text-primary text-surface border-text-primary hover:opacity-90 shadow-soft-card',
    white:
      'bg-surface text-text-primary border-2 border-borderColor hover:border-brand-green hover:text-brand-green shadow-sm',
    outline:
      'bg-transparent text-text-primary border-2 border-borderColor hover:border-brand-green hover:bg-brand-green-soft hover:text-brand-green-dark',
    ghost:
      'bg-transparent text-text-primary border-transparent hover:text-brand-green hover:bg-surface-muted font-bold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
