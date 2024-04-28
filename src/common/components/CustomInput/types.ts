import { InputRef as AntdInputRef, InputProps } from 'antd/es/input/Input';
import { PasswordProps, TextAreaProps } from 'antd/es/input/';

export type InputRef = AntdInputRef;

// type InputType = 'password' | 'textarea' | 'email' | 'number';

interface InputProp extends InputProps {
  type?: 'email';
}
interface PasswordProp extends PasswordProps {
  type: 'password';
}
export type TextAreaProp = TextAreaProps;

export type CustomInputProps = (InputProp | PasswordProp) & {
  ref?: any;
};
