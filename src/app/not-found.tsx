'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const Result = dynamic(() => import('antd/es/result/index'));
const CustomButton = dynamic(() => import('@/common/components/CustomButton'));

const NotFound = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-custom-gray_100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <div className="flex w-full items-center justify-center">
            <CustomButton href="/" type="primary">
              Return Home
            </CustomButton>
          </div>
        }
      />
    </div>
  );
};

export default NotFound;
