import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import CustomAvatar from '../Avatar/CustomAvatar';
import Title from '../Title';
import { generateInitials, mergeClassName } from '@/common/utils';

interface TimelineProps {
  timeline: {
    name: string;
    office: string;
    date: Dayjs;
    img?: string;
  };
  nogap?: boolean;
}

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const TimelineComponent = ({ timeline, nogap }: TimelineProps) => {
  // console.log('timeline.date', timeline.date);

  return (
    <div className="flex items-center justify-start gap-3">
      <CustomAvatar
        size="default"
        className="rounded-full border border-custom-main"
        src={timeline.img}
      >
        {generateInitials(`${timeline.name}`)}
      </CustomAvatar>
      <div className={mergeClassName('flex flex-col items-start', nogap ? '' : 'gap-y-1')}>
        <Title semibold>{timeline.name}</Title>
        <Title className="leading-[15.18px] text-custom-gray_600">
          <span className="office">{timeline.office} </span>-
          <span className="date">
            <FormattedDate date={timeline.date} />
          </span>
        </Title>
      </div>
    </div>
  );
};

export default TimelineComponent;
