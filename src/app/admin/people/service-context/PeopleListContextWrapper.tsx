'use client';
import React, { createContext, useEffect, useState } from 'react';
import CustomUser from '@/common/components/CustomUser';
import {
  defaultColumns,
  onboardingKeys,
  personKeys,
  tabItemList,
} from './helper';
import usePeople from '../../hooks/usePeople';
import { PeopleDataContextType, TabKeysType } from '../types';
import { useDebounce, usePagination, useTabChange } from '@/common/hooks';
import { ContextWapper, User, iHandleChange } from '@/types';
import { CustomTableProps } from '@/common/components/CustomTable';

export const PeopleDataContext = createContext<PeopleDataContextType>(null);

function PeopleListContextWrapper({ children }: ContextWapper) {
  const [search, setSearch] = useState('');
  const debounceValue = useDebounce(search);
  const [userDetail, setUserDetail] = useState<User | null>(null);
  const pagination = usePagination();

  const resetHandler = () => {
    setSearch('');
    pagination.pageChangeHandler(1);
  };

  const tabs = useTabChange<TabKeysType>({
    defaultKey: '/admin/people?tab=pending',
    resetFields: resetHandler,
  });

  const { getAllSwr } = usePeople({
    can_get_all_invites: true,
    status: tabs.currentTab,
    search: debounceValue,
    page: pagination.currentPage,
    limit: pagination.itemPerPage,
  });

  useEffect(() => {
    pagination.setTotalCountHandler(getAllSwr.data?.results || 0);
  }, [getAllSwr.data?.results]); //eslint-disable-line

  const columns = defaultColumns
    .filter((itm) =>
      tabs.currentTab === 'pending'
        ? onboardingKeys.includes(itm.dataIndex)
        : personKeys.includes(itm.dataIndex)
    )
    .map((itm) => {
      if (tabs.currentTab === 'pending') {
        if (itm.dataIndex === 'email') {
          return {
            ...itm,
            render: (value: string) => {
              return (
                <>
                  {value ? <CustomUser data={value} avatarSize={28} /> : null}
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

  const searchHandler: iHandleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const viewDetailsHandler: CustomTableProps<User>['onRow'] = (record) => ({
    onClick: () => {
      setUserDetail(record);
    },
    style: { cursor: 'pointer' },
  });

  const closeDetailsHandler = () => {
    setUserDetail(null);
  };

  return (
    <>
      <PeopleDataContext.Provider
        value={{
          ...tabs,
          columns,
          dataSource: getAllSwr.data?.data || [],
          tabItemList,
          isLoading: getAllSwr.isLoading || getAllSwr.isValidating,
          searchHandler,
          search,
          viewDetailsHandler,
          closeDetailsHandler,
          userDetail,
          pagination,
        }}
      >
        {children}
      </PeopleDataContext.Provider>
    </>
  );
}

export default PeopleListContextWrapper;
