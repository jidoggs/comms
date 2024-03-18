import React from "react";
import { Breadcrumb } from "antd";
import { useBreadCrumbs } from "@/components/hooks";

function BreadCrumb() {
  const { crumbs } = useBreadCrumbs();
  return (
    <Breadcrumb
      items={[...crumbs]}
      separator={""}
      className="[&_a]:!text-gray-minst-main [&_.ant-breadcrumb-link]:!text-gray-minst-main"
    />
  );
}

export default BreadCrumb;
