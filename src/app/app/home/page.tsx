'use client';

import React from 'react';

import ActivitiesSection from './components/ActivitiesSection';
import QueuedList from './components/QueuedList';
import OngoingList from './components/OngoingList';

const HomePage = () => {
  return (
    <div className="size-full overflow-y-scroll">
      <div className="mx-auto grid w-full max-w-screen-lg grid-cols-11 gap-2.5 p-5">
        <div className="col-span-4 flex-col gap-1">
          <QueuedList />
        </div>
        <div className="col-span-4 flex-col">
          <OngoingList />
        </div>
        <div className="col-span-3 flex-col">
          <ActivitiesSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
