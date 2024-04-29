'use client';
import React, { useContext, useState } from 'react';
import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableActions from './TableActions';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';
import RegistrationDetail from './RegistrationDetail';
import { User } from '../types';

const CorrespondencePage = () => {
  const contextInfo = useContext(PeopleDataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState<User | null>(null);

  const rowClickHandler: CustomTableProps<any>['onRow'] = (record) => ({
    onClick: () => {
      setStaffData(record);
      setIsModalOpen(true);
    },
    style: { cursor: 'pointer' },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setStaffData(null);
  };
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
        onRow={rowClickHandler}
      />
      <RegistrationDetail
        open={isModalOpen}
        staffData={staffData}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CorrespondencePage;
