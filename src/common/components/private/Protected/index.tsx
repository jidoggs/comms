'use client';
import React, { lazy, useLayoutEffect, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { jwtDecode } from 'jwt-decode';
// import { redirect, useSearchParams } from 'next/navigation';
import FullPageLoader from '../../FullPageLoader';
import useAuth from '@/app/auth/hooks/useAuth';
import { requestRefreshToken } from '@/common/utils';
import { fetchUserToken } from '@/service/storage';
import { ContextWapper } from '@/types';

const AppLayout = lazy(() => import('../Layout'));

function Protected({ children }: ContextWapper) {
  const token = fetchUserToken() || '';

  const refresh = useMemo(() => {
    const decodedToken = (token ? jwtDecode(token)?.exp : 0) as number;
    return requestRefreshToken(decodedToken);
  }, [token]); //eslint-disable-line

  const { isLoading, data } = useAuth({ user: !!token, refresh }).userSwr;
  // const searchParams = useSearchParams();
  // const session_end = searchParams.get('session');
  const role = data?.role?.name;

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || isLoading) return;
    // if (!token && !session_end) {
    //   redirect('/auth/login');
    // }
  }, [token, role, isLoading /* session_end */]);

  return !role || typeof window === 'undefined' ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AppLayout user={data}>{children}</AppLayout>
    </SWRConfig>
  );
}

export default Protected;
