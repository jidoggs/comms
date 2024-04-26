/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
export * from '../../../types';

type EditableTableProps = Parameters<typeof Table>[0];
export type EditableTableColumnTypes = Exclude<
  EditableTableProps['columns'],
  undefined
>;

export type CorrespondenceContextNewType = {
  handleAdd: VoidFunction;
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
} | null;

export type UserMgmtDataContextType = {
  handleAdd: VoidFunction;
  handleAddRole?: VoidFunction;
  handleTabChange: (state: string) => void;
  // columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
  tabItem: string;
  tabItemList: TabsProps['items'];
  editRole?: boolean;
} | null;

export type DetailContextType = {
  openCorrespondenceDetails: boolean;
  openDetailsHandler: VoidFunction;
  closeDetailsHandler: VoidFunction;
  correspondenceFile: FileList | null;
  handleUpdateFile: (files: FileList) => void;
  tabChangeHandler: (state: string) => void;
  activeTab: string;
  contentControls: AnimationControls;
  turnMultiSelectOnHandler: VoidFunction;
  turnMultiSelectOFFHandler: VoidFunction;
  selectItemHandler: (e: CheckboxChangeEvent) => void;
  multiSelect: MultiSelectType;
} | null;

export type MultiSelectType = {
  isMultiSelectMode: boolean;
  selectedItems: string[];
};
