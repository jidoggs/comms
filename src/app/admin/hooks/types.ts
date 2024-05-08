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

type GenericServiceParam<A extends string, Q extends string> = Partial<
  Record<A, boolean>
> &
  Partial<Record<Q, string>>;

export type OfficeServiceParams = GenericServiceParam<
  RequestType,
  OfficeQueryType
>;

export type ServiceParams = GenericServiceParam<RequestType, QueryType>;

export type RoleServiceArgs = GenericServiceParam<
  Create | GetUpdateDelete,
  QueryType
>;

export type UserServiceArgs = GenericServiceParam<GetUpdateDelete, QueryType>;

export type PermissionServiceArgs = GenericServiceParam<RequestType, QueryType>;
