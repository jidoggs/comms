'use client';
import React, { Suspense, lazy, useLayoutEffect, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import FullPageLoader from '../../FullPageLoader';
import useAuth from '@/app/auth/hooks/useAuth';
import { isServer, requestRefreshToken } from '@/common/utils';
import { fetchUserToken } from '@/service/storage';
import { ContextWapper } from '@/types';

const AppLayout = lazy(() => import('../Layout'));

function Protected({ children }: ContextWapper) {
  const token = fetchUserToken();
  const router = useRouter();

  const refresh = useMemo(() => {
    const decodedToken = (token ? jwtDecode(token)?.exp : 0) as number;
    return requestRefreshToken(decodedToken);
  }, [token]); //eslint-disable-line

  const { isLoading, data } = useAuth({ user: !!token, refresh }).userSwr;
  const role = data?.role?.name;

  const unAuthorizedHandler = () => {
    if (!token) {
      router.replace(
        `/auth/login?type=unauthorized&session=${new Date().toISOString()}`
      );
    }
  };

  useLayoutEffect(() => {
    if (isServer || isLoading || token) return;
    if (!token && !document.referrer) {
      unAuthorizedHandler();
    }

    let timer;
    timer = setTimeout(() => {
      unAuthorizedHandler();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [token, isLoading]); //eslint-disable-line

  return (
    <Suspense fallback={<FullPageLoader fullscreen />}>
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
