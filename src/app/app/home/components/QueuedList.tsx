'use client';
import React, { useContext } from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import Title from '@/common/components/Title';
import { HomeContext } from '../service-context/HomeContextWrapper';
import CorrespondenceCard from './CorrespondenceCard';

const QueuedList = () => {
  const homeContextData = useContext(HomeContext);
  const minuteData = homeContextData?.queuedList;

  const uniqueCorrespondences = minuteData.reduce(
    (acc: any[], current: any) => {
      if (
        !acc.some(
          (minute) => minute.correspondence._id === current.correspondence._id
        )
      ) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard
        title="Queue"
        count={uniqueCorrespondences?.length || 0}
        newData
      />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {uniqueCorrespondences?.length > 0 ? (
          uniqueCorrespondences?.map((correspondence: any, index: number) => (
            <CorrespondenceCard key={index} minute={correspondence} />
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
