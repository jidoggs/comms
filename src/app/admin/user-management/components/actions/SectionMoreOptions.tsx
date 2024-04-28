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
// import Title from '@/common/components/Title';

const initialModalState = {
  delete: false,
  isDeleted: false,
};

interface SectionMoreProps {
  editRole: boolean;
  setEditRole?: React.Dispatch<React.SetStateAction<boolean>>;
  role: any;
  currentRoleId: string;
  setCurrentRoleId?: React.Dispatch<React.SetStateAction<string>>;
  setEditedRole: any;
}

function SectionMoreOptions({
  editRole,
  setEditRole,
  role,
  currentRoleId,
  setCurrentRoleId,
  setEditedRole,
}: SectionMoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const { deleteRoleSwr } = useRoles({
    delete_specific_role: true,
    _id: currentRoleId,
  });
  const { trigger: deleteRoleTrigger, isMutating: deleteRoleIsMutating } =
    deleteRoleSwr;

  // const handleCancelIsDeleted = () => {
  //   setIsModalOpen({ ...initialModalState });
  // };

  // console.log('currentRole', currentRole);
  // console.log('role', role);
  // console.log('currentRoleId', currentRoleId);

  const handleRoleEdit = () => {
    setCurrentRoleId && setCurrentRoleId(role._id);
    setEditedRole({ _id: role._id });
    setEditRole && setEditRole(!editRole);
    // setIsModalOpen({ ...initialModalState });
  };

  const deleteSpecificRole = () => {
    // console.log('delete role called');

    deleteRoleTrigger({
      data: {},
      type: 'delete',
    }).then((res) => {
      message.success(res.data);
      setIsModalOpen({ ...initialModalState, isDeleted: true, delete: false });
    });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  // const deleteHandler = () => {
  //   deleteSpecificRole();
  //   setIsModalOpen({ ...initialModalState });
  //   // console.log(value); //eslint-disable-line
  // };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Edit this role',
      onClick: () => handleRoleEdit(),
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
          onClick={() =>
            setCurrentRoleId && setCurrentRoleId(role._id as string)
          }
          onMouseEnter={() =>
            setCurrentRoleId && setCurrentRoleId(role._id as string)
          }
        />
      </Dropdown>
      {/* <Title>Edit this role</Title> */}
      <DeleteModal
        handleCancel={handleCancel}
        handleSubmit={deleteSpecificRole}
        isModalOpen={isModalOpen.delete}
      />
      <IsDeletedModal
        handleCancel={handleCancel}
        isModalOpen={isModalOpen.isDeleted}
      />
      {/* <InvitePersonModal
        handleCancel={handleCancel}
        handleSubmit={submitHandler}
        isModalOpen={isModalOpen.invite}
      /> */}
    </>
  );
}

export default SectionMoreOptions;