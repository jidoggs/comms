import React from 'react';
import { motion } from 'framer-motion';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import NotesContextWapper from '../service-context/NotesContextWapper';
import { correspondenceMinute } from '@/common/mockData/corrMinute';

const Minutes = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        width: '100%',
      }}
      whileInView={{
        opacity: 1,
        width: '100%',
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative flex size-full flex-col justify-end"
    >
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
    </motion.div>
  );
};

export default Minutes;
