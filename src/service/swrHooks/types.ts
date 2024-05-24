import { SWRConfiguration } from 'swr';
import { SWRMutationConfiguration, SWRMutationHook } from 'swr/mutation';
import {
  APIResponseErrorModel,
  APIResponseSuccessModel,
  Request,
  apiRequestorArgs,
} from '@/types';

export type SWRMutation<T> = SWRMutationConfiguration<
  APIResponseSuccessModel<T>,
  APIResponseErrorModel,
  string,
  apiRequestorArgs,
  APIResponseSuccessModel<T>
>;
export type SWRFetcher<T> = SWRConfiguration<
  APIResponseSuccessModel<T>,
  APIResponseErrorModel,
  Request
>;

export interface SocketFormProps<T = any> {
  // formId: string;
  formEvent: string;
  emitValue: T;
  listenValue: T;
  onEvent?: (eventName: string, data: any) => void;
}
