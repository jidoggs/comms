'use client';
import React, { ReactNode, useRef } from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import Title from '@/common/components/Title';
import FolderOpen from '@/common/components/icons/FolderOpen';
import Briefcase from '@/common/components/icons/Briefcase';
import Users from '@/common/components/icons/Users';
import CreateCorrespondence from '../../components/actions/CreateCorrespondence';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  title: string;
}

const OnboardBtn = ({ icon, title, ...props }: Props) => {
  return (
    <div className="flex w-24 flex-col gap-y-1 ">
      <button
        {...props}
        className="flex items-center justify-center self-center rounded-[20px] bg-custom-gray_100 p-6 text-custom-main"
      >
        {icon}
      </button>
      <Title small className="text-wrap text-center text-custom-gray_200">
        {title}
      </Title>
    </div>
  );
};

function EmptyQueuedAndOutgoing() {
  const createCorrRef = useRef<HTMLButtonElement>(null);

  const createNewCorrespondeceHandler = () => {
    createCorrRef.current?.click();
  };

  return (
    <div className="col-span-2 grid grid-cols-2 grid-rows-[max-content_1fr] gap-2.5">
      <SectionHeaderCard title="Queue" count={0} />
      <SectionHeaderCard title="Ongoing" count={0} />
      <div className="col-span-full flex h-full items-center justify-center rounded bg-custom-white_100 p-5">
        <div className="flex flex-col gap-y-5">
          <Title tag="h4" className="text-center leading-6">
            Start something
          </Title>
          <div className="flex items-center gap-x-5">
            <OnboardBtn
              icon={<FolderOpen size={38} />}
              title="Create a correspondence"
              onClick={createNewCorrespondeceHandler}
            />
            <OnboardBtn
              icon={<Users size={38} />}
              title="Create an appointment"
            />
            <OnboardBtn
              icon={<Briefcase size={38} />}
              title="Create a project"
            />
            <CreateCorrespondence ref={createCorrRef} className="invisible" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyQueuedAndOutgoing;
