'use client';
import React, { createContext, useState } from 'react';
import CustomUser from '@/common/components/CustomUser';
import {
  defaultColumns,
  onboardingKeys,
  personKeys,
  tabItemList,
} from './helper';
import usePeople from '../../hooks/usePeople';
import { ContextWapper, PeopleDataContextType, iHandleChange } from '../types';
import { useDebounce, useSession, useTabChange } from '@/common/hooks';

export const PeopleDataContext = createContext<PeopleDataContextType>(null);

function PeopleListContextWrapper({ children }: ContextWapper) {
  const [search, setSearch] = useState('');

  const resetHandler = () => {
    setSearch('');
  };

  const searchHandler: iHandleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const tabs = useTabChange({
    defaultKey: '/admin/people?tab=pending',
    resetFields: resetHandler,
  });

  const debounceValue = useDebounce(search);

  const { isBasicUser } = useSession();

  const { getAllSwr } = usePeople({
    can_get_all_invites: !isBasicUser,
    status: tabs.currentTab,
    search: debounceValue,
  });

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
        }}
      >
        {children}
      </PeopleDataContext.Provider>
    </>
  );
}

export default PeopleListContextWrapper;
