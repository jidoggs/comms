// import { PageHeader } from "@/components/common";
import React, { lazy } from "react";

const PageContent = lazy(() => import("./PageContent"));

const Verify = () => {
  return (
    <div className="!w-full">
      {/* <PageHeader title="Forgot" description="Admin Forgot Password" /> */}
      <PageContent />
    </div>
  );
};

export default Verify;
