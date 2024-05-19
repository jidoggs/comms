'use client';
import React, { createContext, Suspense, useContext } from 'react';
import { MinuteContextType } from '../../types';
import { ContextWapper } from '@/types';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import { useForm } from 'antd/es/form/Form';
import { DetailContext } from './DetailContextWrapper';
import { messageHandler } from '@/common/utils/notification';

export const MinuteContext = createContext<MinuteContextType>(null);

const MinuteContextWrapper = ({ children }: ContextWapper) => {
  const detailContextInfo = useContext(DetailContext);
  const [form] = useForm();

  const initialValues = {
    //   last_minute: '6646ece9513f6338ab39e8f3',
    //   subject: 'Working Minute',
    //   parastatal: '',
    minute: '',
    recipient: '',
    attach: [],
  };

  const allMinuteData = detailContextInfo?.minuteData || [];
  //   const lastMinute = allMinuteData[allMinuteData.length - 1];

  const { createMinuteSwr } = useCorrespondence({
    can_create: true,
    _id: allMinuteData[allMinuteData.length - 1]?.correspondence?._id,
  });

  const { trigger, isMutating: createMinuteLoading } = createMinuteSwr;

  const minuteFormSubmitHandler = async (values: any) => {
    const data = {
      last_minute: allMinuteData[allMinuteData.length - 1]?._id,
      //   subject: allMinuteData[allMinuteData.length - 1]?.correspondence?.subject,
      parastatal: allMinuteData[allMinuteData.length - 1]?.parastatal?._id,
      ...values,
      // parastatal: parastatalId,
    };

    trigger({ data })
      .then(() => form.resetFields())
      .catch((error) => messageHandler('error', error));
  };

  return (
    <Suspense fallback={null}>
      <MinuteContext.Provider
        value={{
          form,
          //   selectedRecipient,
          //   onSearch,
          //   recipientsData,
          //   filterOption,
          //   options,
          //   onChange,
          //   recipientIsLoading,
          initialValues,
          minuteFormSubmitHandler,
          genDetailsData: detailContextInfo,
          createMinuteLoading,
        }}
      >
        {children}
      </MinuteContext.Provider>
    </Suspense>
  );
};

export default MinuteContextWrapper;
