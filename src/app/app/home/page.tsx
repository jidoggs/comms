import React from 'react';
import dynamic from 'next/dynamic';

const PageLoader = dynamic(() => import('./PageContent'));

const HomePage = () => {
  return <PageLoader />;
};

export default HomePage;
