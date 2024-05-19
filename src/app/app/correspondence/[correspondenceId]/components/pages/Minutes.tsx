import React, { useContext } from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import MultiMinuteAction from '../corrMinute/MultiMinuteAction';
// import { correspondenceMinute } from '@/common/mockData/corrMinute';
import { DetailContext } from '../../service-context/DetailContextWrapper';
import NotesContextWapper from '../../service-context/NotesContextWapper';
import { mergeClassName } from '@/common/utils';
import { MinuteData } from '@/types';
import { useSession } from '@/common/hooks';

interface minuteProps {
  minuteData: MinuteData[];
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const Minutes = ({ minuteData }: minuteProps) => {
  const detailContextInfo = useContext(DetailContext);
  const currentMinutes = detailContextInfo?.minuteData;
  const { data: user } = useSession();

  // const minuteFromMe = currentMinutes?.filter(
  //   (minute) => minute?.from?._id === user._id
  // );

  // console.log('detailContextInfo', detailContextInfo?.minuteData);
  // console.log('user', user);
  // console.log('minuteFromMe', minuteFromMe);

  return (
    <div className="relative flex size-full flex-col justify-end">
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-5 transition-[width]">
        {currentMinutes?.map((minute) => (
          <NotesContextWapper key={minute._id}>
            <MinuteCard
              minuteId={minute._id}
              minute={minute}
              className={mergeClassName(
                'group first:mt-3 last:mb-3',
                minute?.from?._id === user._id ? 'self-end' : 'self-start',
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
  );
};

export default Minutes;
