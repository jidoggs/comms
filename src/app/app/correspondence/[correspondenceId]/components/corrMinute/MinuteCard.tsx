'use client';
import React, { useContext } from 'react';
import SideMenu from '@/app/app/correspondence/[correspondenceId]/components/SideMenu';
import { MoreFile } from '@/common/components/icons';
import Title from '@/common/components/Title';
import MinuteType from './MinuteType';
import { generateInitials, mergeClassName } from '@/common/utils';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import { dummyAvatarData } from '@/common/mockData';
import CustomButton from '@/common/components/CustomButton';
import { DetailContext } from '../../PageContent';
import { NoteContext } from '../notes/NotesContext';
import Note from '../notes';

type Props = {
  minuteId: number;
  minute: any;
  className?: string;
};

const MinuteCard = ({ className, minuteId, minute }: Props) => {
  const detailContextInfo = useContext(DetailContext);
  const noteContextInfo = useContext(NoteContext);
  const fileSend = (event: any) => {
    const files = event.target.files;
    detailContextInfo?.handleUpdateFile(files);
  };

  const userDetails = minute.userDetails;
  const initials = generateInitials(minute.userDetails.name);

  const formattedDate = '4:22pm, 16 Feb 2024';

  return (
    <div
      className={mergeClassName(
        'relative flex flex-row items-center gap-3',
        className
      )}
    >
      <div className="w-full rounded-xl bg-custom-white_100 pb-2 shadow-wordBox group-odd:order-1  group-odd:rounded-bl-none group-even:order-2 group-even:rounded-br-none md:w-100">
        <div className="flex flex-row items-center justify-between px-2">
          <div className="my-2 flex flex-row items-center gap-3">
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
              <Title type="h2" className="name circular text-sm font-450">
                {userDetails.name}
              </Title>
              <Title
                type="h2"
                className="circular text-xs font-450 leading-[15.18px] text-gray-600"
              >
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
        </div>
        <MinuteType
          fileSend={fileSend}
          minute={minute}
          // formattedDate={formattedDate}
        />
        <div className="my-2 h-px w-full bg-custom-gray_500" />
        <div className="flex w-full flex-row items-center justify-between px-2">
          <Title
            type="p"
            className="text-sm leading-[17.71px] text-custom-gray_600"
          >
            {formattedDate}
          </Title>
          <div className="flex flex-row gap-2">
            <CustomAvatar src="/images/user1.jpeg" size={30} />
            <AvatarGroup avatarData={dummyAvatarData} maxCount={3} />
          </div>
        </div>
      </div>
      <SideMenu
        className="invisible ease-in-out group-odd:order-2 group-even:order-1 group-hover:visible"
        placement={minuteId % 2 ? 'right' : 'left'}
      />
      {noteContextInfo?.showNote ? (
        <Note className="absolute top-[calc(100%_+_7px)] group-even:right-0" />
      ) : null}
    </div>
  );
};

export default MinuteCard;
