import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  UserPlus,
  LogIn,
  ChevronDown,
  Shield,
  User,
  Leaf,
  ChevronLeft,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isRegistered, logout } = useAuth();
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
    { path: '/jobs', label: 'الوظائف', icon: Briefcase, color: 'text-[#F59E0B]' },
    { path: '/news', label: 'البورصة والأخبار', icon: Newspaper, color: 'text-[#8B5CF6]' },
    { path: '/contact', label: 'تواصل معنا', icon: PhoneCall, color: 'text-brand-green' },
  ];

  // Listen to scroll to adjust navbar padding & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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

  // Exclusive check if current user is the Admin (ahmed.admin@gmail.com)
  const isAdmin = Boolean(
    isRegistered &&
    user &&
    (
      user.email?.trim().toLowerCase() === 'ahmed.admin@gmail.com' ||
      String(user.role).toUpperCase() === 'ADMIN'
    )
  );

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`sticky top-0 z-50 glass-header ${
          isScrolled ? 'glass-header-scrolled py-1 shadow-md' : 'py-1.5 sm:py-2.5'
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ========================================================================= */}
          {/* DESKTOP NAVBAR (xl and above) */}
          {/* Far Right: Logo + Navigation Links | Far Left: Theme Toggle + User Auth */}
          {/* ========================================================================= */}
          <div className="hidden xl:flex items-center justify-between w-full min-h-[56px] gap-6">
            
            {/* 1. RIGHT SIDE (أقصى اليمين): Logo + Navigation Pages adjacent to it */}
            <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
              {/* Prominent Large Logo at Far Right */}
              <Logo size="header" />

              {/* Navigation Pages Links Container */}
              <nav className="flex items-center gap-1 bg-surface/75 dark:bg-surface-muted/75 p-1.5 rounded-full border border-borderColor/80 shadow-sm backdrop-blur-md">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  let activeStyle = 'bg-brand-green text-white shadow-sm shadow-brand-green/25 font-black';
                  if (link.path === '/ai-doctor') activeStyle = 'bg-brand-red text-white shadow-sm shadow-brand-red/25 font-black';
                  else if (link.path === '/transport' || link.path === '/about') activeStyle = 'bg-brand-blue text-white shadow-sm shadow-brand-blue/25 font-black';
                  else if (link.path === '/jobs') activeStyle = 'bg-[#F59E0B] text-slate-950 shadow-sm shadow-[#F59E0B]/25 font-black';
                  else if (link.path === '/news') activeStyle = 'bg-[#8B5CF6] text-white shadow-sm shadow-[#8B5CF6]/25 font-black';

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      aria-label={link.label}
                      className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-brand-green/40 ${
                        active
                          ? activeStyle
                          : 'text-text-primary hover:text-brand-green hover:bg-surface dark:hover:bg-surface-secondary'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${active ? (link.path === '/jobs' ? 'text-slate-950' : 'text-white') : link.color}`} />
                      <span className="whitespace-nowrap">{link.label}</span>
                    </Link>
                  );
                })}

                {/* Conditional Admin Control Center Tab ONLY for Admin Role */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    aria-label="لوحة الإدارة والتحكم"
                    className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black transition-all duration-200 select-none ${
                      isActive('/admin')
                        ? 'bg-[#be1622] text-white shadow-md shadow-[#be1622]/40 scale-105'
                        : 'text-white bg-[#be1622] hover:bg-rose-700 shadow-sm shadow-[#be1622]/30'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-white" />
                    <span className="whitespace-nowrap">لوحة الإدارة</span>
                  </Link>
                )}
              </nav>
            </div>

            {/* 2. LEFT SIDE (أقصى اليسار): Theme Switcher + Username / Auth Account */}
            <div className="flex items-center justify-end gap-3 flex-shrink-0">
              {/* Theme Toggle Button */}
              <ThemeToggle />

              {/* User Account Dropdown (if logged in) or Login/Register Buttons */}
              {isRegistered && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-label="قائمة حساب المستخدم"
                    className="flex items-center gap-2 bg-surface/90 hover:bg-surface-muted text-text-primary border border-borderColor/80 px-4 py-2 rounded-full text-xs font-black shadow-sm transition focus:outline-none focus:ring-2 focus:ring-brand-green/40 cursor-pointer backdrop-blur-sm"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-green-soft text-brand-green-dark flex items-center justify-center font-bold text-[11px]">
                      {user.name ? user.name.charAt(0) : <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-200 ${
                        userDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute left-0 top-full mt-2 w-72 bg-surface border border-borderColor rounded-2xl shadow-2xl p-3.5 z-[100] text-xs space-y-2.5 text-right backdrop-blur-xl isolate"
                      >
                        {/* User Card Header */}
                        <div className="p-3 rounded-xl bg-surface-muted/90 space-y-1.5 border border-borderColor/60">
                          <span className="text-[10px] font-bold text-text-secondary block">الحساب المسجل حالياً:</span>
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-black text-text-primary truncate">{user.name}</h4>
                            <Badge variant={isAdmin ? "red" : "green"} className="text-[10px] py-0.5 px-2 font-black flex-shrink-0">
                              {isAdmin ? 'مدير النظام (Admin)' : user.role === 'FARM_OWNER' ? 'مالك مزرعة' : 'مزارع مسجل'}
                            </Badge>
                          </div>
                        </div>

                        {/* Actions List */}
                        <div className="space-y-1 pt-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-text-primary hover:bg-brand-green-soft hover:text-brand-green-dark font-black transition"
                          >
                            <LayoutDashboard className="w-4 h-4 text-brand-green" />
                            <span>لوحة تحكّم المزرعة</span>
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-white bg-[#be1622] hover:bg-rose-700 font-black transition shadow-sm"
                            >
                              <Shield className="w-4 h-4 text-white" />
                              <span>لوحة الإدارة الإشرافية (Admin OS)</span>
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              logout();
                              setUserDropdownOpen(false);
                            }}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-brand-red hover:bg-brand-red-soft font-black transition cursor-pointer border-t border-borderColor/60 mt-1 pt-2.5"
                          >
                            <LogOut className="w-4 h-4 text-brand-red" />
                            <span>تسجيل الخروج</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="font-extrabold border text-xs py-2 px-4 rounded-full bg-surface/80 hover:bg-surface-muted backdrop-blur-sm"
                    >
                      <LogIn className="w-3.5 h-3.5 text-brand-green" />
                      <span>تسجيل الدخول</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="green"
                      size="sm"
                      className="font-black text-xs py-2 px-4.5 rounded-full shadow-sm shadow-brand-green/20"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ انشاء حساب</span>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RESPONSIVE MOBILE NAVBAR (under xl) */}
          {/* Far Right: Burger Menu | Center: Logo | Left: Theme Toggle */}
          {/* ========================================================================= */}
          <div className="relative flex items-center justify-between w-full min-h-[50px] xl:hidden">
            
            {/* 1. RIGHT SIDE (أقصى اليمين): Burger Menu Toggle Button */}
            <div className="flex items-center justify-start z-10">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="فتح القائمة التفاعلية للموبايل"
                className="p-2.5 rounded-2xl bg-surface/90 hover:bg-surface-muted border border-borderColor text-text-primary transition focus:outline-none focus:ring-2 focus:ring-brand-green/40 shadow-sm backdrop-blur-sm cursor-pointer"
              >
                <Menu className="w-5 h-5 text-brand-green" />
              </button>
            </div>

            {/* 2. CENTER (المنتصف): Mathematically Centered Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto z-20">
              <Logo size="sm" />
            </div>

            {/* 3. LEFT SIDE (أقصى اليسار): Theme Toggle Button */}
            <div className="flex items-center justify-end z-10">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* RESPONSIVE MOBILE DRAWER (Rendered via Portal to Document Body) */}
      {/* Full Right Slide-in with Complete Profile, Auth, Pages Links & Theme Controls */}
      {/* ========================================================================= */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[99999] xl:hidden" dir="rtl">
                {/* 1. Dark Backdrop Blur Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
                />

                {/* 2. Side Drawer Sliding Smoothly from Right */}
                <motion.aside
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  className="fixed top-0 right-0 bottom-0 w-[340px] max-w-[88vw] h-full bg-surface text-text-primary border-l border-borderColor shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
                  style={{ backgroundColor: 'var(--surface)' }}
                >
                  <div className="p-5 space-y-5">
                    
                    {/* Header: Logo + Close Button */}
                    <div className="flex items-center justify-between border-b border-borderColor pb-4">
                      <Logo size="sm" showSubtitle={false} />
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        aria-label="إغلاق القائمة"
                        className="p-2.5 rounded-xl bg-surface-muted text-text-primary hover:bg-borderColor transition border border-borderColor cursor-pointer flex items-center justify-center"
                      >
                        <X className="w-5 h-5 text-text-primary" />
                      </button>
                    </div>

                    {/* User Profile / Auth Section */}
                    {isRegistered && user ? (
                      <div className="p-4 rounded-2xl bg-surface-muted border border-borderColor space-y-3.5 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-brand-green-soft text-brand-green-dark flex items-center justify-center font-black text-base border-2 border-brand-green/40 shadow-sm flex-shrink-0">
                            {user.name ? user.name.charAt(0) : <User className="w-5 h-5" />}
                          </div>
                          <div className="overflow-hidden flex-1">
                            <span className="text-[10px] text-text-secondary font-bold block">مرحباً بك مجدداً:</span>
                            <h4 className="text-xs font-black text-text-primary truncate">{user.name}</h4>
                            <Badge variant="green" className="text-[10px] py-0.5 px-2 font-black mt-1 inline-block">
                              {user.role === 'ADMIN' ? 'مدير النظام' : user.role === 'FARM_OWNER' ? 'مالك مزرعة' : 'مزارع مسجل'}
                            </Badge>
                          </div>
                        </div>

                        <div className="pt-2.5 border-t border-borderColor/70 space-y-1.5">
                          <Link
                            to="/dashboard"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-text-primary hover:bg-brand-green-soft hover:text-brand-green-dark font-black text-xs transition bg-surface border border-borderColor"
                          >
                            <div className="flex items-center gap-2.5">
                              <LayoutDashboard className="w-4 h-4 text-brand-green" />
                              <span>لوحة تحكم المزرعة</span>
                            </div>
                            <ChevronLeft className="w-3.5 h-3.5 text-text-secondary" />
                          </Link>

                          {isAdmin && (
                            <Link
                              to="/admin"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-white bg-[#be1622] hover:bg-rose-700 font-black text-xs transition shadow-sm"
                            >
                              <div className="flex items-center gap-2.5">
                                <Shield className="w-4 h-4 text-white" />
                                <span>لوحة الإدارة الإشرافية</span>
                              </div>
                              <ChevronLeft className="w-3.5 h-3.5 text-white/80" />
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                            className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-brand-red hover:bg-brand-red-soft font-black text-xs transition cursor-pointer border border-brand-red/20 bg-brand-red-soft/20 mt-1"
                          >
                            <div className="flex items-center gap-2.5">
                              <LogOut className="w-4 h-4 text-brand-red" />
                              <span>تسجيل الخروج من الحساب</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-surface-muted border border-borderColor space-y-3 shadow-sm">
                        <div className="space-y-0.5">
                          <span className="text-xs font-black text-text-primary block">مرحباً بك في المنصة</span>
                          <span className="text-[11px] text-text-secondary font-medium block">سجّل دخولك للوصول لكافة الخدمات الذكية:</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="outline" size="sm" fullWidth className="font-extrabold text-xs bg-surface border py-2.5">
                              <LogIn className="w-3.5 h-3.5 text-brand-green" />
                              تسجيل دخول
                            </Button>
                          </Link>
                          <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="green" size="sm" fullWidth className="font-black text-xs py-2.5 shadow-sm shadow-brand-green/20">
                              <UserPlus className="w-3.5 h-3.5" />
                              انشاء حساب
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {/* Theme Switcher inside Drawer */}
                    <div className="p-3.5 rounded-2xl bg-surface-muted border border-borderColor flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-black text-text-primary block">مظهر المنصة (Theme)</span>
                        <span className="text-[10px] text-text-secondary font-bold">الوضع الفاتح / الوضع الداكن</span>
                      </div>
                      <ThemeToggle />
                    </div>

                    {/* Navigation Pages List */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[11px] font-black text-text-secondary block px-1">صفحات وأقسام المنصة:</span>
                      <div className="space-y-1.5">
                        {navLinks.map((link) => {
                          const Icon = link.icon;
                          const active = isActive(link.path);
                          return (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex items-center justify-between p-3.5 rounded-2xl border text-xs font-black transition ${
                                active
                                  ? 'bg-brand-green text-white border-brand-green shadow-md shadow-brand-green/20'
                                  : 'bg-surface border-borderColor text-text-primary hover:bg-surface-muted'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className={`w-4 h-4 ${active ? 'text-white' : link.color}`} />
                                <span>{link.label}</span>
                              </div>
                              {active ? (
                                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              ) : (
                                <ChevronLeft className="w-3.5 h-3.5 text-text-secondary opacity-60" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Drawer Footer Info */}
                  <div className="p-5 border-t border-borderColor text-center text-[10px] text-text-secondary space-y-1 bg-surface-muted/40">
                    <div className="flex items-center justify-center gap-1.5 font-bold text-brand-green">
                      <Leaf className="w-3.5 h-3.5" />
                      <span>جرين فارم ماركت &bull; الإصدار الذكي 2026</span>
                    </div>
                    <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()}</p>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};


