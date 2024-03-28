import * as React from 'react';
import { Icon } from './type';

const ThreeDots: Icon = ({ size = 18, ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.75 10.5625C2.88614 10.5625 2.1875 9.86386 2.1875 9C2.1875 8.13614 2.88614 7.4375 3.75 7.4375C4.61386 7.4375 5.3125 8.13614 5.3125 9C5.3125 9.86386 4.61386 10.5625 3.75 10.5625ZM3.75 7.5625C2.95636 7.5625 2.3125 8.20636 2.3125 9C2.3125 9.79364 2.95636 10.4375 3.75 10.4375C4.54364 10.4375 5.1875 9.79364 5.1875 9C5.1875 8.20636 4.54364 7.5625 3.75 7.5625Z"
      fill="currentColor"
      stroke="currentColor"
    />
    <path
      d="M14.25 10.5625C13.3861 10.5625 12.6875 9.86386 12.6875 9C12.6875 8.13614 13.3861 7.4375 14.25 7.4375C15.1139 7.4375 15.8125 8.13614 15.8125 9C15.8125 9.86386 15.1139 10.5625 14.25 10.5625ZM14.25 7.5625C13.4564 7.5625 12.8125 8.20636 12.8125 9C12.8125 9.79364 13.4564 10.4375 14.25 10.4375C15.0436 10.4375 15.6875 9.79364 15.6875 9C15.6875 8.20636 15.0436 7.5625 14.25 7.5625Z"
      fill="currentColor"
      stroke="currentColor"
    />
    <path
      d="M9 11.0625C7.86 11.0625 6.9375 10.14 6.9375 9C6.9375 7.86 7.86 6.9375 9 6.9375C10.14 6.9375 11.0625 7.86 11.0625 9C11.0625 10.14 10.14 11.0625 9 11.0625ZM9 8.0625C8.4825 8.0625 8.0625 8.4825 8.0625 9C8.0625 9.5175 8.4825 9.9375 9 9.9375C9.5175 9.9375 9.9375 9.5175 9.9375 9C9.9375 8.4825 9.5175 8.0625 9 8.0625Z"
      fill="currentColor"
    />
  </svg>
);

export default ThreeDots;
