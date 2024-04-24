import React, { useState } from 'react';
import AddForm from '../forms/Add/Form';
import CustomModal from '@/common/components/CustomModal';
import Title from '@/common/components/Title';
import { Building, Link } from '@/common/components/icons';
import CustomButton, {
  CustomButtonProps,
} from '@/common/components/CustomButton';

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
      <CustomModal
        width={500}
        title={
          <div className="flex items-center justify-between">
            <Title tag="h2">Add</Title>
            <div className="flex items-center gap-x-2">
              <span className="text-custom-purple_100">
                <Link size={20} />
              </span>
              <Title tag="span" className="text-custom-purple_100">
                copy link
              </Title>
            </div>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <AddForm onFinish={submitHandler} />
      </CustomModal>
    </>
  );
}

export default Add;
