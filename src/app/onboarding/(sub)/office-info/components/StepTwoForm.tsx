'use client';
import React, { useState } from 'react';
import { useOnboarding } from '@/app/onboarding/hooks';
import { useSectionCascade } from '@/common/hooks';
import { fetchOnboardUid } from '@/service/storage';
import SectionCascade from '@/common/components/SectionCascade';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import ApproveModalContent from '@/common/components/ApproveModalContent';
import { ArrowRight } from '@/common/components/icons';

const StepTwoForm = () => {
  const { clickCascadeItemHandler, dataList } = useSectionCascade();
  const { authSwr, finalOfficeOnboardingStep } = useOnboarding({ step: 2 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data_keys = Object.keys(dataList) as Array<keyof typeof dataList>;

  const clickHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitHandler = () => {
    const _id = fetchOnboardUid();
    let data: Record<string, string> = { _id };

    data_keys.forEach((key) => {
      if (dataList[key].id) {
        data[key] = dataList[key].id;
      }
    });

    authSwr.trigger({ data, type: 'put' }).finally(closeModal);
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
          mode="onboarding"
        />
      </div>
      <div className="flex items-center justify-end gap-x-2">
        <CustomButton
          disabled={
            dataList[finalOfficeOnboardingStep].id === '' || authSwr.isMutating
          }
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
