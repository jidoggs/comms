import Title from '@/common/components/Title';
import React from 'react';

interface MinuteProps {
  MinuteText: string;
}

const TextMinute = ({ MinuteText }: MinuteProps) => {
  return (
    <Title
      type="p"
      className="my-2 text-sm font-[450] leading-[17.71px] text-custom-main"
    >
      {MinuteText}
    </Title>
  );
};

export default TextMinute;
