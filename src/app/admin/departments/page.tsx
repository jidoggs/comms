import React, { Suspense, lazy } from 'react';
import FullPageLoader from '@/common/components/FullPageLoader';

const PeopleContent = lazy(() => import('./components/PageContent'));

function page() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <PeopleContent />
    </Suspense>
  );
}

export default page;
