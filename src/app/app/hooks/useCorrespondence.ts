import {
  fetchOptions,
  useAuthGetRequest,
  useFormDataAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CorrespondenceServiceArgs } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';
import { APIResponseSuccessModel, CorrespondenceData } from '@/types';

const { CREATE, GET_ALL } = ENDPOINTS.CORRESPONDENCE;

const useCorrespondence = (props: CorrespondenceServiceArgs) => {
  const { revalidateRequest } = useServiceConfig();

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
    props?.can_get_all ? GET_ALL + props.query : '',
    fetchOptions
  );
  return { createCorrSwr, getListSwr };
};

export default useCorrespondence;
