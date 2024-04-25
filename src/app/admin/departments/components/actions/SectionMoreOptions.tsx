import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import AddModal from '../modals/AddModal';
import InvitePersonModal from '@/app/admin/people/components/InvitePerson/Modal';
import CustomButton from '@/common/components/CustomButton';
import {
  Building,
  InfoCircle,
  MoreFile,
  UserAdd,
} from '@/common/components/icons';

const initialModalState = {
  add: false,
  invite: false,
  details: false,
};

function SectionMoreOptions() {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleCancel = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const submitHandler = (value: any) => {
    console.log(value); //eslint-disable-line
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: (
        <span className="">
          <Building size="18" />
        </span>
      ),
      label: 'Add',
      onClick: () => showModal('add'),
    },
    {
      key: '2',
      icon: (
        <span className="">
          <UserAdd size="18" />
        </span>
      ),
      label: 'Add person(s)',
      onClick: () => showModal('invite'),
    },
    {
      key: '3',
      icon: (
        <span className="">
          <InfoCircle size="18" />
        </span>
      ),
      label: 'View details',
      className: 'border-t !rounded-t-none',
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" className="flex h-auto">
        <CustomButton
          className="group-hover/title:visible invisible"
          size="small"
          type="text"
          icon={<MoreFile />}
        />
      </Dropdown>
      <AddModal
        handleCancel={handleCancel}
        handleSubmit={submitHandler}
        isModalOpen={isModalOpen.add}
      />
      <InvitePersonModal
        handleCancel={handleCancel}
        handleSubmit={submitHandler}
        isModalOpen={isModalOpen.invite}
      />
    </>
  );
}

export default SectionMoreOptions;
