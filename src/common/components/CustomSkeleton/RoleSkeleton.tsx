import React from 'react';
import dynamic from 'next/dynamic';

const Button = dynamic(() => import('antd/es/skeleton/Button'));
const Input = dynamic(() => import('antd/es/skeleton/Input'));

const RoleSkeleton: React.FunctionComponent = () => {
  return (
    <div className="mt-2 grid grid-cols-10 items-start gap-4 bg-custom-white_100 p-4">
      <div className="col-span-2">
        <Input active size="small" className="!w-full" />
      </div>
      <div className="col-span-7 flex flex-col justify-between">
        <div className="w-full">
          <Button active size="small" className="" />
          <div className="w-full py-2">
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Button active size="small" className="" />
          <div className="py-2">
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Button active size="small" className="" />
          <div className="py-2">
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
          </div>
        </div>
        <div className="w-full pt-1">
          <Button active size="small" className="" />
          <div className="py-2">
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
            <Button active size="small" className="pr-2" />
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-end gap-2">
        <Button active size="small" className="!w-full" />
      </div>
    </div>
  );
};

export default RoleSkeleton;
