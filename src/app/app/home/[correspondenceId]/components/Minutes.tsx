import React from 'react';
import ChatCard from './ChatCard';
import ChatAction from './ChatAction';

const Minutes = ({ setCorrespondenceFile, setOpenCorrespondence }: any) => {
  return (
    <div className="relative flex h-[70vh] w-full flex-col justify-end">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="leftChat h-full w-2/5 self-start ">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
        <div className="rightChat w-2/5 self-end">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
        <div className="leftChat h-full w-2/5 self-start ">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
        <div className="rightChat w-2/5 self-end">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
        <div className="leftChat h-full w-2/5 self-start ">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
        <div className="rightChat w-2/5 self-end">
          <ChatCard
            setCorrespondenceFile={setCorrespondenceFile}
            setOpenCorrespondence={setOpenCorrespondence}
          />
        </div>
      </div>
      <ChatAction />
    </div>
  );
};

export default Minutes;
