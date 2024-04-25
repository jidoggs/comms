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
    <div className="flex min-w-[450px] items-center justify-center rounded-2xl bg-custom-gray_100">
      <div className="flex w-full flex-col items-center justify-center gap-y-3 p-5">
        <Title
          tag="h4"
          className={`py-1 w-full text-left ${helveticaNeue.className}`}
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
