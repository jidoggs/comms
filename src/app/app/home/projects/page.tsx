'use client';
import React from 'react';

import Accordion from './components/Accordion';
import ProjectTitle from './components/ProjectTitle';
import { CustomButton } from '@/common/components';
import { Plus } from '@/common/components/icons';

const Projects = () => {
  return (
    <div className="flex w-full flex-col justify-center p-6 font-semibold">
      <ProjectTitle />
      <Accordion />
      <CustomButton
        variant="contained"
        className="h-4 !w-28 !border-0 !bg-custom-white_100 !px-2 !text-sm !text-custom-gray_200"
      >
        <Plus /> Add Task
      </CustomButton>
    </div>
  );
};

export default Projects;
