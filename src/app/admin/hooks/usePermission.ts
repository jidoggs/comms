import { fetchOptions, useAuthGetRequest } from '@/service/swrHooks';
import { Permission } from '../user-management/types';
import { ENDPOINTS } from '@/service/config/endpoint';
import { PermissionServiceArgs } from './types';

const { VIEW_ALL_PERMISSIONS } = ENDPOINTS.PERMISSIONS;

function usePermissions(args: PermissionServiceArgs) {
  const getAllPermissionsSwr = useAuthGetRequest<Permission[]>(
    args?.can_get_all ? VIEW_ALL_PERMISSIONS : '',
    fetchOptions
  );
  return {
    getAllPermissionsSwr: {
      ...getAllPermissionsSwr,
      data: getAllPermissionsSwr.data?.data || [],
      loading:
        getAllPermissionsSwr.isLoading || getAllPermissionsSwr.isValidating,
    },
  };
}

export default usePermissions;
