import { ENDPOINTS } from '@/service/config/endpoint';
import {
  // useAuthGetRequest,
  // useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { OfficeInfo, PasswordDataInfo, PersonalInfo } from '../types/auth';

type RequestType = 'personal_info' | 'office_info' | 'set_password';

type Props = Partial<Record<RequestType, boolean>>;

const { ONBOARDING } = ENDPOINTS;

function useOnboarding(props?: Props) {
  // ONBOARDING ROUTES
  const {
    data: personalInfoData,
    trigger: personalInfoTrigger,
    isMutating: personalInfoIsMutating,
    error: personalInfoError,
  } = useNonAuthRequest<PersonalInfo>(
    props?.personal_info ? ONBOARDING.PERSONAL_INFO : ''
  );

  const {
    data: officeInfoData,
    trigger: officeInfoTrigger,
    isMutating: officeInfoIsMutating,
    error: officeInfoError,
  } = useNonAuthRequest<OfficeInfo>(
    props?.office_info ? ONBOARDING.OFFICE_INFO : ''
  );

  const {
    data: setPasswordData,
    trigger: setPasswordTrigger,
    isMutating: setPasswordIsMutating,
    error: setPasswordError,
  } = useNonAuthRequest<PasswordDataInfo>(
    props?.set_password ? ONBOARDING.SET_PASSWORD : ''
  );

  return {
    personalInfoData,
    personalInfoTrigger,
    personalInfoIsMutating,
    personalInfoError,
    officeInfoData,
    officeInfoTrigger,
    officeInfoIsMutating,
    officeInfoError,
    setPasswordData,
    setPasswordTrigger,
    setPasswordIsMutating,
    setPasswordError,
  };
}

export default useOnboarding;
