import React, { lazy, Suspense } from 'react';
import PageLoader from '../../components/PageLoader';

const PageContent = lazy(() => import('./PageContent'));

const LoginPage = () => {
  return (
    <div className="!w-full">
      <Suspense fallback={<PageLoader />}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default LoginPage;
