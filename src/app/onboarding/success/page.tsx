import React, { Suspense, lazy } from 'react';
import PageLoader from '../components/PageLoader';

const PageContent = lazy(() => import('./PageContent'));

const SuccessPage = () => {
  return (
    <div className="flex w-[450px] items-center justify-center rounded-2xl bg-custom-white_100 p-5">
      <Suspense fallback={<PageLoader />}>
        <PageContent />
      </Suspense>
    </div>
  );
};

export default SuccessPage;
