import React from 'react';
import dynamic from 'next/dynamic';
import { mergeClassName } from '../../utils';
import { CustomInputProps, InputRef } from './types';
// import Input from 'antd/es/input/Input';

const FallBackInput = () => {
  return (
    <input className="h-11 w-full flex-1 rounded-lg border border-custom-gray_400 bg-custom-gray_900" />
  );
};

const Input = dynamic(() => import('antd/es/input/Input'), {
  loading: () => <FallBackInput />,
});
const Password = dynamic(() => import('antd/es/input/Password'), {
  loading: () => <FallBackInput />,
});
const TextArea = dynamic(() => import('antd/es/input/TextArea'), {
  loading: () => <FallBackInput />,
});
const Number = dynamic(() => import('antd/es/input-number/index'), {
  loading: () => <FallBackInput />,
});

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<InputRef, any>(
  ({ type, className, ...rest }, ref) => {
    const isString = (className: any) => {
      return typeof className === 'string';
    };
    const inputClassName: string = mergeClassName(
      'w-full placeholder-custom-main p-2.5 bg-transparent text-custom-main border border-custom-gray_600 !focus-within:border-transparent !focus:border-transparent !focus-within:outline-none !focus:outline-none',
      isString(className) ? className : className?.input
    );
    return (
      <div
        className={mergeClassName(
          'w-full',
          !isString(className) && className?.container
        )}
      >
        {type === 'password' ? (
          <Password {...rest} className={inputClassName} ref={ref} />
        ) : null}
        {type === 'textarea' ? (
          <TextArea {...rest} className={inputClassName} ref={ref} />
        ) : null}
        {type === 'number' ? (
          <Number {...rest} className={inputClassName} ref={ref} />
        ) : null}
        {!type || type === 'email' ? (
          <Input {...rest} className={inputClassName} ref={ref} />
        ) : null}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
