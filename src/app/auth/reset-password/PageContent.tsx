import React from 'react';
import ResetPasswordForm from './components/ResetPasswordForm';
import PageTitle from '../components/PageTitle';

const PageContent = () => {
  return (
    <PageTitle title="Reset Password" description="Enter a new password">
      <ResetPasswordForm />
    </PageTitle>
  );
};

export default PageContent;
