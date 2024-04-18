'use client';
import React, { createContext, useState } from 'react';
import { TabsProps } from 'antd';
import TableRowAction from '../components/TableRowAction';
import { Document } from '@/common/components/icons';
import {
  dummyCorrespondence,
  singleDummyCorrespondenceData,
} from '@/common/mockData';
import { useTabChange } from '@/common/hooks';
import { mergeClassName } from '@/common/utils';
import {
  ContextWapper,
  CorrespondenceListContextType,
  EditableTableColumnTypes,
} from '../types';

export const CorrespondeceListContext =
  createContext<CorrespondenceListContextType>(null);

const defaultColumns: (EditableTableColumnTypes[number] & {
  editable?: boolean;
  dataIndex: string;
})[] = [
  {
    title: 'Sender - Who sent it',
    className: '!pl-5',
    dataIndex: 'sent_by',
    width: 180,
    ellipsis: true,
    editable: true,
  },
  {
    title: 'Recipient (Primary)',
    className: '',
    dataIndex: 'recipient',
    ellipsis: true,
    editable: true,
    width: 200,
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
    title: 'Subject',
    className: '',
    dataIndex: 'subject',
    ellipsis: true,
    width: 150,
    editable: true,
  },
  {
    title: 'Ref. No',
    className: '',
    dataIndex: 'ref_no',
    ellipsis: true,
    width: 150,
    editable: true,
  },
  {
    title: 'Document',
    className: '',
    dataIndex: 'document',
    ellipsis: true,
    editable: true,
    width: 330,
    render: (value: any) => {
      return (
        <>
          {value ? (
            <div className="flex items-center gap-x-2.5">
              <Document />
              <span>{value}</span>
            </div>
          ) : null}
        </>
      );
    },
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    ellipsis: true,
    editable: true,
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
    render: (_: any, __: any, record: any) => {
      return <TableRowAction data={record} />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));
const tabItemList: TabsProps['items'] = [
  {
    key: 'draft',
    label: 'Draft',
  },
  {
    key: 'archive',
    label: 'Archive',
  },
  {
    key: 'sent',
    label: 'Sent',
  },
];

function CorrespondeceListContextWrapper({ children }: ContextWapper) {
  const [dataSource, setDataSource] = useState(dummyCorrespondence);
  const tabs = useTabChange({
    defaultKey: '/app/correspondence?tab=draft',
  });

  const handleDelete = (id: string | number) => {
    const newData = dataSource.filter((item) => item.id !== id);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const keys = Object.keys(singleDummyCorrespondenceData) as Array<
      keyof typeof singleDummyCorrespondenceData
    >;
    const empty: any = {};

    keys.forEach((itm) => {
      empty[itm] = '';
    });

    const newData = {
      ...empty,
      id: dataSource.length + 1,
      created_at: new Date().toLocaleDateString(),
    };
    setDataSource([...dataSource, newData]);
  };

  const handleSave = (row: any) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns: any = defaultColumns.map((col) => {
    if (!col.editable || tabs.tabItem === 'sent') {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <CorrespondeceListContext.Provider
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
    </CorrespondeceListContext.Provider>
  );
}

export default CorrespondeceListContextWrapper;
