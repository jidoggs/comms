import dayjs from 'dayjs';
import React, { ReactNode, useContext } from 'react';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import Title from '@/common/components/Title';
// import { TimelineProps } from '@/common/mockData/corrTimeline';
import Folder from '@/common/components/icons/Folder';
import { DetailContext } from '../service-context/DetailContextWrapper';

type ItemProps = {
  title: string;
  detail: string | ReactNode;
};

const MinuteDetailItem = ({ title, detail }: ItemProps) => (
  <div className="flex items-start gap-x-2.5 border-b border-custom-gray_500 py-2.5">
    <Title className="w-2/6 text-custom-gray_850">{title}</Title>
    {typeof detail === 'string' ? (
      <Title bold className="w-4/6 text-custom-gray_700">
        {detail}
      </Title>
    ) : (
      detail
    )}
  </div>
);

// interface DetailsProps {
//   corrMinuteDetails: {
//     name: string;
//     from: string;
//     to: TimelineProps;
//     createdBy: TimelineProps;
//     dateCreated: string;
//   };
// }

const MinuteDetails = () => {
  const detailContext = useContext(DetailContext);
  const corrMinuteDetails = detailContext?.minutesThread?.[0].correspondence;

  return (
    <div className="flex size-full flex-col gap-y-2.5 bg-custom-white_100 p-5">
      <div className="self-start rounded-10 bg-custom-gray_100 p-8 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="flex flex-col gap-y-2.5">
        <MinuteDetailItem title="Name" detail={corrMinuteDetails?.subject} />
        <MinuteDetailItem title="From" detail={corrMinuteDetails?.sender} />
        <MinuteDetailItem
          title="To"
          detail={
            <TimelineComponent
              timeline={{ date: dayjs(new Date()), name: '', office: '' }}
              nogap
            />
          }
        />
        <MinuteDetailItem
          title="Created By"
          detail={
            <TimelineComponent
              timeline={{ date: dayjs(new Date()), name: '', office: '' }}
              nogap
            />
          }
        />
        <MinuteDetailItem title="Date of creation" detail={''} />
      </div>
    </div>
  );
};

export default MinuteDetails;
