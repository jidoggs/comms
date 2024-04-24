import React from 'react';
import type { Metadata } from 'next';
import AuthWrapper from '@/common/components/private/Protected/AuthWrapper';
import StyledComponentsRegistry from '@/common/components/lib/AntdRegistry';
import { circularStd } from '../common/font';
import './globals.css';

// const StyledComponentsRegistry = dynamic(
//   () => import('@/common/components/lib/AntdRegistry'),
//   {
//     loading: () => <></>,
//   }
// );

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
      <body style={circularStd.style}>
        <AuthWrapper>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </AuthWrapper>
      </body>
    </html>
  );
}
