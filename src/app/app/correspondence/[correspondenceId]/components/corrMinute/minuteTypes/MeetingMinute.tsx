'use client';
import React from 'react';
import ActivityInformation from '@/app/app/home/components/Activities/ActivityInformation';
import Title from '@/common/components/Title';
import CustomButton from '@/common/components/CustomButton';
import Edit2 from '@/common/components/icons/Edit2';
import Delete from '@/common/components/icons/Delete';
import Copy from '@/common/components/icons/Copy';
import Users from '@/common/components/icons/Users';


interface MinuteUserDetails {
  userDetails: {
    name: string;
    title: string;
    office: string;
  };
}

const Actions = () => {
  return (
    <div className="flex ">
      <CustomButton
        icon={<Edit2 />}
        description="Edit"
        type="text"
        size="small"
      />
      <CustomButton
        icon={<Delete />}
        description="Delete"
        type="text"
        size="small"
      />
      <CustomButton
        icon={<Copy />}
        description="Copy"
        type="text"
        size="small"
      />
    </div>
  );
};

//eslint-disable-next-line
const MeetingMinute = ({ userDetails }: MinuteUserDetails) => {
  // const [meetingCreator, setMeetingCreator] = useState(true);
  return (
    <section className="rounded border border-custom-gray_500 px-1">
      <header className="flex items-center gap-2 text-custom-black_300">
        <Title
          tag="h6"
          bold={false}
          className="flex items-center gap-x-2.5 leading-[20.24px]"
        >
          <span>
            <Users size={22} className="" />
          </span>
          <span>Export of Brewery Products Meeting</span>
        </Title>
        <Actions />
      </header>
      <ActivityInformation />
    </section>
  );
};

export default MeetingMinute;
