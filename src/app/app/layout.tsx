'use client';
import { SWRConfig } from 'swr';
import React, { lazy } from 'react';
import { dummyUser } from '@/common/mockData/user';
import FullPageLoader from '@/common/components/FullPageLoader';

const AppLayout = lazy(() => import('../../common/components/private/Layout'));

export default function Layout({ children }: { children: React.ReactNode }) {
  const role = dummyUser?.roles?.name;

  return !role ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AppLayout user={dummyUser}>{children}</AppLayout>
    </SWRConfig>
  );
}
