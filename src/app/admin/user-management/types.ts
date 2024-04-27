/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Table, TabsProps } from 'antd';
import { AnimationControls } from 'framer-motion';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
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

export type UserMgmtDataContextType = {
  handleAdd: VoidFunction;
  handleAddRole?: VoidFunction;
  handleTabChange: (state: string) => void;
  // columns: EditableTableColumnTypes;
  dataSource: any[];
  handleDelete: (id: string | number) => void;
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
  allRoles: any;
  editedRole?: any;
  setEditedRole?: React.Dispatch<any>;
  setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
  currentRole: number;
  setCurrentRole: React.Dispatch<React.SetStateAction<number>>;
  submitNewRole: () => null | undefined;
  addRole: () => void;
  updateExitingRole: () => void;
  handleNameChange: ({ name, _id }: any) => void;
  handleAddPermission: (permissionId: any) => void;
  handleRemovePermission: (permissionId: any) => void;
  handleCancelPermission: (
    permission: string,
    type: 'parastatals' | 'offices' | 'departments'
  ) => void;
  options: any;
} | null;
