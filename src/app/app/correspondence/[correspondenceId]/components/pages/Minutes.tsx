'use client';
import React, { Suspense, useContext, useEffect, useRef } from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import MultiMinuteAction from '../corrMinute/MultiMinuteAction';
// import { correspondenceMinute } from '@/common/mockData/corrMinute';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import NotesContextWapper from '../../service-context/NotesContextWapper';
import { mergeClassName } from '@/common/utils';
import MinuteContextWrapper from '../../service-context/MinuteContextWrapper';
import { CorrAppContext } from '@/app/app/service-context/AppContextWrapper';

const Minutes = () => {
  const detailContextInfo = useContext(DetailContext);
  const appContextInfo = useContext(CorrAppContext);
  // const currentMinutes = detailContextInfo?.minuteData;
  const currentMinutes = appContextInfo?.minuteData;
  const minutesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when currentMinutes changes or on initial render
  useEffect(() => {
    const container = minutesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [currentMinutes]);

  return (
    <Suspense>
      <MinuteContextWrapper>
        <div className="relative flex size-full flex-col justify-end">
          <div
            ref={minutesContainerRef} // Attach the ref to the container
            className="flex h-full flex-col gap-3 overflow-y-auto scroll-smooth px-5 transition-[width]"
          >
            {currentMinutes
              ?.slice() // Create a copy of the array to avoid mutating the original
              .sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateA.getTime() - dateB.getTime(); // Sort in ascending order (oldest first)
              })
              ?.map((minute) => (
                <NotesContextWapper key={minute._id}>
                  <MinuteCard
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
            {/* {correspondenceMinute.map((minute) => {
          return (
            <NotesContextWapper key={minute.id}>
              <MinuteCard
                minuteId={minute.id}
                minute={minute}
                className={mergeClassName(
                  'group first:mt-3 last:mb-3',
                  minute.messageFrom ? 'self-end' : 'self-start',
                  detailContextInfo?.multiSelect.isMultiSelectMode
                    ? 'self-center'
                    : ''
                )}
              />
            </NotesContextWapper>
          );
        })} */}
          </div>
          {detailContextInfo?.multiSelect.isMultiSelectMode ? (
            <MultiMinuteAction />
          ) : (
            <MinuteAction />
          )}
        </div>
      </MinuteContextWrapper>
    </Suspense>
  );
};

export default Minutes;
