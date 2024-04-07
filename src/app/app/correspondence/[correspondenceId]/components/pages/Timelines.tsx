import React from 'react';
import { Timeline } from 'antd';
import { correspondenceTimeline } from '@/common/mockData/corrTimeline';
import dayjs, { Dayjs } from 'dayjs';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import Title from '@/common/components/Title';
import { TimelineDot } from '@/common/components/icons';
// import CustomAvatar from '@/common/components/Avatar/CustomAvatar';

export const FormattedDate = ({ date }: { date: Dayjs }) => {
  return (
    <span className="date">{dayjs(date).format('DD MMM YYYY, h:mm A')}</span>
  );
};

const Timelines = () => {
  const now = dayjs();

  return (
    <div className="relative flex size-full flex-col items-center justify-center">
      <div className="flex size-full flex-wrap items-center justify-center overflow-y-auto">
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
                  dayjs(timeline.date).isBefore(now, 'week') && // Before current week
                  !dayjs(timeline.date).isSame(now, 'day') && // Not today
                  !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day') // Not yesterday
                );

              if (index === 3)
                return (
                  dayjs(timeline.date).isBefore(now, 'month') && // Before current month
                  !dayjs(timeline.date).isSame(now, 'day') && // Not today
                  !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day') && // Not yesterday
                  !dayjs(timeline.date).isSame(now.subtract(1, 'week'), 'week') // Not last week
                );
              // if (index === 2)
              //   return (
              //     dayjs(timeline.date).isBefore(now, 'week') &&
              //     !dayjs(timeline.date).isSame(now, 'day') &&
              //     !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day')
              //   );
              // if (index === 3)
              //   return (
              //     dayjs(timeline.date).isBefore(now, 'month') &&
              //     !dayjs(timeline.date).isSame(now, 'day') &&
              //     !dayjs(timeline.date).isSame(now.subtract(1, 'day'), 'day') &&
              //     !dayjs(timeline.date).isBefore(now, 'week')
              //   );
              return false;
            });

            return (
              <React.Fragment key={date.toString()}>
                {index === 0 ? (
                  <Timeline.Item dot={<Title tag="h5">Today</Title>}>
                    <div className="h-10" />
                  </Timeline.Item>
                ) : index === 1 ? (
                  <Timeline.Item dot={<Title tag="h5">Yesterday</Title>}>
                    <div className="h-10" />
                  </Timeline.Item>
                ) : index === 2 ? (
                  <Timeline.Item dot={<Title tag="h5">Last Week</Title>}>
                    <div className="h-10" />
                  </Timeline.Item>
                ) : (
                  <Timeline.Item dot={<Title tag="h5">Last Month</Title>}>
                    <div className="h-10" />
                  </Timeline.Item>
                )}
                {timelines.map((timeline, idx) => (
                  <Timeline.Item
                    key={idx}
                    dot={
                      idx === 0 && index === 0 ? (
                        // <CustomAvatar
                        //   src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        //   size="default"
                        //   className="rounded-full border border-custom-main"
                        // />
                        <div className="">
                          <TimelineComponent timeline={timeline} />
                        </div>
                      ) : (
                        <TimelineDot />
                      )
                    }
                  >
                    {idx === 0 && index === 0 ? (
                      <div className="h-10" />
                    ) : (
                      <TimelineComponent timeline={timeline} />
                    )}
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
