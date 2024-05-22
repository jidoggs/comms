'use client';
import React, { useCallback, useState } from 'react';
import Select from 'antd/es/select';
import Spin from 'antd/es/spin';
import { FormListFieldData } from 'antd/es/form/FormList';
import { useDebounce } from '@/common/hooks';
import useRecipient from '@/app/app/hooks/useRecipient';
import dynamic from 'next/dynamic';

// const { Option } = Select;

const FormItem = dynamic(() => import('antd/es/form/FormItem'), { ssr: true });
// interface RecipientData {
//   user?: { _id: string; firstname: string; surname: string }[]; // Optional property for users
//   department?: { _id: string; name: string }[]; // Optional property for departments
//   office?: { _id: string; name: string }[]; // Optional property for offices
// }

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const Recipient = ({
  onRecipientChange,
  field,
}: {
  field: FormListFieldData;
  onRecipientChange: (value: string, type: string) => void;
}) => {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  const { getRecipientsSwr } = useRecipient({
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

  const recipientsData = getRecipientsSwr.data;

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
    <FormItem
      label="Recipient (Primary)"
      name={[field.name, 'recipient']}
      className="flex flex-col"
      rules={[{ required: true, message: 'Recipient is required' }]}
    >
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
    </FormItem>
  );
};

export default Recipient;
