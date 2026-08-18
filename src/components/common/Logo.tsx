import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImg from '../../assets/brand/green-farm-market-logo.jpeg';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const logoHeights = {
    sm: 'h-12 sm:h-14 lg:h-16',
    md: 'h-14 sm:h-16 lg:h-[88px]',
    lg: 'h-16 sm:h-20 lg:h-[100px]',
  };

  return (
    <Link to="/" className="inline-flex items-center group select-none flex-shrink-0" aria-label="جرين فارم ماركت الرئيسية">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.03 }}
        className="flex items-center"
      >
        <img
          src={logoImg}
          alt="شعار جرين فارم ماركت"
          className={`${logoHeights[size]} w-auto object-contain transition-transform duration-300 border-0 outline-none`}
        />
      </motion.div>
    </Link>
  );
};
