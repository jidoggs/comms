'use client';
import React, { useCallback, useState } from 'react';
import { Select } from 'antd';
import { useDebounce } from '@/common/hooks';
import useCorrespondence from '@/app/app/hooks/useCorrespondence';

interface RecipientData {
  user?: { _id: string; firstname: string; surname: string }[]; // Optional property for users
  department?: { _id: string; name: string }[]; // Optional property for departments
  office?: { _id: string; name: string }[]; // Optional property for offices
}

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

  // const onChange = (value: string, option: any) => {
  //   const selectedType = option?.type; // Get the selected type
  //   console.log(`Selected value: ${value}, Type: ${selectedType}`);
  // };
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

  const recipientsData = getRecipientsSwr?.data?.data as RecipientData;

  // console.log('recipientsData:', recipientsData);

  const options = React.useMemo(() => {
    if (!recipientsData) return []; // Handle null or undefined data

    const userOptions =
      recipientsData?.user?.map((item: any) => ({
        value: item._id,
        label: `${item.firstname} ${item.surname}`,
        type: 'user',
      })) || []; // Provide an empty array if recipientsData.user is undefined

    const departmentOptions =
      recipientsData.department?.map((item: any) => ({
        value: item._id,
        label: item.name,
        type: 'department',
      })) || []; // Provide an empty array if recipientsData.department is undefined

    const officeOptions =
      recipientsData.office?.map((item: any) => ({
        value: item._id,
        label: item.name,
        type: 'office',
      })) || []; // Provide an empty array if recipientsData.office is undefined

    return [...userOptions, ...departmentOptions, ...officeOptions];
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
      allowClear
    />
  );
};

export default Recipient;
