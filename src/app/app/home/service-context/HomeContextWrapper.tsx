'use client';
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useMinute from '../../hooks/useMinute';
import { HomeContextType, SocketDataType } from '../types';
import { ContextWrapper } from '@/types';
import { socket } from '@/service/socket';
import { EVENTS } from '@/service/config/events';
import { useSession } from '@/common/hooks';

export const HomeContext = createContext<HomeContextType>(null);

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

  const mountOnce = useRef(false);
  const unMountOnce = useRef(false);

  useEffect(() => {
    if (mountOnce.current) {
      return;
    }
    mountOnce.current = true;

    socket.on(EVENTS.QUEUE_CORRS(user._id), (res) => {
      if (typeof res !== 'string') {
        setSocketData((prev) => ({ ...prev, queue: [...prev.queue, res] }));
      }
    });
    socket.on(EVENTS.ONGOING_CORRS(user._id), (res) => {
      if (typeof res !== 'string') {
        setSocketData((prev) => ({ ...prev, ongoing: [...prev.ongoing, res] }));
      }
    });

    socket.emit('joinQueue');

    socket.emit('joinOngoing');
    return () => {
      if (unMountOnce.current === false) {
        unMountOnce.current = true;
        return;
      }
      socket.off(EVENTS.QUEUE_CORRS(user._id));
      socket.off(EVENTS.ONGOING_CORRS(user._id));
    };
  }, []);

  const isMinutesFetching = queueSwr.loading || ongoingSwr.loading;

  const queuedList = [...socketData.queue, ...queueSwr.data];
  const ongoingList = useMemo(() => {
    const newIds = new Set(socketData.ongoing.map((item) => item._id));
    const oldData = ongoingSwr.data.filter((item) => !newIds.has(item._id));

    return [...socketData.ongoing, ...oldData];
  }, [socketData.ongoing.length, ongoingSwr.data.length]);

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
