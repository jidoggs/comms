'use client';
import React, { createContext } from 'react';
import { ContextWapper, UserMgmtDataContextType } from '../types';
import { useTabChange } from '@/common/hooks';
import { defaultColumns, personKeys, tabItemList } from './userHelper';
import { useRoles } from '../../hooks';
import useUsers from '../../hooks/useUsers';
import usePermissions from '../../hooks/usePermission';

export const UserMgmtDataContext = createContext<UserMgmtDataContextType>(null);

function UserMgmtContextWrapper({ children }: ContextWapper) {
  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
  });

  const { getAllRolesSwr } = useRoles({
    can_get_all: tabs.currentTab === 'roles-permissions',
  });

  const { getAllPermissionsSwr } = usePermissions({
    can_get_all: tabs.currentTab === 'roles-permissions',
  });

  const { getAllUsersSwr } = useUsers({
    can_get_all: tabs.currentTab === 'users',
  });

  const columns = defaultColumns
    .filter(
      (itm) => tabs.currentTab === 'users' && personKeys.includes(itm.dataIndex)
    )
    .map((itm) => {
      if (tabs.currentTab === 'pending') {
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

  return (
    <UserMgmtDataContext.Provider
      value={{
        ...tabs,
        columns,
        tabItemList,
        permissionsData: getAllPermissionsSwr.data,
        permissionsLoading: getAllPermissionsSwr.loading,
        rolesData: getAllRolesSwr.data,
        rolesLoading: getAllRolesSwr.loading,
        usersData: getAllUsersSwr.data,
        usersLoading: getAllUsersSwr.loading,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default UserMgmtContextWrapper;
