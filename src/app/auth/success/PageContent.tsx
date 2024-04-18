'use client';

import CustomButton from '@/common/components/CustomButton';
import React from 'react';
import PageTitle from '../components/PageTitle';
import Image from 'next/image';

const PageContent = () => {
  return (
    <div className="flex flex-col">
      <Image
        className="mb-5 size-24 self-center"
        src="/success.gif"
        alt="success"
        width={100}
        height={100}
      />
      <PageTitle
        title="Password Reset"
        description="Your password has been updated successfully"
      >
        <div className="flex flex-col gap-y-5">
          <CustomButton block href="/app/dashboard">
            Go to Dashboard
          </CustomButton>
          <CustomButton block type="text" href="/auth/login">
            Back to Login
          </CustomButton>
        </div>
      </PageTitle>
    </div>
  );
};

export default PageContent;
