import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL as API_URL, REQUEST_TIMEOUT } from '../config/constant';
import { fetchUserToken, clearData, fetchRefreshToken } from '../storage';
import * as tp from '../../types';

/** general headers **/
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/** authorization header for logged in user **/
const setAuthorization = (url?: string) => {
  const authorize = {
    Authorization: `Bearer ${fetchUserToken()}`,
  };
  const refresh = {
    'X-Refresh-Token': fetchRefreshToken(),
  };
  return url?.includes('refresh/token')
    ? {
        ...authorize,
        ...refresh,
      }
    : authorize;
};

/** axios instance **/
export const instance = axios.create({
  baseURL: API_URL,
  headers,
  withCredentials: false,
});

/** timeout configuration for axios instance **/
instance.defaults.timeout = REQUEST_TIMEOUT;

// Create a cancellation token source
const cancelTokenSource = axios.CancelToken.source();

// Set the cancellation token as a default config option for the instance
instance.defaults.cancelToken = cancelTokenSource.token;

instance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      // config.headers["Cancel-Token"] = cancelTokenSource.token as any;
      // config.cancelToken = cancelTokenSource.token;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Export the cancellation token source
export const cancelToken = cancelTokenSource;

/** axios interceptor to trigger a logout on unauthorized error response code **/
instance.interceptors.response.use(
  ({ data }: AxiosResponse): AxiosResponse<tp.APIResponseSuccessModel> => {
    return data;
  },
  (error: AxiosError) => {
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject({});
    }
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({ message: 'You are Offline' });
    }
    if (error.response?.status !== undefined && error.response.status >= 500) {
      return Promise.reject({
        message: 'Server Error',
      });
    }
    if (
      error.response?.status === 401 &&
      error.config?.url?.includes('refresh/token') // only redirect to auth when refresh token has expired
    ) {
      clearData();
      window.location.replace('/auth/login');
    }

    return Promise.reject(
      error
        ? error.response
          ? error.response.data
          : { message: 'Something went Wrong' }
        : { message: 'Something went Wrong' }
    );
  }
);

/** make an axios get request **/
export const makeGetRequest: tp.Request = async (url: string) => {
  return await instance.request({
    method: 'get',
    url,
    headers,
  });
};

/** make an axios post request **/
export const makeRequest: tp.Request = async (
  url: string,
  { arg }: { arg: tp.apiRequestorArgs }
) => {
  return await instance.request({
    method: arg.type || 'post',
    url: url,
    data: arg.data,
    headers,
  });
};

export const makeAuthFetch: tp.Request = async (url: string) => {
  return await instance.request({
    method: 'get',
    url: url,
    headers: {
      ...headers,
      ...setAuthorization(url), // refresh token added here because it is a get request
    },
  });
};

export const makeAuthRequest: tp.Request = async (
  url: string,
  { arg }: { arg: tp.apiRequestorArgs }
) => {
  return await instance.request({
    method: arg.type || 'post',
    url: url,
    data: arg.data,
    headers: {
      ...headers,
      ...setAuthorization(),
    },
  });
};

export const apiErrorHandler = (error: any) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error?.message ?? 'Something went Wrong';
};

export const queryHandler = (req: Record<string, string | number>) => {
  let params = '';
  const keys = Object.keys(req) as Array<keyof typeof req>;
  keys.forEach((key) => {
    if (req[key]) {
      if (params.length === 0) {
        params += '?';
      } else {
        params += '&';
      }

      params += `${key}=${req[key]}`;
    }
  });
  return params;
};
