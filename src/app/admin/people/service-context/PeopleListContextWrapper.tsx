'use client';
import React, { createContext } from 'react';
import { ContextWapper, PeopleDataContextType } from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import {
  defaultColumns,
  onboardingKeys,
  personKeys,
  tabItemList,
} from './helper';

export const PeopleDataContext = createContext<PeopleDataContextType>(null);

function PeopleListContextWrapper({ children }: ContextWapper) {
  const tabs = useTabChange({
    defaultKey: '/admin/people?tab=pending',
  });
  const dataSource =
    tabs.tabItem === 'pending' ? dummyPersonsPending : dummyPersons;

  const handleDelete = (id: string | number) => {
    console.log(id); //eslint-disable-line
  };

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

  return (
    <PeopleDataContext.Provider
      value={{
        ...tabs,
        handleAdd,
        columns,
        dataSource,
        handleDelete,
        tabItemList,
      }}
    >
      {children}
    </PeopleDataContext.Provider>
  );
}

export default PeopleListContextWrapper;
