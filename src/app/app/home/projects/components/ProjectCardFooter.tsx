import { CustomButton } from '@/common/components';
import { Plus } from '@/common/components/icons';
import React from 'react';

const ProjectCardFooter = () => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-1/12 items-center gap-1">
        <Plus />
      </div>
      <div className="w-7/12">
        <CustomButton
          variant="noStyleButton"
          className="h-2 !border-2 !px-2 text-sm !text-custom-gray_400 hover:bg-custom-gray_100"
        >
          Add Subtask
        </CustomButton>
      </div>
      <div className="flex w-4/12 gap-1"></div>
    </div>
  );
};

export default ProjectCardFooter;
