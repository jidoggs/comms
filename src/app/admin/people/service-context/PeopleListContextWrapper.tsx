'use client';
import React, { createContext } from 'react';
import dayjs from 'dayjs';

import { TabsProps } from 'antd';
import { mergeClassName } from '@/common/utils';
import {
  ContextWapper,
  PeopleDataContextType,
  EditableTableColumnTypes,
} from '../types';
import { useTabChange } from '@/common/hooks';
import { dummyPersonsPending, dummyPersons } from '@/common/mockData';
import TableRowAction from '../components/TableRowAction';

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
    render: (_: any, __: any, record: any) => {
      return <>{dayjs(record?.created_at).format('DD-MMM-YYYY')}</>;
    },
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
    defaultKey: '/admin/people?tab=pending',
  });
  const dataSource =
    tabs.tabItem === 'pending' ? dummyPersonsPending : dummyPersons;

  const handleDelete = (id: string | number) => {
    console.log(id); //eslint-disable-line
  };

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
      key: 'rejected',
      label: 'Declined',
    },
  ];

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
    <>
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
      {/* <div>
        <DeclineRequestModalContent
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
          setIsSuccessModalOpen={() => setIsSuccessModalOpen(true)}
        />
        <SubmittedResponseModal
          handleCancel={() => setIsSuccessModalOpen(false)}
          isModalOpen={isSuccessModalOpen}
        />
        <CustomModal width={320} open={isModalOpen} onCancel={handleCancel}>
          <div className="flex flex-col items-center gap-2 text-base text-custom-gray_200">
            <InfoCircle size={90} />

            <p className="text-center">
              Are you sure you want to approve this registration?
            </p>
            <Divider className="!border-custom-gray_500" />
            <div className="-mt-2 flex w-full justify-between">
              <CustomButton type="text">Cancel</CustomButton>
              <CustomButton type="text">Yes, Approve</CustomButton>
            </div>
          </div>
        </CustomModal>
      </div> */}
    </>
  );
}

export default PeopleListContextWrapper;
