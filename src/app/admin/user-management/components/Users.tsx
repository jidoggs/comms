'use client';
import React, { useContext, useState } from 'react';

import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import TableActions from './TableActions';
import { User } from '../types';
import UserDetails from './UserDetails';
import useUsers from '../../hooks/useUsers';

const Users = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffData, setStaffData] = useState<User | null>(null);

  const usersProps = useUsers({
    get_all_users: true,
  });

  const { getAllUsersSwr } = usersProps;

  const { data } = getAllUsersSwr;

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
        dataSource={data?.data as User[]}
        size="large"
        rowClassName="group"
        onRow={rowClickHandler}
      />
      <UserDetails
        open={isModalOpen}
        staffData={staffData}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Users;
