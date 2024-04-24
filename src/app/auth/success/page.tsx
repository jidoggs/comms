import dynamic from 'next/dynamic';
import React from 'react';

const PageContent = dynamic(() => import('./PageContent'), {
  loading: () => <p>Loading...</p>,
});

const page = () => {
  return (
    <div className="self-stretch">
      <PageContent />
    </div>
  );
};

export default page;
