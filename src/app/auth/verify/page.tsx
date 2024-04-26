import React from 'react';
import PageLoader from '../components/PageLoader';
import dynamic from 'next/dynamic';

const PageContent = dynamic(() => import('./PageContent'), {
  loading: () => <PageLoader />,
});

const Verify = () => {
  return <PageContent />;
};

export default Verify;
