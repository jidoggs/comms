import { generateInitials } from '@/common/utils';
import { Avatar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface TimelineProps {
  timeline: {
    name: string;
    office: string;
    date: Dayjs;
  };
}

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const TimelineComponent = ({ timeline }: TimelineProps) => {
  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-3">
        <Avatar
          size="default"
          className="rounded-full border border-custom-main"
        >
          {generateInitials(`${timeline.name}`)}
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="circular text-sm font-medium leading-[17.71px] text-custom-main">
            {timeline.name}
          </div>
          <p className="circular text-sm font-450 leading-[15.18px] text-custom-gray_600">
            <span className="office">{timeline.office} </span>-
            <span className="date">
              {' '}
              <FormattedDate date={timeline.date} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
