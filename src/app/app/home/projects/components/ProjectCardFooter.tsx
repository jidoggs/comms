import CustomButton from '@/common/components/CustomButton';
import { Plus } from '@/common/components/icons';
import React from 'react';

const ProjectCardFooter = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-1/12 items-center gap-1">
        <Plus />
      </div>
      <div className="w-7/12">
        <CustomButton type="text">Add Subtask</CustomButton>
      </div>
      <div className="flex w-4/12 gap-1"></div>
    </div>
  );
};

export default ProjectCardFooter;
