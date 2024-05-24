'use client';
import React, { Suspense, useLayoutEffect } from 'react';
import Protected from '@/common/components/private/Protected';
import { redirect } from 'next/navigation';
import useSession from '../../common/hooks/useSession';
import { isServer } from '@/common/utils';
import { socket } from '@/service/socket';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isSecondaryAdmin } = useSession();
  const role = data?.role?.name;
  // const mountOnce = useRef(false);

  console.log(socket.disconnected, socket.connected); //eslint-disable-line

  // useEffect(() => {
  //   if (mountOnce.current) {
  //     return;
  //   }
  //   mountOnce.current = true;
  //   socket.connect();

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useLayoutEffect(() => {
    if (isServer || !role) return;
    if (isSecondaryAdmin) {
      redirect('/admin/people');
    }
  }, [role, isSecondaryAdmin]);

  return (
    <Protected>
      <Suspense fallback={null}>{children}</Suspense>
    </Protected>
  );
}
