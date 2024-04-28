import { useState } from 'react';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';
import { useSession } from '@/common/hooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { queryHandler } from '@/service/request';
import { AllParastatalType, ParastatalType } from '../types';
import { ServiceParams } from './types';

const { CREATE, GET_ALL, UPDATE } = ENDPOINTS.PARASTATALS;

function useParastatals(props: ServiceParams) {
  const [refreshList, setRefreshList] = useState(false); // stores state to trigger new list after CUD has been done
  const { isPrimaryAdmin } = useSession();
  const query = props._id ? queryHandler({ _id: props._id }) : '';

  const revalidateListHandler = () => {
    setRefreshList(true);
    getListSwr.revalidate();
  };

  const resetRefreshList = () => {
    if (refreshList) {
      setRefreshList(false);
    }
  };

  const createSwr = useAuthRequest<ParastatalType>(
    props?.create && isPrimaryAdmin ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<AllParastatalType>(
    (props?.get_all && isPrimaryAdmin) || refreshList ? GET_ALL : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess: resetRefreshList,
    }
  );

  const getItemSwr = useAuthGetRequest<ParastatalType>(
    props?.get_id && props?._id && isPrimaryAdmin ? UPDATE(query) : ''
  );

  const updateItemSwr = useAuthRequest<ParastatalType>(
    props?.update && props?._id && isPrimaryAdmin ? UPDATE(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const deleteItemSwr = useAuthRequest<null>(
    props?.delete && props?._id && isPrimaryAdmin ? UPDATE(query) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  return { createSwr, getListSwr, getItemSwr, updateItemSwr, deleteItemSwr };
}

export default useParastatals;
