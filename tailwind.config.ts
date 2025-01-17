import type { Config } from 'tailwindcss';
import { customThemeColor } from './src/common/utils';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        custom: {
          ...customThemeColor,
          note: 'var(--defaultNoteColor)',
        },
      },
      width: {
        100: '400px',
      },
      maxWidth: {
        100: '400px',
      },
      borderRadius: {
        10: '10px',
      },
      boxShadow: {
        wordBox: '0px 2px 4px 0px #0000001A',
      },
      dropShadow: {
        dropp: '0px 2px 8px 0px #000000E6',
        chat: '-40px 8px 8px rgb(0 0 0/0.5)',
      },
      gridTemplateColumns: {
        homeMax: '1fr 1fr minmax(180px, 320px)',
      },
      fontWeight: {
        450: '450',
      },
      lineHeight: {
        '4.5': '18px',
      },
      keyframes: {
        opacity: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        opacity: 'opacity 2s infinite',
      },
    },
  },
  plugins: [],
};
export default config;
