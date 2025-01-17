import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import Title from '@/common/components/Title';
import { dummyAvatarData } from '@/common/mockData';
import { MinuteData, iHandleClick, iHandleKeyboard } from '@/types';
import { generateInitials } from '@/common/utils';
import Folder from '@/common/components/icons/Folder';
import { CorrsInfoContext } from '../../correspondence/[correspondenceId]/service-context/DetailContextWrapper';

const CreateMeeting = dynamic(
  () => import('../../components/actions/CreateMeeting')
);
const CreateProject = dynamic(
  () => import('../../components/actions/CreateProject')
);
const NewMinute = dynamic(() => import('./NewMinute'));

interface Props {
  minute: MinuteData;
  type: 'queue' | 'ongoing';
}

const CorrespondenceCard = ({ minute, type }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `correspondence/${minute.correspondence.subject.replace(/ /g, '_')}?corrs=${minute.correspondence._id}&tab=minutes`
    );
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
            <CustomAvatar size={28}>
              {generateInitials(minute?.from?.firstname, '')}
            </CustomAvatar>
            <div className="flex-1">
              <Title>{minute?.from?.firstname}</Title>
              {/* <Title small className="text-xs">
                PS, Ministry of Trade & Investment
              </Title> */}
            </div>
          </div>
          <Title small className="font-medium">
            {minute?.minute}
          </Title>
          <div
            role="button"
            tabIndex={0}
            onClick={actionsMouseHandler}
            onKeyDown={actionsKeyboardHandler}
            className="flex items-center gap-1"
          >
            <Title small className="font-medium text-custom-gray_200">
              {dayjs(
                type === 'queue' ? minute.created_at : minute.updated_at
              ).format('h:mm A, D MMM YYYY')}
            </Title>
            <div className="flex items-center gap-x-1">
              <CustomAvatar size={28}>
                {generateInitials(
                  minute?.recipient?.firstname,
                  minute?.recipient?.surname
                )}
              </CustomAvatar>
              <AvatarGroup
                maxCount={minute.hasAccess.length}
                size={24}
                maxPopoverPlacement="bottom"
                avatarData={dummyAvatarData}
              />
            </div>
            <div className="invisible flex flex-1 items-center justify-end gap-x-1.5 group-hover:visible">
              <CreateMeeting />
              <CreateProject />
              <CorrsInfoContext.Provider value={{ ...minute }}>
                <NewMinute />
              </CorrsInfoContext.Provider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorrespondenceCard;
