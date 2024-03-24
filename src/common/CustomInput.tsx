import React from 'react';
import { Input, InputProps } from 'antd';
import { mergeClassName } from './utils';

type ClassName = 'container' | 'label' | 'input';
interface CustomInputProps extends Omit<InputProps, 'className'> {
  label?: string;
  type?: string;
  className?: string | Partial<Record<ClassName, string>>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  className,
  ...rest
}) => {
  const isClassNameString = typeof className === 'string';

  const inputclassName: string = mergeClassName(
    'w-full placeholder-custom-main p-3 bg-transparent text-custom-main border-1 border-custom-gray_600',
    isClassNameString ? className : className?.input
  );
  return (
    <div
      className={mergeClassName(
        'w-full',
        !isClassNameString && className?.container
      )}
    >
      {label && (
        <label
          className={mergeClassName(
            'mb-2 block text-sm font-medium text-custom-main ',
            !isClassNameString && className?.label
          )}
        >
          {label}
        </label>
      )}
      {type === 'password' ? (
        <Input.Password className={inputclassName} />
      ) : type === 'textarea' ? (
        <Input.TextArea className={inputclassName} />
      ) : (
        <Input className={inputclassName} {...rest} />
      )}
    </div>
  );
};

export default CustomInput;
