'use client';
import { Suspense, lazy } from 'react';
import CorrespondeceListContextWrapper from './service-context/CorrespondeceListContextWrapper';
import FullPageLoader from '@/common/components/FullPageLoader';

const CorrespondenceContent = lazy(() => import('./PageContent'));

const CreateCorrespondencePage = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <CorrespondeceListContextWrapper>
        <CorrespondenceContent />
      </CorrespondeceListContextWrapper>
    </Suspense>
  );
};

export default CreateCorrespondencePage;
