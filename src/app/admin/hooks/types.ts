type RequestType = 'create' | 'get_all' | 'get_id' | 'update' | 'delete';
type QueryType = '_id';
type OfficeQueryType = QueryType | 'parastatal';

export type OfficeServiceParams = Partial<Record<RequestType, boolean>> &
  Partial<Record<OfficeQueryType, string>>;

export type ServiceParams = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;
