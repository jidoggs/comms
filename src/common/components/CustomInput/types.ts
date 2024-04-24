import Input from 'antd/es/input/Input';
import { GetRef } from 'antd/lib/_util/type';
import { InputProps } from 'antd/lib/input/index';

export type InputRef = GetRef<typeof Input> | any;

type ClassName = 'container' | 'label' | 'input';

type InputType = 'password' | 'textarea' | 'email' | 'number';

export interface CustomInputProps extends Omit<InputProps, 'className'> {
  type?: InputType;
  className?: string | Partial<Record<ClassName, string>>;
  ref?: InputRef;
}
