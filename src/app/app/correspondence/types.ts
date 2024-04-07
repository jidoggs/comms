import { Table, TabsProps } from 'antd';
import { AnimationControls } from 'framer-motion';
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

export type DetailContextType = {
  openCorrespondenceDetails: boolean;
  openDetailsHandler: VoidFunction; //eslint-disable-line
  closeDetailsHandler: VoidFunction; //eslint-disable-line
  correspondenceFile: FileList | null;
  handleUpdateFile: (files: FileList) => void; //eslint-disable-line
  tabChangeHandler: (state: string) => void; //eslint-disable-line
  activeTab: string;
  contentControls: AnimationControls;
} | null;
