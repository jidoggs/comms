'use client';
import { useRouter } from 'next/navigation';
import useMessage from 'antd/es/message/useMessage';
import { useSWRConfig } from 'swr';
import { useRef } from 'react';
import dayjs from 'dayjs';
import useSession from '../../../common/hooks/useSession';
import {
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';

import { ENDPOINTS } from '@/service/config/endpoint';
import { REFRESH_INTERVAL } from '@/service/config/constant';
import {
  clearUserDetails,
  storeRefreshToken,
  storeUserToken,
} from '@/service/storage';

import { SessionResponse, UserSession, ResetResponse } from '../types/auth';
import { User, UserPreDefinedRole } from '@/types';
import { AuthParams } from './types';

const { FORGOT_PASSWORD, REFRESH_TOKEN } = ENDPOINTS.AUTH;
const { LOGIN, RESET_PASSWORD } = ENDPOINTS.AUTH;
const { GET_USER, UPDATE_USER_PASSWORD } = ENDPOINTS.USER;

function useAuth(props?: AuthParams) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, storeUserHandler } = useSession();
  const [messageApi, messageContext] = useMessage();
  const logoutRef = useRef(false);
  const messageLoading = useRef(false);

  const handleLogout = async () => {
    //eslint-disable-next-line
    mutate((_) => true, undefined, { revalidate: false }).then(() => {
      messageApi.loading('Logging User out...').then(() => {
        router.replace(
          `/auth/login?type=logout&session=${new Date().toISOString()}`
        );
        clearUserDetails();
        storeUserHandler(null);
      });
    });
  };

  const loggoutSuccessHandler = (session_end: string, type: string) => {
    const now = dayjs();
    const logouttime = dayjs(session_end);
    const diffTime = now.diff(logouttime, 'second');

    if (diffTime <= 4 && logoutRef.current === false) {
      logoutRef.current = true;
      if (type === 'logout') {
        messageApi.success('Logout Successful');
      } else {
        messageApi.error('Unauthorized/Session Expired');
      }
    }
  };

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

  const loginSwr = useNonAuthRequest<UserSession>(
    props?.login && !messageLoading.current ? LOGIN : '',
    {
      onSuccess: (res) => {
        storeUserToken(res.data.access_token);
        storeRefreshToken(res.data.refresh_token);
        storeUserHandler(res.data);
        messageLoading.current = true;
        messageApi.success(res.message).then(() => {
          if (res?.data?.role?.name === UserPreDefinedRole.SECONDARYADMIN) {
            router.push('/admin/people');
          } else {
            router.push('/app/home');
          }
        });
      },
    }
  );

  const updatePasswordSwr = useAuthRequest<User>(
    props?.user_password ? UPDATE_USER_PASSWORD : ''
  );

  const forgotPasswordSwr = useNonAuthRequest<ResetResponse>(
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
    messageContext,
    loginSwr,
    userSwr: {
      ...userSwr,
      data,
    },
    updatePasswordSwr,
    forgotPasswordSwr,
    resetPasswordSwr,
    loggoutSuccessHandler,
    handleLogout,
    messageLoading: messageLoading.current,
  };
}

export default useAuth;
