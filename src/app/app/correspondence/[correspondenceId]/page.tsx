'use client';
// import { AppPageLoader } from '@/components/common';
import React, { lazy, Suspense } from 'react';
import DetailContextWrapper from './components/service-context/DetailContextWrapper';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const Page: React.FunctionComponent = () => {
  return (
    <Suspense>
      <DetailContextWrapper>
        <CorrespondenceContent />
      </DetailContextWrapper>
    </Suspense>
  );
};

export default Page;
