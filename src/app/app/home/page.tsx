import React from 'react';
import CorrespondenceCard from './components/CorrespondenceCard';
import SectionHeaderCard from './components/SectionHeaderCard';

const HomePage = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="w-[34%] flex-col gap-1">
        <SectionHeaderCard title="Queue" count={20} />
        {[...Array(5)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
      <div className="w-[34%] flex-col">
        <SectionHeaderCard title="Ongoing" count={16} />
        {[...Array(3)]?.map((_, id) => <CorrespondenceCard key={id} />)}
      </div>
    </div>
  );
};

export default HomePage;
