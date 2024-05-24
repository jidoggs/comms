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
import { queryHandler } from '@/service/request';
import { storeUserTokens } from '@/service/storage';
import { useSession } from '@/common/hooks';

type RequestType =
  | 'can_onboard'
  | 'can_get_parastatal'
  | 'can_get_department'
  | 'can_get_office';
type RequestQuery = 'email' | 'parastatal' | 'office' | 'department' | '_id';

type Props = GenericServiceParam<RequestType, RequestQuery>;

const { CREATE, DEPARTMENT, OFFICE, PARASTATALS } = ENDPOINTS.AUTH.ONBOARD;

function useOnboarding(props: Props) {
  const router = useRouter();
  const { storeUserHandler } = useSession();

  const query = queryHandler({
    _id: props._id,
    parastatal: props.parastatal,
    office: props.office,
    ddepartment: props.department,
  });

  const onboardUserSwr = useNonAuthRequest<UserSession>(
    props?.can_onboard ? CREATE : '',
    {
      onSuccess(res) {
        storeUserHandler(res.data);
        storeUserTokens(res.data);
        router.replace(`/onboarding/success?type=${res.data.role.name}`);
      },
    }
  );
  const getParastatalSwr = useNonAuthGetRequest<ParastatalType>(
    props.can_get_parastatal && props?._id ? PARASTATALS(query) : '',
    fetchOptions
  );
  const getOfficeSwr = useNonAuthGetRequest<OfficeType[]>(
    props.can_get_office && props?.parastatal ? OFFICE(query) : '',
    fetchOptions
  );
  const getDepartmentSwr = useNonAuthGetRequest<DepartmentType[]>(
    props.can_get_department && props?.parastatal && props?.office
      ? DEPARTMENT(query)
      : '',
    fetchOptions
  );
  const getOfficeByIdSwr = useNonAuthGetRequest<OfficeType[]>(
    props.can_get_office && props._id ? OFFICE(query) : '',
    fetchOptions
  );
  const getDepartmentByIdSwr = useNonAuthGetRequest<DepartmentType[]>(
    props.can_get_department && props._id ? DEPARTMENT(query) : '',
    fetchOptions
  );

  return {
    onboardUserSwr,
    getParastatalSwr,
    getOfficeSwr,
    getDepartmentSwr,
    getOfficeByIdSwr,
    getDepartmentByIdSwr,
  };
}

export default useOnboarding;
