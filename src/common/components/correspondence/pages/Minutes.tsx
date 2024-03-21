import React, { useState } from 'react';
import ChatCard from '../ChatCard';
import ChatAction from '../ChatAction';
import { motion } from 'framer-motion';

const chatHistory = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const Minutes = ({ setCorrespondenceFile, setOpenCorrespondence }: any) => {
  const [chatState, setChatState] = useState({
    activeChatId: 0, // Initial active chat ID
    activeChatOptions: false, // Initial state of activeChatOptions
  });

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
      className="relative flex h-[70vh] w-full flex-col justify-end"
    >
      <div className="m-3 flex h-full flex-col gap-5 overflow-y-auto">
        {chatHistory.map((chat) => {
          if (chat.id % 2) {
            return (
              <div className="leftChat h-full self-start " key={chat.id}>
                <ChatCard
                  setCorrespondenceFile={setCorrespondenceFile}
                  setOpenCorrespondence={setOpenCorrespondence}
                  chatId={chat.id}
                  cardPosition={'left'}
                  chatState={chatState}
                  setChatState={setChatState}
                />
              </div>
            );
          } else {
            return (
              <div className="rightChat self-end" key={chat.id}>
                <ChatCard
                  setCorrespondenceFile={setCorrespondenceFile}
                  setOpenCorrespondence={setOpenCorrespondence}
                  chatId={chat.id}
                  cardPosition={'right'}
                  chatState={chatState}
                  setChatState={setChatState}
                />
              </div>
            );
          }
        })}
      </div>
      <ChatAction />
    </motion.div>
  );
};

export default Minutes;
