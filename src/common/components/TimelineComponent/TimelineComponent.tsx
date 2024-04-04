import { generateInitials } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import CustomAvatar from '../Avatar/CustomAvatar';

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
        <CustomAvatar
          size="default"
          className="rounded-full border border-custom-main"
        >
          {generateInitials(`${timeline.name}`)}
        </CustomAvatar>
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
