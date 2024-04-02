'use client';
import React from 'react';
import QueuedList from './components/QueuedList';
import OngoingList from './components/OngoingList';
import CalenderList from './components/CalenderList';

const HomePage = () => {
  return (
    <div className="grid-cols-homeMax mx-auto grid size-full max-w-[1200px] gap-2.5 p-5">
      <QueuedList />
      <OngoingList />
      <CalenderList />
    </div>
  );
};

export default HomePage;
