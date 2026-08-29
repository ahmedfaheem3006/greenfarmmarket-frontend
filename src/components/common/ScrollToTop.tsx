import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Automatically scroll to the top of the window on every route navigation
  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' as ScrollBehavior,
      });
    } catch {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, search]);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (scrollPos > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (e) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 25 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-[99] select-none pointer-events-auto flex items-center justify-center"
        >
          {/* Floating Scroll Button - Rounded Square Glass with Green Glow */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.92 }}
            aria-label="العودة لأعلى الصفحة"
            className="w-12 h-12 rounded-2xl backdrop-blur-md bg-white/90 dark:bg-[#0d1119]/90 text-emerald-700 dark:text-[#25D5AB] border-2 border-emerald-500/30 dark:border-[#25D5AB]/40 hover:border-emerald-500 dark:hover:border-[#25D5AB] hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 hover:text-white dark:hover:text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-600/20 dark:shadow-[#25D5AB]/30 hover:shadow-xl hover:shadow-emerald-600/30 dark:hover:shadow-[#25D5AB]/40 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D5AB]/40 group isolate"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
