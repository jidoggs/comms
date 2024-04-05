import React from 'react';
import { Avatar, Timeline } from 'antd';
import { TimelineDot } from '@/common/components/icons';
// import Title from '@/common/components/Title';
// import { useIntials } from '@/common/hooks/corrUtils';
import { correspondenceTimeline } from '@/common/mockData/corrTimeline';
import dayjs, { Dayjs } from 'dayjs';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
// import Title from '@/common/components/Title';

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const Timelines = () => {
  const now = dayjs();
  // const yesterday = now.subtract(1, 'day');
  // const lastWeek = now.subtract(1, 'week');
  // const lastMonth = now.subtract(1, 'month');

  // const generateInitials = (name: string) =>
  //   name
  //     .split(' ')
  //     .slice(0, 2)
  //     .map((n) => <h1 key={n}>{n[0].toUpperCase()}</h1>);

  // const generateInitials = (name: string) =>
  //   name
  //     .split(' ')
  //     .map((name) => name[0].toUpperCase())
  //     .join('');

  // console.log('correspondenceTimeline', correspondenceTimeline);

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div className="mt-6 flex size-full flex-wrap items-center justify-center overflow-y-auto">
        <Timeline className="!mt-5">
          {[
            now,
            now.subtract(1, 'day'),
            now.subtract(1, 'week'),
            now.subtract(1, 'month'),
          ].map((date, index) => {
            const timelines = correspondenceTimeline.filter((timeline) => {
              if (index === 0) return dayjs(timeline.date).isSame(date, 'day');
              if (index === 1)
                return (
                  dayjs(timeline.date).isSame(date, 'day') &&
                  !dayjs(timeline.date).isSame(now, 'day')
                );
              if (index === 2)
                return (
                  dayjs(timeline.date).isBefore(now, 'week') &&
                  !dayjs(timeline.date).isSame(now, 'day') &&
                  !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day')
                );
              if (index === 3)
                return (
                  dayjs(timeline.date).isBefore(now, 'month') &&
                  !dayjs(timeline.date).isSame(now, 'day') &&
                  !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day') &&
                  !dayjs(timeline.date).isBefore(now, 'week')
                );
              return false;
            });

            return (
              <React.Fragment key={date.toString()}>
                <div className="text-xs font-medium text-custom-gray_400">
                  {index === 0
                    ? 'Today'
                    : index === 1
                      ? 'Yesterday'
                      : index === 2
                        ? 'Last Week'
                        : 'Last Month'}
                </div>
                <div className="h-10"></div>
                {timelines.map((timeline, idx) => (
                  <Timeline.Item
                    key={idx}
                    dot={
                      idx === 0 && index === 0 ? (
                        <TimelineDot />
                      ) : (
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          size="default"
                          className="rounded-full border border-custom-main"
                        />
                      )
                    }
                  >
                    <TimelineComponent timeline={timeline} />
                  </Timeline.Item>
                ))}
              </React.Fragment>
            );
          })}
        </Timeline>
      </div>
    </div>
  );
};
export default Timelines;
