import * as clsx from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
// import { REFRESH_BEFORE } from '@/service/config/constant';

export const mergeClassName = (...className: clsx.ClassValue[]) => {
  return twMerge(clsx.clsx(...className));
};

const getFirstCharacter = (item: string) => item?.[0]?.toUpperCase();

export const generateInitials = (firstName: string, lastName?: string) => {
  let result = '';
  if (lastName) {
    result = getFirstCharacter(firstName) + getFirstCharacter(lastName);
  } else {
    result = firstName
      .split(' ')
      .map((name) => getFirstCharacter(name))
      .join('');
  }
  return result;
};

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function requestRefreshToken(epoch: number): boolean {
  const now = dayjs();
  const expire = dayjs(epoch * 1000);
  const differenceInMinutes = expire.diff(now, 'minute');

  return epoch !== 0 ? differenceInMinutes <= 10 : false;
}
