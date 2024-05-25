'use client';
import React, {
  createContext,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { MinuteContextType } from '../../types';
import { ContextWrapper } from '@/types';
import useRecipient from '@/app/app/hooks/useRecipient';
import { useForm } from 'antd/es/form/Form';
import { useDebounce } from '@/common/hooks';

export const MinuteContext = createContext<MinuteContextType>(null);

const MinuteContextWrapper = ({ children }: ContextWrapper) => {
  const [search, setSearch] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<{
    value: string;
    type: string;
  } | null>(null);
  const [form] = useForm();

  const initialValues = {
    //   last_minute: '6646ece9513f6338ab39e8f3',
    //   subject: 'Working Minute',
    //   parastatal: '',
    minute: '',
    recipient: '',
    attach: [],
    upload: [],
  };

  // const allMinuteData = detailContextInfo?.minuteData || [];
  //   const lastMinute = allMinuteData[allMinuteData.length - 1];

  const searchDebounce = useDebounce(search);
  const { getRecipientsSwr } = useRecipient({
    recipient: searchDebounce,
  });

  const recipientsData = getRecipientsSwr.data;
  const recipientIsLoading = getRecipientsSwr.isLoading;
  const options = useMemo(() => {
    if (!recipientsData) return [];

    const recipientsDataKeys = Object.keys(recipientsData) as Array<
      keyof typeof recipientsData
    >;

    return recipientsDataKeys.flatMap((key) =>
      recipientsData[key]?.map((item: any) => ({
        value: item._id,
        type: key,
        label: item.name ? item.name : `${item.firstname} ${item.surname}`,
      }))
    );
  }, [recipientsData]);

  // const { createMinuteSwr } = useMinute({
  //   can_create: true,
  //   _id: allMinuteData[allMinuteData.length - 1]?.correspondence?._id,
  // });

  // const { trigger, isMutating: createMinuteLoading } = createMinuteSwr;

  // const minuteFormSubmitHandler = async (values: any) => {
  //   const data = {
  //     last_minute: allMinuteData[allMinuteData.length - 1]?._id,
  //     //   subject: allMinuteData[allMinuteData.length - 1]?.correspondence?.subject,
  //     parastatal: allMinuteData[allMinuteData.length - 1]?.parastatal?._id,
  //     ...values,
  //     // parastatal: parastatalId,
  //   };

  //   console.log('data', data);

  //   // trigger({ data })
  //   //   .then(() => form.resetFields())
  //   //   .catch((error) => messageHandler('error', error));
  // };

  const onRecipientChange = (value: string, type: string) => {
    setSelectedRecipient({ value, type });
  };

  const onChange = useCallback(
    (value: string, option: any) => {
      const selectedType = option?.type;
      onRecipientChange(value, selectedType); // Call the parent's callback
    },
    [onRecipientChange]
  );
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onSearch = (value: string) => {
    // console.log('called');
    setSearch(value);
  };

  return (
    <Suspense fallback={null}>
      <MinuteContext.Provider
        value={{
          form,
          // genDetailsData: detailContextInfo,
          options,
          onSearch,
          filterOption: filterOption,
          onChange,
          selectedRecipient,
          recipientsData,
          recipientIsLoading,
          initialValues,
          // minuteFormSubmitHandler,
          // createMinuteLoading,
        }}
      >
        {children}
      </MinuteContext.Provider>
    </Suspense>
  );
};

export default MinuteContextWrapper;
