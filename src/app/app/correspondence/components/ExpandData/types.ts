import { Rule } from 'antd/es/form';
export * from '../../types';

export type FormItems<T = { name: string }> = {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: string;
  rules?: Rule[];
  dependencies?: any[];
};
