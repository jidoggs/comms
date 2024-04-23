import React from 'react';
import dynamic from 'next/dynamic';
import { InputProps } from 'antd/lib/input/index';
import { mergeClassName } from './utils';
import { GetRef } from 'antd/lib/_util/type';

const Input = dynamic(() => import('antd/es/input/Input'));
const Password = dynamic(() => import('antd/es/input/Password'));
const TextArea = dynamic(() => import('antd/es/input/TextArea'));

type InputRef = GetRef<any> | any;

type ClassName = 'container' | 'label' | 'input';

type InputType = 'password' | 'textarea' | 'email' | 'number';

interface CustomInputProps extends Omit<InputProps, 'className'> {
  label?: string;
  type?: InputType;
  className?: string | Partial<Record<ClassName, string>>;
  ref?: InputRef;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<
  CustomInputProps,
  InputRef
>(({ label, type, className, required, ...rest }, ref) => {
  const isClassNameString = typeof className === 'string';

  const inputClassName: string = mergeClassName(
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
          {required && <span className="pr-1 text-custom-red_100">*</span>}
          {label}
        </label>
      )}
      {type === 'password' ? (
        <Password
          className={inputClassName}
          ref={ref}
          {...rest}
          required={required}
        />
      ) : null}
      {type === 'textarea' ? (
        <TextArea
          className={inputClassName}
          ref={ref}
          {...rest}
          required={required}
        />
      ) : null}
      {type === 'number' ? (
        <Input
          className={inputClassName}
          ref={ref}
          {...rest}
          required={required}
          pattern="[0-9]" // Regular expression for only digits
          type="number"
        />
      ) : null}
      {!type || type === 'email' ? (
        <Input
          className={inputClassName}
          ref={ref}
          {...rest}
          required={required}
        />
      ) : null}
    </div>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
