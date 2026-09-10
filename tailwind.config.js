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
        /*
         * =====================================================
         * NAVORA — LEAF SHINOBI PALETTE
         * =====================================================
         */

        shinobi: {
          950: '#080C12',
          900: '#0B1018',
          850: '#111827',
          800: '#17202C',
          750: '#1F2937',
          700: '#c2410c',
600: '#ea580c',
500: '#f97316',
        },

        chakra: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },

        flame: {
          400: '#F87171',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
        },

        amberSeal: {
          400: '#E5C65A',
          500: '#D4A72C',
          600: '#B58A20',
          700: '#8B6B1F',
        },

        leaf: {
          400: '#6B8F70',
          500: '#f97316',
600: '#ea580c',
700: '#c2410c',
        },

        lightning: {
          400: '#8B7BB8',
          500: '#6D5A9E',
          600: '#55447F',
        },
      },

      fontFamily: {
        hud: ['"Rajdhani"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },

      boxShadow: {
        /*
         * Chakra = energy only
         */
        chakra: '0 0 20px -5px rgba(6, 182, 212, 0.28)',
        'chakra-sm': '0 0 10px -2px rgba(6, 182, 212, 0.22)',

        /*
         * Crimson
         */
        flame: '0 0 20px -5px rgba(220, 38, 38, 0.28)',
        'flame-sm': '0 0 10px -2px rgba(220, 38, 38, 0.22)',

        /*
         * Gold / mission seals
         */
        seal: '0 0 20px -5px rgba(212, 167, 44, 0.25)',

        /*
         * General HUD — neutral, NOT cyan
         */
        hud: '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(156, 163, 175, 0.08)',

        'hud-glow':
          'inset 0 0 15px rgba(58, 90, 64, 0.06), 0 0 20px rgba(58, 90, 64, 0.10)',
      },

      keyframes: {
        pulseChakra: {
          '0%, 100%': {
            opacity: '0.9',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.6',
            transform: 'scale(1.02)',
          },
        },

        scanline: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(1000%)',
          },
        },

        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },

      animation: {
        'pulse-chakra':
          'pulseChakra 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        'scanline':
          'scanline 8s linear infinite',

        'shimmer':
          'shimmer 2.5s infinite linear',
      },
    },
  },

  plugins: [],
};