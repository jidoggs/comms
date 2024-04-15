import React from 'react';

const ProjectTitle = () => {
  return (
    <div className="mb-1 flex w-full justify-between px-4 text-base font-semibold">
      <div className="flex w-1/12 items-center gap-1">
        <input type="checkbox" />
      </div>
      <div className="flex w-7/12 items-center gap-1">
        <p>Name</p>
      </div>
      <div className="flex w-4/12 gap-1">
        <p className="w-1/3">Status</p>
        <p className="w-1/3">Assignees</p>
        <p className="w-1/3">Due Date</p>
      </div>
    </div>
  );
};

export default ProjectTitle;
