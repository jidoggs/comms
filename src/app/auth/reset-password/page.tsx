// import { PageHeader } from "@/components/common";
import React, { lazy } from "react";

const PageContent = lazy(() => import("./PageContent"));

const ResetPassword = () => {
  return (
    <div className="!w-full">
      {/* <PageHeader title="Reset Password" description="Admin Reset Password" /> */}
      <PageContent />
    </div>
  );
};

export default ResetPassword;
