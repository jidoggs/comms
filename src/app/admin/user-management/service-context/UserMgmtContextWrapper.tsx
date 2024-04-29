/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { createContext, useState } from 'react';
import { TabsProps } from 'antd';
import {
  ContextWapper,
  PermissionGroup,
  Role,
  UserMgmtDataContextType,
} from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import TableRowAction from '../components/TableRowAction';
import { mergeClassName } from '@/common/utils';
import {  User } from '../../people/types';
import dayjs from 'dayjs';

export const UserMgmtDataContext = createContext<UserMgmtDataContextType>(null);

const tabItemList: TabsProps['items'] = [
  {
    key: 'roles-permissions',
    label: 'Roles & Permissions',
  },
  {
    key: 'users',
    label: 'Users',
  },
];

// TODO: MOVE TO HELPER
const onboardingKeys = [
  'email',
  'full_name',
  'role',
  'title',
  'parastatal',
  'date_sent',
  '',
];
const personKeys = [
  'full_name',
  'role',
  'email',
  'title',
  'office',
  'parastatal',
  'last_active',
  'date_created',
  '',
];

const defaultColumns: {
  dataIndex: string;
}[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: '',
    width: 180,
    ellipsis: true,
    render: (_: any, value: any) => {
      return (
        <>
          {value ? (
            <p className="flex items-center gap-x-2.5 capitalize">
              <span>{`${value?.firstname} ${value?.othername}`}</span>
            </p>
          ) : null}
        </>
      );
    },
  },
  {
    title: 'Role',
    className: '',
    dataIndex: 'role',
    ellipsis: true,
    width: 200,
    render: (_: any, value: User) => {
      const removeSpecialCharacter = value?.role?.name.split('_');
      return (
        <>
          {value ? (
            <p className="flex items-center gap-x-2.5 capitalize">
              <span>
                {removeSpecialCharacter[0]} {removeSpecialCharacter[1]}
              </span>
            </p>
          ) : null}
        </>
      );
    },
  },
  {
    title: 'Email',
    className: '',
    dataIndex: 'email',
    ellipsis: true,
    width: 200,
  },
  {
    title: 'Title',
    className: '',
    dataIndex: 'title',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Office',
    className: '',
    dataIndex: 'office',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Parastatal',
    className: '',
    dataIndex: 'parastatal',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_active',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'date_created',
    ellipsis: true,
    width: 150,
    render: (_: any, record: any) => {
      return <>{dayjs(record?.created_at).format('DD-MMM-YYYY')}</>;
    },
  },
  {
    title: 'Date sent',
    className: '',
    dataIndex: 'date_sent',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Actions',
    className: '!pr-3',
    dataIndex: '',
    ellipsis: true,
    width: 65,
    render: (_: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));
export const initialNewRole = { name: '', _id: 0 };

function UserMgmtContextWrapper({ children }: ContextWapper) {
  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
  });
  const dataSource =
    tabs.tabItem === 'pending' ? dummyPersonsPending : dummyPersons;

  const [newRoles, setNewRoles] = useState<Role[]>([]);
  const [updateRoleData, setUpdateRoleData] = useState({
    name: '',
    _id: 0,
  });
  const [updateNewRoleData, setUpdateNewRoleData] = useState(initialNewRole);
  const [editedRole, setEditedRole] = useState<any>();
  const [editRole, setEditRole] = useState<boolean>(false);

  const columns = defaultColumns
    .filter((itm) =>
      tabs.tabItem === 'pending'
        ? onboardingKeys.includes(itm.dataIndex)
        : personKeys.includes(itm.dataIndex)
    )
    .map((itm) => {
      if (tabs.tabItem === 'pending') {
        if (itm.dataIndex === 'email') {
          return {
            ...itm,
            render: (value: any) => {
              return (
                <>
                  {value ? (
                    <div className="flex items-center gap-x-2.5">
                      <div className="size-7 rounded-full bg-red-500" />
                      <span>{value}</span>
                    </div>
                  ) : null}
                </>
              );
            },
          };
        }
        if (itm.dataIndex === 'full_name') {
          return {
            ...itm,
          };
        }
      }
      return itm;
    });

  const handleAdd = () => {};

  function groupPermissions(allPermissions: any[]): PermissionGroup[] {
    const groups: PermissionGroup[] = [];

    // Ensure allPermissions is defined and not empty
    if (!Array.isArray(allPermissions) || allPermissions.length === 0) {
      return groups;
    }

    allPermissions.forEach((permission) => {
      const requestTypeMatch = permission.name.match(
        /(CREATE|EDIT|DELETE|GET|ADD|REMOVE|SEND|REVOKE)/
      );
      const permissionTypeMatch = permission.name.match(
        /(PARASTATALS?|DEPARTMENTS?|OFFICES?|ROLES?|INVITES?)/
      );

      let requestType = 'USER';
      let permissionType = 'USER';

      if (requestTypeMatch) {
        requestType = requestTypeMatch[0];
      }

      if (permissionTypeMatch) {
        permissionType = permissionTypeMatch[0];
      }

      // Check if a group for this combination already exists
      const existingGroupIndex = groups.findIndex(
        (group) =>
          group.requestType === requestType &&
          group.permissionType === permissionType
      );

      if (existingGroupIndex !== -1) {
        // Add the permission to the existing group
        groups[existingGroupIndex].permissions.push(permission.name);
      } else {
        // Create a new group
        groups.push({
          requestType,
          permissionType,
          permissions: [permission.name],
        });
      }
    });

    return groups;
  }

  return (
    <UserMgmtDataContext.Provider
      value={{
        ...tabs,
        handleAdd,
        columns,
        dataSource,
        tabItemList,
        newRoles,
        setNewRoles,
        updateRoleData,
        setUpdateRoleData,
        updateNewRoleData,
        setUpdateNewRoleData,
        editedRole,
        setEditedRole,
        editRole,
        setEditRole,
        // currentRole,
        // setCurrentRole,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default UserMgmtContextWrapper;
