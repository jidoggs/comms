'use client';
import React from 'react';
import { Form } from 'antd';
import CustomButton from '@/common/components/CustomButton';
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { ArrowRight, ArrowRightBreak } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import Title from '@/common/components/Title';
import SectionCascade from '@/common/components/SectionCascade';
import { useSectionCascade } from '@/common/hooks';

const StepTwoForm = () => {
  const router = useRouter();
  const { clickCascadeItemHandler, dataList } = useSectionCascade();

  const onFinish = () => {
    const currentOnboardingData =
      JSON.parse(localStorage.getItem('onboardingData') as string) || [];

    const updatedData = { ...currentOnboardingData, invite_code: '123456' };
    localStorage.setItem('onboardingData', JSON.stringify(updatedData));

    router.push('/onboarding/set-password');
    // officeInfoTrigger({ data: department, type: 'post' }).then(() => {
    //   router.push('/onboarding/set-password');
    // });
  };

  return (
    <Form
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
    >
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
          size="small"
          type="primary"
          onClick={() => router.push('/onboarding/set-password')}
        >
          <span className="pr-1">Skip step and add</span>
          <ArrowRightBreak />
        </CustomButton>

        <CustomButton
          // loading={officeInfoIsMutating}
          disabled={dataList.department.id === ''}
          htmlType="submit"
          size="small"
        >
          <span className="pr-1">Submit details</span>
          {/* {officeInfoIsMutating ? null : <ArrowRight />} */}
        </CustomButton>
      </div>
    </Form>
  );
};

export default StepTwoForm;
