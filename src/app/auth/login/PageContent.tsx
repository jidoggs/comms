'use client';
import React, { useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageTitle from '../components/PageTitle';
import useSession from '@/common/hooks/useSession';
// import LoginForm from './components/LoginForm';
import { isServer } from '@/common/utils';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./components/LoginForm'), {
  loading: () => <p>Loading...</p>,
});

const LoginPageContent: React.FunctionComponent = () => {
  const { loggoutSuccessHandler, messageContext } = useSession();
  const searchParams = useSearchParams();
  const session_end = searchParams.get('session');

  useLayoutEffect(() => {
    if (isServer) return;
    if (session_end) {
      loggoutSuccessHandler(session_end); // notifies user when he logs out
    }
  }, [isServer, session_end]); //eslint-disable-line

  return (
    <>
      {messageContext}
      <PageTitle title="Welcome Back!" description="Please enter your details.">
        <LoginForm />
      </PageTitle>
    </>
  );
};

export default LoginPageContent;
