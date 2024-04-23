import React, { Suspense, lazy } from 'react';
import PageLoader from '../components/PageLoader';

const PageContent = lazy(() => import('./PageContent'));

const Verify = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageContent />
    </Suspense>
  );
};

export default Verify;
