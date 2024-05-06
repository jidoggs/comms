'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import { helveticaNeue } from '@/common/font';

const SuccessPageContent: React.FunctionComponent = () => {
  const router = useRouter();
  const clickHandler = () => router.replace('/auth/login');
  return (
    <div className="flex w-full flex-col items-center gap-y-3.5 py-5">
      <Image src="/success.gif" alt="success-svg" width={100} height={100} />
      <Title
        tag="h1"
        className={`text-center text-xl capitalize leading-6 ${helveticaNeue.className}`}
      >
        Password Set
      </Title>
      <Title className="text-center text-custom-gray_200">
        Your password has been set successfully. Awaiting approval
      </Title>
      <CustomButton
        className="rounded-md !border-2 !border-custom-main !bg-custom-gray_900 !px-10 !py-4 !text-base leading-none"
        type="primary"
        onClick={clickHandler}
      >
        Go to Login
      </CustomButton>
    </div>
  );
};

export default SuccessPageContent;
