/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { User } from './types';
import { CustomTableProps } from '@/common/components/CustomTable';
import { iHandleChange } from './types';
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
  handleAdd: VoidFunction;
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
} | null;

export type PeopleDataContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: User[];
  isLoading: boolean;
  currentTab: string;
  tabItemList: TabsProps['items'];
  components: CustomTableProps<any>['components'];
  searchHandler: iHandleChange;
  search: string;
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
