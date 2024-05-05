import { ENDPOINTS } from '@/service/config/endpoint';
import { fetchOptions, useAuthGetRequest } from '@/service/swrHooks';
import { ServiceParams } from './types';
import { User } from '@/types';

const { GET_ALL } = ENDPOINTS.USER;

function useMembers(props: ServiceParams) {
  const getListSwr = useAuthGetRequest<User[]>(
    props?.can_get_all ? GET_ALL + props.query : '',
    fetchOptions
  );

  return { getListSwr };
}

export default useMembers;
