import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '@/service/config/endpoint';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';
import { useCache } from '@/common/hooks';
import { REFRESH_INTERVAL } from '@/service/config/constant';
import { storeRefreshToken, storeUserToken } from '@/service/storage';
import { SessionResponse, User, UserSession } from '../types/auth';
import { UserPreDefinedRole } from '@/types';

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
  const router = useRouter();

  const userSwr = useAuthGetRequest<User>(
    props?.user && !cachedData[GET_USER]?._id ? GET_USER : '',
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: process.env.NODE_ENV === 'development' ? 1 : 3,
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
      if (res?.data?.role?.name === UserPreDefinedRole.PRIMARYADMIN) {
        router.push('/admin/people');
      } else {
        router.push('/app/home');
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
      data: (cachedData?.[GET_USER]?._id
        ? cachedData[GET_USER]
        : userSwr?.data?.data) as User,
    },
    updatePasswordSwr,
    forgotPasswordSwr,
    resetPasswordSwr,
  };
}

export default useAuth;
