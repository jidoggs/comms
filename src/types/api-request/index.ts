import { FetcherResponse } from 'swr/_internal';
import {
  APIResponseErrorModel,
  APIResponseSuccessModel,
} from '../api-response';
import { TriggerWithArgs } from 'swr/mutation';

export type apiRequestorArgs<T = object> = {
  data?: T;
  type?: 'post' | 'put' | 'patch' | 'delete';
};

export type Request = (
  key: string,
  options: Readonly<{ arg: apiRequestorArgs }>
) => FetcherResponse<APIResponseSuccessModel<any>>;

export type Mutate<T = any> = TriggerWithArgs<
  APIResponseSuccessModel<T>,
  APIResponseErrorModel,
  string,
  apiRequestorArgs
>;
