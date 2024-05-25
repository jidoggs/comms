import {
  fetchOptions,
  useAuthGetRequest,
  useFormDataAuthRequest,
  useServiceConfig,
} from '@/service/swrHooks';
import { CorrespondenceServiceArgs } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';
import { CorrespondenceData } from '@/types';
import { queryHandler } from '@/service/request';

const { CREATE, GET_ALL } = ENDPOINTS.CORRESPONDENCE;

const useCorrespondence = (props: CorrespondenceServiceArgs) => {
  const query = queryHandler({
    search: props.search,
    status: props.status,
  });

  const { revalidateRequest } = useServiceConfig();

  const revalidateListHandler = () => {
    revalidateRequest(GET_ALL + query);
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

  return {
    createCorrSwr,
    getListSwr,
  };
};

export default useCorrespondence;
