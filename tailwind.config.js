/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'script': ['Great Vibes', 'cursive'],
        'serif-display': ['Cormorant Garamond', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'emoji': ['"Noto Color Emoji"', '"Apple Color Emoji"', '"Segoe UI Emoji"', 'sans-serif'],
      },
      colors: {
        cream: 'hsl(30 30% 97%)',
        'gold-soft': 'hsl(30 50% 82%)',
        gold: 'hsl(30 60% 48%)',
        rose: 'hsl(350 70% 42%)',
        'rose-deep': 'hsl(350 70% 28%)',
        sage: 'hsl(350 50% 90%)',
        'sage-soft': 'hsl(350 60% 96%)',
        'sage-deep': 'hsl(350 65% 35%)',
        ink: 'hsl(350 60% 15%)',
        foreground: 'hsl(350 60% 15%)',
      },
      boxShadow: {
        'elegant': '0 20px 60px -20px hsl(350 55% 30% / .25)',
        'gold': '0 10px 40px -10px hsl(30 55% 45% / .3)',
        'soft': '0 8px 30px -10px hsl(350 40% 25% / .14)',
      },
      keyframes: {
        'float-petal': {
          '0%': { transform: 'translateY(-10vh) translate(0) rotate(0)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) translate(40px) rotate(360deg)', opacity: '0' },
        },
        'drift': {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-12px) rotate(8deg)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        'envelope-open': {
          '0%': { transform: 'scale(1) rotateX(0)' },
          '50%': { transform: 'scale(1.05) rotateX(-15deg)' },
          '100%': { transform: 'scale(1.4) rotateX(-90deg)', opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bell-swing': {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        'float-note': {
          '0%': { transform: 'translateY(20px) scale(0.8) rotate(0)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-80px) scale(1.1) rotate(15deg)', opacity: '0' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', filter: 'drop-shadow(0 0 2px rgba(254,240,138,0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(254,240,138,0.9))' },
        },
        'turmeric-sparkle': {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '50%': { transform: 'translateY(-15px) scale(1.3)', opacity: '0.95' },
        },
        'draw': {
          'to': { strokeDashoffset: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.85' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'float-petal': 'float-petal linear infinite',
        'drift': 'drift 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'envelope-open': 'envelope-open 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-up': 'fade-up 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease-out both',
        'bell-swing': 'bell-swing 3.5s ease-in-out infinite',
        'float-note': 'float-note 4s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'turmeric': 'turmeric-sparkle 3s ease-in-out infinite',
        'draw': 'draw 5s linear forwards',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
