export const BASE_URL = process.env.NEXT_PUBLIC_SERVER_API;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_API as string;

export const REQUEST_TIMEOUT = 60000;
export const PAGE_SIZE = 10;

export const REFRESH_BEFORE = 10; // in minutes
export const REFRESH_INTERVAL = 300000; // in milliseconds

export const STORAGE_KEYS = {
  CLIENT_TOKEN_STORAGE_KEY: 'correspondence.token',
  CLIENT_TOKEN_REFRESH_KEY: 'correspondence.refresh_token',
};
