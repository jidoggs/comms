'use client';
import React from 'react';

import Accordion from './components/Accordion';
import ProjectTitle from './components/ProjectTitle';
import { CustomButton } from '@/common/components';
import BackButton from '@/common/components/BackButton';
import { Plus } from '@/common/components/icons';

const Projects = () => {
  return (
    <div>
      <BackButton text="Loan Disbursement" />
      <div className="flex w-full flex-col justify-center p-6 font-semibold">
        <ProjectTitle />
        <Accordion />
        <CustomButton
          variant="contained"
          className="h-4 !w-32 !border-0 !bg-custom-white_100 !px-0 !text-sm !text-custom-gray_200"
        >
          <Plus /> <span className=" !text-custom-gray_200">Add Task</span>
        </CustomButton>
      </div>
    </div>
  );
};

export default Projects;
