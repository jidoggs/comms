'use client';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { useRef } from 'react';
import dayjs from 'dayjs';
import useSession from '../../../common/hooks/useSession';
import {
  fetchOptions,
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
import { messageHandler } from '@/common/utils/notification';

const { FORGOT_PASSWORD, REFRESH_TOKEN } = ENDPOINTS.AUTH;
const { LOGIN, RESET_PASSWORD } = ENDPOINTS.AUTH;
const { GET_USER, UPDATE_USER_PASSWORD } = ENDPOINTS.USER;

function useAuth(props?: AuthParams) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, storeUserHandler } = useSession();
  const logoutRef = useRef(false);
  const messageLoading = useRef(false);

  const handleLogout = async () => {
    //eslint-disable-next-line

    mutate((_) => true, undefined, { revalidate: false }).then(() => {
      messageHandler('loading', 'Logging User out...').then(() => {
        router.replace(
          `/auth/login?type=logout&session=${new Date().toISOString()}`
        );
        clearUserDetails();
        storeUserHandler(null);
      });
    });
  };

  const loggoutSuccessHandler = async (session_end: string, type: string) => {
    const now = dayjs();
    const logouttime = dayjs(session_end);
    const diffTime = now.diff(logouttime, 'second');

    if (diffTime <= 4 && logoutRef.current === false) {
      logoutRef.current = true;
      if (type === 'logout') {
        messageHandler('success', 'Logout Successful');
      } else {
        messageHandler('error', 'Unauthorized/Session Expired');
      }
    }
  };

  const userSwr = useAuthGetRequest<User>(
    props?.user && !data?._id ? GET_USER : '',
    {
      ...fetchOptions,
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
        messageHandler('success', res.message)
          .then(() => {
            // if (res?.data?.role?.name === UserPreDefinedRole.BASICUSER) {
            if (res?.data?.role?.name === UserPreDefinedRole.SECONDARYADMIN) {
              // router.replace('/app/home');
              router.replace('/admin/people');
            } else {
              router.replace('/app/home');
              // router.replace('/admin/people');
            }
          })
          .finally(() => {
            messageLoading.current = false;
          });
      },
    }
  );

  const updatePasswordSwr = useAuthRequest<User>(
    props?.user_password ? UPDATE_USER_PASSWORD : ''
  );

  const forgotPasswordSwr = useNonAuthRequest<ResetResponse>(
    props?.forgot_password && !messageLoading.current ? FORGOT_PASSWORD : '',
    {
      onSuccess: (res) => {
        messageLoading.current = true;
        messageHandler('success', res.data.message).then(() => {
          router.replace('/auth/login');
        });
      },
    }
  );

  const resetPasswordSwr = useNonAuthRequest<User>(
    props?.reset_password ? RESET_PASSWORD : '',
    {
      onSuccess: () => {
        router.replace(`/auth/success`);
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
    loggoutSuccessHandler,
    handleLogout,
    messageLoading: messageLoading.current,
  };
}

export default useAuth;
