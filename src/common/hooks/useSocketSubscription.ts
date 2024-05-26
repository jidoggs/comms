import { minuteSocket, noficationSocket } from '@/service/socket';
import { useEffect, useRef } from 'react';

type Args = {
  broadcast: string;
  payload?: any;
  listenFor: string;
};

function useSocketSubscription(args: Args, listenCallback: (res: any) => void) {
  const mountOnce = useRef(false);
  const unMountOnce = useRef(false);
  useEffect(() => {
    if (mountOnce.current) {
      return;
    }
    mountOnce.current = true;

    const socket = args.listenFor.toLowerCase().includes('notification')
      ? noficationSocket
      : minuteSocket;

    socket.connect();

    socket.emit(args.broadcast, args.payload);

    socket.on(args.listenFor, (res: any) => {
      if (typeof res !== 'string') {
        listenCallback(res);
      }
    });

    return () => {
      if (unMountOnce.current === false) {
        unMountOnce.current = true;
        return;
      }
      socket.off(args.listenFor);
    };
  }, []); //eslint-disable-line
}

export default useSocketSubscription;
