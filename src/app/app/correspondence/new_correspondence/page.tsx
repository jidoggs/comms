'use client';
import React, { lazy, Suspense } from 'react';
import NewCorrespondenceContext from './service-context/NewCorrespondenceContext';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const CreateCorrespondecePage = () => {
  return (
    <Suspense>
      <NewCorrespondenceContext>
        <CorrespondenceContent />
      </NewCorrespondenceContext>
    </Suspense>
  );
};

export default CreateCorrespondecePage;
