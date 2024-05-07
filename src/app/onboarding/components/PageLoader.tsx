import React from 'react';
import dynamic from 'next/dynamic';

const Skeleton = dynamic(() => import('antd/es/skeleton/Skeleton'));

const PageLoader: React.FunctionComponent = () => {
  return <Skeleton />;
};

export default PageLoader;
