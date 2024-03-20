'use client';
import { CustomButton } from '@/common/components';
import { useRouter } from 'next/navigation';
import React from 'react';

const PageContent = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="bebas text-custom-black_200 mb-3 text-center text-[24px] font-normal uppercase leading-[28.8px]">
        Password Reset
      </h1>
      <p className="text-custom-gray_200 text-center text-[14px] font-[500] leading-[17.71px]">
        Your password has been updated successfully
      </p>
      <div className="my-5 flex flex-col gap-3">
        <CustomButton
          variant="contained"
          onClick={() => router.push('/app/dashboard')}
          className="bg-custom-main w-full rounded-lg"
        >
          Go to Dashboard
        </CustomButton>

        <CustomButton
          variant="noStyleButton"
          onClick={() => router.push('/auth/login')}
          className="w-full rounded-lg"
        >
          Back to Login
        </CustomButton>
      </div>
    </>
  );
};

export default PageContent;
