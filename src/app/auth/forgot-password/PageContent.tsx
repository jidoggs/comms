import React from 'react';
import dynamic from 'next/dynamic';
import PageTitle from '../components/PageTitle';

const ForgotForm = dynamic(() => import('./components/ForgotForm'), {
  loading: () => <p>Loading...</p>,
});

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
