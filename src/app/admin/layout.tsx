'use client';
import React, { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import Protected from '@/common/components/private/Protected';
import useSession from '../../common/hooks/useSession';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isPrimaryAdmin, data } = useSession();
  const role = data?.role?.name;

  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !role) return;
    if (isPrimaryAdmin) {
      redirect('/app/home');
    }
  }, [role, isPrimaryAdmin]);

  return <Protected>{children}</Protected>;
}
