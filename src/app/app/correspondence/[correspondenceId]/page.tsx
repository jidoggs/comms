'use client';
// import { AppPageLoader } from '@/components/common';
import React, { lazy, Suspense } from 'react';
import DetailContextWrapper from './service-context/DetailContextWrapper';
import AppContextWrapper from './service-context/AppContextWrapper';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const Page: React.FunctionComponent = () => {
  return (
    <Suspense>
      <AppContextWrapper>
        <DetailContextWrapper>
          <CorrespondenceContent />
        </DetailContextWrapper>
      </AppContextWrapper>
    </Suspense>
  );
};

export default Page;
