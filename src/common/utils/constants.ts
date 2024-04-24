export const isServer = typeof window === 'undefined';
export const isClient = typeof window !== 'undefined';
export const isString = (className: string | Record<string, string>) => {
  return typeof className === 'string';
};
