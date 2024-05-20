'use client';
import React, { createContext, useState } from 'react';
import { HomeContextType } from '../types';
import { ContextWapper as ContextWrapper, MinuteData } from '@/types';
import useCorrespondence from '../../hooks/useCorrespondence';

export const HomeContext = createContext<HomeContextType>(null);

const HomeContextWrapper = ({ children }: ContextWrapper) => {
  const [selectedMinute, setSelectedMinute] = useState<MinuteData>();
  const { getMinListSwr } = useCorrespondence({
    can_get_all: true,
  });

  const minuteData = getMinListSwr.data;

  const queuedList = minuteData.filter((list) => list.status === 'queue');
  const ongoingList = minuteData?.filter((list) => list.status === 'ongoing');
  const triggerSelectedMinute = (value: MinuteData) => {
    setSelectedMinute(value);
  };

  return (
    <>
      <HomeContext.Provider
        value={{
          minuteData,
          queuedList,
          ongoingList,
          triggerSelectedMinute,
          selectedMinute,
        }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextWrapper;
