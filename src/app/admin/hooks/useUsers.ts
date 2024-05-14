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

const { GET_ALL, SPECIFIC_USER } = ENDPOINTS.USER;

function useUsers(props?: UserServiceArgs) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const user_id = props?._id || '';

  const searchBy = ['email'];
  const search = searchQueryHandler(searchBy, props?.search || '');

  const query = queryHandler({ search, sort: 'created_at' });

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
  const deleteRoleSwr = useAuthRequest<null>(
    props?.can_delete_by_id && user_id ? SPECIFIC_USER(user_id) : '',
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
    },
    deleteRoleSwr,
    selectedUser,
    rowClickHandler,
    handleCancel,
  };
}

export default useUsers;
