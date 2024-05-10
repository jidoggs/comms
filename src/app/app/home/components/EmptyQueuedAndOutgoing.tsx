'use client';
import React from 'react';
// import { useRouter } from 'next/navigation';
import SectionHeaderCard from './SectionHeaderCard';

function EmptyQueuedAndOutgoing() {
  // const router = useRouter();
  // const createNewCorrespondeceHandler = () => {
  //   router.push('correspondence/new_correspondence');
  // };

  return (
    <div className="col-span-2 grid grid-cols-2 grid-rows-[max-content_1fr] gap-2.5">
      <SectionHeaderCard
        title="Queue"
        count={0}
        // createHandler={createNewCorrespondeceHandler}
      />
      <SectionHeaderCard
        title="Ongoing"
        count={0}
        // createHandler={createNewCorrespondeceHandler}
      />
      <div className="col-span-full h-full rounded bg-custom-white_100 p-5" />
    </div>
  );
}

export default EmptyQueuedAndOutgoing;
