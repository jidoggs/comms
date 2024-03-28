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
      <div className="mx-0 my-3 flex h-full flex-col gap-5 overflow-y-auto md:m-3">
        {correspondenceMinute.map((minute) => {
          if (minute.id % 2) {
            return (
              <div className="leftChat h-full self-start " key={minute.id}>
                <MinuteCard
                  setCorrespondenceFile={setCorrespondenceFile}
                  setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
                  minuteId={minute.id}
                  cardPosition={'left'}
                  chatState={chatState}
                  setChatState={setChatState}
                  minute={minute}
                />
              </div>
            );
          } else {
            return (
              <div className="rightChat self-end" key={minute.id}>
                <MinuteCard
                  setCorrespondenceFile={setCorrespondenceFile}
                  setOpenCorrespondenceDetails={setOpenCorrespondenceDetails}
                  minuteId={minute.id}
                  cardPosition={'right'}
                  chatState={chatState}
                  setChatState={setChatState}
                  minute={minute}
                />
              </div>
            );
          }
        })}
      </div>
      <MinuteAction />
    </motion.div>
  );
};

export default Minutes;
