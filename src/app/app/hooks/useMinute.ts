import {
  fetchOptions,
  useAuthGetRequest,
  useFormDataAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CorrespondenceServiceArgs } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';
import { MinuteData } from '@/types';
import { queryHandler } from '@/service/request';

const { CREATE, GET_ALL, GET_ALL_IN_CORR } = ENDPOINTS.MINUTE;

const useMinute = (props: CorrespondenceServiceArgs) => {
  const query = queryHandler({
    search: props.search,
    status: props.status,
    sort: '-created_at',
    page: props.page,
    limit: props.limit,
  });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = () => {
    revalidateRequest(GET_ALL_IN_CORR(props?._id || '') + query);
  };

  const createMinuteSwr = useFormDataAuthRequest<MinuteData>(
    props._id && props?.can_create ? CREATE(props._id) : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getMinListSwr = useAuthGetRequest<MinuteData[]>(
    props?.can_get_all && props.status ? GET_ALL(query) : '',
    fetchOptions
  );

  const getCorrMinListSwr = useAuthGetRequest<MinuteData[]>(
    props._id && props?.can_get_all ? GET_ALL_IN_CORR(props._id) : '',
    fetchOptions
  );

  return {
    createMinuteSwr,
    getMinListSwr: {
      ...getMinListSwr,
      data: getMinListSwr.data?.data || [],
      results: getMinListSwr.data?.results,
      loading: getMinListSwr.isLoading || getMinListSwr.isValidating,
    },
    getCorrMinListSwr: {
      ...getCorrMinListSwr,
      data: getCorrMinListSwr.data?.data || [],
      results: getCorrMinListSwr.data?.results,
      loading: getCorrMinListSwr.isLoading || getCorrMinListSwr.isValidating,
    },
  };
};

export default useMinute;
