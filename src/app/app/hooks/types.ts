import { GenericServiceParam } from '@/types';

type GetUpdateDelete =
  | 'can_get_all'
  | 'can_get_all_recipients'
  | 'can_get_by_id'
  | 'can_delete_by_id'
  | 'can_update_by_id';

type Create = 'can_create';

type RequestType = Create | GetUpdateDelete;

type QueryType = '_id' | 'search' | 'status' | 'recipient';

export type ServiceParams = GenericServiceParam<RequestType, QueryType>;

export type CorrespondenceServiceArgs = GenericServiceParam<
  Create | GetUpdateDelete,
  QueryType
>;
