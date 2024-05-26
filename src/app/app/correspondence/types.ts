/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { TabItemProps } from '@/common/components/CustomTab';
import {
  CorrespondenceData,
  EditableTableColumnTypes,
  iHandleChange,
  MinuteData,
  RecipientData,
  User,
} from '@/types';
import { Dayjs } from 'dayjs';
import { FormInstance } from 'antd';
import { Ipagination } from '@/common/hooks/usePagination';

export type CorrespondenceContextNewType = {
  handleAdd: () => void;
  columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
} | null;

export type TabKeysType = 'draft' | 'archive' | 'sent';

export type CorrespondenceListContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: CorrespondenceData[];
  loading: boolean;
  currentTab: TabKeysType;
  tabItemList: TabItemProps;
  searchValue: string;
  searchHandler: iHandleChange;
} | null;

export type CorrsInfoContextType = {
  minuteData: MinuteData;
} | null;

export type DetailContextType = {
  pagination: Ipagination;
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
  minutesThread: MinuteData[];
  loadingMinutesThread: boolean;
  sampleTimeline: {
    name: string;
    office: string;
    date: Dayjs;
    img: string;
  };
  user: User;
  addToMinuteThread: (res: MinuteData) => void;
} | null;

export type MultiSelectType = {
  isMultiSelectMode: boolean;
  selectedItems: string[];
};
