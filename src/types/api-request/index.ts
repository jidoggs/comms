import { FetcherResponse } from 'swr/_internal';
import { APIResponseSuccessModel } from '../api-response';

export type apiRequestorArgs<T = object> = {
  data: T;
  type?: 'post' | 'put' | 'patch' | 'delete';
};

export type Request = (
  key: string,
  options: Readonly<{ arg: apiRequestorArgs }>
) => FetcherResponse<APIResponseSuccessModel<any>>;
