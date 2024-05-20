import { GenericServiceParam } from '@/types';

type GetUpdateDelete =
  | 'can_get_all'
  | 'can_get_by_id'
  | 'can_delete_by_id'
  | 'can_update_by_id';

type Invite = 'can_invite';
type Create = 'can_create';

type RequestType = Create | GetUpdateDelete | Invite;

type QueryType = '_id' | 'query' | 'search';
type OfficeQueryType = QueryType | 'parastatal';
type PaginationType = 'page' | 'limit';

export type OfficeServiceParams = GenericServiceParam<
  RequestType,
  OfficeQueryType
>;

export type ServiceParams = GenericServiceParam<RequestType, QueryType>;

export type RoleServiceArgs = GenericServiceParam<
  Create | GetUpdateDelete,
  QueryType
>;

export type UserServiceArgs = GenericServiceParam<
  GetUpdateDelete,
  QueryType,
  PaginationType
>;

export type PermissionServiceArgs = GenericServiceParam<RequestType, QueryType>;
