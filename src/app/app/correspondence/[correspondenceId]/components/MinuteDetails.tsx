import { Folder } from '@/common/components/icons';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import Title from '@/common/components/Title';
import { TimelineProps } from '@/common/mockData/corrTimeline';
import React from 'react';

interface DetailsProps {
  corrMinuteDetails: {
    name: string;
    from: string;
    to: TimelineProps;
    createdBy: TimelineProps;
    dateCreated: string;
  };
}

const MinuteDetails = ({ corrMinuteDetails }: DetailsProps) => {
  return (
    <div className="flex size-full flex-col bg-custom-white_100 px-3 pt-4">
      <div className="mb-5 flex size-20 items-center justify-center rounded-lg bg-custom-gray_100 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="flex">
        <Title type="h6" className="w-2/6 font-450 text-custom-gray_850">
          Name
        </Title>
        <Title type="h6" className="w-4/6 font-bold text-custom-gray_700">
          {corrMinuteDetails.name}
        </Title>
      </div>
      <div className="my-2 h-px w-full bg-custom-gray_500" />
      <div className="mt-3 flex">
        <Title type="h6" className="w-2/6 font-450 text-custom-gray_850">
          From
        </Title>
        <Title type="h6" className="w-4/6 font-bold text-custom-gray_700">
          {corrMinuteDetails.from}
        </Title>
      </div>
      <div className="my-2 h-px w-full bg-custom-gray_500" />
      <div className="mt-3 flex">
        <Title type="h6" className="w-2/6 font-450 text-custom-gray_850">
          To
        </Title>
        <Title type="h6" className="w-4/6 font-bold text-custom-gray_700">
          <TimelineComponent timeline={corrMinuteDetails.to} />
        </Title>
      </div>
      <div className="my-2 h-px w-full bg-custom-gray_500" />
      <div className="mt-3 flex">
        <Title type="h6" className="w-2/6 font-450 text-custom-gray_850">
          Created By
        </Title>
        <Title type="h6" className="w-4/6 font-bold text-custom-gray_700">
          <TimelineComponent timeline={corrMinuteDetails.createdBy} />
        </Title>
      </div>
      <div className="my-2 h-px w-full bg-custom-gray_500" />
      <div className="mt-3 flex">
        <Title type="h6" className="w-2/6 font-450 text-custom-gray_850">
          Date of creation
        </Title>
        <Title type="h6" className="w-4/6 font-bold text-custom-gray_700">
          {corrMinuteDetails.dateCreated}
        </Title>
      </div>
      <div className="my-2 h-px w-full bg-custom-gray_500" />
    </div>
  );
};

export default MinuteDetails;
