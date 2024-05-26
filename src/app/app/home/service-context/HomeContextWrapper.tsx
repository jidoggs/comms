'use client';
import React, { createContext, useMemo, useState } from 'react';
import useMinute from '../../hooks/useMinute';
import { HomeContextType, SocketDataType } from '../types';
import { ContextWrapper } from '@/types';
import { EVENTS } from '@/service/config/events';
import { useSession } from '@/common/hooks';
import useSocketSubscription from '@/common/hooks/useSocketSubscription';

export const HomeContext = createContext<HomeContextType>(null);

const { ONGOING_CORRS, QUEUE_CORRS } = EVENTS.MINIUTES;

const initialSocketData: SocketDataType = {
  queue: [],
  ongoing: [],
};

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
  const [socketData, setSocketData] = useState(initialSocketData);

  useSocketSubscription(
    { broadcast: 'joinQueue', listenFor: QUEUE_CORRS(user._id) },
    (res) => {
      setSocketData((prev) => ({ ...prev, queue: [...prev.queue, res] }));
    }
  );
  useSocketSubscription(
    { broadcast: 'joinOngoing', listenFor: ONGOING_CORRS(user._id) },
    (res) => {
      setSocketData((prev) => ({ ...prev, queue: [...prev.queue, res] }));
    }
  );

  const isMinutesFetching = queueSwr.loading || ongoingSwr.loading;

  const queuedList = [...socketData.queue, ...queueSwr.data];
  const ongoingList = useMemo(() => {
    const newIds = new Set(socketData.ongoing.map((item) => item._id));
    const oldData = ongoingSwr.data.filter((item) => !newIds.has(item._id));

    return [...socketData.ongoing, ...oldData];
  }, [socketData.ongoing.length, ongoingSwr.data.length]); //eslint-disable-line

  const isNewAccount = queuedList.length === 0 && ongoingList.length === 0;

  return (
    <>
      <HomeContext.Provider
        value={{
          isMinutesFetching,
          queuedList,
          ongoingList,
          isNewAccount,
          ongoingListHasNewItem: socketData.ongoing.length !== 0,
          queuedListHasNewItem: socketData.queue.length !== 0,
        }}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};

export default HomeContextWrapper;
