import React, { Suspense, lazy } from 'react';
import PageLoader from '../components/PageLoader';

const PageContent = lazy(() => import('./PageContent'));

const ForgotPassword = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageContent />
    </Suspense>
  );
};

export default ForgotPassword;
