import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { OfficeType } from '../types';
import { useState } from 'react';

type RequestType =
  | 'create'
  | 'get_all_roles'
  | 'get_all_permissions'
  | 'get_specific_role'
  | 'delete_specific_role'
  | 'add_permission_to_role'
  | 'update';
type QueryType = '_id' | 'role';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const {
  CREATE,
  GET_ALL_ROLES,
  // GET_ALL_PERMISSIONS,
  ADD_PERMISSION_TO_ROLE,
  // GET_SPECIFIC_ROLE,
  // DELETE_SPECIFIC_ROLE,
  UPDATE,
} = ENDPOINTS.ROLES;

const { VIEW_ALL_PERMISSIONS } = ENDPOINTS.PERMISSIONS;

function useRoles(props: Props) {
  const isQuery = props._id;
  const query = props._id || '';

  const [refreshList, setRefreshList] = useState(false); // stores state to trigger new list after CUD has been done

  const revalidateListHandler = () => {
    setRefreshList(true);
    getAllRolesSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const createRoleSwr = useAuthRequest(props?.create ? CREATE : '');
  const getAllRolesSwr = useAuthGetRequest(
    props?.get_all_roles ? GET_ALL_ROLES : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      // onSuccess: resetRefreshList,
    }
  );
  const getAllPermissionsSwr = useAuthGetRequest(
    props?.get_all_permissions ? VIEW_ALL_PERMISSIONS : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      // onSuccess: resetRefreshList,
    }
  );
  const addPermissionSwr = useAuthRequest(
    props?.add_permission_to_role ? ADD_PERMISSION_TO_ROLE : ''
  );
  const getItemSwr = useAuthGetRequest<OfficeType>(
    props?.get_specific_role && isQuery ? UPDATE(query) : ''
  );
  const updateItemSwr = useAuthRequest<OfficeType>(
    props?.update && isQuery ? UPDATE(query) : ''
  );
  const deleteRoleSwr = useAuthRequest<null>(
    props?.delete_specific_role && isQuery ? UPDATE(query) : ''
  );
  return {
    createRoleSwr,
    getAllRolesSwr,
    getAllPermissionsSwr,
    addPermissionSwr,
    getItemSwr,
    updateItemSwr,
    deleteRoleSwr,
  };
}

export default useRoles;
