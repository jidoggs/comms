import { Skeleton } from 'antd';
import React from 'react';

const PageLoader: React.FunctionComponent = () => {
  return (
    <div className="mt-2 grid grid-cols-10 items-start gap-4 bg-custom-white_100 p-4">
      <div className="col-span-2">
        <Skeleton.Input active size="small" className="!w-full" />
      </div>
      <div className="col-span-7 flex flex-col justify-between">
        <div className="w-full">
          <Skeleton.Button active size="small" className="" />
          <div className="w-full py-2">
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Skeleton.Button active size="small" className="" />
          <div className="py-2">
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Skeleton.Button active size="small" className="" />
          <div className="py-2">
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Skeleton.Button active size="small" className="" />
          <div className="py-2">
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
            <Skeleton.Button active size="small" className="pr-2" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-end gap-2">
        <Skeleton.Button active size="small" className="!w-full" />
      </div>
    </div>
  );
};

export default PageLoader;
