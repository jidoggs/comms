import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { SessionResponse, User, UserSession } from '../types/auth';
import { useCache } from '@/common/hooks';
import { REFRESH_INTERVAL } from '@/service/config/constant';
import { storeRefreshToken, storeUserToken } from '@/service/storage';

type RequestType =
  | 'login'
  | 'user'
  | 'user_password'
  | 'refresh'
  | 'forgot_password'
  | 'reset_password';

type Props = Partial<Record<RequestType, boolean>>;

const { FORGOT_PASSWORD, UPDATE_USER_PASSWORD } = ENDPOINTS.AUTH;
const { GET_USER, LOGIN, RESET_PASSWORD } = ENDPOINTS.AUTH;
const { REFRESH_TOKEN } = ENDPOINTS.AUTH;

function useAuth(props?: Props) {
  const { cachedData } = useCache();

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    isValidating: userIsValidating,
    revalidate: userRevalidate,
  } = useAuthGetRequest<User>(
    props?.user && !cachedData[GET_USER] ? GET_USER : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
    }
  );

  useAuthGetRequest<SessionResponse>(props?.refresh ? REFRESH_TOKEN : '', {
    refreshInterval: REFRESH_INTERVAL,
    onSuccess(res) {
      storeUserToken(res?.data?.access_token);
      storeRefreshToken(res?.data?.refresh_token);
    },
  });

  const {
    data: loginData,
    trigger: loginTrigger,
    isMutating: loginIsMutating,
    error: LoginError,
  } = useNonAuthRequest<UserSession>(props?.login ? LOGIN : '');

  const {
    data: updatePasswordData,
    error: updatePasswordError,
    isMutating: updatePasswordIsMutating,
    trigger: updatePasswordTrigger,
  } = useAuthRequest<User>(props?.user_password ? UPDATE_USER_PASSWORD : '');
  const {
    data: forgortPasswordData,
    error: forgortPasswordError,
    isMutating: forgortPasswordIsMutating,
    trigger: forgortPasswordTrigger,
  } = useNonAuthRequest<User>(props?.forgot_password ? FORGOT_PASSWORD : '');
  const {
    data: resetPasswordData,
    error: resetPasswordError,
    isMutating: resetPasswordIsMutating,
    trigger: resetPasswordTrigger,
  } = useNonAuthRequest<User>(props?.reset_password ? RESET_PASSWORD : '');

  return {
    loginData,
    loginTrigger,
    loginIsMutating,
    LoginError,
    userData: cachedData?.[GET_USER]?._id
      ? (cachedData[GET_USER] as User)
      : userData?.data,
    userError,
    userIsLoading,
    userIsValidating,
    userRevalidate,
    updatePasswordData,
    updatePasswordError,
    updatePasswordIsMutating,
    updatePasswordTrigger,
    forgortPasswordData,
    forgortPasswordError,
    forgortPasswordIsMutating,
    forgortPasswordTrigger,
    resetPasswordData,
    resetPasswordError,
    resetPasswordIsMutating,
    resetPasswordTrigger,
  };
}

export default useAuth;
