'use client';
import { createContext, useEffect, useState } from 'react';
import { PeopleDataContextType, TabKeysType } from '../types';
import { ContextWapper, User, iHandleChange } from '@/types';
import { useDebounce, usePagination, useTabChange } from '@/common/hooks';
import usePeople from '../../hooks/usePeople';
import { columnHelper, tabItemList } from './helper';
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

  const columns = columnHelper(tabs.currentTab);

  const { getAllSwr } = usePeople({
    can_get_all_invites: true,
    search: debounceValue,
    page: pagination.currentPage,
    limit: pagination.itemPerPage,
  });

  useEffect(() => {
    pagination.setTotalCountHandler(getAllSwr.data?.results || 0);
  }, [getAllSwr.data?.results]); //eslint-disable-line

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
