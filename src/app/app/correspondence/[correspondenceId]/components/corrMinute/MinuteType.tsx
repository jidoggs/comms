import React from 'react';
import TextMinute from './minuteTypes/TextMinute';
import FileMinute from './minuteTypes/FileMinute';
import MeetingMinute from './minuteTypes/MeetingMinute';

interface MinuteTypeProps {
  fileSend?: any;
  minute?: any;
  userDetails?: any;
}

const MinuteType = ({ fileSend, minute, userDetails }: MinuteTypeProps) => {
  // const userDetails = minute.userDetails;
  // const initials = useIntials(minute.userDetails.name);

  // eslint-disable-next-line no-console
  //   console.log('minute', minute);

  const MinuteText = minute.minuteDetails.minuteText;

  return (
    <div className="flex flex-col items-start justify-between px-2">
      {minute && minute.type === 'text' ? (
        <TextMinute MinuteText={MinuteText} />
      ) : null}
      {minute && minute.type === 'document' ? (
        <FileMinute fileSend={fileSend} />
      ) : null}
      {minute && minute.type === 'meeting' ? (
        <MeetingMinute userDetails={userDetails} />
      ) : null}
    </div>
  );
};

export default MinuteType;
