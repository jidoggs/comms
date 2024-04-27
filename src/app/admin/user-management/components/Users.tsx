'use client';
import React, { useContext, useState } from 'react';
import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';

import { User } from '@/app/auth/types/auth';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import TableActions from './TableActions';
import RegistrationDetail from '../../people/components/RegistrationDetail';

const Users = () => {
  const contextInfo = useContext(UserMgmtDataContext);
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

export default Users;
