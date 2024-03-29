'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';

const QueuedList = () => {
  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard title="Queue" count={20} />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_7.5rem)] space-y-2.5 overflow-y-scroll">
        {[...Array(5)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
    </section>
  );
};

export default QueuedList;
