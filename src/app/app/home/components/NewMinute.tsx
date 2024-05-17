'use client';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import Send from '@/common/components/icons/Send';
import React, { useState } from 'react';
import ExpandedMinuteForm from '../../correspondence/[correspondenceId]/components/corrMinute/ExpandedMinuteForm';

const NewMinute = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <CustomButton
        size="small"
        type="text"
        icon={<Send />}
        description="Push"
        onClick={openModalHandler}
        />
      <CustomModal
        title="Edit correspondence"
        open={openModal}
        onCancel={closeModalHandler}
        width={800}
        >
        <Form
          currentCorr={context?.data}
          form={form}
          handleSubmit={correspondenceFormSubmitHandler}
          />
      </CustomModal> */}
      <CustomButton
        size="small"
        description="Push"
        type="primary"
        icon={<Send size={18} />}
        onClick={showModal}
      />
      <CustomModal width={500} open={isModalOpen} onCancel={handleCancel}>
        <ExpandedMinuteForm />
      </CustomModal>
    </>
  );
};

export default NewMinute;
