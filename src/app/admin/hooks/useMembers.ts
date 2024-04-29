import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest } from '@/service/swrHooks';
import { ServiceParams } from './types';
import { User } from '@/types';

const { GET_ALL } = ENDPOINTS.USER;

function useMembers(props: ServiceParams) {
  const getListSwr = useAuthGetRequest<User[]>(
    props?.get_all ? GET_ALL + props.query : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
    }
  );

  return { getListSwr };
}

export default useMembers;
