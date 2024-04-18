import React from 'react';
import { Select, SelectProps } from 'antd';

type CustomSelectProps = SelectProps;

const { Option } = Select;

const CustomSelect: React.FC<CustomSelectProps> = ({ ...props }) => {
  const filteredOptions = props?.options?.filter(
    (o) => typeof o === 'string' && !props?.value.includes(o)
  );

  return (
    <Select {...props}>
      {filteredOptions?.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
