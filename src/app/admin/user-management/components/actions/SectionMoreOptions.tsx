import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
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
// import Title from '@/common/components/Title';

const initialModalState = {
  delete: false,
};

interface SectionMoreProps {
  editRole: boolean;
  setEditRole?: React.Dispatch<React.SetStateAction<boolean>>;
  activeRole: number;
  setCurrentRole?: React.Dispatch<React.SetStateAction<number>>;
}

function SectionMoreOptions({
  editRole,
  setEditRole,
  activeRole,
  setCurrentRole,
}: SectionMoreProps) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const handleRoleEdit = () => {
    setCurrentRole && setCurrentRole(activeRole);
    setEditRole && setEditRole(!editRole);
    // setIsModalOpen({ ...initialModalState });
  };

  const submitHandler = (value: any) => {
    console.log(value); //eslint-disable-line
  };

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

  // console.log('isModalOpen', isModalOpen);

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
      {/* <Title>Edit this role</Title> */}
      <DeleteModal
        handleCancel={handleCancel}
        handleSubmit={submitHandler}
        isModalOpen={isModalOpen.delete}
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
