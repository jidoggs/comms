import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRoles } from '@/app/admin/hooks';
import Title from '@/common/components/Title';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import TickCircle from '@/common/components/icons/TickCircle';
import CloseCircled from '@/common/components/icons/CloseCircled';
import ArrowUp from '@/common/components/icons/ArrowUp';
import { Role, Permission } from '../../types';
import { messageHandler } from '@/common/utils/notification';
import { mergeClassName } from '@/common/utils';

const Permissions = dynamic(() => import('./Permissions'));
const SectionMoreOptions = dynamic(
  () => import('../actions/SectionMoreOptions')
);
const ApproveModal = dynamic(() => import('../modals/ApproveModal'));

interface RoleItemProps {
  role: Role;
}

const RoleItem = ({ role }: RoleItemProps) => {
  const [editedRole, setEditedRole] = useState<Role>(role);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setEditedRole(role);
  }, [role]); //eslint-disable-line

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRole({ ...editedRole, name: e.target.value });
  };

  const closeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const openEditMode = () => {
    if (editedRole._id === '') {
      setIsEditMode(false);
    } else {
      setEditedRole(role);
      setIsEditMode(!isEditMode);
      if (!isEditMode) {
        setEditedRole(role);
      }
    }
  };

  const { createRoleSwr, updateRoleSwr } = useRoles({
    can_create: true,
    can_update_by_id: true,
  });

  const onFinishedRequest = () => {
    setIsModalOpen(false);
    closeEditMode();
  };

  const updateExitingRole = (updatingRole: Role) => {
    const permissions = updatingRole.permissions.map(
      (permission: Permission) => permission._id
    );
    const data = { name: updatingRole.name, permissions, _id: editedRole._id };

    updateRoleSwr.trigger({ data, type: 'put' }).finally(onFinishedRequest);
  };

  const createNewRole = (newRole: Role) => {
    const permissions = newRole.permissions.map((permission) => permission._id);
    const data = { name: newRole.name, permissions: permissions };
    createRoleSwr.trigger({ data, type: 'post' }).finally(onFinishedRequest);
  };

  const submitRoleHandler = async ({ _id }: any) => {
    if (_id !== '') {
      return updateExitingRole(editedRole);
    }
    if (!editedRole.name) {
      return messageHandler('error', 'The new role has no name');
    }
    createNewRole(editedRole);
  };

  const handleAddPermission = (permission: Permission) => {
    const permissionExists = editedRole.permissions.some(
      (perm) => perm._id === permission._id
    );
    if (!permissionExists) {
      const newPermissions = [...editedRole.permissions, permission];
      setEditedRole({ ...editedRole, permissions: newPermissions });
    }
  };

  const handleCancelPermission = (permissionName: string) => {
    const updatedPermissions = editedRole.permissions.filter(
      (permission) => permission.name !== permissionName
    );
    setEditedRole({ ...editedRole, permissions: updatedPermissions });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleApproveSubmit = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className={mergeClassName(
        'mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4 transition-all',
        isCollapsed ? 'collapsed' : 'expanded'
      )}
    >
      {isEditMode || editedRole._id === '' ? (
        <div className="col-span-2 pr-4">
          <CustomInput
            className="w-1/2 !px-2"
            size="small"
            onChange={handleNameChange}
            defaultValue={editedRole.name}
          />
        </div>
      ) : (
        <Title className="col-span-2 pr-4">{editedRole.name}</Title>
      )}

      {isCollapsed ? (
        <div className="col-span-7 flex flex-col justify-between">
          <Title>Permissions for {editedRole.name}</Title>
        </div>
      ) : (
        <div className="role-item-content col-span-7 flex w-full flex-col justify-between">
          <Permissions
            editedRole={editedRole}
            isEditMode={isEditMode}
            handleAddPermission={handleAddPermission}
            handleCancelPermission={handleCancelPermission}
          />
        </div>
      )}
      {isEditMode || editedRole._id === '' ? (
        <div className="flex w-full flex-row justify-end gap-2">
          <CustomButton
            icon={<TickCircle size="18" />}
            description="Save"
            type="text"
            size="middle"
            className="!border-2 !border-custom-gray_400 !px-6 !text-custom-green_100"
            onClick={handleApproveSubmit}
          />
          <CustomButton
            icon={<CloseCircled size="18" />}
            description="Cancel"
            type="text"
            size="middle"
            className="!border-2 !border-custom-gray_400 !text-custom-red_100"
            onClick={closeEditMode}
          />
          <ApproveModal
            handleCancel={handleCancel}
            modalMutating={createRoleSwr.isMutating || updateRoleSwr.isMutating}
            handleSubmit={() => submitRoleHandler({ _id: editedRole._id })}
            isModalOpen={isModalOpen}
          />
        </div>
      ) : (
        <div className="flex w-full flex-row justify-end gap-2">
          <SectionMoreOptions
            editedRole={editedRole}
            openEditMode={openEditMode}
          />
          <CustomButton
            icon={
              <ArrowUp
                className={mergeClassName(
                  isCollapsed ? 'rotate-180' : '',
                  'transition-all'
                )}
              />
            }
            description={isCollapsed ? 'Expand' : 'Collapse'}
            type="text"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      )}
    </div>
  );
};

export default RoleItem;
