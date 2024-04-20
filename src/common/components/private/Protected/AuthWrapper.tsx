'use client';
import React, { createContext, useState } from 'react';
import { User } from '@/app/auth/types/auth';
import { ContextWapper } from '@/types';

type ContextType = {
  user: User | null;
  storeUserHandler: (res: User | null) => void;
} | null;

export const UserContext = createContext<ContextType>(null);

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
