import { useRouter } from 'next/navigation';
import CreateMeeting from '../../components/actions/CreateMeeting';
import CreateProject from '../../components/actions/CreateProject';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import CustomButton from '@/common/components/CustomButton';
import Title from '@/common/components/Title';
import { dummyAvatarData } from '@/common/mockData';
import { iHandleClick, iHandleKeyboard } from '@/types';
import { generateInitials } from '@/common/utils';
import Folder from '@/common/components/icons/Folder';
import Send from '@/common/components/icons/Send';

interface Props {
  minute: any;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const CorrespondenceCard = ({ minute }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('correspondence/export_of_brewery_products');
    // router.push(`correspondence/${correspondence.minute}`);
    router.push(`correspondence/${minute.correspondence?._id}`);
  };
  const handleKeyDown: iHandleKeyboard = (e) => {
    if (e.key === 'Tab') return;
    handleClick();
  };

  const actionsMouseHandler: iHandleClick = (e) => {
    e.stopPropagation();
  };
  const actionsKeyboardHandler: iHandleKeyboard = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="group flex w-full cursor-pointer gap-2 rounded-md bg-white p-2.5 text-custom-gray_600 shadow-wordBox"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="self-start rounded-10 bg-custom-gray_100 p-2.5 text-custom-main">
          <Folder size={18} />
        </div>
        <div className="space-y-2.5">
          <div className="flex items-center gap-x-2.5">
            <CustomAvatar src="/images/user3.jpeg" size={28}>
              {generateInitials('Jane', 'Doe')}
            </CustomAvatar>
            <div className="flex-1">
              <Title>Jane Doe</Title>
              <Title small className="text-xs">
                PS, Ministry of Trade & Investment
              </Title>
            </div>
          </div>
          <Title small className="font-medium">
            Dear HM, I hope this message finds you well. Please find
            correspondence f ...
          </Title>
          <div
            role="button"
            tabIndex={0}
            onClick={actionsMouseHandler}
            onKeyDown={actionsKeyboardHandler}
            className="flex items-center gap-1"
          >
            <Title small className="font-medium text-custom-gray_200">
              4:20 PM, 16 Feb 2024
            </Title>
            <div className="flex items-center gap-x-1">
              <CustomAvatar
                className="size-7"
                size={28}
                src="/images/user1.jpeg"
              />
              <AvatarGroup
                maxCount={3}
                size={24}
                maxPopoverPlacement="bottom"
                avatarData={dummyAvatarData}
              />
            </div>
            <div className="invisible flex flex-1 items-center justify-end gap-x-1.5 group-hover:visible">
              <CreateMeeting />
              <CreateProject />
              <CustomButton
                size="small"
                type="text"
                icon={<Send />}
                description="Push"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorrespondenceCard;
