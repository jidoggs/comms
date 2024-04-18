import React from 'react';
import ForgotForm from './components/ForgotForm';
import PageTitle from '../components/PageTitle';

const ForgotPageContent: React.FunctionComponent = () => {
  return (
    <PageTitle
      title="Forgot Password"
      description="To reset your login password, please enter your email and continue"
    >
      <ForgotForm />
    </PageTitle>
  );
};

export default ForgotPageContent;
