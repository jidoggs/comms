'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';
import Title from '@/common/components/Title';
import { minuteProps } from '../PageContent';

const OngoingList = ({ resultData }: minuteProps) => {
  const allOngoingList = resultData?.filter(
    (list: any) => list.status === 'ongoing'
  );

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard title="Ongoing" count={allOngoingList.length} />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {allOngoingList.length > 0 ? (
          allOngoingList.map((correspondence: any, index: number) => (
            <CorrespondenceCard key={index} minute={correspondence} />
          ))
        ) : (
          <div
            role="button"
            tabIndex={0}
            className="group flex w-full gap-2 rounded-md bg-white p-2.5 text-custom-gray_600 shadow-wordBox"
          >
            <Title>No Ongoing Correspondence available</Title>
          </div>
        )}
      </div>
    </section>
  );
};

export default OngoingList;
