'use client';
import { useContext } from 'react';
import {
  UserContext,
  UserSessionContextType,
} from '@/common/components/private/Protected/AuthWrapper';
import { User, UserPreDefinedRole } from '@/types';

function useSession() {
  const userInfo = useContext(UserContext) as UserSessionContextType;

  const isPrimaryAdmin =
    userInfo?.user?.role.name === UserPreDefinedRole.PRIMARYADMIN;
  const isSecondaryAdmin =
    userInfo?.user?.role.name === UserPreDefinedRole.SECONDARYADMIN;
  const isBasicUser =
    userInfo?.user?.role.name === UserPreDefinedRole.BASICUSER;

  const storeUserHandler = (res: User | null) => {
    if (!userInfo?.storeUserHandler) return;
    userInfo.storeUserHandler(res);
  };

  return {
    data: userInfo.user as User,
    storeUserHandler,
    isPrimaryAdmin,
    isSecondaryAdmin,
    isBasicUser,
  };
}

export default useSession;
