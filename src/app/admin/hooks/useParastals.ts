import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { queryHandler } from '@/service/request';
import { AllParastatalType, ParastatalType } from '../types';

type RequestType = 'create' | 'get_all' | 'get_id' | 'update' | 'delete';
type QueryType = '_id';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { CREATE, GET_ALL, UPDATE } = ENDPOINTS.PARASTATALS;

function useParastals(props: Props) {
  const query = props._id ? queryHandler({ _id: props._id }) : '';

  const createSwr = useAuthRequest<ParastatalType>(props?.create ? CREATE : '');
  const getListSwr = useAuthGetRequest<AllParastatalType>(
    props?.get_all ? GET_ALL : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    }
  );
  const getItemSwr = useAuthGetRequest<ParastatalType>(
    props?.get_id && props?._id ? UPDATE(query) : ''
  );
  const updateItemSwr = useAuthRequest<ParastatalType>(
    props?.update && props?._id ? UPDATE(query) : ''
  );
  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && props?._id ? UPDATE(query) : ''
  );
  return { createSwr, getListSwr, getItemSwr, updateItemSwr, deleteItemSwr };
}

export default useParastals;
