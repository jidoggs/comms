'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import PageTitle from '../components/PageTitle';

const LoginForm = dynamic(() => import('./components/LoginForm'), {
  loading: () => <p>Loading...</p>,
});

const LoginPageContent: React.FunctionComponent = () => {
  return (
    <>
      <PageTitle title="Welcome Back!" description="Please enter your details.">
        <LoginForm />
      </PageTitle>
    </>
  );
};

export default LoginPageContent;
