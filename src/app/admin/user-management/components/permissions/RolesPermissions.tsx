'use client';
import dynamic from 'next/dynamic';
import React, { useContext, useEffect, useRef } from 'react';
import Title from '@/common/components/Title';
import PageLoader from './PageLoader';
import { UserMgmtDataContext } from '../../service-context/UserMgmtContextWrapper';
import RolesPageLoader from './RolesPageLoader';
import { Role } from '../../types';
import InfoCircle from '@/common/components/icons/InfoCircle';

const RoleItem = dynamic(() => import('./RoleItem'), {
  loading: () => <PageLoader />,
});

const Result = dynamic(() => import('antd/es/result'));

const sampleRole: Role = {
  active: true,
  _id: '',
  name: '',
  permissions: [],
  created_at: '',
  deleted_at: '',
  updated_at: '',
  is_deleted: false,
};

const RolesPermissions = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contextInfo?.rolesData.length) {
      containerRef.current?.children?.item(0)?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [contextInfo?.rolesData.length, contextInfo?.addNewRole]);

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
      <div
        ref={containerRef}
        className="h-full max-h-[calc(100vh_-_13.225rem)] overflow-y-scroll"
      >
        {contextInfo?.addNewRole ? <RoleItem role={sampleRole} /> : null}
        {contextInfo?.rolesData.length
          ? contextInfo.rolesData.map((role) => (
              <RoleItem role={role} key={role._id} />
            ))
          : null}
        {contextInfo?.rolesLoading ? <RolesPageLoader /> : null}
        {!contextInfo?.rolesLoading && contextInfo?.rolesData.length === 0 ? (
          <Result
            title="No Data Available"
            className="flex h-[calc(100vh_-_13.225rem)] flex-col items-center justify-center"
            icon={<InfoCircle size={80} className="text-amber-400" />}
          />
        ) : null}
      </div>
    </div>
  );
};

export default RolesPermissions;
