import React from 'react';
import PageTitle from '../components/PageTitle';
import LoginForm from './components/LoginForm';

const LoginPageContent: React.FunctionComponent = () => {
  return (
    <PageTitle title="Welcome Back!" description="Please enter your details.">
      <LoginForm />
    </PageTitle>
  );
};

export default LoginPageContent;
