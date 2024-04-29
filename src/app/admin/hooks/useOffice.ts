import { useState } from 'react';
import useMessage from 'antd/es/message/useMessage';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { AllOfficeType, OfficeType } from '../types';
import { OfficeServiceParams } from './types';

const { CREATE, GET_ALL, UPDATE, INVITE } = ENDPOINTS.OFFICE;

function useOffice(props: OfficeServiceParams) {
  const [refreshList, setRefreshList] = useState(false); // stores state to trigger new list after CUD has been done
  const { isBasicUser } = useSession();
  const officeId = props._id;
  const [message, messageContext] = useMessage();

  const revalidateListHandler = () => {
    setRefreshList(true);
    getListSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const createSwr = useAuthRequest<OfficeType>(
    props?.create && !isBasicUser ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<AllOfficeType>(
    props?.get_all || refreshList ? GET_ALL + props.query : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );

  const getItemSwr = useAuthGetRequest<OfficeType>(
    props?.get_id && officeId ? UPDATE(officeId) : ''
  );

  const updateItemSwr = useAuthRequest<OfficeType>(
    props?.update && officeId && !isBasicUser ? UPDATE(officeId) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && officeId && !isBasicUser ? UPDATE(officeId) : '',
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

export default useOffice;
