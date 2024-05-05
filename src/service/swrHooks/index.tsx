import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { message } from 'antd';
import {
  makeAuthRequest,
  makeAuthFetch,
  makeRequest,
  makeGetRequest,
  apiErrorHandler,
} from '../request';
import {
  APIResponseErrorModel,
  APIResponseSuccessModel,
  apiRequestorArgs,
} from '@/types';
import { SWRFetcher, SWRMutation } from './types';

const errorMessageHandler = (error: APIResponseErrorModel) => {
  message.error(apiErrorHandler(error));
};

export const useAuthRequest = <T,>(url: string, options?: SWRMutation<T>) => {
  const { trigger, isMutating, data, error } = useSWRMutation<
    APIResponseSuccessModel<T>,
    APIResponseErrorModel,
    string,
    apiRequestorArgs
  >(url, makeAuthRequest, {
    ...options,
    onError: options?.onError || errorMessageHandler,
  });

  return {
    trigger,
    isMutating,
    data,
    error,
  };
};

export const useAuthGetRequest = <T,>(url: string, options?: SWRFetcher<T>) => {
  const { data, error, mutate, isValidating, isLoading } = useSWR<
    APIResponseSuccessModel<T>,
    APIResponseErrorModel
  >(url, makeAuthFetch, {
    ...options,
    onError: options?.onError || errorMessageHandler,
  });

  return {
    data,
    error,
    isLoading,
    revalidate: mutate,
    isValidating,
  };
};

export const useNonAuthRequest = <T,>(
  url: string,
  options?: SWRMutation<T>
) => {
  const { trigger, isMutating, data, error } = useSWRMutation<
    APIResponseSuccessModel<T>,
    APIResponseErrorModel,
    string,
    apiRequestorArgs
  >(url, makeRequest, {
    ...options,
    onError: options?.onError || errorMessageHandler,
  });

  return {
    trigger,
    isMutating,
    data,
    error,
  };
};

export const useNonAuthGetRequest = <T,>(
  url: string,
  options?: SWRFetcher<T>
) => {
  const { data, error, mutate, isValidating, isLoading } = useSWR<
    APIResponseSuccessModel<T>,
    APIResponseErrorModel
  >(url, makeGetRequest, {
    ...options,
    onError: options?.onError || errorMessageHandler,
  });

  return {
    data,
    error,
    isLoading,
    revalidate: mutate,
    isValidating,
  };
};

export const useServiceConfig = () => {
  const { mutate } = useSWRConfig();

  const actionSuccessHandler = (success: string) => {
    message.success(success);
  };

  const revalidateRequest = (key: string, success_message?: string) => {
    if (success_message) {
      actionSuccessHandler(success_message);
    }
    mutate(key);
  };

  return { revalidateRequest, actionSuccessHandler };
};

type PickTypes =
  | 'revalidateOnFocus'
  | 'revalidateOnMount'
  | 'revalidateIfStale'
  | 'errorRetryCount';

export const fetchOptions: Pick<SWRFetcher<any>, PickTypes> = {
  revalidateOnFocus: false,
  revalidateOnMount: true,
  revalidateIfStale: false,
  errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
};
