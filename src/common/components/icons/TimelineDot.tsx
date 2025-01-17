import * as React from 'react';
import { Icon } from './type';

const TimelineDot: Icon = ({ size = '20', ...props }) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="10"
      cy="10"
      r="9"
      fill="white"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default TimelineDot;
