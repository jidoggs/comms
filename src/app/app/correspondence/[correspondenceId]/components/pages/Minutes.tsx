import React, { useState } from 'react';
import MinuteCard from '../corrMinute/MinuteCard';
import MinuteAction from '../corrMinute/MinuteAction';
import { motion } from 'framer-motion';
import { StateDispatch } from '@/types';
import {
  // chatHistory,
  correspondenceMinute,
} from '@/common/mockData/corrMinute';

export const initalMinuteState = {
  activeChatId: 0, // Initial active chat ID
  activeChatOptions: false, // Initial state of activeChatOptions
};

interface Props {
  correspondenceFile: FileList | null;
  setCorrespondenceFile: StateDispatch<FileList | null>;
  setOpenCorrespondenceDetails: StateDispatch<boolean>;
}

const Minutes = ({
  setCorrespondenceFile,
  setOpenCorrespondenceDetails,
}: Props) => {
  const [chatState, setChatState] = useState(initalMinuteState);

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
              setCorrespondenceFile={setCorrespondenceFile}
              setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
              minuteId={minute.id}
              key={minute.id}
              chatState={chatState}
              setChatState={setChatState}
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
