import {
  fetchOptions,
  useAuthGetRequest,
  useFormDataAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CorrespondenceServiceArgs } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';
import { APIResponseSuccessModel, CorrespondenceData } from '@/types';
import { queryHandler, searchQueryHandler } from '@/service/request';

const { CREATE, GET_ALL, GET_RECIPIENTS } = ENDPOINTS.CORRESPONDENCE;

const useCorrespondence = (props: CorrespondenceServiceArgs) => {
  const searchBy = ['recipient'];
  // const recipient = searchQueryHandler(searchBy, props?.recipient || '');

  // const query = queryHandler({ recipient });
  const query = `?recipient=${props?.recipient}`;
  const { revalidateRequest } = useServiceConfig();

  // console.log('query', query);

  const revalidateListHandler = (res: APIResponseSuccessModel) => {
    revalidateRequest(GET_ALL + props.query, res.message);
  };

  const createCorrSwr = useFormDataAuthRequest<CorrespondenceData>(
    props?.can_create ? CREATE : '',
    {
      onSuccess: revalidateListHandler,
    }
  );

  const getListSwr = useAuthGetRequest<CorrespondenceData[]>(
    props?.can_get_all ? GET_ALL : '',
    fetchOptions
  );

  const getRecipientsSwr = useAuthGetRequest(
    query && props?.can_get_all_recipients ? GET_RECIPIENTS(query) : '',
    fetchOptions
  );

  return { createCorrSwr, getListSwr, getRecipientsSwr };
};

export default useCorrespondence;
