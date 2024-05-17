import {
  fetchOptions,
  useAuthGetRequest,
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

  const createCorrSwr = useFormDataAuthRequest<CorrespondenceData>(
    props?.can_create ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<CorrespondenceData[]>(
    props?.can_get_all ? GET_ALL + query : '',
    fetchOptions
  );

  const getMinListSwr = useAuthGetRequest<
    APIResponseSuccessModel<MinuteData[]>
  >(props?.can_get_all ? GET_ALL_MINUTES : '', fetchOptions);

  const getCorrMinListSwr = useAuthGetRequest<CorrespondenceData[]>(
    props._id && props?.can_get_all ? GET_ALL_MINUTES_IN_CORR(props._id) : '',
    fetchOptions
  );

  const getRecipientsSwr = useAuthGetRequest<RecipientData>(
    query && props?.can_get_all_recipients ? GET_RECIPIENTS(query) : '',
    fetchOptions
  );

  return {
    createCorrSwr,
    getListSwr,
    getMinListSwr,
    getCorrMinListSwr,
    getRecipientsSwr,
  };
};

export default useCorrespondence;
