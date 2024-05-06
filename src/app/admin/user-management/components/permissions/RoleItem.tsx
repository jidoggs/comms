import React, { useEffect, useRef, useState } from 'react';
import message from 'antd/es/message';
import { useRoles } from '@/app/admin/hooks';
import Permissions from './Permissions';
import SectionMoreOptions from '../actions/SectionMoreOptions';
import ApproveModal from '../modals/ApproveModal';
import Title from '@/common/components/Title';
import CustomInput from '@/common/components/CustomInput';
import CustomButton from '@/common/components/CustomButton';
import { ArrowUp, CloseCircled, Tick } from '@/common/components/icons';
import { Role, uniqueId, Permission } from '../../types';

interface RoleItemProps {
  role: Role;
  allRoles: Role[];
  setAllRoles: React.Dispatch<React.SetStateAction<Role[]>>;
  allPermissions: Permission[];
  // ref: React.RefObject<HTMLDivElement> | null;
  // firstRoleRef: React.RefObject<HTMLDivElement>;
}

const RoleItem = ({
  role,
  allRoles,
  setAllRoles,
  allPermissions,
}: RoleItemProps) => {
  const [editedRole, setEditedRole] = useState<Role>(role);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstRoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditedRole(role);
  }, [allRoles.length, setEditedRole]); //eslint-disable-line

  useEffect(() => {
    if (firstRoleRef.current) {
      firstRoleRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      return;
    }
  }, [firstRoleRef.current]); //eslint-disable-line

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRole({ ...editedRole, name: e.target.value });
  };

  const toggleEditMode = () => {
    if (editedRole._id === uniqueId) {
      setIsEditMode(false);
      setAllRoles((prevRoles) =>
        prevRoles.filter((role) => role._id !== uniqueId)
      );
    } else {
      setEditedRole(role);
      setIsEditMode(!isEditMode);
      if (!isEditMode) {
        setEditedRole(role);
        setAllRoles((prevRoles) =>
          prevRoles.map((prevRole) =>
            prevRole._id === role._id ? editedRole : prevRole
          )
        );
      }
    }
    if (role._id === uniqueId && !isEditMode) {
      const newAllRoles = allRoles.filter((role) => role._id !== uniqueId);
      allRoles = newAllRoles;
    }
  };

  const { createRoleSwr, updateRoleSwr } = useRoles({
    can_create: true,
    can_update_by_id: true,
  });

  const onFinishedRequest = () => {
    setIsModalOpen(false);
    toggleEditMode();
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

  const submitRoleHandler = ({ _id }: any) => {
    if (_id === uniqueId) {
      if (editedRole.name !== '') {
        createNewRole(editedRole);
      } else {
        message.error('The new role has no name');
      }
    } else {
      updateExitingRole(editedRole);
    }
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
      className="mt-2 grid grid-cols-10 items-start bg-custom-white_100 p-4"
      ref={role._id === uniqueId ? firstRoleRef : null}
    >
      {isEditMode || editedRole._id === uniqueId ? (
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

      <Permissions
        editedRole={editedRole}
        allPermissions={allPermissions}
        isEditMode={isEditMode}
        handleAddPermission={handleAddPermission}
        handleCancelPermission={handleCancelPermission}
      />
      {isEditMode || editedRole._id === uniqueId ? (
        <div className="flex w-full flex-row justify-end gap-2">
          <CustomButton
            icon={<Tick size="18" />}
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
            onClick={toggleEditMode}
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
            allRoles={allRoles}
            setAllRoles={setAllRoles}
            toggleEditMode={toggleEditMode}
          />
          <CustomButton
            icon={<ArrowUp />}
            description="Collapse"
            type="text"
            size="small"
          />
        </div>
      )}
    </div>
  );
};

export default RoleItem;
