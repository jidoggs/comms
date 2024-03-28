'use client';
import SideMenu from '@/app/app/correspondence/[correspondenceId]/components/SideMenu';
import { MoreFile } from '@/common/components/icons';
import Title from '@/common/components/Title';
import { Avatar, Tooltip } from 'antd';
// import dayjs from 'dayjs';
import React from 'react';
import { initalMinuteState } from '../pages/Minutes';
import { StateDispatch } from '@/types';
import { generateRandomColor, useIntials } from '@/common/hooks/corrUtils';
import MinuteType from './MinuteType';
import { mergeClassName } from '@/common/utils';
// import { CorrespondenceMinute } from '@/common/mockData/correspondenceMinute';

type Props = {
  // name?: string;
  // image?: string;
  setCorrespondenceFile: StateDispatch<FileList | null>;
  setOpenCorrespondenceDetails: StateDispatch<boolean>;
  minuteId: number;
  chatState: typeof initalMinuteState;
  setChatState: StateDispatch<typeof initalMinuteState>;
  minute: any;
  className?: string;
};

const MinuteCard = ({
  // name,
  // image,
  className,
  setCorrespondenceFile,
  setOpenCorrespondenceDetails,
  minuteId,
  chatState,
  setChatState,
  minute,
}: Props) => {
  const fileSend = (event: any) => {
    const files = event.target.files;
    if (files) {
      // Check if any file is selected
      if (!files.length) {
        return; // Handle the case where no file is selected (optional)
      }

      setOpenCorrespondenceDetails(true);
      setCorrespondenceFile(files);
    }
  };

  const userDetails = minute.userDetails;
  const initials = useIntials(minute.userDetails.name);

  const formattedDate = '4:22pm, 16 Feb 2024';

  return (
    <div
      className={mergeClassName('flex flex-row items-center gap-3', className)}
      onMouseEnter={() => {
        setChatState({
          activeChatId: minuteId,
          activeChatOptions: true, // You might want to reset the flag here
        });
      }}
      onMouseLeave={() => {
        setChatState({
          activeChatId: 0,
          activeChatOptions: false, // You might want to reset the flag here
        });
      }}
    >
      <div
        // className=""
        className="shadow-minuteCard w-full rounded-xl bg-custom-white_100 pb-2 group-odd:order-1  group-odd:rounded-bl-none group-even:order-2 group-even:rounded-br-none md:w-[400px]"
      >
        <div className="flex flex-row items-center justify-between px-2">
          <div className="my-2 flex flex-row items-center gap-3">
            {userDetails.image ? (
              <Avatar src={userDetails.image} className="mr-2" size="default" />
            ) : (
              <Avatar style={{ backgroundColor: '#87d068' }}>{initials}</Avatar>
            )}
            <div className="flex flex-col">
              <Title type="h2" className="name circular">
                {userDetails.name}
              </Title>
              <Title
                type="h2"
                className="circular text-sm font-[450] leading-[15.18px] text-gray-600"
              >
                {userDetails.title} - {userDetails.office}
              </Title>
            </div>
          </div>
          <Tooltip placement="top" title={'Options'} className="cursor-pointer">
            <MoreFile />
          </Tooltip>
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
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              size="default"
              //   className="mr-2"
            />
            {/* <div className="flex flex-row"> */}
            <Avatar.Group
              maxCount={3}
              maxPopoverTrigger="click"
              size="default"
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                cursor: 'pointer',
              }}
            >
              {/* <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> */}
              <Avatar style={{ backgroundColor: generateRandomColor() }}>
                K
              </Avatar>

              <Avatar style={{ backgroundColor: generateRandomColor() }}>
                JS
              </Avatar>

              <Avatar style={{ backgroundColor: generateRandomColor() }}>
                OS
              </Avatar>
              <Avatar style={{ backgroundColor: generateRandomColor() }}>
                +10
              </Avatar>
            </Avatar.Group>
            {/* </div> */}
          </div>
        </div>
      </div>
      {chatState?.activeChatId === minuteId && (
        <div className="hidden group-odd:order-2 group-even:order-1 sm:inline-flex">
          <SideMenu />
        </div>
      )}
    </div>
  );
};

export default MinuteCard;
