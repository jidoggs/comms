'use client';
import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { MinuteContextType } from '../../types';
import { ContextWapper } from '@/types';
import { useDebounce } from '@/common/hooks';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';
import { useForm } from 'antd/es/form/Form';
import { DetailContext } from './DetailContextWrapper';
import { messageHandler } from '@/common/utils/notification';

export const MinuteContext = createContext<MinuteContextType>(null);

const MinuteContextWrapper = ({ children }: ContextWapper) => {
  const detailContextInfo = useContext(DetailContext);
  const [form] = useForm();
  const [search, setSearch] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<{
    value: string;
    type: string;
  } | null>(null);
  const searchDebounce = useDebounce(search);
  const { getRecipientsSwr } = useCorrespondence({
    can_get_all_recipients: true,
    recipient: searchDebounce,
  });

  const recipientsData: any = getRecipientsSwr?.data?.data || [];
  const recipientIsLoading = getRecipientsSwr.isLoading;
  const onSearch = (value: string) => {
    setSearch(value);
  };

  const onRecipientChange = (value: string, type: string) => {
    setSelectedRecipient({ value, type });
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

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

  const onChange = useCallback(
    (value: string, option: any) => {
      const selectedType = option?.type;
      onRecipientChange(value, selectedType); // Call the parent's callback
    },
    [onRecipientChange]
  );

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
          selectedRecipient,
          onSearch,
          recipientsData,
          filterOption,
          options,
          onChange,
          recipientIsLoading,
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
