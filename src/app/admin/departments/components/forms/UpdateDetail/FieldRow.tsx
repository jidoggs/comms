import CustomInput from '@/common/components/CustomInput';
import { CustomInputProps } from '@/common/components/CustomInput/types';
import CustomSelect from '@/common/components/CustomSelect';
import CloseCircled from '@/common/components/icons/CloseCircled';
import { mergeClassName } from '@/common/utils';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';

type FieldRowProps = {
  label: string;
  name: string;
  className?: string;
} & CustomInputProps;

type SelectRowProps = {
  defaultValue: string[];
} & FieldRowProps;

const FieldRow = ({
  label,
  name,
  defaultValue,
  className,
  ...props
}: FieldRowProps) => {
  return (
    <FormItem
      label={label}
      name={name}
      initialValue={defaultValue}
      className="!mb-0 border-b [&_.ant-form-item-row]:flex [&_.ant-form-item-row]:items-center"
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
  ...props
}: SelectRowProps) => {
  const [isEditable, setIsEditable] = useState(false);

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
            mode="tags"
            placeholder="|Add by name or email. Type ',' to add, ‘⌫’ to remove"
            className={mergeClassName(
              '[&_.ant-select-arrow]:!hidden [&_.ant-select-selector]:!border-none [&_.ant-select-selector]:!bg-transparent',
              className
            )}
            tokenSeparators={[',']}
            removeIcon={<CloseCircled className="text-white" />}
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
