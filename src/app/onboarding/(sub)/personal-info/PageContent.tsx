'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import useOnboarding from '../../hooks/useOnboarding';
import { formatPhoneNumber } from '@/common/utils';

const StepOneForm = dynamic(() => import('./components/StepOneForm'));
const ApproveModalContent = dynamic(
  () => import('../../../../common/components/ApproveModalContent')
);

const LoginPageContent: React.FunctionComponent = () => {
  const { nonAuthSwr } = useOnboarding({ step: 1 });
  const [inData, setInData] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onFinish = (values: Record<string, string>) => {
    const dataKeys = Object.keys(values) as Array<keyof typeof values>;
    let data: Record<string, string> = {};

    dataKeys.forEach((key) => {
      if (values[key] && key !== 'phone') {
        data[key] = values[key];
      }
      if (values[key] && key === 'phone') {
        data[key] = formatPhoneNumber(values[key]);
      }
    });

    setInData(data);
    setIsModalOpen(true);
  };

  const cancelHandler = () => {
    setIsModalOpen(false);
  };

  const confirmationHandler = () => {
    nonAuthSwr.trigger({ data: inData }).finally(cancelHandler);
  };

  return (
    <>
      <StepOneForm onFinish={onFinish} isMutating={nonAuthSwr.isMutating} />
      <ApproveModalContent
        isModalOpen={isModalOpen}
        isLoading={nonAuthSwr.isMutating}
        handleSubmit={confirmationHandler}
        actionText="continue"
        handleCancel={cancelHandler}
        text="Are you sure of the information you want to submit"
      />
    </>
  );
};

export default LoginPageContent;
