import { Table, TabsProps } from 'antd';

export * from '../../../types';
export interface CorrespondenceData {
  sent_by: string;
  recipient: string;
  subject: string;
  ref_no: string;
  document: string;
  comment: string;
  created_at: string;
}

type EditableTableProps = Parameters<typeof Table>[0];
export type EditableTableColumnTypes = Exclude<
  EditableTableProps['columns'],
  undefined
>;

export type CorrespondenceContextNewType = {
  handleAdd: VoidFunction; //eslint-disable-line
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void; //eslint-disable-line
} | null;

export type CorrespondenceListContextType = {
  handleAdd: VoidFunction; //eslint-disable-line
  handleTabChange: (state: string) => void; //eslint-disable-line
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void; //eslint-disable-line
  tabItem: string;
  tabItemList: TabsProps['items'];
} | null;
