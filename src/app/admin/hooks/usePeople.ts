import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
  fetchOptions,
} from '@/service/swrHooks';
import { APIResponseSuccessModel, User } from '@/types';
import { queryHandler } from '@/service/request';

type RequestType = 'can_get_all_invites' | 'can_approve';
type QueryType = 'status' | 'search';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { GET_ALL_INVITE_BY_STATUS, APPROVE_REQUEST } = ENDPOINTS.PEOPLE;

function usePeople(props: Props) {
  const query = queryHandler({ search: props.search, status: props.status });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL_INVITE_BY_STATUS(query), res.message);
  };

  const getAllSwr = useAuthGetRequest<User[]>(
    props?.can_get_all_invites && query ? GET_ALL_INVITE_BY_STATUS(query) : '',
    fetchOptions
  );

  const approveRequestSwr = useAuthRequest<null>(
    props?.can_approve ? APPROVE_REQUEST : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    getAllSwr,
    approveRequestSwr,
  };
}

export default usePeople;
