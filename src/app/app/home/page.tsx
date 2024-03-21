'use client';

import React from 'react';

import ActivitiesSection from './components/ActivitiesSection';
import QueuedList from './components/QueuedList';
import OngoingList from './components/OngoingList';

const HomePage = () => {
  return (
    <div className="flex w-full justify-center gap-2">
      <div className="w-[34%] flex-col gap-1">
        <QueuedList />
      </div>
      <div className="w-[34%] flex-col">
        <OngoingList />
      </div>
      <div className="w-[26%] flex-col">
        <ActivitiesSection />
      </div>
    </div>
  );
};

export default HomePage;
