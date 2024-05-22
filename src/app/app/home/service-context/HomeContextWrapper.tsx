'use client';
import React, { createContext } from 'react';
import useMinute from '../../hooks/useMinute';
import { HomeContextType } from '../types';
import { ContextWrapper } from '@/types';

export const HomeContext = createContext<HomeContextType>(null);

const HomeContextWrapper = ({ children }: ContextWrapper) => {
  const { getMinListSwr: queueSwr } = useMinute({
    can_get_all: true,
    status: 'queue',
  });
  const { getMinListSwr: ongoingSwr } = useMinute({
    can_get_all: true,
    status: 'ongoing',
  });

  const isMinutesFetching = queueSwr.loading || ongoingSwr.loading;

  const queuedList = queueSwr.data;
  const ongoingList = ongoingSwr.data;

  const isNewAccount = queuedList.length === 0 && ongoingList.length === 0;

  return (
    <>
      <HomeContext.Provider
        value={{
          isMinutesFetching,
          queuedList,
          ongoingList,
          isNewAccount,
        }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextWrapper;
