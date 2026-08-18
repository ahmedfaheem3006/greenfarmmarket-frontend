import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('gfm_theme') as ThemeMode | null;
  if (saved === 'light' || saved === 'dark') {
    return saved;
  }
  // Green Farm Market is designed dark-first to reduce glare and energy use.
  return 'dark';
};

const applyThemeToDocument = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
};

let currentTheme: ThemeMode = getInitialTheme();
applyThemeToDocument(currentTheme);

const listeners = new Set<(theme: ThemeMode) => void>();

export const useThemeStore = () => {
  const [theme, setThemeState] = useState<ThemeMode>(currentTheme);

  useEffect(() => {
    // Re-apply theme on mount to guarantee html data-theme is synchronized
    applyThemeToDocument(currentTheme);

    const listener = (newTheme: ThemeMode) => {
      setThemeState(newTheme);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = currentTheme === 'light' ? 'dark' : 'light';
    currentTheme = nextTheme;
    localStorage.setItem('gfm_theme', nextTheme);
    applyThemeToDocument(nextTheme);
    listeners.forEach((l) => l(nextTheme));
  };

  const setTheme = (newTheme: ThemeMode) => {
    currentTheme = newTheme;
    localStorage.setItem('gfm_theme', newTheme);
    applyThemeToDocument(newTheme);
    listeners.forEach((l) => l(newTheme));
  };

  return { theme, toggleTheme, setTheme };
};
