import { useFormDataAuthRequest } from '@/service/swrHooks';
import { CorrespondenceServiceArgs, CorrespondenceType } from './types';
import { ENDPOINTS } from '@/service/config/endpoint';

const { CREATE } = ENDPOINTS.CORRESPONDENCE;

const useCorrespondence = (props: CorrespondenceServiceArgs) => {
  const createCorrSwr = useFormDataAuthRequest<CorrespondenceType>(
    props?.can_create ? CREATE : ''
  );
  return { createCorrSwr };
};

export default useCorrespondence;
