'use client';
import React, { createContext, useEffect, useRef } from 'react';
import useMinute from '../../hooks/useMinute';
import { HomeContextType } from '../types';
import { ContextWrapper } from '@/types';
import { socket } from '@/service/socket';
import { EVENTS } from '@/service/config/events';
import { useSession } from '@/common/hooks';

export const HomeContext = createContext<HomeContextType>(null);

const HomeContextWrapper = ({ children }: ContextWrapper) => {
  const { data: user } = useSession();
  const { getMinListSwr: queueSwr } = useMinute({
    can_get_all: true,
    status: 'queue',
  });
  const { getMinListSwr: ongoingSwr } = useMinute({
    can_get_all: true,
    status: 'ongoing',
  });
  const loadOnce = useRef(false);

  useEffect(() => {
    socket.connect();
    if (loadOnce.current) {
      return;
    }
    loadOnce.current = true;
    console.log(EVENTS.QUEUE_CORRS(user._id)); //eslint-disable-line
    socket.on(EVENTS.QUEUE_CORRS(user._id), (res) => {
      console.log(res); //eslint-disable-line
    });
    socket.emit('joinQueue');
    return () => {
      socket.off(EVENTS.QUEUE_CORRS(user._id), (res) => {
        console.log(res); //eslint-disable-line
      });
    };
  }, []);

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
