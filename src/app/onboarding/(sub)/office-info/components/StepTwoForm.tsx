'use client';
import React, { useState } from 'react';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight } from '@/common/components/icons';
import Title from '@/common/components/Title';
import SectionCascade from '@/common/components/SectionCascade';
import { useSectionCascade } from '@/common/hooks';
import useOnboarding from '@/app/onboarding/hooks/useOnboarding';
import ApproveModalContent from '@/common/components/ApproveModalContent';
import { getItem } from '@/service/storage';

const StepTwoForm = () => {
  const { clickCascadeItemHandler, dataList } = useSectionCascade();
  const { authSwr, finalOfficeStep } = useOnboarding({ step: 2 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data_keys = Object.keys(dataList) as Array<keyof typeof dataList>;

  const clickHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitHandler = () => {
    const _id = getItem('uid');
    let data: Record<string, string> = { _id };

    data_keys.forEach((key) => {
      if (dataList[key].id) {
        data[key] = dataList[key].id;
      }
    });

    authSwr.trigger({ data, type: 'patch' }).finally(closeModal);
  };

  return (
    <div className="!w-full">
      <Title>Click to select Parastatal, office and department</Title>
      {/* is-onboard and group are style identifies */}
      <div className="is-onboard group w-full max-w-screen-lg overflow-x-scroll py-2">
        <SectionCascade
          className="overflow-hidden rounded-lg"
          clickCascadeItemHandler={clickCascadeItemHandler}
          dataList={dataList}
        />
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <CustomButton
          disabled={dataList[finalOfficeStep].id === '' || authSwr.isMutating}
          htmlType="submit"
          size="small"
          onClick={clickHandler}
        >
          <span className="pr-1">Submit details</span>
          {authSwr.isMutating ? null : <ArrowRight />}
        </CustomButton>
      </div>
      <ApproveModalContent
        isModalOpen={isModalOpen}
        isLoading={authSwr.isMutating}
        handleSubmit={submitHandler}
        actionText="continue"
        handleCancel={closeModal}
        text="Are you sure of the information you want to submit"
      />
    </div>
  );
};

export default StepTwoForm;
