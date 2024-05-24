import { isClient } from '@/common/utils';
import { STORAGE_KEYS } from '../config/constant';

export const getItem = (key: string) => {
  if (isClient) {
    return localStorage.getItem(key) || '';
  }
  return '';
};

export const removeItem = (key: string) => {
  if (isClient) {
    return localStorage.removeItem(key);
  }
};

export const setItem = (key: string, value: any) => {
  if (isClient) {
    return localStorage.setItem(key, value);
  }
};

export const clearData = () => {
  if (isClient) {
    return localStorage.clear();
  }
};

export const clearUserToken = () => {
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY);
};

export const storeUserTokens = (data: any) => {
  setItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, data?.access_token);
  setItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY, data?.refresh_token);
};

export const fetchUserToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};
export const fetchRefreshToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY);
};

export const getSessionItem = (key: string) => {
  if (isClient) {
    return sessionStorage.getItem(key) || null;
  }
};

export const removeSessionItem = (key: string) => {
  if (isClient) {
    return sessionStorage.removeItem(key);
  }
};

export const setSessionItem = (key: string, value: any) => {
  if (isClient) {
    return sessionStorage.setItem(key, value);
  }
};

export const clearSessionData = () => sessionStorage.clear();
