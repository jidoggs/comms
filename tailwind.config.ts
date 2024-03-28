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
        },
      },
      borderRadius: {
        10: '10px',
      },
      boxShadow: {
        minuteCard: '0px 2px 4px 0px #0000001A',
      },
    },
  },
  plugins: [],
};
export default config;
