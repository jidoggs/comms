import React, { useContext } from 'react';
import PermissionSection from './PermissionSection';
import { Skeleton } from 'antd';
import { UserMgmtDataContext } from '../service-context/UserMgmtContextWrapper';

interface Permission {
  _id: string;
  name: string;
  code: string;
}

type PermissionType = 'parastatal' | 'office' | 'department';

function categorizePermissions(
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
  role: any;
}

const Permissions = ({ role }: PermissionProps) => {
  const contextInfo = useContext(UserMgmtDataContext);
  if (!contextInfo) {
    // Handle the case where contextInfo is null
    return <Skeleton active />;
  }

  return (
    <div className="col-span-7 flex flex-col justify-between">
      {role.permissions && (
        <PermissionSection
          title="Parastatal"
          permissions={categorizePermissions(role.permissions, 'parastatal')}
          handleCancelPermission={(permission) =>
            contextInfo.handleCancelPermission(permission, 'parastatals')
          }
          handleAddPermission={(key) => contextInfo.handleAddPermission(key)}
          options={contextInfo.options}
          role={role}
        />
      )}

      {role.permissions && (
        <PermissionSection
          title="Offices"
          permissions={categorizePermissions(role.permissions, 'office')}
          handleCancelPermission={(permission) =>
            contextInfo.handleCancelPermission(permission, 'offices')
          }
          handleAddPermission={(key) => contextInfo.handleAddPermission(key)}
          options={contextInfo.options}
          role={role}
        />
      )}

      {role.permissions && (
        <PermissionSection
          title="Department"
          permissions={categorizePermissions(role.permissions, 'department')}
          handleCancelPermission={(permission) =>
            contextInfo.handleCancelPermission(permission, 'departments')
          }
          handleAddPermission={(key) => contextInfo.handleAddPermission(key)}
          options={contextInfo.options}
          role={role}
        />
      )}
    </div>
  );
};

export default Permissions;
