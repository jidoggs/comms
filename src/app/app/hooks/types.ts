import { BaseDataModel } from '../correspondence/types';

type GetUpdateDelete =
  | 'can_get_all'
  | 'can_get_by_id'
  | 'can_delete_by_id'
  | 'can_update_by_id';

type Create = 'can_create';

type RequestType = Create | GetUpdateDelete;

type QueryType = '_id' | 'query' | 'search';

type GenericServiceParam<A extends string, Q extends string> = Partial<
  Record<A, boolean>
> &
  Partial<Record<Q, string>>;

export interface CorrespondenceType extends BaseDataModel {
  _id: string;
  name: string;
  active: boolean;
  // permissions: Permission[];
}
// CorrespondenceType;

export type ServiceParams = GenericServiceParam<RequestType, QueryType>;

export type CorrespondenceServiceArgs = GenericServiceParam<
  Create | GetUpdateDelete,
  QueryType
>;

export type UserServiceArgs = GenericServiceParam<GetUpdateDelete, QueryType>;
