/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';
import React, { useState } from 'react';
import { Form } from 'antd';
import CustomButton from '@/common/components/CustomButton';
import { ArrowRight, ArrowRightBreak } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import useOnboarding from '@/app/auth/hooks/useOnboarding';
import Title from '@/common/components/Title';
import DepartmentOfficesCascade from '@/common/components/DepartmentOfficesCascade/DepartmentOfficesCascade';
import { iHandleClick } from '@/types';

const initialDataList = { parastatal: '', office: '', department: '' };

const StepTwoForm = () => {
  const router = useRouter();
  const [dataList, setDataList] = useState(initialDataList);
  const { officeInfoTrigger, officeInfoIsMutating } = useOnboarding({
    office_info: true,
  });

  const clickHandler: iHandleClick = (e) => {
    const dataset = e.currentTarget.dataset;
    const value = dataset.value as string;

    switch (dataset.step) {
      case 'parastatals':
        setDataList({
          ...initialDataList,
          parastatal: value,
        });
        break;
      case 'office':
        setDataList((prev) => ({
          ...prev,
          office: value,
          department: '',
        }));
        break;
      case 'department':
        setDataList((prev) => ({
          ...prev,
          department: value,
        }));
        break;

      default:
        setDataList({
          ...initialDataList,
        });
        break;
    }
  };

  const onFinish = () => {
    // router.push('/onboarding/set-password');
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
        <DepartmentOfficesCascade
          clickHandler={clickHandler}
          dataList={dataList}
          className="overflow-hidden rounded-lg"
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
          loading={officeInfoIsMutating}
          disabled={dataList.department === ''}
          htmlType="submit"
          size="small"
        >
          <span className="pr-1">Submit details</span>
          {officeInfoIsMutating ? null : <ArrowRight />}
        </CustomButton>
      </div>
    </Form>
  );
};

export default StepTwoForm;
