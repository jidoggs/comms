'use client';
import React, { useLayoutEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import PageTitle from '../components/PageTitle';
import { useAuth } from '../hooks';
import { isServer } from '@/common/utils';

const LoginForm = dynamic(() => import('./components/LoginForm'), {
  loading: () => <p>Loading...</p>,
});

const LoginPageContent: React.FunctionComponent = () => {
  const { loggoutSuccessHandler } = useAuth();
  const searchParams = useSearchParams();
  const session_end = searchParams.get('session') as string;
  const type = searchParams.get('type') as string;

  useLayoutEffect(() => {
    if (isServer) return;
    if (session_end) {
      loggoutSuccessHandler(session_end, type); // notifies user when he logs out
    }
  }, [isServer, session_end]); //eslint-disable-line

  return (
    <>
      <PageTitle title="Welcome Back!" description="Please enter your details.">
        <LoginForm />
      </PageTitle>
    </>
  );
};

export default LoginPageContent;
