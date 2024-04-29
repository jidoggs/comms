import { ENDPOINTS } from '@/service/config/endpoint';
import { useAuthGetRequest, useAuthRequest } from '@/service/swrHooks';

type RequestType = 'create_user';
type QueryType = '_id' | 'role';

type Props = Partial<Record<RequestType, boolean>> &
  Partial<Record<QueryType, string>>;

const { ONBOARD } = ENDPOINTS.AUTH;

function useOnboarding(props: Props) {
  const createUserSwr = useAuthRequest(props?.create_user ? ONBOARD : '');

  return {
    createUserSwr,
  };
}

export default useOnboarding;
