'use client';
import React, { useContext } from 'react';
import CustomTab from '@/common/components/CustomTab';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import Title from '@/common/components/Title';
import Roles_Permissions from './Roles_Permissions';
import Users from './Users';
import CustomButton from '@/common/components/CustomButton';
import { Add, File, Search } from '@/common/components/icons';
import CustomInput from '@/common/components/CustomInput';
import { Skeleton } from 'antd';

export const initialNewRole = { name: '', _id: 0 };

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);

  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

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
                onClick={contextInfo.addRole}
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
          contextInfo.allRoles && contextInfo.allRoles.length ? (
            <Roles_Permissions />
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
