'use client';
import React, { useState } from 'react';
import Select, { DefaultOptionType, SelectProps } from 'antd/es/select';
import Spin from 'antd/es/spin';
import { useDebounce } from '@/common/hooks';
import useRecipient from '@/app/app/hooks/useRecipient';

const filterOption = (input: string, option?: DefaultOptionType) =>
  typeof option?.label === 'string' && option.label
    ? option.label.toLowerCase().includes(input.toLowerCase())
    : false;

const Recipient = ({ ...props }: SelectProps) => {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  const { getRecipientsSwr } = useRecipient({
    recipient: searchDebounce,
  });

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
        title: key,
        label: item.name ? item.name : `${item.firstname} ${item.surname}`,
      }))
    );
  }, [recipientsData]);

  return (
    <Select
      {...props}
      showSearch
      labelInValue
      optionFilterProp="children"
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
