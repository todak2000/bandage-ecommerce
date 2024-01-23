/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      gridTemplateColumns: {
        footer: '1fr 1fr 1fr 1fr 2fr',
        shop: '1fr 2fr',
      },
      fontFamily: {
        primary: ['Montserrat', ...fontFamily.sans],
      },
      screens: {
        md: '821px',
        lg: '1024px',
        xl: '1281px',
        '2xl': '1441px',
        '3xl': '1729px',
        xs: '270px',
      },
      colors: {
        'primary-blue': '#23A6F0',
        'primary-black': '#252B42',
        'secondary-black': '#737373',
        'primary-green': '#23856D',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
