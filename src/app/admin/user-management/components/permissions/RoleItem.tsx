import React, { useEffect, useState } from 'react';
import Permissions from './Permissions';
import CustomInput from '@/common/components/CustomInput';
import SectionMoreOptions from '../actions/SectionMoreOptions';
import CustomButton from '@/common/components/CustomButton';
import { ArrowUp, CloseCircled } from '@/common/components/icons';
import Title from '@/common/components/Title';
import Tick from '@/common/components/icons/Tick';
import {
  AllPermissionType,
  AllRoleType,
  PermissionType,
  RoleType,
} from '@/app/admin/types';
import { useRoles } from '@/app/admin/hooks';
import { message } from 'antd';
import { uniqueId } from '../../types';
import ApproveModal from '../modals/ApproveModal';

interface RoleItemProps {
  role: RoleType;
  allRoles: AllRoleType;
  setAllRoles: React.Dispatch<React.SetStateAction<AllRoleType>>;
  allPermissions: AllPermissionType;
  ref: React.RefObject<HTMLDivElement> | null;
  firstRoleRef: React.RefObject<HTMLDivElement>;
}

const RoleItem = ({
  role,
  allRoles,
  setAllRoles,
  allPermissions,
  firstRoleRef,
}: RoleItemProps) => {
  const [editedRole, setEditedRole] = useState<RoleType>(role);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEditedRole(role);
  }, [allRoles]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRole({ ...editedRole, name: e.target.value });
  };

  const toggleEditMode = () => {
    if (editedRole._id === uniqueId) {
      setIsEditMode(false);
      setAllRoles((prevRoles: AllRoleType) =>
        prevRoles.filter((role: RoleType) => role._id !== uniqueId)
      );
    } else {
      setEditedRole(role);
      setIsEditMode(!isEditMode);
      if (!isEditMode) {
        setEditedRole(role);
        setAllRoles((prevRoles: AllRoleType) =>
          prevRoles.map((prevRole: RoleType) =>
            prevRole._id === role._id ? editedRole : prevRole
          )
        );
      }
    }
    if (role._id === uniqueId && !isEditMode) {
      const newAllRoles = allRoles.filter(
        (role: RoleType) => role._id !== uniqueId
      );
      allRoles = newAllRoles;
    }
  };

  const { createRoleSwr } = useRoles({
    create_role: true,
  });
  const { updateRoleSwr } = useRoles({
    update_role: true,
  });

  const { trigger: createRoleTrigger, isMutating: createRoleIsMutating } =
    createRoleSwr;
  const { trigger: updateRoleTrigger, isMutating: updateRoleIsMutating } =
    updateRoleSwr;

  const updateExitingRole = (currentUpdatedRole: RoleType) => {
    const permissions = currentUpdatedRole.permissions.map(
      (permission: PermissionType) => permission._id
    );
    const name = currentUpdatedRole.name;
    updateRoleTrigger({
      data: { name, permissions, _id: editedRole._id },
      type: 'patch',
    }).then((res) => {
      message.success(res.message);
      setIsModalOpen(false);
      toggleEditMode();
    });
  };

  const createNewRole = (newRole: RoleType) => {
    const permissions = newRole.permissions.map(
      (permission: PermissionType) => permission._id
    );
    const name = newRole.name;
    createRoleTrigger({
      data: { name: name, permissions: permissions },
      type: 'post',
    }).then(() => {
      message.success('Role created successfully');
      setIsModalOpen(false);
      toggleEditMode();
    });
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

  const handleAddPermission = (permission: PermissionType) => {
    const permissionExists = editedRole.permissions.some(
      (perm: PermissionType) => perm._id === permission._id
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
      ref={firstRoleRef}
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
        // allRoles={allRoles}
        allPermissions={allPermissions}
        // currentPermissions={editedRole.permissions}
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
            modalMutating={createRoleIsMutating || updateRoleIsMutating}
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
