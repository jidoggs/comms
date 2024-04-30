import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { AllPermissionType, AllRoleType, OfficeType, RoleType } from '../types';
import { useState } from 'react';
import { RoleProps } from './types';
// import { RoleProps } from './types';

const { CREATE, GET_ALL_ROLES, DELETE_SPECIFIC_ROLE, UPDATE } = ENDPOINTS.ROLES;

const { VIEW_ALL_PERMISSIONS } = ENDPOINTS.PERMISSIONS;

function useRoles(props: RoleProps) {
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

  const getAllRolesSwr = useAuthGetRequest<AllRoleType>(
    props?.get_all_roles || refreshList ? GET_ALL_ROLES : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );
  const createRoleSwr = useAuthRequest<RoleType>(
    props?.create_role ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const getAllPermissionsSwr = useAuthGetRequest<AllPermissionType>(
    props?.get_all_permissions ? VIEW_ALL_PERMISSIONS : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );
  const updateRoleSwr = useAuthRequest<RoleType>(
    props?.update_role ? UPDATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const deleteRoleSwr = useAuthRequest<RoleType>(
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
