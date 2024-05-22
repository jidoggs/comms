import React from 'react';
import HomeContextWrapper from './service-context/HomeContextWrapper';
import PageContent from './PageContent';

const HomePage = () => {
  return (
    <HomeContextWrapper>
      <PageContent />
    </HomeContextWrapper>
  );
};

export default HomePage;
