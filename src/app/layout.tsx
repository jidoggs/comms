import React from 'react';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/common/components/lib/AntdRegistry';
import './globals.css';
import { bebas, inter, manrope } from './font';

export const metadata: Metadata = {
  title: 'Correspondence',
  description: 'Correspondence App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${inter.variable} ${manrope.className} circular`}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
