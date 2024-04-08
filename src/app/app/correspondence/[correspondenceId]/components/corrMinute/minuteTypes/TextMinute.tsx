import Title from '@/common/components/Title';
import React from 'react';

interface MinuteProps {
  MinuteText: string;
}

const TextMinute = ({ MinuteText }: MinuteProps) => {
  return (
    <Title tag="p" className="my-2">
      {MinuteText}
    </Title>
  );
};

export default TextMinute;
