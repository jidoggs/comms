'use client';

import { Flex, MenuProps } from 'antd';
import { Briefcase, Send, Users, Folder } from '@/common/components/icons';
import { useRouter } from 'next/navigation';
import CreateCorrespondenceModal from './Modal';
import NewProjectModalContent from './NewProjectModalContent';
import NewMeetingModalContent from './NewMeetingModalContent';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import { dummyAvatarData } from '@/common/mockData';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import CustomButton from '@/common/components/CustomButton';

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
  //eslint-disable-next-line
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
      className="shadow-wordBox group flex w-full cursor-pointer gap-2 rounded-md bg-white p-2.5 text-custom-gray_600"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="rounded-10 self-start bg-custom-gray_100 p-2.5 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-1 align-middle">
          <CustomAvatar firstName="Jane" lastName="Doe" />
          <div className="">
            <p className="text-sm font-bold leading-4 text-custom-main">
              Jane Doe
            </p>
            <p className="text-xs">PS, Ministry of Trade & Investment</p>
          </div>
        </div>
        <div className="text-xs font-medium">
          <p>
            Dear HM, I hope this message finds you well. Please find
            correspondence f ...
          </p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-xs font-medium text-custom-gray_200">
            4:20 PM, 16 Feb 2024
          </p>
          <AvatarGroup maxCount={3} avatarData={dummyAvatarData} />
          <div className="invisible flex flex-1 items-center justify-end group-hover:visible">
            <CustomButton size="small" type="text" icon={<Users />} />
            <CustomButton size="small" type="text" icon={<Briefcase />} />
            <CustomButton size="small" type="text" icon={<Send />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceCard;
