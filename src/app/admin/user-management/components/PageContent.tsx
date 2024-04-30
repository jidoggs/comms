'use client';
import React, { useContext, useEffect, useState } from 'react';
import CustomTab from '@/common/components/CustomTab';
import Title from '@/common/components/Title';
import RolesPermissions from './permissions/RolesPermissions';
import Users from './Users';
import CustomButton from '@/common/components/CustomButton';
import { Add, File, Search } from '@/common/components/icons';
import CustomInput from '@/common/components/CustomInput';
import { Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import useRoles from '../../hooks/useRoles';
import { AllPermissionType, AllRoleType, RoleType } from '../../types';
import { uniqueId } from '../types';

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);

  const roleProps = useRoles({
    get_all_roles: true,
    get_all_permissions: true,
  });

  const { getAllRolesSwr, getAllPermissionsSwr } = roleProps;

  const allFetchedRoles: AllRoleType = getAllRolesSwr?.data?.data || [];

  const allFetchedPermissions: AllPermissionType =
    getAllPermissionsSwr?.data?.data || [];

  const [allRoles, setAllRoles] = useState<AllRoleType>([]);

  useEffect(() => {
    if (allFetchedRoles.length > 0) {
      setAllRoles(allFetchedRoles);
    }
  }, [allFetchedRoles]);

  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  const sampleRole = {
    active: true,
    _id: uniqueId,
    name: '',
    permissions: [],
    created_at: '',
    deleted_at: '',
    updated_at: '',
  };

  const handleAddRole = () => {
    const isRoleAlreadyAdded = allRoles.some(
      (role: RoleType) => role._id === uniqueId
    );
    if (!isRoleAlreadyAdded) {
      setAllRoles((prevRoles: AllRoleType) => [sampleRole, ...prevRoles]);
    }
  };

  return (
    <div className="pt-4">
      <Title tag="h3" className="px-5">
        User Management
      </Title>
      <div className="flex flex-col px-5 py-3">
        <div className="flex w-full flex-row justify-between">
          <CustomTab
            onChange={contextInfo?.handleTabChange}
            defaultKey={contextInfo?.tabItem}
            items={contextInfo?.tabItemList}
          />
          {contextInfo?.tabItem === 'roles-permissions' ? (
            <div className="flex flex-row items-center gap-2">
              <CustomInput
                size="middle"
                className=" text-custom-gray_600"
                prefix={<Search />}
              />
              <CustomButton
                type="default"
                icon={<Add />}
                size="small"
                onClick={handleAddRole}
              >
                Add Role
              </CustomButton>
              <CustomButton
                type="text"
                className="!bg-custom-white_100"
                icon={<File />}
                size="small"
              />
            </div>
          ) : null}
        </div>
        {contextInfo?.tabItem === 'roles-permissions' ? (
          allRoles ? (
            <RolesPermissions
              allRoles={allRoles}
              setAllRoles={setAllRoles}
              allPermissions={allFetchedPermissions}
            />
          ) : (
            <Skeleton active />
          )
        ) : null}
        {contextInfo?.tabItem === 'users' ? <Users /> : null}
      </div>
    </div>
  );
};

export default CorrespondencePage;
