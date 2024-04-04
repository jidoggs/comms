import React from 'react';

import { GetRef, Input, InputProps } from 'antd';

import { mergeClassName } from './utils';

type InputRef = GetRef<typeof Input> | any;

type ClassName = 'container' | 'label' | 'input';

type InputType = 'password' | 'textarea' | 'email';

interface CustomInputProps extends Omit<InputProps, 'className'> {
  label?: string;
  type?: InputType;
  className?: string | Partial<Record<ClassName, string>>;
  ref?: InputRef;
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<
  CustomInputProps,
  InputRef
>(({ label, type, className, ...rest }, ref) => {
  const isClassNameString = typeof className === 'string';

  const inputclassName: string = mergeClassName(
    'w-full placeholder-custom-main p-2.5 bg-transparent text-custom-main border border-custom-gray_600 !focus-within:border-transparent !focus:border-transparent !focus-within:outline-none !focus:outline-none',
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
            'focus-within: mb-2 block text-sm font-medium text-custom-main',
            !isClassNameString && className?.label
          )}
        >
          {label}
        </label>
      )}
      {type === 'password' ? (
        <Input.Password className={inputclassName} ref={ref} {...rest} />
      ) : null}
      {type === 'textarea' ? (
        <Input.TextArea className={inputclassName} ref={ref} {...rest} />
      ) : null}
      {!type ? <Input className={inputclassName} ref={ref} {...rest} /> : null}
    </div>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
