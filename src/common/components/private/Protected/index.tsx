import React, { lazy, useMemo } from 'react';
import { SWRConfig } from 'swr';
import { jwtDecode } from 'jwt-decode';
import FullPageLoader from '../../FullPageLoader';
import useAuth from '@/app/auth/hooks/useAuth';
import { requestRefreshToken } from '@/common/utils';
import { fetchUserToken } from '@/service/storage';
import { ContextWapper } from '@/types';
import { redirect } from 'next/navigation';

const AppLayout = lazy(() => import('../Layout'));

function Protected({ children }: ContextWapper) {
  const token = fetchUserToken() || '';

  const refresh = useMemo(() => {
    const decodedToken = (token ? jwtDecode(token)?.exp : 0) as number;
    return requestRefreshToken(decodedToken);
  }, [token]); //eslint-disable-line

  const { data } = useAuth({ user: true, refresh }).userSwr;
  const role = data?.role?.name;

  if (!token) {
    redirect('/auth/login');
  }

  return !role ? (
    <FullPageLoader fullscreen />
  ) : (
    <SWRConfig value={{ provider: () => new Map() }}>
      <AppLayout user={data}>{children}</AppLayout>
    </SWRConfig>
  );
}

export default Protected;
