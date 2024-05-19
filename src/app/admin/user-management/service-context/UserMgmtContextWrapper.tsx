'use client';
import React, { createContext, useEffect, useState } from 'react';
import { TabKeysType, UserMgmtDataContextType } from '../types';
import { useDebounce, usePagination, useTabChange } from '@/common/hooks';
import { defaultColumns, personKeys, tabItemList } from './userHelper';
import { useRoles } from '../../hooks';
import useUsers from '../../hooks/useUsers';
import usePermissions from '../../hooks/usePermission';
import { ContextWapper, iHandleChange } from '@/types';

export const UserMgmtDataContext = createContext<UserMgmtDataContextType>(null);

function UserMgmtContextWrapper({ children }: ContextWapper) {
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce(search);
  const pagination = usePagination();

  const resetHandler = () => {
    setSearch('');
    pagination.pageChangeHandler(1);
  };

  const tabs = useTabChange<TabKeysType>({
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
    page: pagination.currentPage,
    limit: pagination.itemPerPage,
  });

  useEffect(() => {
    pagination.setTotalCountHandler(getAllUsersSwr.results);
  }, [getAllUsersSwr.results, tabs.currentTab]); //eslint-disable-line

  const searchHandler: iHandleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const columns = defaultColumns.filter(
    (itm) => tabs.currentTab === 'users' && personKeys.includes(itm.dataIndex)
  );

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
        pagination,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default UserMgmtContextWrapper;
