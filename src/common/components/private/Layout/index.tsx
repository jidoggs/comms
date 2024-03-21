'use client';
import React from 'react';
import { Layout as AntLayout } from 'antd';
import { UserPreDefinedRole } from '@/types';
import { User } from '@/app/auth/types/auth';
import AppHeader from '../Header';
import SideNav from '../SideNav';

const { Content } = AntLayout;

type Props = {
  user: User | null;
  children: React.ReactNode;
};

function Layout({ children, user }: Props) {
  return (
    <AntLayout className="!bg-custom-gray_100">
      <div className="flex h-screen w-full">
        <SideNav role={user?.['role.name'] as UserPreDefinedRole} />
        <AntLayout className="flex h-screen w-full flex-col overflow-y-scroll">
          <AppHeader />
          <Content className="w-full pt-6">{children}</Content>
        </AntLayout>
      </div>
    </AntLayout>
  );
}

export default Layout;
