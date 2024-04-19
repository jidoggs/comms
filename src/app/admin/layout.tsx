'use client';
import React from 'react';
import useAuth from '../auth/hooks/useAuth';
import Protected from '@/common/components/private/Protected';
import { redirect } from 'next/navigation';
import { UserPreDefinedRole } from '@/types';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useAuth({ user: true }).userSwr;

  if (data?.role?.name !== UserPreDefinedRole.PRIMARYADMIN) {
    return redirect('/app/home');
  }

  return <Protected>{children}</Protected>;
}
