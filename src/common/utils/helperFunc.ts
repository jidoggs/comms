import * as clsx from "clsx";

import { twMerge } from "tailwind-merge";

export const mergeClassName = (...className: clsx.ClassValue[]) => {
  return twMerge(clsx.clsx(...className));
};
