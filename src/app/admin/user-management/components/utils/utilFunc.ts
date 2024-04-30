export interface Permission {
  _id: string;
  name: string;
  code: string;
}

export interface Option {
  _id: string;
  name: string;
  code: string;
}

export type PermissionType =
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
    ?.filter((permission) =>
      validTypes?.some((type) =>
        permission?.name?.toUpperCase().endsWith(type?.toUpperCase())
      )
    )
    .map((permission) => permission.name);
}

export function categorizeOptions(
  permissions: Permission[],
  permissionType: PermissionType
): Option[] {
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
    .map((permission) => {
      return {
        _id: permission._id,
        name: permission.name,
        code: permission.code,
      };
    });
}
