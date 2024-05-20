/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {
  BaseDataModel,
  EditableTableColumnTypes,
  User,
  iHandleChange,
} from '@/types';
import { TabItemProps } from '@/common/components/CustomTab';
import { Ipagination } from '@/common/hooks/usePagination';

export interface Role extends BaseDataModel {
  _id: string;
  name: string;
  active: boolean;
  permissions: Permission[];
}

export interface Permission {
  _id: string;
  name: string;
  code: string;
}

export type PermissionType = 'parastatal' | 'office' | 'department';

export const initialModalState = {
  delete: false,
};

export type TabKeysType = 'users' | 'roles-permissions';

export type UserMgmtDataContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  currentTab: TabKeysType;
  tabItemList: TabItemProps;
  permissionsData: Permission[];
  permissionsLoading: boolean;
  rolesData: Role[];
  rolesLoading: boolean;
  usersData: User[];
  usersLoading: boolean;
  addNewRole: boolean;
  addNewRoleHandler: () => void;
  search: string;
  searchHandler: iHandleChange;
  pagination: Ipagination;
} | null;
