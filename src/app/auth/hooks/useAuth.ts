import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { User, UserSession } from '../types/auth';

type RequestType =
  | 'login'
  | 'user'
  | 'user_password'
  | 'refresh'
  | 'forgot_password'
  | 'reset_password';

type Props = Partial<Record<RequestType, boolean>>;

const endpoints = ENDPOINTS.AUTH;

function useAuth(props?: Props) {
  const {
    data: loginData,
    trigger: loginTrigger,
    isMutating: loginIsMutating,
    error: LoginError,
  } = useNonAuthRequest<UserSession>(props?.login ? endpoints.LOGIN : '');

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
    isValidating: userIsValidating,
    revalidate: userRevalidate,
  } = useAuthGetRequest<User>(props?.user ? endpoints.GET_USER : '', {
    revalidateOnFocus: false,
  });

  const {
    data: updatePasswordData,
    error: updatePasswordError,
    isMutating: updatePasswordIsMutating,
    trigger: updatePasswordTrigger,
  } = useAuthRequest<User>(
    props?.user_password ? endpoints.UPDATE_USER_PASSWORD : ''
  );
  const {
    data: forgortPasswordData,
    error: forgortPasswordError,
    isMutating: forgortPasswordIsMutating,
    trigger: forgortPasswordTrigger,
  } = useNonAuthRequest<User>(
    props?.forgot_password ? endpoints.FORGOT_PASSWORD : ''
  );
  const {
    data: resetPasswordData,
    error: resetPasswordError,
    isMutating: resetPasswordIsMutating,
    trigger: resetPasswordTrigger,
  } = useNonAuthRequest<User>(
    props?.reset_password ? endpoints.RESET_PASSWORD : ''
  );

  return {
    loginData,
    loginTrigger,
    loginIsMutating,
    LoginError,
    userData,
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
