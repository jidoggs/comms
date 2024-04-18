'use client';
import React from 'react';
import QueuedList from './components/QueuedList';
import OngoingList from './components/OngoingList';
import EmptyQueuedAndOutgoing from './components/EmptyQueuedAndOutgoing';
import CalenderList from './components/CalenderList';

const isNewAccount = true;
const HomePage = () => {
  return (
    <div className="mx-auto grid size-full max-w-[1200px] grid-cols-homeMax gap-2.5 py-5">
      {isNewAccount ? (
        <EmptyQueuedAndOutgoing />
      ) : (
        <>
          <QueuedList />
          <OngoingList />
        </>
      )}
      <CalenderList />
    </div>
  );
};

export default HomePage;
