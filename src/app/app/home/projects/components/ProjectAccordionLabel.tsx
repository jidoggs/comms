'use client';

import React from 'react';
import dayjs from 'dayjs';

import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import { Hierachy } from '@/common/components/icons';
import { AvatarData } from '@/common/components/Avatar/types';
import CustomProgress from '@/common/components/CustomProgress';

type ProjectAccordionLabelProps = {
  status?: string;
  title: string;
  dueDate: Date;
  totalTasks: number;
  assignees: AvatarData[];
};

const ProjectAccordionLabel = ({
  title,
  dueDate,
  assignees,
  totalTasks,
}: ProjectAccordionLabelProps) => {
  return (
    <div className="flex w-full justify-between font-semibold text-custom-gray_600">
      <div className="flex w-1/12 items-center gap-1">
        <input type="checkbox" />
        <Hierachy size={16} />
        <p>{totalTasks}</p>
      </div>
      <div className="flex w-7/12 items-center gap-1">
        <p>{title}</p>
      </div>
      <div className="flex w-4/12 gap-1">
        <div className="w-1/3">
          <CustomProgress percent={60} />
        </div>
        {/* <p
          className={`w-1/3 font-bold ${status.toLowerCase() === 'done' ? 'text-custom-green_100' : status.toLowerCase() === 'in progress' ? 'text-yellow-600' : 'text-custom-red_100'}`}
        >
          {status}
        </p> */}
        <div className="w-1/3">
          <AvatarGroup maxCount={3} avatarData={assignees} />
        </div>
        <p className="w-1/3">{dayjs(dueDate).format('DD MMM, YYYY')}</p>
      </div>
    </div>
  );
};

export default ProjectAccordionLabel;
