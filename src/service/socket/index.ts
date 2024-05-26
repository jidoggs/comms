import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../config/constant';
import { fetchUserToken } from '../storage';

const token = fetchUserToken();

const config = {
  transports: ['websocket'],
  auth: {
    authorization: token ? `Bearer ${token}` : undefined,
  },
};

const minuteSocket: Socket = io(SOCKET_URL + '/minutes', config);
const noficationSocket: Socket = io(SOCKET_URL + '/notifications', config);

const disconnectSocket = () => {
  if (minuteSocket.connected) {
    minuteSocket.disconnect();
  }
  if (noficationSocket.connected) {
    noficationSocket.disconnect();
  }
};

export { minuteSocket, noficationSocket, disconnectSocket };
