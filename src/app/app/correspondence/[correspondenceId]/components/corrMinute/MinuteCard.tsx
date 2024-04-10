'use client';
import React, { useContext } from 'react';
import MinuteType from './MinuteType';
import SideMenu from '../SideMenu';
import Note from '../notes';
import { NoteContext } from '../../service-context/NotesContextWapper';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import Title from '@/common/components/Title';
import { MoreFile } from '@/common/components/icons';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import CustomButton from '@/common/components/CustomButton';
import { dummyAvatarData } from '@/common/mockData';
import { generateInitials, mergeClassName } from '@/common/utils';
import { AnimatePresence } from 'framer-motion';

type Props = {
  minuteId: number;
  minute: any;
  className?: string;
};

const MinuteCard = ({ className, minute }: Props) => {
  const detailContextInfo = useContext(DetailContext);
  const noteContextInfo = useContext(NoteContext);
  const fileSend = (event: any) => {
    const files = event.target.files;
    detailContextInfo?.handleUpdateFile(files);
  };

  const userDetails = minute.userDetails;
  const initials = generateInitials(minute.userDetails.name);

  const formattedDate = '4:22pm, 16 Feb 2024';

  const customStyles: React.CSSProperties = {
    '--defaultNoteColor': noteContextInfo?.color,
  } as any;

  return (
    <div
      className={mergeClassName('relative flex flex-col gap-y-1', className)}
      style={customStyles}
    >
      <div className="flex items-center gap-x-2.5">
        <div
          className={mergeClassName(
            'z-[2] flex w-full flex-col gap-y-1 rounded-xl bg-custom-white_100 p-0.5 shadow-wordBox md:w-100',
            minute.messageFrom
              ? 'order-2 rounded-br-none'
              : 'order-1 rounded-bl-none'
          )}
        >
          <header className="flex items-center justify-between p-1 hover:bg-custom-gray_100 hover:rounded-t-xl">
            <div className="flex items-center gap-x-1">
              {userDetails.image ? (
                <CustomAvatar
                  src={userDetails.image}
                  className="mr-2"
                  size="default"
                />
              ) : (
                <CustomAvatar style={{ backgroundColor: '#87d068' }}>
                  {initials}
                </CustomAvatar>
              )}
              <div className="flex flex-col">
                <Title bold={false}>{userDetails.name}</Title>
                <Title small className="leading-[15.18px] text-gray-600">
                  {userDetails.title} - {userDetails.office}
                </Title>
              </div>
            </div>
            <CustomButton
              size="small"
              type="text"
              icon={<MoreFile size={18} />}
              description="Options"
            />
          </header>
          <MinuteType
            fileSend={fileSend}
            minute={minute}
            userDetails={userDetails}
            // formattedDate={formattedDate}
          />

          <footer className="flex w-full items-center justify-between border-t border-custom-gray_500 px-1 pt-1">
            <Title className="text-custom-gray_600">{formattedDate}</Title>
            <div className="flex items-center gap-x-1">
              <CustomAvatar src="/images/user1.jpeg" size={30} />
              <AvatarGroup avatarData={dummyAvatarData} maxCount={3} />
            </div>
          </footer>
        </div>
        <SideMenu
          className={mergeClassName(
            'invisible ease-in-out group-hover:visible',
            minute.messageFrom ? 'order-1' : 'order-2'
          )}
          placement={minute.messageFrom ? 'left' : 'right'}
        />
      </div>
      <AnimatePresence>
        {noteContextInfo?.showNote ? (
          <Note
            className={mergeClassName(
              minute.messageFrom ? 'self-end' : 'self-start'
            )}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default MinuteCard;
