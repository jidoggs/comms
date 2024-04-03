import Title from '@/common/components/Title';
import React from 'react';

interface MinuteProps {
  MinuteText: string;
}

const TextMinute = ({ MinuteText }: MinuteProps) => {
  return (
    <Title
      type="p"
      className="font-450 my-2 text-sm leading-[17.71px] text-custom-main"
    >
      {MinuteText}
    </Title>
  );
};

export default TextMinute;
