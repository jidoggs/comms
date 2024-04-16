import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL as API_URL, REQUEST_TIMEOUT } from '../config/constant';
import { fetchUserToken, clearData, fetchRefreshToken } from '../storage';
import { APIResponseSuccessModel } from '../../types';
import { FetcherResponse } from 'swr/_internal';

export type apiRequestorArgs<T = object> = {
  data: T;
  type?: 'post' | 'put' | 'patch' | 'delete';
};

/** general headers **/
const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/** authorization header for logged in user **/
const setAuthorization = () => ({
  Authorization: `Bearer ${fetchUserToken()}`,
});

const setRefreshToken = (url: string) => {
  return url.includes('refresh/token')
    ? {
        'X-Refresh-Token': fetchRefreshToken(),
      }
    : {};
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
  ({ data }: AxiosResponse): AxiosResponse<APIResponseSuccessModel> => {
    return data;
  },
  (error: AxiosError) => {
    if (error.code === 'ERR_CANCELED') {
      return Promise.reject({});
    }
    if (error.response?.status !== undefined && error.response.status >= 500) {
      return Promise.reject({
        message: 'Server Error',
      });
    }
    if (error.response?.status === 401) {
      if (window.location.pathname.includes('auth')) {
        return Promise.reject(error.response.data);
      }

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
export const makeGetRequest: FetcherResponse<any> = async (url: string) => {
  return await instance.request({
    method: 'get',
    url,
    headers,
  });
};

/** make an axios post request **/
export const makeRequest: FetcherResponse<any> = async (
  url: string,
  { arg }: { arg: apiRequestorArgs }
) => {
  return await instance.request({
    method: arg.type || 'post',
    url: url,
    data: arg.data,
    headers,
  });
};

export const makeAuthFetch: FetcherResponse<any> = async (url: string) => {
  return await instance.request({
    method: 'get',
    url: url,
    headers: {
      ...headers,
      ...setAuthorization(),
      ...setRefreshToken(url),
    },
  });
};

export const makeAuthRequest: FetcherResponse<any> = async (
  url: string,
  { arg }: { arg: apiRequestorArgs }
) => {
  try {
    const response = await instance.request({
      method: arg.type || 'post',
      url: url,
      data: arg.data,
      headers: {
        ...headers,
        ...setAuthorization(),
      },
    });
    return {
      data: response.data,
      success: true,
      message: 'Success',
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const apiErrorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  } else {
    return error?.message;
  }
};
