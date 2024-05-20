import React from 'react';
import dynamic from 'next/dynamic';
import HomeContextWrapper from './service-context/HomeContextWrapper';

const PageLoader = dynamic(() => import('./PageContent'));

const HomePage = () => {
  return (
    <HomeContextWrapper>
      <PageLoader />
    </HomeContextWrapper>
  );
};

export default HomePage;
