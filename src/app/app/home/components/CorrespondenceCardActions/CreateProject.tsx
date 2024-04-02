import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import React, { useState } from 'react';
import NewProjectModalContent from '../NewProjectModalContent';
import { Briefcase } from '@/common/components/icons';

function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
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
