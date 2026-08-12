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
        cairo: ['Cairo', 'sans-serif'],
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
