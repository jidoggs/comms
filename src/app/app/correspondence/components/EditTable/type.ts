import { GetRef } from 'antd';
import Form from 'antd/es/form/Form';
import React from 'react';
import { singleDummyCorrespondenceData } from '@/common/mockData';

export type EditCellProps = {
  name: keyof Item;
  defaultValue: any;
  save: () => Promise<void>;
};

export type FormInstance<T> = GetRef<typeof Form<T>>;
export type ContextValue = {
  form: FormInstance<any>;
  selected: string;
};
export const EditableContext = React.createContext<ContextValue | null>(null);

export type Point = typeof singleDummyCorrespondenceData;

export interface Item extends Point {
  id: number | string;
}

export interface EditableRowProps {
  index: number;
}
