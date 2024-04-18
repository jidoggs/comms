import { Suspense, lazy } from 'react';
import PeopleListContextWrapper from './service-context/PeopleListContextWrapper';

const PeopleContent = lazy(() => import('./components/PageContent'));

const Page = () => {
  return (
    <Suspense>
      <PeopleListContextWrapper>
        <PeopleContent />
      </PeopleListContextWrapper>
    </Suspense>
  );
};

export default Page;
