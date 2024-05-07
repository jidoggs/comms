'use client';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import CustomTable from '@/common/components/CustomTable';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import useUsers from '../../hooks/useUsers';

const UserDetails = dynamic(() => import('./UserDetails'));

const Users = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  const { handleCancel, rowClickHandler, selectedUser } = useUsers();

  return (
    <>
      <CustomTable
        className={{
          table: 'cursor-pointer',
          tableWrapper: '!h-[calc(100vh-182px)] !w-full',
        }}
        columns={contextInfo?.columns}
        dataSource={contextInfo?.usersData}
        loading={contextInfo?.usersLoading}
        size="large"
        rowClassName="group"
        onRow={rowClickHandler}
        components={contextInfo?.components}
      />
      <UserDetails
        open={!!selectedUser?._id}
        staffData={selectedUser}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Users;
