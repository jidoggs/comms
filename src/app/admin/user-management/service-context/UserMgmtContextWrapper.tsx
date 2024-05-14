'use client';
import React, { createContext, useState } from 'react';
import { UserMgmtDataContextType } from '../types';
import { useDebounce, useTabChange } from '@/common/hooks';
import { defaultColumns, personKeys, tabItemList } from './userHelper';
import { useRoles } from '../../hooks';
import useUsers from '../../hooks/useUsers';
import usePermissions from '../../hooks/usePermission';
import { ContextWapper, iHandleChange } from '@/types';

export const UserMgmtDataContext = createContext<UserMgmtDataContextType>(null);

function UserMgmtContextWrapper({ children }: ContextWapper) {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);

  const resetHandler = () => {
    setSearch('');
  };

  const searchHandler: iHandleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
    resetFields: resetHandler,
  });

  const roleInfo = useRoles({
    can_get_all: tabs.currentTab === 'roles-permissions',
    search: searchDebounce,
  });

  const { getAllPermissionsSwr } = usePermissions({
    can_get_all: tabs.currentTab === 'roles-permissions',
  });

  const { getAllUsersSwr } = useUsers({
    can_get_all: tabs.currentTab === 'users',
    search: searchDebounce,
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
        rolesData: roleInfo.getAllRolesSwr.data,
        rolesLoading: roleInfo.getAllRolesSwr.loading,
        usersData: getAllUsersSwr.data,
        usersLoading: getAllUsersSwr.loading,
        addNewRoleHandler: roleInfo.addNewRoleHandler,
        addNewRole: roleInfo.addNewRole,
        search,
        searchHandler,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default UserMgmtContextWrapper;
