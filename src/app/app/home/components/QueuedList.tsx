'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';
import Title from '@/common/components/Title';
import { minuteProps } from '../PageContent';

const QueuedList = ({ resultData }: minuteProps) => {
  const allQueuedList = resultData?.filter(
    (list: any) => list.status === 'queue'
  );

  // console.log('resultData', resultData);

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard title="Queue" count={allQueuedList.length} newData />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {/* {[...Array(5)]?.map((_, id) => (
          <CorrespondenceCard key={id} minute={allQueuedList[0]} />
        ))} */}
        {allQueuedList.length > 0 ? (
          allQueuedList.map((correspondence: any, index: number) => (
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
