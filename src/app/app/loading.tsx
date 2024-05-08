import dynamic from 'next/dynamic';
import React from 'react';

const PageLoader = dynamic(() => import('../../common/components/FullPageLoader'));

const Loading: React.FunctionComponent = () => {
  return <PageLoader fullscreen />;
};

export default Loading;
