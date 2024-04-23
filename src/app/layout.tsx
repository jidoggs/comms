import React from 'react';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { circularStd } from '../common/font';

const StyledComponentsRegistry = dynamic(
  () => import('@/common/components/lib/AntdRegistry'),
  {
    loading: () => <></>,
  }
);
const AuthWrapper = dynamic(
  () => import('@/common/components/private/Protected/AuthWrapper'),
  {
    loading: () => <></>,
  }
);

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
