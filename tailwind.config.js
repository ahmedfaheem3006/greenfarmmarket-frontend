/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          secondary: 'var(--surface-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        borderColor: 'var(--border-color)',
        brand: {
          green: {
            DEFAULT: 'var(--brand-green)',
            dark: 'var(--brand-green-dark)',
            soft: 'var(--brand-green-soft)',
          },
          red: {
            DEFAULT: 'var(--brand-red)',
            dark: 'var(--brand-red-dark)',
            soft: 'var(--brand-red-soft)',
          },
          blue: {
            DEFAULT: 'var(--brand-blue)',
            dark: 'var(--brand-blue-dark)',
            soft: 'var(--brand-blue-soft)',
          },
        },
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
      },
      fontFamily: {
        almarai: ['Almarai', 'Cairo', '"Noto Sans Arabic"', 'sans-serif'],
        sans: ['"Noto Sans Arabic"', 'Noto Sans', 'sans-serif'],
        noto: ['"Noto Sans Arabic"', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        ibm: ['"IBM Plex Sans Arabic"', 'sans-serif'],
        bruno: ['"Bruno Ace SC"', 'cursive', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      lineHeight: {
        'tight': '1.45',
        'snug': '1.55',
        'normal': '1.7',
        'relaxed': '1.85',
        'loose': '2.1',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3.5rem',
      },
      maxWidth: {
        '8xl': '90rem', // 1440px
      },
    },
  },
  plugins: [],
};
