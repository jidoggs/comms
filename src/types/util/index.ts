import React from 'react';

export type StateDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

export type ContextWapper = {
  children: React.ReactNode;
};
