import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const [showTooltip, setShowTooltip] = useState(false);
  const isDark = theme === 'dark';

  const tooltipText = isDark ? 'تفعيل الوضع الفاتح ☀️' : 'تفعيل الوضع الداكن 🌙';

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={tooltipText}
        className="relative flex items-center justify-between w-16 h-8 p-1 rounded-full bg-surface-muted border-2 border-borderColor hover:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40 transition-colors duration-300 cursor-pointer select-none shadow-inner"
      >
        {/* Animated Sliding Knob */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md font-bold ${
            isDark ? 'bg-amber-400 text-slate-950 translate-x-0' : 'bg-brand-green text-white -translate-x-8'
          }`}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-slate-950 fill-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-white fill-white" />
            )}
          </motion.div>
        </motion.div>

        {/* Static Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-[11px] pointer-events-none text-text-secondary font-extrabold">
          <Sun className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'opacity-20' : 'opacity-80 text-amber-500'}`} />
          <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'opacity-80 text-brand-green' : 'opacity-20'}`} />
        </div>
      </button>

      {/* Hover Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-1.5 bg-text-primary text-surface text-[11px] font-extrabold rounded-xl whitespace-nowrap z-50 pointer-events-none shadow-xl border border-borderColor"
        >
          {tooltipText}
        </motion.div>
      )}
    </div>
  );
};
