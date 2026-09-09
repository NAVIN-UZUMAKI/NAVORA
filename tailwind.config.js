/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shinobi: {
          950: '#06070a',
          900: '#0a0d14',
          850: '#0f1422',
          800: '#141b2d',
          750: '#1a233b',
          700: '#222d4a',
          600: '#32426c',
          500: '#465b94',
        },
        chakra: {
          50: '#e6feff',
          100: '#bdfaff',
          200: '#8df5fe',
          300: '#4eedfd',
          400: '#14ddf8',
          500: '#00f0ff', // signature cyan chakra
          600: '#00bdd1',
          700: '#0494a5',
          800: '#0d7684',
          900: '#11626e',
        },
        flame: {
          400: '#fb7185',
          500: '#ff2a5f', // signature crimson flame/seal
          600: '#e11d48',
        },
        amberSeal: {
          400: '#fbbf24',
          500: '#f59e0b', // signature golden seal
          600: '#d97706',
        },
        leaf: {
          400: '#34d399',
          500: '#10b981', // signature shinobi jade
          600: '#059669',
        },
        lightning: {
          400: '#c084fc',
          500: '#a855f7', // lightning violet
          600: '#9333ea',
        }
      },
      fontFamily: {
        hud: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'chakra': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'chakra-sm': '0 0 12px -2px rgba(0, 240, 255, 0.25)',
        'flame': '0 0 25px -5px rgba(255, 42, 95, 0.35)',
        'flame-sm': '0 0 12px -2px rgba(255, 42, 95, 0.25)',
        'seal': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'hud': '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(0, 240, 255, 0.1)',
        'hud-glow': 'inset 0 0 15px rgba(0, 240, 255, 0.08), 0 0 20px rgba(0, 240, 255, 0.15)',
      },
      keyframes: {
        pulseChakra: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.02)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        'pulse-chakra': 'pulseChakra 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
    },
  },
  plugins: [],
}

