import React, { useContext } from 'react';
import { Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';
import PermissionSection from './PermissionSection';

interface Permission {
  _id: string;
  name: string;
  code: string;
}

type PermissionType = 'parastatal' | 'office' | 'department';

export function categorizePermissions(
  permissions: Permission[],
  permissionType: PermissionType
): string[] {
  const validTypes: string[] = [];

  switch (permissionType) {
    case 'parastatal':
      validTypes.push(
        'parastatal',
        'parastatals',
        'role',
        'roles',
        'invite',
        'invites'
      );
      break;
    case 'office':
      validTypes.push('office', 'offices');
      break;
    case 'department':
      validTypes.push('department', 'departments');
      break;
    default:
      break;
  }

  return permissions
    .filter((permission) =>
      validTypes.some((type) =>
        permission.name.toUpperCase().endsWith(type.toUpperCase())
      )
    )
    .map((permission) => permission.name.replace(/_/g, ' ')); // Replace underscore with space
}

interface PermissionProps {
  currentRoleId: any;
  allRoles: any;
  setAllRoles: React.Dispatch<any>;
  allPermissions: any;
  role: any;
  options: any;
}

const Permissions = ({
  currentRoleId,
  allRoles,
  setAllRoles,
  allPermissions,
  role,
  options,
}: PermissionProps) => {
  const contextInfo = useContext(UserMgmtDataContext);
  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  return (
    <div className="col-span-7 flex flex-col justify-between">
      {role.permissions && (
        <PermissionSection
          currentRole={currentRoleId}
          allRoles={allRoles}
          setAllRoles={setAllRoles}
          allPermissions={allPermissions}
          title="Parastatal"
          permissions={categorizePermissions(role.permissions, 'parastatal')}
          options={options}
          selectedRole={role}
        />
      )}

      {role.permissions && (
        <PermissionSection
          currentRole={currentRoleId}
          allRoles={allRoles}
          setAllRoles={setAllRoles}
          allPermissions={allPermissions}
          title="Offices"
          permissions={categorizePermissions(role.permissions, 'office')}
          options={options}
          selectedRole={role}
        />
      )}

      {role.permissions && (
        <PermissionSection
          currentRole={currentRoleId}
          allRoles={allRoles}
          setAllRoles={setAllRoles}
          allPermissions={allPermissions}
          title="Department"
          permissions={categorizePermissions(role.permissions, 'department')}
          options={options}
          selectedRole={role}
        />
      )}
    </div>
  );
};

export default Permissions;
