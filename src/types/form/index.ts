import { Rule } from 'antd/es/form';
import React from 'react';

export type iHandleChange<T = HTMLInputElement> = (
  e: React.ChangeEvent<T>
) => void;
export type iHandleBlur<T = HTMLInputElement> = (
  e: React.FocusEvent<T>
) => void;

export type iHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
export type iHandleClick = (e: React.MouseEvent<HTMLElement>) => void;
export type iHandleKeyboard = (e: React.KeyboardEvent<HTMLElement>) => void;

export type FormItems<T = { name: string }> = {
  name: keyof T;
  label: string | React.ReactNode;
  placeholder: string;
  type?: string;
  rules?: Rule[];
  dependencies?: any[];
};
