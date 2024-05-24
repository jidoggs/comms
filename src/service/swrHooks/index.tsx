import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import useSwrSubscription from 'swr/subscription';
import {
  makeAuthRequest,
  makeAuthFetch,
  makeRequest,
  makeGetRequest,
  apiErrorHandler,
  makeAuthRequestWithFormData,
} from '../request';
import {
  APIResponseErrorModel,
  APIResponseSuccessModel,
  apiRequestorArgs,
} from '@/types';
import { SWRFetcher, SWRMutation, SocketFormProps } from './types';
import { messageHandler } from '@/common/utils/notification';
import { socket } from '../socket';
import { useEffect } from 'react';

const errorMessageHandler = (error: APIResponseErrorModel) => {
  messageHandler('error', apiErrorHandler(error));
};

export const useFormDataAuthRequest = <T,>(
  url: string,
  options?: SWRMutation<T>
) => {
  const { trigger, isMutating, data, error } = useSWRMutation<
    APIResponseSuccessModel<T>,
    APIResponseErrorModel,
    string,
    apiRequestorArgs
  >(url, makeAuthRequestWithFormData, {
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

export const useSocketForm = <T,>(props: SocketFormProps<T>) => {
  const emitFormSubmit = (data: T) => {
    socket.emit(`${props.formEvent}`, data);
// socket.connect({})
  };

  const data = useSwrSubscription<T>(`${props.formEvent}`, (mutate: any) =>
    socket.on(`${props.formEvent}`, mutate)
  );

  const handleSocketEvent = (eventName: string, eventData: any) => {
    if (props.onEvent && eventName !== `${props.formEvent}`) {
      props.onEvent(eventName, eventData);
    }
  };

  useEffect(() => {
    socket.on('event', handleSocketEvent); // Listen to all events

    // Cleanup function to disconnect from socket on unmount
    return () => {
      socket.disconnect();
      socket.off('event', handleSocketEvent); // Remove event listener
    };
  }, []);

  return { emitFormSubmit, data, unsubscribe: socket.disconnect };
};

export const useServiceConfig = () => {
  const { mutate } = useSWRConfig();

  const actionSuccessHandler = (success: string) => {
    messageHandler('success', success);
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
  revalidateIfStale: true,
  errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
};
