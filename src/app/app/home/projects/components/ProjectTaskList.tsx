import React from 'react';

import TaskCard from './TaskCard';
import ProjectCardFooter from './ProjectCardFooter';
import { Assignee, Task } from '@/types/projects';

type ProjectTaskListProps = {
  tasks: Task[];
  assignees: Assignee[];
};

const ProjectTaskList = ({ tasks, assignees }: ProjectTaskListProps) => {
  return (
    <>
      {tasks.map((task, id) => (
        <React.Fragment key={id}>
          <TaskCard
            taskTitle={task?.title}
            taskStatus={task?.status}
            assignees={assignees}
          />
          <hr className="" />
        </React.Fragment>
      ))}
      <ProjectCardFooter />
    </>
  );
};

export default ProjectTaskList;
