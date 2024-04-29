import React from 'react';
import dynamic from 'next/dynamic';
import { mergeClassName } from '../../utils';
import { CustomInputProps, InputRef, TextAreaProp } from './types';

const FallBackInput = () => {
  return (
    <input className="!focus-within:border-transparent !focus:border-transparent !focus-within:outline-none !focus:outline-none h-11 w-full flex-1 rounded-lg border border-custom-gray_600 bg-custom-gray_900 p-2.5 text-custom-main placeholder:text-custom-main" />
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

const baseClass =
  'w-full placeholder-custom-main p-2.5 bg-transparent text-custom-main border border-custom-gray_600 !focus-within:border-transparent !focus:border-transparent !focus-within:outline-none !focus:outline-none';

export const CustomTextArea: React.FC<TextAreaProp> = React.forwardRef<
  InputRef,
  TextAreaProp
>(({ className, ...rest }, ref) => {
  const inputClassName: string = mergeClassName(baseClass, className);
  return <TextArea {...rest} className={inputClassName} ref={ref} />;
});

const CustomInput: React.FC<CustomInputProps> = React.forwardRef<
  InputRef,
  CustomInputProps
>(({ type, className, ...rest }, ref) => {
  const inputClassName: string = mergeClassName(baseClass, className);
  return (
    <>
      {type === 'password' ? (
        <Password {...rest} className={inputClassName} ref={ref} />
      ) : (
        <Input {...rest} className={inputClassName} ref={ref} />
      )}
    </>
  );
});

CustomTextArea.displayName = 'CustomTextArea';
CustomInput.displayName = 'CustomInput';

export default CustomInput;
