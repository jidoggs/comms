'use client';
import CustomButton from '@/common/components/CustomButton';
import CloseCircle from '@/common/components/icons/CloseCircle';
import Folder from '@/common/components/icons/Folder';
import Title from '@/common/components/Title';
import { mergeClassName } from '@/common/utils';
import React, { useState } from 'react';

interface NotificationProps {
  item: {
    key: string;
    label: string;
    time: string;
  };
}

const SingleNotification = ({ item }: NotificationProps) => {
  const [hoverState, setHoverState] = useState<boolean>(false);
  const triggerEnterHoverState = () => {
    setHoverState(true);
  };
  const triggerExitHoverState = () => {
    setHoverState(false);
  };

  return (
    <div
      className={mergeClassName(
        'duration-300} grid grid-cols-7 items-center gap-2 p-2 !duration-1000',
        hoverState ? 'bg-custom-gray_100' : 'bg-transparent'
      )}
      onMouseEnter={triggerEnterHoverState}
      onMouseLeave={triggerExitHoverState}
    >
      <div className="col-span-1 self-start rounded-10 bg-custom-gray_100 p-2.5 text-custom-main">
        <Folder size={18} />
      </div>
      <div className="col-span-5 flex w-full flex-col">
        <Title className="text-custom-gray_600">
          {item.label.length > 50
            ? `${item?.label?.substring(1, 50)}...`
            : item.label}
        </Title>
        <div className="flex flex-row justify-between">
          <Title className="text-custom-gray_200">
            {item.label.length > 50
              ? `${item?.label?.substring(1, 50)}...`
              : item.label}
          </Title>
          <Title className="text-custom-gray_200">{item?.time}</Title>
        </div>
      </div>
      <div className="col-span-1">
        <CustomButton
          icon={<CloseCircle size={25} />}
          className={mergeClassName(
            '!rounded-full !transition-opacity !duration-1000',
            hoverState ? '!opacity-100' : '!opacity-0'
          )}
          size="small"
          type="text"
        />
      </div>
    </div>
  );
};

export default SingleNotification;
