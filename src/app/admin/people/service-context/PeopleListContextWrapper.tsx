'use client';
import React, { createContext } from 'react';
import { Popover, TabsProps } from 'antd';
import TableRowAction from '../components/TableRowAction';
import { mergeClassName } from '@/common/utils';
import {
  ContextWapper,
  PeopleDataContextType,
  EditableTableColumnTypes,
  iHandleKeyboard,
} from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import Tick from '@/common/components/icons/Tick';
import { CloseCircle } from '@/common/components/icons';

export const PeopleDataContext = createContext<PeopleDataContextType>(null);
const onboardingKeys = [
  'email',
  'full_name',
  'title',
  'parastatal',
  'date_sent',
  '',
];
const personKeys = [
  'full_name',
  'email',
  'title',
  'office',
  'parastatal',
  'last_active',
  'date_created',
  '',
];

const actionsKeyboardHandler: iHandleKeyboard = (e) => {
  e.stopPropagation();
};

const content = (
  <div>
    <div
      role="button"
      className="flex cursor-pointer items-center gap-1"
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={actionsKeyboardHandler}
    >
      <Tick size={16} color="green" />
      <p>Approve</p>
    </div>
    <div
      className="flex cursor-pointer items-center gap-1"
      role="button"
      tabIndex={0}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={actionsKeyboardHandler}
    >
      <CloseCircle size={18} color="red" />
      <p>Decline</p>
    </div>
  </div>
);

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
    render: (_: any, __: any, record: any) => {
      return (
        <Popover content={content} className="!w-full cursor-pointer">
          <>
            <TableRowAction data={record} />
          </>
        </Popover>
      );
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));
const tabItemList: TabsProps['items'] = [
  {
    key: 'pending',
    label: 'Pending onboarding',
  },
  {
    key: 'onboarded',
    label: 'Onboarded',
  },
  {
    key: 'approved',
    label: 'Approved',
  },
  {
    key: 'declined',
    label: 'Declined',
  },
];

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
