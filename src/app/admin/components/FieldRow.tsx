import React, { useState } from 'react';
import FormItem, { FormItemProps } from 'antd/es/form/FormItem';
import CustomInput from '@/common/components/CustomInput';
import { CustomInputProps } from '@/common/components/CustomInput/types';
import CustomSelect, {
  CustomSelectProps,
} from '@/common/components/CustomSelect';
import { mergeClassName } from '@/common/utils';

type FieldRowProps = {
  label: string;
  name: string;
  className?: string;
  rules?: FormItemProps['rules'];
} & CustomInputProps;

type fs = CustomSelectProps & FieldRowProps;

type SelectRowProps = {
  defaultValue?: string[] | string;
  defaultModeSelect?: boolean;
} & fs;

const FieldRow = ({
  label,
  name,
  defaultValue,
  className,
  rules,
  ...props
}: FieldRowProps) => {
  return (
    <FormItem
      label={label}
      name={name}
      initialValue={defaultValue}
      className="!mb-0 border-b [&_.ant-form-item-required]:after:!invisible [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
      rules={rules}
    >
      <CustomInput
        {...props}
        className={mergeClassName(
          '!mb-0 !border-none !bg-transparent disabled:!text-custom-main',
          className
        )}
        name={name}
      />
    </FormItem>
  );
};

export const SelectFieldRow = ({
  label,
  name,
  defaultValue,
  className,
  mode,
  placeholder,
  removeIcon,
  tokenSeparators,
  defaultModeSelect = false,
  ...props
}: SelectRowProps) => {
  const [isEditable, setIsEditable] = useState(defaultModeSelect);

  const focusHandler = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div>
      <FormItem
        label={label}
        name={name}
        className="!mb-0 border-b [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
        initialValue={defaultValue}
      >
        {isEditable ? (
          <CustomSelect
            {...props}
            mode={mode}
            placeholder={placeholder}
            className={mergeClassName(
              '[&_.ant-select-arrow]:!hidden [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!bg-transparent',
              className
            )}
            tokenSeparators={tokenSeparators}
            removeIcon={removeIcon}
            onBlur={focusHandler}
          />
        ) : (
          <CustomInput
            {...props}
            className={mergeClassName(
              '!mb-0 !border-none !bg-transparent',
              className
            )}
            name={name}
            onFocus={focusHandler}
          />
        )}
      </FormItem>
    </div>
  );
};

export default FieldRow;
