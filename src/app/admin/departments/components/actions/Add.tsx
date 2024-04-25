import React, { useState } from 'react';
import AddModal from '../modals/AddModal';
import CustomButton, {
  CustomButtonProps,
} from '@/common/components/CustomButton';
import { Building } from '@/common/components/icons';

function Add({ className }: CustomButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (value: any) => {
    console.log(value); //eslint-disable-line
  };

  return (
    <>
      <CustomButton
        size="small"
        type="text"
        icon={
          <Building
            size={18}
            className={typeof className === 'string' ? '' : className?.icon}
          />
        }
        onClick={showModal}
      >
        Add
      </CustomButton>
      <AddModal
        handleCancel={handleCancel}
        handleSubmit={submitHandler}
        isModalOpen={isModalOpen}
      />
    </>
  );
}

export default Add;
