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
      <div className="flex h-screen w-full overflow-hidden">
        <SideNav role={user?.['role.name'] as UserPreDefinedRole} />
        <AntLayout className="flex h-screen w-full flex-col overflow-hidden">
          <AppHeader />
          <Content className="w-full">{children}</Content>
        </AntLayout>
      </div>
    </AntLayout>
  );
}

export default Layout;
