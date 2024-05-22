'use client';
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { HomeContext } from './service-context/HomeContextWrapper';
import FullPageLoader from '@/common/components/FullPageLoader';
import Conditional from '@/common/components/Conditional';

export interface minuteProps {
  resultData: any;
}

const EmptyQueuedAndOutgoing = dynamic(
  () => import('./components/EmptyQueuedAndOutgoing'),
  {
    loading() {
      return <FullPageLoader style={{ background: 'transparent' }} />;
    },
  }
);
const QueuedList = dynamic(() => import('./components/QueuedList'), {
  loading() {
    return <FullPageLoader style={{ background: 'transparent' }} />;
  },
});
const OngoingList = dynamic(() => import('./components/OngoingList'), {
  loading() {
    return <FullPageLoader style={{ background: 'transparent' }} />;
  },
});
const CalenderList = dynamic(() => import('./components/CalenderList'), {
  loading() {
    return <FullPageLoader style={{ background: 'transparent' }} />;
  },
});

function PageContent() {
  const homeContextData = useContext(HomeContext);
  const minuteData = homeContextData?.minuteData;

  const isNewAccount = minuteData?.length === 0;

  return (
    <div className="mx-auto grid size-full max-w-[1200px] grid-cols-homeMax gap-2.5 py-5">
      {homeContextData?.isMinutesFetching ? (
        <FullPageLoader fullscreen style={{ background: 'transparent' }} />
      ) : (
        <>
          <Conditional
            condition={isNewAccount}
            trueArg={<EmptyQueuedAndOutgoing />}
            falseArg={
              <>
                <QueuedList />
                <OngoingList />
              </>
            }
          />
          <CalenderList />
        </>
      )}
    </div>
  );
}

export default PageContent;
