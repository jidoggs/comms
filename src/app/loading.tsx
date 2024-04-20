import React, { lazy } from 'react';

const PageLoader = lazy(() => import('../common/components/FullPageLoader'));

const Loading: React.FunctionComponent = () => {
  return <PageLoader />;
};

export default Loading;
