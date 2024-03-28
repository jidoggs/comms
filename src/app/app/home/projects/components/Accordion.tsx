'use client';

import React from 'react';
import { Collapse, Space } from 'antd';

import ProjectAccordionLabel from './ProjectAccordionLabel';
import ProjectTaskList from './ProjectTaskList';
import { dummyProjectData } from '@/common/mockData';

const Accordion: React.FC = () => (
  <Space direction="vertical" className="w-full">
    {dummyProjectData.map((project, id) => (
      <Collapse
        key={id}
        // expandIcon={() => null}
        className="w-full bg-custom-white_100"
        collapsible="header"
        defaultActiveKey={['1']}
        items={[
          {
            key: '1',
            label: (
              <ProjectAccordionLabel
                totalTasks={project?.tasks?.length as number}
                title={project?.title}
                status={project?.status}
                dueDate={project?.due_date}
                assignees={project?.assignees}
              />
            ),
            children: <ProjectTaskList tasks={project?.tasks} assignees={project.assignees} />,
            showArrow: false,
          },
        ]}
      />
    ))}
  </Space>
);

export default Accordion;
