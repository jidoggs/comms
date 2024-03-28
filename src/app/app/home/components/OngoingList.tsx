'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';

const OngoingList = () => {
  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard title="Ongoing" count={16} />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_7.5rem)] space-y-2.5 overflow-y-scroll">
        {[...Array(3)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
    </section>
  );
};

export default OngoingList;
