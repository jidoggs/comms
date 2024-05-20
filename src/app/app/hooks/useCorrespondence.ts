import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useFormDataAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CorrespondenceServiceArgs } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';
import {
  APIResponseSuccessModel,
  CorrespondenceData,
  MinuteData,
  RecipientData,
} from '@/types';
import { queryHandler } from '@/service/request';

const {
  CREATE,
  CREATE_MINUTE,
  GET_ALL,
  GET_ALL_MINUTES,
  GET_ALL_MINUTES_IN_CORR,
  GET_RECIPIENTS,
} = ENDPOINTS.CORRESPONDENCE;

const useCorrespondence = (props: CorrespondenceServiceArgs) => {
  const query = queryHandler({
    search: props.search,
    status: props.status,
    recipient: props.recipient,
  });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL + query, res.message);
  };
  const revalidateMinuteListHandler = (
    res: APIResponseSuccessModel,
    _id: string
  ) => {
    revalidateRequest(GET_ALL_MINUTES_IN_CORR(_id) + query, res.message);
  };

  const createCorrSwr = useFormDataAuthRequest<CorrespondenceData>(
    props?.can_create ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const createMinuteSwr = useAuthRequest<MinuteData>(
    props._id && props?.can_create ? CREATE_MINUTE(props._id) : '',
    {
      // onSuccess: revalidateMinuteListHandler,
      onSuccess: (res) => revalidateMinuteListHandler(res, props._id as string),
    }
  );

  const getListSwr = useAuthGetRequest<CorrespondenceData[]>(
    props?.can_get_all ? GET_ALL + query : '',
    fetchOptions
  );

  const getMinListSwr = useAuthGetRequest<MinuteData[]>(
    props?.can_get_all ? GET_ALL_MINUTES : '',
    fetchOptions
  );

  const getCorrMinListSwr = useAuthGetRequest<MinuteData[]>(
    props._id && props?.can_get_all ? GET_ALL_MINUTES_IN_CORR(props._id) : '',
    fetchOptions
  );

  const getRecipientsSwr = useAuthGetRequest<RecipientData>(
    query && props?.can_get_all_recipients ? GET_RECIPIENTS(query) : '',
    fetchOptions
  );

  return {
    createCorrSwr,
    createMinuteSwr,
    getListSwr,
    getMinListSwr: {
      ...getMinListSwr,
      data: getMinListSwr.data?.data || [],
      results: getMinListSwr.data?.results,
    },
    getCorrMinListSwr,
    getRecipientsSwr,
  };
};

export default useCorrespondence;
