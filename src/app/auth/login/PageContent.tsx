'use client';
import React, { useLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageTitle from '../components/PageTitle';
import useSession from '@/common/hooks/useSession';
import LoginForm from './components/LoginForm';
import { clearUserDetails, fetchUserToken } from '@/service/storage';

const LoginPageContent: React.FunctionComponent = () => {
  const token = fetchUserToken() || '';
  const { loggoutSuccessHandler, messageContext } = useSession();
  const searchParams = useSearchParams();
  const session_end = searchParams.get('session');

  const isServer = typeof window === 'undefined';

  useLayoutEffect(() => {
    if (session_end) {
      loggoutSuccessHandler(session_end);
    }
    if (!token || isServer) {
      return;
    }
    if (token) {
      clearUserDetails();
    }
  }, [token, isServer, session_end]); //eslint-disable-line
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
