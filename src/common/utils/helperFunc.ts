import { DefaultTableProps } from '@/types';
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
      ?.split(' ')
      ?.map((name) => getFirstCharacter(name))
      ?.join('');
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

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;
  const stringVal = value?.toString();
  if (stringVal.length === 10) {
    return '+234' + value;
  }
  if (stringVal.length === 11) {
    return '+234' + value.substring(1);
  }
  if (stringVal.startsWith('234')) {
    return '+' + stringVal;
  }
  return stringVal;
};

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}

export const replaceUnderscorceWithSpace = (value: string) => {
  return value?.split('_')?.join(' ');
};

export const lastRoute = (str: string) => {
  const items = str.split('/');
  return items[items.length - 1];
};

export const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

// export const removeNullOrUndefinedProperties = (obj: Record<string, any>) => {
//   let newObj: Record<string, any> = {};
//   const keys = Object.keys(obj);
//   keys.forEach((key) => {
//     if (obj[key] !== undefined && obj[key] !== '') {
//       newObj[key] = obj[key];
//     }
//   });
//   return newObj;
// };

export const removeNullOrUndefinedProperties = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {};
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== '' && obj[key] !== null) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        // Remove empty array
        return;
      }
      if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
        // Remove empty object
        return;
      }
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const arrangeColumnsAndFilter = (
  columns: DefaultTableProps[],
  keys: string[]
): DefaultTableProps[] => {
  const keyIndex = keys.reduce<Record<string, number>>((acc, key, index) => {
    acc[key] = index;
    return acc;
  }, {});

  return columns
    .slice()
    .sort((a, b) => {
      return (
        (keyIndex[a.dataIndex as string] ?? Number.MAX_SAFE_INTEGER) -
        (keyIndex[b.dataIndex as string] ?? Number.MAX_SAFE_INTEGER)
      );
    })
    .filter((itm) => keys.includes(itm.dataIndex));
};
