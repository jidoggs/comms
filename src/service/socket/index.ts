import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/constant';
import { fetchUserToken } from '../storage';

const token = fetchUserToken();

const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  // extraHeaders: {
  //   authorization: token ? `Bearer ${token}` : '',
  // },

  auth: {
    authorization: token ? `Bearer ${token}` : undefined,
  },
  // path: '/minutes',
});

export { socket };
