'use client';
import React, { createContext } from 'react';
import { TabsProps } from 'antd';
import {
  ContextWapper,
  EditableTableColumnTypes,
  UserMgmtDataContextType,
} from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import TableRowAction from '../components/TableRowAction';
import { mergeClassName } from '@/common/utils';

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

const defaultColumns: (EditableTableColumnTypes[number] & {
  dataIndex: string;
})[] = [
  {
    title: 'Person',
    className: '!pl-5',
    dataIndex: 'full_name',
    width: 180,
    ellipsis: true,
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
  },
  {
    title: 'Role',
    className: '',
    dataIndex: 'role',
    ellipsis: true,
    width: 200,
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

function PeopleListContextWrapper({ children }: ContextWapper) {
  const tabs = useTabChange({
    defaultKey: '/admin/user-management?tab=roles-permissions',
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
    <UserMgmtDataContext.Provider
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
    </UserMgmtDataContext.Provider>
  );
}

export default PeopleListContextWrapper;
