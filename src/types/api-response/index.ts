/* eslint-disable no-unused-vars */
export type APIResponseSuccessModel<T = unknown> = {
  results?: number;
  data: T;
  message: string;
  success: true;
};
export type APIResponseErrorModel = {
  data: null;
  message: string;
  error: true;
};

export type Promolve<ResT = void, RejT = Error> = {
  promise: Promise<ResT>;
  resolve: (value: ResT | PromiseLike<ResT>) => void;
  reject: (value: RejT) => void;
};

export type BaseDataModel = {
  created_at: string;
  deleted_at: string;
  id: string;
  updated_at: string;
};

export type BaseStoreItemModel<T> = {
  data: T;
  loading: boolean;
  page?: number;
  limit?: number;
  total?: number
};

export type PaginatedData<T> = {
  page: number;
  limit: number;
  total: number;
  list: Array<T>;
};
