'use client';

import React from 'react';

import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';

const QueuedList = () => {
  return (
    <>
      <SectionHeaderCard title="Queue" count={20} />
      {[...Array(5)]?.map((_, id) => <CorrespondenceCard key={id} />)}
    </>
  );
};

export default QueuedList;
