import React from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import { motion } from 'framer-motion';
import { correspondenceMinute } from '@/common/mockData/corrMinute';

const Minutes = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className="relative flex size-full flex-col justify-end"
    >
      <div className="flex h-full flex-col gap-3 overflow-y-auto px-5">
        {correspondenceMinute.map((minute) => {
          return (
            <MinuteCard
              key={minute.id}
              minuteId={minute.id}
              minute={minute}
              className={
                'group h-full first:mt-3 last:mb-3 odd:self-start even:self-end'
              }
            />
          );
        })}
      </div>
      <MinuteAction />
    </motion.div>
  );
};

export default Minutes;
