'use client';
import { SWRConfig } from 'swr';
import React, { lazy } from 'react';
import { dummyUser } from '@/common/mockData/user';
import FullPageLoader from '@/common/components/FullPageLoader';
import useAuth from '../auth/hooks/useAuth';

const AppLayout = lazy(() => import('../../common/components/private/Layout'));

export default function Layout({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth({ user: true });
  const role = userData?.title;

  return !role ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AppLayout user={dummyUser}>{children}</AppLayout>
    </SWRConfig>
  );
}
