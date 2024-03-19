import { STORAGE_KEYS } from "../config/constant";

export const getItem = (key: string) => {
  return localStorage.getItem(key) || null;
};

export const removeItem = (key: string) => {
  return localStorage.removeItem(key);
};

export const setItem = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const clearData = () => localStorage.clear();

export const clearUserDetails = () => {
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
  removeItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY);
};

export const storeUserToken = (token: string) => {
  return setItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY, token);
};
export const storeRefreshToken = (token: string) => {
  return setItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY, token);
};

export const fetchUserToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_STORAGE_KEY);
};
export const fetchRefreshToken = () => {
  return getItem(STORAGE_KEYS.CLIENT_TOKEN_REFRESH_KEY);
};

export const getSessionItem = (key: string) => {
  return sessionStorage.getItem(key) || null;
};

export const removeSessionItem = (key: string) => {
  return sessionStorage.removeItem(key);
};

export const setSessionItem = (key: string, value: any) => {
  return sessionStorage.setItem(key, value);
};

export const clearSessionData = () => sessionStorage.clear();
