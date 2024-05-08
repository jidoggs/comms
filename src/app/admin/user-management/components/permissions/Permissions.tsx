import React, { useContext } from 'react';
import PermissionSection from './PermissionSection';
import { categorizeOptions, categorizePermissions } from '../utils/utilFunc';
import { Role, Permission } from '../../types';
import { UserMgmtDataContext } from '../../service-context/UserMgmtContextWrapper';

export interface PermissionProps {
  // allPermissions: Permission[];
  editedRole: Role;
  isEditMode: boolean;
  handleAddPermission: (permission: Permission) => void;
  handleCancelPermission: (permission: any) => void;
}

const Permissions = ({
  // allPermissions,
  editedRole,
  isEditMode,
  handleAddPermission,
  handleCancelPermission,
}: PermissionProps) => {
  const contextInfo = useContext(UserMgmtDataContext);
  return (
    <div className="col-span-7 flex flex-col justify-between">
      <PermissionSection
        title="Parastatal"
        permissions={categorizePermissions(
          editedRole.permissions,
          'parastatal'
        )}
        options={categorizeOptions(
          contextInfo?.permissionsData || [],
          'parastatal'
        )}
        editedRole={editedRole}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />

      <PermissionSection
        title="Offices"
        permissions={categorizePermissions(editedRole?.permissions, 'office')}
        options={categorizeOptions(
          contextInfo?.permissionsData || [],
          'office'
        )}
        editedRole={editedRole}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />

      <PermissionSection
        title="Department"
        permissions={categorizePermissions(
          editedRole.permissions,
          'department'
        )}
        options={categorizeOptions(
          contextInfo?.permissionsData || [],
          'department'
        )}
        editedRole={editedRole}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />

      <PermissionSection
        title="Invite"
        permissions={categorizePermissions(editedRole?.permissions, 'invite')}
        options={categorizeOptions(
          contextInfo?.permissionsData || [],
          'invite'
        )}
        editedRole={editedRole}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />

      <PermissionSection
        title="Role"
        permissions={categorizePermissions(editedRole.permissions, 'role')}
        options={categorizeOptions(contextInfo?.permissionsData || [], 'role')}
        editedRole={editedRole}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />
    </div>
  );
};

export default Permissions;
