import { useRouter } from 'next/navigation';
import {
  fetchOptions,
  useNonAuthGetRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { ENDPOINTS } from '@/service/config/endpoint';
import { UserSession } from '@/app/auth/types/auth';
import { GenericServiceParam } from '@/types';
import { DepartmentType, OfficeType, ParastatalType } from '@/app/admin/types';

type RequestType =
  | 'can_onboard'
  | 'can_get_parastatal'
  | 'can_get_department'
  | 'can_get_office';
type RequestQuery = 'email' | 'parastatal' | 'office' | 'department';

type Props = GenericServiceParam<RequestType, RequestQuery>;

const { CREATE, DEPARTMENT, OFFICE, PARASTATALS } = ENDPOINTS.AUTH.ONBOARD;

function useOnboarding(props: Props) {
  const router = useRouter();

  const onboardUserSwr = useNonAuthRequest<UserSession>(
    props?.can_onboard ? CREATE : '',
    {
      onSuccess() {
        router.replace(`/onboarding/success`);
      },
    }
  );
  const getParastatalSwr = useNonAuthGetRequest<ParastatalType>(
    props.can_get_parastatal && props?.parastatal
      ? PARASTATALS(props?.parastatal)
      : '',
    fetchOptions
  );
  const getOfficeSwr = useNonAuthGetRequest<OfficeType[]>(
    props.can_get_office && props.office && props?.parastatal
      ? OFFICE(props?.parastatal)
      : '',
    fetchOptions
  );
  const getDepartmentSwr = useNonAuthGetRequest<DepartmentType>(
    props.can_get_department && props?.parastatal && props?.office
      ? DEPARTMENT(props?.parastatal, props?.office)
      : '',
    fetchOptions
  );

  return {
    onboardUserSwr,
    getParastatalSwr,
    getOfficeSwr,
    getDepartmentSwr,
  };
}

export default useOnboarding;
