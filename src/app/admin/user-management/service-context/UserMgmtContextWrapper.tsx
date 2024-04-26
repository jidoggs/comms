'use client';
import React, { createContext } from 'react';
import { TabsProps } from 'antd';
// import { mergeClassName } from '@/common/utils';
import { ContextWapper, UserMgmtDataContextType } from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';

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

function PeopleListContextWrapper({ children }: ContextWapper) {
  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
  });
  const dataSource =
    tabs.tabItem === 'pending' ? dummyPersonsPending : dummyPersons;

  const handleDelete = (id: string | number) => {
    console.log(id); //eslint-disable-line
  };

  // const columns = defaultColumns
  //   .filter((itm) =>
  //     tabs.tabItem === 'pending'
  //       ? onboardingKeys.includes(itm.dataIndex)
  //       : personKeys.includes(itm.dataIndex)
  //   )
  //   .map((itm) => {
  //     if (tabs.tabItem === 'pending') {
  //       if (itm.dataIndex === 'email') {
  //         return {
  //           ...itm,
  //           render: (value: any) => {
  //             return (
  //               <>
  //                 {value ? (
  //                   <div className="flex items-center gap-x-2.5">
  //                     <div className="size-7 rounded-full bg-red-500" />
  //                     <span>{value}</span>
  //                   </div>
  //                 ) : null}
  //               </>
  //             );
  //           },
  //         };
  //       }
  //       if (itm.dataIndex === 'full_name') {
  //         return {
  //           ...itm,
  //         };
  //       }
  //     }
  //     return itm;
  //   });

  const handleAdd = () => {};

  return (
    <UserMgmtDataContext.Provider
      value={{
        ...tabs,
        handleAdd,
        // columns,
        dataSource,
        handleDelete,
        tabItemList,
      }}
    >
      {children}
    </UserMgmtDataContext.Provider>
  );
}

export default PeopleListContextWrapper;
