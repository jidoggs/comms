import React from 'react';

export type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type ContextWrapper = {
  children: React.ReactNode;
};
