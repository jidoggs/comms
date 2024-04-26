/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useContext, useEffect, useState } from 'react';
// import CustomTable, { CustomTableProps } from '@/common/components/CustomTable';
import CustomTab from '@/common/components/CustomTab';
// import TableActions from './TableActions';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import Title from '@/common/components/Title';
import Roles_Permissions from './Roles_Permissions';
import Users from './Users';
import CustomButton from '@/common/components/CustomButton';
import { Add, File, Search } from '@/common/components/icons';
import CustomInput from '@/common/components/CustomInput';
import { roles } from './data';
import useRoles from '../../hooks/useRoles';
import { message } from 'antd';
// import RegistrationDetail from './RegistrationDetail';
// import { User } from '@/app/auth/types/auth';

const CorrespondencePage = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  const [newRoles, setNewRoles] = useState<any>([]);
  const [updateRoleData, setUpdateRoleData] = useState({
    name: '',
    id: 0,
  });

  // console.log('contextInfo?.tabItem', contextInfo?.tabItem);

  // console.log('updateRoleData', updateRoleData);
  // console.log('updateRoleData', updateRoleData);

  // const UpdateRoleValue = () => {};

  const {
    createRoleSwr,
    getListSwr,
    getItemSwr,
    updateItemSwr,
    deleteItemSwr,
  } = useRoles({ get_all: true, create: true });

  const { trigger: createRoleTrigger, isMutating: createRoleIsMutating } =
    createRoleSwr;

  const allRoles =
    getListSwr && getListSwr.data && (getListSwr.data.data as any);

  // useEffect(() => {
  //   setAllRoles(getListSwr && getListSwr.data.data);
  // }, []);

  const updateAllRoles = () => {
    // setAllRoles;
  };
  // console.log('getListSwr', getListSwr);
  // console.log('getItemSwr', getItemSwr);
  const submitNewRole = () => {
    // setPasswordTrigger({ data: values, type: 'post' }).then(() => {
    //   router.push('/onboarding/success');
    // });
    createRoleTrigger({
      data: { name: updateRoleData.name },
      type: 'post',
    }).then((res) => {
      message.success(res.message);
    });
  };

  const addRole = () => {
    const newRole = {
      id: allRoles.length + 1,
      name: '', // Set to empty initially
      role: '', // Set to empty initially
      permissions: [],
    };
    setNewRoles([newRole]);
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
                onClick={addRole}
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
        {/* <div className="w-full py-2"> */}
        {contextInfo?.tabItem === 'roles-permissions' ? (
          <Roles_Permissions
            newRoles={newRoles}
            allRoles={allRoles}
            setUpdateRoleData={setUpdateRoleData}
            submitNewRole={submitNewRole}
          />
        ) : null}
        {contextInfo?.tabItem === 'users' ? <Users /> : null}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CorrespondencePage;
