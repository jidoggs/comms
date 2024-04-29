'use client';
import React, { useContext, useEffect, useState } from 'react';
import CustomTab from '@/common/components/CustomTab';
import Title from '@/common/components/Title';
import RolesPermissions from './RolesPermissions';
import Users from './Users';
import CustomButton from '@/common/components/CustomButton';
import { Add, File, Search } from '@/common/components/icons';
import CustomInput from '@/common/components/CustomInput';
import { Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import useRoles from '../../hooks/useRoles';

const CorrespondencePage = () => {
  const [allRoles, setAllRoles] = useState<any>();
  const [allOriginalRoles, setAllOriginalRoles] = useState<any>();
  const [allPermissions, setAllPermissions] = useState<any>();
  const [editedRole, setEditedRole] = useState<any>();
  const [editRole, setEditRole] = useState<boolean>(false);
  const contextInfo = useContext(UserMgmtDataContext);

  const roleProps = useRoles({
    get_all_roles: true,
    get_all_permissions: true,
  });

  const { getAllRolesSwr, getAllPermissionsSwr } = roleProps;

  const allFetchedRoles: any =
    getAllRolesSwr && getAllRolesSwr.data && getAllRolesSwr.data.data;

  const allFetchedPermissions: any =
    getAllPermissionsSwr &&
    getAllPermissionsSwr.data &&
    getAllPermissionsSwr.data.data;

  useEffect(() => {
    if (allFetchedRoles) {
      setAllRoles(allFetchedRoles);
    }
    if (allFetchedPermissions) {
      setAllPermissions(allFetchedPermissions);
    }
  }, [allFetchedRoles, allFetchedPermissions]);

  useEffect(() => {
    if (allFetchedRoles) {
      setAllOriginalRoles(allFetchedRoles);
    }
  }, [allFetchedRoles]);

  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  const sampleRole = {
    active: true,
    _id: 1,
    name: '',
    permissions: [],
  };

  const handleAddRole = () => {
    const element = document.getElementById('rolesPermissions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    const isRoleAlreadyAdded = allRoles.some(
      (role: any) => role._id === sampleRole._id
    );
    if (!isRoleAlreadyAdded) {
      setAllRoles((prevRoles: any) => [sampleRole, ...prevRoles]);
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
          allRoles && allRoles.length ? (
            <RolesPermissions
              allRoles={allRoles}
              setAllRoles={setAllRoles}
              allPermissions={allPermissions}
              // options={options}
              allOriginalRoles={allOriginalRoles}
              editRole={editRole}
              setEditRole={setEditRole}
              editedRole={editedRole}
              setEditedRole={setEditedRole}
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
