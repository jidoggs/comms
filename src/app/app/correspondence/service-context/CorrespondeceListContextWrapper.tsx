'use client';
import React, { createContext, useState } from 'react';
import { useDebounce, useTabChange } from '@/common/hooks';
import { CorrespondenceListContextType, TabKeysType } from '../types';
import useCorrespondence from '../../hooks/useCorrespondence';
import { ContextWrapper, iHandleChange, CorrespondenceData } from '@/types';
import { defaultColumns, tabItemList } from './helper';
import { searchQueryHandler } from '@/service/request';

export const CorrespondeceListContext =
  createContext<CorrespondenceListContextType>(null);

function CorrespondeceListContextWrapper({ children }: ContextWrapper) {
  const [searchValue, setSearchValue] = useState('');
  const debounceValue = useDebounce(searchValue);

  const searchHandler: iHandleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const resetFields = () => {
    setSearchValue('');
  };

  const searchBy: (keyof CorrespondenceData)[] = ['sender'];
  const search = searchQueryHandler(searchBy, debounceValue);

  const tabs = useTabChange<TabKeysType>({
    defaultKey: '/app/correspondence?tab=draft',
    resetFields,
  });

  const { getListSwr } = useCorrespondence({
    can_get_all: true,
    status: tabs.currentTab,
    search,
  });

  return (
    <CorrespondeceListContext.Provider
      value={{
        ...tabs,
        columns: defaultColumns,
        dataSource: getListSwr.data?.data || [],
        loading: getListSwr.isLoading || getListSwr.isLoading,
        tabItemList,
        searchValue,
        searchHandler,
      }}
    >
      {children}
    </CorrespondeceListContext.Provider>
  );
}

export default CorrespondeceListContextWrapper;
