'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';
import { useRouter } from 'next/navigation';

const QueuedList = () => {
  const router = useRouter();
  const createNewCorrespondeceHandler = () => {
    router.push('correspondence/new_correspondence');
  };

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard
        title="Queue"
        count={6}
        newData
        createHandler={createNewCorrespondeceHandler}
      />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {[...Array(5)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
    </section>
  );
};

export default QueuedList;
