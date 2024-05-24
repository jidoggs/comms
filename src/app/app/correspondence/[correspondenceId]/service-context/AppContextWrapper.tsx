import React, {
  createContext,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { AppContextType } from '../../types';
import { ContextWrapper } from '@/types';
import { useDebounce } from '@/common/hooks';
import useRecipient from '../../../hooks/useRecipient';
import useMinute from '../../../hooks/useMinute';
import { useForm } from 'antd/es/form/Form';
import { useSearchParams } from 'next/navigation';
import { removeNullOrUndefinedProperties } from '@/common/utils';

export const CorrAppContext = createContext<AppContextType>(null);

const AppContextWrapper = ({ children }: ContextWrapper) => {
  const paramCorrespondenceId = useSearchParams().get('corrs') as string;
  const [correspondenceId, setCorrespondenceId] = useState<string>();
  const [closeModal, setCloseModal] = useState<boolean>(false);
  const [attachSelected, setAttachSelected] = useState<boolean>(false);
  const [uploadSelected, setUploadSelected] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<{
    value: string;
    type: string;
  } | null>(null);

  const [selectedAttachedRecipients, setSelectedAttachedRecipients] = useState<
    any[]
  >([]);
  const [form] = useForm();
  const { getCorrMinListSwr } = useMinute({
    can_get_all: true,
    _id: correspondenceId?.toString() || paramCorrespondenceId,
  });

  // console.log('paramCorrespondenceId', paramCorrespondenceId);

  const minuteData = getCorrMinListSwr?.data?.data || [];

  const setCorrId = (_id: string) => {
    setCorrespondenceId(_id);
  };

  const addAttached = () => {
    setAttachSelected(true);
  };
  const removeAttached = () => {
    setAttachSelected(false);
  };
  const setUpload = () => {
    setUploadSelected(!uploadSelected);
  };

  const { createMinuteSwr } = useMinute({
    can_create: true,
    _id: minuteData[minuteData.length - 1]?.correspondence?._id,
  });

  const { trigger, isMutating: createMinuteLoading } = createMinuteSwr;

  const initialValues = {
    //   last_minute: '6646ece9513f6338ab39e8f3',
    //   subject: 'Working Minute',
    //   parastatal: '',
    minute: '',
    recipient: '',
    attach: [],
    upload: [],
  };

  const searchDebounce = useDebounce(search);
  const { getRecipientsSwr } = useRecipient({
    recipient: searchDebounce,
  });
  const recipientsData = getRecipientsSwr?.data;
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
  const onSearch = (value: string) => {
    // console.log('called');
    setSearch(value);
  };
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

  const onAttachedRecipientsChange = useCallback(
    (
      newValues: string[],
      selectedOptions: { value: string; type: string }[]
    ) => {
      const newSelectedRecipients = selectedOptions.map((option) => ({
        type: option.type,
        _id: option.value,
      }));

      setSelectedAttachedRecipients(newSelectedRecipients);
    },
    []
  );

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const minuteFormSubmitHandler = async (values: any) => {
    const data = removeNullOrUndefinedProperties({
      ...values,
      last_minute: minuteData[minuteData.length - 1]?._id,
      attach: selectedAttachedRecipients,
      parastatal: minuteData[minuteData.length - 1]?.parastatal?._id,
      // minute: values.minute,
      // recipient: values.recipient,
    });

    trigger({ data }).then(() => {
      form.resetFields();
      setCloseModal(true);
    });
  };

  return (
    <Suspense fallback={null}>
      <CorrAppContext.Provider
        value={{
          form,
          correspondenceId,
          setCorrId,
          attachSelected,
          addAttached,
          removeAttached,
          uploadSelected,
          setUpload,
          closeModal,
          setCloseModal,
          selectedRecipient,
          onSearch,
          recipientsData,
          filterOption,
          options,
          onChange,
          recipientIsLoading,
          initialValues,
          minuteFormSubmitHandler,
          createMinuteLoading,
          minuteData,
          onAttachedRecipientsChange,
        }}
      >
        {children}
      </CorrAppContext.Provider>
    </Suspense>
  );
};

export default AppContextWrapper;
