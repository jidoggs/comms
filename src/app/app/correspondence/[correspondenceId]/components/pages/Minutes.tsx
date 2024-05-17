import React, { useContext } from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import MultiMinuteAction from '../corrMinute/MultiMinuteAction';
import { correspondenceMinute } from '@/common/mockData/corrMinute';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import NotesContextWapper from '../../service-context/NotesContextWapper';
import { mergeClassName } from '@/common/utils';
import { CorrespondenceData } from '@/types';

interface minuteProps {
  minuteData: CorrespondenceData[];
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const Minutes = ({ minuteData }: minuteProps) => {
  const detailContextInfo = useContext(DetailContext);
  return (
    <div className="relative flex size-full flex-col justify-end">
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-5 transition-[width]">
        {correspondenceMinute.map((minute) => {
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
        })}
      </div>
      {detailContextInfo?.multiSelect.isMultiSelectMode ? (
        <MultiMinuteAction />
      ) : (
        <MinuteAction />
      )}
    </div>
  );
};

export default Minutes;
