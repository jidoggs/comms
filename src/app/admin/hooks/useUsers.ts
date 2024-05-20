import { useState } from 'react';

import { ENDPOINTS } from '@/service/config/endpoint';
import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CustomTableProps } from '@/common/components/CustomTable';
import { UserServiceArgs } from './types';
import { User } from '@/types';
import { queryHandler, searchQueryHandler } from '@/service/request';
import { DEFAULT_PARAMS } from '@/common/hooks/usePagination';

const { GET_ALL, SPECIFIC_USER, UPDATE } = ENDPOINTS.USER;

function useUsers(props?: UserServiceArgs) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const user_id = queryHandler({
    _id: props?._id,
  });

  const searchBy = ['email',"firstname","surname"];
  const search = searchQueryHandler(searchBy, props?.search || '');

  const query = queryHandler({
    search,
    sort: '-created_at',
    page: props?.page || DEFAULT_PARAMS.currentPage,
    limit: props?.limit || DEFAULT_PARAMS.itemPerPage,
  });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = () => {
    revalidateRequest(GET_ALL + query);
  };

  const getAllUsersSwr = useAuthGetRequest<User[]>(
    props?.can_get_all ? GET_ALL + query : '',
    fetchOptions
  );

  // const updateRoleSwr = useAuthRequest(props?.update_user ? UPDATE_USER : '', {
  //   onSuccess: revalidateListHandler,
  // });
  const getUserSwr = useAuthGetRequest<User[]>(
    props?.can_get_by_id && user_id ? GET_ALL + user_id : '',
    fetchOptions
  );

  const updateUserSwr = useAuthRequest<null>(
    props?.can_update_by_id ? UPDATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteRoleSwr = useAuthRequest<null>(
    props?.can_delete_by_id && props?._id ? SPECIFIC_USER(props._id) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const rowClickHandler: CustomTableProps<any>['onRow'] = (record) => ({
    onClick: () => {
      setSelectedUser(record);
    },
    style: { cursor: 'pointer' },
  });

  const handleCancel = () => {
    setSelectedUser(null);
  };

  return {
    getAllUsersSwr: {
      ...getAllUsersSwr,
      data: getAllUsersSwr.data?.data || [],
      loading: getAllUsersSwr.isLoading || getAllUsersSwr.isValidating,
      results: getAllUsersSwr.data?.results || 0,
    },
    getUserSwr,
    updateUserSwr,
    deleteRoleSwr,
    selectedUser,
    rowClickHandler,
    handleCancel,
  };
}

export default useUsers;
