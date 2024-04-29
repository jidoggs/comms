import { useState } from 'react';

import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';

type RequestType = 'get_all_users' | 'get_user' | 'delete_user' | 'update_user';
type QueryType = '_id' | 'user';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { GET_ALL_USERS, GET_SPECIFIC_USER, DELETE_USER, UPDATE_USER } =
  ENDPOINTS.USERS;

function useUsers(props: Props) {
  const isQuery = props._id;
  const query = props._id || '';

  const [refreshList, setRefreshList] = useState(false);

  const revalidateListHandler = () => {
    setRefreshList(true);
    getAllUsersSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const getAllUsersSwr = useAuthGetRequest(
    props?.get_all_users || refreshList ? GET_ALL_USERS : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );

  // const updateRoleSwr = useAuthRequest(props?.update_user ? UPDATE_USER : '', {
  //   onSuccess: revalidateListHandler,
  // });
  const deleteRoleSwr = useAuthRequest<null>(
    props?.delete_user && isQuery ? DELETE_USER(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    getAllUsersSwr,
    // updateUserSwr,
    deleteRoleSwr,
  };
}

export default useUsers;
