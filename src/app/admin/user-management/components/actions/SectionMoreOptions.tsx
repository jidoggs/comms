/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Dropdown, MenuProps, message } from 'antd';
// import AddModal from '../modals/AddModal';
// import InvitePersonModal from '@/app/admin/people/components/InvitePerson/Modal';
// import CustomButton from '@/common/components/CustomButton';
import {
  // Building,
  // InfoCircle,
  MoreFile,
  // UserAdd,
} from '@/common/components/icons';
import CustomButton from '@/common/components/CustomButton';
import DeleteModal from '../modals/DeleteModal';
import IsDeletedModal from '../modals/IsDeletedModal';
import useRoles from '@/app/admin/hooks/useRoles';
import { uniqueId } from '../../types';
import { AllRoleType, RoleType } from '@/app/admin/types';
// import Title from '@/common/components/Title';

const initialModalState = {
  delete: false,
  isDeleted: false,
};

interface SectionMoreProps {
  editedRole: RoleType;
  allRoles: AllRoleType;
  setAllRoles: React.Dispatch<React.SetStateAction<AllRoleType>>;
  toggleEditMode: () => void;
}

function SectionMoreOptions({
  editedRole,
  allRoles,
  setAllRoles,
  toggleEditMode,
}: SectionMoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const { deleteRoleSwr } = useRoles({
    delete_specific_role: true,
    _id: editedRole._id,
  });
  const { trigger: deleteRoleTrigger, isMutating: deleteRoleIsMutating } =
    deleteRoleSwr;

  const deleteSpecificRole = () => {
    if (editedRole._id === uniqueId) {
      const newRoles = allRoles.filter(
        (r: RoleType) => r._id !== editedRole._id
      );
      setAllRoles(newRoles);
      // message.success('New Role deleted successfully');
      setIsModalOpen({ ...initialModalState, isDeleted: true, delete: false });
      return;
    } else {
      deleteRoleTrigger({
        data: {},
        type: 'delete',
      }).then((res) => {
        message.success('Role deleted successfully');
        setIsModalOpen({
          ...initialModalState,
          isDeleted: true,
          delete: false,
        });
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit this role',
      onClick: toggleEditMode,
    },
    {
      key: '2',
      label: 'Delete this role',
      onClick: () => showModal('delete'),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
        <CustomButton
          className="group-hover/title:visible"
          size="small"
          type="text"
          icon={<MoreFile />}
        />
      </Dropdown>
      <DeleteModal
        handleCancel={handleCancel}
        handleSubmit={deleteSpecificRole}
        isModalOpen={isModalOpen.delete}
        deleteRoleIsMutating={deleteRoleIsMutating}
      />
      <IsDeletedModal
        handleCancel={handleCancel}
        isModalOpen={isModalOpen.isDeleted}
      />
    </>
  );
}

export default SectionMoreOptions;
