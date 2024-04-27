'use client';
import CustomButton from '@/common/components/CustomButton';
import { ArrowUp, CloseCircled } from '@/common/components/icons';
import Title from '@/common/components/Title';
import React, { useContext, useState } from 'react';
import SectionMoreOptions from './actions/SectionMoreOptions';
import CustomInput from '@/common/components/CustomInput';
import Permissions from './Permissions';
import Tick from '@/common/components/icons/Tick';
// import { initialNewRole } from './PageContent';
import { message, Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import useRoles from '../../hooks/useRoles';

interface RolesPermissionsProps {
  allRoles: any;
  setAllRoles: React.Dispatch<any>;
  allPermissions: any;
  options: any;
  allOriginalRoles: any;
}

const RolesPermissions = ({
  allRoles,
  setAllRoles,
  allPermissions,
  options,
  allOriginalRoles,
}: RolesPermissionsProps) => {
  const contextInfo = useContext(UserMgmtDataContext);
  const [currentRoleId, setCurrentRoleId] = useState<any>();

  const { createRoleSwr } = useRoles({
    create: true,
  });

  const { trigger: createRoleTrigger } = createRoleSwr;

  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  const handleNameChange = ({ _id, name }: any) => {
    setAllRoles((prevRoles: any) =>
      prevRoles.map((role: any) =>
        role._id === _id ? { ...role, name } : role
      )
    );
  };

  const updateExitingRole = (_id: any) => {
    createRoleTrigger({
      data: { name: _id },
      type: 'post',
    }).then((res) => {
      message.success(res.message);
    });
  };

  const handleCloseEditRole = (id: any) => {
    if (id === 1) {
      setAllRoles((prevRoles: any) =>
        prevRoles.filter((role: any) => role._id !== id)
      );
    } else {
      setAllRoles(allOriginalRoles);
    }
    contextInfo.setEditRole && contextInfo.setEditRole(false);
  };

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
        {allRoles &&
          allRoles.length &&
          allRoles.map((role: any) => (
            <div
              className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
              key={role._id}
            >
              <div className="col-span-2 pr-4">
                {(contextInfo.editRole && currentRoleId === role._id) ||
                role.name === '' ? (
                  <CustomInput
                    className="w-1/2 !px-2"
                    size="small"
                    onChange={(e) =>
                      handleNameChange({ _id: role._id, name: e.target.value })
                    }
                    defaultValue={role.name}
                  />
                ) : (
                  role.name
                )}
              </div>
              <Permissions
                role={role}
                allRoles={allRoles}
                setAllRoles={setAllRoles}
                allPermissions={allPermissions}
                options={options}
                currentRoleId={currentRoleId}
              />

              {(contextInfo.editRole && currentRoleId === role._id) ||
              role.name === '' ? (
                <div className="flex w-full flex-row justify-end gap-2">
                  <CustomButton
                    icon={<Tick size="18" />}
                    description="Save"
                    type="text"
                    size="small"
                    onClick={() => updateExitingRole({ _id: role._id })}
                  />
                  <CustomButton
                    icon={<CloseCircled size="18" />}
                    description="Cancel"
                    type="text"
                    size="small"
                    onClick={() => handleCloseEditRole(role._id)}
                  />
                </div>
              ) : (
                <div className="flex w-full flex-row justify-end gap-2">
                  <SectionMoreOptions
                    editRole={contextInfo.editRole}
                    setEditRole={contextInfo.setEditRole}
                    role={role}
                    currentRoleId={currentRoleId}
                    setCurrentRoleId={setCurrentRoleId}
                    setEditedRole={contextInfo.setEditedRole}
                  />
                  <CustomButton
                    icon={<ArrowUp />}
                    description="Collapse"
                    type="text"
                    size="small"
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
