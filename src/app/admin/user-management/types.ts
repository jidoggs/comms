/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { EditableTableColumnTypes } from '../people/types';
export * from '../../../types';

export interface Role {
  _id: any;
  name: string;
  role: string;
  permissions: never[];
}

export interface Permission {
  _id: string;
  name: string;
  code: string;
}

export type PermissionType = 'parastatal' | 'office' | 'department';

export interface PermissionGroup {
  requestType: string;
  permissionType: string;
  permissions: string[];
}

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
  editRole: boolean;
  newRoles?: Role[];
  setNewRoles?: React.Dispatch<React.SetStateAction<Role[]>>;
  updateRoleData?: any;
  setUpdateRoleData?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      _id: number;
    }>
  >;
  updateNewRoleData?: any;
  setUpdateNewRoleData?: React.Dispatch<
    React.SetStateAction<{
      name: string;
      _id: number;
    }>
  >;
  editedRole?: any;
  setEditedRole?: React.Dispatch<any>;
  setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
  // currentRole: string;
  // setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
} | null;
