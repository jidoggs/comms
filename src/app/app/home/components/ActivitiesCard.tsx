'use client';
import Title from '@/common/components/Title';
import { Folder } from '@/common/components/icons';
import React from 'react';

type ActivitiesCardProps = {
  title: string;
};

const ActivitiesCard = ({ title }: ActivitiesCardProps) => {
  return (
    <div className="group flex w-full cursor-pointer items-center gap-1 border-b border-custom-gray_500 p-2.5 hover:bg-custom-gray_100">
      <p className="rounded bg-custom-gray_900 p-0.5 text-sm leading-normal text-custom-gray_200">
        12:30pm
      </p>
      <div className="flex items-center gap-x-2.5">
        <Folder size={22} className="text-custom-main" />
        <Title className="text-sm text-custom-gray_200">{title}</Title>
      </div>
    </div>
  );
};

export default ActivitiesCard;
