/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EditableTableColumnTypes, User, iHandleChange } from '@/types';
import { CustomTableProps } from '@/common/components/CustomTable';
import { TabItemProps } from '@/common/components/CustomTab';

export type PeopleDataContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: User[];
  isLoading: boolean;
  currentTab: string;
  tabItemList: TabItemProps;
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
