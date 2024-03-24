import React from 'react';
import dayjs from 'dayjs';

import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import { File } from '@/common/components/icons';
import { Assignee } from '@/types/projects';

type TaskCardProps = {
  taskTitle: string;
  taskStatus: string;
  assignees: Assignee[];
};

const TaskCard = ({ taskTitle, taskStatus, assignees }: TaskCardProps) => {
  return (
    <div className="flex w-full justify-between py-1 text-custom-gray_400 hover:bg-custom-gray_100">
      <div className="flex w-1/12 items-center gap-1">
        <input type="checkbox" />
        <File />
        {/* <p>5</p> */}
      </div>
      <p className="w-7/12">{taskTitle}</p>
      <div className="flex w-4/12 gap-1">
        <p
          className={`w-1/3 ${taskStatus.toLowerCase() === 'done' ? 'text-custom-green_100' : taskStatus.toLowerCase() === 'in progress' ? 'text-yellow-600' : 'text-custom-red_100'}`}
        >
          {taskStatus}
        </p>
        <div className="w-1/3">
          <AvatarGroup maxCount={3} avatarData={assignees} />
        </div>
        <p className="w-1/3">{dayjs().format('DD MMM, YYYY')}</p>
      </div>
    </div>
  );
};

export default TaskCard;
