'use client';
import React, { useContext } from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import Title from '@/common/components/Title';
import { HomeContext } from '../service-context/HomeContextWrapper';
import CorrespondenceCard from './CorrespondenceCard';

const QueuedList = () => {
  const homeContextData = useContext(HomeContext);
  const minuteData = homeContextData?.queuedList;
  const hasNewData = homeContextData?.queuedListHasNewItem;

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard
        title="Queue"
        count={minuteData?.length || 0}
        newData={hasNewData}
      />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {minuteData && minuteData.length > 0 ? (
          minuteData?.map((itm) => (
            <CorrespondenceCard key={itm._id} minute={itm} type="queue" />
          ))
        ) : (
          <div
            role="button"
            tabIndex={0}
            className="group flex w-full gap-2 rounded-md bg-white p-2.5 text-custom-gray_600 shadow-wordBox"
          >
            <Title>No Queued Correspondence available</Title>
          </div>
        )}
      </div>
    </section>
  );
};

export default QueuedList;
