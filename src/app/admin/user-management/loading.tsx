import dynamic from 'next/dynamic';
import React from 'react';

const PageLoader = dynamic(
  () => import('../../../common/components/FullPageLoader'),
  {
    loading() {
      return <div className="h-screen w-screen bg-red-500" />;
    },
  }
);

const Loading: React.FunctionComponent = () => {
  return <PageLoader fullscreen />;
};

export default Loading;
