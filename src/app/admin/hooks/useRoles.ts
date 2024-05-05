import { ENDPOINTS } from '@/service/config/endpoint';
import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { RoleServiceArgs } from './types';
import { APIResponseSuccessModel, Role } from '../user-management/types';

const { CREATE, GET_ALL_ROLES, DELETE_SPECIFIC_ROLE, UPDATE } = ENDPOINTS.ROLES;

function useRoles(props: RoleServiceArgs) {
  const query = props._id || '';
  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL_ROLES, res.message);
  };

  const getAllRolesSwr = useAuthGetRequest<Role[]>(
    props?.can_get_all ? GET_ALL_ROLES : '',
    fetchOptions
  );
  const createRoleSwr = useAuthRequest<Role>(props?.can_create ? CREATE : '', {
    onSuccess: revalidateListHandler,
  });

  const updateRoleSwr = useAuthRequest<Role>(
    props?.can_update_by_id ? UPDATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const deleteRoleSwr = useAuthRequest<null>(
    props?.can_delete_by_id && query ? DELETE_SPECIFIC_ROLE(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    createRoleSwr,
    getAllRolesSwr: {
      ...getAllRolesSwr,
      data: getAllRolesSwr.data?.data || [],
      loading: getAllRolesSwr.isLoading || getAllRolesSwr.isValidating,
    },
    updateRoleSwr,
    deleteRoleSwr,
  };
}

export default useRoles;
