import { GenericServiceParam } from '@/types';

type GetUpdateDelete =
  | 'can_get_all'
  | 'can_get_by_id'
  | 'can_delete_by_id'
  | 'can_update_by_id';

type Create = 'can_create';

type RequestType = Create | GetUpdateDelete;

type QueryType = '_id' | 'search' | 'status';

export type ServiceParams = GenericServiceParam<RequestType, QueryType>;

export type RecipientParams = { recipient: string };

export type CorrespondenceServiceArgs = GenericServiceParam<
  Create | GetUpdateDelete,
  QueryType
>;
