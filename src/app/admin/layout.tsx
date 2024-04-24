'use client';
import React, { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import Protected from '@/common/components/private/Protected';
import useSession from '../../common/hooks/useSession';
import { isServer } from '@/common/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isBasicUser, data } = useSession();
  const role = data?.role?.name;

  useLayoutEffect(() => {
    if (isServer || !role) return;
    if (isBasicUser) {
      redirect('/app/home');
    }
  }, [role, isBasicUser]);

  return <Protected>{children}</Protected>;
}
