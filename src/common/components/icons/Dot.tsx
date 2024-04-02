import * as React from 'react';
import { Icon } from './type';

const Dot: Icon = ({ size = '30', fill = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    {...props}
    viewBox="0 0 40 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="19" width="2" height="8" fill="url(#paint0_linear_11894_72602)" />
    <circle
      cx="20"
      cy="17"
      r="7.5"
      fill="white"
      stroke="currentColor"
      strokeWidth="5"
    />
    <rect x="19" y="26" width="2" height="8" fill={fill} />
    <defs>
      <linearGradient
        id="paint0_linear_11894_72602"
        x1="20"
        y1="0"
        x2="20"
        y2="8"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset="1" stopColor={fill} />
      </linearGradient>
    </defs>
  </svg>
);

export default Dot;
