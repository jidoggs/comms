import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { OfficeType } from '../types';
import { useState } from 'react';

type RequestType =
  | 'create_role'
  | 'get_all_roles'
  | 'get_all_permissions'
  | 'delete_specific_role'
  | 'update_role';
type QueryType = '_id' | 'role';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { CREATE, GET_ALL_ROLES, DELETE_SPECIFIC_ROLE, UPDATE } = ENDPOINTS.ROLES;

const { VIEW_ALL_PERMISSIONS } = ENDPOINTS.PERMISSIONS;

function useRoles(props: Props) {
  const isQuery = props._id;
  const query = props._id || '';

  const [refreshList, setRefreshList] = useState(false);

  const revalidateListHandler = () => {
    setRefreshList(true);
    getAllRolesSwr.revalidate();
    getAllPermissionsSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const getAllRolesSwr = useAuthGetRequest(
    props?.get_all_roles || refreshList ? GET_ALL_ROLES : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );
  const createRoleSwr = useAuthRequest(props?.create_role ? CREATE : '', {
    onSuccess: revalidateListHandler,
  });
  const getAllPermissionsSwr = useAuthGetRequest(
    props?.get_all_permissions ? VIEW_ALL_PERMISSIONS : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );
  const updateRoleSwr = useAuthRequest(
    props?.update_role && isQuery ? UPDATE(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const deleteRoleSwr = useAuthRequest<null>(
    props?.delete_specific_role && isQuery ? DELETE_SPECIFIC_ROLE(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return {
    createRoleSwr,
    getAllRolesSwr,
    getAllPermissionsSwr,
    updateRoleSwr,
    deleteRoleSwr,
  };
}

export default useRoles;
