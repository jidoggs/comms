'use client';
import React, { createContext, useState } from 'react';
import { ContextWapper, User } from '@/types';

export type UserSessionContextType = {
  user: User | null;
  storeUserHandler: (res: User | null) => void;
};

export const UserContext = createContext<UserSessionContextType | null>(null);

function AuthWrapper({ children }: ContextWapper) {
  const [data, setData] = useState<null | User>(null);

  const storeUserHandler = (res: User | null) => {
    setData(res);
  };
  return (
    <UserContext.Provider value={{ user: data, storeUserHandler }}>
      {children}
    </UserContext.Provider>
  );
}

export default AuthWrapper;
