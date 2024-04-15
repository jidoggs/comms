'use client';

import CustomButton from '@/common/components/CustomButton';
import { useRouter } from 'next/navigation';
import React from 'react';

const PageContent = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="bebas mb-3 text-center text-[24px] font-normal uppercase leading-[28.8px] text-custom-black_200">
        Password Reset
      </h1>
      <p className="text-center text-[14px] font-[500] leading-[17.71px] text-custom-gray_200">
        Your password has been updated successfully
      </p>
      <div className="my-5 flex flex-col gap-3">
        <CustomButton onClick={() => router.push('/app/dashboard')}>
          Go to Dashboard
        </CustomButton>

        <CustomButton type="text" onClick={() => router.push('/auth/login')}>
          Back to Login
        </CustomButton>
      </div>
    </>
  );
};

export default PageContent;
