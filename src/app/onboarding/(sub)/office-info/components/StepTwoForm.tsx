/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
'use client';
import React, { useState } from 'react';
import { Form } from 'antd';
// import Link from 'next/link';
// import CustomInput from '@/common/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight, ArrowRightBreak } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import useOnboarding from '@/app/auth/hooks/useOnboarding';
import Title from '@/common/components/Title';
import DepartmentOfficesCascade from '@/common/components/DepartmentOfficesCascade/DepartmentOfficesCascade';

const StepTwoForm = () => {
  const router = useRouter();
  // const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const { officeInfoTrigger, officeInfoIsMutating } = useOnboarding({
    office_info: true,
  });

  const onFinish = () => {
    const department = {
      selectedDepartment,
    };
    // router.push('/onboarding/set-password');
    // officeInfoTrigger({ data: department, type: 'post' }).then(() => {
    //   router.push('/onboarding/set-password');
    // });
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      className="!w-full"
      style={{ width: '100%' }}
    >
      <Title>Click to select Parastatal, office and department</Title>
      <DepartmentOfficesCascade
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        // currentStep={currentStep}
        // setCurrentStep={setCurrentStep}
      />
      <div className="flex flex-row justify-end gap-2">
        <Form.Item>
          <CustomButton
            block
            size="small"
            type="primary"
            onClick={() => router.push('/onboarding/set-password')}
          >
            <span className="pr-1">Skip step and add</span>
            <ArrowRightBreak />
          </CustomButton>
        </Form.Item>
        <Form.Item>
          <CustomButton
            loading={officeInfoIsMutating}
            disabled={selectedDepartment === ''}
            htmlType="submit"
            block
            size="small"
          >
            <span className="pr-1">Continue</span>
            {officeInfoIsMutating ? null : <ArrowRight />}
          </CustomButton>
        </Form.Item>
      </div>
    </Form>
  );
};

export default StepTwoForm;
