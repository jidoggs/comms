'use client';
// import { MainLayout } from "@/components/layout";
// import Title from '@/common/components/Title';
import { Content } from 'antd/lib/layout/layout';
// import Image from 'next/image';
import React from 'react';
// import Params from './components/Params';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Content
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/onboardingImage.png)',
      }}
    >
      <div className="flex w-[410px] items-center justify-center rounded-2xl">
        {children}
      </div>
    </Content>
  );
};

export default Layout;
