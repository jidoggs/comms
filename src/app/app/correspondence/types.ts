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
  user: User;
  // onSearch: (value: string) => void;
  // recipientData: never[] | RecipientData;
} | null;

export type MinuteContextType = {
  form: FormInstance<any>;
  // recipientsData: RecipientData | never[];
  // onSearch: (value: string) => void;
  // filterOption: (
  //   input: string,
  //   option?: {
  //     label: string;
  //     value: string;
  //   }
  // ) => boolean;
  // options: any[];
  // onChange: (value: string, option: any) => void;
  // selectedRecipient: {
  //   value: string;
  //   type: string;
  // } | null;
  // recipientIsLoading: boolean;
  initialValues: {
    minute: string;
    recipient: string;
    attach: never[];
  };
  minuteFormSubmitHandler: (values: any) => Promise<void>;
  genDetailsData: DetailContextType;
  createMinuteLoading: boolean;
} | null;

export type AppContextType = {
  form: FormInstance<any>;
  recipientsData: RecipientData | never[];
  onSearch: (value: string) => void;
  filterOption: (
    input: string,
    option?: {
      label: string;
      value: string;
    }
  ) => boolean;
  options: any[];
  onChange: (value: string, option: any) => void;
  selectedRecipient: {
    value: string;
    type: string;
  } | null;
  recipientIsLoading: boolean;
  initialValues: {
    minute: string;
    recipient: string;
    attach: never[];
  };
  minuteFormSubmitHandler: (values: any) => Promise<void>;
  // genDetailsData: DetailContextType;
  createMinuteLoading: boolean;
  setCorrId: (_id: string) => void;
  correspondenceId: string | undefined;
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null;

export type MultiSelectType = {
  isMultiSelectMode: boolean;
  selectedItems: string[];
};
