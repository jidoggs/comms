import useMessage from 'antd/es/message/useMessage';
import {
  useAuthGetRequest,
  useAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { AllOfficeType, OfficeType } from '../types';
import { ServiceParams } from './types';
import { APIResponseSuccessModel } from '@/types';

const { CREATE, GET_ALL, UPDATE, INVITE } = ENDPOINTS.DEPARTMENT;

function useDepartment(props: ServiceParams) {
  const { isBasicUser } = useSession();
  const { mutate } = useServiceConfig();
  const departmentId = props._id;
  const [message, messageContext] = useMessage();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    message.success(res.message);
    mutate(GET_ALL + props.query);
  };

  const createSwr = useAuthRequest<OfficeType>(
    props?.create && !isBasicUser ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<AllOfficeType>(
    props?.get_all ? GET_ALL + props.query : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    }
  );

  const getItemSwr = useAuthGetRequest<OfficeType>(
    props?.get_id && departmentId ? UPDATE(departmentId) : ''
  );

  const updateItemSwr = useAuthRequest<OfficeType>(
    props?.update && departmentId && !isBasicUser ? UPDATE(departmentId) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && departmentId && !isBasicUser ? UPDATE(departmentId) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const inviteUserSwr = useAuthRequest<null>(
    props?.invite && !isBasicUser ? INVITE : '',
    {
      onSuccess: (res) => {
        message.success(res.message);
      },
    }
  );

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

export default useDepartment;
