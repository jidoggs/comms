import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import React, { useState } from 'react';
import NewProjectModalContent from '../NewProjectModalContent';
import { Briefcase } from '@/common/components/icons';
import { iHandleClick } from '@/types';

function CreateProject() {
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
        icon={<Briefcase />}
        description="Create a project"
        onClick={showModal}
      />
      <CustomModal
        title="Project"
        width={400}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <NewProjectModalContent />
      </CustomModal>
    </>
  );
}

export default CreateProject;
