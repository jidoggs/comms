import React from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import { correspondenceMinute } from '@/common/mockData/corrMinute';
import NotesContextWapper from '../../service-context/NotesContextWapper';

const Minutes = () => {
  return (
    <div className="relative flex size-full flex-col justify-end">
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-5 transition-[width]">
        {correspondenceMinute.map((minute) => {
          return (
            <NotesContextWapper key={minute.id}>
              <MinuteCard
                minuteId={minute.id}
                minute={minute}
                className={
                  'group h-full first:mt-3 last:mb-3 odd:self-start even:self-end'
                }
              />
            </NotesContextWapper>
          );
        })}
      </div>
      <MinuteAction />
    </div>
  );
};

export default Minutes;
