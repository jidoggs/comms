'use client';
import AvatarGroup from '@/common/components/Avatar/AvatarGroup';
import CustomAvatar from '@/common/components/Avatar/CustomAvatar';
import CustomButton from '@/common/components/CustomButton';
import {
  Copy,
  Delete,
  Edit,
  Location,
  NotificationBell,
  StickyNote,
  Users,
} from '@/common/components/icons';
import Title from '@/common/components/Title';
import { dummyAvatarData } from '@/common/mockData';
import { generateInitials } from '@/common/utils';
import Link from 'next/link';
import React from 'react';

interface MinuteUserDetails {
  userDetails: {
    name: string;
    title: string;
    office: string;
  };
}

const MeetingMinute = ({ userDetails }: MinuteUserDetails) => {
  // const [meetingCreator, setMeetingCreator] = useState(true);

  return (
    <div className="w-full flex-col items-center justify-end rounded-md border border-custom-gray_500 p-1">
      <div className="flex flex-col gap-4 p-1">
        <div className="flex flex-row items-center gap-2 text-custom-black_300">
          <Users size={22} className="w-1/12" />
          <Title tag="h5" className="w-11/12 leading-[20.24px]">
            Export of Brewery Products Meeting
          </Title>
          {/* {meetingCreator && ( */}
          <div className="flex flex-row gap-1">
            <CustomButton
              description="Correspondence"
              type="text"
              size="small"
              icon={<Edit size={18} />}
              // onClick={detailsData?.openDetailsHandler}
            />
            <CustomButton
              description="Correspondence"
              type="text"
              size="small"
              icon={<Delete size={18} />}
              // onClick={detailsData?.openDetailsHandler}
            />
            <CustomButton
              description="Correspondence"
              type="text"
              size="small"
              icon={<Copy size={18} />}
              // onClick={detailsData?.openDetailsHandler}
            />
          </div>
          {/* )} */}
        </div>
        <Title tag="h6" className="w-full leading-[17.71px]">
          Friday, 16 February 2024 . 12:30pm - 1:30pm
        </Title>
        <div className="flex flex-row items-center gap-2 text-custom-black_300">
          <NotificationBell size={22} className="w-1/12" />
          <Title tag="h6" className="w-11/12 leading-[17.71px] ">
            30 minutes before
          </Title>
        </div>
        <div className="flex flex-row items-center gap-2 text-custom-black_300">
          <Location size={22} className="w-1/12" />
          <Link
            href={'https://meet.google.com/qrm-smti-liv'}
            target="_blank"
            className="w-11/12"
          >
            <Title tag="h6" className="leading-[17.71px]">
              https://meet.google.com/qrm-smti-liv
            </Title>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-2 text-custom-black_300">
          <div className="flex w-1/12 items-center justify-center">
            <CustomAvatar size={'small'} style={{ backgroundColor: '#87d068' }}>
              {generateInitials(`${userDetails.name}`)}
            </CustomAvatar>
          </div>
          <AvatarGroup
            size={'small'}
            avatarData={dummyAvatarData}
            maxCount={3}
            className="w-11/12"
          />
        </div>
        <div className="flex flex-row items-start justify-center gap-2 text-custom-black_300">
          <StickyNote size={22} className="w-1/12" />
          <Title tag="h6" className="w-11/12 leading-[17.71px]">
            Kindly provide advise on the Nigerian Breweries correspondence. Also
            find attached additional information to help with your findings.
            <br />
            <br />
            Regards
          </Title>
        </div>
        <div className="h-px w-full bg-custom-gray_500" />
        <div className="flex flex-row items-center gap-2 text-custom-black_300">
          <div className="flex w-1/12 items-center justify-center">
            <CustomAvatar size={'small'} style={{ backgroundColor: '#87d068' }}>
              {generateInitials(`${userDetails.name}`)}
            </CustomAvatar>
          </div>
          <Link
            href={'https://meet.google.com/qrm-smti-liv'}
            target="_blank"
            className="w-11/12"
          >
            <Title tag="h6" className="circular font-450 leading-[17.71px]">
              {userDetails.name}
            </Title>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingMinute;
