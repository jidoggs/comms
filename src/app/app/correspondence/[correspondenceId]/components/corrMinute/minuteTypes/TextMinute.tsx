import Title from '@/common/components/Title';
import React from 'react';

interface MinuteProps {
  MinuteText: string;
}

const TextMinute = ({ MinuteText }: MinuteProps) => {
  return <Title className="p-1">{MinuteText}</Title>;
};

export default TextMinute;
