import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#f7f2e8',
          light: '#faf7f0',
          warm: '#f0e8d5',
          deep: '#e8dcc8',
        },
        paper: {
          aged: '#ede4d1',
          shadow: '#d9ceba',
        },
        ink: {
          DEFAULT: '#2c2416',
          light: '#3d3425',
          muted: '#6b5e4c',
          faded: '#8a7d6b',
          ghost: '#a99d8e',
          whisper: '#c4b9a8',
        },
        accent: {
          DEFAULT: '#b5651d',
          warm: '#c8782a',
          deep: '#8b4c14',
          glow: 'rgba(181, 101, 29, 0.08)',
          soft: 'rgba(181, 101, 29, 0.12)',
        },
        teal: {
          DEFAULT: '#5f7a68',
          soft: 'rgba(95, 122, 104, 0.10)',
        },
        rose: {
          DEFAULT: '#a0522d',
          soft: 'rgba(160, 82, 45, 0.10)',
        },
        indigo: {
          DEFAULT: '#5b5c7a',
          soft: 'rgba(91, 92, 122, 0.10)',
        },
        sky: {
          DEFAULT: '#4a7a8c',
          soft: 'rgba(74, 122, 140, 0.10)',
        },
        purple: {
          DEFAULT: '#7c5cbf',
          soft: 'rgba(124, 92, 191, 0.10)',
        },
        blue: {
          DEFAULT: '#4a7cc7',
          soft: 'rgba(74, 124, 199, 0.10)',
        },
        border: {
          DEFAULT: '#d4c5a9',
          light: '#e2d8c4',
          dark: '#bfb092',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Serif SC', 'serif'],
        body: ['Noto Serif SC', 'Source Sans 3', 'serif'],
        sans: ['Source Sans 3', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['48px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-lg': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'display-sm': ['22px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        'paper-sm': '0 1px 3px rgba(44,36,22,0.06), 0 1px 2px rgba(44,36,22,0.04)',
        'paper-md': '0 4px 12px rgba(44,36,22,0.08), 0 2px 4px rgba(44,36,22,0.04)',
        'paper-lg': '0 8px 24px rgba(44,36,22,0.10), 0 4px 8px rgba(44,36,22,0.05)',
        'paper': '0 2px 8px rgba(44,36,22,0.06), 0 0 1px rgba(44,36,22,0.1)',
      },
      borderRadius: {
        'paper-sm': '4px',
        'paper-md': '8px',
        'paper-lg': '12px',
      },
      width: {
        'sidebar': '280px',
        'toc': '220px',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
