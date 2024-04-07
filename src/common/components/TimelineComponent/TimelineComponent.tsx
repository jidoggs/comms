import { generateInitials } from '@/common/utils';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import CustomAvatar from '../Avatar/CustomAvatar';
import Title from '../Title';

interface TimelineProps {
  timeline: {
    name: string;
    office: string;
    date: Dayjs;
    img?: string;
  };
}

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const TimelineComponent = ({ timeline }: TimelineProps) => {
  // console.log('timeline.date', timeline.date);

  return (
    <div>
      <div className="flex flex-row items-center justify-start gap-3">
        <CustomAvatar
          size="default"
          className="rounded-full border border-custom-main"
          src={timeline.img}
        >
          {generateInitials(`${timeline.name}`)}
        </CustomAvatar>
        <div className="flex flex-col gap-2">
          <Title semibold>{timeline.name}</Title>
          <Title className="leading-[15.18px] text-custom-gray_600">
            <span className="office">{timeline.office} </span>-
            <span className="date">
              {' '}
              <FormattedDate date={timeline.date} />
            </span>
          </Title>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
