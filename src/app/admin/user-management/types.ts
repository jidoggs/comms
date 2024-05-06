/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { BaseDataModel, EditableTableColumnTypes, User } from '../people/types';
import { CustomTableProps } from '@/common/components/CustomTable';
export * from '../../../types';

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

export type UserMgmtDataContextType = {
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  currentTab: string;
  tabItemList: TabsProps['items'];
  permissionsData: any[];
  permissionsLoading: boolean;
  rolesData: Role[];
  rolesLoading: boolean;
  usersData: User[];
  usersLoading: boolean;
  components: CustomTableProps<any>['components'];
} | null;

export const uniqueId = '1';
