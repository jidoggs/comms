import React from 'react';
import dynamic from 'next/dynamic';

const StepTwoForm = dynamic(() => import('./components/StepTwoForm'));

const LoginPageContent: React.FunctionComponent = () => {
  return <StepTwoForm />;
};

export default LoginPageContent;
