'use client';
import React, { useCallback, useState } from 'react';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import { useDebounce } from '@/common/hooks';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Recipient = ({
  onRecipientChange,
}: {
  onRecipientChange: (value: string, type: string) => void;
}) => {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  const { getRecipientsSwr } = useCorrespondence({
    can_get_all_recipients: true,
    recipient: searchDebounce,
  });

  const onChange = useCallback(
    (value: string, option: any) => {
      const selectedType = option?.type;
      onRecipientChange(value, selectedType); // Call the parent's callback
    },
    [onRecipientChange]
  ); // Add onRecipientChange as a dependency

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const recipientsData = getRecipientsSwr?.data?.data;

  const options = React.useMemo(() => {
    if (!recipientsData) return []; // Handle null or undefined data

    const recipientsDataKeys = Object.keys(recipientsData) as Array<
      keyof typeof recipientsData
    >;

    return recipientsDataKeys.flatMap((key) =>
      recipientsData[key].map((item: any) => ({
        value: item._id,
        type: key,
        label: item.name ? item.name : `${item.firstname} ${item.surname}`,
      }))
    );
  }, [recipientsData]);

  return (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
      notFoundContent={
        getRecipientsSwr.isLoading ? <Spin size="small" /> : null
      }
      allowClear
    />
  );
};

export default Recipient;
