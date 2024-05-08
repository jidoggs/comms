import { ENDPOINTS } from '@/service/config/endpoint';
import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { RoleServiceArgs } from './types';
import {
  APIResponseSuccessModel,
  BaseDataType,
  Role,
} from '../user-management/types';
import { useCallback, useState } from 'react';

const {
  CREATE,
  GET_ALL_ROLES,
  DELETE_SPECIFIC_ROLE,
  GET_ALL_ROLES_BY_NAME,
  UPDATE,
} = ENDPOINTS.ROLES;

function useRoles(props: RoleServiceArgs) {
  const query = props._id || '';
  // const nameQuery = props.name || '';
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL_ROLES, res.message);
  };

  const updateAllRolesHandler = useCallback(
    (_id: string, update: Partial<Omit<Role, BaseDataType>>) => {
      const updatedRoles = allRoles.map((role) =>
        role._id === _id ? { ...role, ...update } : role
      );
      setAllRoles(updatedRoles);
    },
    []
  );

  const addNewRoleHandler = useCallback(
    (role: Role) => {
      setAllRoles((prevRoles) => [role, ...prevRoles]);
    },
    [setAllRoles]
  );

  const deleteSpecificRole = useCallback(
    (_id: string) => {
      const newRoles = allRoles.filter((r) => r._id !== _id);
      setAllRoles(newRoles);
    },
    [allRoles]
  );

  const getAllRolesSwr = useAuthGetRequest<Role[]>(
    props?.can_get_all ? GET_ALL_ROLES : '',
    {
      ...fetchOptions,
      onSuccess: (res) => {
        const temp =
          res?.data.sort((a, b) => {
            if (a.created_at < b.created_at) {
              return 1;
            } else if (a.created_at > b.created_at) {
              return -1;
            } else {
              return 0;
            }
          }) || [];
        setAllRoles(temp);
      },
    }
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
      data: allRoles,
      loading: getAllRolesSwr.isLoading || getAllRolesSwr.isValidating,
    },
    // getAllRolesByNameSwr,
    updateRoleSwr,
    deleteRoleSwr,
    updateAllRolesHandler,
    addNewRoleHandler,
    deleteSpecificRole,
  };
}

export default useRoles;
