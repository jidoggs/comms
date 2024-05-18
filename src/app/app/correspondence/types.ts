/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CustomTableProps } from '@/common/components/CustomTable';
import { TabItemProps } from '@/common/components/CustomTab';
import {
  CorrespondenceData,
  EditableTableColumnTypes,
  iHandleChange,
  MinuteData,
} from '@/types';
import { Dayjs } from 'dayjs';

export type CorrespondenceContextNewType = {
  handleAdd: () => void;
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
} | null;

export type CorrespondenceListContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: CorrespondenceData[];
  loading: boolean;
  currentTab: string;
  tabItemList: TabItemProps;
  components: CustomTableProps<any>['components'];
  searchValue: string;
  searchHandler: iHandleChange;
} | null;

export type DetailContextType = {
  openCorrespondenceDetails: boolean;
  openDetailsHandler: () => void;
  closeDetailsHandler: () => void;
  correspondenceFile: FileList | null;
  handleUpdateFile: (files: FileList) => void;
  tabChangeHandler: (state: string) => void;
  activeTab: string;
  contentControls: AnimationControls;
  turnMultiSelectOnHandler: () => void;
  turnMultiSelectOFFHandler: () => void;
  selectItemHandler: (e: CheckboxChangeEvent) => void;
  multiSelect: MultiSelectType;
  minuteData: MinuteData[];
  sampleTimeline: {
    name: string;
    office: string;
    date: Dayjs;
    img: string;
  };
} | null;

export type MultiSelectType = {
  isMultiSelectMode: boolean;
  selectedItems: string[];
};
