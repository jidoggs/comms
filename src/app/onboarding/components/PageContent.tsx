'use client';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import Form from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import OnboardingForm from './Form';
import { OnboardingInfo } from '../types';
import ArrowRight from '@/common/components/icons/ArrowRight';
import { formatPhoneNumber } from '@/common/utils';
import ConfirmationForm from './ConfirmationForm';
import { useCounter } from '@/common/hooks';
import { useOnboarding } from '../hooks';
import { helveticaNeue } from '@/common/font';

type StageType = 'form' | 'confirm';

function PageContent() {
  const { counter, start, reset } = useCounter(3);
  const [stage, setStage] = useState<StageType>('form');
  const [inData, setInData] = useState<Record<string, string>>({});
  const { onboardUserSwr } = useOnboarding({ can_onboard: true });

  useEffect(() => {
    if (counter === 0) {
      onboardUserSwr.trigger({ data: inData });
    }
  }, [counter]);

  const submitHandler = (values: OnboardingInfo) => {
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
    setStage('confirm');
    start();
  };

  const cancelHandler = () => {
    setStage('form');
    reset();
  };

  return (
    <>
      {stage === 'form' ? (
        <Form<OnboardingInfo>
          autoComplete="off"
          layout="vertical"
          className="w-full min-w-80 max-w-[450px] rounded-[20px] bg-custom-white_100 !p-5"
          scrollToFirstError
          onFinish={submitHandler}
          initialValues={{ ...inData }}
        >
          <header className="pb-4">
            <Title tag="h4" className={helveticaNeue.className}>
              Onboarding
            </Title>
          </header>
          <div className="no-scrollbar max-h-[calc(100vh_-_193px)] w-100 overflow-scroll">
            <OnboardingForm />
          </div>
          <footer className="borde-t mt-4 flex justify-end border-t border-custom-gray_400 pt-4">
            <CustomButton size="small" htmlType="submit" className="">
              Submit details
              <ArrowRight />
            </CustomButton>
          </footer>
        </Form>
      ) : null}
      {stage === 'confirm' ? (
        <ConfirmationForm
          cancelHandler={cancelHandler}
          loading={onboardUserSwr.isMutating}
          timer={counter}
        />
      ) : null}
    </>
  );
}

export default PageContent;
