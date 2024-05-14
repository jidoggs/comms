import { useState } from 'react';
import { ENDPOINTS } from '@/service/config/endpoint';
import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { Role } from '../user-management/types';
import { queryHandler, searchQueryHandler } from '@/service/request';
import { RoleServiceArgs } from './types';
import { APIResponseSuccessModel } from '@/types';

const { CREATE, GET_ALL_ROLES, SPECIFIC_ROLE, UPDATE } = ENDPOINTS.ROLES;

function useRoles(props: RoleServiceArgs) {
  const [addNewRole, setAddNewRole] = useState(false);

  const searchBy = ['name'];
  const search = searchQueryHandler(searchBy, props?.search || '');

  const query = queryHandler({ search, sort: 'created_at' });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL_ROLES + query, res.message);
  };

  const createRoleSwr = useAuthRequest<Role>(props?.can_create ? CREATE : '', {
    onSuccess: revalidateListHandler,
  });

  const getAllRolesSwr = useAuthGetRequest<Role[]>(
    props?.can_get_all ? GET_ALL_ROLES + query : '',
    {
      ...fetchOptions,
      onSuccess: () => {
        if (!addNewRole) return;
        setAddNewRole(false);
      },
    }
  );

  const getRoleSwr = useAuthGetRequest<Role>(
    props?.can_get_by_id && props._id ? SPECIFIC_ROLE(props._id) : '',
    fetchOptions
  );

  const updateRoleSwr = useAuthRequest<Role>(
    props?.can_update_by_id ? UPDATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteRoleSwr = useAuthRequest<null>(
    props?.can_delete_by_id && props._id ? SPECIFIC_ROLE(props._id) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const addNewRoleHandler = () => {
    if (getAllRolesSwr.isLoading || getAllRolesSwr.isValidating) {
      return;
    }
    setAddNewRole(true);
  };

  return {
    createRoleSwr,
    getAllRolesSwr: {
      ...getAllRolesSwr,
      data:
        getAllRolesSwr.data?.data?.sort((a, b) =>
          b?.created_at?.localeCompare(a?.created_at)
        ) || [],
      loading: getAllRolesSwr.isLoading || getAllRolesSwr.isValidating,
    },
    getRoleSwr,
    updateRoleSwr,
    deleteRoleSwr,
    addNewRoleHandler,
    addNewRole,
  };
}

export default useRoles;
