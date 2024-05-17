'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import useCorrespondence from '../hooks/useCorrespondence';

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
  const { getMinListSwr } = useCorrespondence({
    can_get_all: true,
  });

  // const getMinList = getMinListSwr?.data?.data;
  const resultData = getMinListSwr?.data?.result || [];

  // console.log('getMinListSwr', getMinListSwr);
  // console.log('getMinListSwr?.data', getMinListSwr?.data);
  // console.log('getMinListSwr?.data?.data', getMinListSwr?.data?.data);
  // console.log('getMinList', getMinList);

  // const resultData = getMinList?.result || [];

  return (
    <div className="mx-auto grid size-full max-w-[1200px] grid-cols-homeMax gap-2.5 py-5">
      {isNewAccount ? (
        <EmptyQueuedAndOutgoing />
      ) : (
        <>
          <QueuedList resultData={resultData} />
          <OngoingList resultData={resultData} />
        </>
      )}
      <CalenderList />
    </div>
  );
}

export default PageContent;
