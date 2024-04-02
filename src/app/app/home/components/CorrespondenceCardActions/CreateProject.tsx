import CustomButton from '@/common/components/CustomButton';
import CustomModal from '@/common/components/CustomModal';
import React, { useState } from 'react';
import { ArrowRight, Briefcase } from '@/common/components/icons';
import Step1 from '../forms/CreateProject/Step1';
import Step2 from '../forms/CreateProject/Step2';
import { ProjectData } from '../forms/CreateProject/types';

function CreateProject() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stage, setStage] = useState(1);

  const resetStageHandler = () => {
    setStage(1);
  };

  const RenderTitle = () => {
    if (stage === 2) {
      return (
        <CustomButton
          type="text"
          onClick={resetStageHandler}
          icon={<ArrowRight className="rotate-180" />}
          size="small"
          className={{
            button: '!text-xl !font-bold !leading-6',
            container: 'justify-start',
          }}
        >
          Statuses
        </CustomButton>
      );
    }

    return <span>Project</span>;
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const submitHandler = (value: ProjectData) => {
    console.log(value); //eslint-disable-line
    if (stage === 1) {
      setStage(2);
    } else {
      handleClose();
    }
  };

  return (
    <>
      <CustomButton
        size="small"
        type="text"
        icon={<Briefcase />}
        description="Create a project"
        onClick={handleOpen}
      />
      <CustomModal
        title={<RenderTitle />}
        width={400}
        open={isModalOpen}
        onCancel={handleClose}
      >
        {stage === 1 ? (
          <Step1 onFinish={submitHandler} />
        ) : (
          <Step2 onFinish={submitHandler} />
        )}
      </CustomModal>
    </>
  );
}

export default CreateProject;
