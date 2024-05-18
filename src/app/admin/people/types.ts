/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EditableTableColumnTypes, User, iHandleChange } from '@/types';
import { CustomTableProps } from '@/common/components/CustomTable';
import { TabItemProps } from '@/common/components/CustomTab';

export type TabKeysType = 'pending' | 'onboarded' | 'approved' | 'declined';

export type PeopleDataContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: User[];
  isLoading: boolean;
  currentTab: TabKeysType;
  tabItemList: TabItemProps;
  components: CustomTableProps<User>['components'];
  searchHandler: iHandleChange;
  search: string;
  viewDetailsHandler: CustomTableProps<User>['onRow'];
  closeDetailsHandler: () => void;
  userDetail: User | null;
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
