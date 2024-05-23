import React, { ReactNode } from 'react';
import TimelineComponent from '@/common/components/TimelineComponent/TimelineComponent';
import Title from '@/common/components/Title';
import { TimelineProps } from '@/common/mockData/corrTimeline';
import Folder from '@/common/components/icons/Folder';
// import { CorrAppContext } from '@/app/app/service-context/AppContextWrapper';

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
  // const appContextData = useContext(CorrAppContext);
  // console.log('appContextData', appContextData);

  return (
    <div className="flex size-full flex-col gap-y-2.5 bg-custom-white_100 p-5">
      <div className="self-start rounded-10 bg-custom-gray_100 p-8 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="flex flex-col gap-y-2.5">
        <MinuteDetailItem title="Name" detail={corrMinuteDetails.name} />
        <MinuteDetailItem title="From" detail={corrMinuteDetails.from} />
        <MinuteDetailItem
          title="To"
          detail={<TimelineComponent timeline={corrMinuteDetails.to} nogap />}
        />
        <MinuteDetailItem
          title="Created By"
          detail={
            <TimelineComponent timeline={corrMinuteDetails.createdBy} nogap />
          }
        />
        <MinuteDetailItem
          title="Date of creation"
          detail={corrMinuteDetails.dateCreated}
        />
      </div>
    </div>
  );
};

export default MinuteDetails;
