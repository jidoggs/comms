import React, { lazy } from "react";

const PageLoader = lazy(() => import("./components/PageLoader"));

const Loading: React.FunctionComponent = () => {
  return <PageLoader />;
};

export default Loading;
