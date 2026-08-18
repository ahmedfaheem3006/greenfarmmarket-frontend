import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../store/authStore';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Home,
  Info,
  Stethoscope,
  Store,
  Truck,
  Briefcase,
  Newspaper,
  PhoneCall,
  UserCheck,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  UserPlus,
  LogIn,
  ChevronDown,
  Shield,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isRegistered, toggleAuthModal, logout } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation Links Definition
  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: Home, color: 'text-brand-green' },
    { path: '/about', label: 'عن المنصة', icon: Info, color: 'text-brand-blue' },
    { path: '/ai-doctor', label: 'صيدلية AI', icon: Stethoscope, color: 'text-brand-red' },
    { path: '/marketplace', label: 'السوق الزراعي', icon: Store, color: 'text-brand-green' },
    { path: '/transport', label: 'النقل', icon: Truck, color: 'text-brand-blue' },
    { path: '/jobs', label: 'الوظائف', icon: Briefcase, color: 'text-[#FFB703]' },
    { path: '/news', label: 'البورصة والأخبار', icon: Newspaper, color: 'text-[#A855F7]' },
    { path: '/contact', label: 'تواصل معنا', icon: PhoneCall, color: 'text-brand-green' },
  ];

  // Listen to scroll to shrink navbar & increase backdrop blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Click outside to close user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard events (Escape key closes drawer & dropdown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`sticky top-0 z-50 glass-header ${
        isScrolled ? 'glass-header-scrolled py-1' : 'py-1.5 sm:py-2'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Right (يمين): Large Prominent Logo (No Text) */}
        <Logo size="md" />

        {/* Center (المنتصف): Desktop Floating Pill Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-surface-muted/90 p-1 rounded-full border border-borderColor shadow-sm">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            let activeBg = 'bg-brand-green text-white shadow-brand-green/30';
            if (link.path === '/ai-doctor') activeBg = 'bg-brand-red text-white shadow-brand-red/30';
            else if (link.path === '/transport' || link.path === '/about') activeBg = 'bg-brand-blue text-white shadow-brand-blue/30';
            else if (link.path === '/jobs') activeBg = 'bg-[#FFB703] text-[#030D08] shadow-[#FFB703]/30';
            else if (link.path === '/news') activeBg = 'bg-[#A855F7] text-white shadow-[#A855F7]/30';

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-label={link.label}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-extrabold transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-brand-green/40 ${
                  active
                    ? `${activeBg} shadow-md`
                    : 'text-text-primary hover:text-brand-green hover:bg-surface/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : link.color}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Left (يسار): Theme Switcher + User Account Button */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* User Account Button or Auth Modal Trigger */}
          {isRegistered && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="قائمة حساب المستخدم"
                className="flex items-center gap-2 bg-surface hover:bg-surface-muted text-text-primary border-2 border-borderColor px-4 py-2.5 rounded-full text-xs font-black shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-green/40 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-brand-green" />
                <span className="max-w-[120px] truncate">{user.name}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-2 w-72 bg-surface border-2 border-borderColor rounded-3xl shadow-2xl p-4 z-[100] text-xs space-y-3 text-right overflow-hidden isolate"
                    style={{ backgroundColor: 'var(--surface)', opacity: 1 }}
                  >
                    {/* User Card Header */}
                    <div className="p-3.5 rounded-2xl bg-surface-muted space-y-2 border border-borderColor/60">
                      <span className="text-[11px] font-bold text-text-secondary block">الحساب المسجل حالياً:</span>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-black text-text-primary truncate">{user.name}</h4>
                        <Badge variant="green" className="text-[10px] py-0.5 px-2.5 font-black flex-shrink-0">
                          {user.role === 'ADMIN' ? 'مدير النظام' : user.role === 'FARM_OWNER' ? 'مالك مزرعة' : 'مزارع مسجل'}
                        </Badge>
                      </div>
                    </div>

                    {/* Actions List */}
                    <div className="space-y-1 pt-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl text-text-primary hover:bg-brand-green-soft hover:text-brand-green-dark font-black transition"
                      >
                        <LayoutDashboard className="w-4.5 h-4.5 text-brand-green" />
                        <span>لوحة تحكّم المزرعة</span>
                      </Link>

                      {user.role === 'ADMIN' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl text-text-primary hover:bg-brand-red-soft hover:text-brand-red-dark font-black transition"
                        >
                          <Shield className="w-4.5 h-4.5 text-brand-red" />
                          <span>لوحة الإدارة الإشرافية</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3.5 py-3 rounded-2xl text-brand-red hover:bg-brand-red-soft font-black transition cursor-pointer border-t border-borderColor/60 mt-1 pt-3"
                      >
                        <LogOut className="w-4.5 h-4.5 text-brand-red" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-extrabold border-2 text-xs py-2 px-3.5 rounded-full"
                >
                  <LogIn className="w-3.5 h-3.5 text-brand-green" />
                  <span>تسجيل الدخول</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  variant="green"
                  size="sm"
                  className="font-black text-xs py-2 px-4 rounded-full shadow-md shadow-brand-green/20"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ انشاء حساب</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="القائمة التفاعلية للموبيل"
            className="xl:hidden p-2.5 rounded-full bg-surface border-2 border-borderColor text-text-primary hover:bg-surface-muted transition focus:outline-none focus:ring-2 focus:ring-brand-green/40 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40 xl:hidden"
            />

            {/* RTL Side Drawer (Sliding smoothly from Right) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="fixed top-0 right-0 h-full w-84 max-w-[88vw] bg-surface border-l-2 border-borderColor p-6 z-50 flex flex-col justify-between shadow-2xl xl:hidden overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Drawer Top Header */}
                <div className="flex items-center justify-between border-b border-borderColor pb-4">
                  <Logo size="sm" showSubtitle={false} />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-full bg-surface-muted text-text-primary hover:bg-borderColor transition border border-borderColor"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Theme Toggle Card */}
                <div className="p-4 rounded-3xl bg-surface-muted border border-borderColor flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-text-primary block">مظهر المنصة (Theme)</span>
                    <span className="text-[10px] text-text-secondary font-bold">الوضع الفاتح / الوضع الداكن</span>
                  </div>
                  <ThemeToggle />
                </div>

                {/* Navigation Links Grid */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black text-text-secondary block px-1">أقسام المنصة:</span>
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 text-xs font-black transition ${
                          active
                            ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                            : 'bg-surface border-borderColor text-text-primary hover:bg-surface-muted'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? 'text-white' : link.color}`} />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              {!isRegistered && (
                <div className="pt-6 border-t border-borderColor space-y-2.5">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="md" fullWidth className="font-extrabold">
                      <LogIn className="w-4 h-4 text-brand-green" />
                      تسجيل الدخول
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="green" size="md" fullWidth className="font-black">
                      <UserPlus className="w-4 h-4" />
                      + انشاء حساب جديد
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
