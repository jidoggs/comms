import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import { Add } from '@/common/components/icons';
import React, { useState } from 'react';
import InviteForm from './Form';

function InvitePerson() {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  const onFinishHandler = (value: any) => {
    console.log(value); //eslint-disable-line
    closeModalHandler();
  };

  return (
    <>
      <CustomButton
        type="primary"
        size="small"
        icon={<Add />}
        description="Add"
        onClick={openModalHandler}
      >
        Add
      </CustomButton>
      <CustomModal
        width={600}
        title="Invite"
        open={isOpen}
        onCancel={closeModalHandler}
      >
        <InviteForm onFinish={onFinishHandler} />
      </CustomModal>
    </>
  );
}

export default InvitePerson;
