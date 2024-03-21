'use client';
import CustomTab from '@/common/components/CustomTab';
import CustomTable from '@/common/components/CustomTable';
import { Document } from '@/common/components/icons';
import { dummyCorrespondence } from '@/common/mockData';
import { mergeClassName } from '@/common/utils';
import { TabsProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import Action from './components/Action';

const columns: ColumnsType<any> = [
  {
    title: 'Sender - Who sent it',
    className: '!pl-5',
    dataIndex: 'sent_by',
    width: 180,
    ellipsis: true,
  },
  {
    title: 'Recipient (Primary)',
    className: '',
    dataIndex: 'recipient',
    ellipsis: true,
    width: 200,
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
    title: 'Subject',
    className: '',
    dataIndex: 'subject',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Ref. No',
    className: '',
    dataIndex: 'ref_no',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'Document',
    className: '',
    dataIndex: 'document',
    ellipsis: true,
    width: 220,
    render: (value: any) => {
      return (
        <div className="flex items-center gap-x-2.5">
          <Document />
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    ellipsis: true,
    width: 450,
    className: '!text-wrap !max-w-full !break-words',
  },
  {
    title: 'Date of correspondence',
    dataIndex: 'created_at',
    ellipsis: true,
    width: 180,
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

const SchedulePage = () => {
  const [activeKey, setActiveKey] = useState('draft');
  const items: TabsProps['items'] = [
    {
      key: 'draft',
      label: 'Draft',
    },
    {
      key: 'archive',
      label: 'Archive',
    },
  ];

  const tabChangeHandler = (state: string) => {
    setActiveKey(state);
  };

  return (
    <div>
      <CustomTable
        tableTitle="Correspondence management"
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
        dataSource={dummyCorrespondence}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 48 }}
        footer={() => (
          <button className="text-custom-main flex items-center gap-x-2.5 py-1.5 pl-2.5 text-sm">
            +{' '}
            <span className="hover:bg-custom-gray_500 rounded-lg px-4 py-3">
              Add correspondence
            </span>
          </button>
        )}
      />
    </div>
  );
};

export default SchedulePage;
