/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { EditableTableColumnTypes } from '../people/types';
export * from '../../../types';

export interface Role {
  _id: string;
  name: string;
  active: boolean;
  permissions: Permission[];
  created_at?: string;
  updated_at?: string;
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
  handleAdd: VoidFunction;
  handleAddRole?: VoidFunction;
  handleTabChange: (state: string) => void;
  columns: EditableTableColumnTypes;
  dataSource: any[];
  tabItem: string;
  tabItemList: TabsProps['items'];
  allRoles: Role[];
} | null;

export const uniqueId = '1';
