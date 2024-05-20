'use client';
import React, { useContext } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { AnimatePresence } from 'framer-motion';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import MinuteType from './MinuteType';
import SideMenu from '../SideMenu';
import Note from '../notes';
import { NoteContext } from '../../service-context/NotesContextWapper';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import MoreFile from '@/common/components/icons/MoreFile';
import { generateInitials, mergeClassName } from '@/common/utils';
import { dummyAvatarData } from '@/common/mockData';
import dayjs from 'dayjs';

type Props = {
  minuteId: string;
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

  // const formattedDate = '4:22pm, 16 Feb 2024';

  const customStyles: React.CSSProperties = {
    '--defaultNoteColor': noteContextInfo?.color,
  } as any;

  // console.log('minute', minute);
  const minuteFromMe = minute?.from?._id === detailContextInfo?.user._id;
  // console.log('minuteFromMe', minuteFromMe);

  return (
    <div
      className={mergeClassName('relative flex flex-col gap-y-1', className)}
      style={customStyles}
    >
      <div className="flex items-center gap-x-2.5">
        <div
          className={mergeClassName(
            'z-[2] flex w-full flex-col gap-y-1 rounded-xl bg-custom-white_100 p-0.5 shadow-wordBox md:w-100',
            minuteFromMe ? 'order-2 rounded-br-none' : 'order-1 rounded-bl-none'
          )}
        >
          <header className="flex items-center justify-between p-1 hover:rounded-t-xl hover:bg-custom-gray_100">
            <div className="flex items-center gap-x-1">
              {minute?.from?.image ? (
                <CustomAvatar
                  src={minute?.from?.image}
                  className="mr-2"
                  size="default"
                />
              ) : (
                <CustomAvatar style={{ backgroundColor: '#87d068' }}>
                  {generateInitials(
                    minute?.from?.firstname,
                    minute?.from?.surname
                  )}
                </CustomAvatar>
              )}
              <div className="flex flex-col">
                <Title bold={false}>{minute?.from?.firstname}</Title>
                {/* <Title small className="leading-[15.18px] text-gray-600">
                  {minute?.from?.title} - {minute?.from?.office}
                </Title> */}
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
            // userDetails={userDetails}
            // formattedDate={formattedDate}
          />

          <footer className="flex w-full items-center justify-between border-t border-custom-gray_500 px-1 pt-1">
            <Title className="text-custom-gray_600">
              {dayjs(minute.created_at).format('h:mma, DD MMM YYYY')}
            </Title>
            <div className="flex items-center gap-x-1">
              {minute?.recipient?.image ? (
                <CustomAvatar
                  src={minute?.recipient?.image}
                  className="mr-2"
                  size="default"
                />
              ) : (
                <CustomAvatar style={{ backgroundColor: '#87d068' }}>
                  {generateInitials(
                    minute?.recipient?.firstname,
                    minute?.recipient?.surname
                  )}
                </CustomAvatar>
              )}
              {/* <CustomAvatar src="/images/user1.jpeg" size={30} /> */}
              <AvatarGroup
                avatarData={dummyAvatarData}
                maxCount={minute?.hasAccess?.length}
                // maxCount={2}
              >
                {minute?.hasAccess?.map((access: any) => {
                  access?.image ? (
                    <CustomAvatar
                      src={access?.image}
                      className="mr-2"
                      size="default"
                    />
                  ) : (
                    <CustomAvatar style={{ backgroundColor: '#87d068' }}>
                      {generateInitials(access?.firstname)}
                    </CustomAvatar>
                  );
                })}
              </AvatarGroup>
            </div>
          </footer>
        </div>
        {detailContextInfo?.multiSelect.isMultiSelectMode ? (
          <Checkbox
            name={minute?.id}
            onChange={detailContextInfo.selectItemHandler}
          />
        ) : (
          <SideMenu
            className={mergeClassName(
              'invisible ease-in-out group-hover:visible',
              minuteFromMe ? 'order-1' : 'order-2'
            )}
            placement={minuteFromMe ? 'left' : 'right'}
          />
        )}
      </div>
      <AnimatePresence>
        {noteContextInfo?.showNote ? (
          <Note
            className={mergeClassName(minuteFromMe ? 'self-end' : 'self-start')}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default MinuteCard;
