import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          // Accents rouges (liens, bordures, teintes) et anthracite (textes, fonds sombres).
          50: '#fff5f5',
          100: '#ffe3e1',
          200: '#fdc7c2',
          300: '#f59a92',
          400: '#e8645a',
          500: '#dc3b2f',
          600: '#d52b1e',
          700: '#b3241a',
          800: '#8c1d16',
          900: '#26272e',
          950: '#16171c',
        },
        sand: {
          // Rouge du drapeau canadien, pour les appels à l'action.
          50: '#fff5f5',
          100: '#ffe3e1',
          200: '#fdc7c2',
          300: '#e5483d',
          400: '#d52b1e',
          500: '#b3241a',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(22 23 28 / 0.04), 0 18px 55px -28px rgb(22 23 28 / 0.28)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
