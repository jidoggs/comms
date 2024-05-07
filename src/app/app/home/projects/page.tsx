'use client';
import React from 'react';
import Accordion from './components/Accordion';
import ProjectTitle from './components/ProjectTitle';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import BackwardArrow from '@/common/components/icons/BackwardArrow';
import Plus from '@/common/components/icons/Plus';

const Projects = () => {
  return (
    <div>
      <div className="px-6">
        <CustomButton type="primary" icon={<BackwardArrow size={22} />} />
        <Title bold className="text-custom-gray_600">
          Tasks
        </Title>
      </div>
      <div className="flex w-full flex-col justify-center p-6 font-semibold">
        <ProjectTitle />
        <Accordion />
        <CustomButton type="primary" icon={<Plus />}>
          Add Task
        </CustomButton>
      </div>
    </div>
  );
};

export default Projects;
