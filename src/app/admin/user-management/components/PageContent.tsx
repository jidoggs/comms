'use client';
import dynamic from 'next/dynamic';
import React, { useContext, lazy, Suspense } from 'react';
import CustomTab from '@/common/components/CustomTab';
import Title from '@/common/components/Title';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import RolesPageLoader from './permissions/RolesPageLoader';
import CustomPaginationHeader from '@/common/components/CustomPaginationHeader';
import FullPageLoader from '@/common/components/FullPageLoader';

const RolesSearchAction = dynamic(() => import('./RolesSearchAction'));
const UserTabActions = dynamic(() => import('./UserTabActions'));
const Users = lazy(() => import('./Users'));
const RolesPermissions = lazy(() => import('./permissions/RolesPermissions'));

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);

  return (
    <div className="pt-4">
      <div className="px-5">
        {contextInfo?.currentTab === 'roles-permissions' ||
        contextInfo?.pagination.totalDataCount === 0 ? (
          <Title tag="h3" className="text-lg">
            User Management
          </Title>
        ) : (
          <CustomPaginationHeader
            currentPage={contextInfo?.pagination.currentPage}
            pageChangeCallBack={contextInfo?.pagination.pageChangeHandler}
            pageSize={contextInfo?.pagination.itemPerPage}
            tableTitle="User Management"
            totalContent={contextInfo?.pagination.totalDataCount}
            className={{
              title: 'text-lg',
            }}
          />
        )}
      </div>
      <div className="flex flex-col px-5 py-3">
        <CustomTab
          onChange={contextInfo?.handleTabChange}
          defaultKey={contextInfo?.currentTab}
          items={contextInfo?.tabItemList}
          className="border-none [&_.ant-tabs-nav-list]:border-b [&_.ant-tabs-nav-list]:border-custom-gray_500"
          tabBarExtraContent={
            <>
              {contextInfo?.currentTab === 'roles-permissions' ? (
                <RolesSearchAction />
              ) : null}
              {contextInfo?.currentTab === 'users' ? <UserTabActions /> : null}
            </>
          }
        />
        {contextInfo?.currentTab === 'roles-permissions' ? (
          <Suspense fallback={<RolesPageLoader />}>
            <RolesPermissions />
          </Suspense>
        ) : null}
        {contextInfo?.currentTab === 'users' ? (
          <Suspense fallback={<FullPageLoader />}>
            <Users />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
};

export default CorrespondencePage;
