'use client';
import React, { lazy, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { jwtDecode } from 'jwt-decode';
import FullPageLoader from '@/common/components/FullPageLoader';
import useAuth from '../auth/hooks/useAuth';
import { fetchUserToken } from '@/service/storage';
import { requestRefreshToken } from '@/common/utils';

const AppLayout = lazy(() => import('../../common/components/private/Layout'));

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = fetchUserToken() || '';

  const refresh = useMemo(() => {
    const decodedToken = (token ? jwtDecode(token)?.exp : 0) as number;
    return requestRefreshToken(decodedToken);
  }, [token]); //eslint-disable-line

  const { userData } = useAuth({ user: true, refresh });
  const role = userData?.title;

  return !role ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AppLayout user={userData}>{children}</AppLayout>
    </SWRConfig>
  );
}
