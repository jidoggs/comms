import React, { lazy } from 'react';

const PageContent = lazy(() => import('./PageContent'));

const SuccessPage = () => {
  return (
    <div className="flex w-[450px] items-center justify-center rounded-2xl bg-custom-white_100 p-5">
      <PageContent />
    </div>
  );
};

export default SuccessPage;
