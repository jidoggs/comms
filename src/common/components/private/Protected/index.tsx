'use client';
import React, { Suspense, lazy, useLayoutEffect, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { jwtDecode } from 'jwt-decode';
import { redirect } from 'next/navigation';
import FullPageLoader from '../../FullPageLoader';
import useAuth from '@/app/auth/hooks/useAuth';
import { isServer, requestRefreshToken } from '@/common/utils';
import { fetchUserToken } from '@/service/storage';
import { ContextWapper } from '@/types';

const AppLayout = lazy(() => import('../Layout'));

function Protected({ children }: ContextWapper) {
  const token = fetchUserToken();

  const refresh = useMemo(() => {
    const decodedToken = (token ? jwtDecode(token)?.exp : 0) as number;
    return requestRefreshToken(decodedToken);
  }, [token]); //eslint-disable-line

  const { isLoading, data } = useAuth({ user: !!token, refresh }).userSwr;
  const role = data?.role?.name;

  useLayoutEffect(() => {
    if (isServer || isLoading || token) return;
    if (!token && !document.referrer) {
      redirect('/auth/login');
    }
  }, [token, isLoading]);

  return (
    <Suspense fallback={null}>
      {!role || isServer ? (
        <FullPageLoader fullscreen />
      ) : (
        <SWRConfig value={{ provider: () => new Map() }}>
          <AppLayout user={data}>{children}</AppLayout>
        </SWRConfig>
      )}
    </Suspense>
  );
}

export default Protected;
