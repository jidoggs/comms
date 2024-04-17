import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { User, UserSession } from '../types/auth';
import { useCache } from '@/common/hooks';

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
    }
  );
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
    userData: cachedData[GET_USER]
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
