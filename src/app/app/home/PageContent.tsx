'use client';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { HomeContext } from './service-context/HomeContextWrapper';

export interface minuteProps {
  resultData: any;
}

const EmptyQueuedAndOutgoing = dynamic(
  () => import('./components/EmptyQueuedAndOutgoing')
);
const QueuedList = dynamic(() => import('./components/QueuedList'));
const OngoingList = dynamic(() => import('./components/OngoingList'));
const CalenderList = dynamic(() => import('./components/CalenderList'));

function PageContent() {
  const homeContextData = useContext(HomeContext);
  const minuteData = homeContextData?.minuteData;

  // const isNewAccount = minuteData?.length === 0;
  const isNewAccount = minuteData?.length === 0;

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
}

export default PageContent;
