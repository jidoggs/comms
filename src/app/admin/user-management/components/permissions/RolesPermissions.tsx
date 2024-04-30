'use client';
import Title from '@/common/components/Title';
import React, { useEffect, useRef } from 'react';
import RoleItem from './RoleItem';
import { AllPermissionType, AllRoleType, RoleType } from '@/app/admin/types';
import { uniqueId } from '../../types';

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
  const firstRoleRef = useRef<HTMLDivElement>(null); // Reference to the first role with role._id === 1

  useEffect(() => {
    // Scroll to the top if the first role's reference is available
    if (firstRoleRef.current) {
      firstRoleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstRoleRef.current]);

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
        {allRoles.map((role: RoleType, index: number) => (
          <RoleItem
            role={role}
            key={role._id}
            allRoles={allRoles}
            setAllRoles={setAllRoles}
            allPermissions={allPermissions}
            firstRoleRef={firstRoleRef}
            ref={index === 0 && role._id === uniqueId ? firstRoleRef : null} // Set ref to the first role with role._id === 1
          />
        ))}
      </div>
    </div>
  );
};

export default RolesPermissions;
