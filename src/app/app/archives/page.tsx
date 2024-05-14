'use client';
import React, { useState } from 'react';

import { ColumnsType } from 'antd/es/table';
import Action from './components/Action';
import CustomTab, { TabItemProps } from '@/common/components/CustomTab';
import CustomTable from '@/common/components/CustomTable';
import { mergeClassName } from '@/common/utils';
import { dummyPeople } from '@/common/mockData';

const columns: ColumnsType<any> = [
  {
    title: 'Sender - Who sent it',
    className: '!pl-5',
    dataIndex: 'sent_by',
    width: 180,
    ellipsis: true,
    render: (value: any) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <div className="size-7 rounded-full bg-red-500" />{' '}
          <span>{value}</span>
        </div>
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
    width: 220,
  },
  {
    title: 'Last active',
    className: '',
    dataIndex: 'last_active',
    ellipsis: true,
    width: 135,
  },
  {
    title: 'Date added',
    className: '',
    dataIndex: 'created_at',
    ellipsis: true,
    width: 135,
  },
  {
    title: 'Actions',
    className: '!pr-3',
    dataIndex: '',
    ellipsis: true,
    width: 135,
    render: () => {
      return <Action />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));

const Page = () => {
  const [activeKey, setActiveKey] = useState('onboard');
  const items: TabItemProps = [
    {
      key: 'onboard',
      label: 'Onboard',
    },
    {
      key: 'pending',
      label: 'Pending onboarding',
    },
  ];

  const tabChangeHandler = (state: string) => {
    setActiveKey(state);
  };

  return (
    <div>
      <CustomTable
        tableTitle="People"
        tabs={
          <CustomTab
            onChange={tabChangeHandler}
            defaultKey={activeKey}
            items={items}
          />
        }
        className={{
          table: 'cursor-pointer',
        }}
        columns={columns}
        dataSource={dummyPeople}
      />
    </div>
  );
};

export default Page;
