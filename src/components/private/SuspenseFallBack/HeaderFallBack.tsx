import React from "react";
import { Skeleton } from "antd";

const { Avatar, Input } = Skeleton;

function HeaderFallBack() {
  return (
    <div className="py-4 px-5 flex w-full justify-between items-center">
      <Input size="small" active />
      <div className="flex items-center gap-x-2.5">
        <div className="flex items-center gap-x-2.5">
          <Avatar size="large" active />
          <div className="flex flex-col gap-y-1">
            <Input size="small" active />
            <Input size="small" active />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderFallBack;
