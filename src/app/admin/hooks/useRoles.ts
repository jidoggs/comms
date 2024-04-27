import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { OfficeType } from '../types';
import { useState } from 'react';

type RequestType =
  | 'create'
  | 'get_all'
  | 'get_specific_role'
  | 'delete_specific_role'
  | 'add_permission_to_role'
  | 'update';
type QueryType = '_id' | 'role';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const {
  CREATE,
  GET_ALL,
  ADD_PERMISSION_TO_ROLE,
  // GET_SPECIFIC_ROLE,
  // DELETE_SPECIFIC_ROLE,
  UPDATE,
} = ENDPOINTS.ROLES;

const { VIEW_ALL_PERMISSIONS } = ENDPOINTS.PERMISSIONS;

function useRoles(props: Props) {
  const isQuery = props._id && props._id;
  const query = props._id || '';

  const [refreshList, setRefreshList] = useState(false); // stores state to trigger new list after CUD has been done

  const revalidateListHandler = () => {
    setRefreshList(true);
    getListSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const createRoleSwr = useAuthRequest(props?.create ? CREATE : '');
  const getListSwr = useAuthGetRequest(props?.get_all ? GET_ALL : '', {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    onSuccess: resetRefreshList,
  });
  const getAllPermissionsSwr = useAuthGetRequest(
    props?.get_all ? VIEW_ALL_PERMISSIONS : ''
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
  const deleteItemSwr = useAuthRequest<null>(
    props?.delete_specific_role && isQuery ? UPDATE(query) : ''
  );
  return {
    createRoleSwr,
    getListSwr,
    getAllPermissionsSwr,
    addPermissionSwr,
    getItemSwr,
    updateItemSwr,
    deleteItemSwr,
  };
}

export default useRoles;
