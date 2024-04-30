type RequestType =
  | 'create'
  | 'get_all'
  | 'get_id'
  | 'update'
  | 'delete'
  | 'invite'
  | 'all_users';
type QueryType = '_id' | 'query';
type OfficeQueryType = QueryType | 'parastatal';

export type OfficeServiceParams = Partial<Record<RequestType, boolean>> &
  Partial<Record<OfficeQueryType, string>>;

export type ServiceParams = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

type RolesRequestType =
  | 'create_role'
  | 'get_all_roles'
  | 'get_all_permissions'
  | 'delete_specific_role'
  | 'update_role';

export type RoleProps = Partial<Record<RolesRequestType, boolean>> &
  Partial<Record<QueryType, string>>;
