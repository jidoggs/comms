import React, { useState } from 'react';
import InvitePersonModal from './Modal';
import CustomButton from '@/common/components/CustomButton';
import { Add } from '@/common/components/icons';

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
      <InvitePersonModal
        handleCancel={closeModalHandler}
        handleSubmit={onFinishHandler}
        isModalOpen={isOpen}
      />
    </>
  );
}

export default InvitePerson;
