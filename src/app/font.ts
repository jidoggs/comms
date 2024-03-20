import { Roboto, Bebas_Neue, Inter, Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
});

export const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
  variable: '--font-roboto',
});

export const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--bebas',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--inter',
});
