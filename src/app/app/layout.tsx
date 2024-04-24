'use client';
import React, { useLayoutEffect } from 'react';
import Protected from '@/common/components/private/Protected';
import { redirect } from 'next/navigation';
import useSession from '../../common/hooks/useSession';
import { isServer } from '@/common/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data, isSecondaryAdmin } = useSession();
  const role = data?.role?.name;

  useLayoutEffect(() => {
    if (isServer || !role) return;
    if (isSecondaryAdmin) {
      redirect('/admin/people');
    }
  }, [role, isSecondaryAdmin]);

  return <Protected>{children}</Protected>;
}
