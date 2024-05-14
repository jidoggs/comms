'use client';
import React, { useContext } from 'react';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableActions from './components/TableActions';
import {
  EditableCell,
  EditableRow,
} from './components/EditTable/EditableTable';
import { CorrespondeceListContext } from './service-context/CorrespondeceListContextWrapper';
import AddCorrespondence from './components/AddCorrespondence';

const CorrespondencePage = () => {
  const contextInfo = useContext(CorrespondeceListContext);
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  return (
    <div className="pt-4">
      <CustomTable
        tableTitle="Correspondence management"
        tabs={
          <CustomTab
            onChange={contextInfo?.handleTabChange}
            defaultKey={contextInfo?.currentTab}
            items={contextInfo?.tabItemList}
          />
        }
        searchPanel={<TableActions />}
        className={{
          table: 'cursor-pointer',
          tableWrapper:
            'relative h-[calc(100vh-148px)] [&_.ant-table-container]:h-[calc(100vh-199px)] [&_.ant-table-container]:overflow-scroll  [&_.ant-table]:!relative',
        }}
        columns={contextInfo?.columns}
        components={components}
        dataSource={contextInfo?.dataSource}
        loading={contextInfo?.loading}
        onRow={(row, id) => ({ ...row, id: id?.toString(), help: 'jide' })}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 56 }}
        footer={() => {
          if (contextInfo?.currentTab === 'sent') return;
          return <AddCorrespondence />;
        }}
      />
    </div>
  );
};

export default CorrespondencePage;
