'use client';
import React, { useContext, useState } from 'react';
import CustomTable from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
import TableActions from './TableActions';
import { PeopleDataContext } from '../service-context/PeopleListContextWrapper';
import CustomModal from '@/common/components/CustomModal';
import { User } from '@/app/auth/types/auth';
import RegistrationDetailsModal from './RegistrationDetailsModal';

const CorrespondencePage = () => {
  const contextInfo = useContext(PeopleDataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState<User>({} as User);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        onRow={(record) => ({
          onClick: () => {
            setStaffData(record);
            showModal();
          },
          style: { cursor: 'pointer' },
        })}
      />
      <CustomModal open={isModalOpen} onCancel={handleCancel} width="80%">
        <RegistrationDetailsModal registrationData={staffData} />
      </CustomModal>
    </div>
  );
};

export default CorrespondencePage;
