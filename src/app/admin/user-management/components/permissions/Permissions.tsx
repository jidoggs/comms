import React from 'react';
import PermissionSection from './PermissionSection';
import { categorizeOptions, categorizePermissions } from '../utils/utilFunc';
import { Role, Permission } from '../../types';

export interface PermissionProps {
  allPermissions: Permission[];
  editedRole: Role;
  isEditMode: boolean;
  handleAddPermission: (permission: Permission) => void;
  handleCancelPermission: (permission: any) => void;
}

const Permissions = ({
  allPermissions,
  editedRole,
  isEditMode,
  handleAddPermission,
  handleCancelPermission,
}: PermissionProps) => {
  return (
    <div className="col-span-7 flex flex-col justify-between">
      {editedRole.permissions && (
        <PermissionSection
          title="Parastatal"
          permissions={categorizePermissions(
            editedRole.permissions,
            'parastatal'
          )}
          options={categorizeOptions(allPermissions, 'parastatal')}
          editedRole={editedRole}
          isEditMode={isEditMode}
          handleAddPermission={handleAddPermission}
          handleCancelPermission={handleCancelPermission}
        />
      )}

      {editedRole.permissions && (
        <PermissionSection
          title="Offices"
          permissions={categorizePermissions(editedRole.permissions, 'office')}
          options={categorizeOptions(allPermissions, 'office')}
          editedRole={editedRole}
          isEditMode={isEditMode}
          handleAddPermission={handleAddPermission}
          handleCancelPermission={handleCancelPermission}
        />
      )}

      {editedRole.permissions && (
        <PermissionSection
          title="Department"
          permissions={categorizePermissions(
            editedRole.permissions,
            'department'
          )}
          options={categorizeOptions(allPermissions, 'department')}
          editedRole={editedRole}
          isEditMode={isEditMode}
          handleAddPermission={handleAddPermission}
          handleCancelPermission={handleCancelPermission}
        />
      )}

      {editedRole.permissions && (
        <PermissionSection
          title="Invite"
          permissions={categorizePermissions(editedRole.permissions, 'invite')}
          options={categorizeOptions(allPermissions, 'invite')}
          editedRole={editedRole}
          isEditMode={isEditMode}
          handleAddPermission={handleAddPermission}
          handleCancelPermission={handleCancelPermission}
        />
      )}

      {editedRole.permissions && (
        <PermissionSection
          title="Role"
          permissions={categorizePermissions(editedRole.permissions, 'role')}
          options={categorizeOptions(allPermissions, 'role')}
          editedRole={editedRole}
          isEditMode={isEditMode}
          handleAddPermission={handleAddPermission}
          handleCancelPermission={handleCancelPermission}
        />
      )}
    </div>
  );
};

export default Permissions;
