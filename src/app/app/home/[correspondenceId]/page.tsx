'use client';
// import { AppPageLoader } from '@/components/common';
import React, { lazy, Suspense } from 'react';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const Page: React.FunctionComponent = () => {
  return (
    <Suspense>
      <CorrespondenceContent />
    </Suspense>
  );
};

export default Page;
