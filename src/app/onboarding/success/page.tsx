// import { PageHeader } from "@/components/common";
import React, { lazy } from "react";

const PageContent = lazy(() => import("./PageContent"));

const LoginPage = () => {
  return (
    <div className="!w-full">
      {/* <PageHeader title="Login" description="Admin Login" /> */}
      <PageContent />
    </div>
  );
};

export default LoginPage;
