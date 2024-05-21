'use client';
import React, {
  createContext,
  Suspense,
  useCallback,
  // useContext,
  useMemo,
  useState,
} from 'react';
import { MinuteContextType } from '../../types';
import { ContextWapper } from '@/types';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import { useForm } from 'antd/es/form/Form';
// import { DetailContext } from './DetailContextWrapper';
// import { messageHandler } from '@/common/utils/notification';
import { useDebounce } from '@/common/hooks';
// import { CorrAppContext } from '@/app/app/service-context/AppContextWrapper';

export const MinuteContext = createContext<MinuteContextType>(null);

const MinuteContextWrapper = ({ children }: ContextWapper) => {
  // const detailContextInfo = useContext(DetailContext);
  // const appContextInfo = useContext(CorrAppContext);
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
  const { getRecipientsSwr } = useCorrespondence({
    can_get_all_recipients: true,
    recipient: searchDebounce,
  });

  const recipientsData: any = getRecipientsSwr?.data?.data || [];
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

  // const { createMinuteSwr } = useCorrespondence({
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
