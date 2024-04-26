export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';
export const isString = (className: any) => {
  return typeof className === 'string';
};
