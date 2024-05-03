'use client';
import Title from '@/common/components/Title';
import React from 'react';
import RoleItem from './RoleItem';
import { AllPermissionType, AllRoleType, RoleType } from '@/app/admin/types';

interface RolesPermissionsProps {
  allRoles: AllRoleType;
  setAllRoles: React.Dispatch<React.SetStateAction<AllRoleType>>;
  allPermissions: AllPermissionType;
}

const RolesPermissions = ({
  allRoles,
  setAllRoles,
  allPermissions,
}: RolesPermissionsProps) => {
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
        {allRoles.map((role: RoleType) => (
          <RoleItem
            role={role}
            key={role._id}
            allRoles={allRoles}
            setAllRoles={setAllRoles}
            allPermissions={allPermissions}
          />
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
