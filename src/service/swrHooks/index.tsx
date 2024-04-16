import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';
import { message } from 'antd';
import {
  apiRequestorArgs,
  makeAuthRequest,
  makeAuthFetch,
  makeRequest,
  makeGetRequest,
  apiErrorHandler,
} from '../request';
import { APIResponseSuccessModel } from '@/types';

export const useAuthRequest = <T,>(url: string) => {
  const { trigger, isMutating, data, error } = useSWRMutation<
    APIResponseSuccessModel<T>,
    string,
    string,
    apiRequestorArgs
  >(url, makeAuthRequest, {
    onError: (error) => {
      message.error(apiErrorHandler(error));
    },
  });

  const response = data;

  return {
    trigger,
    isMutating,
    data: response,
    error,
  };
};

export const useAuthGetRequest = <T,>(
  url: string,
  options?: SWRConfiguration
) => {
  const { data, error, mutate, isValidating, isLoading } = useSWR<
    APIResponseSuccessModel<T>
  >(url, makeAuthFetch, {
    ...options,
    onError: (error) => {
      message.error(apiErrorHandler(error));
    },
  });

  return {
    data,
    error,
    isLoading,
    revalidate: mutate,
    isValidating,
  };
};

export const useNonAuthRequest = <T,>(url: string) => {
  const { trigger, isMutating, data, error } = useSWRMutation<
    APIResponseSuccessModel<T>,
    string,
    string,
    apiRequestorArgs
  >(url, makeRequest, {
    onError: (error) => {
      message.error(apiErrorHandler(error));
    },
  });

  const response = data;

  return {
    trigger,
    isMutating,
    data: response,
    error,
  };
};

export const useNonAuthGetRequest = <T,>(
  url: string,
  options?: SWRConfiguration
) => {
  const { data, error, mutate, isValidating, isLoading } = useSWR<
    APIResponseSuccessModel<T>
  >(url, makeGetRequest, {
    ...options,
    onError: (error) => {
      message.error(apiErrorHandler(error));
    },
  });

  return {
    data,
    error,
    isLoading,
    revalidate: mutate,
    isValidating,
  };
};
