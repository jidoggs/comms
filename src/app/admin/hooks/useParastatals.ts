import useMessage from 'antd/es/message/useMessage';
import {
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import { AllParastatalType, ParastatalType } from '../types';
import { ServiceParams } from './types';
import { APIResponseSuccessModel } from '@/types';

const { CREATE, GET_ALL, UPDATE, INVITE } = ENDPOINTS.PARASTATALS;

function useParastatals(props: ServiceParams) {
  const { isPrimaryAdmin } = useSession();
  const { mutate } = useServiceConfig();
  const query = props._id ? queryHandler({ _id: props._id }) : '';
  const [message, messageContext] = useMessage();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    message.success(res.message);
    mutate(GET_ALL);
  };

  const createSwr = useAuthRequest<ParastatalType>(
    props?.create && isPrimaryAdmin ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<AllParastatalType>(
    props?.get_all && isPrimaryAdmin ? GET_ALL : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: true,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    }
  );

  const getItemSwr = useAuthGetRequest<ParastatalType>(
    props?.get_id && props?._id && isPrimaryAdmin ? UPDATE(query) : ''
  );

  const updateItemSwr = useAuthRequest<ParastatalType>(
    props?.update && props?._id && isPrimaryAdmin ? UPDATE(props._id) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && props?._id && isPrimaryAdmin ? UPDATE(props._id) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );
  const inviteUserSwr = useAuthRequest<null>(props?.invite ? INVITE : '', {
    onSuccess: (res) => {
      message.success(res.message);
    },
  });

  return {
    messageContext,
    createSwr,
    getListSwr,
    getItemSwr,
    updateItemSwr,
    deleteItemSwr,
    inviteUserSwr,
  };
}

export default useParastatals;
