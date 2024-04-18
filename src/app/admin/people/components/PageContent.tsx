'use client';
import React, { useContext } from 'react';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableActions from './TableActions';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';

const CorrespondencePage = () => {
  const contextInfo = useContext(PeopleDataContext);
  return (
    <div className="pt-4">
      <CustomTable
        tableTitle="People"
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
        dataSource={contextInfo?.dataSource}
        size="large"
        rowClassName="group"
      />
    </div>
  );
};

export default CorrespondencePage;
