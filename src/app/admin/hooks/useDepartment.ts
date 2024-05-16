import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import { ServiceParams } from './types';
import { DepartmentType } from '../types';
import { APIResponseSuccessModel } from '@/types';

const { CREATE, GET_ALL, UPDATE, INVITE } = ENDPOINTS.DEPARTMENT;

function useDepartment(props: ServiceParams) {
  const { isBasicUser } = useSession();
  const { revalidateRequest, actionSuccessHandler } = useServiceConfig();
  const departmentId = props._id;
  const getById = queryHandler({ _id: props._id });

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL + props.query, res.message);
  };

  const messageOnlyHandler = (res: APIResponseSuccessModel) => {
    actionSuccessHandler(res.message);
  };

  const createSwr = useAuthRequest<DepartmentType>(
    props?.can_create && !isBasicUser ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<DepartmentType[]>(
    props?.can_get_all ? GET_ALL + props.query : '',
    fetchOptions
  );

  const getItemSwr = useAuthGetRequest<DepartmentType>(
    props?.can_get_by_id && departmentId ? UPDATE(getById) : '',
    fetchOptions
  );

  const updateItemSwr = useAuthRequest<DepartmentType>(
    props?.can_update_by_id && departmentId && !isBasicUser
      ? UPDATE(departmentId)
      : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.can_delete_by_id && departmentId && !isBasicUser
      ? UPDATE(departmentId)
      : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const inviteUserSwr = useAuthRequest<null>(
    props?.can_invite && !isBasicUser ? INVITE : '',
    {
      onSuccess: messageOnlyHandler,
    }
  );

  return {
    createSwr,
    getListSwr,
    getItemSwr,
    updateItemSwr,
    deleteItemSwr,
    inviteUserSwr,
  };
}

export default useDepartment;
