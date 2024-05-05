import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import { ParastatalType } from '../types';
import { ServiceParams } from './types';
import { APIResponseSuccessModel } from '@/types';

const { CREATE, GET_ALL, UPDATE, INVITE } = ENDPOINTS.PARASTATALS;

function useParastatals(props: ServiceParams) {
  const { isPrimaryAdmin } = useSession();
  const { revalidateRequest, actionSuccessHandler } = useServiceConfig();
  const query = props._id ? queryHandler({ _id: props._id }) : '';

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL, res.message);
  };

  const messageOnlyHandler = (res: APIResponseSuccessModel) => {
    actionSuccessHandler(res.message);
  };

  const createSwr = useAuthRequest<ParastatalType>(
    props?.can_create && isPrimaryAdmin ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<ParastatalType[]>(
    props?.can_get_all && isPrimaryAdmin ? GET_ALL : '',
    fetchOptions
  );

  const getItemSwr = useAuthGetRequest<ParastatalType>(
    props?.can_get_by_id && props?._id ? UPDATE(query) : '',
    fetchOptions
  );

  const updateItemSwr = useAuthRequest<ParastatalType>(
    props?.can_update_by_id && props?._id && isPrimaryAdmin
      ? UPDATE(props._id)
      : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.can_delete_by_id && props?._id && isPrimaryAdmin
      ? UPDATE(props._id)
      : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const inviteUserSwr = useAuthRequest<null>(props?.can_invite ? INVITE : '', {
    onSuccess: messageOnlyHandler,
  });

  return {
    createSwr,
    getListSwr,
    getItemSwr,
    updateItemSwr,
    deleteItemSwr,
    inviteUserSwr,
  };
}

export default useParastatals;
