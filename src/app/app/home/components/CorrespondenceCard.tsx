'use client';

import { Dropdown, Flex, MenuProps } from 'antd';
import { Briefcase, File, Send, Users } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import CreateCorrespondenceModal from './Modal';
import NewProjectModalContent from './NewProjectModalContent';
import NewMeetingModalContent from './NewMeetingModalContent';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import { dummyAvatarData } from '@/common/mockData';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';

const CorrespondenceCard = () => {
  const router = useRouter();
  // console.log("DADADAD")

  const handleClick = () => {
    router.push('correspondence/correspondenceId');
  };

  const handleKeyDown = () => {
    handleClick();
  };

  // TODO: TO BE MOVED TO HELPER FILE

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: (
        <Flex align="center" gap=".5rem">
          <span
            role="button"
            tabIndex={0}
            className=""
            onKeyDown={() => null}
            onClick={(e) => {
              e.stopPropagation();
              // console.log('A');
            }}
          >
            <CreateCorrespondenceModal
              Icon={<Users size="18" />}
              title="Meeting"
            >
              <NewMeetingModalContent />
            </CreateCorrespondenceModal>
          </span>
          <span
            role="button"
            tabIndex={0}
            className=""
            onKeyDown={() => null}
            onClick={(e) => {
              e.stopPropagation();
              // console.log('B');
            }}
          >
            <CreateCorrespondenceModal
              Icon={<Briefcase size="18" />}
              title="Project"
            >
              <NewProjectModalContent />
            </CreateCorrespondenceModal>
          </span>
          <span className="">
            <Send size="18" />
          </span>
        </Flex>
      ),
    },
  ];


  return (
    <div
      role="button"
      tabIndex={0}
      className="mt-2 flex w-full cursor-pointer gap-2 rounded-md bg-white p-2 text-gray-400 shadow-md"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="size-8 rounded-md bg-gray-100">
        <File />
      </div>
      <div className="w-5/6">
        <div className="flex gap-1 align-middle">
          <CustomAvatar firstName="Jane" lastName="Doe" />
          <div className="leading-3.2 text-xs">
            <p className="font-bold text-gray-500">Jane Doe</p>
            <p>Registry, Ministry of Trade & Investment</p>
          </div>
        </div>
        <div className="my-2 text-xs font-semibold">
          <p>
            Dear HM, I hope this message finds you well. Please find
            correspondence f ...
          </p>
        </div>
        <div className="mb-1 mt-2 flex items-center gap-1 text-xs font-semibold">
          <p>04:20 PM, 16 Feb 2024</p>
          <AvatarGroup maxCount={3} avatarData={dummyAvatarData} />
          <Dropdown
            menu={{ items }}
            placement="bottom"
            className="w-1/7 ml-10 flex h-auto justify-end"
          >
            <p className="opacity-0">Text</p>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceCard;
