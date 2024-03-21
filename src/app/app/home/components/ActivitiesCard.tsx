'use client';

import { File } from '@/common/components/icons';
import React from 'react';

type ActivitiesCardProps = {
  title: string;
};

const ActivitiesCard = ({ title }: ActivitiesCardProps) => {
  return (
    <div className="mt-1 flex w-full items-center">
      <p className="text-xs">12:30pm</p>
      <File />
      <p className="w-full truncate text-xs">{title}</p>
    </div>
  );
};

export default ActivitiesCard;
