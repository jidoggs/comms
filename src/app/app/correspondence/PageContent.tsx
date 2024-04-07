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
            defaultKey={contextInfo?.tabItem}
            items={contextInfo?.tabItemList}
          />
        }
        searchPanel={<TableActions />}
        className={{
          table: 'cursor-pointer',
        }}
        columns={contextInfo?.columns}
        components={components}
        dataSource={contextInfo?.dataSource}
        onRow={(row, id) => ({ ...row, id: id?.toString(), help: 'jide' })}
        size="large"
        rowClassName="group"
        rowSelection={{ columnWidth: 56 }}
        footer={() => {
          if (contextInfo?.tabItem === 'sent') return;
          return <AddCorrespondence handleClick={contextInfo?.handleAdd} />;
        }}
      />
    </div>
  );
};

export default CorrespondencePage;
