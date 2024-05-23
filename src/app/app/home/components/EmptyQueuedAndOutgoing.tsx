'use client';
import React, { ReactNode, Suspense, lazy, useRef } from 'react';
import { helveticaNeue } from '@/common/font';
import SectionHeaderCard from './SectionHeaderCard';
import Title from '@/common/components/Title';
import FolderOpen from '@/common/components/icons/FolderOpen';
import Briefcase from '@/common/components/icons/Briefcase';
import Users from '@/common/components/icons/Users';
import { useSession } from '@/common/hooks';
import MoreLoading from '@/common/components/icons/MoreLoading';

const CreateCorrespondence = lazy(
  () => import('../../components/actions/CreateCorrespondence')
);

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
  const user_is_approved = useSession().data.is_approved;

  const createNewCorrespondeceHandler = () => {
    createCorrRef.current?.click();
  };

  return (
    <div className="col-span-2 grid grid-cols-2 grid-rows-[max-content_1fr] gap-2.5">
      <SectionHeaderCard title="Queue" count={0} />
      <SectionHeaderCard title="Ongoing" count={0} />
      <div className="col-span-full flex h-full items-center justify-center rounded bg-custom-white_100 p-5">
        {user_is_approved ? (
          <div className="flex flex-col gap-y-5">
            <Title
              tag="h4"
              className={`text-center leading-6 ${helveticaNeue.className}`}
            >
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
              <Suspense fallback={null}>
                <CreateCorrespondence ref={createCorrRef} className="!hidden" />
              </Suspense>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-y-5">
            <div className="rounded-2xl bg-custom-purple_500 p-6">
              <MoreLoading size={38} />
            </div>
            <Title
              tag="h4"
              className={`text-center leading-6 ${helveticaNeue.className}`}
            >
              Your account is awaiting approval
            </Title>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmptyQueuedAndOutgoing;
