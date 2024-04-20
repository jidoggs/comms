"use client"
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { REFRESH_INTERVAL } from '@/service/config/constant';
import { storeRefreshToken, storeUserToken } from '@/service/storage';
import { SessionResponse, User, UserSession } from '../types/auth';
import { UserPreDefinedRole } from '@/types';
import useSession from '../../../common/hooks/useSession';

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
  const router = useRouter();
  const { data, storeUserHandler } = useSession();

  const userSwr = useAuthGetRequest<User>(
    props?.user && !data?._id ? GET_USER : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
      onSuccess(res) {
        storeUserHandler(res.data);
      },
    }
  );

  useAuthGetRequest<SessionResponse>(props?.refresh ? REFRESH_TOKEN : '', {
    refreshInterval: REFRESH_INTERVAL,
    onSuccess(res) {
      storeUserToken(res.data.access_token);
      storeRefreshToken(res.data.refresh_token);
    },
  });

  const loginSwr = useNonAuthRequest<UserSession>(props?.login ? LOGIN : '', {
    onSuccess: (res) => {
      storeUserToken(res.data.access_token);
      storeRefreshToken(res.data.refresh_token);
      const temp = { ...res.data };
      storeUserHandler(temp);
      if (res?.data?.role?.name === UserPreDefinedRole.PRIMARYADMIN) {
        router.push('/app/home');
      } else {
        router.push('/admin/people');
      }
    },
  });

  const updatePasswordSwr = useAuthRequest<User>(
    props?.user_password ? UPDATE_USER_PASSWORD : ''
  );

  const forgotPasswordSwr = useNonAuthRequest<User>(
    props?.forgot_password ? FORGOT_PASSWORD : ''
  );

  const resetPasswordSwr = useNonAuthRequest<User>(
    props?.reset_password ? RESET_PASSWORD : '',
    {
      onSuccess: () => {
        router.push(`/auth/success`);
      },
    }
  );

  return {
    loginSwr,
    userSwr: {
      ...userSwr,
      data,
    },
    updatePasswordSwr,
    forgotPasswordSwr,
    resetPasswordSwr,
  };
}

export default useAuth;
