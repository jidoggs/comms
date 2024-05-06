'use client';
import React, { useLayoutEffect } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { clearUserDetails, fetchUserToken } from '@/service/storage';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  const token = fetchUserToken();
  useLayoutEffect(() => {
    if (token) {
      clearUserDetails();
    }
  }, []);
  return (
    <Content
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/onboardingImage.png)',
      }}
    >
      <div className="flex items-center justify-center rounded-2xl">
        {children}
      </div>
    </Content>
  );
};

export default Layout;
