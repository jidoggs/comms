'use client';
import React, { Suspense, useContext, useEffect, useRef } from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import MultiMinuteAction from '../corrMinute/MultiMinuteAction';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import NotesContextWapper from '../../service-context/NotesContextWapper';
import FullPageLoader from '@/common/components/FullPageLoader';
import { mergeClassName } from '@/common/utils';

const Minutes = () => {
  const detailContextInfo = useContext(DetailContext);
  // const pagination = detailContextInfo?.pagination;
  const minutesThread = detailContextInfo?.minutesThread;
  const loadingMinutesThread = detailContextInfo?.loadingMinutesThread;
  const minutesContainerRef = useRef<HTMLDivElement>(null);
  const minuteItemRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when currentMinutes changes or on initial render
  useEffect(() => {
    const container = minutesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'instant',
      });
    }
  }, [minutesThread?.length !== 0]); //eslint-disable-line

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    if (loadingMinutesThread) return;
    const { scrollTop } = e.currentTarget;

    const miniuteHeight = minuteItemRef.current?.clientHeight || 0;
    if (scrollTop === miniuteHeight) {
      // pagination?.pageChangeHandler()
    }
  };

  return (
    <Suspense>
      <div className="relative flex size-full flex-col justify-end">
        <div
          ref={minutesContainerRef} // Attach the ref to the container
          className="flex h-full flex-col gap-3 overflow-y-auto scroll-smooth px-5 transition-[width]"
          onScroll={scrollHandler}
        >
          {loadingMinutesThread ? <FullPageLoader /> : null}
          {minutesThread
            ?.sort((a, b) => {
              const dateA = new Date(a.created_at);
              const dateB = new Date(b.created_at);
              return dateA.getTime() - dateB.getTime(); // Sort in ascending order (oldest first)
            })
            ?.map((minute, index) => (
              <NotesContextWapper key={minute._id}>
                <MinuteCard
                  ref={
                    index === 0 ? minuteItemRef : null // add ref to last element
                  }
                  minuteId={minute._id}
                  minute={minute}
                  className={mergeClassName(
                    'group first:mt-3 last:mb-3',
                    minute?.from?._id === detailContextInfo?.user._id
                      ? 'self-end'
                      : 'self-start',
                    detailContextInfo?.multiSelect.isMultiSelectMode
                      ? 'self-center'
                      : ''
                  )}
                />
              </NotesContextWapper>
            ))}
        </div>
        {detailContextInfo?.multiSelect.isMultiSelectMode ? (
          <MultiMinuteAction />
        ) : (
          <MinuteAction />
        )}
      </div>
    </Suspense>
  );
};

export default Minutes;
