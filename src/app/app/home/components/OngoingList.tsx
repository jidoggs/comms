'use client';
import React from 'react';
import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';
import { useRouter } from 'next/navigation';

const OngoingList = () => {
  const router = useRouter();
  const createNewCorrespondeceHandler = () => {
    router.push('correspondence/new_correspondence');
  };

  return (
    <section className="flex flex-col gap-y-2.5">
      <SectionHeaderCard
        title="Ongoing"
        count={10}
        createHandler={createNewCorrespondeceHandler}
      />
      <div className="no-scrollbar h-full max-h-[calc(100vh_-_8.625rem)] space-y-2.5 overflow-y-scroll">
        {[...Array(3)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
    </section>
  );
};

export default OngoingList;
