import React from 'react';
import dynamic from 'next/dynamic';

const ForgotForm = dynamic(() => import('./components/ForgotForm'), {
  loading: () => <p>Loading...</p>,
});
const PageTitle = dynamic(() => import('../components/PageTitle'));

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
