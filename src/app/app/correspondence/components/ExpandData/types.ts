
import { Rule } from 'antd/es/form';
import React from 'react';
export * from '../../types';

export type FormItems<T = { name: string }> = {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: string;
  icon?:React.ReactNode
  rules?: Rule[];
  dependencies?: any[];
};
