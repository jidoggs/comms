import React, { lazy } from 'react';

const PeopleContent = lazy(() => import('./components/PageContent'));

function page() {
  return (
    <div className="">
      <PeopleContent />
    </div>
  );
}

export default page;
