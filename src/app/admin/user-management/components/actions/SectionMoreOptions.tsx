import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { MenuProps } from 'antd/es/menu';
import useRoles from '@/app/admin/hooks/useRoles';
import CustomButton from '@/common/components/CustomButton';
import MoreFile from '@/common/components/icons/MoreFile';
import { Role } from '../../types';

const Dropdown = dynamic(() => import('antd/es/dropdown/dropdown'));
const DeleteModal = dynamic(() => import('../modals/DeleteModal'));
const IsDeletedModal = dynamic(() => import('../modals/IsDeletedModal'));

const initialModalState = {
  delete: false,
  isDeleted: false,
};

interface SectionMoreProps {
  editedRole: Role;
  openEditMode: () => void;
}

function SectionMoreOptions({ editedRole, openEditMode }: SectionMoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const { deleteRoleSwr } = useRoles({
    can_delete_by_id: true,
    _id: editedRole._id,
  });
  const { trigger: deleteRoleTrigger, isMutating: deleteRoleIsMutating } =
    deleteRoleSwr;

  const deleteSpecificRole = async () => {
    deleteRoleTrigger({
      data: {},
      type: 'delete',
    }).then(() => {
      setIsModalOpen({
        ...initialModalState,
        isDeleted: true,
        delete: false,
      });
    });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit this role',
      onClick: openEditMode,
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
