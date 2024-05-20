import React from 'react';
import TextMinute from './minuteTypes/TextMinute';
import FileMinute from './minuteTypes/FileMinute';
import MeetingMinute from './minuteTypes/MeetingMinute';
import LetterMinute from './minuteTypes/LetterMinute';

interface MinuteTypeProps {
  fileSend?: any;
  minute?: any;
  userDetails?: any;
}

const MinuteType = ({ fileSend, minute, userDetails }: MinuteTypeProps) => {
  const MinuteText = minute?.minute;

  return (
    <>
      <TextMinute MinuteText={MinuteText} />
      {minute?.type === 'text' ? <TextMinute MinuteText={MinuteText} /> : null}
      {minute?.type === 'document' ? <FileMinute fileSend={fileSend} /> : null}
      {minute?.type === 'letter' ? <LetterMinute /> : null}
      {minute?.type === 'meeting' ? (
        <MeetingMinute userDetails={userDetails} />
      ) : null}
    </>
  );
};

export default MinuteType;
