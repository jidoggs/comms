import React, { useState } from 'react';
import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import NewMeetingForm from '../forms/CreateMeeting/Form';
import { Users } from '@/common/components/icons';
import { MeetingData } from '../forms/CreateMeeting/types';
import { CustomButtonProps } from '@/common/components/CustomButton/types';

function CreateMeeting({ descriptionPlacement, className }: CustomButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (value: MeetingData) => {
    console.log(value); //eslint-disable-line
  };

  return (
    <>
      <CustomButton
        size="small"
        type="text"
        icon={
          <Users
            className={typeof className === 'string' ? '' : className?.icon}
          />
        }
        description="Create a meeting"
        onClick={showModal}
        descriptionPlacement={descriptionPlacement}
      />
      <CustomModal width={500} open={isModalOpen} onCancel={handleCancel}>
        <NewMeetingForm onFinish={submitHandler} />
      </CustomModal>
    </>
  );
}

export default CreateMeeting;
