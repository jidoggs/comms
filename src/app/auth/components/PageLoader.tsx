import dynamic from 'next/dynamic';
import React from 'react';

const Skeleton = dynamic(() => import('antd/es/skeleton'));

const PageLoader: React.FunctionComponent = () => {
  return <Skeleton />;
};

export default PageLoader;
