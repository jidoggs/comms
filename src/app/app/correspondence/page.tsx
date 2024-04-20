'use client';
import { Suspense, lazy } from 'react';
import CorrespondeceListContextWrapper from './service-context/CorrespondeceListContextWrapper';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const CreateCorrespondencePage = () => {
  return (
    <Suspense fallback={null}>
      <CorrespondeceListContextWrapper>
        <CorrespondenceContent />
      </CorrespondeceListContextWrapper>
    </Suspense>
  );
};

export default CreateCorrespondencePage;
