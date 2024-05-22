import { Suspense, lazy } from 'react';

import UserMgmtContextWrapper from './service-context/UserMgmtContextWrapper';
import FullPageLoader from '@/common/components/FullPageLoader';

const UserContent = lazy(() => import('./components/PageContent'));

const Page = () => {
  return (
    <UserMgmtContextWrapper>
      <Suspense fallback={<FullPageLoader />}>
        <UserContent />
      </Suspense>
    </UserMgmtContextWrapper>
  );
};

export default Page;
