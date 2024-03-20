/* eslint-disable no-unused-vars */
import { Send } from '@/common/components/icons';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

type Props = {};

const ChatAction = (props: Props) => {
  return (
    <div className="mt-5 w-full rounded-md bg-white">
      <div className="p-5">
        <div className="topActions"></div>
        <TextArea />
        <Send className="mt-3" />
      </div>
    </div>
  );
};

export default ChatAction;
