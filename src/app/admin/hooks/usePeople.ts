import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
  fetchOptions,
} from '@/service/swrHooks';
import { APIResponseSuccessModel, GenericServiceParam, User } from '@/types';
import { queryHandler, searchQueryHandler } from '@/service/request';
import { DEFAULT_PARAMS } from '@/common/hooks/usePagination';
import { useTabChange } from '@/common/hooks';

type RequestType = 'can_get_all_invites' | 'can_approve' | 'can_decline';
type QueryType = 'search';
type PaginationType = 'page' | 'limit';

type Props = GenericServiceParam<RequestType, QueryType, PaginationType>;

const { GET_ALL_INVITE_BY_STATUS, APPROVE_REQUEST, DECLINE_REQUEST } =
  ENDPOINTS.PEOPLE;

function usePeople(props: Props) {
  const searchBy = ['email'];
  const search = searchQueryHandler(searchBy, props.search || '');
  const { currentTab } = useTabChange();

  const query = queryHandler({
    search,
    status: currentTab,
    sort: '-created_at',
    page: props.page || DEFAULT_PARAMS.currentPage,
    limit: props.limit || DEFAULT_PARAMS.itemPerPage,
  });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL_INVITE_BY_STATUS(query), res.message);
  };

  const getAllSwr = useAuthGetRequest<User[]>(
    props?.can_get_all_invites && currentTab
      ? GET_ALL_INVITE_BY_STATUS(query)
      : '',
    fetchOptions
  );

  const approveRequestSwr = useAuthRequest<null>(
    props?.can_approve ? APPROVE_REQUEST : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const declineRequestSwr = useAuthRequest<null>(
    props?.can_decline ? DECLINE_REQUEST : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    getAllSwr,
    approveRequestSwr,
    declineRequestSwr,
  };
}

export default usePeople;
