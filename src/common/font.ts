// import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// export const inter = Inter({
//   subsets: ['latin'],
//   weight: ['400'],
//   // variable: '--inter',
// });

export const helveticaNeue = localFont({
  src: [
    {
      path: '../../public/fonts/Helvetica-Neue-Condensed-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  preload: true,
  fallback: ['ui-sans-serif', 'arial', 'circular-std', 'sans-serif'],
  // variable: '--helveticaNeue',
});

export const circularStd = localFont({
  src: [
    {
      path: '../../public/fonts/CircularStd-Bold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CircularStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CircularStd-Book.otf',
      weight: '450',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CircularStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  preload: true,
  fallback: ['ui-sans-serif', 'arial', 'helvetica', 'sans-serif'],
  // variable: '--circular-std',
});
