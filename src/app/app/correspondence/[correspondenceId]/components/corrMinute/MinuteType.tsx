import React from 'react';
import TextMinute from './minuteTypes/TextMinute';
import FileMinute from './minuteTypes/FileMinute';
import MeetingMinute from './minuteTypes/MeetingMinute';

const MinuteType = ({ fileSend, minute }: any) => {
  // const userDetails = minute.userDetails;
  // const initials = useIntials(minute.userDetails.name);

  // eslint-disable-next-line no-console
  //   console.log('minute', minute);

  const MinuteText = minute.minuteDetails.minuteText;

  return (
    <div className="flex flex-col items-start justify-between px-2">
      <div></div>
      {minute && minute.type === 'text' ? (
        <TextMinute MinuteText={MinuteText} />
      ) : minute && minute.type === 'document' ? (
        <FileMinute fileSend={fileSend} />
      ) : minute && minute.type === 'meeting' ? (
        <MeetingMinute />
      ) : (
        ''
      )}
    </div>
  );
};

export default MinuteType;
