import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { queryHandler } from '@/service/request';
import { AllOfficeType, OfficeType } from '../types';

type RequestType = 'create' | 'get_all' | 'get_id' | 'update' | 'delete';
type QueryType = '_id' | 'parastatal';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { CREATE, GET_ALL, UPDATE } = ENDPOINTS.OFFICE;

function useOffice(props: Props) {
  const isQuery = props._id && props.parastatal;
  const query =
    props._id && props.parastatal
      ? queryHandler({ _id: props._id, parastatal: props.parastatal })
      : '';

  const createSwr = useAuthRequest<OfficeType>(props?.create ? CREATE : '');
  const getListSwr = useAuthGetRequest<AllOfficeType>(
    props?.get_all ? GET_ALL : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    }
  );
  const getItemSwr = useAuthGetRequest<OfficeType>(
    props?.get_id && isQuery ? UPDATE(query) : ''
  );
  const updateItemSwr = useAuthRequest<OfficeType>(
    props?.update && isQuery ? UPDATE(query) : ''
  );
  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && isQuery ? UPDATE(query) : ''
  );
  return { createSwr, getListSwr, getItemSwr, updateItemSwr, deleteItemSwr };
}

export default useOffice;
