'use client';
import React from 'react';
import Title from '@/common/components/Title';
import Params from '../components/Params';
import { helveticaNeue } from '@/common/font';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full min-w-[450px] max-w-5xl items-center justify-center rounded-2xl bg-custom-gray_100">
      <div className="flex w-full flex-col items-center justify-center gap-y-3 p-5">
        <Title
          tag="h4"
          className={`w-full py-1 text-left ${helveticaNeue.className}`}
        >
          Onboarding
        </Title>
        <Params />
        {children}
      </div>
    </div>
  );
};

export default Layout;
