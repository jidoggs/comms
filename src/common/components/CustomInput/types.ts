import { InputRef as AntdInputRef, InputProps } from 'antd/es/input/Input';
import { PasswordProps, TextAreaProps } from 'antd/es/input/';

export type InputRef = AntdInputRef;

type ClassName = 'container' | 'label' | 'input';

// type InputType = 'password' | 'textarea' | 'email' | 'number';

interface InputProp extends Omit<InputProps, 'className'> {
  type?: 'email';
}
interface PasswordProp extends Omit<PasswordProps, 'className'> {
  type: 'password';
}
interface TextAreaProp extends Omit<TextAreaProps, 'className'> {
  type: 'textarea';
}

export type CustomInputProps = (InputProp | PasswordProp | TextAreaProp) & {
  className?: string | Partial<Record<ClassName, string>>;
  ref?: any;
};
