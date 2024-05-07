'use client';
import dynamic from 'next/dynamic';
import React, { useContext, useState } from 'react';
import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';
import { User } from '../types';

const TableActions = dynamic(() => import('./TableActions'));
const RegistrationDetail = dynamic(() => import('./RegistrationDetail'));

const CorrespondencePage = () => {
  const contextInfo = useContext(PeopleDataContext);
  const [staffData, setStaffData] = useState<User | null>(null);

  const rowClickHandler: CustomTableProps<any>['onRow'] = (record) => ({
    onClick: () => {
      setStaffData(record);
    },
    style: { cursor: 'pointer' },
  });

  const handleCancel = () => {
    setStaffData(null);
  };

  return (
    <div className="pt-4">
      <CustomTable
        tableTitle="People"
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
        }}
        columns={contextInfo?.columns}
        dataSource={contextInfo?.dataSource}
        loading={contextInfo?.isLoading}
        size="large"
        rowClassName="group"
        onRow={rowClickHandler}
        components={contextInfo?.components}
      />
      <RegistrationDetail
        open={!!staffData?._id}
        staffData={staffData}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CorrespondencePage;
