// import { PageHeader } from "@/components/common";
import React, { lazy } from 'react';

const PageContent = lazy(() => import('./PageContent'));

const LoginPage = () => {
  return (
    <div className="flex w-[410px] items-center justify-center rounded-2xl bg-custom-white_100">
      <div className="flex w-full flex-col items-center justify-center p-5">
        <PageContent />
      </div>
    </div>
  );
};

export default LoginPage;
