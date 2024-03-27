'use client';
import React, { useState } from 'react';
import { TabsProps } from 'antd';
import Table from 'antd/es/table';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableRowAction from './components/TableRowAction';
import TableActions from './components/TableActions';
import { Document } from '@/common/components/icons';
import { mergeClassName } from '@/common/utils';
import {
  dummyCorrespondence,
  singleDummyCorrespondenceData,
} from '@/common/mockData';
import { EditableCell, EditableRow } from './components/EditableTable';

type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const defaultColumns: (ColumnTypes[number] & {
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
    render: () => {
      return <TableRowAction />;
    },
  },
].map((itm) => ({
  ...itm,
  className: mergeClassName('!py-4 text-sm font-medium', itm.className),
}));

const SchedulePage = () => {
  const [dataSource, setDataSource] = useState(dummyCorrespondence);

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

  // const handleDelete = (id: string | number) => {
  //   const newData = dataSource.filter((item) => item.id !== id);
  //   setDataSource(newData);
  // };

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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
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
        searchPanel={<TableActions addHandler={handleAdd} />}
        className={{
          table: 'cursor-pointer',
        }}
        columns={columns as ColumnTypes}
        components={components}
        dataSource={dataSource}
        onRow={(row, id) => ({ ...row, id: id?.toString(), help: 'jide' })}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 56 }}
        footer={() => (
          <div className="hover:bg-custom-white_100">
            <button className="group flex items-center gap-x-2.5 py-1.5 pl-5 text-sm text-custom-main">
              <span>+</span>
              <span className="rounded-lg px-2 py-3 group-hover:bg-custom-gray_500">
                Add correspondence
              </span>
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default SchedulePage;
