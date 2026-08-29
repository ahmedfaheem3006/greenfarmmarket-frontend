import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import logoLight from '../../assets/Final_logo.png';
import logoDark from '../../assets/Logo_white.png';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'header';
  showSubtitle?: boolean;
  className?: string;
  forceTheme?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ size = 'header', className = '', forceTheme }) => {
  const { theme } = useThemeStore();
  const activeTheme = forceTheme || theme;
  const currentLogo = activeTheme === 'dark' ? logoDark : logoLight;

  const logoHeights = {
    sm: 'h-10 sm:h-12 max-h-[50px]',
    md: 'h-13 sm:h-15 lg:h-16 max-h-[64px]',
    header: 'h-13 sm:h-15 lg:h-18 max-h-[72px]',
    lg: 'h-16 sm:h-20 lg:h-24 max-h-[96px]',
  };

  return (
    <Link
      to="/"
      className={`inline-flex items-center justify-center group select-none flex-shrink-0 ${className}`}
      aria-label="جرين فارم ماركت الرئيسية"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center"
      >
        <img
          key={activeTheme}
          src={currentLogo}
          alt="شعار جرين فارم ماركت - Green Farm Market"
          className={`${logoHeights[size]} w-auto object-contain transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md border-0 outline-none`}
        />
      </motion.div>
    </Link>
  );
};


