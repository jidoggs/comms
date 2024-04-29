import { ENDPOINTS } from '@/service/config/endpoint';
import { useNonAuthRequest } from '@/service/swrHooks';
import { OfficeInfo, PasswordDataInfo, PersonalInfo } from '../types/auth';

type RequestType = 'personal_info' | 'office_info' | 'set_password';

type Props = Partial<Record<RequestType, boolean>>;

const { ONBOARD } = ENDPOINTS.AUTH;

function useOnboarding(props?: Props) {
  const personalInfoSwr = useNonAuthRequest<PersonalInfo>(
    props?.personal_info ? ONBOARD : ''
  );

  const officeInfoSwr = useNonAuthRequest<OfficeInfo>(
    props?.office_info ? ONBOARD : ''
  );

  const passwordSwr = useNonAuthRequest<PasswordDataInfo>(
    props?.set_password ? ONBOARD : ''
  );

  return {
    personalInfoSwr,
    officeInfoSwr,
    passwordSwr,
  };
}

export default useOnboarding;
