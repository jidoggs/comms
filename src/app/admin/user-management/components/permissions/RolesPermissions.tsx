'use client';
import React from 'react';
import Title from '@/common/components/Title';
import RoleItem from './RoleItem';
import { Permission, Role } from '../../types';

interface RolesPermissionsProps {
  allRoles: Role[];
  setAllRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  allPermissions: Permission[];
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
      <div
        className="h-full max-h-[calc(100vh_-_13.225rem)] overflow-y-scroll"
        // ref={rolesWrapperRef}
      >
        {allRoles.map((role) => (
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
