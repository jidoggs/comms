import React from 'react';
import { Select, SelectProps } from 'antd';
import { mergeClassName } from '@/common/utils';

export type CustomSelectProps = SelectProps;

const { Option } = Select;

const CustomSelect: React.FC<CustomSelectProps> = ({ className, ...props }) => {
  const filteredOptions = props?.options?.filter(
    (o) => typeof o === 'string' && !props?.value.includes(o)
  );

  return (
    <Select
      {...props}
      className={mergeClassName(
        '[&_.ant-select-selection-item-content]:text-custom-white_100 [&_.ant-select-selection-item]:!rounded-md',
        className
      )}
    >
      {filteredOptions?.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
