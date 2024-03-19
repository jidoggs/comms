import React from "react";
import { SpinLoader } from "@/common/components/icons";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen text-green-minst">
      <SpinLoader size="56" />
    </div>
  );
}

export default PageLoader;
