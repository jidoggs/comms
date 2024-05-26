'use client';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { useRef } from 'react';
import useSession from '../../../common/hooks/useSession';
import {
  fetchOptions,
  useAuthGetRequest,
  useAuthRequest,
  useNonAuthRequest,
} from '@/service/swrHooks';

import { ENDPOINTS } from '@/service/config/endpoint';
import { REFRESH_INTERVAL } from '@/service/config/constant';
import { clearUserToken, storeUserTokens } from '@/service/storage';

import { SessionResponse, UserSession, ResetResponse } from '../types/auth';
import { User, UserPreDefinedRole } from '@/types';
import { AuthParams } from './types';
import { messageHandler } from '@/common/utils/notification';
import { disconnectSocket } from '@/service/socket';

const { FORGOT_PASSWORD, REFRESH_TOKEN } = ENDPOINTS.AUTH;
const { LOGIN, RESET_PASSWORD } = ENDPOINTS.AUTH;
const { GET_USER, UPDATE_USER_PASSWORD } = ENDPOINTS.USER;

function useAuth(props?: AuthParams) {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { data, storeUserHandler } = useSession();
  const messageLoading = useRef(false);

  const handleLogout = async () => {
    storeUserHandler(null);
    router.replace(`/auth/login`)
    disconnectSocket();
    clearUserToken();
    mutate((_) => true, undefined, { revalidate: false });
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
      storeUserTokens(res.data);
    },
  });

  const loginSwr = useNonAuthRequest<UserSession>(props?.login ? LOGIN : '', {
    onSuccess: (res) => {
      storeUserTokens(res.data);
      storeUserHandler(res.data);
      // if (res?.data?.role?.name === UserPreDefinedRole.BASICUSER) {
      if (res?.data?.role?.name === UserPreDefinedRole.SECONDARYADMIN) {
        // router.replace('/app/home');
        router.replace('/admin/people');
      } else {
        router.replace('/app/home');
        // router.replace('/admin/people');
      }
    },
  });

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
    handleLogout,
    messageLoading: messageLoading.current,
  };
}

export default useAuth;
