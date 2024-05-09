'use client';
import dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Title from '@/common/components/Title';
// import { Permission, Role } from '../../types';
import PageLoader from './PageLoader';
import { UserMgmtDataContext } from '../../service-context/UserMgmtContextWrapper';
import RolesPageLoader from './RolesPageLoader';
// import second from 'antd/es/table/e'

const RoleItem = dynamic(() => import('./RoleItem'), {
  loading: () => <PageLoader />,
});

// const Result = dynamic(() => import('antd/es/result'));

const RolesPermissions = () => {
  const contextInfo = useContext(UserMgmtDataContext);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-10 border-b border-custom-black_200/10 p-4">
        <Title className="col-span-2 font-medium text-custom-gray_600">
          Role
        </Title>
        <Title className="col-span-8  font-medium text-custom-gray_600">
          Permissions
        </Title>
      </div>
      <div className="h-full max-h-[calc(100vh_-_13.225rem)] overflow-y-scroll">
        {contextInfo && contextInfo.rolesData.length ? (
          contextInfo.rolesData.map((role) => (
            <RoleItem role={role} key={role._id} />
          ))
        ) : (
          <RolesPageLoader />
        )}
      </div>
    </div>
  );
};

export default RolesPermissions;
