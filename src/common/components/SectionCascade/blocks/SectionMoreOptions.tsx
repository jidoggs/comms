import React, { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import AddModal from '../../../../app/admin/departments/components/modals/AddModal';
import InvitePersonModal from '@/app/admin/people/components/InvitePerson/Modal';
import CustomButton from '@/common/components/CustomButton';
import {
  Building,
  InfoCircle,
  MoreFile,
  UserAdd,
} from '@/common/components/icons';
import { Mutate } from '@/types';

const initialModalState = {
  add: false,
  invite: false,
  details: false,
};

type Props = {
  addTrigger: Mutate;
  addIsLoading: boolean;
  inviteTrigger?: Mutate;
  inviteIsLoading?: boolean;
};

function SectionMoreOptions({ addIsLoading, addTrigger }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(initialModalState);

  const showModal = (val: keyof typeof initialModalState) => {
    setIsModalOpen({ ...initialModalState, [val]: true });
  };

  const handleClose = () => {
    setIsModalOpen({ ...initialModalState });
  };

  const addSubmitHandler = (data: any) => {
    addTrigger({ data, type: 'post' }).finally(handleClose);
  };

  //eslint-disable-next-line
  const inviteSubmitHandler = (values: any) => {
    // inviteTrigger(values).finally(handleClose);
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
          className="invisible group-hover/title:visible"
          size="small"
          type="text"
          icon={<MoreFile />}
        />
      </Dropdown>
      <AddModal
        handleCancel={handleClose}
        handleSubmit={addSubmitHandler}
        isModalOpen={isModalOpen.add}
        isLoading={addIsLoading}
      />
      <InvitePersonModal
        handleCancel={handleClose}
        handleSubmit={inviteSubmitHandler}
        isModalOpen={isModalOpen.invite}
        isLoading={false}
      />
    </>
  );
}

export default SectionMoreOptions;
