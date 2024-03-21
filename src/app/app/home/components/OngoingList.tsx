'use client';

import React from 'react';

import SectionHeaderCard from './SectionHeaderCard';
import CorrespondenceCard from './CorrespondenceCard';

const OngoingList = () => {
  return (
    <>
      <SectionHeaderCard title="Ongoing" count={16} />
      {[...Array(3)]?.map((_, id) => <CorrespondenceCard key={id} />)}
    </>
  );
};

export default OngoingList;
