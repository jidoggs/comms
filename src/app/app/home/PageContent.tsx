'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// import useCorrespondence from '../hooks/useCorrespondence';
import HomeContextWrapper from './service-context/HomeContextWrapper';

export interface minuteProps {
  resultData: any;
}

const EmptyQueuedAndOutgoing = dynamic(
  () => import('./components/EmptyQueuedAndOutgoing')
);
const QueuedList = dynamic(() => import('./components/QueuedList'));
const OngoingList = dynamic(() => import('./components/OngoingList'));
const CalenderList = dynamic(() => import('./components/CalenderList'));

const isNewAccount = false;

function PageContent() {
  return (
    <HomeContextWrapper>
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
    </HomeContextWrapper>
  );
}

export default PageContent;
