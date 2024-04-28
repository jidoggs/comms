import React from 'react';
import PermissionSection from './PermissionSection';

interface Permission {
  _id: string;
  name: string;
  code: string;
}

type PermissionType =
  | 'parastatal'
  | 'office'
  | 'department'
  | 'invite'
  | 'role';

export function categorizePermissions(
  permissions: Permission[],
  permissionType: PermissionType
): string[] {
  const validTypes: string[] = [];

  switch (permissionType) {
    case 'parastatal':
      validTypes.push('parastatal', 'parastatals');
      break;
    case 'office':
      validTypes.push('office', 'offices');
      break;
    case 'department':
      validTypes.push('department', 'departments');
      break;
    case 'invite':
      validTypes.push('invite', 'invites');
      break;
    case 'role':
      validTypes.push('role', 'roles');
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
    .map((permission) => permission.name);
}

interface PermissionProps {
  currentRoleId: any;
  allRoles: any;
  setAllRoles: React.Dispatch<any>;
  allPermissions: any;
  role: any;
  editRole: any;
}

const Permissions = ({
  currentRoleId,
  allRoles,
  setAllRoles,
  allPermissions,
  role,
  editRole,
}: PermissionProps) => {
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
          selectedRole={role}
          editRole={editRole}
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
          // options={options}
          selectedRole={role}
          editRole={editRole}
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
          // options={options}
          selectedRole={role}
          editRole={editRole}
        />
      )}

      {role.permissions && (
        <PermissionSection
          currentRole={currentRoleId}
          allRoles={allRoles}
          setAllRoles={setAllRoles}
          allPermissions={allPermissions}
          title="Invite"
          permissions={categorizePermissions(role.permissions, 'invite')}
          // options={options}
          selectedRole={role}
          editRole={editRole}
        />
      )}

      {role.permissions && (
        <PermissionSection
          currentRole={currentRoleId}
          allRoles={allRoles}
          setAllRoles={setAllRoles}
          allPermissions={allPermissions}
          title="Role"
          permissions={categorizePermissions(role.permissions, 'role')}
          // options={options}
          selectedRole={role}
          editRole={editRole}
        />
      )}
    </div>
  );
};

export default Permissions;
