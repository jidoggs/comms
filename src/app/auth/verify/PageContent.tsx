import React from 'react';
import PageTitle from '../components/PageTitle';
import VerifyForm from './components/VerifyForm';

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
