'use client';
import CustomButton from '@/common/components/CustomButton';
import { ArrowUp, CloseCircled } from '@/common/components/icons';
import Title from '@/common/components/Title';
import React, { useContext } from 'react';
import SectionMoreOptions from './actions/SectionMoreOptions';
import CustomInput from '@/common/components/CustomInput';
import Permissions from './Permissions';
import Tick from '@/common/components/icons/Tick';
import { initialNewRole } from './PageContent';
import { Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';

const Roles_Permissions = () => {
  const contextInfo = useContext(UserMgmtDataContext);
  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

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
        {contextInfo.newRoles && contextInfo.newRoles
          ? contextInfo.newRoles.map((newRole: any) => (
              <div
                className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
                key={newRole.id}
              >
                <div className="col-span-2 pr-4">
                  <CustomInput
                    className="w-1/2 !px-2"
                    size="small"
                    onChange={(e) =>
                      contextInfo.setUpdateNewRoleData &&
                      contextInfo.setUpdateNewRoleData({
                        name: e.target.value,
                        _id: newRole.id,
                      })
                    }
                  />
                </div>
                <Permissions role={newRole} />

                {(contextInfo.editRole &&
                  contextInfo.currentRole === newRole._id) ||
                newRole.name === '' ? (
                  <div className="flex w-full flex-row justify-end gap-2">
                    <CustomButton
                      icon={<Tick size="18" />}
                      description="Save"
                      type="text"
                      size="small"
                      onClick={contextInfo.submitNewRole}
                    />
                    <CustomButton
                      icon={<CloseCircled size="18" />}
                      description="Cancel"
                      type="text"
                      size="small"
                      onClick={() => {
                        contextInfo.setNewRoles && contextInfo.setNewRoles([]);
                        contextInfo.setUpdateNewRoleData &&
                          contextInfo.setUpdateNewRoleData(initialNewRole);
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex w-full flex-row justify-end gap-2">
                    <SectionMoreOptions
                      editRole={contextInfo.editRole}
                      setEditRole={contextInfo.setEditRole}
                      activeRole={newRole._id}
                      setCurrentRole={contextInfo.setCurrentRole}
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
            ))
          : null}
        {contextInfo.allRoles &&
          contextInfo.allRoles.length &&
          contextInfo.allRoles.map((role: any) => (
            <div
              className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
              key={role._id}
            >
              <div className="col-span-2 pr-4">
                {(contextInfo.editRole &&
                  contextInfo.currentRole === role._id) ||
                role.name === '' ? (
                  <CustomInput
                    className="w-1/2 !px-2"
                    size="small"
                    onChange={(e) =>
                      contextInfo.handleNameChange({
                        name: e.target.value,
                        _id: role._id,
                      })
                    }
                    defaultValue={role.name}
                  />
                ) : (
                  role.name
                )}
              </div>
              <Permissions role={role} />

              {(contextInfo.editRole && contextInfo.currentRole === role._id) ||
              role.name === '' ? (
                <div className="flex w-full flex-row justify-end gap-2">
                  <CustomButton
                    icon={<Tick size="18" />}
                    description="Save"
                    type="text"
                    size="small"
                    onClick={contextInfo.updateExitingRole}
                  />
                  <CustomButton
                    icon={<CloseCircled size="18" />}
                    description="Cancel"
                    type="text"
                    size="small"
                    onClick={() => contextInfo.setEditRole(false)}
                  />
                </div>
              ) : (
                <div className="flex w-full flex-row justify-end gap-2">
                  <SectionMoreOptions
                    editRole={contextInfo.editRole}
                    setEditRole={contextInfo.setEditRole}
                    activeRole={role._id}
                    setCurrentRole={contextInfo.setCurrentRole}
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

export default Roles_Permissions;
