import { useState } from 'react';

import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';

type RequestType = 'get_invites' | 'decline_or_aprove';
type QueryType = 'status';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { GET_ALL_INVITE_BY_STATUS, APPROVE_REQUEST } = ENDPOINTS.PEOPLE;

function usePeople(props: Props) {
  const isQuery = props.status;
  const query = props.status || '';

  const [refreshList, setRefreshList] = useState(false);

  const revalidateListHandler = () => {
    setRefreshList(true);
    getAllInvitesSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const getAllInvitesSwr = useAuthGetRequest(
    (props?.get_invites && isQuery) || refreshList
      ? GET_ALL_INVITE_BY_STATUS(query)
      : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );

  const approveRequestSwr = useAuthRequest<null>(
    props?.decline_or_aprove ? APPROVE_REQUEST : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    getAllInvitesSwr,
    approveRequestSwr,
  };
}

export default usePeople;
