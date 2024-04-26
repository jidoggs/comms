'use client';
import CustomButton from '@/common/components/CustomButton';
import { ArrowUp, CloseCircled } from '@/common/components/icons';
import Title from '@/common/components/Title';
import React, { useState } from 'react';
import SectionMoreOptions from './actions/SectionMoreOptions';
import CustomInput from '@/common/components/CustomInput';
import Permissions from './Permissions';
import Tick from '@/common/components/icons/Tick';

interface Roles_PermissionsProps {
  newRoles: any;
  allRoles: any;
  setUpdateRoleData?: any;
  submitNewRole?: VoidFunction; //eslint-disable-line
}

const Roles_Permissions = ({
  allRoles,
  // newRoles,
  setUpdateRoleData,
  submitNewRole,
}: Roles_PermissionsProps) => {
  const [editRole, setEditRole] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<number>(0);

  // console.log('allRoles', allRoles);

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
      <div className="h-full max-h-[calc(100vh_-_15.625rem)] overflow-y-scroll">
        {/* {newRoles && newRoles.length > 0
          ? newRoles.map((role: any) => (
              <div
                className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
                key={role.id}
              >
                <div className="col-span-2 pr-4">
                  {(editRole && currentRole === role.id) || role.name === '' ? (
                    <CustomInput
                      className="w-1/2 !px-2"
                      size="small"
                      onChange={(e) =>
                        setUpdateRoleData({ name: e.target.value, id: role.id })
                      }
                    />
                  ) : (
                    role.name
                  )}
                </div>
                <Permissions role={role} />

                {(editRole && currentRole === role.id) || role.name === '' ? (
                  <div className="flex w-full flex-row justify-end gap-2">
                    <CustomButton
                      icon={<Tick size="18" />}
                      description="Save"
                      type="text"
                      size="small"
                      onClick={submitNewRole}
                    />
                    <CustomButton
                      icon={<CloseCircled size="18" />}
                      description="Cancel"
                      type="text"
                      size="small"
                      onClick={() => setEditRole(false)}
                    />
                  </div>
                ) : (
                  <div className="flex w-full flex-row justify-end gap-2">
                    <SectionMoreOptions
                      editRole={editRole}
                      setEditRole={setEditRole}
                      activeRole={role.id}
                      setCurrentRole={setCurrentRole}
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
          : ''} */}
        {allRoles &&
          allRoles.length &&
          allRoles.map((role: any) => (
            <div
              className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
              key={role._id}
            >
              <div className="col-span-2 pr-4">
                {(editRole && currentRole === role._id) || role.name === '' ? (
                  <CustomInput
                    className="w-1/2 !px-2"
                    size="small"
                    onChange={(e) =>
                      setUpdateRoleData({ name: e.target.value, id: role._id })
                    }
                  />
                ) : (
                  role.name
                )}
              </div>
              <Permissions role={role} />

              {(editRole && currentRole === role._id) || role.name === '' ? (
                <div className="flex w-full flex-row justify-end gap-2">
                  <CustomButton
                    icon={<Tick size="18" />}
                    description="Save"
                    type="text"
                    size="small"
                    onClick={submitNewRole}
                  />
                  <CustomButton
                    icon={<CloseCircled size="18" />}
                    description="Cancel"
                    type="text"
                    size="small"
                    onClick={() => setEditRole(false)}
                  />
                </div>
              ) : (
                <div className="flex w-full flex-row justify-end gap-2">
                  <SectionMoreOptions
                    editRole={editRole}
                    setEditRole={setEditRole}
                    activeRole={role._id}
                    setCurrentRole={setCurrentRole}
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
