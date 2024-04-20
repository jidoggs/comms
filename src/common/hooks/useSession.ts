'use client';
import { useContext, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { message } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { clearUserDetails } from '@/service/storage';
import { UserContext } from '@/common/components/private/Protected/AuthWrapper';
import { User } from '@/app/auth/types/auth';
import { UserPreDefinedRole } from '@/types';

function useSession() {
  const { mutate } = useSWRConfig();
  const userInfo = useContext(UserContext);
  const [messageApi, messageContext] = message.useMessage();
  const router = useRouter();
  const logoutRef = useRef(false);

  const isPrimaryAdmin =
    userInfo?.user?.role.name === UserPreDefinedRole.PRIMARYADMIN;
  const isSecondaryAdmin =
    userInfo?.user?.role.name === UserPreDefinedRole.SECONDARYADMIN;

  const storeUserHandler = (res: User | null) => {
    if (!userInfo?.storeUserHandler) return;
    userInfo.storeUserHandler(res);
  };

  const handleLogout = async () => {
    //eslint-disable-next-line
    mutate((_) => true, undefined, { revalidate: false }).then(() => {
      messageApi.success('Logging User out...').then(() => {
        router.replace(
          `/auth/login?logout=true&session=${new Date().toISOString()}`
        );
        clearUserDetails();
        userInfo?.storeUserHandler(null);
      });
    });
  };

  const loggoutSuccessHandler = (session_end: string) => {
    const now = dayjs();
    const logouttime = dayjs(session_end);
    const diffTime = now.diff(logouttime, 'second');

    if (diffTime <= 4 && logoutRef.current === false) {
      logoutRef.current = true;
      messageApi.success('Logout Successful');
    }
  };

  return {
    data: userInfo?.user,
    storeUserHandler,
    handleLogout,
    messageContext,
    loggoutSuccessHandler,
    isPrimaryAdmin,
    isSecondaryAdmin,
  };
}

export default useSession;
