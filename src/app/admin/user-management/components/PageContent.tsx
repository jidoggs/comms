'use client';
import dynamic from 'next/dynamic';
import React, { useContext, lazy, Suspense } from 'react';
import CustomTab from '@/common/components/CustomTab';
import Title from '@/common/components/Title';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import { Role, uniqueId } from '../types';
import RolesPageLoader from './permissions/RolesPageLoader';

// const PageLoader = dynamic(() => import('./permissions/PageLoader'));

const RolesSearchAction = dynamic(() => import('./RolesSearchAction'));
const UserTabActions = dynamic(() => import('./UserTabActions'));
const Users = dynamic(() => import('./Users'));
const RolesPermissions = lazy(() => import('./permissions/RolesPermissions'));

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);

  const sampleRole: Role = {
    active: true,
    _id: uniqueId,
    name: '',
    permissions: [],
    created_at: '',
    deleted_at: '',
    updated_at: '',
    is_deleted: false,
  };

  const handleAddRole = () => {
    const isRoleAlreadyAdded = contextInfo?.rolesData.some(
      (role) => role._id === uniqueId
    );
    if (!isRoleAlreadyAdded) {
      contextInfo?.addNewRoleHandler(sampleRole);
    }
  };

  return (
    <div className="pt-4">
      <Title tag="h3" className="px-5">
        User Management
      </Title>
      <div className="flex flex-col px-5 py-3">
        <CustomTab
          onChange={contextInfo?.handleTabChange}
          defaultKey={contextInfo?.currentTab}
          items={contextInfo?.tabItemList}
          className="border-none [&_.ant-tabs-nav-list]:border-b [&_.ant-tabs-nav-list]:border-custom-gray_500"
          tabBarExtraContent={
            <>
              {contextInfo?.currentTab !== 'users' ? (
                <RolesSearchAction handleAddRole={handleAddRole} />
              ) : null}
              {contextInfo?.currentTab === 'users' ? <UserTabActions /> : null}
            </>
          }
        />
        {contextInfo?.currentTab !== 'users' ? (
          <Suspense fallback={<RolesPageLoader />}>
            <RolesPermissions />
          </Suspense>
        ) : null}
        {contextInfo?.currentTab === 'users' ? <Users /> : null}
      </div>
    </div>
  );
};

export default CorrespondencePage;
