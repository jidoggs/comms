// import { PageHeader } from "@/components/common";
import React, { lazy } from "react";

const PageContent = lazy(() => import("./PageContent"));

const ForgotPassword = () => {
  return (
    <div className="!w-full">
      {/* <PageHeader title="Forgot Password" description="Admin Forgot Password" /> */}
      <PageContent />
    </div>
  );
};

export default ForgotPassword;
