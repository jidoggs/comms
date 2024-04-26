import React from 'react';
import dynamic from 'next/dynamic';
import PageTitle from '../components/PageTitle';

const VerifyForm = dynamic(() => import('./components/VerifyForm'), {
  loading: () => <p>Loading...</p>,
});

const VerifyPageContent: React.FunctionComponent = () => {
  return (
    <PageTitle
      title="Verification"
      description="Please enter to code sent to your email"
    >
      <VerifyForm />
    </PageTitle>
  );
};

export default VerifyPageContent;
