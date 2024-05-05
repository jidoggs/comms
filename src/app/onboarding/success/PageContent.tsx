'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';

const LoginPageContent: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center gap-y-3">
      <Image src="/success.gif" alt="success-svg" width={100} height={100} />
      <Title tag="h4">Password Set</Title>
      <Title className="py-3 text-center text-custom-gray_600">
        Your password has been set successfully. Awaiting approval
      </Title>
      <CustomButton
        size="small"
        className="container rounded-md border !border-custom-main"
        type="text"
        onClick={() => router.replace('/auth/login')}
      >
        Login
      </CustomButton>
    </div>
  );
};

export default LoginPageContent;
