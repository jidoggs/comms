import { Suspense, lazy } from 'react';
import UserMgmtContextWrapper from './service-context/UserMgmtContextWrapper';

const UserContent = lazy(() => import('./components/PageContent'));

const Page = () => {
  return (
    <Suspense>
      <UserMgmtContextWrapper>
        <UserContent />
      </UserMgmtContextWrapper>
    </Suspense>
  );
};

export default Page;
