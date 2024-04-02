import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import { Users } from '@/common/components/icons';
import React, { useState } from 'react';
import NewMeetingModalContent from '../NewMeetingModalContent';
import { iHandleClick } from '@/types';

function CreateMeeting() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal: iHandleClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCancel: iHandleClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };
  return (
    <>
      <CustomButton
        size="small"
        type="text"
        icon={<Users />}
        description="Create a meeting"
        onClick={showModal}
      />
      <CustomModal
        title="Meeting"
        width={400}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <NewMeetingModalContent />
      </CustomModal>
    </>
  );
}

export default CreateMeeting;
