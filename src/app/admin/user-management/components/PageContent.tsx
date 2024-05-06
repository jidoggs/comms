'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import RolesPermissions from './permissions/RolesPermissions';
import Users from './Users';
import RolesSearchAction from './RolesSearchAction';
import UserTabActions from './UserTabActions';
import CustomTab from '@/common/components/CustomTab';
import Title from '@/common/components/Title';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import { Role, uniqueId } from '../types';

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  const [allRoles, setAllRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (!contextInfo) return;
    if (contextInfo.rolesData.length > 0) {
      setAllRoles(contextInfo.rolesData);
    }
  }, [contextInfo?.rolesData?.length]); //eslint-disable-line

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
    const isRoleAlreadyAdded = allRoles.some((role) => role._id === uniqueId);
    if (!isRoleAlreadyAdded) {
      setAllRoles((prevRoles) => [sampleRole, ...prevRoles]);
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
              {contextInfo?.currentTab === 'roles-permissions' ? (
                <RolesSearchAction handleAddRole={handleAddRole} />
              ) : null}
              {contextInfo?.currentTab === 'users' ? <UserTabActions /> : null}
            </>
          }
        />
        {contextInfo?.currentTab === 'roles-permissions' ? (
          allRoles ? (
            <RolesPermissions
              allRoles={allRoles}
              setAllRoles={setAllRoles}
              allPermissions={contextInfo.permissionsData}
            />
          ) : (
            <Skeleton active />
          )
        ) : null}
        {contextInfo?.currentTab === 'users' ? <Users /> : null}
      </div>
    </div>
  );
};

export default CorrespondencePage;
